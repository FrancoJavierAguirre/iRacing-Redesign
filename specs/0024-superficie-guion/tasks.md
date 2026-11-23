# Tareas: Superficie — guión de las pruebas

- [x] T001 [front] `superficie-guion.html` y `superficie-guion.css`; imágenes en `assets/guion/`.
- [x] T002 [front] `superficie.html`: «Leer guión completo» con destino.
  - **Revisión visual del asistente** (servidor local): 1920, 900 y 375 px sin scroll horizontal; consola sin errores; tipografías; enlaces.
- [x] T003 SEO, docs y `llms.txt`.
- [x] Commit tras la aprobación del usuario.
- [x] **Check final humano** (aprobado por el usuario el 2026-11-22, tras corregir el ícono del chip, la separación de las tareas y la imagen de contexto; ver `.cardenal/revision-0024.md`): comparar con la referencia a 1920 px; probar los enlaces; revisar en 900 y 375 px.

## Addendum 2026-11-23 — fix: video del gráfico de puntuación
- [x] T004 Convertir el GIF del usuario («grafico de la puntuacion de habilidad», 135 KB) a `assets/guion/grafico-puntuacion.mp4` (ffmpeg, 864 px, sin audio, sin acelerar; 14 KB, 864 × 216, 2,1 s).
- [x] T005 [front] `superficie-guion.html` + `superficie-guion.css` (`.gu-video`, radio 8 como la imagen de contexto): el gráfico de Contexto es un video en bucle en lugar del placeholder.
  - **Revisión del asistente** (servidor local, medición): video readyState 4, 857 × 214 a 1920 px; filas de Contexto con 96 px; en 375 px va debajo del texto y sin scroll horizontal; consola sin errores; 0 placeholders en la página.
- [x] T006 [HUMANO] (aprobado por el usuario el 2026-11-23; ver `.cardenal/revision-fix-2026-11-23-usuario-3-guion.md`) Revisar el video del gráfico y aprobar.
