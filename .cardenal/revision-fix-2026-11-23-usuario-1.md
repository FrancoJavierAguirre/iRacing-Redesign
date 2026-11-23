# Revisión humana — fix 2026-11-23: video de las preguntas del Usuario 1

**Fecha:** 2026-11-23 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado
**Feature dueña:** `specs/0022-superficie-usuario-1` (FR-002, addendum T004–T006)

## Qué se revisó
`superficie-usuario-1.html`, `superficie-usuario.css` y `assets/usuarios/usuario-1-preguntas.mp4`: las dos preguntas cualitativas muestran el mismo video en bucle en lugar de las imágenes provisorias.

## Evidencia
- **Del usuario:** pidió el cambio con `/fix` («el único GIF … reemplazar los 2 placeholders por el mismo video mp4») y respondió «Lo apruebo» en el chat el 2026-11-23.
- **Del asistente (checks técnicos):**
  - Conversión con ffmpeg: 133 KB y 4,7 s, frente a los 3,4 MB del GIF; sin acelerar.
  - En el navegador: 2 videos con readyState 4, de 1162 × 622 px y radio 12; distancias 56/96 sin cambios; 0 placeholders en la página.
  - Revisión en servidor local por medición a 1920 y 375 px (sin captura: el panel del navegador estaba oculto): sin scroll horizontal; consola sin errores.
  - `validate` y `board-check` válidos.

## Pendientes
- Capturas de los cuestionarios de los usuarios 2 y 3, y gráfico del guión.
