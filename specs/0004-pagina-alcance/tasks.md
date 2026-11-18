# Tareas: Página de Alcance (Matriz FVD)

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.


**Spec:** `spec.md` · **Plan:** `plan.md`
Formato: `- [ ] T001 [rol] [P?] Descripción — archivos — FR cubiertos — depende de`

No hay tests ni linter (Art. III): en lugar de «test primero», cada tarea lleva un **Check** acotado (Grep / PowerShell) que se corre antes de dar la tarea por hecha, más el QA manual del checkpoint. Todos los comandos se corren desde `F:\GitHub repos\iRacing Redesign`.

## Base compartida
- [x] T001 [front] Crear el ícono blanco y mover los estilos compartidos de `estrategia.css` a `elementos.css` sin cambiar Estrategia — `assets/ico-estructura-white.svg`, `elementos.css`, `estrategia.css` — FR-005, FR-007
  - Antes de editar: abrir `estrategia.html` a 1920 y 900 px y guardar en consola `getComputedStyle` (font-size, margin, padding, gap, width, display, position, background-color) de `.next`, `.next .center-title`, `.next-row`, `.next-col .lbl`, `.next .also`, `.next .proceso-card`, `.topbar-action` y `.btn-blue`.
  - Crear `assets/ico-estructura-white.svg`: copiar `assets/icon-estructura.svg` con `fill="#FFFFFF"` (mismo `<path>`, `viewBox 0 0 40 40`).
  - Mover exactamente las reglas de la sección «Estilos compartidos» del plan: variables (selector `.page-estrategia, .page-alcance`), `.topbar-action` ×2 y `.btn-blue` ×2 (prefijo `.page-elementos`), `.center-title`, bloque `.next*` y las 3 reglas del `@media (max-width: 900px)` (se suman al media existente de `elementos.css`).
  - **Check:** `Select-String -Path estrategia.css -Pattern '\.next|\.topbar-action|\.btn-blue|^\.center-title \{'` no devuelve nada (queda `.center-title.md`); `Select-String -Path elementos.css -Pattern '\.next|\.topbar-action|\.btn-blue|\.center-title|page-alcance'` devuelve cada regla movida; `Select-String assets\ico-estructura-white.svg -Pattern 'fill="#FFFFFF"'` da 1 resultado y no queda `#B7B7BA`.
  - **QA manual:** `estrategia.html` a 1920 y 900 px: los estilos computados guardados coinciden, topbar y «Siguiente elemento UX» se ven igual (hover de las tarjetas incluido), «Ver Alcance» se oculta en 900.

**Checkpoint Base:** Estrategia sin cambios visuales (FR-007), consola sin errores.

## HU1 y HU2 — Matriz FVD y navegación de la página
- [x] T002 [front] Crear `alcance.html`: head con SEO/JSON-LD, topbar con menú de capas, sección de la matriz con ejes, 4 cuadrantes y 12 tarjetas, y sección `.next` — `alcance.html` — FR-001, FR-003, FR-004, FR-005, FR-009 — depende de T001
  - Seguir el marcado de la sección «Contratos» del plan: `body.page-elementos.page-alcance`, fuentes con Inter 300;400;600, `styles.css` + `elementos.css` + `alcance.css`, `menu-capas.js`; cuadrantes en orden 1-2-3-4 con `role="group"` y `aria-label`; estrellas con `alt=""`; textos literales de HU1.
  - **Check (PowerShell):**
    - Descripción: `$h = Get-Content .\alcance.html -Raw -Encoding UTF8; ([regex]::Match($h,'<meta name="description" content="([^"]*)"').Groups[1].Value).Length` ≤ 160 y contiene «Matriz FVD» y «Franco Aguirre».
    - JSON-LD: `$j = [regex]::Match($h,'(?s)<script type="application/ld\+json">(.*?)</script>').Groups[1].Value | ConvertFrom-Json; $j.name; $j.breadcrumb.itemListElement.name` → «Alcance — Rediseño iRacing» y «Rediseño UX/UI», «Alcance»; `$j.isPartOf.name` no vacío; sin `http` en el bloque.
    - Tarjetas por cuadrante: `[regex]::Matches($h,'(?s)<div class="cuadrante cuadrante--(\d)".*?</ul>') | % { $_.Groups[1].Value + ': ' + [regex]::Matches($_.Value,'<li class="q-card"').Count }` → `1: 5`, `2: 2`, `3: 3`, `4: 2` (12 en total).
    - Textos (FR-003): `Select-String -Path alcance.html -SimpleMatch` de cada frase del spec (por ejemplo «Añadir en la esquina superior derecha», «Procesar los pagos dentro de la UI», «Colorear el nombre de los autos y pistas», «Un botón para abortar la carga del simulador», «Utilizar breadcrumb navigation») y `([regex]::Matches($h,'License Progress')).Count` = 1 (`d-no-dup`).
    - Topbar/menú: `Select-String alcance.html -Pattern 'href="estrategia.html"'` cuenta el ítem del menú y la tarjeta; el ítem Estrategia del menú no lleva `role` ni `aria-disabled`; Estructura, Esqueleto y Superficie sí (`aria-disabled="true"` ×3); `Select-String alcance.html -Pattern 'ico-estructura-white.svg','ico-star.svg'` presentes; el `<span>` del disparador dice «Alcance» y no hay ítem Alcance en el menú.
  - **QA manual (sin estilos propios aún):** la página abre desde `file://`, sin errores en consola ni assets rotos; menú: se abre con click, cierra con click afuera y con Escape, Tab entra al ítem Estrategia pero no a los deshabilitados.
