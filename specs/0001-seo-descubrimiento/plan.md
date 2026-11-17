# Plan: SEO y descubrimiento por buscadores y agentes de IA

**Spec:** `spec.md` · **Constitución:** `.cardenal/constitution.md`

## Resumen
Se agrega un bloque de metadatos al `<head>` de las 3 páginas (description, robots, Open Graph, Twitter Card, JSON-LD schema.org) y un `llms.txt` en la raíz que describe en texto el proyecto y las 6 comparativas Antes/Después. Todo es markup no visible (`<meta>`, `<script type="application/ld+json">`) o un archivo de texto nuevo: no cambia el body, las clases, los estilos ni los assets, y funciona igual desde `file://`. Única edición visible: «Garret» → «Garrett» en `5-elementos.html`.

## Contexto técnico
- Stack: HTML5 estático, sin build ni dependencias (Art. VI.1). Sin tests automatizados (Art. III): verificación manual + un check técnico acotado por tarea.
- Módulos afectados: `index.html`, `5-elementos.html`, `estrategia.html` (solo `<head>`, salvo el `h1` de `5-elementos.html`) y `llms.txt` (nuevo).
- Fichas consultadas: solo las referenciadas por el spec (`docs/public/funcionalidades.md`, `docs/tech/sistema.md`), a actualizar en el cierre.
- Estado actual del `<head>`: `charset`, `viewport`, `title`, `preconnect`/fuentes y hojas de estilo. Los metadatos nuevos se insertan **entre `<title>` y el primer `<link rel="preconnect">`**, en el mismo orden en las 3 páginas, para que el diff sea predecible.

## Estructura de archivos
| Archivo | Acción | Motivo |
| --- | --- | --- |
| `index.html` | modificar (solo `<head>`) | title, description, robots, OG, Twitter, JSON-LD (FR-001..005, 010) |
| `5-elementos.html` | modificar (`<head>` + `title` y `h1`) | ídem + «Garrett» (FR-008) |
| `estrategia.html` | modificar (solo `<head>`) | ídem |
| `llms.txt` | crear (raíz) | resumen legible por agentes (FR-006, FR-007) |
| `docs/public/funcionalidades.md`, `docs/tech/sistema.md` | modificar (cierre) | documentar la feature en ambas audiencias |

## Contratos

### Plantilla de `<head>` (idéntica en las 3 páginas; cambian solo los valores)
```html
<title>…</title>
<meta name="description" content="…">
<meta name="robots" content="index, follow">
<meta property="og:type" content="website">
<meta property="og:title" content="(= title)">
<meta property="og:description" content="(= description)">
<meta property="og:site_name" content="iRacing — Rediseño UX/UI · Franco Aguirre">
<meta property="og:locale" content="es_AR">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="(= title)">
<meta name="twitter:description" content="(= description)">
<script type="application/ld+json">{ … }</script>
```
- Sin `canonical`, `og:url`, `og:image`, `twitter:image`, `sitemap` ni `robots.txt` (sin dominio). Se documentan como pendientes en `docs/tech/sistema.md`.
- `twitter:card` = `summary` porque no hay imagen; pasar a `summary_large_image` cuando exista `og:image` absoluta.
- Idioma (FR-010): ya está `<html lang="es">`; se suma `og:locale` `es_AR` y `inLanguage: "es"` en el JSON-LD. Para agregar inglés después bastará con `og:locale:alternate` y `<link rel="alternate" hreflang>` en el mismo bloque, sin rehacerlo.
- `title`, `og:title` y `twitter:title` son el mismo texto; ídem la description.

### Textos propuestos (descriptions ≤ 160 caracteres; el largo exacto se verifica con script en cada tarea)
| Página | `title` | `description` |
| --- | --- | --- |
| `index.html` | `iRacing — Rediseño UX/UI · Franco Aguirre` | `Case study UX/UI de Franco Aguirre: rediseño no oficial de la plataforma de iRacing con foco en la lista de carreras, el registro y el carrito de compras.` |
| `5-elementos.html` | `5 Elementos UX de James Garrett — iRacing` (solo corrige «Garret») | `Los 5 elementos UX de Jesse James Garrett, de la estrategia a la superficie, como método del rediseño de iRacing. Case study de Franco Aguirre.` |
| `estrategia.html` | `Estrategia — Rediseño iRacing` (sin cambios) | `Estrategia del rediseño de iRacing: evaluaciones heurísticas, encuestas a 11 usuarios, mapa de trayectoria y Lean UX Canvas. Case study de Franco Aguirre.` |

