# Revisión humana — 0016 Superficie, Componentes: Cards, Detalles de auto

**Fecha:** 2026-11-20 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado

## Qué se revisó
`superficie.html` y `superficie.css` (`specs/0016-superficie-detalles-auto/`):
- Detalles de auto: BMW (5 imágenes) a la izquierda y Ferrari (4) a la derecha, que pasan a la imagen siguiente cada 3 s en bucle, sin hover y con radio de 8 px;
- responsive.

## Evidencia
- **Del usuario:** respondió «Lo apruebo» en el chat el 2026-11-20, sin pedir correcciones. No objetó los supuestos (orden de las imágenes empezando por las de la referencia y 72 px entre las cards y el título), que quedan como se implementaron.
- **Del asistente (checks técnicos):**
  - A 1920 px: dos imágenes de 580 × 326 con 32 px de separación, centradas, radio 8 px, a 72 px de las cards.
  - Rotación medida en el navegador: cada imagen cambia cada 3 s y vuelve a la primera en ambos grupos.
  - Revisión visual en servidor local a 1920, 900 y 375 px: sin scroll horizontal; consola sin errores.
  - `validate` y `board-check` válidos.

## Pendientes
- Motion (#motion) y «Siguiente elemento UX».
