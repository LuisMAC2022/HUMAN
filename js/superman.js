/* HUMAN STEM — superman.js
   1. Constelación: enciende cada estrella al llegar a su sección.
   2. Simulador: dos músculos antagonistas gobiernan la mano.
   Sin este archivo la página se lee completa: la constelación es una
   lista de enlaces y el esquema queda fijo con su explicación. */
(function () {
  'use strict';

  var calma = window.matchMedia('(prefers-reduced-motion: reduce)');
  function $(id) { return document.getElementById(id); }
  function lista(nodos) { return Array.prototype.slice.call(nodos); }

  /* =================================================================
     1. Constelación
     ================================================================= */
  (function constelacion() {
    var carta = $('carta');
    if (!carta) return;
    var enlaces = lista(carta.querySelectorAll('[data-estrella]'));
    var trazas = lista(carta.querySelectorAll('[data-traza]'));
    var avance = $('carta-avance');
    var secciones = enlaces.map(function (enlace) { return document.querySelector(enlace.hash); });
    var vistas = {};
    var actual = -1;
    var pendiente = false;

    function pintar() {
      var total = enlaces.length;
      var cuenta = Object.keys(vistas).length;
      var completa = cuenta === total;
      enlaces.forEach(function (enlace, i) {
        enlace.dataset.vista = String(Boolean(vistas[i]));
        if (i === actual) enlace.setAttribute('aria-current', 'true');
        else enlace.removeAttribute('aria-current');
      });
      trazas.forEach(function (traza) {
        var clave = traza.dataset.traza;
        var encendida = clave === 'fin' ? completa : Boolean(vistas[Number(clave) - 1]);
        traza.classList.toggle('encendida', encendida);
      });
      carta.dataset.completa = String(completa);
      avance.hidden = false;
      avance.textContent = completa ? 'Constelación completa' : cuenta + ' de ' + total + ' estrellas encendidas';
    }

    /* La sección «actual» es la última cuyo inicio ya cruzó el tercio
       superior de la ventana. */
    function ubicar() {
      pendiente = false;
      var marca = window.innerHeight * .38;
      var indice = 0;
      secciones.forEach(function (seccion, i) {
        if (seccion.getBoundingClientRect().top <= marca) indice = i;
      });
      var alFinal = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (alFinal) indice = secciones.length - 1;
      if (indice === actual && vistas[indice]) return;
      actual = indice;
      vistas[indice] = true;
      pintar();
    }
    function pedir() {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(ubicar);
    }

    window.addEventListener('scroll', pedir, { passive: true });
    window.addEventListener('resize', pedir, { passive: true });
    ubicar();
  })();

  /* =================================================================
     2. Simulador
     Control proporcional de dos sitios, como en las prótesis
     mioeléctricas reales: por encima del umbral, los flexores cierran
     y los extensores abren a una velocidad proporcional a la señal;
     sin señal, los motores se detienen y la mano conserva su posición.
     La co-contracción cambia el agarre.
     ================================================================= */
  var lienzo = $('sim');
  if (!lienzo) return;

  var UMBRAL = .30;
  var MAX_UV = 480;
  var V_MAX = 1.6;       // fracción del recorrido por segundo con la señal al máximo
  var CO = .45;          // nivel que ambos canales deben superar para co-contraer
  var AGARRES = ['Puño', 'Pinza', 'Señalar'];

  /* Posturas en grados. Cada dedo: [nudillo, falange media, punta];
     pulgar: [base, punta]. Positivo = flexión (giro horario en pantalla).
     La mano interpola entre ABIERTA y la postura del agarre activo. */
  var DEDOS = ['indice', 'medio', 'anular', 'menique'];
  var ABIERTA = {
    indice: [-6, 5, 4], medio: [-1, 6, 5], anular: [4, 6, 5], menique: [9, 6, 5], pulgar: [30, 8]
  };
  var CERRADO = [78, 96, 62];
  var POSTURAS = {
    'Puño': { indice: CERRADO, medio: CERRADO, anular: CERRADO, menique: CERRADO, pulgar: [6, 36] },
    'Pinza': { indice: [50, 60, 26], medio: CERRADO, anular: CERRADO, menique: CERRADO, pulgar: [50, 2] },
    /* El índice se queda extendido en horizontal; el pulgar cierra sobre
       los otros tres dedos. */
    'Señalar': { indice: [-4, 2, 2], medio: CERRADO, anular: CERRADO, menique: CERRADO, pulgar: [13, 36] }
  };

  var canales = {
    f: crearCanal('f', 30),
    e: crearCanal('e', 82)
  };
  var balanza = $('balanza');
  var decision = $('decision');
  var orden = $('orden');
  var aguja = $('servo-aguja');
  var blanco = $('blanco');
  var estado = $('estado');
  var voz = $('agarre-voz');
  var chips = lista($('agarres').children);
  var facetas = lista(document.querySelectorAll('#facetas details'));
  var ambos = $('btn-co');

  var articulaciones = {};
  DEDOS.concat('pulgar').forEach(function (dedo) {
    articulaciones[dedo] = ABIERTA[dedo].map(function (angulo, i) {
      return { nodo: $(dedo + '-' + (i + 1)), angulo: angulo };
    });
  });

  var posicion = 0;        // 0 = mano abierta, 1 = agarre completo
  var agarre = 0;
  var cerrojoCo = false;   // un cambio de agarre por cada co-contracción
  var ultimo = 0;
  var corriendo = false;
  var visible = false;
  var guion = 0;

  function crearCanal(clave, base) {
    var canal = {
      boton: $('btn-' + clave),
      tono: $('tono-' + clave),
      lectura: $('uv-' + clave),
      barra: $('nivel-' + clave),
      traza: $('emg-' + clave),
      aro: $('aro-' + clave),
      fibra: $('fibra-' + clave),
      pesa: $('pesa-' + clave),
      sonda: $('sonda-' + clave),
      cable: $('cable-' + clave),
      base: base,
      nivel: 0,
      meta: 0,
      punteros: {},      // dedos o ratón que mantienen presionado el pulsador
      tecla: false,
      pulsoHasta: 0,
      muestras: [],
      uv: -1
    };
    for (var i = 0; i < 64; i++) canal.muestras.push(0);
    return canal;
  }

  function sostenido(canal, ahora) {
    return canal.tecla || ahora < canal.pulsoHasta || Object.keys(canal.punteros).length > 0;
  }

  /* ---------- Entradas ---------- */
  Object.keys(canales).forEach(function (clave) {
    var canal = canales[clave];
    var boton = canal.boton;

    boton.addEventListener('pointerdown', function (evento) {
      if (evento.button > 0) return;
      canal.punteros[evento.pointerId] = true;
      /* La captura mantiene el pulsador activo aunque el dedo se deslice,
         y permite un dedo en cada pulsador a la vez. */
      try { boton.setPointerCapture(evento.pointerId); } catch (error) { /* puntero ya liberado */ }
      despertar();
    });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (tipo) {
      boton.addEventListener(tipo, function (evento) { delete canal.punteros[evento.pointerId]; });
    });
    boton.addEventListener('contextmenu', function (evento) { evento.preventDefault(); });
    boton.addEventListener('keydown', function (evento) {
      if (evento.key !== ' ' && evento.key !== 'Enter') return;
      evento.preventDefault();
      canal.tecla = true;
      despertar();
    });
    boton.addEventListener('keyup', function (evento) {
      if (evento.key === ' ' || evento.key === 'Enter') canal.tecla = false;
    });
    boton.addEventListener('blur', function () { canal.tecla = false; });
    canal.tono.addEventListener('input', despertar);
  });

  /* Teclas F y J desde cualquier parte de la página, salvo al escribir. */
  var TECLAS = { KeyF: 'f', KeyJ: 'e' };
  document.addEventListener('keydown', function (evento) {
    var clave = TECLAS[evento.code];
    if (!clave || evento.repeat || evento.ctrlKey || evento.metaKey || evento.altKey || !visible) return;
    if (evento.target.closest && evento.target.closest('input, textarea, select, [contenteditable]')) return;
    canales[clave].tecla = true;
    despertar();
  });
  document.addEventListener('keyup', function (evento) {
    var clave = TECLAS[evento.code];
    if (clave) canales[clave].tecla = false;
  });
  /* Si la ventana pierde el foco no queda ningún canal «pegado». */
  window.addEventListener('blur', soltarTodo);
  document.addEventListener('visibilitychange', function () { if (document.hidden) soltarTodo(); });
  function soltarTodo() {
    Object.keys(canales).forEach(function (clave) {
      canales[clave].tecla = false;
      canales[clave].punteros = {};
      canales[clave].pulsoHasta = 0;
    });
  }

  /* Alternativa de un solo toque a presionar los dos pulsadores. */
  function pulsar(claves, milisegundos) {
    var hasta = performance.now() + milisegundos;
    claves.forEach(function (clave) { canales[clave].pulsoHasta = hasta; });
    despertar();
  }
  ambos.addEventListener('click', function () { pulsar(['f', 'e'], 650); });

  var demoTemporizador = 0;
  var demoActivo = false;
  var demoPasos = [
    { canales: ['f'], tiempo: 2500 }, { canales: [], tiempo: 1000 },
    { canales: ['e'], tiempo: 2500 }, { canales: [], tiempo: 1000 },
    { canales: ['f', 'e'], tiempo: 650 }, { canales: [], tiempo: 900 }
  ];
  window.humanStemDemo = {
    simulador: function (activo) {
      window.clearTimeout(demoTemporizador);
      if (demoActivo) {
        canales.f.pulsoHasta = 0;
        canales.e.pulsoHasta = 0;
      }
      demoActivo = activo;
      if (!activo) return;
      function ejecutar(indice) {
        var paso = demoPasos[indice];
        pulsar(paso.canales, paso.tiempo);
        demoTemporizador = window.setTimeout(function () {
          ejecutar((indice + 1) % demoPasos.length);
        }, paso.tiempo);
      }
      ejecutar(0);
    }
  };

  $('consola').addEventListener('submit', function (evento) { evento.preventDefault(); });

  /* ---------- Facetas: abrir una la aísla en el esquema ---------- */
  facetas.forEach(function (faceta) {
    faceta.addEventListener('toggle', function () {
      var abierta = facetas.filter(function (f) { return f.open; }).pop();
      if (abierta) lienzo.dataset.foco = abierta.dataset.capa;
      else delete lienzo.dataset.foco;
    });
  });
  /* Al imprimir se muestran las cuatro explicaciones. */
  window.addEventListener('beforeprint', function () {
    facetas.forEach(function (f) { f.removeAttribute('name'); f.open = true; });
    delete lienzo.dataset.foco;
  });
  window.addEventListener('afterprint', function () {
    facetas.forEach(function (f) { f.open = false; f.setAttribute('name', 'faceta'); });
  });

  /* ---------- Dibujo ---------- */
  function trazaEMG(canal) {
    var x0 = 24, x1 = 176, n = canal.muestras.length, amplitud = 12;
    var d = '';
    for (var i = 0; i < n; i++) {
      var x = x0 + (x1 - x0) * i / (n - 1);
      var y = canal.base - canal.muestras[i] * amplitud;
      d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
    }
    return d;
  }

  function texto(nodo, valor) { if (nodo.textContent !== valor) nodo.textContent = valor; }

  function cuadro(ahora) {
    var dt = ultimo ? Math.min(.05, (ahora - ultimo) / 1000) : 0;
    ultimo = ahora;
    var f = canales.f, e = canales.e;

    Object.keys(canales).forEach(function (clave) {
      var canal = canales[clave];
      var presionado = sostenido(canal, ahora);
      canal.meta = presionado ? 1 : canal.tono.value / 100;
      /* Sube rápido y baja más lento, como una contracción real. */
      var ritmo = canal.meta > canal.nivel ? 14 : 6;
      canal.nivel += (canal.meta - canal.nivel) * Math.min(1, ritmo * dt);
      if (canal.nivel < .002) canal.nivel = 0;

      if (canal.boton.getAttribute('aria-pressed') !== String(presionado)) {
        canal.boton.setAttribute('aria-pressed', String(presionado));
      }
      var uv = Math.round(canal.nivel * MAX_UV);
      if (uv !== canal.uv) {
        canal.uv = uv;
        canal.lectura.textContent = uv;
        canal.barra.style.width = (canal.nivel * 100).toFixed(1) + '%';
      }

      /* Electromiograma: cada cuadro entra una muestra y sale la más vieja.
         Con movimiento reducido se dibuja una ráfaga fija a escala. */
      if (calma.matches) {
        for (var i = 0; i < canal.muestras.length; i++) {
          canal.muestras[i] = canal.nivel * Math.sin(i * 1.4) * (.45 + .55 * Math.sin(i * .37 + 1));
        }
      } else if (dt) {
        canal.muestras.shift();
        canal.muestras.push((Math.random() * 2 - 1) * canal.nivel);
      }
      canal.traza.setAttribute('d', trazaEMG(canal));

      canal.aro.setAttribute('r', (6 + canal.nivel * 5).toFixed(1));
      canal.fibra.style.strokeWidth = (2 + canal.nivel * 4).toFixed(1);
      canal.pesa.setAttribute('r', (4.5 + canal.nivel * 4.5).toFixed(1));
      var brillo = (.4 + canal.nivel * .6).toFixed(2);
      canal.sonda.style.opacity = brillo;
      canal.cable.style.opacity = brillo;
    });

    /* Co-contracción: cuenta solo si ambos se están contrayendo a la vez;
       pasar de cerrar a abrir (una señal baja mientras la otra sube) no
       cambia el agarre. */
    var minimo = Math.min(f.nivel, e.nivel);
    var co = minimo > CO && Math.min(f.meta, e.meta) > CO;
    if (co && !cerrojoCo) {
      agarre = (agarre + 1) % AGARRES.length;
      cerrojoCo = true;
      chips.forEach(function (chip, i) {
        if (i === agarre) chip.setAttribute('aria-current', 'true');
        else chip.removeAttribute('aria-current');
      });
      voz.textContent = 'Agarre: ' + AGARRES[agarre];
      if (navigator.vibrate) navigator.vibrate(18);
    }
    if (minimo < .18) cerrojoCo = false;
    var nombre = AGARRES[agarre];

    /* La diferencia gobierna el movimiento. */
    var diferencia = f.nivel - .9 * e.nivel;
    var cierre = Math.max(0, Math.min(1, diferencia));
    var apertura = Math.max(0, Math.min(1, -diferencia));
    var cerrando = cierre > UMBRAL && !co;
    var abriendo = apertura > UMBRAL && !co;
    if (cerrando) posicion = Math.min(1, posicion + V_MAX * (cierre - UMBRAL) / (1 - UMBRAL) * dt);
    if (abriendo) posicion = Math.max(0, posicion - V_MAX * (apertura - UMBRAL) / (1 - UMBRAL) * dt);
    var moviendo = (cerrando && posicion < 1) || (abriendo && posicion > 0);

    /* Balanza: baja del lado de la señal más fuerte. */
    var inclinacion = Math.max(-14, Math.min(14, (e.nivel - f.nivel) * 20));
    balanza.setAttribute('transform', 'rotate(' + inclinacion.toFixed(1) + ' 278 48)');
    decision.style.fill = co ? 'var(--oro)' : (cerrando ? 'var(--flex)' : (abriendo ? 'var(--ext)' : ''));
    decision.style.opacity = (co || cerrando || abriendo) ? '1' : '';

    /* Mano: cada articulación persigue su ángulo meta. */
    var postura = POSTURAS[nombre];
    var extra = (abriendo && posicion === 0) ? -5 * apertura : 0;   // extensión activa
    var suavizado = dt ? Math.min(1, 16 * dt) : 1;
    Object.keys(articulaciones).forEach(function (dedo) {
      articulaciones[dedo].forEach(function (articulacion, i) {
        var meta = ABIERTA[dedo][i] + (postura[dedo][i] - ABIERTA[dedo][i]) * posicion;
        if (i === 0 && dedo !== 'pulgar') meta += extra;
        articulacion.angulo += (meta - articulacion.angulo) * suavizado;
        articulacion.nodo.setAttribute('transform', 'rotate(' + articulacion.angulo.toFixed(2) + ')');
      });
    });
    aguja.setAttribute('transform', 'rotate(' + (posicion * 250).toFixed(1) + ')');
    orden.style.opacity = moviendo ? '1' : '';
    if (moviendo && !calma.matches) {
      guion -= 40 * dt;
      orden.style.strokeDashoffset = guion.toFixed(1);
    }
    blanco.style.opacity = nombre === 'Señalar' ? posicion.toFixed(2) : '0';

    /* Estado en palabras. */
    var mensaje;
    var activo = false;
    if (co) { mensaje = 'Cambio de agarre'; activo = true; }
    else if (cerrando) { mensaje = posicion < .99 ? 'Cerrando' : 'Agarre completo'; activo = true; }
    else if (abriendo) { mensaje = posicion > .01 ? 'Abriendo' : 'Mano abierta'; activo = true; }
    else if (f.nivel < .02 && e.nivel < .02) { mensaje = posicion > .01 ? 'Sosteniendo' : 'En reposo'; }
    else { mensaje = 'Señal bajo el umbral'; }
    texto(estado, mensaje);
    estado.classList.toggle('activo', activo);

    /* La señal recorre las cuatro facetas. */
    var etapas = [
      f.nivel > .02 || e.nivel > .02,
      f.nivel > .08 || e.nivel > .08,
      cerrando || abriendo || co,
      moviendo
    ];
    facetas.forEach(function (faceta, i) { faceta.classList.toggle('activa', etapas[i]); });

    /* El bucle se detiene cuando todo está en reposo o fuera de pantalla. */
    var quieto = !moviendo && f.nivel === 0 && e.nivel === 0 && f.meta === 0 && e.meta === 0 &&
      f.muestras.every(function (m) { return m === 0; }) && e.muestras.every(function (m) { return m === 0; });
    if (visible && !quieto) requestAnimationFrame(cuadro);
    else { corriendo = false; ultimo = 0; }
  }

  function despertar() {
    if (corriendo || !visible) return;
    corriendo = true;
    requestAnimationFrame(cuadro);
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entradas) {
      visible = entradas[0].isIntersecting;
      if (visible) despertar();
      else soltarTodo();
    }).observe($('simulador'));
  } else {
    visible = true;
  }
  calma.addEventListener('change', despertar);
})();
