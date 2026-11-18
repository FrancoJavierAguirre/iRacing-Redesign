# Revisión humana — 0006 Arquitectura Actual navegable

**Fecha:** 2026-11-18 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado

## Qué se revisó
La sección «Arquitectura Actual» de `estructura.html` (`specs/0006-arquitectura-actual-navegable/`):
- 14 capturas recortadas en `assets/arquitectura-actual/`;
- zonas invisibles sobre el menú Racing (12 ítems y el riel) y sobre el menú Shop (Cars, Tracks y el riel);
- cambio de captura y de menú, con uso por teclado;
- indicación «Click aquí 👉».

## Evidencia
- **Del usuario:** probó la sección y respondió «Lo apruebo» en el chat el 2026-11-18. No detalló qué pasos ejecutó.
- **Del asistente (checks técnicos):**
  - `node --check estructura.js` sin errores.
  - Las 18 zonas tienen su JPG.
  - Superposición de las zonas sobre `teams.jpg` y `shop-tracks.jpg` alineada con los ítems.
  - HTML balanceado.
  - `validate` y `board-check` válidos.

## No verificado por el asistente
- QA visual en navegador (`workflow.qa.browser=false`).

## Supuestos aceptados con la aprobación
- Recorte de la barra de título y de la barra de tareas de Windows.
- Conversión a JPG calidad 85.
- Emoji 👉 en la indicación.
