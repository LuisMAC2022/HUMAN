/* HUMAN STEM — planos.js
   Común a todas las páginas. Va en <head> sin defer porque `pagereveal`
   debe escucharse antes del primer pintado. Nada de lo que hace es
   indispensable: sin JavaScript el menú queda desplegado y los enlaces
   navegan igual. */
(function () {
  'use strict';
  var raiz = document.documentElement;
  raiz.classList.add('js');

  /* Cota de cada plano: el cielo arriba, la tierra abajo. */
  var COTAS = { 'superman.html': 1, 'index.html': 0, '': 0, 'miltli.html': -1 };
  function cota(url) {
    try {
      var archivo = new URL(url, location.href).pathname.split('/').pop();
      return Object.prototype.hasOwnProperty.call(COTAS, archivo) ? COTAS[archivo] : null;
    } catch (error) {
      return null;
    }
  }

  /* Al cambiar de plano la página entra desde arriba o desde abajo
     (las animaciones están en comun.css). */
  window.addEventListener('pagereveal', function (evento) {
    var origen = window.navigation && navigation.activation && navigation.activation.from;
    if (!evento.viewTransition || !origen) return;
    var desde = cota(origen.url);
    var hasta = cota(location.href);
    if (desde === null || hasta === null || desde === hasta) return;
    raiz.dataset.viaje = hasta > desde ? 'sube' : 'baja';
    evento.viewTransition.finished.then(function () {
      delete raiz.dataset.viaje;
      if (hasta === 1) {
        raiz.classList.add('estrellas-entran');
        window.setTimeout(function () { raiz.classList.remove('estrellas-entran'); }, 1200);
      }
    }, function () { delete raiz.dataset.viaje; });
  });

  document.addEventListener('DOMContentLoaded', function () {
    var menu = document.querySelector('.menu');
    var boton = menu && menu.querySelector('.menu__boton');
    if (!boton) return;

    function abrir(abierto) {
      menu.dataset.abierto = String(abierto);
      boton.setAttribute('aria-expanded', String(abierto));
    }
    boton.addEventListener('click', function () { abrir(menu.dataset.abierto !== 'true'); });
    menu.addEventListener('click', function (evento) {
      if (evento.target.closest('.menu__lista a, .tour-entrada')) abrir(false);
    });
    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape' && menu.dataset.abierto === 'true') {
        abrir(false);
        boton.focus();
      }
    });
  });
})();
