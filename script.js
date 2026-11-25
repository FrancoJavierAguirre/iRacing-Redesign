// Placeholder interaction for "Proceso de Diseño" cards.
// Reemplazá esto por la navegación real a cada sub-sección/página
// cuando tengas ese contenido listo.
document.querySelectorAll(".proceso-card").forEach((card) => {
  card.addEventListener("click", () => {
    const step = card.dataset.step;
    console.log("Abrir detalle de:", step);
    // Ejemplo futuro: window.location.href = `proceso-${step}.html`;
  });
});

// Videos de las comparativas Antes/Después: se reproducen en bucle (sin sonido)
// sólo cuando están visibles en pantalla, así no se descargan todos juntos.
const compareVideos = document.querySelectorAll("video.screenshot, video.stat-video");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.play().catch(() => {});
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: 0.25 });
  compareVideos.forEach((v) => io.observe(v));
} else {
  compareVideos.forEach((v) => { v.autoplay = true; v.play().catch(() => {}); });
}

// Vitrina de «Diseño final»: un video «después» por pantalla. Se elige en la lista,
// la barra inferior de la opción activa muestra el avance y al terminar pasa a la siguiente.
// Solo se reproduce mientras se ve en pantalla.
(() => {
  const root = document.querySelector(".vitrina");
  if (!root) return;
  const tabs = [...root.querySelectorAll(".vitrina-tab")];
  const panel = root.querySelector(".vitrina-video");
  const video = root.querySelector(".vitrina-v");
  const ampliar = root.querySelector(".vitrina-ampliar");
  let actual = 0;
  let visible = false;

  const barra = (i) => tabs[i].querySelector(".vt-progreso span");
  const reproducir = () => { if (visible) video.play().catch(() => {}); };

  function elegir(i, foco) {
    barra(actual).style.width = "0%";
    tabs[actual].setAttribute("aria-selected", "false");
    tabs[actual].tabIndex = -1;
    actual = (i + tabs.length) % tabs.length;
    const tab = tabs[actual];
    tab.setAttribute("aria-selected", "true");
    tab.tabIndex = 0;
    if (foco) tab.focus();
    panel.setAttribute("aria-labelledby", tab.id);
    video.setAttribute("aria-label", tab.dataset.label);
    video.src = tab.dataset.src;
    video.load();
    reproducir();
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => { if (i !== actual) elegir(i); else reproducir(); });
    tab.addEventListener("keydown", (e) => {
      const paso = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (paso) { e.preventDefault(); elegir(actual + paso, true); }
      else if (e.key === "Home") { e.preventDefault(); elegir(0, true); }
      else if (e.key === "End") { e.preventDefault(); elegir(tabs.length - 1, true); }
    });
  });

  video.addEventListener("timeupdate", () => {
    if (video.duration) barra(actual).style.width = (video.currentTime / video.duration) * 100 + "%";
  });
  video.addEventListener("ended", () => elegir(actual + 1));

  ampliar.addEventListener("click", () => {
    if (video.requestFullscreen) video.requestFullscreen().catch(() => {});
    else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) reproducir();
      else if (!document.fullscreenElement) video.pause();
    }, { threshold: 0.25 }).observe(video);
  } else {
    visible = true;
    reproducir();
  }
})();
