/* Recorrido para la feria. Las duraciones se expresan en segundos. */
(function () {
  'use strict';

  const PASOS = [
    { pagina: 'index.html', ancla: '#inicio', segundos: 12, nombre: 'Inicio', en: ['#home', 'Home'] },
    { pagina: 'index.html', ancla: '#quienes-somos', segundos: 20, nombre: 'Quiénes somos', en: ['#about-us', 'About us'] },
    { pagina: 'superman.html', ancla: '#proposito', segundos: 20, nombre: 'Proyecto Superman' },
    { pagina: 'superman.html', ancla: '#funcionamiento', segundos: 45, nombre: 'Simulador de la prótesis', demo: 'simulador' },
    { pagina: 'superman.html', ancla: '#entrevista', segundos: 20, nombre: 'Entrevista' },
    { pagina: 'superman.html', ancla: '#glosario', segundos: 20, nombre: 'Glosario' },
    { pagina: 'superman.html', ancla: '#sumate', segundos: 20, nombre: 'Súmate' },
    { pagina: 'index.html', ancla: '#equipo', segundos: 20, nombre: 'Equipo', en: ['#team', 'Team'] },
    { pagina: 'miltli.html', ancla: '#raices', segundos: 30, nombre: 'Material previo', demo: 'capas' },
    { pagina: 'miltli.html', ancla: '#vida', segundos: 30, nombre: 'Qué se puede compostar' },
    { pagina: 'miltli.html', ancla: '#huellas', segundos: 30, nombre: 'Paso a paso', demo: 'composta' },
    { pagina: 'miltli.html', ancla: '#profundidad', segundos: 30, nombre: 'Participa' },
    { pagina: 'index.html', ancla: '#colabora', segundos: 30, nombre: 'Colabora', en: ['#collaborate', 'Collaborate'] }
  ];

  const LLAVE = 'human-stem.recorrido';
  const IDLE = 60000;
  const base = new URL('../', document.currentScript.src);
  const menu = document.querySelector('.menu__lista');
  if (!menu) return;

  const en = document.documentElement.lang === 'en';
  const palabras = en ? {
    tour: 'Tour', anterior: 'Previous stop', pausa: 'Pause tour', sigue: 'Resume tour',
    siguiente: 'Next stop', salir: 'Exit tour', progreso: 'Time at this stop'
  } : {
    tour: 'Recorrido', anterior: 'Parada anterior', pausa: 'Pausar recorrido', sigue: 'Reanudar recorrido',
    siguiente: 'Siguiente parada', salir: 'Salir del recorrido', progreso: 'Tiempo de la parada'
  };
  const calma = window.matchMedia('(prefers-reduced-motion: reduce)');
  let estado = leer();
  let fin = 0;
  let reloj = 0;
  let descanso = 0;
  let demo = null;

  function leer() {
    try {
      const guardado = JSON.parse(sessionStorage.getItem(LLAVE));
      if (guardado && Number.isInteger(guardado.indice) && PASOS[guardado.indice] &&
          Number.isFinite(guardado.restante) && guardado.restante >= 0) return guardado;
    } catch (error) { /* El modo de archivos locales puede bloquear sessionStorage. */ }
    return null;
  }

  function guardar() {
    try {
      if (estado) sessionStorage.setItem(LLAVE, JSON.stringify(estado));
      else sessionStorage.removeItem(LLAVE);
    } catch (error) { /* El recorrido de esta página sigue disponible. */ }
  }

  function crearBoton(nombre, simbolo) {
    const control = document.createElement('button');
    control.type = 'button';
    control.textContent = simbolo;
    control.setAttribute('aria-label', nombre);
    return control;
  }

  const entrada = crearBoton(palabras.tour, palabras.tour);
  entrada.className = 'tour-entrada';
  entrada.setAttribute('aria-controls', 'tour');
  entrada.setAttribute('aria-expanded', 'false');
  const item = document.createElement('li');
  item.append(entrada);
  menu.append(item);

  const barra = document.createElement('aside');
  barra.id = 'tour';
  barra.className = 'tour';
  barra.hidden = true;
  barra.setAttribute('aria-label', palabras.tour);
  const anterior = crearBoton(palabras.anterior, '‹');
  const reproducir = crearBoton(palabras.pausa, 'Ⅱ');
  const siguiente = crearBoton(palabras.siguiente, '›');
  const salir = crearBoton(palabras.salir, '×');
  const marcador = document.createElement('span');
  const contador = document.createElement('span');
  const progreso = document.createElement('progress');
  const aviso = document.createElement('span');
  marcador.className = 'tour__estado';
  progreso.setAttribute('aria-label', palabras.progreso);
  aviso.className = 'solo-lector';
  aviso.setAttribute('aria-live', 'polite');
  marcador.append(contador, progreso, aviso);
  barra.append(anterior, reproducir, siguiente, marcador, salir);
  document.body.append(barra);

  function destino() {
    const paso = PASOS[estado.indice];
    const traduccion = estado.ingles && paso.en;
    return {
      paso,
      url: new URL((traduccion ? 'en/' : '') + paso.pagina, base),
      ancla: traduccion ? paso.en[0] : paso.ancla,
      nombre: en && paso.en ? paso.en[1] : paso.nombre
    };
  }

  function enPagina(url) {
    const actual = location.pathname.endsWith('/') ? location.pathname + 'index.html' : location.pathname;
    return actual === url.pathname;
  }

  function ubicar(irAPagina) {
    const { paso, url, ancla } = destino();
    if (!enPagina(url)) {
      if (irAPagina) {
        url.hash = ancla;
        guardar();
        location.assign(url.href);
      }
      return false;
    }
    if (window.humanStemHorizon) window.humanStemHorizon(ancla);
    else {
      const objetivo = document.getElementById(paso.demo === 'simulador' ? 'simulador' : ancla.slice(1));
      if (objetivo) objetivo.scrollIntoView({ block: 'start', behavior: calma.matches ? 'auto' : 'smooth' });
    }
    return true;
  }

  function activarDemo(activa) {
    if (demo) demo(false);
    demo = null;
    if (!activa) return;
    const clave = PASOS[estado.indice].demo;
    if (clave && window.humanStemDemo) {
      demo = window.humanStemDemo[clave];
      if (demo) demo(true);
    }
  }

  function mostrar() {
    barra.hidden = !estado;
    entrada.setAttribute('aria-expanded', String(Boolean(estado)));
    document.body.classList.toggle('tour-activado', Boolean(estado));
    if (!estado) return;
    const { paso, nombre } = destino();
    const posicion = (estado.indice + 1) + ' / ' + PASOS.length;
    contador.textContent = posicion;
    const mensaje = posicion + ' · ' + nombre;
    if (aviso.textContent !== mensaje) aviso.textContent = mensaje;
    reproducir.setAttribute('aria-label', estado.pausado ? palabras.sigue : palabras.pausa);
    reproducir.textContent = estado.pausado ? '▶' : 'Ⅱ';
    progreso.max = paso.segundos * 1000;
    progreso.value = progreso.max - estado.restante;
  }

  function pararReloj() {
    if (fin) estado.restante = Math.max(0, fin - performance.now());
    fin = 0;
    clearInterval(reloj);
    clearTimeout(descanso);
    activarDemo(false);
  }

  function reproducirPaso() {
    estado.pausado = false;
    estado.reanudarEn = 0;
    guardar();
    mostrar();
    if (!ubicar(true)) return;
    fin = performance.now() + estado.restante;
    activarDemo(true);
    reloj = setInterval(function () {
      const restante = Math.max(0, fin - performance.now());
      progreso.value = progreso.max - restante;
      if (!restante) avanzar(1);
    }, 100);
  }

  function programarReanudacion() {
    clearTimeout(descanso);
    if (estado.reanudarEn) {
      descanso = setTimeout(reproducirPaso, Math.max(0, estado.reanudarEn - Date.now()));
    }
  }

  function pausar(automatica) {
    if (!estado) return;
    if (automatica && estado.pausado && !estado.reanudarEn) return;
    pararReloj();
    estado.pausado = true;
    estado.reanudarEn = automatica ? Date.now() + IDLE : 0;
    guardar();
    mostrar();
    programarReanudacion();
  }

  function alternar() {
    if (!estado) return;
    if (estado.pausado) {
      clearTimeout(descanso);
      reproducirPaso();
    } else pausar(false);
  }

  function avanzar(delta, foco) {
    pararReloj();
    estado.indice = (estado.indice + delta + PASOS.length) % PASOS.length;
    estado.restante = PASOS[estado.indice].segundos * 1000;
    estado.foco = foco || '';
    if (!estado.pausado) reproducirPaso();
    else {
      guardar();
      mostrar();
      ubicar(true);
      programarReanudacion();
    }
  }

  function comenzar(enfocar) {
    if (estado) pararReloj();
    estado = { indice: 0, restante: PASOS[0].segundos * 1000, pausado: false, reanudarEn: 0,
      ingles: en, foco: enfocar ? 'reproducir' : '' };
    reproducirPaso();
    if (enfocar) reproducir.focus({ preventScroll: true });
  }

  function cerrar() {
    pararReloj();
    estado = null;
    guardar();
    mostrar();
    const botonMenu = document.querySelector('.menu__boton');
    const objetivo = entrada.getClientRects().length ? entrada : botonMenu;
    if (objetivo) objetivo.focus({ preventScroll: true });
  }

  entrada.addEventListener('click', function () {
    if (estado) reproducir.focus({ preventScroll: true });
    else comenzar(true);
  });
  anterior.addEventListener('click', () => avanzar(-1, 'anterior'));
  siguiente.addEventListener('click', () => avanzar(1, 'siguiente'));
  reproducir.addEventListener('click', alternar);
  salir.addEventListener('click', cerrar);

  document.addEventListener('keydown', function (evento) {
    if (!estado || evento.altKey || evento.ctrlKey || evento.metaKey) return;
    if (evento.key === 'Escape') {
      evento.preventDefault();
      evento.stopImmediatePropagation();
      cerrar();
      return;
    }
    const escribiendo = evento.target.closest && evento.target.closest('input, textarea, select, [contenteditable]');
    const enBarra = barra.contains(evento.target);
    const accion = !escribiendo && (evento.key === 'ArrowRight' || evento.key === 'ArrowLeft' ||
      (evento.key === ' ' && !enBarra));
    if (accion) {
      evento.preventDefault();
      evento.stopImmediatePropagation();
      if (evento.repeat) return;
      if (evento.key === ' ') alternar();
      else avanzar(evento.key === 'ArrowRight' ? 1 : -1);
    } else if (!enBarra) pausar(true);
  }, true);

  function interaccion(evento) {
    if (estado && !barra.contains(evento.target) && !entrada.contains(evento.target)) pausar(true);
  }
  document.addEventListener('pointerdown', interaccion, { capture: true, passive: true });
  document.addEventListener('wheel', interaccion, { capture: true, passive: true });
  window.addEventListener('pagehide', function () {
    if (!estado) return;
    pararReloj();
    guardar();
  });
  window.addEventListener('pageshow', function (evento) {
    if (!evento.persisted) return;
    estado = leer();
    recuperar();
  });

  function recuperar() {
    mostrar();
    if (!estado) return;
    if (estado.pausado) {
      ubicar(false);
      programarReanudacion();
    } else reproducirPaso();
    const controles = { anterior, siguiente, reproducir };
    if (enPagina(destino().url) && controles[estado.foco]) {
      controles[estado.foco].focus({ preventScroll: true });
      estado.foco = '';
      guardar();
    }
  }

  const url = new URL(location.href);
  if (url.searchParams.get('tour') === '1') {
    url.searchParams.delete('tour');
    try { history.replaceState(history.state, '', url.href); } catch (error) { /* file:// */ }
    comenzar(false);
  } else recuperar();
})();
