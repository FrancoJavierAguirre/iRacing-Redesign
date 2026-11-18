# Revisión humana — 0005 Página de Estructura

**Fecha:** 2026-11-17 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado

## Qué se revisó
`estructura.html` (`specs/0005-pagina-estructura/`):
- topbar con el menú de capas y «Ver Esqueleto» sin destino;
- placeholder de Arquitectura Actual;
- Tree Testing: fila UXtweak, cards Tarea 1 y 2 con tooltips de ayuda, árboles, contadores y «Ver más detalles» sin destino;
- Conclusiones;
- Arquitectura Nueva con el switch Antes/Después;
- Taskflow;
- versión mobile con listas indentadas;
- links a Estructura en el Home, 5-elementos, Estrategia y Alcance;
- traslado de estilos compartidos a `elementos.css`.

## Evidencia
- **Del usuario:** probó la página y pidió dos correcciones:
  1. los contadores de respuestas van fuera del diagrama;
  2. los diagramas pasan a SVG de Figma (aportó los 4 archivos).

  Después de aplicarlas respondió «Lo apruebo» en el chat el 2026-11-17. No detalló qué otros pasos ejecutó.
- **Del asistente (checks técnicos):**
  - JSON-LD de las 5 páginas parseado sin errores; description de 155 caracteres.
  - `node --check estructura.js` sin errores.
  - Cada `aria-controls` apunta a un `id` existente; no hay `id` duplicados.
  - Todos los assets referenciados existen; HTML y CSS balanceados.
  - Las reglas quitadas de `estrategia.css` están literales en `elementos.css` (salvo el prefijo de `.hl`, que no usa ninguna otra página).
  - Archivos sin BOM.
  - `validate` y `board-check` válidos.

## No verificado por el asistente
- QA visual en navegador (`workflow.qa.browser=false`; el panel de vista previa no renderiza archivos locales en vivo).

## Pendientes
- Imagen navegable de Arquitectura Actual.
- Pantallas de detalle de Tarea 1 y 2 («Ver más detalles»).
- Páginas de Esqueleto y Superficie.
