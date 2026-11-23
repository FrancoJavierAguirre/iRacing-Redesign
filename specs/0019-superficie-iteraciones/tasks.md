# Tareas: Superficie — Iteraciones

- [x] T001 [front] Copiar el SVG anotado a `assets/iteraciones/`.
- [x] T002 [front] `superficie.html`: sección Iteraciones con placeholders; «Ir a Iteraciones» con destino; SEO.
  - **Revisión visual del asistente** (servidor local): 1920, 900 y 375 px sin scroll horizontal; consola sin errores; 4 enlaces externos con `target="_blank"`.
- [x] T003 [front] Estilos en `superficie.css`.
- [x] T004 Docs y `llms.txt`.
- [x] Commit tras la aprobación del usuario.
- [x] **Check final humano** (aprobado por el usuario el 2026-11-21, tras corregir distancias y el botón «Ir a Prototipo»; ver `.cardenal/revision-0019.md`): comparar con la referencia a 1920 px; probar los enlaces; revisar en 900 y 375 px.

## Addendum 2026-11-23 — fix: videos e imágenes de Iteraciones
- [x] T005 Convertir `License Progress.gif` a MP4 (ffmpeg, H.264, 1164 px, sin audio; 1,9 MB) y copiar los PNG de All Series, Filtros y búsqueda y Registro a la carrera a `assets/iteraciones/` (los cuatro últimos llegaron en una segunda tanda: el usuario los había olvidado).
- [x] T006 [front] `superficie.html` + `superficie.css` (`.it-media`): License Progress como video en bucle y los tres Antes/Después (All Series, Filtros y búsqueda, Registro a la carrera) como imágenes. No quedan placeholders en Superficie.
  - **Revisión del asistente** (servidor local, medición): video readyState 4, 10,3 s; las 6 imágenes (864 px de ancho) cargan; 32 px entre imagen y texto, 32 px entre Antes y Después y 56 px a sus títulos en los tres pares, 56 px al SVG; 0 placeholders; 1920/900/375 sin scroll horizontal; consola sin errores.
- [x] T008 [front] Pedido del usuario: en License Progress, «Solución para nuevos usuarios» y «Probar funcionalidad» centrados respecto de los bullets. `superficie.css`: la regla de centrado de Prototipo pasa de `#prototipo .it-*` a `.it-solucion .it-*`, así cubre los 4 bloques imagen + texto.
  - **Revisión del asistente:** centros de título, bullets y botón coinciden en los 4 bloques a 1920 (1550 px) y a 375 px; 32 y 72 px sin cambios; sin scroll horizontal; consola sin errores.
- [x] T007 [HUMANO] (aprobado por el usuario el 2026-11-23; ver `.cardenal/revision-fix-2026-11-23-iteraciones-prototipo.md`) Revisar License Progress (video y centrado) y los tres Antes/Después en la página y aprobar.
