# Revisión humana — 0023 Superficie: cuestionarios de los usuarios 2 y 3

**Fecha:** 2026-11-22 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado

## Qué se revisó
`superficie-usuario-2.html`, `superficie-usuario-3.html`, `superficie-usuario.css`, `assets/shrug.png` y los enlaces «Ver cuestionario» de los usuarios 2 y 3 en `superficie.html` (`specs/0023-superficie-usuarios-2-3/`):
- Usuario 2 | Martín: estrellas 0, 0, 4 y 5; tres preguntas con imágenes provisorias; 6 insights; nota «No terminó la tarea» con shrug en las filas 1 y 2;
- Usuario 3 | Fede: estrellas 2, 4, 5 y 3; una pregunta con imagen provisoria; 6 insights;
- «Ver Video» de cada usuario; responsive.

## Evidencia
- **Del usuario:** pidió agregar en la página de Martín «No terminó la tarea» (Exo 2 Light 16) y la imagen shrug a 40 px de la última estrella de las filas 1 y 2, y luego respondió «Lo apruebo» en el chat el 2026-11-22. No objetó que los insights siguieran las referencias (distintos de las cards), ni los 8 px entre texto e imagen ni la nota debajo de las estrellas en celular, que quedan como se implementaron.
- **Del asistente (checks técnicos):**
  - A 1920 px (medido), en las dos páginas: estrellas 48 × 48, 80 px entre sí y 48 px del texto; 96 px entre grupos; 56 px entre pregunta, respuesta e imagen; 56 px entre insights; imágenes 1162 × 551, 642 y 600 (Martín) y 1162 × 684 (Fede).
  - Nota de Martín: 40 px de la última estrella, Exo 2 300 16, shrug 44 × 34, estrellas centradas igual que las demás filas.
  - `.sr-only` ocultos; videos correctos.
  - Revisión en servidor local por medición a 1920, 900 y 375 px (sin captura: el panel del navegador estaba oculto): sin scroll horizontal; consola sin errores; sin imágenes rotas.
  - `validate` y `board-check` válidos.

## Pendientes
- Capturas finales de las preguntas cualitativas de los 3 usuarios.
- Página de guión completo.
