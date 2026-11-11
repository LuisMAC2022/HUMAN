#!/usr/bin/env node
/* Auditoría repetible del sitio. Requiere un servidor local y Playwright:

     python3 -m http.server 8123 --bind 127.0.0.1      (desde la raíz del sitio)
     node herramientas/auditar.js [http://127.0.0.1:8123/]

   Comprueba en cada página: errores de consola, recursos que fallan,
   desborde horizontal a 320, 360, 768, 1024 y 1440 px, identificadores
   duplicados, orden de encabezados, textos alternativos, metadatos y
   enlaces internos (archivo y ancla). Si axe-core está instalado, añade
   el análisis automático de accesibilidad (WCAG 2.2 AA). Sale con código
   1 si encuentra algún problema. */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const BASE = process.argv[2] || 'http://127.0.0.1:8123/';
const RAIZ = path.resolve(__dirname, '..');
const PAGINAS = ['index.html', 'superman.html', 'miltli.html', 'mapa-del-sitio.html', 'creditos.html',
  'uso-responsable-ia.html', '404.html', 'en/index.html'];
const ANCHOS = [320, 360, 768, 1024, 1440];

let axe = null;
try { axe = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8'); } catch (error) { /* opcional */ }

(async () => {
  const navegador = await chromium.launch();
  const problemas = [];
  const titulos = {};
  const anota = (pagina, texto) => { problemas.push(`${pagina}: ${texto}`); };

  for (const pagina of PAGINAS) {
    const contexto = await navegador.newContext({ viewport: { width: 1280, height: 720 } });
    const hoja = await contexto.newPage();
    hoja.on('console', (m) => { if (m.type() === 'error') anota(pagina, 'consola: ' + m.text()); });
    hoja.on('pageerror', (e) => anota(pagina, 'error de script: ' + e.message));
    hoja.on('requestfailed', (r) => anota(pagina, 'no cargó ' + r.url()));
    hoja.on('response', (r) => { if (r.status() >= 400) anota(pagina, r.status() + ' ' + r.url()); });
    await hoja.goto(BASE + pagina, { waitUntil: 'load' });
    await hoja.waitForTimeout(250);

    const datos = await hoja.evaluate(() => {
      const ids = {};
      document.querySelectorAll('[id]').forEach((e) => { ids[e.id] = (ids[e.id] || 0) + 1; });
      const niveles = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => Number(h.tagName[1]));
      const saltos = [];
      niveles.forEach((n, i) => { if (i && n > niveles[i - 1] + 1) saltos.push(`h${niveles[i - 1]}→h${n}`); });
      const meta = (n) => (document.querySelector(`meta[name="${n}"]`) || {}).content || '';
      return {
        titulo: document.title,
        descripcion: meta('description'),
        claves: meta('keywords'),
        lang: document.documentElement.lang,
        h1: niveles.filter((n) => n === 1).length,
        saltos,
        duplicados: Object.keys(ids).filter((k) => ids[k] > 1),
        sinAlt: [...document.querySelectorAll('img:not([alt])')].map((i) => i.getAttribute('src')),
        enlaces: [...document.querySelectorAll('a[href], link[href], script[src], img[src]')].map((e) => e.getAttribute('href') || e.getAttribute('src')),
        principales: document.querySelectorAll('main').length
      };
    });

    if (!datos.titulo) anota(pagina, 'sin <title>');
    if (titulos[datos.titulo]) anota(pagina, `título repetido con ${titulos[datos.titulo]}`);
    titulos[datos.titulo] = pagina;
    if (datos.titulo.length > 70) anota(pagina, `título de ${datos.titulo.length} caracteres`);
    if (!datos.descripcion) anota(pagina, 'sin meta description');
    if (!datos.claves) anota(pagina, 'sin meta keywords');
    if (!datos.lang) anota(pagina, 'sin lang');
    if (datos.h1 !== 1) anota(pagina, `${datos.h1} encabezados h1`);
    if (datos.principales !== 1) anota(pagina, `${datos.principales} elementos <main>`);
    datos.saltos.forEach((s) => anota(pagina, 'salto de encabezado ' + s));
    datos.duplicados.forEach((d) => anota(pagina, 'id duplicado #' + d));
    datos.sinAlt.forEach((s) => anota(pagina, 'imagen sin alt: ' + s));

    /* Enlaces internos: el archivo existe y, si hay ancla, también su id. */
    for (const href of new Set(datos.enlaces)) {
      if (!href || /^(https?:|mailto:|data:|#$)/.test(href)) continue;
      const [ruta, ancla] = href.split('#');
      const archivo = ruta ? path.resolve(RAIZ, path.dirname(pagina), ruta.split('?')[0]) : path.resolve(RAIZ, pagina);
      if (!fs.existsSync(archivo)) { anota(pagina, 'enlace roto: ' + href); continue; }
      if (ancla && /\.html$/.test(archivo)) {
        const html = fs.readFileSync(archivo, 'utf8');
        if (!new RegExp(`id="${ancla}"`).test(html)) anota(pagina, 'ancla inexistente: ' + href);
      }
    }

    for (const ancho of ANCHOS) {
      await hoja.setViewportSize({ width: ancho, height: 800 });
      await hoja.waitForTimeout(120);
      const sobra = await hoja.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (sobra > 1) anota(pagina, `desborde horizontal de ${sobra}px a ${ancho}px`);
    }

    if (axe) {
      for (const ancho of [390, 1280]) {
        await hoja.setViewportSize({ width: ancho, height: 800 });
        await hoja.waitForTimeout(120);
        await hoja.evaluate(axe);
        const resultado = await hoja.evaluate(() => window.axe.run(document, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] }
        }));
        resultado.violations.forEach((v) => {
          anota(pagina, `axe (${ancho}px) ${v.id}: ${v.help} — ${v.nodes.length} nodo(s), p. ej. ${v.nodes[0].target.join(' ')}`);
        });
      }
    }
    await contexto.close();
  }

  await navegador.close();
  console.log(`${PAGINAS.length} páginas revisadas${axe ? ', con axe-core' : ' (sin axe-core)'}.`);
  if (problemas.length) {
    console.log(problemas.join('\n'));
    process.exit(1);
  }
  console.log('Sin problemas.');
})();
