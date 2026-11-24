# Revisión humana — 0027 Inglés, parte 5 y cierre de la feature

**Fecha:** 2026-11-23 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado

## Qué se revisó
- El switch y `hreflang` en `superficie-usuario-1/2/3.html` y `superficie-guion.html`.
- Las versiones traducidas de esas páginas en `en/`.
- Con esta parte, las 13 páginas del sitio tienen versión en inglés y las páginas EN enlazan solo entre sí; la versión en español queda accesible desde el switch.

## Evidencia
- **Del usuario:** respondió «Lo apruebo» en el chat el 2026-11-23, después de recibir la lista de traducciones a revisar con atención: «Test script / Script», «Watch Video», «How easy was it to…», «Didn’t finish the task», las respuestas citadas, los subtítulos de sección y el paso del voseo a un inglés neutro.
- **Del asistente:** verificó en un servidor local:
  - 8 páginas × 10 anchos, sin cruces, scroll ni desbordes;
  - las rutas locales;
  - el menú de usuarios y el enlace para volver;
  - que no quedaran restos en español.

## Cierre de la feature 0027
- Las partes 1 a 5 están aprobadas, cada una con su revisión: `.cardenal/revision-0027-parte-1.md` a `parte-5.md`.
- El fix T39 tiene su revisión en `.cardenal/revision-fix-switch-estructura.md`.
- La ficha queda archivada en `specs/0027-idioma-en/context.json`.
- Pendientes fuera de alcance, ya anotados antes:
  - SEO con dominio (hreflang absoluto, canonical);
  - las imágenes con texto, que siguen en español por decisión del usuario.
