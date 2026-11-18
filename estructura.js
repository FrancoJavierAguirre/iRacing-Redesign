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

  /* ----- Arquitectura Actual navegable (spec 0006) ----- */
  var shot = document.querySelector('[data-nav-shot]');
  if (shot) {
    var shotImg = shot.querySelector('[data-nav-shot-img]');
    var layouts = Array.prototype.slice.call(shot.querySelectorAll('.nav-hotspots[data-layout]'));
    var shots = {
      'home': ['Home', 'racing'],
      'profile': ['Profile', 'racing'],
      'my-content': ['My Content', 'racing'],
      'official': ['Official', 'racing'],
      'leagues': ['Leagues', 'racing'],
      'hosted': ['Hosted', 'racing'],
      'teams': ['Teams', 'racing'],
      'spectate': ['Spectate', 'racing'],
      'time-attack': ['Time Attack', 'racing'],
      'ai-single-player': ['AI Single Player', 'racing'],
      'results-stats': ['Results & Stats', 'racing'],
      'replays': ['Replays', 'racing'],
      'shop-cars': ['Shop › Cars', 'shop'],
      'shop-tracks': ['Shop › Tracks', 'shop']
    };

    function showShot(id) {
      var data = shots[id];
      if (!data || !shotImg) return;
      shotImg.src = 'assets/arquitectura-actual/' + id + '.jpg';
      shotImg.alt = 'Captura de la UI original de iRacing: sección ' + data[0];
      layouts.forEach(function (layout) {
        layout.hidden = layout.getAttribute('data-layout') !== data[1];
      });
      Array.prototype.forEach.call(shot.querySelectorAll('.hotspot'), function (btn) {
        if (btn.getAttribute('data-shot') === id) btn.setAttribute('aria-current', 'true');
        else btn.removeAttribute('aria-current');
      });
    }

    shot.addEventListener('click', function (e) {
      var btn = e.target.closest('.hotspot');
      if (!btn) return;
      var id = btn.getAttribute('data-shot');
      var layoutChanges = shots[id] && btn.closest('.nav-hotspots').getAttribute('data-layout') !== shots[id][1];
      showShot(id);
      /* si cambia el menú, el botón queda oculto: llevar el foco a la zona equivalente del menú nuevo */
      if (layoutChanges) {
        var next = shot.querySelector('.nav-hotspots:not([hidden]) .hotspot[data-shot="' + id + '"]');
        if (next) next.focus();
      }
    });

    showShot('home');
  }

  /* ----- Botones sin destino: no saltan al tope ----- */
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-sin-destino]')) e.preventDefault();
  });
})();
