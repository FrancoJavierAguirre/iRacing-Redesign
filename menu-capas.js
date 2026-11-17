(function () {
  var root = document.querySelector('[data-capas]');
  if (!root) return;
  var trigger = root.querySelector('[data-capas-trigger]');
  var menu = root.querySelector('[data-capas-menu]');
  if (!trigger || !menu) return;

  function isOpen() {
    return trigger.getAttribute('aria-expanded') === 'true';
  }

  function setOpen(open) {
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.hidden = !open;
  }

  trigger.addEventListener('click', function () {
    setOpen(!isOpen());
  });

  document.addEventListener('click', function (e) {
    if (isOpen() && !root.contains(e.target)) setOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) {
      setOpen(false);
      trigger.focus();
    }
  });
})();
