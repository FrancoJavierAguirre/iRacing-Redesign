# Plan: Página de Alcance (Matriz FVD)

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.


**Spec:** `spec.md` · **Constitución:** `.cardenal/constitution.md`

## Resumen
`alcance.html` se arma copiando el esqueleto de `estrategia.html` (head con SEO y JSON-LD, topbar con breadcrumb y menú de capas, `main` y sección `.next`). Una sección `.layer-sec` nueva contiene la Matriz FVD: una grilla CSS 2×2 con ejes dorados, divisores punteados y 12 tarjetas, escrita en un `alcance.css` acotado a `body.page-alcance`. Las reglas de `estrategia.css` que ya son comunes (`.next`, `.topbar-action`, `.btn-blue`, `.center-title` y las variables) se mueven a `elementos.css` sin cambiar Estrategia, y se activan los 6 links a Alcance más la opción del menú.

## Contexto técnico
- **Stack:** HTML5 + CSS + JS vanilla, sin build; rutas relativas; debe abrir desde `file://` (Art. VI.1). No se toca JS: `menu-capas.js` se reutiliza tal cual (una instancia por página).
- **Orden de CSS:** `styles.css` → `elementos.css` → `alcance.css`. Fuentes del `<link>` de Google Fonts: Exo 2 (200–800), Poppins (200–600), Inter 300;400;600, igual que `estrategia.html`. Alcance necesita Exo 2 200 (números), Poppins 300/400 (tarjetas) e Inter 400 (menú).
- **Fichas consultadas:** `docs/tech/sistema.md` (estructura, menú de capas, SEO), `docs/public/funcionalidades.md`, `.cardenal/context.json` (`o-alcance-links`, `d-star`, `d-links`, `d-no-dup`, `d-mobile`).
- **Reutilizado sin cambios:** `.topbar`, `.breadcrumb`, `.capas-*` y `.layer-sec` (`elementos.css`); `.sec-title` / `.sec-sub` (`styles.css:342-357`: 64 px y 24 px @1920, `margin: 0 0 24px` el título); `.btn`, `.btn--sm`, `.btn-icon`, `.proceso-card` (`styles.css`); `--card-bg`, `--side-pad`, `--font-display` (`:root`); `--gold-t #bca447` (`body.page-elementos`).
- **Hechos verificados al planificar:** `.topbar-action`, `.btn-blue`, `.center-title`, `.next*` no se usan en `index.html` ni `5-elementos.html` (solo en Estrategia), así que generalizar los selectores no altera esas dos páginas. `assets/ico-star.svg` (24×24, `#BCA447`) y `assets/ico-alcance-white.svg` ya existen; falta `assets/ico-estructura-white.svg`.

## Estructura de archivos
| Archivo | Acción | Motivo |
| --- | --- | --- |
| `alcance.html` | crear | Página: head SEO, topbar, matriz, `.next`. FR-001/003/004/005/009 |
| `alcance.css` | crear | Estilos de la matriz y su responsive (1300/900/640), acotados a `.page-alcance`. FR-002/004/008 |
| `assets/ico-estructura-white.svg` | crear | Ícono blanco de «Ver Estructura»: mismo `<path>` y `viewBox 0 0 40 40` que `assets/icon-estructura.svg`, con `fill="#FFFFFF"` en lugar de `#B7B7BA` (misma derivación que `ico-alcance-white.svg`). FR-005 |
| `elementos.css` | modificar | Recibe los estilos compartidos movidos desde `estrategia.css`. FR-005/007 |
| `estrategia.css` | modificar | Se le quitan las reglas movidas (sin cambio visual). FR-007 |
| `estrategia.html` | modificar | Opción Alcance del menú (quitar `role="link"` y `aria-disabled`, poner `href="alcance.html"`, línea 62), «Ver Alcance» (línea 71) y tarjeta «Sigue acá» (línea 214) → `alcance.html`. FR-006 |
| `5-elementos.html` | modificar | Líneas 167 («Ver Alcance», `href="#"`) y 252 (tarjeta `href="#alcance"`) → `href="alcance.html"`. FR-006 |
| `index.html` | modificar | Línea 317: agregar `onclick="location.href='alcance.html'"` al `button.proceso-card[data-step="alcance"]`, como la de Estrategia (línea 313). FR-006 |
| `llms.txt` | modificar | Sumar Alcance a Proceso, Estado de las páginas y Enlaces, con resumen de la matriz. FR-009 |
| `docs/public/funcionalidades.md` | modificar | Mapa de páginas, sección Alcance, links activos. |
| `docs/tech/sistema.md` | modificar | Estructura de archivos, estilos movidos, menú en 2 páginas, SEO, pendientes. |
| `docs/tech/dependencies/README.md` | modificar | Línea 9: sumar `alcance.html` a las páginas que cargan Google Fonts. |

