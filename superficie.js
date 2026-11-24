/* Superficie (spec 0014): cada click en «Cambiar estilo» pasa al estilo siguiente del botón. */
(function () {
  var estilos = ['primario', 'secundario', 'compras', 'borde', 'texto'];
  var en = document.documentElement.lang === 'en';
  var nombres = en
    ? { primario: 'primary', secundario: 'secondary', compras: 'shopping', borde: 'outlined', texto: 'text only' }
    : { primario: 'primario', secundario: 'secundario', compras: 'de compras', borde: 'bordeado', texto: 'solo texto' };
  var estado = document.getElementById('bt-estado');
  document.querySelectorAll('[data-cambiar-estilo]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var actual = estilos.findIndex(function (e) { return btn.classList.contains('bt--' + e); });
      var sig = estilos[(actual + 1) % estilos.length];
      estilos.forEach(function (e) { btn.classList.remove('bt--' + e); });
      btn.classList.add('bt--' + sig);
      if (estado) estado.textContent = en ? 'Style: ' + nombres[sig] : 'Estilo ' + nombres[sig];
    });
  });
})();