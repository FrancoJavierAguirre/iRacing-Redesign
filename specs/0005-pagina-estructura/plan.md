# Plan: Página de Estructura

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.


**Spec:** `spec.md` · **Constitución:** `.cardenal/constitution.md`

## Resumen
`estructura.html` copia el esqueleto de `alcance.html` (head con SEO y JSON-LD, topbar con menú de capas, `main`, `.next`) y suma 4 secciones `.layer-sec`: Arquitectura Actual (placeholder), Tree Testing (+ Conclusiones), Arquitectura Nueva (switch Antes/Después) y Taskflow. Los estilos propios van en `estructura.css` acotado a `body.page-estructura`; el comportamiento (tooltips de help, switch y botones sin destino) va en `estructura.js`, sin dependencias. Los componentes que Estrategia ya tiene (`.t-card`, `.focus-row`, `.persona`, `.numbox`, `.hl`, `.rule-head`) se **mueven** de `estrategia.css` a `elementos.css`, sin cambiar Estrategia. Los 3 árboles son un único componente de listas `<ul>` anidadas con conectores dibujados con CSS; mobile-first: la base es una lista indentada y el layout horizontal con llaves y flechas se activa desde 641 px.

## Contexto técnico
- **Stack:** HTML5 + CSS + JS vanilla, sin build; rutas relativas; debe abrir desde `file://` (Art. VI.1). Sin tests (Art. III): checks acotados (PowerShell/Select-String) + QA manual.
- **Orden de CSS:** `styles.css` → `elementos.css` → `estructura.css`. Scripts al final con `defer`: `menu-capas.js` (una instancia, igual que las otras páginas) y `estructura.js`.
- **Fuentes:** el `<link>` de Google Fonts es el de `alcance.html` con **Poppins con itálica 300** (`Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;1,300`), porque los enunciados de las tareas son itálicos Poppins 300 y sin ese peso el navegador sintetiza la cursiva. Exo 2 (400 árboles/títulos, 300 contadores) e Inter (botones, menú) ya están.
- **Fichas consultadas:** `docs/tech/sistema.md`, `docs/public/funcionalidades.md`, `docs/tech/dependencies/README.md`, `.cardenal/context.json` (`d-placeholder`, `d-icons`, `d-tooltip`, `d-ver-detalles`, `d-taskflow-cards`, `d-antes-despues`, `d-mobile`, `p-links`).
- **Reutilizado sin cambios:** `.topbar`, `.breadcrumb`, `.capas-*`, `.layer-sec`, `.sec-header`, `.sec-nav` (`elementos.css`); `.sec-title`, `.sec-sub`, `.btn`, `.btn--sm`, `.btn--md`, `.btn-info`, `.btn-icon`, `.media-placeholder`, `.proceso-card` (`styles.css`); `.topbar-action`, `.btn-blue`, `.center-title`, `.next*` (ya en `elementos.css` desde 0004); `--card-bg`, `--side-pad`, `--font-display` (`:root`); `--gold-t #bca447` (`body.page-elementos`).
- **Hechos verificados al planificar:** `.hl`, `.rule-head`, `.t-card`, `.focus-row`, `.persona` y `.numbox` solo se usan en `estrategia.html` (Grep sobre `*.html`), así que moverlos no altera Home, 5-elementos ni Alcance. No existe `.sr-only` en el repo. `* { box-sizing: border-box }` está en `styles.css:38`. Los 9 íconos nuevos y `card-sergio.png`, `flag-spain.svg`, `ico-flecha-*.svg` ya están en `assets/`.

## Estructura de archivos
| Archivo | Acción | Motivo |
| --- | --- | --- |
| `estructura.html` | crear | Página completa. FR-001/002/003/009 |
| `estructura.css` | crear | Estilos de la página y de los árboles, acotados a `.page-estructura`. FR-002/003/008 |
| `estructura.js` | crear | Tooltips de help (HU3), switch Antes/Después (HU5), botones sin destino. FR-004/005 |
| `elementos.css` | modificar | Recibe los componentes movidos desde `estrategia.css` y `.page-estructura` en las variables. FR-006/007 |
| `estrategia.css` | modificar | Se le quitan las reglas movidas (sin cambio visual). FR-006/007 |
| `styles.css` | modificar | Variante `.btn-outline-info` junto a `.btn-info` (línea 326). FR-006 |
| `index.html` | modificar | Línea 321: `onclick="location.href='estructura.html'"` en `button.proceso-card[data-step="estructura"]`. FR-007 |
| `5-elementos.html` | modificar | Líneas 190 y 256 → `estructura.html`. FR-007 |
| `estrategia.html` | modificar | Líneas 63 (menú) y 217 (primera tarjeta del `proceso-grid`). FR-007 |
| `alcance.html` | modificar | Líneas 63 (menú), 71 («Ver Estructura») y 124 («Sigue acá»). FR-007 |
| `llms.txt` | modificar | Estructura en Proceso, Estado y Enlaces. FR-009 |
| `docs/public/funcionalidades.md` | modificar | Mapa de páginas, sección Estructura, links activos. |
| `docs/tech/sistema.md` | modificar | Archivos, estilos movidos, árboles, JS, SEO, pendientes. |
| `docs/tech/dependencies/README.md` | modificar | Línea 9: sumar `estructura.html` (Google Fonts). |

## Decisiones técnicas

### 1. Archivos
Tres archivos nuevos (`estructura.html/.css/.js`) por la convención de Art. VI.3 (una hoja por página acotada con clase en `body`) y porque el comportamiento de Estructura (tooltips, switch) no tiene lugar en `menu-capas.js` (propio del menú) ni en `script.js` (propio del Home). `estructura.js` es una IIFE por responsabilidad, inerte si faltan los nodos.

### 2. Estilos compartidos: mover, no duplicar ni sumar prefijos
Se **mueven** a `elementos.css` (cargado por todas las páginas internas) en lugar de sumar `.page-estructura` a cada selector de `estrategia.css`: evita tocar 20 selectores con riesgo de olvidar uno, deja un único dueño de cada componente y sigue el precedente de 0004. Se conserva el **orden relativo** de las reglas (varias dependen del orden con igual especificidad: `.t-card h3` antes de `.persona h3`, `.page-estrategia .hl` antes de `.t-card .hl`). Reglas exactas (líneas de `estrategia.css` actual):