## Contratos

### Marcado de `alcance.html`
- **Head:** copia de `estrategia.html` cambiando título/descripción/JSON-LD (ver SEO). `body class="page-elementos page-alcance"`, `<script src="menu-capas.js" defer>` al final, sin otro JS.
- **Topbar:** idéntica a Estrategia con estos cambios:
  - disparador `<span>Alcance</span>`, `aria-current="page"`, `aria-controls="capas-menu"`;
  - menú con 4 ítems: `<a class="capas-item" href="estrategia.html"><img src="assets/icon-estrategia.svg" alt="" width="16" height="16"><span>Estrategia</span></a>` (sin `role` ni `aria-disabled`) y Estructura, Esqueleto y Superficie como `<a class="capas-item" role="link" aria-disabled="true">` sin `href`. Alcance no figura;
  - `<h1 class="topbar-title">Alcance</h1>`;
  - `<a href="#" class="btn btn--sm btn-blue topbar-action"><img class="btn-icon" src="assets/ico-estructura-white.svg" alt="">Ver Estructura</a>` (`href="#"`, igual que «Ver Alcance» en Estrategia, porque Estructura no existe).
- **Matriz** (única sección de contenido, DOM en orden 1, 2, 3, 4):
  ```html
  <section class="layer-sec matriz" id="matriz" aria-labelledby="matriz-titulo">
    <div class="container">
      <h2 class="sec-title" id="matriz-titulo">Matriz FVD</h2>
      <p class="sec-sub">Factibilidad, viabilidad y deseabilidad</p>
      <p class="matriz-leyenda"><img src="assets/ico-star.svg" alt="" width="24" height="24"><span>Máxima prioridad</span></p>
      <div class="matriz-grid">
        <div class="eje eje--y" aria-hidden="true"><span class="eje-label">Muy deseable</span></div>
        <div class="eje eje--x" aria-hidden="true"><span class="eje-label eje-label--fin">Muy factible</span><span class="eje-label eje-label--origen">Poco deseable y factible</span></div>
        <div class="cuadrante cuadrante--1" role="group" aria-label="Cuadrante 1: muy deseable y muy factible, máxima prioridad">
          <div class="q-head" aria-hidden="true"><span class="q-num">1.</span><img class="q-star" src="assets/ico-star.svg" alt="" width="24" height="24"><span class="q-leyenda">Muy deseable · Muy factible</span></div>
          <ul class="q-lista"><li class="q-card">…</li></ul>
        </div>
        <!-- cuadrante--2, --3, --4 con la misma forma (sin .q-star) -->
      </div>
    </div>
  </section>
  ```
  - Los 4 cuadrantes son hermanos directos de `.matriz-grid`; la posición se da por CSS (`grid-area`), no por el orden del DOM. Así el apilado mobile sale 1-2-3-4 sin reordenar.
  - Lectores de pantalla: cada `role="group"` con `aria-label` anuncia el cuadrante y su significado; los ejes y `.q-head` van `aria-hidden` porque duplican esa información. Las listas son `<ul>` reales. Las imágenes son decorativas (`alt=""`).
  - `aria-label` de los otros cuadrantes (deducidos de los ejes): 2 «Cuadrante 2: poco deseable y muy factible», 3 «Cuadrante 3: muy deseable y poco factible», 4 «Cuadrante 4: poco deseable y poco factible». `.q-leyenda` mobile: «Poco deseable · Muy factible» (2), «Muy deseable · Poco factible» (3), «Poco deseable · Poco factible» (4).
  - Textos de las 12 tarjetas: literales de HU1 (con comillas tipográficas “ ” y tildes), en orden: cuadrante 1 → 5, 2 → 2, 3 → 3, 4 → 2. «Nueva vista License Progress…» aparece solo en el cuadrante 1.
