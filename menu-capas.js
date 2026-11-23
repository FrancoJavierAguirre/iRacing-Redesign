(function () {
  // Menús desplegables del breadcrumb: el de capas UX y, en las páginas de usuario, el de usuarios (spec 0026).
  // Cada [data-capas] tiene su disparador [data-capas-trigger] y su menú [data-capas-menu].
  var roots = document.querySelectorAll('[data-capas]');
  var menus = [];

  Array.prototype.forEach.call(roots, function (root) {
    var trigger = root.querySelector('[data-capas-trigger]');
    var menu = root.querySelector('[data-capas-menu]');
    if (!trigger || !menu) return;
    var m = { root: root, trigger: trigger, menu: menu };
    menus.push(m);

    trigger.addEventListener('click', function () {
      setOpen(m, !isOpen(m));
    });
  });

  if (!menus.length) return;

  function isOpen(m) {
    return m.trigger.getAttribute('aria-expanded') === 'true';
  }

  function setOpen(m, open) {
    m.trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    m.menu.hidden = !open;
  }

  // Un click fuera de un menú abierto lo cierra (incluye el click en el disparador de otro menú).
  document.addEventListener('click', function (e) {
    menus.forEach(function (m) {
      if (isOpen(m) && !m.root.contains(e.target)) setOpen(m, false);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    menus.forEach(function (m) {
      if (isOpen(m)) {
        setOpen(m, false);
        m.trigger.focus();
      }
    });
  });
})();
