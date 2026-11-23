# Tareas: Detalle de la Tarea 1

**Spec:** `spec.md`. Página estática nueva, chica; el plan técnico va en las tareas. Sin tests (Art. III).

- [x] T001 [front] Copiar assets: íconos de estadísticas, capturas en `assets/tarea-1/` y 6 variantes de color de `ico-pietree-*.svg` — FR-001
  - **Check:** todos los `assets/` referenciados existen.
- [x] T002 [front] `estructura-tarea-1.html`: head SEO + JSON-LD (breadcrumb de 3), topbar, enunciado, Estadísticas y Pietree — FR-001, FR-003, FR-004
  - **Check:** description de 160 caracteres; JSON-LD parsea; etiquetas balanceadas.
- [x] T003 [front] `estructura-tarea.css` con grillas, leyendas, colores y responsive 900/640 — FR-001, FR-002
- [x] T004 [front] «Ver más detalles» de la Tarea 1 → `estructura-tarea-1.html` en `estructura.html` — FR-004
- [x] T005 Docs y `llms.txt` — FR-005
- [x] Commit tras la aprobación del usuario.
- [x] **Check final humano:** comparar con la referencia a 1920 px; probar el breadcrumb, el menú y los botones «Ir a»; revisar 900 y 375 px.
## Addendum 2026-11-23 — fix: topbar de 3 niveles en anchos chicos
- [x] T006 [front] `estructura-tarea.css` (afecta a las 6 páginas `body.page-tarea`: detalles de tareas 1 y 2, usuarios 1-3 y guión). Causa: el breadcrumb está en `position: absolute` a la izquierda y el título centrado; con 3 niveles (y el menú de usuarios de la spec 0026) se pisaban por debajo de ~700 px y entre 901 y ~1000 px, donde vuelve «Rediseño UX/UI». Cambio: ≤ 760 px topbar en dos renglones (breadcrumb estático arriba, título centrado debajo); ≤ 1024 px se ocultan «Rediseño UX/UI» y su separador (antes ≤ 900).
  - **Revisión del asistente** (servidor local, iframes de 19 anchos entre 320 y 1920 px en las 6 páginas): el breadcrumb y el texto del título no se cruzan (separación mínima en la misma línea: 20 px a 1025 px); el botón de la derecha no los pisa; sin scroll horizontal; los dos menús del breadcrumb abren dentro de la pantalla a 375 y 1000 px; consola sin errores.
- [x] T007 [HUMANO] (aprobado por el usuario el 2026-11-23; ver `.cardenal/revision-fix-2026-11-23-topbar.md`) Revisar las páginas con breadcrumb de 3 niveles en celular y tablet y aprobar.
