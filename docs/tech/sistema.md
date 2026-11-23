# Sistema

## Ejecución

- Abrir `index.html` en un navegador; no hace falta servidor ([README](../../README.md#cómo-ver-la-página)). Todas las rutas son relativas (`assets/...`), así que funciona desde `file://` o desde cualquier hosting estático.
- No hay `package.json`, bundler, transpilación, tests, linter ni CI.
- `.gitattributes` define `* text=auto` (normaliza los finales de línea a LF en Git).
- El destino de publicación (hosting) no está documentado en el repo.

## Estructura

```
index.html          Home del case study (único que carga script.js)
5-elementos.html    Explicación del modelo de 5 capas
estrategia.html     Capa 1: Estrategia
alcance.html        Capa 2: Alcance (Matriz FVD)
estructura.html     Capa 3: Estructura (tree testing, arquitectura nueva, taskflow)
styles.css          Base común: tokens, layout, componentes, responsive
elementos.css       Páginas internas (body.page-elementos): topbar, breadcrumb, capas, cards y estilos compartidos de Estrategia/Alcance
estrategia.css      Específico de body.page-estrategia
alcance.css         Específico de body.page-alcance (matriz, ejes, cuadrantes)
estructura.css      Específico de body.page-estructura (árboles, tooltips, switch, taskflow)
estructura-tarea-1.html  Detalle de la Tarea 1 del tree testing
estructura-tarea-2.html  Detalle de la Tarea 2 (misma plantilla, assets en assets/tarea-2/)
estructura-tarea.css     Específico de body.page-tarea (detalles de tareas)
esqueleto.html      Capa 4: Esqueleto (wireframes en media)
esqueleto.css       Específico de body.page-esqueleto
superficie.html     Capa 5: Superficie (UX Writing y Sistema de Diseño)
superficie.css      Específico de body.page-superficie
superficie.js       Ciclo de estilos de «Cambiar estilo» (Botones)
script.js           Comportamiento del Home
menu-capas.js       Menú desplegable de capas de la topbar (estrategia, alcance y estructura)
estructura.js       Tooltips de ayuda, switch Antes/Después y botones sin destino de estructura.html
assets/             Imágenes, íconos SVG, videos MP4 (≈85 archivos)
```

Orden de carga de CSS en las páginas internas: `styles.css` → `elementos.css` → (`estrategia.css` | `alcance.css` | `estructura.css`). Cada página tiene una clase en `body` (`page-elementos`, `page-estrategia`, `page-alcance`, `page-estructura`) para acotar los estilos.

**Estilos compartidos (spec 0004):** se movieron de `estrategia.css` a `elementos.css` (sección «Compartido por las páginas de capa», antes de «Responsive») para que Alcance los reutilice sin duplicar: variables `--fs-body`, `--fs-h3`, `--gap-s`, `--card` (selector `.page-estrategia, .page-alcance`), `.page-elementos .topbar-action` y `.btn-blue` (con hover), `.center-title`, el bloque «Siguiente elemento UX» (`.next`, `.next-row`, `.next-col`, `.next .also`, `.next .proceso-card`, `.next .proceso-grid`) y, en el `@media (max-width: 900px)`, ocultar `.topbar-action` y apilar `.next-row`. `.center-title.md` y `.hl` siguen en `estrategia.css`.

## Sistema de estilos (`styles.css`)

- **Tokens** en `:root`: `--bg #04020d`, `--panel #0a1428`, `--card-bg rgba(0,0,0,.6)`, `--panel-border`, `--orange #fc8738` / `--orange-dark`, `--gold #e2b04a`, `--blue #3b82f6`, `--text-hi/mid/dim`, `--font-display` (Exo 2), `--font-body` (Poppins), `--container-w 1920px`, `--side-pad clamp(24px, 4.1667vw, 80px)`.
- **Escalado**: las medidas salen de un diseño a 1920 px y se convierten con `clamp(min, Xvw, max)`.
- **Fondo fijo**: una capa con `position: fixed` en lugar de `background-attachment: fixed`, para que funcione en iOS (comentario en `styles.css`).
- **Breakpoints**: `max-width: 1300px` (estrategia), `900px` (styles, elementos y estrategia), `640px` (styles, alcance: apila la matriz; estructura: árboles en lista indentada, que pasan a SVG con `@media (min-width: 641px)`) y `hover: none` (tarjetas en táctil).
- **Botones**: clases `btn`, `btn--sm`, `btn--md`, `btn-primary` (naranja), `btn-info`, `btn-outline-info` (sin fondo, borde 2 px `#679be2`; «Ver más detalles»), `btn-ghost-info` (igual, sin borde; «Saltar a Sistema de Diseño»), `btn-blue`, `btn-source`; las medidas están en el README.
- **Placeholders**: `.media-placeholder[data-label]` dibuja un recuadro punteado con el nombre del asset esperado. Variantes de proporción: `ar-tall`, `ar-short`, `ar-cart`.

## Comportamiento (`script.js`)

1. **Tarjetas de Proceso** (`.proceso-card`): el listener solo hace `console.log` con `data-step`. La navegación a las 5 capas sale de `onclick="location.href='…'"` inline en `index.html`.
2. **Videos bajo demanda**: un `IntersectionObserver` (threshold 0.25) reproduce `video.screenshot` y `video.stat-video` al entrar en pantalla y los pausa al salir. Esos videos usan `muted loop playsinline preload="none"`. Si no hay `IntersectionObserver`, se activa autoplay. El video del hero usa `autoplay` directamente.

`5-elementos.html` no carga JS y `estrategia.html` y `alcance.html` solo cargan `menu-capas.js` (`estructura.html` suma `estructura.js`): la navegación es por anclas (`#estrategia`, `#encuestas`, …) con `scroll-margin-top`.

### Menú de capas (`menu-capas.js`, specs 0003 y 0004)

Se usa en `estrategia.html` (Alcance habilitado, `href="alcance.html"`) y en `alcance.html` (Estrategia habilitada; el disparador dice «Alcance» y esa capa no figura en el menú). Una instancia por página.

- **Marcado reutilizable**: `div.topbar-capas.breadcrumb-capas[data-capas]`, dentro de `nav.breadcrumb` (reemplaza al `span.current`), agrupa `button.capas-trigger.current[data-capas-trigger]` (`aria-current="page"`, `aria-expanded`, `aria-controls="capas-menu"`) y `div.capas-menu[role=group][data-capas-menu][hidden]` con una lista de `a.capas-item`. El menú se ancla con `left: 0` bajo la palabra; `.breadcrumb .capas-item` neutraliza el gap y el hover de `.breadcrumb a`. Patrón disclosure, no `role="menu"`. El título central sigue siendo `<h1 class="topbar-title">Estrategia</h1>`, sin cambios.
- **Ítems deshabilitados**: `<a role="link" aria-disabled="true">` sin `href` (no reciben foco ni navegan, opacidad .4). Para habilitar uno: agregar `href` y quitar `role` y `aria-disabled`. La capa actual no figura en su propio menú.
- **JS**: IIFE sin dependencias; click en el botón alterna `aria-expanded` y `hidden`; click en `document` fuera de `[data-capas]` y Escape cierran (Escape devuelve el foco al botón). Inerte si faltan los nodos. Una instancia por página.
- **Estilos** `.capas-*` en `elementos.css` (antes de «Intro»). Los chevrons (`assets/ico-chevron-down.svg` / `-up.svg`, 12x12) se alternan por CSS según `aria-expanded`. Colores literales del diseño de referencia (`#212121`, `#B7B7BA`, `#FFFFFF`). Requiere Inter 400 en el link de Google Fonts.

### Página de Alcance (`alcance.html` + `alcance.css`, spec 0004)

- `body.page-elementos.page-alcance`; una sección `.layer-sec.matriz` con `.matriz-grid`: grilla CSS 2×2 (`grid-template-areas: ". q3 q1" ". q4 q2"`, columnas `var(--gut) minmax(0,1fr) minmax(0,1.2fr)`) con 4 `.cuadrante` hermanos directos, en orden 1-2-3-4 en el DOM (la posición sale de `grid-area`, así el apilado mobile no reordena). Cada cuadrante es un `role="group"` con `aria-label`; los ejes y `.q-head` van `aria-hidden`.
- Ejes (`.eje--y`, `.eje--x`) y divisores punteados (`.matriz-grid::before` y `background` de `.cuadrante--2/--4`) son CSS puro; variables locales `--gut`, `--cgap`, `--num-w`, `--qgap`, `--ex`, `--ah-w/--ah-h` en `.matriz-grid`. Los números (`.q-num`, Inter 400, 128 px a 1920 px) son absolutos detrás de las tarjetas; sus desplazamientos son valores de partida a calibrar contra la captura.
- Leyenda: `assets/ico-star.svg` a 24×24 px fijos con `gap: 24px`. El «1.» lleva una estrella propia más grande (`.q-star`).
- ≤ 640 px (`@media` en `alcance.css`): `.matriz-grid` pasa a bloque, se ocultan ejes y divisores, `.q-head` queda estático y aparece `.q-leyenda` con el significado del cuadrante.
- `assets/ico-estructura-white.svg` es `icon-estructura.svg` con `fill="#FFFFFF"` (ícono de «Ver Estructura»).
- Fuente de las medidas: `specs/0004-pagina-alcance/referencia-figma.webp` (1410 px; ×1,362 a 1920).

**Estilos compartidos (spec 0005):** para que Estructura reutilice las cards de Estrategia se movieron de `estrategia.css` a `elementos.css`, literales y en el mismo orden relativo: `.hl` (ahora `.page-elementos .hl`; ninguna otra página interna usa `.hl`), `.rule-head*`, `.t-card*`, `.focus-row`, `.persona*` (salvo `.persona .flag-ph`, que sigue en `estrategia.css`), `.numbox`, el bloque de alturas de `.focus-row` y, en el `@media (max-width: 900px)`, `.focus-row { grid-template-columns: 1fr; }`. `.page-estructura` se sumó al selector de variables de página.

### Página de Estructura (`estructura.html` + `estructura.css` + `estructura.js`, spec 0005)

- Secciones `.layer-sec` con `id` `arquitectura-actual`, `tree-testing`, `arquitectura-nueva`, `taskflow` y `.next`. La página no tiene placeholders.
- **Arquitectura Actual navegable (spec 0006):**
  - `div.arch-stage.nav-shot[data-nav-shot]` contiene la captura `img[data-nav-shot-img]` (1920 × 998) y dos grupos `.nav-hotspots[data-layout="racing"|"shop"]`.
  - Las zonas son `button.hotspot[data-shot]` transparentes, ubicadas con `--x/--y/--w/--h` en % de la captura, con `aria-label` y foco visible solo con teclado.
  - `estructura.js` tiene un mapa `id → [nombre, menú]`. Al hacer click cambia `src`/`alt`, muestra el grupo del menú correspondiente, marca `aria-current` y, si cambió de menú, pasa el foco a la zona equivalente.
  - **Capturas:** `assets/arquitectura-actual/*.jpg`, 14 archivos de 1920 × 998 a calidad 85 (~3,2 MB en total), recortados de las capturas del usuario (sin la barra de título ni la barra de tareas de Windows).
  - **Para sumar una sección:** agregar el JPG, la entrada del mapa y su botón.
  - **Indicación:** `.nav-hint` («Click aquí 👉») va a la izquierda de la captura y se oculta en ≤ 900 px.
- **Árboles (corrección del QA):** en ≥ 641 px se muestran los SVG exportados de Figma con el texto convertido en curvas: `assets/tree-tarea-1.svg`, `assets/tree-tarea-2.svg` (1760 × 840), `assets/arquitectura-nueva.svg` y `assets/arquitectura-vieja.svg`. A los dos de arquitectura se les recortó el `viewBox` (`0 46 …`) para quitar el selector Antes/Después que traían dibujado. Son `img.tree-img` con `alt=""`. El contenido accesible y la vista ≤ 640 px son las listas `<ul>` anidadas (`.tree`, `tn-*`, `is-ok`/`is-bad` + `.sr-only`), visualmente ocultas en ≥ 641 px. Los contadores de respuestas van arriba del diagrama y «Ver más detalles» queda absoluto abajo a la derecha.
- **Tooltips (HU3):** patrón disclosure. `button.help[aria-expanded][aria-controls]` abre un `div.tip[hidden]` posicionado en absoluto respecto de la card (16 px bajo el ícono, borde derecho alineado). Medidas: `#212121`, radio 16, padding 16, ancho `min(536px, …)`, Poppins 16. Se cierra con otro click, abriendo el otro, con un click afuera o con Escape (el foco vuelve al botón).
- **Switch Antes/Después:** dos `button.seg-btn[aria-pressed][aria-controls]` alternan `hidden` en los paneles `#arq-antes` / `#arq-despues`. «Después» es el panel por defecto; cada panel tiene su SVG y su lista.
- **Sin destino (patrón):** los botones sin página usan `<a href="#…" data-sin-destino aria-disabled="true">` y `estructura.js` hace `preventDefault` para que no salten al tope. En 0005 eran «Ver más detalles» y «Ver Esqueleto»; hoy ya tienen destino.
- Fuente de las medidas: `specs/0005-pagina-estructura/referencia-figma.jpg` (1920 × 8437, escala 1:1).
### Detalle de la Tarea 1 (`estructura-tarea-1.html` + `estructura-tarea.css`, spec 0007)

- `body.page-elementos.page-tarea`. Carga `menu-capas.js` y `estructura.js`, que está protegido ante nodos ausentes; aquí solo actúa su manejador de `[data-sin-destino]`.
- **Breadcrumb de 3 niveles:** el disparador del menú de capas («Estructura») no lleva `current` ni `aria-current`, y `.page-tarea` lo muestra gris y en 400. El menú incluye Estructura habilitada. La página actual es `span.current[aria-current=page]` «Tarea 1», precedida por `.sep.sep--tarea`, que no se oculta en mobile. La flecha y «Rediseño UX/UI» son dos enlaces separados (corrección del usuario): la flecha (`a.crumb-back`, `aria-label` «Volver a Estructura») vuelve a la página padre, `estructura.html#tree-testing`, y el texto (`a.crumb-home`) va al Home. En ≤ 900 px `a.crumb-home` se oculta. En las páginas de capa la flecha sigue yendo al Home, que es su padre.
- **Grillas** `.tarea-grid--stats` (850fr / 878fr) y `.tarea-grid--pietree` (1fr / 565px). En ≤ 900 px pasan a una columna; en ≤ 640 px las capturas de estadísticas también.
- **Capturas** de UXtweak del usuario en `assets/tarea-1/`: `success.png`, `directness.png`, `torta-resultados.png`, `tabla-resultados.png` y `pietree.png`. Tienen `alt` con los datos.
- **Íconos:**
  - `ico-exito-directo.svg`, `ico-exito-indirecto.svg`, `ico-fallo-directo.svg` e `ico-fallo-indirecto.svg`, del usuario;
  - `ico-pietree-*.svg`: el ícono de leyenda del usuario, recoloreado con los colores medidos en la referencia (`#C2DFA0`, `#F44336`, `#FF9800`, `#2962FF`, `#FDD835`, `#9E9E9E`).
- En `estructura.html`, «Ver más detalles» de la Tarea 1 apunta a esta página.
- **Tarea 2 (spec 0008):** `estructura-tarea-2.html` es la misma plantilla con los textos, los `alt` y el SEO de la Tarea 2, y sus capturas en `assets/tarea-2/`. Si cambia la plantilla, hay que replicar el cambio a mano en las dos páginas.
### Página de Esqueleto (`esqueleto.html` + `esqueleto.css`, spec 0009)

- `body.page-elementos.page-esqueleto`. Hereda las variables de página (se sumó `.page-esqueleto` al selector de `elementos.css`), `.rule-head` y `.next`. Carga `menu-capas.js` y `estructura.js`; de este último solo usa el manejador de «Ver Superficie», que no tiene destino.
- Una sección `#wireframes` con 4 bloques: `h3.rule-head` (con `id`) y `figure.wf`, que contiene `img.wf-img` y `figcaption > ul.wf-notes`. Ancho de 1162 px a 1920 (`clamp`), 100 % en ≤ 900 px. Las imágenes usan `loading="lazy"` y llevan `alt` descriptivo.
- **Assets:**
  - wireframes del usuario en `assets/esqueleto/`: `lista-series.png`, `detalles-serie.png`, `calendario-serie.png` y `seccion-autos.png`;
  - íconos nuevos `ico-calendario.svg` e `ico-auto.svg`;
  - se reutilizan `ico-lista.svg` e `ico-detalles-serie.svg`;
  - `ico-superficie-white.svg` es `icon-superficie.svg` en blanco.
- **Links activados:** la opción Esqueleto del menú de capas de todas las páginas, «Ver Esqueleto» (Estructura y detalles de tareas), las tarjetas Esqueleto de «Siguiente elemento UX» (Estrategia, Alcance y Estructura), la tarjeta del Home (`onclick`) y, en 5-elementos, «Ver Esqueleto» y su tarjeta.
### Página de Superficie (`superficie.html` + `superficie.css`, spec 0010, parte UX Writing)

- `body.page-elementos.page-superficie`. Usa las variables de página de `elementos.css`. Carga `menu-capas.js` y `estructura.js`; de este último usa el manejador `[data-sin-destino]`, que desde la spec 0020 cubre «Leer guión completo» (`#guion`, página futura) y los tres «Ver cuestionario» (`#cuestionario-1..3`); «Ir a Iteraciones» e «Ir a Prototipo» ya tienen destino. «Ir a Motion» se reemplazó por «Ir a Pruebas de Usabilidad» (la sección Motion se descartó). «Saltar a Sistema de Diseño» (`a.btn.btn--md.btn-ghost-info`: mismo hover que «Ver más detalles», sin borde) e «Ir a Valores» ya son anclas normales.
- **«Ver Prototipo»:** `a.topbar-action` con `target="_blank" rel="noopener"` hacia el prototipo de Figma, `assets/ico-play.svg` y texto `.sr-only` que avisa que se abre en una pestaña nueva.
- **Círculo de Oro:** `.oro[data-activo]` con 3 `span.oro-ring` concéntricos de CSS (565, 420 y 249 px a 1920), apilados con ¿Por qué? arriba, ¿Cómo? en el medio y ¿Qué? abajo. Usan los colores de los PNG del usuario: activo `rgba(0, 87, 208, .15)` e inactivo `rgba(0, 0, 0, .6)`. Como son semitransparentes, el círculo de abajo se ve a través del de arriba. La etiqueta activa va en dorado. Los párrafos son Poppins 300 itálica de 24 px, y las frases doradas, Poppins 600 itálica (cargada en el link de fuentes). Es `aria-hidden`, porque el texto lo explica.
- **Matriz de Voz y Guía de Estilo:** `table.mtx` semánticas (`th scope`) con encabezados de tarjeta (`.mtx-card`). En ≤ 900 px pasan a bloques y cada celda muestra `data-col` con `::before`.
- **Matriz de Tono:** `assets/matriz-tono.svg` son los vectores del usuario (lienzo de 1666 × 640). Las cajas son `ol.tono-pasos > li` en orden de la trayectoria, posicionadas con `--x/--y` en % del lienzo. En ≤ 640 px se ocultan los vectores y aparece `.tono-nivel` con el tono de cada paso.
- **Links activados:** la opción Superficie del menú de capas de todas las páginas, «Ver Superficie» de Esqueleto, las tarjetas de Superficie, la tarjeta del Home (`onclick`) y, en 5-elementos, «Ir a Superficie» y su tarjeta. Ya no quedan `href="#"` sueltos en el sitio.
- **Sistema de Diseño (spec 0011):** `section.ux-hero.sd-hero#sistema-de-diseno` reutiliza el estilo del título «UX Writing». «Volver a UX Writing» apunta a `#ux-writing`. Las subsecciones son `#valores`, `#principios`, `#colores` y `#tipografia`, cada una con un `sec-header` de dos botones Ir a.
  - Valores: `ul.sd-valores` (grid de 3).
  - Principios: `ul.sd-principios`; cada `li` es una grilla de tarjeta `h3.mtx-card` (316 px a 1920) más el párrafo. Íconos: `ico-check-gold.svg` (es `ico-check-green.svg` en dorado), `ico-lampara.svg`, `ico-escalera.svg` e `ico-chart-up.svg`.
  - Colores: `.sd-color` por grupo, con `ul.sw-grid--6` o `--5`. Cada muestra toma su color de `style="--c:…"`. Los estados usan `.sw-est` con un `::before` negro (sobre gris) o blanco (sobre azul) a `--op` %; en Pressed la capa es una píldora a doble opacidad.
  - Tipografía: `table.sd-tipo` (`th scope="row"` con clase `.tp--*` que aplica el estilo real; Inter 500 se sumó al link de fuentes). Los ejemplos son los PNG del usuario en `assets/sistema-diseno/` a tamaño natural, salvo Texto y los dos títulos, que son texto vivo. En ≤ 900 px pasa a bloques con `data-col`.
  - Imágenes (spec 0012): `ul.sd-imgs` de 4 columnas (2 en ≤ 900 px). Los PNG traen margen transparente de sombra, así que cada `li` es la tarjeta visible (`aspect-ratio: 408/230`) y la imagen va en absoluto con `--w`/`--l`/`--t` inline, calculados de su recuadro opaco. Debajo, `img.sd-track` (`assets/sistema-diseno/track.svg`, 1162 × 443, ≈1,1 MB, `loading="lazy"`).
  - Layout (spec 0012): `figure.sd-layout` con `tabindex="0"` y dos `img` apiladas en la misma celda de grid. `:hover` y `:focus` hacen un fundido de opacidad de `.sd-layout-def` a `.sd-layout-hov` (sin transición con `prefers-reduced-motion`). En táctil, el toque enfoca la figura y muestra el estado hover; tocar fuera lo revierte. No usa JS.
  - Componentes / Iconografía (spec 0013): `h3.rule-head#iconografia` (patrón de `elementos.css`, ícono `assets/ico-flags-gold.svg`). `div.sd-iconos` lleva `role="img"` y un `aria-label` que describe el set; los 68 `img` de `assets/iconografia/iconografiaNN.svg` son `alt=""`. Grid de 34 columnas de 20 px a 1920 (`justify-content: space-between`) y `auto-fill` en ≤ 1500 px; borde punteado `#9747ff`. `.sd-ico-demo` en 2 columnas (1 en ≤ 640 px) con `assets/ico-trofeo-gold.svg` a 48 px y a 16/20/24 px.
  - Componentes / Botones (spec 0014): `h3.rule-head#botones`. Las filas `ul.sd-bt-fila` tienen 3 columnas (ancho máx. 864 px, celdas a inicio, centro y fin) y pasan a 1 columna en ≤ 640 px. Los botones viejos son PNG en `assets/sistema-diseno/boton-viejo-*.png`.
    - Los nuevos son `button.bt`: el tamaño va en `.bt--48/40/32` y el estilo en `.bt--primario/secundario/compras/borde/texto`. Cada estilo define variables (`--bg`, `--bg-h`, `--bg-p`, `--fg`, `--bd`) para default, `:hover`, `:active` y `:focus-visible`. Los botones no navegan.
    - Los íconos de los botones son SVG en línea con `currentColor`. No se usa `mask-image` porque Chrome lo bloquea desde `file://`.
    - `superficie.js` (nuevo, `defer`) cicla las clases de estilo de los `[data-cambiar-estilo]` y anuncia el estilo nuevo en `#bt-estado` (`aria-live`).
  - Componentes / Dropdowns y listas (spec 0015): `h3.rule-head#dropdowns` con `ico-lista.svg`. `ul.sd-dd-set` es un recuadro punteado con los 4 PNG de dropdown (`assets/sistema-diseno/dropdown-*.png`, 278 × 32). Al lado va `lista-opciones.png`, que ya trae su propio borde. Los dos van en un flex centrado y se apilan al envolver.
  - Componentes / Cards (spec 0015): `h3.rule-head#cards` con `ico-card-gold.svg`. Ese ícono es un rectángulo dorado dibujado según la referencia, porque no se pasó archivo.
    - `ul.sd-cards`: grid de 4 columnas (2 en ≤ 900 px, 1 en ≤ 640 px).
    - `.sd-card` es la card visible (`aspect-ratio: 416/235`, radio 8, `overflow: hidden`). Cada PNG trae margen de sombra, así que se desborda con `--w`/`--l`/`--t`.
    - Hover y foco: `tabindex="0"` y un `::after` con `box-shadow` interno de 2 px en `--oc` (#0159CF, o #FF8533 en `.sd-card--compra`). No navegan.
    - Carrusel: solo CSS, 12 s por vuelta, 3 s por imagen con un fundido de 0,4 s. Usa `animation-delay` de 0, 3, 6 y 9 s; con `prefers-reduced-motion` queda fija la primera imagen.
    - Compra: el triángulo `.sd-card-esquina` es de 56 px con `clip-path`, y el carrito, un SVG en línea #1E1E27 de 16 px a 8/8 px del borde. `.sd-card-tag` (#FFB685, radio 4, padding 4, gap 4, Inter 12 500) aparece con hover o foco.
    - Detalles de auto (spec 0016): `div.sd-detalles` debajo de `ul.sd-cards`. `ul.sd-detalles-fila` es un grid de 2 columnas de hasta 580 px con gap 32 (16 en ≤ 900 px, 1 columna en ≤ 640 px). Cada `li.sd-detalle` (`role="img"`, `aspect-ratio: 580/326`, radio 8) apila sus imágenes `assets/sistema-diseno/detalle-bmw-1..5.png` o `detalle-ferrari-1..4.png`. La rotación es solo CSS: Ferrari reutiliza `sd-carrusel` (12 s) y BMW usa `sd-rotar5` (15 s), 3 s por imagen. Sin hover ni foco; con `prefers-reduced-motion` queda fija la primera imagen.
  - Componentes / Logos y licencias (spec 0017): `h3.rule-head#logos` con `ico-license-gold.svg`.
    - Dos `ul.sd-logos`: grid de 10 columnas de hasta 84 px con `justify-content: space-between` (5 columnas en ≤ 900 px; los logos se achican en proporción). El `margin-top` del primero (58 px a 1920) se colapsa con el `margin-bottom` del encabezado; entre filas hay 71 px. Logos en `assets/logos/serie-*.png` (84 × 84, `alt` con el nombre).
    - `ul.sd-marcas`: flex centrado con `flex-wrap`, gap de 101 px a 1920; `assets/logos/marca-*.png` a 48 px de alto y ancho natural.
    - `ul.sd-licencias`: 5 `li.sd-lic` en HTML y CSS, no imágenes. El ícono es `ico-auto.svg` copiado una vez como `<symbol id="ico-auto">` (en un `svg.sr-only`) y usado con `<use>` y `currentColor`, a 32 px. Letra Inter 600 24 px con «Licencia» en `.sr-only` delante. 48 px de alto, padding 8/16, gap 16, radio 8. El borde de 2 px va por fuera, como un stroke «outside» de Figma: es un `box-shadow` externo, así que no cambia el tamaño de la caja. Colores por variables `--fg/--bg/--bd` en `.sd-lic--r/d/c/b/a`.
  - Pruebas de Usabilidad (spec 0018): `section#pruebas-de-usabilidad` después de Componentes, con clases `.pu-*` en `superficie.css`.
    - `h3.rule-head.pu-head` lleva el enlace «Leer guión completo» después de la línea: el `::after` y el enlace usan `order`, y el encabezado hace `flex-wrap`.
    - `.pu-par`: grid de 2 columnas con gap 32 (1 en ≤ 900 px). `.pu-card` usa `var(--card-bg)`, radio 16 y padding 24, y las dos cards de cada par se estiran a la misma altura (`align-items: stretch`); `.pu-card-head` pone título y botones en un flex con `flex-wrap`.
    - Botones: `btn btn--md btn-primary` para «Intentar en prototipo» y «Ver video» (`target="_blank" rel="noopener"` con aviso en `.sr-only`) y `btn-outline-info` para «Ver cuestionario».
    - `.pu-items`: cada `li` es un flex centrado con gap 16 y el texto envuelto en un `span` (si no, cada fragmento y cada `.hl` serían columnas). Texto Poppins 300 a 24 px (`clamp(16px, 1,25vw, 24px)`) en las cards de usuario y a 20/40 px en las dos cards de Insights (`.pu-par .pu-items li`). Los íconos de 32 px son `::before` con `background-image` (`ico-check-green`, `ico-cross-red` y `ico-lupa-green`, esta última creada recoloreando `ico-lupa.svg`). El significado se anuncia con texto en `.sr-only` («Funcionó:», «Problema:», «Sugerencia:»).
    - `.pu-conclusion`: frase entre dos `ico-mano-gold.svg`; la segunda va espejada con `scaleX(-1)`. La card «Filtros» (`.pu-card--texto`) usa Poppins 300 24/40 y `.hl` en 400. Los pulgares de `.pu-balance` miden 40 px; el de abajo es `ico-thumb-down-red.svg` (#E75149), una copia recoloreada para no cambiar el original que usa estrategia.html. Íconos nuevos: `ico-mano-gold`, `ico-filtro-gold` e `ico-objetivos-gold`.
  - Iteraciones (spec 0019): `section#iteraciones` después de Pruebas de Usabilidad, con clases `.it-*`.
    - `.it-solucion`: grid `1163fr 550fr` con gap 32 y `align-items: center`; el gif es un `.media-placeholder.it-gif` (`aspect-ratio: 1163/797`). `.it-texto` es un flex en columna con gap 72 (`clamp(32px, 3,75vw, 72px)`), igual que `.it-bullets`: título Exo 2 400 36 px y bullets Exo 2 400 24 px.
    - `.it-comparar`: grid de 2 columnas con gap 32; cada `figure` lleva `figcaption` «Antes»/«Después» (Exo 2 400 36 px, a 56 px de la imagen) y un `.media-placeholder.it-captura` (`aspect-ratio: 864/605`).
    - `img.it-anotada`: `assets/iteraciones/diferencias-all-series.svg` (1674 × 805, 624 KB) con `alt` que resume sus indicaciones, a 56 px de las imágenes de arriba. Los textos son trazos y la captura es un PNG embebido de 1440 × 992, así que no depende de fuentes.
    - Los «Probar…» van al final de la línea del encabezado con el patrón `.pu-head` / `.pu-head-link` de Pruebas de Usabilidad y abren en otra pestaña.
    - En ≤ 900 px, `.it-solucion` y `.it-comparar` pasan a una columna.
  - Prototipo (spec 0020): `section#prototipo`, la última de la página, con solo «Ir a Iteraciones». Tres bloques (`#proto-license-progress`, `#proto-encontrar-carrera`, `#proto-carrito`) que reutilizan `.it-solucion` / `.it-texto` / `.it-bullets` de Iteraciones: imagen provisoria `.media-placeholder.it-gif`, texto a 32 px y 72 px entre título, bullets y «Abrir prototipo» (`target="_blank"`). Única diferencia: `#prototipo .it-texto` toma el ancho de su contenido (`fit-content`) y centra el subtítulo y el botón respecto de los bullets. Íconos: `ico-license-gold`, `ico-lupa` e `ico-cart`.
  - Fin del proyecto (spec 0021): `section.fin#fin-del-proyecto`, después de Prototipo. `h2.fin-titulo` (Exo 2 400 64) con dos `ico-flag-checkered.svg` de 48 px a 90 px; `p.fin-gracias` (Exo 2 300 48) a 160 px; `ul.fin-contacto` a 96 px (flex space-between; ícono de 40 px a 16 px de texto Poppins 300 24): LinkedIn y Behance como enlaces `target="_blank" rel="noopener"`, correo y teléfono como texto, con la red en `.sr-only`. `ico-linkedin.png` e `ico-behance.png` traen 5 px de sombra: `.fin-ico--sombra` los muestra a 50 px con `margin: -5px`. A 160 px, `nav.proceso-grid.fin-capas` con las 5 `a.proceso-card` (la de Superficie con `aria-current="page"`). En ≤ 900 px los contactos van en 2 columnas y en ≤ 640 px en 1.
  - Responsive: en ≤ 900 px, Valores en una columna y muestras de a 3; en ≤ 640 px, Principios apilado y muestras de a 2.

## Integraciones externas (solo enlaces)

| Servicio | Uso | Dónde |
|---|---|---|
| Google Fonts | Exo 2, Poppins, Inter | `<head>` de cada HTML |
| Google Sheets | Fuente de los testimonios («Ver fuente») | `index.html` |
| Figma | Prototipo («Probar prototipo», «Ver Prototipo») | `index.html`, `superficie.html` |
| LinkedIn y Behance | Perfiles del autor (cierre «Fin del proyecto») | `superficie.html` |
| Twitch / globalracingleague.com | Canales de contacto de las encuestas | `estrategia.html` |

No hay llamadas a APIs, autenticación, almacenamiento ni analítica.

## Accesibilidad observada

- `lang="es"`, `alt` en las imágenes de contenido y `alt=""` en las decorativas; los videos tienen `aria-label`; el breadcrumb tiene `aria-label`.
- Las tarjetas de proceso del Home son `<button>` con navegación inline; en las páginas internas son `<a>`.

## Diferencias con el README

El [README](../../README.md) está desactualizado respecto del código:
- Dice que las 6 comparativas y los 3 stats son placeholders; `index.html` ya usa videos `.mp4`.
- Dice que `assets/` está vacía; tiene unos 85 archivos.
- Dice que `script.js` solo maneja las tarjetas; también maneja la reproducción de videos.
- Habla de «Ver fuentes»; el botón dice «Ver fuente».

## Assets sin referencia

Ningún HTML, CSS o JS los usa: `iRacing logo.png`, `Make.png`, `Photoshop.png`, `UX Tweak.png` (duplicados de `iracing-logo.png` / `icon-*.png`) y `lista-carreras-antes.gif` / `lista-carreras-despues.gif` (~21 MB, reemplazados por `.mp4`). El asset más pesado en uso es `hero-background.mp4` (~19 MB).

## Pendientes técnicos observados

- Superficie: imágenes y gif finales de Iteraciones y Prototipo, páginas de guión completo y cuestionarios.
- 19 `media-placeholder` en `estrategia.html`.
- Typos en el contenido: «Evauaciones» (`5-elementos.html`), «par el usuario» (`index.html`, `estrategia.html`), «James Garret» en lugar de «Garrett» en el subtítulo de «Proceso de Diseño» de `index.html` (el `title` y el `h1` de `5-elementos.html` ya se corrigieron).

## SEO y descubrimiento (spec 0001)

Metadatos no visibles en el `<head>` de las 3 páginas y un `llms.txt` en la raíz. No cambian el body, las clases, los estilos ni los assets; funcionan igual desde `file://`.

**Plantilla del `<head>`** (insertada entre `<title>` y el primer `preconnect`, mismo orden en las 3 páginas): `meta description`, `robots` (`index, follow`), Open Graph (`og:type` website, `og:title`, `og:description`, `og:site_name`, `og:locale` `es_AR`) y Twitter Card (`summary`, título y description), más un `<script type="application/ld+json">`. `title`, `og:title` y `twitter:title` son el mismo texto; ídem la description (≤ 160 caracteres).

| Página | `title` | JSON-LD |
|---|---|---|
| `index.html` | `iRacing — Rediseño UX/UI · Franco Aguirre` | `["WebPage","CreativeWork"]`, `genre`, `keywords`, breadcrumb de 1 ítem |
| `5-elementos.html` | `5 Elementos UX de James Garrett — iRacing` | `WebPage` con `isPartOf` y breadcrumb de 2 niveles |
| `estrategia.html` | `Estrategia — Rediseño iRacing` | `WebPage` con `isPartOf` y breadcrumb de 2 niveles |
| `alcance.html` | `Alcance — Rediseño iRacing` | `WebPage` con `isPartOf` y breadcrumb de 2 niveles |
| `estructura.html` | `Estructura — Rediseño iRacing` | `WebPage` con `isPartOf` y breadcrumb de 2 niveles |
| `estructura-tarea-1.html` | `Tarea 1: resultados del tree testing — Rediseño iRacing` | `WebPage` con `isPartOf` y breadcrumb de 3 niveles |
| `estructura-tarea-2.html` | `Tarea 2: resultados del tree testing — Rediseño iRacing` | `WebPage` con `isPartOf` y breadcrumb de 3 niveles |
| `esqueleto.html` | `Esqueleto — Rediseño iRacing` | `WebPage` con `isPartOf` y breadcrumb de 2 niveles |
| `superficie.html` | `Superficie — Rediseño iRacing` | `WebPage` con `isPartOf` y breadcrumb de 2 niveles |

Campos comunes del JSON-LD: `name`, `description`, `inLanguage: "es"`, `dateCreated: "2025"`, `author` (Person Franco Aguirre, Diseñador UX/UI) y `about` (iRacing, Diseño UX/UI). Sin `url`, `image` ni `sameAs`.

**Decisión sobre `item` relativo:** el breadcrumb de las páginas internas usa `"item": "index.html"` (no hay URL absoluta). Todavía no se validó con el Rich Results Test / Schema Markup Validator; si lo rechaza, omitir `item` y dejar `name` y `position` (se pierde el enlace, no la jerarquía), y anotarlo acá.

**`llms.txt`** (raíz, UTF-8 sin BOM, formato llmstxt.org, enlaces relativos salvo el prototipo de Figma): resumen, problema, objetivos, proceso, las 6 comparativas, estado de las páginas y enlaces. Solo incluye lo que dice el sitio; «Calendario» y «Detalles de autos y pistas» no tienen texto propio en el sitio y se describen como tales. Si cambia el contenido de las páginas, hay que actualizarlo a mano. Escribirlo con una herramienta que no agregue BOM (en PowerShell 5.1, `Set-Content -Encoding utf8` lo agrega).

**Pendientes (no implementados, requieren dominio o decisiones):** dominio de publicación, `canonical` y `og:url`, `og:image` / `twitter:image` (y pasar `twitter:card` a `summary_large_image`), `sitemap.xml`, `robots.txt` y política para crawlers de IA, favicon, `hreflang` / versión en inglés (bastaría sumar `og:locale:alternate` y `<link rel="alternate" hreflang>` al mismo bloque), `sameAs` (perfiles del autor) y validar el JSON-LD con herramientas externas.
