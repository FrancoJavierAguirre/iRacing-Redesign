# Tareas: Superficie — cuestionarios de los usuarios 2 y 3

- [x] T001 [front] `superficie-usuario-2.html` y `superficie-usuario-3.html` desde la plantilla del usuario 1; proporciones de capturas en `superficie-usuario.css`.
- [x] T002 [front] `superficie.html`: «Ver cuestionario» de los usuarios 2 y 3 con destino.
  - **Revisión visual del asistente** (servidor local): 1920, 900 y 375 px sin scroll horizontal; consola sin errores; `.sr-only` ocultos.
- [x] T003 SEO, docs y `llms.txt`.
- [x] Commit tras la aprobación del usuario.
- [x] **Check final humano** (aprobado por el usuario el 2026-11-22, tras agregar la nota «No terminó la tarea» en Martín; ver `.cardenal/revision-0023.md`): comparar cada página con su referencia a 1920 px; probar los enlaces; revisar en 900 y 375 px.

## Addendum 2026-11-23 — fix: medios de las preguntas del Usuario 2
- [x] T004 Convertir los GIF del usuario a MP4 (ffmpeg, 1162 px, sin audio, sin acelerar): «encontrar la serie» → `assets/usuarios/usuario-2-encontrar-serie.mp4` (52 KB, 1162 × 538, sin recorte: ya era más bajo que el recuadro de 551); «Positivo…» → `usuario-2-compra-visible.mp4` (454 KB, recortado abajo de 686 a 642 px, pedido del usuario). Copiar «Los logos de los autos y pistas».png → `usuario-2-logos.png` (1162 × 601).
- [x] T005 [front] `superficie-usuario-2.html`: las tres preguntas muestran su medio (`.cu-media`) en lugar del placeholder.
  - **Revisión del asistente** (servidor local, medición): 2 videos readyState 4 (3,1 y 8,8 s) e imagen cargan, 1162 × 538/642/601 a 1920 px; 56 px entre pregunta, respuesta y medio; 375 px sin scroll horizontal; consola sin errores.
- [x] T006 [HUMANO] (aprobado por el usuario el 2026-11-23; ver `.cardenal/revision-fix-2026-11-23-usuario-2.md`) Revisar los tres medios en la página y aprobar.
