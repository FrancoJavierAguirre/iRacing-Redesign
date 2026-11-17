# Spec: SEO y descubrimiento por buscadores y agentes de IA

**Carpeta:** `specs/0001-seo-descubrimiento/` · **Estado:** aprobado para planificar · **Ficha:** `.cardenal/context.json`

## Contexto
- **Actor:** Franco Aguirre (autor) y los futuros clientes y reclutadores que llegan al portfolio desde un buscador o un asistente de IA.
- **Problema:** las 3 páginas (`index.html`, `5-elementos.html`, `estrategia.html`) solo tienen `title`. No tienen descripción, metadatos para compartir, datos estructurados ni un resumen legible por máquinas, y el contenido central (6 comparativas Antes/Después) está en videos que ni buscadores ni agentes pueden leer.
- **Resultado:** un buscador o un agente puede describir el proyecto, su autor, su proceso y lo que se rediseñó, sin ver los videos.
- **Decisiones confirmadas** (`.cardenal/context.json`): no hay dominio todavía (`d-no-domain`); no se incluye rendimiento (`d-no-perf`); el contenido sigue en español, con un switch ES/EN más adelante (`d-lang-future`); la política de crawlers y robots.txt se deciden después, y no se incluyen perfiles de contacto (`d-crawlers-deferred`).
- **Documentación pertinente:** [docs/public/funcionalidades.md](../../docs/public/funcionalidades.md), [docs/tech/sistema.md](../../docs/tech/sistema.md).

## Historias de usuario

### HU1 — Resultado de búsqueda claro (P1)
Como cliente potencial que busca «rediseño UX iRacing» o «case study UX sim racing», quiero ver en los resultados un título y una descripción que expliquen el proyecto, para decidir si entro.

**Escenarios de aceptación**
1. **Dado** cualquiera de las 3 páginas, **cuando** se inspecciona su `<head>`, **entonces** tiene un título único y una descripción única de 160 caracteres o menos, en español, que nombra el proyecto y el autor.
2. **Dado** `5-elementos.html`, **cuando** se lee su título y su encabezado principal, **entonces** el apellido aparece como «Garrett» (con doble t); el resto del texto visible no cambia.

### HU2 — Vista previa al compartir (P2)
Como autor, quiero que al pegar un enlace en LinkedIn, WhatsApp o Slack se muestre el título y la descripción del case study, para presentarlo bien a los clientes.

**Escenarios de aceptación**
1. **Dado** cualquiera de las páginas, **cuando** se inspecciona su `<head>`, **entonces** tiene metadatos Open Graph (tipo, título, descripción, nombre del sitio, idioma `es_AR`) y Twitter Card con el mismo título y descripción.
2. **Dado** que no hay dominio, **entonces** no se publican URLs absolutas inventadas; la imagen de vista previa y la URL canónica quedan documentadas como pendientes.

### HU3 — Comprensión por agentes de IA (P1)
Como cliente que le pide a un asistente de IA «portfolios de diseñadores UX con case studies de gaming», quiero que el asistente pueda entender y resumir este case study correctamente.

**Escenarios de aceptación**
1. **Dado** cualquiera de las páginas, **cuando** un agente lee los datos estructurados, **entonces** identifica el tipo de obra (case study de diseño), el autor (Franco Aguirre), el año (2025), el idioma (`es`), el tema (rediseño UX/UI de la plataforma de iRacing) y la ubicación de la página dentro del sitio (breadcrumb).
2. **Dado** la raíz del sitio, **cuando** un agente abre `llms.txt`, **entonces** encuentra un resumen del proyecto, el problema, los objetivos, el proceso (5 elementos), las 6 comparativas descritas en texto (qué cambia entre antes y después), el estado de cada página y enlaces relativos a las páginas y al prototipo.

## Requisitos funcionales
- **FR-001**: Cada página DEBE tener un `title` único y descriptivo.
- **FR-002**: Cada página DEBE tener una meta description única, de 160 caracteres o menos, en español.
- **FR-003**: Cada página DEBE indicar a los robots que se puede indexar y seguir enlaces.
- **FR-004**: Cada página DEBE incluir metadatos Open Graph y Twitter Card sin URLs absolutas.
- **FR-005**: Cada página DEBE incluir datos estructurados schema.org válidos con: tipo de página u obra, nombre, descripción, autor (persona: Franco Aguirre), idioma `es`, fecha o año de creación 2025, tema/«about» (iRacing, diseño UX/UI) y breadcrumb. Sin URLs absolutas y sin perfiles `sameAs`.
- **FR-006**: El sitio DEBE tener un `llms.txt` en la raíz, con el formato de llmstxt.org (título H1, resumen en blockquote, secciones con enlaces relativos), en español.
- **FR-007**: `llms.txt` DEBE describir en texto las 6 comparativas Antes/Después usando solo información presente en el sitio (hallazgos de Estrategia, soluciones del Lean Canvas, títulos de las comparativas). No inventa métricas ni resultados.
- **FR-008**: `5-elementos.html` DEBE decir «Garrett» en el `title` y en el `h1`.
- **FR-009**: Los cambios NO DEBEN alterar el diseño visible ni agregar errores de consola; todo debe seguir funcionando al abrir los archivos desde el disco.
- **FR-010**: Los metadatos DEBEN poder extenderse después con `hreflang` y versiones en inglés sin rehacerlos (por ejemplo, con el idioma declarado explícitamente).

## Entidades clave
- **Página**: título, descripción, posición en el sitio (breadcrumb), idioma.
- **Autor**: Franco Aguirre, diseñador UX/UI. Sin perfiles públicos por ahora.
- **Case study**: rediseño UX/UI no oficial de la plataforma de iRacing (2025), con herramientas (Figma, Make, Photoshop, UX Tweak), proceso (5 elementos de Garrett) y prototipo en Figma.

## Estados de pantalla
No aplica: no hay UI nueva. El aspecto visual de las 3 páginas debe quedar idéntico en escritorio y mobile.

## Fuera de alcance
- Dominio, URL canónica, `sitemap.xml`, `robots.txt`, política de crawlers de IA y `og:image` absoluta (pendientes hasta definir el hosting).
- Favicon (falta un ícono propio; `q-favicon`).
- Perfiles de contacto o `sameAs`.
- Optimizaciones de rendimiento y cualquier cambio en los assets.
- Traducción al inglés y el switch ES/EN.
- Correcciones de copy visibles distintas de «Garrett» (Lean Canvas, «Evauaciones», «par el usuario»).

## Criterios de éxito
- Las 3 páginas pasan sin errores el Rich Results Test o el Schema Markup Validator de schema.org, pegando el código.
- Revisión manual: cada página tiene un título y una descripción distintos, y los títulos que se ven en la página no cambian.
- Un asistente de IA al que se le da `llms.txt` resume correctamente el problema, el proceso y las 6 áreas rediseñadas.
- Cuando haya dominio (fuera de esta feature): las páginas aparecen indexadas con su descripción en Google Search Console.

## Aclaraciones
### Sesión 2026-11-17
- **P:** ¿Cómo se manejan las URLs absolutas sin dominio? → **R:** Se deja para después; solo se implementa lo que no depende del dominio.
- **P:** ¿Se incluye rendimiento? → **R:** No.
- **P:** ¿Idioma? → **R:** Español; switch ES/EN a futuro.
- **P:** ¿Crawlers de IA? → **R:** Se decide junto con el dominio.
- **P:** ¿Perfiles públicos? → **R:** Ninguno por ahora.
