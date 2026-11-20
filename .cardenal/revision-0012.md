# Revisión humana — 0012 Superficie, Imágenes y Layout

**Fecha:** 2026-11-20 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado

## Qué se revisó
`superficie.html` (`specs/0012-superficie-imagenes-layout/`):
- Imágenes: frase, fila Corvette · IMSA · Formula A · BMW y mapa del circuito (`track.svg`);
- Layout: esquema default que pasa a la pantalla Racing con hover, foco de teclado o toque;
- «Ir a Imágenes» activado; «Ir a Componentes» sin destino;
- responsive.

## Evidencia
- **Del usuario:** eligió probarla él mismo («La pruebo yo») y respondió «Lo apruebo» en el chat el 2026-11-20, sin pedir correcciones. No objetó el supuesto de mostrar el hover también con foco y toque, que queda como se implementó.
- **Del asistente (checks técnicos):**
  - JSON-LD válido; description de 158 caracteres.
  - Imágenes cargadas; único ancla sin destino: #componentes (no mueve el scroll).
  - Revisión visual en servidor local a 1920, 900 y 375 px: sin scroll horizontal; hover y foco del layout funcionan; consola sin errores.
  - `validate` y `board-check` válidos.

## Pendientes
- Componentes de Superficie (#componentes) y «Siguiente elemento UX».