- **`.next`:** copia del bloque de Estrategia (`estrategia.html:209-219`) con: «Estamos acá» = Alcance (`href="alcance.html"`, `card-alcance.png`, `icon-alcance.svg`); «Sigue acá» = Estructura (`href="#"`); «Pero también están…» = Estrategia (`href="estrategia.html"`), Esqueleto y Superficie (`href="#"`). Descripciones copiadas de las tarjetas actuales.

### Links (HU3)
| Origen | Hoy | Después |
| --- | --- | --- |
| `index.html:317` | `<button … data-step="alcance">` sin navegación | + `onclick="location.href='alcance.html'"` |
| `5-elementos.html:167` | `<a href="#" class="btn btn-primary">Ver Alcance` | `href="alcance.html"` |
| `5-elementos.html:252` | `<a href="#alcance" class="proceso-card">` | `href="alcance.html"` |
| `estrategia.html:62` | `<a class="capas-item" role="link" aria-disabled="true">` Alcance | `<a class="capas-item" href="alcance.html">` |
| `estrategia.html:71` | `href="#"` «Ver Alcance» | `href="alcance.html"` |
| `estrategia.html:214` | `href="#"` tarjeta «Sigue acá» | `href="alcance.html"` |

No cambia ningún otro `href="#"` (Estructura, Esqueleto, Superficie siguen sin destino). Los anchors internos `#alcance` de `5-elementos.html` (líneas 120, 147, 177: «Ir a Alcance» y la sección) se conservan.

### SEO (patrón 0001, `docs/tech/sistema.md`)
- `<title>`: `Alcance — Rediseño iRacing`.
- `meta description` (≈147 caracteres, tope 160): `Alcance del rediseño de iRacing: la Matriz FVD prioriza las soluciones según factibilidad, viabilidad y deseabilidad. Case study de Franco Aguirre.` Se repite igual en `og:description`, `twitter:description` y en el JSON-LD.
- `og:title` y `twitter:title` = el `title`; `og:type website`, `og:site_name`, `og:locale es_AR`, `twitter:card summary`, `robots index, follow` iguales a Estrategia. Sin `canonical`, `og:url` ni `og:image` (pendientes ya documentados).
- JSON-LD `WebPage`: `name`, `description`, `inLanguage es`, `dateCreated 2025`, `author` Franco Aguirre, `about`, `isPartOf` (`CreativeWork` «iRacing — Rediseño UX/UI»), `breadcrumb` con `ListItem` 1 «Rediseño UX/UI» (`item: "index.html"`) y 2 «Alcance». Sin URLs absolutas.
- `llms.txt`:
  - **Proceso:** sumar «[Alcance](alcance.html): segunda capa del proceso. Presenta la Matriz FVD (factibilidad, viabilidad y deseabilidad), que ordena 12 soluciones en 4 cuadrantes según qué tan deseables y factibles son. El cuadrante 1 (muy deseable y muy factible, máxima prioridad) reúne 5: ícono de carrito junto al perfil, pagos dentro de la UI, nueva vista License Progress, colorear autos y pistas que hay que comprar, y botón de registro convertido en menú. Cuadrante 2: nueva sección “Cars” y mensajes de error con solución práctica. Cuadrante 3: quitar columnas de la tabla de carreras para sumar el auto favorito, botón de registro como menú con más opciones y rediseño de la arquitectura de información para usuarios nuevos. Cuadrante 4: botón para abortar la carga del simulador y breadcrumb en lugar de modales.»
  - **Estado de las páginas:** `5-elementos.html` («…las capas Estructura, Esqueleto y Superficie…» sin Alcance); en `estrategia.html` quitar «y el botón “Ver Alcance” todavía no lleva a ninguna parte»; sumar `alcance.html`: completa, «Ver Estructura» todavía no lleva a ninguna página; última línea: «Las páginas de Estructura, Esqueleto y Superficie todavía no existen.»
  - **Enlaces:** sumar `[Alcance](alcance.html)`.

