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
styles.css          Base común: tokens, layout, componentes, responsive
elementos.css       Páginas internas (body.page-elementos): topbar, breadcrumb, capas, cards
estrategia.css      Específico de body.page-estrategia
script.js           Comportamiento del Home
menu-capas.js       Menú desplegable de capas de la topbar (solo estrategia.html)
assets/             Imágenes, íconos SVG, videos MP4 (≈85 archivos)
```

Orden de carga de CSS en las páginas internas: `styles.css` → `elementos.css` → (`estrategia.css`). Cada página tiene una clase en `body` (`page-elementos`, `page-estrategia`) para acotar los estilos.

## Sistema de estilos (`styles.css`)

- **Tokens** en `:root`: `--bg #04020d`, `--panel #0a1428`, `--card-bg rgba(0,0,0,.6)`, `--panel-border`, `--orange #fc8738` / `--orange-dark`, `--gold #e2b04a`, `--blue #3b82f6`, `--text-hi/mid/dim`, `--font-display` (Exo 2), `--font-body` (Poppins), `--container-w 1920px`, `--side-pad clamp(24px, 4.1667vw, 80px)`.
- **Escalado**: las medidas salen de un diseño a 1920 px y se convierten con `clamp(min, Xvw, max)`.
- **Fondo fijo**: una capa con `position: fixed` en lugar de `background-attachment: fixed`, para que funcione en iOS (comentario en `styles.css`).
- **Breakpoints**: `max-width: 1300px` (estrategia), `900px` (los tres CSS), `640px` (styles) y `hover: none` (tarjetas en táctil).
- **Botones**: clases `btn`, `btn--sm`, `btn--md`, `btn-primary` (naranja), `btn-info`, `btn-blue`, `btn-source`; las medidas están en el README.
- **Placeholders**: `.media-placeholder[data-label]` dibuja un recuadro punteado con el nombre del asset esperado. Variantes de proporción: `ar-tall`, `ar-short`, `ar-cart`.

## Comportamiento (`script.js`)

1. **Tarjetas de Proceso** (`.proceso-card`): el listener solo hace `console.log` con `data-step`. La navegación a Estrategia sale de un `onclick="location.href='estrategia.html'"` inline en `index.html`. Las otras 4 tarjetas no navegan.
2. **Videos bajo demanda**: un `IntersectionObserver` (threshold 0.25) reproduce `video.screenshot` y `video.stat-video` al entrar en pantalla y los pausa al salir. Esos videos usan `muted loop playsinline preload="none"`. Si no hay `IntersectionObserver`, se activa autoplay. El video del hero usa `autoplay` directamente.

`5-elementos.html` no carga JS y `estrategia.html` solo carga `menu-capas.js`: la navegación es por anclas (`#estrategia`, `#encuestas`, …) con `scroll-margin-top`.

### Menú de capas (`menu-capas.js`, spec 0003)

- **Marcado reutilizable**: `div.topbar-capas.breadcrumb-capas[data-capas]`, dentro de `nav.breadcrumb` (reemplaza al `span.current`), agrupa `button.capas-trigger.current[data-capas-trigger]` (`aria-current="page"`, `aria-expanded`, `aria-controls="capas-menu"`) y `div.capas-menu[role=group][data-capas-menu][hidden]` con una lista de `a.capas-item`. El menú se ancla con `left: 0` bajo la palabra; `.breadcrumb .capas-item` neutraliza el gap y el hover de `.breadcrumb a`. Patrón disclosure, no `role="menu"`. El título central sigue siendo `<h1 class="topbar-title">Estrategia</h1>`, sin cambios.
- **Ítems deshabilitados**: `<a role="link" aria-disabled="true">` sin `href` (no reciben foco ni navegan, opacidad .4). Para habilitar uno: agregar `href` y quitar `role` y `aria-disabled`. La capa actual no figura en su propio menú.
- **JS**: IIFE sin dependencias; click en el botón alterna `aria-expanded` y `hidden`; click en `document` fuera de `[data-capas]` y Escape cierran (Escape devuelve el foco al botón). Inerte si faltan los nodos. Una instancia por página.
- **Estilos** `.capas-*` en `elementos.css` (antes de «Intro»). Los chevrons (`assets/ico-chevron-down.svg` / `-up.svg`, 12x12) se alternan por CSS según `aria-expanded`. Colores literales del diseño de referencia (`#212121`, `#B7B7BA`, `#FFFFFF`). Requiere Inter 400 en el link de Google Fonts.

## Integraciones externas (solo enlaces)

| Servicio | Uso | Dónde |
|---|---|---|
| Google Fonts | Exo 2, Poppins, Inter | `<head>` de cada HTML |
| Google Sheets | Fuente de los testimonios («Ver fuente») | `index.html` |
| Figma | Prototipo («Probar prototipo») | `index.html` |
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

- Páginas de Alcance, Estructura, Esqueleto y Superficie, y enlaces `href="#"` en `5-elementos.html` (líneas 167, 190, 217, 240) y `estrategia.html` (líneas 57, 200, 203; esta última tiene 3 en la misma línea).
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

Campos comunes del JSON-LD: `name`, `description`, `inLanguage: "es"`, `dateCreated: "2025"`, `author` (Person Franco Aguirre, Diseñador UX/UI) y `about` (iRacing, Diseño UX/UI). Sin `url`, `image` ni `sameAs`.

**Decisión sobre `item` relativo:** el breadcrumb de las páginas internas usa `"item": "index.html"` (no hay URL absoluta). Todavía no se validó con el Rich Results Test / Schema Markup Validator; si lo rechaza, omitir `item` y dejar `name` y `position` (se pierde el enlace, no la jerarquía), y anotarlo acá.

**`llms.txt`** (raíz, UTF-8 sin BOM, formato llmstxt.org, enlaces relativos salvo el prototipo de Figma): resumen, problema, objetivos, proceso, las 6 comparativas, estado de las páginas y enlaces. Solo incluye lo que dice el sitio; «Calendario» y «Detalles de autos y pistas» no tienen texto propio en el sitio y se describen como tales. Si cambia el contenido de las páginas, hay que actualizarlo a mano. Escribirlo con una herramienta que no agregue BOM (en PowerShell 5.1, `Set-Content -Encoding utf8` lo agrega).

**Pendientes (no implementados, requieren dominio o decisiones):** dominio de publicación, `canonical` y `og:url`, `og:image` / `twitter:image` (y pasar `twitter:card` a `summary_large_image`), `sitemap.xml`, `robots.txt` y política para crawlers de IA, favicon, `hreflang` / versión en inglés (bastaría sumar `og:locale:alternate` y `<link rel="alternate" hreflang>` al mismo bloque), `sameAs` (perfiles del autor) y validar el JSON-LD con herramientas externas.
