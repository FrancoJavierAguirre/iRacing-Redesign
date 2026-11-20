# Revisión humana — 0014 Superficie, Componentes: Botones

**Fecha:** 2026-11-20 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado

## Qué se revisó
`superficie.html`, `superficie.css` y `superficie.js` (`specs/0014-superficie-botones/`):
- encabezado «Botones»;
- «Originalmente» con los PNG viejos;
- «Ahora» con Race, Test Drive y Add to Cart, con hover y press, que no navegan;
- Register tachado y la nota sobre el verde;
- «Cambiar estilo» en 48, 40 y 32 px con el ciclo de 5 estilos;
- leyendas con íconos y responsive.

## Evidencia
- **Del usuario:** eligió probarla él mismo («La pruebo yo») y respondió «Lo apruebo» en el chat el 2026-11-20, sin pedir correcciones. No objetó los colores de hover y press ni los 4 estados supuestos, que quedan como se implementaron.
- **Del asistente (checks técnicos):**
  - JSON-LD válido; description de 158 caracteres.
  - Hover de Race (#1A6AD4) sin navegar; ciclo completo de estilos con anuncio `aria-live`.
  - Revisión visual en servidor local a 1920, 900 y 375 px: sin scroll horizontal; consola sin errores.
  - Corrección incluida: tres líneas de `docs/tech/sistema.md` (0012/0013) con caracteres perdidos.
  - `validate` y `board-check` válidos.

## Pendientes
- Motion (#motion), el resto de Componentes y «Siguiente elemento UX».