### Errores y permisos
Sin backend, sin formularios, sin servicios externos nuevos. Sin errores de consola (FR-010): todos los assets referenciados existen; si Google Fonts no carga, queda la fuente de respaldo `sans-serif`.

## Datos
Sin cambios de modelo ni almacenamiento; sin migraciones. Contenido estático.

## Diseño de referencia (si hay UI)
Captura `referencia-figma.webp` (1410 px; escala de la captura a 1920 px = 1920 / 1410 ≈ 1,362; `px@1920 = px_captura × 1,362`). Se mapea a componentes existentes y a un bloque nuevo en `alcance.css`. Convención: `clamp(min, X vw, máx)` con `X = px@1920 / 19,2`. Las medidas marcadas «≈» son estimaciones a partir de la captura y se afinan en el QA contra la captura a 1920 px.

### Reuso (sin estilos nuevos)
| Elemento | Origen |
| --- | --- |
| Título «Matriz FVD», subtítulo | `.sec-title` (Poppins 400, 64 px) y `.sec-sub` (Poppins 200, 24 px) de `styles.css`; coinciden con la captura (cap. título ≈ 64 px, sub ≈ 24 px) |
| Topbar, breadcrumb, menú | `elementos.css` (idéntico a Estrategia) |
| Botón «Ver Estructura» | `.btn.btn--sm.btn-blue.topbar-action` |
| Siguiente elemento UX | `.next` + `.center-title` + `.proceso-card` |

### Medidas de la matriz (nuevas, `alcance.css`)
Variables locales en `.page-alcance .matriz-grid`: `--gut: clamp(56px, 7.7604vw, 149px)` (canal del eje y; el eje cae en `--gut - --cgap`), `--cgap: clamp(12px, 1.6667vw, 32px)`, `--num-w: clamp(56px, 7.8125vw, 150px)` (zona del número a la derecha del cuadrante 1/2), `--qgap: clamp(12px, 1.25vw, 24px)` (gap entre tarjetas y entre filas), `--ex: clamp(18px, 1.5vw, 29px)` (aire entre la última fila y el eje x).

