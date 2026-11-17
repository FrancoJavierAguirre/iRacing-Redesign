# Plan: Menú desplegable de capas UX en la topbar

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.


**Spec:** `spec.md` · **Constitución:** `.cardenal/constitution.md`

## Resumen
El título de la topbar pasa a contener un `<button>` disparador (texto «Estrategia» + chevron) y, justo después, un `<nav>` con una lista de enlaces oculta por `hidden`. Un script vanilla chico (`menu-capas.js`) alterna `aria-expanded` y `hidden` y maneja el cierre (segundo click, click afuera, Escape). Los estilos viven en `elementos.css` bajo el prefijo `.capas-*` para que las futuras páginas de capa los reutilicen sin tocar CSS.

## Contexto técnico
- Stack: HTML5 + CSS + JS vanilla, sin build, desde `file://` (Art. VI.1). Sin dependencias ni scripts de terceros (Art. II).
- Módulos afectados: `estrategia.html` (topbar, link de fuentes, script), `elementos.css` (`.topbar`, `.topbar-title`, media query de 900 px), archivo nuevo `menu-capas.js`.
- `.topbar` es `position: sticky; z-index: 20; display: flex; justify-content: center` y no define `overflow`, así que un hijo absoluto puede salir de la barra. `.topbar-title` ya fija Poppins 600, `clamp(16px, 1.25vw, 24px)` (14 px en ≤ 900 px), `margin: 0` y `text-align: center`.
- Assets existentes: `assets/ico-chevron-down.svg`, `assets/ico-chevron-up.svg` (12×12, blanco) y `assets/icon-{estrategia,alcance,estructura,esqueleto,superficie}.svg` (ya en `#B7B7BA`).
- Inter hoy se carga con `wght@300;600`; falta el 400.
- No se consultaron fichas de `docs/tech` en esta etapa; la tarea de cierre las actualiza.

## Estructura de archivos
| Archivo | Acción | Motivo |
| --- | --- | --- |
| `estrategia.html` | modificar | Marcado del disparador y del menú en la topbar, Inter 400 en el link de Google Fonts, `<script src="menu-capas.js" defer>` antes de `</body>` (FR-001, FR-005..FR-008) |
| `elementos.css` | modificar | Estilos `.capas-*` reutilizables, estado deshabilitado, chevrons por CSS (FR-002, FR-003, FR-006, FR-007, FR-009, FR-010) |
| `menu-capas.js` | crear | Toggle, cierre por click afuera y Escape, foco de vuelta al botón (FR-004, FR-008, FR-009) |
| `docs/public/funcionalidades.md` | modificar | Documentar el menú en la sección Estrategia (tarea de cierre) |
| `docs/tech/sistema.md` | modificar | Estructura de archivos, comportamiento y carga solo en `estrategia.html` (tarea de cierre) |

## Contratos
No hay API ni datos. El contrato es de marcado, pensado para copiarlo en cada página de capa.

**Corrección (aclaración del usuario):** el chevron y el menú salen de la palabra «Estrategia» del breadcrumb (arriba a la izquierda), no del título central. El `<h1 class="topbar-title">Estrategia</h1>` vuelve a su forma original, sin wrapper ni botón (FR-008, SEO de 0001).

**Marcado (reemplaza el `<span class="current">Estrategia</span>` del breadcrumb):**
```html
<div class="topbar-capas breadcrumb-capas" data-capas>
  <button type="button" class="capas-trigger current" aria-current="page" aria-expanded="false" aria-controls="capas-menu" data-capas-trigger>
    <span>Estrategia</span>
    <img class="capas-chevron capas-chevron--down" src="assets/ico-chevron-down.svg" alt="" width="12" height="12">
    <img class="capas-chevron capas-chevron--up" src="assets/ico-chevron-up.svg" alt="" width="12" height="12">
  </button>
  <div class="capas-menu" id="capas-menu" role="group" aria-label="Capas del proceso UX" data-capas-menu hidden>
    <ul>
      <li><a class="capas-item" role="link" aria-disabled="true"><img src="assets/icon-alcance.svg" alt="" width="16" height="16"><span>Alcance</span></a></li>
      <!-- Estructura, Esqueleto y Superficie igual -->
    </ul>
  </div>
</div>
```
- El wrapper vive dentro de `nav.breadcrumb`; el menú es un `<div role="group">` (no `<nav>`) para no anidar navs.
- Los íconos y chevrons son decorativos: `alt=""`, con `width`/`height` explícitos.
- Los íconos y chevrons son decorativos: `alt=""`, con `width`/`height` explícitos.

