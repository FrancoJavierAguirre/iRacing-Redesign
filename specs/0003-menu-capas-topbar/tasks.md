# Tareas: Menú desplegable de capas UX en la topbar

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.


**Spec:** `spec.md` · **Plan:** `plan.md`
Formato: `- [ ] T001 [rol] [P?] Descripción — archivos — FR cubiertos — depende de`

No hay tests automatizados (Art. III): cada tarea lleva QA manual y un check acotado en lugar de test previo. Para `node --check`, prepender `C:\Program Files\Common Files\Adobe\Creative Cloud Libraries\libs` al PATH. QA manual estándar («QA-std»): abrir `estrategia.html` desde disco a 1920, 1300, 900 y 640 px, teclado (Tab, Enter/Espacio, Escape) y consola sin errores.

## HU1 — Abrir y cerrar el menú / HU2 — Opciones / HU3 — Aspecto
- [x] T001 [front] Marcado en la topbar: reemplazar el `<h1 class="topbar-title">` por el bloque `.topbar-capas` del plan (botón con texto «Estrategia» y los dos chevrons, `<nav>` oculto con Alcance, Estructura, Esqueleto y Superficie deshabilitados), agregar `Inter:wght@300;400;600` al link de Google Fonts y `<script src="menu-capas.js" defer>` antes de `</body>` — `estrategia.html` — FR-001, FR-005, FR-006, FR-007, FR-008
  - Check: Grep de `aria-expanded="false"`, `aria-controls="capas-menu"`, `data-capas-trigger`, `aria-disabled="true"` (4 ocurrencias), `wght@300;400;600` y `menu-capas.js`; el `<h1>` aún contiene «Estrategia»; no aparece el ítem Estrategia en el menú.
  - Verificación manual: sin CSS ni JS todavía, la página carga sin errores de consola ni assets rotos.
- [x] T002 [front] [P] Estilos reutilizables `.topbar-capas`, `.capas-trigger`, `.capas-chevron` (alterna `--down`/`--up` según `aria-expanded`), `.capas-menu` (+ regla `[hidden]`), `.capas-item` y estado `[aria-disabled="true"]` con los valores exactos del plan, antes del bloque «Intro» — `elementos.css` — FR-002, FR-003, FR-006, FR-007, FR-009, FR-010 — depende de T001
  - Check: Grep de `#212121`, `border-radius: 8px`, `min-width: 102px`, `width: max-content`, `white-space: nowrap`, `padding: 12px 8px`, `font-weight: 400`, `.capas-menu[hidden]`; sin selectores que afecten `.topbar-title`, `.breadcrumb` ni `.btn` existentes.
  - Verificación manual: forzar el menú abierto (quitar `hidden` en DevTools) y comparar contra la captura: radio 8, filas 12/8, ícono 16, gap 8, Inter 12 blanco, opacidad .4 y cursor not-allowed en las 4 opciones; a 640 px el menú queda entero dentro del viewport. El título cerrado se ve igual que antes (misma tipografía, sin fondo ni borde) con el chevron a 8 px.
- [x] T003 [front] [P] Comportamiento: toggle de `aria-expanded` y `hidden` en `[data-capas-trigger]`/`[data-capas-menu]`, cierre por segundo click, click fuera de `[data-capas]` y Escape (devolviendo el foco al botón); inerte si faltan los nodos — `menu-capas.js` — FR-004, FR-008, FR-009, FR-010 — depende de T001

  (T002 y T003 no comparten archivos ni estado.)
  - Check: `node --check menu-capas.js` sin salida; Grep de `Escape`, `aria-expanded`, `addEventListener`; sin `console.`, sin dependencias.
  - Verificación manual: QA-std. Click en el título o en el chevron abre y el chevron apunta arriba; segundo click, click afuera y Escape cierran (Escape devuelve el foco al botón) y el chevron vuelve a abajo; Tab llega al botón, Enter y Espacio abren; las opciones deshabilitadas no reciben foco ni navegan; abrir con teclado no scrollea la página.

**Checkpoint HU1–HU3:** no hay quality gates definidos en el repo (`qualityGates` vacío); se cumplen los escenarios de aceptación de HU1, HU2 y HU3 con QA-std a 1920/1300/900/640 px, comparación con la captura, topbar sin otros cambios visibles (breadcrumb y «Ver Alcance» intactos) y consola limpia.

## Cierre
- [x] T004 [front] Documentar: sección Estrategia de `docs/public/funcionalidades.md` (menú de capas: qué hace, opciones deshabilitadas, cierre) y `docs/tech/sistema.md` (estructura de archivos con `menu-capas.js`, comportamiento y marcado reutilizable, `menu-capas.js` se carga solo en `estrategia.html`, estilos `.capas-*` en `elementos.css`) — `docs/public/funcionalidades.md`, `docs/tech/sistema.md` — FR-009 — depende de T002, T003
  - Check: Grep de `menu-capas.js` y `.capas-` en `docs/tech/sistema.md`; Grep de «capas» en `docs/public/funcionalidades.md`.
- [x] Commit (Conventional Commits, archivos específicos: `estrategia.html`, `elementos.css`, `menu-capas.js`, `specs/0003-menu-capas-topbar/`, `docs/public/funcionalidades.md`, `docs/tech/sistema.md`).
- [x] Pasos de prueba para el usuario y **check final humano**. PR solo si se pide.

## Cobertura de FR
| FR | Tareas |
| --- | --- |
| FR-001 | T001 |
| FR-002 | T002 |
| FR-003 | T002 |
| FR-004 | T003 |
| FR-005 | T001 |
| FR-006 | T001, T002 |
| FR-007 | T001, T002 |
| FR-008 | T001, T003 |
| FR-009 | T002, T003, T004 |
| FR-010 | T002, T003 |