| Elemento | @1920 (de la captura) | CSS |
| --- | --- | --- |
| Contenedor | 1760 px de contenido (margen 80) | `.container` existente |
| Sección | padding superior ≈ 80 px (el título queda ≈ 92 px bajo la topbar) | `.page-alcance .layer-sec { padding-top: clamp(40px, 4.1667vw, 80px); padding-bottom: 0 }` |
| Leyenda «★ Máxima prioridad» | centrada; Poppins 300, 24 px; ≈ 48 px bajo el subtítulo; estrella 24×24 con gap 24 px | `.matriz-leyenda { display:flex; justify-content:center; align-items:center; gap:24px; margin:clamp(24px,2.5vw,48px) 0 0; font:300 clamp(16px,1.25vw,24px)/1.3333 "Poppins"; color:#fff }`; `img { width:24px; height:24px }` (fijos: FR-004) |
| Grilla | columnas `var(--gut) minmax(0,1fr) minmax(0,1.2fr)` (en 1920: 149 · 732 · 879); áreas `". q3 q1" ". q4 q2"`; ≈ 79 px bajo la leyenda | `.matriz-grid { position:relative; display:grid; grid-template-areas:". q3 q1" ". q4 q2"; margin-top: clamp(48px, 4.1146vw, 79px); padding-bottom: var(--ex) }` y `.cuadrante--N { grid-area: qN }` |
| Columnas de tarjetas | izquierda ≈ 715 px (x 229–944), derecha ≈ 714 px (x 976–1690), separadas 32 px con el divisor al medio (x 960) | `.cuadrante--3, --4 { padding-right: calc(var(--cgap)/2) }`; `.cuadrante--1, --2 { padding: 0 var(--num-w) 0 calc(var(--cgap)/2) }` |
| Tarjetas, base | fondo `var(--card-bg)` (negro 60 %); radio ≈ 8 px; gap vertical ≈ 24 px; texto blanco | `.q-card { background: var(--card-bg); border-radius: 8px; color:#fff; font-family:"Poppins",sans-serif; line-height:1.5 }`, `.q-lista { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:var(--qgap) }` |
| Tarjetas cuadrante 1 | borde dorado 2 px; texto ≈ 24 px/36 px, Poppins 300; padding ≈ 22 px 22 px (+ borde) → alto de 3 líneas ≈ 154 px | `.cuadrante--1 .q-card { border:2px solid var(--gold-t); padding: clamp(10px,1.1458vw,22px); font-weight:300; font-size: clamp(16px, 1.25vw, 24px) }` |
| Tarjetas cuadrantes 2, 3 y 4 | sin borde; texto ≈ 20 px/30 px, Poppins 400; padding ≈ 14 px 16 px (1 línea ≈ 58 px, 3 líneas ≈ 118 px) | `.cuadrante--2 .q-card, --3, --4 { padding: clamp(8px,.7292vw,14px) clamp(10px,.8333vw,16px); font-weight:400; font-size: clamp(13px, 1.0417vw, 20px) }` |
| Números | Exo 2 200, ≈ 128 px (alto del dígito ≈ 93 px); dorado `var(--gold-t)` el «1.»; gris `var(--text-dim)` los demás; el 1 y el 2 quedan fuera de las tarjetas (≈ 32 px a su derecha); el 3 y el 4 quedan detrás del extremo derecho de las tarjetas | `.q-head { position:absolute; z-index:0 }`; `.q-lista { position:relative; z-index:1 }` (el 60 % negro deja ver el número como en la captura); `.q-num { font: 200 clamp(64px,6.6667vw,128px)/1 var(--font-display) }`. Desplazamiento vertical de partida, relativo al borde superior de la primera tarjeta: 1 → −5 px, 2 → −14 px, 3 → +19 px, 4 → −7 px (se afinan en QA). Horizontal: 1 y 2 a `left: calc(100% - var(--num-w) + var(--cgap))`; 3 y 4 con su borde derecho ≈ 21 px antes del borde de las tarjetas |
| Estrella del «1.» | ≈ 35 px en la captura, arriba a la derecha del punto; no es la de 24 px de la leyenda | `.q-star { position:absolute; width: clamp(20px,1.875vw,36px); height:auto }` anclada al `.q-head` del cuadrante 1 (ver dudas) |
| Divisores punteados | vertical: x 960, de la primera tarjeta al fondo de la fila 2; horizontal: entre filas, de x 229 a x 960 y de 960 a 1690 (no llega al número); color gris translúcido, trazo ≈ 2 px (≈ 20 px/16 px) | vertical: `.matriz-grid::before` (`left: calc(var(--gut) + (100% - var(--gut)) / 2.2 - 1px)`, `top:0`, `bottom: var(--ex)`, `width:2px`, `repeating-linear-gradient(180deg, rgba(255,255,255,.28) 0 14px, transparent 14px 28px)`); horizontal: `.cuadrante--2, --4 { padding-top: var(--qgap); background: repeating-linear-gradient(90deg, rgba(255,255,255,.28) 0 20px, transparent 20px 36px) top left / 100% 2px no-repeat }` y en el 2 `background-size: calc(100% - var(--num-w)) 2px`; `.cuadrante--1, --3 { padding-bottom: var(--qgap) }` |
| Eje y (deseabilidad) | línea dorada vertical en x 117 (≈ 3 px), de 5 px sobre la primera fila al eje x, flecha arriba (≈ 19 px de ancho/alto) | `.eje--y { position:absolute; left: calc(var(--gut) - var(--cgap)); top:-5px; bottom: 0; width:3px; background: var(--gold-t) }` + punta con `::before` (bordes CSS, patrón de `.axis .line::before` de `elementos.css`: `border: clamp(5px,.46875vw,9px) solid transparent; border-bottom: clamp(10px,.9375vw,18px) solid var(--gold-t); border-top:0`) |
| Eje x (factibilidad) | línea dorada horizontal ≈ 28 px bajo la última fila, de x 197 a x 1690, flecha a la derecha | `.eje--x { position:absolute; left: calc(var(--gut) - var(--cgap)); right: var(--num-w); bottom:0; height:3px; background: var(--gold-t) }` + punta con `::after` |
| Etiquetas de ejes | Poppins 300, ≈ 20 px, blanco; «Muy deseable» centrada sobre el eje y y ≈ 12 px sobre la punta; «Muy factible» ≈ 30 px a la derecha de la punta, centrada sobre el eje x; «Poco deseable y factible» en el borde izquierdo (x 80), ≈ 12 px bajo el eje x | `.eje-label { font: 300 clamp(13px,1.0417vw,20px)/1.3 "Poppins"; color:#fff; white-space:nowrap; position:absolute }` con offsets por variante |

