(function () {
  /* ----- Tooltips de ayuda (disclosure: botón + aria-controls) ----- */
  var helps = Array.prototype.slice.call(document.querySelectorAll('.help[aria-controls]'));

  function panelOf(btn) {
    return document.getElementById(btn.getAttribute('aria-controls'));
  }

  function isOpen(btn) {
    return btn.getAttribute('aria-expanded') === 'true';
  }

  function setOpen(btn, open) {
    var panel = panelOf(btn);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (panel) panel.hidden = !open;
  }

  function closeAll(except) {
    helps.forEach(function (btn) {
      if (btn !== except && isOpen(btn)) setOpen(btn, false);
    });
  }

  helps.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = !isOpen(btn);
      closeAll(btn);
      setOpen(btn, open);
    });
  });

  document.addEventListener('click', function (e) {
    if (!helps.length) return;
    if (e.target.closest('.help') || e.target.closest('.tip')) return;
    closeAll(null);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    helps.forEach(function (btn) {
      if (isOpen(btn)) {
        setOpen(btn, false);
        btn.focus();
      }
    });
  });

  /* ----- Switch Antes / Después ----- */
  var segBtns = Array.prototype.slice.call(document.querySelectorAll('.seg-btn[aria-controls]'));

  segBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      segBtns.forEach(function (other) {
        var active = other === btn;
        var panel = document.getElementById(other.getAttribute('aria-controls'));
        other.setAttribute('aria-pressed', active ? 'true' : 'false');
        if (panel) panel.hidden = !active;
      });
    });
  });

  /* ----- Botones sin destino: no saltan al tope ----- */
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-sin-destino]')) e.preventDefault();
  });
})();
