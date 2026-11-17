# Revisión humana — 0001, 0002 y 0003

**Fecha:** 2026-11-17 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado

## Qué se revisó
- **0001 — SEO y descubrimiento** (`specs/0001-seo-descubrimiento/`): metadatos, JSON-LD y `llms.txt` en las 3 páginas; «Garrett» corregido.
- **0002 — Lean UX Canvas** (`specs/0002-canvas-resultados-usuario/`): 4 bullets nuevos en «Resultados para el Usuario»; «Ver respuestas» abre la planilla en una pestaña nueva.
- **0003 — Menú de capas** (`specs/0003-menu-capas-topbar/`): menú desplegable desde «Estrategia» en el breadcrumb, con chevron down/up y 4 opciones deshabilitadas. El usuario pidió una corrección tras la primera prueba (el disparador era el título central) y aprobó la versión corregida.

## Evidencia
- **Del usuario:** probó la página y respondió «Lo apruebo» en el chat el 2026-11-17, después de recibir los pasos de QA manual de las tres features. No detalló qué pasos ejecutó ni con qué navegador.
- **Del asistente (checks técnicos):**
  - JSON-LD de las 3 páginas parseado sin errores.
  - Largo de las descriptions: 154, 143 y 154 caracteres.
  - `llms.txt` y `menu-capas.js` sin BOM.
  - `node --check menu-capas.js` sin errores.
  - Grep de los 4 bullets, del enlace y de los atributos ARIA.
  - Diff del body limitado a lo previsto.

## No verificado
- QA en navegador por parte del asistente (no se usó navegador, `workflow.qa.browser=false`).
- Validación en el Rich Results Test o en el Schema Markup Validator: queda del lado del usuario.

## Pendientes que siguen abiertos
- Con el dominio: canonical, `og:image`, `sitemap.xml`, `robots.txt` y política de crawlers de IA.
- Favicon propio.
- D1: descripción de «Calendario» en `llms.txt`.
- Typos fuera de alcance: «James Garret» en `index.html`, «Evauaciones», «par el usuario».