Los colores nuevos son: el gris de los números (`--text-dim`, token), el dorado (`--gold-t`, token de la página) y los trazos punteados `rgba(255,255,255,.28)` (mismo valor que `.circle span + span` de `elementos.css`).

### Breakpoints
| Ancho | Comportamiento |
| --- | --- |
| ≥ 1301 | Layout de la captura, todo fluido con `clamp()`. |
| ≤ 1300 | Sin reglas propias: las variables y tamaños se achican por `clamp()` hasta sus mínimos. Revisar que las tarjetas del cuadrante 1 (el más angosto en proporción) no se desborden. |
| ≤ 900 | Grilla 2×2 intacta con los mínimos de `clamp()` (tarjetas de ≈ 330 px de ancho). La topbar sigue la regla compartida: se oculta «Ver Estructura» y el crumb «Rediseño UX/UI». Si las tarjetas quedan ilegibles, se ajusta `--gut`/`--num-w` mínimos, no se agrega un layout nuevo. |
| ≤ 640 | `@media (max-width: 640px)` en `alcance.css`: `.matriz-grid { display:block; padding-bottom:0 }`; `.matriz-grid::before` y `.eje` con `display:none`; cada cuadrante en bloque con `padding:0` y `background:none`, separados por `margin-top: 40px`; `.q-head { position:static; display:grid }` con el número arriba (≈ 56 px, estrella a su lado en el 1) y `.q-leyenda` debajo (Poppins 300, 14 px, `--text-mid`); `.q-leyenda` es `display:none` fuera de este breakpoint; `.q-lista { z-index:auto }`; tarjetas 100 % de ancho, texto 16 px (cuadrante 1) y 14 px (resto). Sin scroll horizontal (`min-width:0` en grilla y tarjetas, `overflow-wrap:anywhere` si hace falta). |

## Estilos compartidos: mover, no duplicar
Decisión: se mueven de `estrategia.css` a `elementos.css` (cargado por ambas páginas), generalizando el selector sin cambiar especificidad ni el aspecto de Estrategia. `alcance.css` no duplica nada.

Reglas que se mueven (referencias a `estrategia.css` actual):
1. Línea 5, variables de página: `.page-estrategia { --fs-body …; --fs-h3 …; --gap-s …; --card … }` → selector `.page-estrategia, .page-alcance` (las usa `.next`: `--fs-body`, `--gap-s`).
2. Líneas 7–10: `.page-estrategia .topbar-action`, `.page-estrategia .topbar-action.btn:hover`, `.page-estrategia .btn-blue`, `.page-estrategia .btn-blue:hover` → prefijo `.page-elementos` (ninguna otra página las usa).
3. Línea 18: `.center-title` (base; `.center-title.md` de la línea 19 se queda en Estrategia).
4. Líneas 125–133: bloque «Siguiente elemento UX» completo: `.next`, `.next .center-title`, `.next-row`, `.next-col`, `.next-col .lbl, .next .also`, `.next .also`, `.next .proceso-card`, `.next .proceso-grid`.
5. De `@media (max-width: 900px)`: línea 136 (`.page-estrategia .topbar-action { display:none }` → `.page-elementos .topbar-action`), 142 (`.next-row { flex-direction:column; align-items:center }`) y 143 (`.next .proceso-card { width:100% }`) → se agregan al `@media (max-width: 900px)` que ya existe en `elementos.css`. En `estrategia.css` quedan las líneas 137–141.

