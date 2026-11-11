/* Buscador: filtra el mapa del sitio. Sin JavaScript, el mapa completo
   sigue disponible como lista de enlaces. */
(function () {
  var campo = document.getElementById('consulta');
  var estado = document.getElementById('mapa-estado');
  var vacio = document.getElementById('mapa-vacio');
  var grupos = Array.prototype.slice.call(document.querySelectorAll('.mapa__grupo'));
  function llano(texto) { return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
  var entradas = Array.prototype.slice.call(document.querySelectorAll('[data-busca]')).map(function (li) {
    return { nodo: li, texto: llano(li.textContent + ' ' + li.dataset.busca) };
  });
  function filtrar() {
    var palabras = llano(campo.value).split(/\s+/).filter(Boolean);
    var cuenta = 0;
    entradas.forEach(function (entrada) {
      var coincide = palabras.every(function (p) { return entrada.texto.indexOf(p) !== -1; });
      entrada.nodo.hidden = !coincide;
      if (coincide) cuenta += 1;
    });
    grupos.forEach(function (grupo) { grupo.hidden = !grupo.querySelector('li:not([hidden])'); });
    vacio.hidden = cuenta !== 0;
    if (!palabras.length) estado.textContent = '';
    else if (cuenta === 0) estado.textContent = 'Sin resultados para «' + campo.value.trim() + '».';
    else estado.textContent = cuenta + (cuenta === 1 ? ' resultado' : ' resultados') + ' para «' + campo.value.trim() + '».';
  }
  var inicial = new URLSearchParams(location.search).get('q');
  if (inicial) campo.value = inicial;
  campo.addEventListener('input', filtrar);
  document.getElementById('mapa-formulario').addEventListener('submit', function (evento) { evento.preventDefault(); filtrar(); });
  filtrar();
})();
