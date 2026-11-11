/* HUMAN STEM — horizonte.js
   Mejora la portada: la camioneta rueda al recorrer las secciones,
   la sierra se mueve en paralaje y la navegación de paradas marca dónde
   estás. Sin este archivo el recorrido sigue funcionando: es un
   contenedor con desplazamiento horizontal y enlaces de ancla. */
(function () {
  'use strict';

  var escena = document.querySelector('.escena');
  var pista = document.getElementById('recorrido');
  if (!escena || !pista) return;

  var paradas = Array.prototype.slice.call(pista.querySelectorAll('.parada'));
  var puntos = Array.prototype.slice.call(escena.querySelectorAll('.paradas ol a'));
  var anterior = escena.querySelector('.paradas__paso[data-paso="-1"]');
  var siguiente = escena.querySelector('.paradas__paso[data-paso="1"]');
  var destino = escena.querySelector('.paradas__destino');
  var camioneta = escena.querySelector('.camioneta');
  var ruedas = Array.prototype.slice.call(escena.querySelectorAll('.camioneta__rueda'));
  var sierra = escena.querySelector('.escena__sierra');
  var menu = Array.prototype.slice.call(document.querySelectorAll('.menu__lista a'));
  var calma = window.matchMedia('(prefers-reduced-motion: reduce)');

  var actual = -1;
  var cuadroPendiente = false;
  var diametroRueda = 0;
  var reposo = 0;
  var ultimoPasoConRueda = 0;
  var iniciado = false;

  /* Anclas de versiones anteriores del sitio. */
  var ingles = document.documentElement.lang === 'en';
  var about = ingles ? '#about-us' : '#quienes-somos';
  var ALIAS = {
    '#colaboraciones': ingles ? '#collaborate' : '#colabora',
    '#mision-vision': about, '#mission-vision': about, '#mision': about, '#mission': about, '#vision': about
  };
  if (Object.prototype.hasOwnProperty.call(ALIAS, location.hash)) location.replace(ALIAS[location.hash]);

  function nombre(indice) {
    return puntos[indice] ? puntos[indice].textContent.trim() : '';
  }

  function ir(indice) {
    var total = paradas.length;
    var meta = paradas[(indice + total) % total];
    pista.scrollTo({ left: meta.offsetLeft, behavior: calma.matches ? 'auto' : 'smooth' });
  }

  window.humanStemHorizon = function (ancla) {
    var indice = paradas.findIndex(function (parada) { return '#' + parada.id === ancla; });
    if (indice < 0) return;
    ir(indice);
  };

  function marcar(indice) {
    actual = indice;
    escena.classList.toggle('escena--inicio', indice === 0);
    var id = paradas[indice].id;
    var ultima = indice === paradas.length - 1;

    puntos.forEach(function (punto, i) {
      if (i === indice) punto.setAttribute('aria-current', 'true');
      else punto.removeAttribute('aria-current');
    });
    menu.forEach(function (enlace) {
      if (enlace.hash === '#' + id) enlace.setAttribute('aria-current', 'true');
      else if (enlace.hash) enlace.removeAttribute('aria-current');
    });

    anterior.disabled = indice === 0;
    destino.textContent = nombre(ultima ? 0 : indice + 1);
    siguiente.setAttribute('aria-label', (ultima ? siguiente.dataset.vuelve : siguiente.dataset.sigue) + destino.textContent);

    /* La dirección refleja la sección sin llenar el historial. La primera
       vez no se toca: el navegador aún puede estar yendo al ancla pedida. */
    if (!iniciado) { iniciado = true; return; }
    var hash = indice === 0 ? location.pathname + location.search : '#' + id;
    try { history.replaceState(null, '', hash); } catch (error) { /* file:// en algunos navegadores */ }
  }

  function pintar() {
    cuadroPendiente = false;
    var x = pista.scrollLeft;
    var ancho = pista.clientWidth || 1;

    if (!calma.matches) {
      /* La rueda gira lo que recorre: una vuelta por cada perímetro. */
      var giro = x / (Math.PI * diametroRueda) * 360;
      ruedas.forEach(function (rueda) { rueda.style.transform = 'rotate(' + giro.toFixed(1) + 'deg)'; });
      sierra.style.setProperty('--avance-sierra', (-x * .22).toFixed(1) + 'px');
    }

    var indice = Math.max(0, Math.min(paradas.length - 1, Math.round(x / ancho)));
    if (indice !== actual) marcar(indice);
  }

  function pedirCuadro() {
    if (cuadroPendiente) return;
    cuadroPendiente = true;
    requestAnimationFrame(pintar);
  }

  function medir() {
    var borde = escena.querySelector('.capa-suelo').getBoundingClientRect();
    document.body.style.setProperty('--cota-suelo', Math.round(borde.top + window.scrollY) + 'px');
    diametroRueda = (ruedas[0] && ruedas[0].getBoundingClientRect().width) || 30;
    pedirCuadro();
  }

  pista.addEventListener('scroll', function () {
    pedirCuadro();
    if (calma.matches) return;
    camioneta.classList.add('en-marcha');
    clearTimeout(reposo);
    reposo = setTimeout(function () { camioneta.classList.remove('en-marcha'); }, 160);
  }, { passive: true });

  [anterior, siguiente].forEach(function (boton) {
    boton.hidden = false;
    boton.addEventListener('click', function () { ir(actual + Number(boton.dataset.paso)); });
  });

  /* Flechas izquierda y derecha, salvo al escribir o dentro de un control. */
  document.addEventListener('keydown', function (evento) {
    if (evento.defaultPrevented || evento.altKey || evento.ctrlKey || evento.metaKey || evento.shiftKey) return;
    if (evento.key !== 'ArrowLeft' && evento.key !== 'ArrowRight') return;
    if (evento.target.closest && evento.target.closest('input, textarea, select, summary, [contenteditable]')) return;
    var meta = actual + (evento.key === 'ArrowRight' ? 1 : -1);
    if (meta < 0 || meta >= paradas.length) return;
    evento.preventDefault();
    ir(meta);
  });

  /* Con ratón: si la página no tiene desplazamiento vertical, la rueda
     avanza de parada en parada. */
  escena.addEventListener('wheel', function (evento) {
    if (evento.ctrlKey || Math.abs(evento.deltaY) <= Math.abs(evento.deltaX)) return;
    if (document.documentElement.scrollHeight > window.innerHeight + 2) return;
    var ahora = Date.now();
    if (ahora - ultimoPasoConRueda < 650 || Math.abs(evento.deltaY) < 12) return;
    var meta = actual + (evento.deltaY > 0 ? 1 : -1);
    if (meta < 0 || meta >= paradas.length) return;
    ultimoPasoConRueda = ahora;
    ir(meta);
  }, { passive: true });

  /* Al imprimir, la trayectoria del equipo sale desplegada. */
  var detallesImpresion = [];
  window.addEventListener('beforeprint', function () {
    detallesImpresion = Array.from(pista.querySelectorAll('details:not([open])'));
    detallesImpresion.forEach(function (detalle) { detalle.open = true; });
  });
  window.addEventListener('afterprint', function () {
    detallesImpresion.forEach(function (detalle) { detalle.open = false; });
  });

  if ('ResizeObserver' in window) new ResizeObserver(medir).observe(escena);
  window.addEventListener('resize', medir, { passive: true });
  window.addEventListener('load', medir);
  medir();
})();