**Patrón ARIA: disclosure con lista de enlaces, no `role="menu"`.** `role="menu"` es para menús de acciones tipo aplicación y obliga a implementar foco gestionado, flechas, Home/End y type-ahead; si se implementa a medias, empeora la accesibilidad. Esto es navegación del sitio: un botón con `aria-expanded` + `aria-controls` y una lista de enlaces dentro de un `<nav>` etiquetado es más simple, robusto y se recorre con Tab. El botón comunica abierto/cerrado (FR-008) y Enter/Espacio funcionan de forma nativa.

**Opciones deshabilitadas (FR-006):** `<a role="link" aria-disabled="true">` sin `href`. Sin `href` el elemento no recibe foco ni navega, y `role="link"` + `aria-disabled="true"` hace que los lectores de pantalla lo anuncien como enlace deshabilitado (un `<span>` o `<a>` sin href solo sería texto genérico). Habilitarla es agregar `href="<pagina>.html"` y quitar `role` y `aria-disabled` (HU2.3).

**Reutilización por página (FR-009):** cada página de capa copia el bloque y cambia solo tres cosas: el texto del `<span>` del disparador, la omisión de su propio ítem (la capa actual simplemente no está en el HTML; el orden Estrategia, Alcance, Estructura, Esqueleto, Superficie se conserva) y qué ítems llevan `href`. CSS y `menu-capas.js` no se tocan. El script se engancha por atributos `data-capas*`, no por clases de estilo ni ids fijos, y soporta una sola instancia por página.

**Comportamiento de `menu-capas.js` (IIFE, sin globals, sin dependencias):**
- Click en el disparador: invierte `aria-expanded` y el atributo `hidden` del menú.
- `click` en `document`: si el menú está abierto y el target está fuera de `[data-capas]`, cierra (sin mover el foco).
- `keydown` Escape: si está abierto, cierra y llama `trigger.focus()`.
- Si no encuentra el disparador o el menú, no hace nada (sin errores en consola, FR-010).
- No cierra al tabular fuera ni al hacer click en un ítem deshabilitado (no navega; el menú sigue abierto).

## Datos
Sin cambios de modelo ni almacenamiento. Sin migraciones.

## Diseño de referencia (si hay UI)
Estilos nuevos en `elementos.css`, antes del bloque «Intro» y con su regla en la media query de 900 px solo si hace falta. Valores del spec:

