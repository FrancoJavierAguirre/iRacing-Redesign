# Tareas: Versión en inglés con switch ES/EN

## Parte 1 — Base, Home y 5 Elementos
- [x] T001 [front] `lang.js` (recordar y redirigir) y estilos del switch (`styles.css`, `elementos.css`).
- [x] T002 [front] Switch y hreflang en `index.html` y `5-elementos.html`.
- [x] T003 [front] `en/index.html` y `en/5-elementos.html` traducidas.
  - **Revisión del asistente** (servidor local): medidas del switch; ida y vuelta entre idiomas; recordar la elección; rutas de assets en /en/; 1920, 900 y 375 px; consola sin errores.
- [x] T004 Docs y `llms.txt`.
- [x] Commit tras la aprobación del usuario.
- [x] **Check final humano (Parte 1)** (aprobado por el usuario el 2026-11-23, tras corregir el switch y su ubicación en el Home; ver `.cardenal/revision-0027-parte-1.md`): revisar traducciones, ubicación del switch en el Home y el switch en 5 Elementos.

## Parte 2 — Estrategia y Alcance
- [x] T005 [front] Switch y hreflang en `estrategia.html` y `alcance.html` (switch a 32 px del botón azul en `.topbar-tools`).
- [x] T006 [front] `en/estrategia.html` y `en/alcance.html` traducidas; enlaces de `en/index.html` y `en/5-elementos.html` a estas páginas pasan a la versión EN.
- [x] T007 [front] `alcance.css`: etiqueta del eje X en dos renglones en ≤ 900 px (en inglés desbordaba).
  - **Revisión del asistente** (servidor local): 32 px entre switch y botón, ambos centrados; menú de capas y botones traducidos con enlaces correctos; sin restos en español; 12 anchos (320-1920) sin cruces; scroll solo en Estrategia a 320 px (previo, también en ES).
- [x] Commit tras la aprobación del usuario.
- [x] **Check final humano (Parte 2)** (aprobado por el usuario el 2026-11-23; ver `.cardenal/revision-0027-parte-2.md`): revisar las traducciones de Estrategia y Alcance.

## Parte 3 — Estructura y detalles de las tareas
- [x] T008 [front] Switch y hreflang en `estructura.html`, `estructura-tarea-1.html` y `estructura-tarea-2.html`.
- [x] T009 [front] `en/estructura.html`, `en/estructura-tarea-1.html` y `en/estructura-tarea-2.html` traducidas; enlaces de las páginas EN anteriores a estas pasan a la versión EN.
- [x] T010 [front] `estructura.js`: ruta de las capturas relativa a la página y texto alternativo según el idioma.
  - **Revisión del asistente** (servidor local): arquitectura navegable en EN (capturas desde ../assets/, alt en inglés, menú de la tienda), ayudas, switch Antes/After y «View more details»; la versión ES sigue igual; 6 páginas × 11 anchos (320-1920) sin cruces ni scroll; sin restos en español.
- [x] Commit tras la aprobación del usuario.
- [x] **Check final humano (Parte 3)** (aprobado por el usuario el 2026-11-23; ver `.cardenal/revision-0027-parte-3.md`): revisar las traducciones de Estructura y de las tareas.

## Parte 4 — Esqueleto y Superficie
- [x] T011 [front] Switch y hreflang en `esqueleto.html` y `superficie.html`.
- [x] T012 [front] `en/esqueleto.html` y `en/superficie.html` traducidas (incluye `data-col` de las tablas, alt, aria-label y textos para lectores de pantalla); enlaces de las páginas EN anteriores a estas pasan a la versión EN. Las páginas de usuarios y el guion siguen enlazando a la versión ES hasta la Parte 5.
- [x] T013 [front] `superficie.js`: el anuncio del estilo del botón sale en el idioma de la página.
- [x] T014 [front] Generador: reconoce el botón de la topbar en `btn--md` (antes solo `btn--sm`; ver fix T39).
  - **Revisión del asistente** (servidor local): 4 páginas × 10 anchos (320-1920) sin cruces de breadcrumb, título, switch ni botón, sin scroll y sin textos desbordados; switch a 32 px del botón y topbar de 112 px; 253 rutas locales de las dos páginas EN responden; «Change style» anuncia «Style: secondary» en EN y «Estilo secundario» en ES; el switch recuerda la elección y redirige; sin restos en español (solo nombres propios).
- [x] Commit tras la aprobación del usuario.
- [x] **Check final humano (Parte 4)** (aprobado por el usuario el 2026-11-23; ver `.cardenal/revision-0027-parte-4.md`): revisar las traducciones de Esqueleto y Superficie.

## Parte 5 — Cuestionarios de los usuarios y guion
- [x] T015 [front] Switch y hreflang en `superficie-usuario-1/2/3.html` y `superficie-guion.html`.
- [x] T016 [front] `en/superficie-usuario-1/2/3.html` y `en/superficie-guion.html` traducidas; los insights usan las mismas frases que Superficie EN. Con esto todas las páginas EN enlazan solo a páginas EN (salvo el switch).
  - **Revisión del asistente** (servidor local): 8 páginas × 10 anchos (320-1920) sin cruces del breadcrumb de 3 niveles con título, switch y botón, sin scroll ni textos desbordados; switch a 32 px del botón, topbar 112 px; rutas locales de las páginas EN OK; menú de usuarios y botón de volver llevan a las páginas EN; sin restos en español (solo nombres propios).
- [x] Commit tras la aprobación del usuario.
- [x] **Check final humano (Parte 5)** (aprobado por el usuario el 2026-11-23; ver `.cardenal/revision-0027-parte-5.md`): revisar las traducciones de los cuestionarios y del guion.

## Cierre
- [x] Feature cerrada el 2026-11-23: partes 1-5 aprobadas; ficha archivada en `specs/0027-idioma-en/context.json`.

## Addendum 2026-11-24 — fix: imágenes de las cards en /en/ con el sitio publicado
- [x] T017 [front] Las cards de capas usan `data-card` y `styles.css` declara sus imágenes (antes `style="--img:url(…)"`, que en `/en/` resolvía a `/assets/…` fuera de `/iRacing-Redesign/` en GitHub Pages). Páginas EN regeneradas.
  - **Revisión del asistente:** en el sitio publicado, 26 páginas y 382 recursos OK salvo las imágenes de las cards en EN (404 en `francojavieraguirre.github.io/assets/…`). Tras el fix, con un servidor local bajo `/iRacing-Redesign/`: las 70 cards de las 14 páginas ES/EN cargan su imagen desde `/iRacing-Redesign/assets/`; ningún recurso se pide fuera de la subcarpeta (solo `favicon.ico`, que el sitio no tiene).
- [ ] [HUMANO] QA en el sitio publicado tras subir el commit: pasar el mouse por las cards de capas en una página EN.

## Addendum 2026-11-24 — ajuste: switch del Home con diseño propio
- [x] T018 [front] En el Home el switch reemplaza a «Franco Aguirre - 2025» y usa la variante `.lang-switch--hero` (borde y opción elegida #0159CF, texto blanco en ambas, la otra opción sin fondo; corregido por el usuario), según la referencia del usuario. EN regenerado (el generador conserva la clase del `nav`).
  - **Revisión del asistente:** en local, ES y EN: 114 × 48, opción elegida con fondo rgb(1,89,207), la otra sin fondo, texto blanco en ambas; a 375 px sin scroll horizontal.
- [ ] [HUMANO] QA: revisar el switch del Home en ES y EN (aspecto, hover y cambio de idioma).
