# Revisión humana — 0004 Página de Alcance

**Fecha:** 2026-11-17 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado

## Qué se revisó
`alcance.html` (`specs/0004-pagina-alcance/`) incluye:
- la topbar con el breadcrumb y el menú de capas;
- la Matriz FVD con 4 cuadrantes (5/2/3/2 tarjetas, sin el duplicado de License Progress), la leyenda «★ Máxima prioridad» y los ejes;
- la sección «Siguiente elemento UX»;
- la versión mobile apilada;
- los links a Alcance activados en Estrategia, el Home y 5-elementos;
- el traslado de los estilos compartidos a `elementos.css`.

## Evidencia
- **Del usuario:** probó la página contra la captura de Figma. Pidió una corrección (números de cuadrante en Inter regular 128 px), se aplicó y respondió «Lo apruebo» en el chat el 2026-11-17. No detalló qué otros pasos ejecutó.
- **Del asistente (checks técnicos):**
  - JSON-LD de las 4 páginas parseado sin errores.
  - Description de Alcance de 147 caracteres.
  - Conteo de tarjetas por cuadrante 5/2/3/2 y «License Progress» exactamente 1 vez.
  - Las 18 reglas quitadas de `estrategia.css` están literales en `elementos.css`.
  - Archivos sin BOM.

## No verificado por el asistente
- QA visual en navegador (`workflow.qa.browser=false`).

## Pendientes
- «Ver Estructura» y las capas Estructura, Esqueleto y Superficie siguen sin página.