| # | Líneas | Regla | Destino en `elementos.css` |
| --- | --- | --- | --- |
| 1 | 5 | `.page-estrategia .hl { color:#bca447; font-weight:600 }` | `.page-elementos .hl` (misma especificidad 0,2,0; `.hl` solo existe en Estrategia) |
| 2 | 9–12 | `.rule-head`, `.rule-head .rh`, `.rh-ico`, `.rule-head::after` (con el comentario «título secundario con línea») | sin cambios de selector |
| 3 | 63, 65–73 | `.t-card`, `.t-card h3.has-ico`, `.t-ico`, `.t-card h3`, `.t-card p, .t-card li`, `.t-card ul`, `.t-card p + p`, `.t-card p.it`, `.t-card .hl` (queda `.text-cards`, línea 64, en Estrategia) | sin cambios de selector; `.t-card .hl` queda **después** de `.page-elementos .hl` |
| 4 | 75–80, 82–83 | `.focus-row`, `.persona`, `.persona > .persona-bg`, `.persona > *:not(.persona-bg)`, `.persona .flag-sm`, `.persona h3`, `.persona p` (la línea 81 `.persona .flag-ph` se queda: depende de `.flag-ph`, línea 36) | sin cambios de selector |
| 5 | 87 | `.numbox` (las líneas 84–86 `.steps`/`.step-title` se quedan) | sin cambios |
| 6 | 123 | dentro del `@media (max-width: 900px)`: se separa `.focus-row` de `.focus-row, .steps, .exp-body, .dx, .canvas { grid-template-columns: 1fr }`; en Estrategia queda `.steps, .exp-body, .dx, .canvas` | `.focus-row { grid-template-columns: 1fr }` dentro del `@media (max-width: 900px)` ya existente |
| 7 | 130–143 | bloque «las 3 cards de Foco miden 192px»: `.focus-row .t-card, .focus-row .persona`, `.focus-row .t-card h3`, `.focus-row .persona p`, `.focus-row .t-card ul` y su `@media (max-width: 1300px)` | tal cual; el `@media` va como bloque propio justo después |
| 8 | elementos.css:145 | variables de página | `.page-estrategia, .page-alcance, .page-estructura { --fs-body …; --fs-h3 …; --gap-s …; --card … }` |

Se quedan en `estrategia.css`: `main > section { scroll-margin-top }` (línea 6), `.center-title.md` y todo lo específico (hallazgos, encuestas, canvas, `.steps`, `.exp-*`, `.dx`, `.react`). `estructura.css` trae su propia regla de `scroll-margin-top` (1 línea). Verificación: snapshot de estilos computados de Estrategia antes/después (ver T001).

Dónde difiere Estructura de lo movido (overrides en `estructura.css`, nunca en las reglas movidas): padding de `.t-card` 24 px (la captura mide 24, el componente 32), cuerpo de 24 px, `.numbox` dorado y más grande, `.hl` sin negrita en los enunciados. `--fs-body` **no** se cambia (las cards del Taskflow quedan iguales a Estrategia, `d-taskflow-cards`).

### 3. Árboles: un componente, dos formas
Mismo marcado y mismas clases para los 3 árboles (`tree--orig` ×2 y `tree--new`). La forma (posiciones x) vive en CSS por variante, no en el HTML.

**Marcado** (listas anidadas; el estado es una clase en el `li` más texto oculto):
```html
<ul class="tree tree--orig" aria-label="Árbol de navegación de iRacing, tarea 1">
  <li class="tn tn-0"><span class="tn-label">Log In</span>
    <ul class="tn-kids tn-brace">
      <li class="tn tn-1 tn-racing"><span class="tn-label">Racing</span>
        <ul class="tn-kids tn-brace">
          <li class="tn tn-2"><span class="tn-label">Multiplayer</span>
            <ul class="tn-kids tn-drop">
              <li class="tn tn-3"><span class="tn-label">Spectate</span></li>
              <li class="tn tn-3 is-ok"><span class="tn-label">Hosted<span class="sr-only"> (respuesta correcta)</span></span></li>
              <!-- Home: class="tn tn-3 is-bad" + <span class="sr-only"> (respuesta incorrecta)</span> -->
```
- `tn-brace` = hijos en fila con llave horizontal (niveles 0→1 y 1→2); `tn-drop` = hijos en columna con línea vertical y flechas (niveles 3 y 4). «My Content» (nivel 3) lleva un `ul.tn-drop` anidado con Cars y Tracks (nivel 4). `tn-racing` / `tn-shop` distinguen las dos ramas del nivel 1 para asignar variables.
- Cantidades: `tree--orig` 27 nodos; `tree--new` 21. Estados: Tarea 1 `.is-ok` en Hosted, Leagues, Official y AI Single Player, `.is-bad` en Home y Time Attack; Tarea 2 `.is-ok` en Cars (Shop › Content). `.is-ok > .tn-label { color: var(--ok) }`, `.is-bad > .tn-label { color: var(--bad) }`. El texto `.sr-only` cubre FR-003.
- El `ul.tree` no usa `role="tree"` (no es un widget interactivo): son listas reales, con `aria-label`.

**Base (todas las anchuras, y la única regla en ≤ 640 px):** lista indentada. `.tn-kids { margin-left: .6em; padding-left: 1.1em; border-left: 2px solid var(--tree-line) }`, `.tn-label { display:block; padding:.35em 0; font: 400 16px/1.3 Exo 2 }`, sin pseudo-elementos ni flechas. El layout horizontal se escribe entero dentro de `@media (min-width: 641px)`, así el mobile no necesita deshacer nada.