- [x] T003 [front] Crear `alcance.css`: grilla 2×2, ejes dorados con flecha, divisores punteados, números, tarjetas del cuadrante 1 diferenciadas, leyenda y responsive 1300/900/640 — `alcance.css` — FR-002, FR-004, FR-008, FR-010 — depende de T002
  - Implementar las tablas «Medidas de la matriz» y «Breakpoints» del plan, todo acotado a `.page-alcance`. La estrella de la leyenda con `width:24px; height:24px` y `gap:24px`; el cuadrante 1 con borde `var(--gold-t)` 2 px y texto ≈ 24 px; resto sin borde y ≈ 20 px; `.q-leyenda` solo visible en ≤ 640 px.
  - **Check:** `Select-String alcance.css -Pattern 'page-alcance'` en cada bloque (nada global suelto); `Select-String alcance.css -Pattern 'gap: ?24px','width: ?24px','height: ?24px'` presentes para la leyenda; `Select-String alcance.css -Pattern '@media \(max-width: ?640px\)'` presente; `Select-String alcance.css -Pattern '#[0-9a-fA-F]{3,6}'` solo devuelve `#fff` (colores de la paleta salen de tokens).
  - **QA manual:** (1) a 1920 px comparar `alcance.html` contra `referencia-figma.webp` con las dos a la vista: título y sub, leyenda centrada con la estrella a 24 px del texto, ejes y etiquetas, divisores, números 1–4 (dorado/gris, estrella del 1), tarjetas doradas y grandes del cuadrante 1 frente a las chicas sin borde, ancho de columnas; medir estrella con las DevTools (24 × 24 px, 24 px de gap); calibrar los desplazamientos de números y estrella; (2) 1300 y 900 px: sin solapes ni desbordes y la topbar acorde a Estrategia; (3) 640 y 375 px: cuadrantes apilados 1-2-3-4, cada uno con su número y su leyenda de texto, ejes ocultos, sin scroll horizontal; (4) hover de tarjetas de `.next` muestra la descripción; (5) consola limpia.

**Checkpoint HU1 + HU2 + HU4:** escenarios de aceptación de HU1 (1–5), HU2 (1–3) y HU4 (1) contra la captura y el spec; todas las tarjetas con el texto del spec; menú y botón «Ver Estructura» (sin destino) correctos; «Estamos acá» = Alcance, «Sigue acá» = Estructura, «Pero también…» = Estrategia, Esqueleto, Superficie.