- `.topbar-capas { position: relative; }`: ancla del menú, ahora hijo del breadcrumb (flex).
- `.capas-trigger`: `display: inline-flex; align-items: center; gap: 8px; background: none; border: 0; padding: 0; font: inherit; color: inherit; cursor: pointer;` para verse igual que el título actual (hereda Poppins 600 y el tamaño de `.topbar-title`). `:focus-visible { outline: 2px solid #fff; outline-offset: 4px; border-radius: 4px; }`.
- `.capas-chevron { width: 12px; height: 12px; flex-shrink: 0; display: block; }` con el 8 px dado por el `gap`. Por defecto se oculta `--up`; con `.capas-trigger[aria-expanded="true"]` se oculta `--down` y se muestra `--up`.
- **Chevrons por CSS, no cambiando `src`:** el estado ya vive en `aria-expanded`, así que CSS es la única fuente de verdad; ambas imágenes se cargan de entrada (sin parpadeo ni request al primer toggle, y funciona igual desde `file://`) y el JS queda limitado a alternar atributos (FR-002).
- `.capas-menu`: `position: absolute; top: calc(100% + 12px); left: 0; z-index: 30; background: #212121; border-radius: 8px; min-width: 102px; width: max-content; max-width: calc(100vw - 2 * var(--side-pad));` más `.capas-menu[hidden] { display: none; }` (necesario porque una regla de autor con `display` pisaría `hidden`). Corrección: alineado al inicio de la palabra «Estrategia» (sin `translateX`); con `left: 0` crece hacia la derecha y no se sale por la izquierda. El `max-width` es solo una guarda (FR-003, HU3.2). Dentro del breadcrumb, `.breadcrumb .capas-item { gap: 8px; color: #fff; }` neutraliza `.breadcrumb a` (gap 12, color heredado) y su hover. El z-index 30 es relativo al contexto de la topbar (z-index 20), por lo que queda sobre el contenido de la página.
- `.capas-menu ul { list-style: none; margin: 0; padding: 0; }`.
- `.capas-item`: `display: flex; align-items: center; gap: 8px; padding: 12px 8px; font-family: "Inter", sans-serif; font-weight: 400; font-size: 12px; color: #fff; white-space: nowrap; text-decoration: none; text-align: left;` y `img { width: 16px; height: 16px; flex-shrink: 0; }`.
- `a.capas-item[href]:hover, a.capas-item[href]:focus-visible`: realce sutil (`background: rgba(255,255,255,.08)`) con `outline: none` solo si el realce es visible; hoy no se ve (sin ítems habilitados) pero queda listo (HU2.3).
- `.capas-item[aria-disabled="true"] { opacity: .4; cursor: not-allowed; }` (por opacidad, según `p-close-a11y`; reversible).
- Colores `#212121`/`#B7B7BA`/`#FFFFFF` salen del diseño de referencia y no son tokens de la paleta de `:root`; se declaran como valores literales con un comentario que cite la captura (Art. VI.3 aplica a colores de la paleta). Alternativa descartada: agregar tokens a `styles.css` por una sola feature.
- En ≤ 900 px no hay reglas nuevas: la media query oculta `.crumb-parent` y `.sep`, pero el botón (hijo del breadcrumb) sigue visible y el menú se mantiene debajo.

## Riesgos y decisiones
- **Verificación sin tests (Art. III):** cada tarea lleva QA manual (1920, 1300, 900 y 640 px; Tab, Enter/Espacio, Escape; consola limpia) más un check acotado con Grep y `node --check menu-capas.js` (node se invoca prependiendo `C:\Program Files\Common Files\Adobe\Creative Cloud Libraries\libs` al PATH, porque no está en el PATH del sistema).
- **Hit area del título:** el botón envuelve texto y chevron, así que el click en cualquiera de los dos abre el menú (HU1.2).
- **`font: inherit` en el botón** es lo que garantiza que no cambie la apariencia del título (FR-010); verificar visualmente contra el título actual.
- **Click en el ítem deshabilitado:** no navega ni cierra el menú; se acepta como comportamiento esperado.
- **Alineación del menú:** se eligió centrado bajo la palabra; si la captura de referencia lo muestra alineado a la izquierda, solo cambia `left`/`transform`.
- **Visibilidad de `#capas-menu` con `file://`:** sin dependencias de red salvo Google Fonts (ya existente).
- Fuera de alcance: crear las otras páginas, aplicar el menú en `index.html` o `5-elementos.html`, tocar breadcrumb o «Ver Alcance».

## Chequeo contra la constitución
| Principio | Cumple | Desviación justificada |
| --- | --- | --- |
| Art. I — Alcance | Sí: solo menú y Estrategia | — |
| Art. II — Servicios externos | Sí: sin scripts de terceros; Inter 400 es el mismo link de Google Fonts | — |
| Art. III — Verificación | Sí: QA manual a 1920/1300/900/640 y consola limpia | — |
| Art. IV — Git | Sí: rama actual, commit con archivos específicos | — |
| Art. V — Seguridad | Sí: sin enlaces externos nuevos | — |
| Art. VI.1 — Stack | Sí: vanilla, rutas relativas, `file://` | — |
| Art. VI.2 — Idioma | Sí: español rioplatense | — |
| Art. VI.3 — Estilos | Parcial: estilos en `elementos.css`, acotados con prefijo `.capas-*` | Hex literales del diseño de referencia (`#212121`, `#B7B7BA`) por no ser colores de la paleta |
| Art. VI.6 — Tipografía | Sí: Inter vía Google Fonts | — |
| Art. VI.9 — Accesibilidad | Sí: `alt=""` en decorativas, `aria-expanded`, `aria-disabled` | — |