**Layout ≥ 641 px.** Medidas de la captura (px a 1920 → `clamp(min, px/19,2 vw, px)`; `--tf` = tamaño de letra del árbol: original 28 px `clamp(11px, 1.4583vw, 28px)`, nuevo 24 px `clamp(11px, 1.25vw, 24px)`; el mínimo 11 px es para que entre a 641 px, ver riesgos):

- **Columnas.** Cada `ul.tn-brace` es un `display:grid` con `grid-template-columns` en `fr` iguales a los px de la captura y `align-items:start; min-width:0`. La posición de cada hijo sale de su celda (etiqueta alineada a la izquierda, como en Figma), no de su ancho.

  | Árbol | `ul` | Columnas (`fr`) | Origen |
  | --- | --- | --- | --- |
  | orig, nivel 0 | hijos de Log In | `1285fr 475fr` (Racing, Shop) | x 80→1365 y 1365→1840 |
  | orig, nivel 1 Racing | hijos de Racing | `328fr 288fr 354fr 315fr` (Multiplayer, Racing, Single Player, More) | celdas con borde izquierdo en x 80, 408, 696, 1050 |
  | orig, nivel 1 Shop | hijos de Shop | `288fr 187fr` (Content, More) | x 1365 y 1653 |
  | new, nivel 0 | hijos de Log In (ancho 1462) | `226fr 223fr 247fr 276fr 76fr 258fr 156fr` (Racing, Teams, Spectate, My Content, Home, [Shop: columnas 6–7], Profile en la 7) | etiquetas en x 230, 455, 678, 925, 1201, 1277, 1535 |
  | new, nivel 1 Shop | hijos de Shop (ancho 414) | `258fr 156fr` (Content, More) | |

  En el árbol nuevo Shop ocupa `grid-column: 6 / 8; grid-row: 1` y Profile `grid-column: 7; grid-row: 1; justify-self: end`: Shop y Profile se **superponen en la celda** (en la captura las hojas de Shop pasan por debajo de Profile). Las columnas 1 a 5 son una por hijo.
- **Barras y troncos (llaves).** Variables por `li` padre (las heredan su etiqueta y su `ul`; porcentajes del ancho de ese `li`): `--bar-l` (centro del primer hijo), `--bar-r` (distancia del centro del último hijo al borde derecho) y `--mid` (centro del padre). Valores de partida, medidos en la captura:

  | `li` padre | `--bar-l` | `--bar-r` | `--mid` |
  | --- | --- | --- | --- |
  | orig `.tn-0` | 30,2 % | 16,0 % | 56,9 % |
  | orig `.tn-racing` | 5,8 % | 21,7 % | 41,1 % |
  | orig `.tn-shop` | 10,5 % | 28,2 % | 40,6 % |
  | new `.tn-0` | 2,3 % | 2,4 % | 49,9 % |
  | new `.tn-shop` | 10,1 % | 31,2 % | 39,9 % |

  La etiqueta padre se centra en `--mid` con `margin-left: var(--mid); transform: translateX(-50%); width: max-content`. La barra es `.tn-brace::before` (absoluta, `left: var(--bar-l); right: var(--bar-r)`, `border-top: 2px solid var(--tree-line)`), a `--bar-up` = 2,15 em por encima del centro de la etiqueta hija (orig 60 px, new 50 px). El tronco es `.tn-brace::after` (vertical desde ≈ 0,25 em debajo de la etiqueta padre hasta la barra, en `left: var(--mid)`). Cada hijo dibuja su tallo con `.tn-label::before` (`left:50%`, de la barra hasta 0,55 em sobre el tope de la etiqueta; así cae siempre en el **centro de la etiqueta**, sea cual sea su ancho) y la punta con `.tn-label::after` (triángulo de bordes CSS, 10 × 8 px, patrón de `.axis .line::before` de `elementos.css`). El primer y último hijo redondean la esquina de la barra (`border-radius: 10px`, patrón de `.links-row .bracket` en `estrategia.css`).
- **Líneas verticales y flechas (hojas).** `ul.tn-drop`: cada `li` dibuja con `::before` su tramo (borde izquierdo + borde inferior con radio 8 px desde el tope del `li` hasta el centro de la etiqueta, y flecha hacia la derecha con `::after` del label) y, si no es el último, `::after` continúa la línea hasta el fondo del `li` (así la línea atraviesa a «My Content» sin cortarse). Etiqueta de la hoja con `padding-left: 1,7 em`; punta de flecha a 1,15 em de la línea. La línea de un `ul.tn-drop` anidado (nivel 4) queda a 1,7 em, es decir, bajo el borde izquierdo de la etiqueta del padre (captura: línea en x 454 bajo «My Content» en x 457).
- **Verticales.** Cada fila de hoja es un `li` de alto `--pitch` con la etiqueta centrada (`display:flex; align-items:center`). Salto vertical entre centros de etiqueta:

  | Medida (px a 1920) | orig | new |
  | --- | --- | --- |
  | `--pitch` (entre hojas) | 103,5 → `clamp(30px, 5.3906vw, 103.5px)` | 85,7 → `clamp(26px, 4.4635vw, 85.7px)` |
  | Log In → nivel 1 (`--g0`) | 140 | 115 |
  | nivel 1 → nivel 2 (`--g1`) | 122 | 102 |
  | cabecera → primera hoja | 104 (≈ `--pitch`) | 86 (≈ `--pitch`); hojas directas de Racing: 102 |

  `.tn-brace { margin-top: calc(var(--g) - 1.2em) }` (`--g` = `--g0` o `--g1` según el nivel; `1.2em` = alto de la etiqueta). `.tn-drop { margin-top: calc(var(--first) - .6em - var(--pitch)/2) }` con `--first` = distancia cabecera → primera hoja (orig ≈ 35,5 px de margen; new 28,7 px, y 44,7 px bajo Racing). El tramo vertical del primer `li` arranca 1,2 em bajo el centro de la cabecera: `li:first-child::before { top: calc(-1 * (var(--pitch)/2 - 1.2em)) }`.