Criterio: los `title` de `5-elementos` y `estrategia` ya son únicos y descriptivos, y coinciden con lo que ve el usuario, así que se conservan; solo el de `index` se amplía para nombrar al autor (FR-001, HU1). Los tres nombran al proyecto (iRacing, rediseño) y a Franco Aguirre. Si alguna description supera 160 al contarla, recortar el final antes de implementar.

### JSON-LD por página (schema.org, `@context: "https://schema.org"`; es el identificador del vocabulario, no una URL del sitio)
Campos comunes: `name` (= title), `description` (= description), `inLanguage: "es"`, `dateCreated: "2025"`, `author: {"@type":"Person","name":"Franco Aguirre","jobTitle":"Diseñador UX/UI"}`, `about: [{"@type":"Thing","name":"iRacing"},{"@type":"Thing","name":"Diseño UX/UI"}]`, `breadcrumb` (BreadcrumbList). Sin `url`, `image` ni `sameAs`.

| Página | `@type` | Particularidades |
| --- | --- | --- |
| `index.html` | `["WebPage","CreativeWork"]` con `genre: "Case study de diseño UX/UI"` | Representa la obra completa. `keywords`: «UX, UI, rediseño, iRacing, simracing, case study». `breadcrumb`: 1 ítem («Rediseño UX/UI», posición 1). |
| `5-elementos.html` | `WebPage` | `isPartOf: {"@type":"CreativeWork","name":"iRacing — Rediseño UX/UI","author":<Person>}`. `breadcrumb`: «Rediseño UX/UI» (pos. 1, `item: "index.html"`) → «5 Elementos UX» (pos. 2, sin `item`). |
| `estrategia.html` | `WebPage` | Ídem `isPartOf`. `breadcrumb`: «Rediseño UX/UI» → «Estrategia». |

Los nombres del breadcrumb salen de los textos reales de la página (`crumb-parent` «Rediseño UX/UI», `current`). `item: "index.html"` es relativo (no hay URL absoluta); si el validador lo rechaza, se omite `item` y se deja solo `name`/`position` (riesgo abajo).

### `llms.txt` (raíz, UTF-8 sin BOM, español, formato llmstxt.org)
Estructura: `# iRacing — Rediseño UX/UI` · blockquote con el resumen · secciones `##` con listas de enlaces relativos.

| Sección | Contenido | Fuente en el sitio |
| --- | --- | --- |
| Resumen (blockquote) | rediseño no oficial de la plataforma de iRacing, por Franco Aguirre, 2025; herramientas Figma, Make, Photoshop, UX Tweak | `index.html` (contexto, herramientas), spec |
| Problema | por qué el rediseño; experiencia de un usuario nuevo | `index.html` («¿Por qué el rediseño?»); `estrategia.html` (Experiencia, «La primera vez») |
| Objetivos | negocio y usuario | `index.html`, sección Objetivos |
| Proceso | los 5 elementos de Garrett y sus etapas; Estrategia: evaluaciones heurísticas, encuestas (11 usuarios), mapa de trayectoria (persona Sergio Barrientos), Lean UX Canvas | `5-elementos.html`, `estrategia.html` |
| Las 6 comparativas | una línea por comparativa (ver abajo) | `index.html` (títulos); `estrategia.html` (hallazgos, «Descubrimientos y soluciones», Lean UX Canvas) |
| Estado de las páginas | cuál está completa y cuál en construcción (ej. imágenes de `estrategia.html` aún son `.media-placeholder`; el botón «Ver Alcance» no apunta a nada todavía) | las propias páginas; el implementador confirma el estado de `5-elementos.html` al leerla |
| Enlaces | `index.html`, `5-elementos.html`, `estrategia.html` (relativos) y el prototipo de Figma (la URL que ya está en el botón «Probar prototipo» de `index.html`) | `index.html` |