Se quedan en `estrategia.css`: `.hl` (línea 6), `main > section { scroll-margin-top }` (11), `.center-title.md` y todo lo demás. Cascada: las reglas movidas quedan antes en el orden de carga, y ninguna regla restante de `estrategia.css` las pisa con igual especificidad (se verifica en QA comparando estilos computados antes/después).

## Riesgos y decisiones
- **Topbar de la captura:** mide ≈ 112 px a 1920 (82 px de captura), mientras que el sitio usa 90 px (`clamp(56px, 4.6875vw, 90px)`). Se mantiene la del sitio (FR-005, igual que Estrategia); no se cambia por la captura.
- **Números 3 y 4 bajo las tarjetas:** quedan en `z-index` inferior a la lista; el fondo de 60 % negro los atenúa, como en la captura.
- **Posición de números y estrella:** son las medidas con más incertidumbre (hay desplazamientos distintos por cuadrante en la captura). Se fijan con valores de partida y se calibran en el QA a 1920 px.
- **Ejes en 641–900 px:** «Muy factible» puede sobrepasar `--num-w` hacia el padding lateral; no genera scroll horizontal porque queda dentro del padding del contenedor (verificar).
- **Sin tests (Art. III):** cada tarea lleva un check acotado (PowerShell/Grep) más QA manual; no se agrega infraestructura de tests.
- **Mover CSS compartido:** riesgo de cambiar Estrategia por orden de cascada. Mitigación: antes de editar, guardar los estilos computados de `.next`, `.next-row`, `.next-col .lbl`, `.topbar-action`, `.btn-blue` y `.center-title` en 1920 y 900 px con un snippet de consola, y comparar después.
- **Aria-label de cuadrantes 2–4:** se infieren de los ejes (arriba = muy deseable, derecha = muy factible); confirmar con el usuario si la lectura es la correcta.
- **Asset nuevo:** `ico-estructura-white.svg` es derivado, sin cambios de forma.

## Chequeo contra la constitución
| Principio | Cumple | Desviación justificada |
| --- | --- | --- |
| I — Alcance | Sí: solo la página de Alcance, sus links y docs; Estructura/Esqueleto/Superficie siguen sin destino y sin contenido inventado. | — |
| II — Datos y servicios externos | Sí: sin scripts de terceros ni APIs; solo el `<link>` de Google Fonts ya existente. | — |
| III — Verificación | Sí: QA manual a 1920/1300/900/640 px, consola sin errores, links sin romper; checks acotados por tarea. | — |
| IV — Git | Sí: rama actual, Conventional Commits con archivos específicos, sin ramas ni PR. | — |
| V — Seguridad | Sí: sin secretos; no hay links externos nuevos. | — |
| VI.1 Stack/`file://` | Sí: HTML/CSS vanilla, rutas relativas. | — |
| VI.2 Idioma | Sí: español rioplatense, `lang="es"`. | — |
| VI.3 Estilos | Sí: tokens (`--card-bg`, `--gold-t`, `--text-dim`, `--side-pad`); hoja propia `alcance.css` acotada con `page-alcance`. | Grises de divisores `rgba(255,255,255,.28)`: valor neutro con precedente en `elementos.css` (`.circle span + span`). |
| VI.4 Medidas | Sí: 1920 px → `clamp()`. | — |
| VI.5 Reglas visuales | Sí: tarjetas con `var(--card-bg)`; botón `btn--sm`. | — |
| VI.6 Tipografía | Sí: Exo 2 (números), Poppins (cuerpo), Inter (botón y menú). | — |
| VI.7 Páginas internas | Sí: topbar con breadcrumb, `.layer-sec` con `id`, cierre con tarjetas de proceso. | Sin botones «Ir a…»: la página tiene una sola sección. |
| VI.8 Media | N/A: no hay videos. | — |
| VI.9 Accesibilidad | Sí: `alt=""` en decorativas, `aria-label` por cuadrante, listas reales, menú con patrón existente. | — |