## HU3 — Links al sitio y llms.txt
- [x] T004 [front] [P] Activar los links a Alcance en el Home, 5-elementos y Estrategia — `index.html`, `5-elementos.html`, `estrategia.html` — FR-006, FR-007 — sin dependencias (la prueba de navegación necesita T002)
  - `index.html:317`: agregar `onclick="location.href='alcance.html'"` al `button.proceso-card[data-step="alcance"]`.
  - `5-elementos.html:167` y `:252` → `href="alcance.html"`.
  - `estrategia.html:62` (ítem Alcance del menú): quitar `role="link"` y `aria-disabled="true"`, agregar `href="alcance.html"`; `:71` y `:214` → `href="alcance.html"`.
  - **Check:** `Select-String index.html -Pattern "location.href='alcance.html'"` = 1; `Select-String 5-elementos.html -Pattern 'href="alcance.html"'` = 2; `Select-String estrategia.html -Pattern 'href="alcance.html"'` = 3; `Select-String estrategia.html -Pattern 'capas-item' -SimpleMatch` muestra el ítem Alcance sin `aria-disabled` y los otros 3 con él; no quedan `href="#alcance"` en `5-elementos.html` como tarjeta (los anchors «Ir a Alcance» `#alcance` de las líneas 120/147/177 se conservan).
  - **QA manual:** desde cada origen (Home: tarjeta Alcance; 5-elementos: «Ver Alcance» y tarjeta final; Estrategia: menú, «Ver Alcance», tarjeta «Sigue acá») se llega a `alcance.html`; desde Alcance la flecha vuelve al Home y «Estrategia» (menú y tarjeta) lleva a `estrategia.html`; Home, 5-elementos y Estrategia se ven igual que antes (FR-007).
- [x] T005 [front] [P] Sumar Alcance a `llms.txt` con el resumen de la matriz — `llms.txt` — FR-009 — sin dependencias
  - Proceso, Estado de las páginas y Enlaces, según la sección SEO del plan; corregir las menciones obsoletas («Ver Alcance» sin destino, «Alcance… todavía no existe»).
  - **Check:** `Select-String llms.txt -Pattern 'alcance.html'` ≥ 3 resultados (Proceso, Estado, Enlaces); `Select-String llms.txt -Pattern 'Matriz FVD','License Progress','máxima prioridad'` presentes; `Select-String llms.txt -Pattern 'Ver Alcance'` sin la frase «todavía no lleva»; la última línea de Estado dice que solo Estructura, Esqueleto y Superficie no existen.

**Checkpoint HU3:** los 6 links de `d-links` llevan a `alcance.html`, la opción del menú de Estrategia queda habilitada, y `llms.txt` incluye la página.

## Cierre
- [x] Actualizar `docs/public/funcionalidades.md`: mapa de páginas (línea 16-17: Alcance implementada, pendientes solo Estructura/Esqueleto/Superficie); sección «Alcance» nueva con la Matriz FVD (título, leyenda «Máxima prioridad», ejes, 4 cuadrantes y sus tarjetas, mobile apilado, menú de capas y «Ver Estructura» sin destino); en 5-elementos (línea 37) solo quedan pendientes Estructura, Esqueleto y Superficie; en Estrategia (líneas 51 y 53) los links a Alcance ya funcionan.
- [x] Actualizar `docs/tech/sistema.md`: estructura de archivos (`alcance.html`, `alcance.css`; `menu-capas.js` ahora lo usan `estrategia.html` y `alcance.html`); orden de CSS y clases de página; breakpoints (640 px en `alcance.css`); estilos movidos a `elementos.css` (lista del plan); `onclick` del Home para Alcance; «Menú de capas» en dos páginas, con Estrategia habilitada en Alcance; tabla SEO con la fila `alcance.html`; pendientes (recontar con Grep los `href="#"` que quedan en `5-elementos.html` y `estrategia.html`, ya que los números de línea cambiaron). Línea 9 de `docs/tech/dependencies/README.md`: sumar `alcance.html`.
  - **Check:** `Select-String docs -Pattern 'alcance.html','alcance.css' -Recurse` aparece en ambas fichas; `Select-String docs\public\funcionalidades.md -Pattern 'Pendiente \(no existen\)'` ya no menciona Alcance.
- [x] Commit (Conventional Commits, archivos específicos), por ejemplo `feat(alcance): agregar página de Alcance con Matriz FVD` con los archivos de T001–T005 y las docs; sin ramas ni PR.
- [x] Pasos de prueba para el usuario y **check final humano**: abrir `alcance.html` desde `file://`; comparar con la captura a 1920 px; revisar 1300/900/640 px; recorrer los 6 links y el menú con teclado; consola limpia. PR solo si se pide.