Origen del texto de cada comparativa (solo lo que dice el sitio, sin métricas ni resultados inventados):
1. **Lista de carreras** ← `estrategia.html`: hallazgo «Estética y diseño minimalista» (sacar las tablas «Races» y «Currently racing»), hipótesis «La lista de carreras» (mejores filtros e información), Descubrimientos «Lista de carreras» (nombre de auto/pista en «Naranja Carrito» para indicar qué falta comprar) y Lean Canvas (quitar columnas innecesarias, sumar el auto favorito, filtros y tags visibles).
2. **Registro a la carrera** ← Lean Canvas («cambiar el botón de “registro” por un botón menú», registrarse con el auto favorito ya seleccionado) y Experiencia, paso 4 (obligación de volver a elegir el auto).
3. **Detalles de la carrera** ← Descubrimientos «Detalles de carreras» (nueva tab «Cars», reordenamiento y resumen de información en 2 tablas), hipótesis «Detalles de una serie» (reducir carga cognitiva) y resultados de Encuestas.
4. **Calendario** ← la página no contiene hallazgos ni soluciones que lo nombren. Solo se puede decir qué comparativa es y que se rediseñó el calendario (título + videos). No se inventa el cambio: ver duda D1.
5. **Detalles de autos y pistas** ← Descubrimientos «Detalles de carreras» (sección «Cars») y Lean Canvas (colorear autos y pistas que hay que comprar). Se aclara que el texto del sitio no los trata por separado.
6. **Carrito de compras** ← Descubrimientos «Carrito de compras» (llevarlo dentro de la plataforma), heurística «Consistencia y Estándares» (icon button con badge numérico) y Lean Canvas (pagos dentro de la plataforma). Los objetivos del Lean Canvas (+20 % de permanencia, +40 % de AOV) se mencionan, si se mencionan, como objetivos/hipótesis y no como resultados.

Errores: no aplica (no hay entradas ni backend).

## Datos
Sin cambios de modelo, almacenamiento ni migraciones. No hay servicios externos nuevos (los JSON-LD y metas son inertes; no hay scripts de terceros, Art. II).

## Diseño de referencia
No aplica (sin UI nueva). Los metadatos no tocan clases ni estilos; el body queda intacto salvo el texto del `h1` de `5-elementos.html`.

## Riesgos y decisiones
- **Orden de inserción fijo** entre `<title>` y `preconnect`: facilita revisar el diff y evita tocar el resto del head.
- **`item` relativo en BreadcrumbList**: es lo único que podría molestar al Rich Results Test. Mitigación: si da error, omitir `item` (se pierde el enlace, no la jerarquía). Dejar la decisión final registrada en `docs/tech/sistema.md`.
- **Texto «Garrett»** solo en `title` y `h1` de `5-elementos.html`; el resto de la página (ya dice «Jesse James Garrett» en un `h2`) no se toca. Revisar con `Grep` que no queden otras apariciones «Garret» en ese archivo; si las hay en el body, reportarlas sin cambiarlas (fuera de alcance).
- **Descriptions largas con tildes**: contar con `.Length` en PowerShell (cuenta caracteres, no bytes).
- **`llms.txt` y BOM**: `Set-Content -Encoding utf8` en PowerShell 5.1 agrega BOM; escribir el archivo con la herramienta de edición, no con redirecciones.
- **D1 (duda abierta)**: el sitio no tiene texto sobre qué cambia en «Calendario» ni separa «Detalles de autos y pistas». Se describen solo con lo que existe; si el autor quiere más detalle, debe aportarlo él (FR-007 prohíbe inventarlo).
- **Pendientes registrados (no se implementan)**: dominio, canonical/`og:url`, `og:image`, `sitemap.xml`, `robots.txt`/crawlers de IA, favicon, `hreflang`/inglés, `sameAs`.

## Chequeo contra la constitución
| Principio | Cumple | Desviación justificada |
| --- | --- | --- |
| Art. I Alcance (solo lo pedido; pendientes registrados) | Sí | — |
| Art. II Servicios externos (sin scripts de terceros ni APIs) | Sí | — |
| Art. III Verificación manual (sin tests; consola limpia; 1920/1300/900/640 px) | Sí | Sin TDD: no hay infraestructura de tests; se usa check técnico acotado por tarea |
| Art. IV Git (rama actual, Conventional Commits, archivos específicos) | Sí | — |
| Art. V Seguridad (sin secretos ni datos personales nuevos) | Sí | Sin perfiles ni contacto |
| Art. VI Stack (HTML estático, `file://`, rutas relativas, `lang="es"`, español rioplatense) | Sí | — |
