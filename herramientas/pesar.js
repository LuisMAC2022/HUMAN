#!/usr/bin/env node
/* Mide una primera carga por página. Requiere Playwright y un servidor local. */
const { chromium } = require('playwright');

const base = new URL(process.argv[2] || 'http://127.0.0.1:8123/');
const paginas = [
  'index.html', 'en/index.html', 'superman.html', 'miltli.html', 'mapa-del-sitio.html',
  'creditos.html', 'uso-responsable-ia.html', '404.html'
];

async function medir(navegador, archivo) {
  const contexto = await navegador.newContext({ viewport: { width: 390, height: 780 } });
  try {
    const pagina = await contexto.newPage();
    const cdp = await contexto.newCDPSession(pagina);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await pagina.addInitScript(() => {
      window.cambiosDeDiseno = 0;
      new PerformanceObserver(list => {
        for (const cambio of list.getEntries()) {
          if (!cambio.hadRecentInput) window.cambiosDeDiseno += cambio.value;
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });
    const respuestas = [];
    const externas = new Set();
    pagina.on('request', r => {
      if (new URL(r.url()).origin !== base.origin) externas.add(r.url());
    });
    pagina.on('response', r => respuestas.push(r));
    await pagina.goto(new URL(archivo, base).href, { waitUntil: 'load' });
    await pagina.evaluate(() => document.fonts.ready);
    await pagina.waitForTimeout(500);
    const datos = await pagina.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      return {
        dcl: Math.round(nav.domContentLoadedEventEnd),
        carga: Math.round(nav.loadEventEnd),
        cls: window.cambiosDeDiseno,
        recursos: performance.getEntriesByType('resource').map(r => [r.name, r.initiatorType, r.decodedBodySize])
      };
    });
    const recursos = await Promise.all(respuestas.map(async respuesta => {
      let bytes = Number(respuesta.headers()['content-length']) || 0;
      try { bytes = (await respuesta.body()).length; } catch (error) { /* Respuesta ya desalojada de la caché. */ }
      const solicitud = respuesta.request();
      const url = new URL(respuesta.url());
      const tipo = solicitud.resourceType();
      const proposito = solicitud.headers()['sec-purpose'] || solicitud.headers().purpose || '';
      const especulativa = proposito.includes('prefetch') || (tipo === 'other' && url.pathname.endsWith('.html'));
      return { nombre: url.pathname.slice(base.pathname.length), bytes, especulativa };
    }));
    const primarios = recursos.filter(r => !r.especulativa);
    const anticipados = recursos.filter(r => r.especulativa);
    const bytes = registros => registros.reduce((total, r) => total + r.bytes, 0);
    const masPesados = primarios.sort((a, b) => b.bytes - a.bytes).slice(0, 5);
    return {
      archivo, bytes: bytes(primarios), solicitudes: primarios.length,
      anticipadas: anticipados.length, bytesAnticipados: bytes(anticipados),
      dcl: datos.dcl, carga: datos.carga, cls: datos.cls, masPesados,
      externas: [...externas]
    };
  } finally { await contexto.close(); }
}

(async () => {
  const navegador = await chromium.launch();
  try {
    const resultado = [];
    for (const archivo of paginas) resultado.push(await medir(navegador, archivo));
    if (process.argv.includes('--json')) console.log(JSON.stringify(resultado, null, 2));
    else {
      console.log('Chromium ' + navegador.version() + ' · 390×780 · CPU 4× · primera carga');
      console.log('Bytes sin comprimir. Prefetch y prerender figuran aparte.');
      for (const r of resultado) {
        console.log(`${r.archivo} · ${r.bytes} B · ${r.solicitudes} solicitudes · anticipadas ${r.anticipadas} (${r.bytesAnticipados} B)`);
        console.log(`  DOMContentLoaded ${r.dcl} ms · carga ${r.carga} ms · CLS ${r.cls.toFixed(4)}`);
        console.log('  ' + r.masPesados.map(p => `${p.nombre} ${p.bytes} B`).join(' · '));
        console.log('  Otros orígenes · ' + (r.externas.join(', ') || '0'));
      }
    }
  } finally { await navegador.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
