# Revisión humana — fix 2026-11-23: topbar de 3 niveles y nota de Martín

**Fecha:** 2026-11-23 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado
**Features dueñas:**
- `specs/0007-detalle-tarea-1`: addendum T006–T007 y clarificación.
- Relacionada: `specs/0023-superficie-usuarios-2-3`, addendum T010–T011.

## Qué se revisó
- `estructura-tarea.css`, que afecta a las 6 páginas `page-tarea`:
  - en ≤ 1024 px se ocultan «Rediseño UX/UI» y su separador;
  - en ≤ 760 px la topbar va en dos renglones (breadcrumb arriba, título debajo).
- `superficie-usuario.css`: la nota «No terminó la tarea» pasa debajo de las estrellas en ≤ 900 px.

## Evidencia
- **Del usuario:** pidió corregir la superposición («Sí, corregilo»), detectada al revisar la spec 0026. Respondió «Lo apruebo» en el chat el 2026-11-23.
- **Del asistente (checks técnicos):**
  - Prueba con iframes en el servidor local, 19 anchos entre 320 y 1920 px, en las 6 páginas:
    - el breadcrumb y el título no se cruzan (separación mínima en la misma línea: 20 px);
    - el botón de la derecha no los pisa;
    - sin scroll horizontal, incluida la nota de Martín;
    - los dos menús del breadcrumb abren dentro de la pantalla;
    - consola sin errores.
  - `validate` y `board-check` válidos.

## Pendientes
- SEO del dominio, favicon y los typos listados en `docs/tech/sistema.md`.
