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
