# Tareas: Superficie — Prototipo

- [x] T001 [front] `superficie.html`: sección Prototipo con placeholders; «Ir a Prototipo» con destino; SEO.
  - **Revisión visual del asistente** (servidor local): 1920, 900 y 375 px sin scroll horizontal; consola sin errores; 3 enlaces externos con `target="_blank"`.
- [x] T002 Docs y `llms.txt`.
- [x] T003 [front] Corrección de QA: `superficie.css`, subtítulo y botón centrados respecto de los bullets en `#prototipo`.
- [x] Commit tras la aprobación del usuario.
- [x] **Check final humano** (aprobado por el usuario el 2026-11-22, tras corregir el centrado del subtítulo y el botón; ver `.cardenal/revision-0020.md`): comparar con la referencia a 1920 px; probar los enlaces; revisar en 900 y 375 px.

## Addendum 2026-11-23 — fix: videos de los tres prototipos
- [x] T004 Convertir `Encontrar tu carrera.gif` y `Carrito de compras.gif` a MP4 (ffmpeg, 1164 px, sin audio; 590 y 731 KB); License Progress reutiliza el MP4 de Iteraciones.
- [x] T005 [front] `superficie.html`: los tres bloques muestran su video en bucle (`.it-media`) en lugar del placeholder.
  - **Revisión del asistente** (servidor local, medición): 3 videos readyState 4 (10,3, 9,3 y 10,8 s), 1163 × 801 a 1920 px, texto a 32 px; 900/375 sin scroll horizontal; consola sin errores.
- [x] T006 [HUMANO] (aprobado por el usuario el 2026-11-23; ver `.cardenal/revision-fix-2026-11-23-iteraciones-prototipo.md`) Revisar los tres videos y aprobar.
