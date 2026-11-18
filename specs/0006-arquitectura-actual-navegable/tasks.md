# Tareas: Arquitectura Actual navegable

**Spec:** `spec.md`. Cambio chico sobre `estructura.*`; el plan técnico va en las tareas. Sin tests (Art. III): cada tarea lleva su Check.

- [x] T001 [front] Recortar las 14 capturas (y 32–1030) y guardarlas como JPG q85 en `assets/arquitectura-actual/<id>.jpg` — FR-001
  - **Check:** 14 archivos de 1920 × 998; cada `data-shot` del HTML tiene su JPG.
- [x] T002 [front] Reemplazar el placeholder por `img[data-nav-shot-img]` y los grupos `.nav-hotspots` racing (14 zonas) y shop (4 zonas) con posiciones en % — `estructura.html` — FR-001, FR-002, FR-003, FR-004
  - **Check:** 18 `button.hotspot`; cuadros dibujados sobre `teams.jpg` y `shop-tracks.jpg` coinciden con los ítems (verificado con una superposición generada).
- [x] T003 [front] Lógica de cambio de captura en `estructura.js` y estilos en `estructura.css` — FR-002, FR-003, FR-005
  - **Check:** `node --check estructura.js`; tokens `--info` y `--txt` existen.
- [x] T004 Docs (`docs/public/funcionalidades.md`, `docs/tech/sistema.md`) y `llms.txt` — FR-006
- [x] Commit tras la aprobación del usuario.
- [x] **Check final humano:** recorrer los 14 ítems con mouse y con Tab + Enter; verificar el alineado de las zonas a 1920, 1300, 900 y 375 px; consola limpia.