- **Color de línea:** `--tree-line`, gris de partida `#9aa0ad` (el de `.axis .line`); grosor 2 px; se calibra contra la captura.
- **Anchos del contenedor.** `tree--orig` ocupa todo el contenedor (1760 px a 1920). `tree--new` vive en un `.arch-stage` del mismo ancho que el placeholder de Arquitectura Actual (1462 px = `clamp(280px, 76.1458vw, 1462px)`; Antes y Después comparten caja).
- **Contadores** (`p.score--ok` / `p.score--bad`, DOM antes del árbol): íconos `ico-check-green.svg` / `ico-cross-red.svg` a `clamp(20px,1.6667vw,32px)`; etiqueta Exo 2 300 de 24 px; número Exo 2 300 de 32 px; filas separadas 15 px; colores `--ok` `#5cd633` y `--bad` `#e75149`. En ≥ 641 px son `position:absolute; left:0; top: clamp(24px, 2.7083vw, 52px)` sobre `.tree-wrap` (en la captura quedan a ≈ 55 px bajo el centro de Log In). En ≤ 640 px son estáticos y quedan arriba del árbol.
- **«Ver más detalles»:** en ≥ 641 px `position:absolute; right:0; bottom: calc(var(--pitch)/2 - 24px)` sobre `.tree-wrap` (alineado con la última fila de hojas, como en la captura; en ese tramo la derecha está vacía: el último nivel tiene hojas solo en las 2 primeras columnas). En ≤ 640 px es estático, abajo a la derecha del árbol.
- Los valores marcados son estimaciones desde la captura; se calibran en el QA a 1920 px (tolerancia ±8 px por posición). Esto es lo que más incertidumbre tiene (ver riesgos).

### 4. Tooltip de help
- **Marcado** (dentro de `article.t-card.task-card`, que es `position:relative`):
  ```html
  <button type="button" class="help" aria-label="Más información sobre la Tarea 1" aria-expanded="false" aria-controls="tip-tarea-1"><img src="assets/ico-help.svg" alt="" width="24" height="24"></button>
  <div class="tip" id="tip-tarea-1" hidden><strong>NOTA:</strong> hay muchas formas … <span class="hl">cumplir ciertos requisitos</span>. Por ejemplo: …</div>
  ```
  Disclosure (botón + `aria-controls`), no `role="tooltip"`: ese rol es para tooltips de hover/foco y acá el panel se abre con click. El panel va **inmediatamente después** del botón en el DOM, así el lector de pantalla lo encuentra al avanzar. En el texto de la NOTA, `strong` = Poppins 600; el dorado es `.hl` (600 `#bca447`, ya movido a `elementos.css`: coincide con la spec «negrita + dorado»).
- **Posición** (CSS absoluto respecto de la card, que mide 156 px de alto en la captura): ícono `top: clamp(16px, 1.6667vw, 32px); right: var(--task-pad)` con `--task-pad: clamp(16px, 1.25vw, 24px)` (captura: ícono a 32 px del tope y 24 px del borde derecho, centrado con el título). Panel: `top: calc(<top del ícono> + 24px + 16px)` (16 px bajo el ícono), `right: clamp(0px, calc(100% - 536px), var(--task-pad))` (borde derecho alineado con el del ícono, que queda arriba a la derecha del panel; el `clamp` lleva a 0 cuando la card es más angosta que 560 px para que el panel no se salga por la izquierda; `100%` en `right` es el ancho de la card). `width: min(536px, calc(100vw - 2 * var(--side-pad)))` (FR-008); `box-sizing: border-box`; `background:#212121` (literal del diseño, mismo valor que `.capas-menu`); `border-radius:16px; padding:16px; color:#fff; font: 400 16px/1.5 Poppins`; `z-index:10` (bajo la topbar, 20). Sin sombra: la spec no la define. `.tip[hidden] { display:none }` explícito.
- **Cierre:** click fuera del botón y del panel; segundo click en el mismo botón; Escape (devuelve el foco al botón del panel abierto); abrir uno cierra el otro. Click dentro del panel no lo cierra.

### 5. Switch Antes/Después
`div.seg[role="group"][aria-label="Versión de la arquitectura"]` con dos `button.seg-btn[type=button][aria-pressed][aria-controls]`; dos paneles hermanos `#arq-despues` (árbol) y `#arq-antes` (placeholder), el de Antes con `hidden`. Se eligió botones con `aria-pressed` y no tabs: son dos vistas de un mismo diagrama, el patrón es más simple y funciona nativo con Tab/Enter/Espacio. Estado inicial en el HTML (Después `aria-pressed="true"`), así que sin JS se ve Después. El `hidden` de los paneles se refuerza con `.arch-panel[hidden]{display:none}` (porque `.arch-stage` define `display`). El placeholder de Antes usa `aspect-ratio: 1462 / 800` (≈ alto del árbol nuevo a 1920) para que no salte el layout al cambiar. Estilo: Exo 2 400 de 20 px, `padding: 6px 16px; line-height: 26px` (38 px de alto), radio 8, separados 16 px; activo `background: rgba(1,89,207,.15); color:#679be2`; inactivo `background: transparent; color:#679be2`; hover del inactivo con `rgba(1,89,207,.15)`; `:focus-visible` outline 2 px `#679be2`. Los valores salen de `.btn-info` (`styles.css:325`).

### 6. «Ver más detalles» y «Ver Esqueleto»: sin destino
- Variante en `styles.css` junto a `.btn-info`: `.btn-outline-info { background: transparent; border: 2px solid #679be2; color: #679be2; }` + `:hover { background: rgba(1,89,207,.15) }`; se usa como `.btn.btn--md.btn-outline-info` (sin ícono). Va en `styles.css` porque ahí vive el sistema de botones («aplica a TODOS los botones»); no altera ninguna página existente.
- Marcado: `<a href="#" class="btn btn--md btn-outline-info" data-sin-destino aria-disabled="true">Ver más detalles</a>`; igual «Ver Esqueleto» (`btn--sm btn-blue topbar-action`, con `data-sin-destino`). Se eligió `<a href="#">` porque es el patrón del sitio para tarjetas y botones sin destino («Ver Estructura» de Alcance, las tarjetas de proceso): se reemplaza el `href` el día que llegue el destino. Como `#` salta al tope de la página (molesto en medio de la página), `estructura.js` hace `preventDefault()` de un click delegado sobre `[data-sin-destino]`. `aria-disabled="true"` avisa al lector que no hace nada. Se descartó `<button disabled>`: no recibe foco, se ve distinto y rompe la consistencia visual con el resto de botones del sitio. Las tarjetas `href="#"` de `.next` (Esqueleto, Superficie) no se tocan: se comportan como en las otras páginas.

