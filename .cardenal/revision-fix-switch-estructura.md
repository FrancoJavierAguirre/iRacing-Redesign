# Revisión humana — fix: switch encima del botón en Estructura y tareas

**Fecha:** 2026-11-23 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado

## Qué se corrigió
El switch ES/EN se superponía al botón de arriba a la derecha en `estructura.html`, `estructura-tarea-1.html` y `estructura-tarea-2.html`, y también en sus versiones de `en/`.

- **Causa:** el botón quedó fuera de `.topbar-tools`. El generador local de las páginas EN buscaba el botón por la clase `btn--sm`, y desde la topbar de 112 px el botón usa `btn--md`.
- **Cambio:** el botón pasó a estar dentro de `.topbar-tools`, después del switch. El generador ahora acepta las clases `btn--sm` y `btn--md`.

## Evidencia
- **Del usuario:** reportó el problema y respondió «Lo apruebo» en el chat el 2026-11-23.
- **Del asistente:** midió en un servidor local las 6 páginas y Alcance en 9 anchos (320–1920 px). No hay superposiciones ni scroll. La separación entre el switch y el botón es de 32 px, la barra mide 112 px y el botón 48 px.
