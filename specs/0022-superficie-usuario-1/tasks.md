# Tareas: Superficie — cuestionario del Usuario 1

- [x] T001 [front] `superficie-usuario-1.html` y `superficie-usuario.css`; `assets/ico-star-vacia.svg`.
- [x] T002 [front] `superficie.html`: «Ver cuestionario» del usuario 1 con destino.
  - **Revisión visual del asistente** (servidor local): 1920, 900 y 375 px sin scroll horizontal; consola sin errores; medidas.
- [x] T003 SEO, docs y `llms.txt`.
- [x] Commit tras la aprobación del usuario.
- [x] **Check final humano** (aprobado por el usuario el 2026-11-22, tras corregir «Ver Video» y el bug de `.sr-only`; ver `.cardenal/revision-0022.md`): comparar con la referencia a 1920 px; probar los enlaces; revisar en 900 y 375 px.

## Addendum 2026-11-23 — fix: video de las preguntas cualitativas
- [x] T004 Convertir el GIF del usuario («Las licencias y marcar como favorito un auto», 3,4 MB) a `assets/usuarios/usuario-1-preguntas.mp4` (ffmpeg, H.264, 1162 px, sin audio, sin acelerar; 133 KB, 4,7 s).
- [x] T005 [front] `superficie-usuario-1.html` + `superficie-usuario.css` (`.cu-media`): las dos preguntas muestran ese mismo video en bucle en lugar del placeholder (pedido del usuario).
  - **Revisión del asistente** (servidor local, medición): 2 videos readyState 4, 1162 × 622 a 1920 px, radio 12; 56 px entre pregunta, respuesta y video y 96 px entre preguntas sin cambios; 375 px sin scroll horizontal; consola sin errores.
- [x] T006 [HUMANO] (aprobado por el usuario el 2026-11-23; ver `.cardenal/revision-fix-2026-11-23-usuario-1.md`) Revisar los dos videos en la página y aprobar.