### 7. SEO
Igual que `alcance.html` (patrón de 0001):
- `<title>`: `Estructura — Rediseño iRacing`.
- Descripción (≈155 caracteres, tope 160), idéntica en `meta description`, `og:description`, `twitter:description` y JSON-LD: `Estructura del rediseño de iRacing: tree testing con 10 usuarios, conclusiones, nueva arquitectura de información y taskflow. Case study de Franco Aguirre.`
- `og:title` y `twitter:title` = el `title`; `og:type website`, `og:site_name`, `og:locale es_AR`, `twitter:card summary`, `robots index, follow`. Sin `canonical`, `og:url` ni `og:image` (pendientes ya documentados).
- JSON-LD `WebPage` como Alcance, con `breadcrumb` de 2 `ListItem`: «Rediseño UX/UI» (`item: "index.html"`) y «Estructura». Sin URLs absolutas.
- `llms.txt`:
  - **Proceso:** sumar «[Estructura](estructura.html): tercera capa del proceso. Muestra la arquitectura de información actual de iRacing (imagen pendiente), un tree testing con UXtweak a 10 usuarios y 2 tareas (Tarea 1, encontrar la primera carrera: 7 respuestas correctas y 3 incorrectas; Tarea 2, comprar el auto: 10 correctas), 3 conclusiones (nomenclatura confusa, arquitectura ambigua, categorías mal contenidas), la arquitectura nueva con un switch Antes/Después (Racing agrupa Official, Hosted, Leagues, Time Attack, AI Single Player, Results & Stats y Replays; Teams, Spectate, My Content, Home, Shop y Profile pasan al primer nivel) y el taskflow del piloto Sergio Barrientos para las dos tareas.»
  - **Estado de las páginas:** `5-elementos.html` («…las capas Esqueleto y Superficie…»); en `alcance.html` quitar «el botón “Ver Estructura” todavía no lleva a ninguna página»; sumar `estructura.html`: completa, salvo la imagen de la arquitectura actual y la versión «Antes» de la arquitectura nueva (recuadros de reemplazo); «Ver más detalles» y «Ver Esqueleto» todavía no llevan a ninguna página; última línea: «Las páginas de Esqueleto y Superficie todavía no existen.»
  - **Enlaces:** sumar `[Estructura](estructura.html)`.

### 8. Documentación
`docs/public/funcionalidades.md`: mapa de páginas (Estructura implementada; pendientes Esqueleto y Superficie), sección «Estructura», links activos en Home, 5-elementos, Estrategia y Alcance. `docs/tech/sistema.md`: archivos, orden de CSS, estilos movidos (tabla de la decisión 2), componente de árboles y sus variables, `estructura.js`, `.btn-outline-info`, `data-sin-destino`, menú de capas en 3 páginas, fila SEO, pendientes (recontar los `href="#"` con Grep). `docs/tech/dependencies/README.md` línea 9.

## Contratos

### Marcado de `estructura.html`
- **Head:** `alcance.html` con título/descripción/JSON-LD de Estructura y Poppins con itálica. `body class="page-elementos page-estructura"`; al final `<script src="menu-capas.js" defer>` y `<script src="estructura.js" defer>`.
- **Topbar:** como Alcance con estos cambios:
  - disparador `<span>Estructura</span>`, `aria-current="page"`;
  - menú de 4 ítems: `<a class="capas-item" href="estrategia.html">` y `href="alcance.html"` (sin `role` ni `aria-disabled`); Esqueleto y Superficie `<a class="capas-item" role="link" aria-disabled="true">` sin `href`. Estructura no figura;
  - `<h1 class="topbar-title">Estructura</h1>`;
  - `<a href="#" class="btn btn--sm btn-blue topbar-action" data-sin-destino aria-disabled="true"><img class="btn-icon" src="assets/ico-esqueleto-white.svg" alt="">Ver Esqueleto</a>`.
- **Secciones** (`<section class="layer-sec" id="…" aria-labelledby="…-titulo">` con `.container`, `.sec-header` y `.sec-nav` con `a.btn.btn--md.btn-info` + `img.btn-icon`):

  | `id` | Título / subtítulo | Botones («Ir a …») |
  | --- | --- | --- |
  | `arquitectura-actual` | Arquitectura Actual / Encontrando las carreras | Tree Testing ↓ (`#tree-testing`) |
  | `tree-testing` | Tree Testing / Dónde deberían estar las carreras | Arquitectura Actual ↑, Arquitectura Nueva ↓ |
  | `arquitectura-nueva` | Arquitectura Nueva / Encontrando las carreras | Tree Testing ↑, Taskflow ↓ |
  | `taskflow` | Taskflow / Necesidades del piloto | Arquitectura Nueva ↑ |

