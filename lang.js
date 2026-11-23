/* Idioma del sitio (spec 0027).
   - Cada página declara su par con <link rel="alternate" hreflang="es|en"> en el <head>.
   - Al tocar una opción del switch (.lang-switch a[data-lang]) se guarda el idioma elegido.
   - Si hay un idioma guardado distinto al de la página, se redirige a la página equivalente antes de mostrarla.
   Se carga sin defer en el <head>. localStorage puede no estar disponible: todo va en try/catch. */
(function () {
  var KEY = 'iracing-lang';
  var current = (document.documentElement.getAttribute('lang') || 'es').slice(0, 2);

  function getSaved() {
    try { return window.localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(lang) {
    try { window.localStorage.setItem(KEY, lang); } catch (e) { /* sin almacenamiento: no se recuerda */ }
  }

  var saved = getSaved();
  if ((saved === 'es' || saved === 'en') && saved !== current) {
    var alt = document.querySelector('link[rel="alternate"][hreflang="' + saved + '"]');
    if (alt && alt.href) {
      window.location.replace(alt.href + window.location.hash);
      return;
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('.lang-switch a[data-lang]');
    Array.prototype.forEach.call(links, function (a) {
      a.addEventListener('click', function () {
        save(a.getAttribute('data-lang'));
        // conserva la sección en la que estaba el lector
        if (window.location.hash) a.href = a.href.split('#')[0] + window.location.hash;
      });
    });
  });
})();