- **Arquitectura Actual:** `div.arch-stage[data-navegable="arquitectura-actual"]` > `div.media-placeholder[role="img"][aria-label="Captura de la arquitectura actual de iRacing (pendiente)"][data-label="Imagen — arquitectura-actual (navegable)"]`. El `.arch-stage` es `position:relative`: ahí se superponen más adelante los botones invisibles (`d-placeholder`), sin implementarlos.
- **Tree Testing** (en este orden): `.tt-meta` (fila centrada: `img.logo-uxtweak` alt «UXtweak» · `ico-usuario-gold.svg` + «10 usuarios» · `ico-circulo-check.svg` + «2 tareas»); por cada tarea: `article.t-card.task-card` (`h3.has-ico` con `ico-circulo-check.svg` + «Tarea N», botón help, tooltip, `p.task-q`) y `div.tree-wrap` (contadores, `ul.tree`, «Ver más detalles»); luego `h3.center-title` «Conclusiones» y `div.conclusions` con 3 `article.t-card.conclusion` (`h3.has-ico` con `span.numbox.numbox--gold` + título, y `p`). Los enunciados llevan las comillas tipográficas de la spec y `<span class="hl">` en la frase dorada.
- **Arquitectura Nueva:** `div.seg` (switch) y, debajo, `div.arch-stage` con `#arq-despues` (`div.arch-panel` > `ul.tree.tree--new`) y `#arq-antes` (`div.arch-panel[hidden]` > `div.media-placeholder[data-label="Imagen — arquitectura-antes"]`).
- **Taskflow:** `div.focus-row` idéntico al de Estrategia (`estrategia.html:149-157`: `t-card persona` con `img.persona-bg` `card-sergio.png`, `img.flag-sm` `flag-spain.svg` alt «España», 33 años, Analista de Sistemas, PC y Celular; y las dos cards con los mismos textos); por cada tarea `h3.rule-head` (`span.rh` con `img.rh-ico` `ico-circulo-check.svg` + «Tarea N»), `h3.center-title` con el título de la tarea y `ol.flow` de 5 `li.t-card.flow-card` (primero `.flow-card--start`, último `.flow-card--end`; en estos dos, `span.flow-title` con `ico-flag-green.svg` + «Inicio» o `ico-flag-checkered.svg` + «Fin»; las flags `alt=""`).
- **`.next`:** copia de `alcance.html:119-129` con: «Estamos acá» = Estructura (`href="estructura.html"`, `card-estructura.png`, `icon-estructura.svg`); «Sigue acá» = Esqueleto (`href="#"`); «Pero también están…» = Estrategia (`estrategia.html`), Alcance (`alcance.html`) y Superficie (`#`). Descripciones copiadas de las tarjetas actuales.

### `estructura.js` (IIFE, sin dependencias, inerte si faltan los nodos)
- **Tooltips:** `[aria-controls]` de `.help` → `open(btn)` / `close(btn)` alternan `aria-expanded` y `hidden` del panel `document.getElementById(btn.getAttribute('aria-controls'))`; `open` cierra antes los demás. Listeners: `click` en cada botón (alterna); `click` en `document` (cierra todos si el target no está dentro de un `.help` ni de un `.tip`); `keydown` Escape (si hay uno abierto, lo cierra y le da foco al botón).
- **Switch:** `.seg-btn` → al click, `aria-pressed` verdadero solo en el botón elegido y `hidden` en el panel opuesto (`aria-controls`). Sin foco forzado.
- **Sin destino:** `click` delegado en `document`: `if (e.target.closest('[data-sin-destino]')) e.preventDefault()`.
- Sin `localStorage`, sin red, sin timers.

### Links (HU7, `p-links`)
| Origen | Hoy | Después |
| --- | --- | --- |
| `index.html:321` | `<button class="proceso-card" data-step="estructura" …>` sin navegación | + `onclick="location.href='estructura.html'"` (como Alcance, línea 317) |
| `5-elementos.html:190` | `<a href="#" class="btn btn-primary">Ver Estructura` | `href="estructura.html"` |
| `5-elementos.html:256` | `<a href="#estructura" class="proceso-card">` | `href="estructura.html"` |
| `estrategia.html:63` | `<a class="capas-item" role="link" aria-disabled="true">` Estructura | `<a class="capas-item" href="estructura.html">` (sin `role` ni `aria-disabled`) |
| `estrategia.html:217` | primera tarjeta del `proceso-grid` (Estructura) `href="#"` | `href="estructura.html"` (Esqueleto y Superficie de la misma línea quedan en `#`) |
| `alcance.html:63` | ítem Estructura del menú, deshabilitado | `href="estructura.html"`, sin `role` ni `aria-disabled` |
| `alcance.html:71` | `<a href="#" class="btn btn--sm btn-blue topbar-action">Ver Estructura` | `href="estructura.html"` |
| `alcance.html:124` | tarjeta «Sigue acá» `href="#"` | `href="estructura.html"` |

Se conservan los anchors internos `#estructura` de `5-elementos.html` (líneas 154 y 200 «Ir a Estructura» y la sección `id="estructura"`, línea 170). No cambia ningún otro `href="#"`.

### Errores y permisos
Sin backend, sin formularios, sin servicios externos nuevos. Sin errores de consola (FR-010): todos los assets existen; `estructura.js` y `estructura.css` se referencian recién cuando existen. Si Google Fonts no carga, queda `sans-serif`.

## Datos
Sin cambios de modelo ni almacenamiento; sin migraciones. Contenido estático.

## Diseño de referencia
Captura `referencia-figma.jpg` (1920 × 8437, escala 1:1). Convención: `clamp(min, X vw, máx)` con `X = px@1920 / 19,2`. Las medidas «≈» son estimaciones de la captura y se afinan en el QA contra ella a 1920 px.

### Reuso (sin estilos nuevos)
| Elemento | Origen |
| --- | --- |
| Título y subtítulo de sección, botones «Ir a …» | `.sec-header` + `.sec-title`/`.sec-sub` + `.sec-nav .btn--md.btn-info` |
| Topbar, breadcrumb, menú, «Ver Esqueleto» | `elementos.css` (idéntico a Alcance) |
| Persona y 2 cards del Taskflow | `.focus-row`, `.persona`, `.t-card` (movidos, texto igual a Estrategia) |
| Encabezado «Tarea N» del Taskflow | `.rule-head` (movido); su margen de 96 px arriba coincide con la captura (≈ 116 px entre el borde de las cards y el centro del título) |
| Título «Conclusiones», título de cada tarea del Taskflow | `.center-title` (40 px Exo 2 300) |
| Palabras doradas | `.hl` (movido) |
| Siguiente elemento UX | `.next` + `.center-title` + `.proceso-card` |

### Medidas nuevas (`estructura.css`, todo bajo `.page-estructura`)
Tokens locales en `.page-estructura`: `--ok #5cd633`, `--bad #e75149`, `--info #679be2`, `--flow-end #0a5bd6` (mismo valor que `.btn-blue`), `--tree-line #9aa0ad`, `--task-pad clamp(16px, 1.25vw, 24px)`. Son colores literales del diseño (no existen en `:root`); se declaran una sola vez como variables y el resto de la hoja usa `var()`, y el dorado sale de `--gold-t`.

| Elemento | @1920 (de la captura) | CSS |
| --- | --- | --- |
| `scroll-margin-top` | 90 px (altura de la topbar del sitio) | `.page-estructura main > section { scroll-margin-top: 90px }` |
| Placeholder de Arquitectura Actual | x 229→1691 (1462 px), alto ≈ 760 px (y 408→1168 en la captura; la spec decía ≈ 720, ver riesgos), ≈ 96 px bajo el subtítulo | `.arch-stage { width: clamp(280px, 76.1458vw, 1462px); margin: clamp(40px,5vw,96px) auto 0; position: relative }`, `.arch-stage .media-placeholder { width:100%; aspect-ratio: 1462/760; min-height:0 }` |
| Fila UXtweak | centrada; logo 200×50, íconos 32, texto Exo 2 400 40 px, 16 px entre ícono y texto, ≈ 96 px entre grupos; 96 px arriba y 48 px abajo | `.tt-meta { display:flex; justify-content:center; align-items:center; flex-wrap:wrap; gap: clamp(16px,5vw,96px); margin: clamp(48px,5vw,96px) 0 clamp(24px,2.5vw,48px); font: 400 clamp(22px,2.0833vw,40px)/1.2 var(--font-display) }`; logo `width: clamp(120px,10.4167vw,200px); height:auto`; íconos `clamp(24px,1.6667vw,32px)` |
| Card Tarea | ancho completo, alto 156 px, radio 16, padding 24; título: círculo check 40 px + «Tarea N» Exo 2 400 28 px (gap 16), centro a 44 px del tope; enunciado Poppins itálica 300 24 px / 36 px a 32 px bajo el título | `.task-card { position:relative; padding: var(--task-pad) }` (pisa los 32 px de `.t-card`); `h3` ya es `clamp(18px,1.4583vw,28px)`; `.task-card h3 { margin-bottom: clamp(16px,1.6667vw,32px) }`; `.task-q { font: italic 300 clamp(15px,1.25vw,24px)/1.5 "Poppins"; margin:0 }`; `.task-q .hl { font-weight: inherit }` |
| Árbol bajo la card | ≈ 72 px bajo la card (a Log In) y 64 px hasta la card siguiente | `.tree-wrap { position:relative; margin-top: clamp(40px,3.75vw,72px) }`; `.task-card + .tree-wrap + .task-card`: `margin-top: clamp(32px,3.3333vw,64px)` |
| Conclusiones | título centrado; 3 cards de ancho completo (alto ≈ 155 px) separadas 48 px; título Exo 2 28 px con recuadro de 42×42 (borde dorado 2 px, radio 8, número dorado Exo 2) y texto Poppins 300 24 px, 32 px bajo el título | `.conclusions { display:flex; flex-direction:column; gap: clamp(24px,2.5vw,48px) }`; `.conclusion { padding: var(--task-pad) }`; `.conclusion h3 { margin-bottom: clamp(16px,1.6667vw,32px) }`; `.conclusion p { font-size: clamp(15px,1.25vw,24px); line-height:1.5 }`; `.numbox--gold { width/height: clamp(28px,2.1875vw,42px); font-size: clamp(16px,1.25vw,24px); color: var(--gold-t); border-color: var(--gold-t); border-radius: 8px }` (pisa `.numbox`, que usa `em` relativo a otro tamaño); `.center-title` de «Conclusiones» con `margin-top: clamp(32px,3.3333vw,64px)` |
| Switch | alineado a la derecha del diagrama (x hasta 1690), centro ≈ 87 px bajo el subtítulo y ≈ 11 px sobre la caja del árbol | `.seg { display:flex; justify-content:flex-end; gap:16px; width: <igual al .arch-stage>; margin: clamp(24px,2.5vw,48px) auto clamp(6px,.5729vw,11px) }` |
| Árbol nuevo | caja de 1462 px de ancho; alto ≈ 800 px a 1920 | ver decisión 3 |
| Cards del Taskflow | 5 columnas con gap 32 (326 px de ancho), alto 192 px, radio 16; Inicio con borde 2 px verde, Fin con borde 2 px azul; título Exo 2 400 28 px (flag 40 px, gap 16); texto Poppins 300 24 px / 36 px centrado; contenido repartido en vertical (`space-evenly`) | `.flow { list-style:none; margin:0; padding:0; display:grid; grid-template-columns: repeat(5,1fr); gap: var(--gap-s) }`; `.flow-card { height: clamp(150px,10vw,192px); padding: 0 16px; display:flex; flex-direction:column; justify-content:space-evenly; align-items:center; text-align:center; border: 2px solid transparent }`; `.flow-card p { font: 300 clamp(15px,1.25vw,24px)/1.5 "Poppins" }`; `.flow-card--start { border-color: var(--ok) }`, `.flow-card--end { border-color: var(--flow-end) }`; `.flow-title { display:inline-flex; align-items:center; gap:16px; font: 400 clamp(18px,1.4583vw,28px) var(--font-display); color:#fff }`, flag `clamp(28px,2.0833vw,40px)`. El título del `.rule-head` ya reserva 96 px sobre sí, y `.center-title` de cada tarea: `margin: clamp(32px,3.3333vw,64px) 0` (captura: 64 px a cada lado) |
| `.sr-only` | no existe en el repo | `.page-estructura .sr-only { position:absolute; width:1px; height:1px; margin:-1px; padding:0; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; border:0 }` |
| Help | 24×24 a 32 px del tope y 24 px del borde derecho de la card; `:focus-visible` outline 2 px blanco, `border-radius:50%` | ver decisión 4 |

La topbar de la captura mide ≈ 112 px (la del sitio 90 px): se mantiene la del sitio (igual que en 0004). Las cards `.t-card` de la captura miden 24 px de padding en Tarea/Conclusiones/Taskflow pero las del Taskflow-«Foco» se dejan como en Estrategia (spec: «igual a Foco»).

### Breakpoints
| Ancho | Comportamiento |
| --- | --- |
| ≥ 1301 | Layout de la captura, todo fluido con `clamp()`. |
| ≤ 1300 | Hereda el bloque movido de `.focus-row` (alto automático). `.flow-card` pasa a `height:auto; min-height:150px`. |
| ≤ 900 | `.focus-row` a 1 columna (regla movida). `.sec-header` apila y `.sec-nav` se envuelve (`elementos.css`). `.arch-stage` y `.seg` a `width:100%`. `.flow` a 3 columnas (3 + 2). Se oculta «Ver Esqueleto» (regla compartida de la topbar). |
| 641–900 | Los árboles siguen en horizontal con los mínimos de `clamp()` (11 px). Verificar que no desborden; si desbordan a 641 px, subir el corte de lista indentada a 768 px y anotarlo (decisión a confirmar con el usuario; la spec fija 640). |
| ≤ 640 | `.flow` a 1 columna. Árboles = lista indentada (la base del componente); contadores estáticos arriba del árbol; «Ver más detalles» estático abajo a la derecha. Tooltip con ancho `min(536px, 100vw - 2×gutter)` y `right: 0`. Sin scroll horizontal (`min-width:0`, `overflow-wrap:anywhere` en etiquetas). |
| 641–1100 (condicional) | Si los contadores solapan las llaves, pasan a estáticos arriba del árbol hasta ≤ 1100 px. |

## Riesgos y decisiones
- **Árboles (mayor incertidumbre):** las posiciones salen de medidas en % y em estimadas desde la captura; se calibran en el QA a 1920 px (±8 px). Si la captura tiene un trazo que el CSS no reproduce (la muesca redondeada del tronco central de cada llave), se documenta como diferencia aceptada o se agrega con un `radius` en `.tn-brace::after`.
- **Tamaño del placeholder:** la spec dice ≈ 1462 × 720, la captura mide ≈ 1462 × 760 (borde superior y = 408, inferior y = 1168). Se usa 760 (`aspect-ratio: 1462 / 760`); si el usuario confirma 720, es un valor.
- **Literales con erratas en la spec (FR-002):** «estas comprando» (sin tilde, tooltip de Tarea 2), `auto? ”` (espacio antes de la comilla de cierre, enunciado de Tarea 2) y `”Home”, ”Profile”` (comilla de cierre usada como apertura, Conclusión 3). Se transcriben tal cual; se le avisa al usuario por si prefiere corregirlas.
- **«Respuestas correctas: 7» frente a 4 nodos verdes:** los contadores cuentan usuarios (10) y los nodos coloreados son destinos distintos; el árbol no muestra cuántos usuarios eligió cada uno. No bloquea.
- **Superposición Shop/Profile (árbol nuevo):** se resuelve con `grid-area` solapado, no con posicionamiento absoluto.
- **Mover CSS compartido:** riesgo de cambiar Estrategia por el orden de cascada. Mitigación: snapshot de estilos computados de `.t-card`, `.focus-row`, `.persona h3`, `.rule-head`, `.numbox` y `.hl` en 1920/1300/900 px antes y después.
- **Poppins itálica 300:** suma un archivo de fuente a `estructura.html`; las otras páginas no cambian.
- **Sin tests (Art. III):** cada tarea lleva un check acotado más QA manual.

## Chequeo contra la constitución
| Principio | Cumple | Desviación justificada |
| --- | --- | --- |
| I — Alcance | Sí: la página, sus links y docs; sin imagen navegable, sin imágenes Antes/Después, sin pantallas de detalle (quedan como placeholders y botones sin destino). | — |
| II — Datos y servicios externos | Sí: sin scripts de terceros ni APIs; solo el `<link>` de Google Fonts ya existente. | — |
| III — Verificación | Sí: QA manual a 1920/1300/900/640 px, consola sin errores, links sin romper, tooltips y switch con mouse y teclado. | — |
| IV — Git | Sí: rama actual, Conventional Commits con archivos específicos, sin ramas ni PR. | — |
| V — Seguridad | Sí: sin secretos; sin links externos nuevos. | — |
| VI.1 Stack/`file://` | Sí: HTML/CSS/JS vanilla, rutas relativas. | — |
| VI.2 Idioma | Sí: español rioplatense, `lang="es"`. | — |
| VI.3 Estilos | Sí: hoja propia `estructura.css` acotada con `page-estructura`; dorado y card con tokens (`--gold-t`, `--card-bg`). | Colores `#5cd633`, `#e75149`, `#679be2`, `#0a5bd6`, `#212121`, `#9aa0ad`: literales del diseño sin token en `:root`, declarados como variables locales (precedente: `.capas-menu`, `.btn-info`, `.btn-blue`). |
| VI.4 Medidas | Sí: 1920 px → `clamp()`. | Tooltip 536 px/16 px y botones de 48/40 px en px fijos (medidas confirmadas por el usuario, sistema de botones). |
| VI.5 Reglas visuales | Sí: cards con `var(--card)` (= `--card-bg`); botones `btn--sm`/`btn--md`; placeholders con `.media-placeholder[data-label]`. | — |
| VI.6 Tipografía | Sí: Exo 2 (árboles, títulos), Poppins (cuerpo, tooltips), Inter (botones). | — |
| VI.7 Páginas internas | Sí: topbar con breadcrumb, `.layer-sec` con `id`, «Ir a…» por anclas, cierre con tarjetas de proceso. | — |
| VI.8 Media | N/A: no hay videos. | — |
| VI.9 Accesibilidad | Sí: `alt=""` en decorativas, `aria-label` en help y árboles, `aria-expanded`/`aria-controls`/`aria-pressed`, texto oculto para correcta/incorrecta, foco visible, Escape. | — |
