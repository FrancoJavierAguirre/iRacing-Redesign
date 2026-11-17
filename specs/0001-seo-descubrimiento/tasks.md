# Tareas: SEO y descubrimiento por buscadores y agentes de IA

**Spec:** `spec.md` · **Plan:** `plan.md`
Formato: `- [ ] T001 [rol] [P?] Descripción — archivos — FR cubiertos — depende de`

Sin tests automatizados en el repo (Art. III): en lugar de TDD, cada tarea trae su **verificación** (manual + un check técnico acotado) y se ejecuta al terminar la tarea. Node, si hace falta, solo prependiendo al PATH `C:\Program Files\Common Files\Adobe\Creative Cloud Libraries\libs`; los checks de abajo usan PowerShell.

Check técnico común (adaptar `$f` por página):
```powershell
$f = 'index.html'; $h = Get-Content $f -Raw -Encoding UTF8
$d = [regex]::Match($h,'<meta name="description" content="([^"]*)"').Groups[1].Value
"desc length: $($d.Length)"                                   # debe ser <= 160
$j = [regex]::Match($h,'(?s)<script type="application/ld\+json">(.*?)</script>').Groups[1].Value
$j | ConvertFrom-Json | Out-Null; "json-ld OK"                 # no debe fallar
```

## HU1 + HU2 + HU3 (datos estructurados) — metadatos del `<head>` por página
Las tres páginas son archivos distintos y se pueden hacer en paralelo. Cada tarea cubre los escenarios HU1.1, HU2.1 y HU3.1 de su página.

- [x] T001 [front] [P] Agregar al `<head>` de `index.html` el bloque de la plantilla del plan (title ampliado, description, robots, OG, Twitter, JSON-LD `["WebPage","CreativeWork"]` con breadcrumb de 1 ítem). No tocar el body. — `index.html` — FR-001, FR-002, FR-003, FR-004, FR-005, FR-009, FR-010 — sin dependencias
  Verificación: check común (`desc length` ≤ 160, JSON-LD parsea); `Grep` confirma que no hay `canonical`, `og:url`, `og:image` ni `sameAs`; abrir desde disco en el navegador a 1920/1300/900/640 px y comprobar que se ve igual que antes, sin errores en consola.
- [x] T002 [front] [P] Igual en `5-elementos.html` (JSON-LD `WebPage` con `isPartOf` y breadcrumb de 2 niveles) y corregir «Garret» → «Garrett» en el `<title>` y en el `h1.topbar-title`. — `5-elementos.html` — FR-001..FR-005, FR-008, FR-009, FR-010 — sin dependencias
  Verificación: check común; `Grep "Garret\b"` en el archivo debe dar 0 coincidencias en title y h1 (reportar, sin cambiar, cualquier otra); abrir en navegador, el único cambio visible es la segunda «t» en el título de la topbar; consola limpia.
- [x] T003 [front] [P] Igual en `estrategia.html` (JSON-LD `WebPage` con `isPartOf` y breadcrumb «Rediseño UX/UI» → «Estrategia»; `title` sin cambios). — `estrategia.html` — FR-001..FR-005, FR-009, FR-010 — sin dependencias
  Verificación: check común; abrir en navegador y comparar visualmente con la versión anterior (escritorio y mobile), consola limpia, anclas «Ir a…» funcionando.

**Checkpoint HU1/HU2/HU3.1:** no hay quality gates definidos (`qualityGates` vacío). Revisar manualmente los escenarios de aceptación: 3 títulos y 3 descriptions distintos (≤ 160, español, nombran proyecto y autor); OG y Twitter presentes con el mismo título/description; JSON-LD con tipo, autor, año 2025, idioma `es`, tema y breadcrumb; pegar el JSON-LD de cada página en el Schema Markup Validator (schema.org) o el Rich Results Test sin errores (si `item: "index.html"` da error, omitirlo y anotarlo).

## HU3 — `llms.txt`
- [x] T004 [front] Crear `llms.txt` en la raíz según la estructura y las fuentes del plan (resumen, problema, objetivos, proceso, las 6 comparativas con el origen indicado en el plan, estado de cada página, enlaces relativos y el prototipo de Figma ya presente en `index.html`). Sin métricas ni resultados inventados; Calendario solo con lo que el sitio dice (ver duda D1 del plan). Escribir con la herramienta de edición (UTF-8 sin BOM). — `llms.txt` — FR-006, FR-007 — depende de T001, T002, T003 (para alinear nombres y estado con las páginas finales)
  Verificación: `Get-Content llms.txt -Encoding UTF8` empieza con un H1 `# …`, seguido de un blockquote `> …` y secciones `##`; `Grep "https?://"` solo debe encontrar la URL de Figma; los 6 títulos de comparativas aparecen exactos; cada afirmación se puede ubicar en el sitio (revisión manual contra `estrategia.html`/`index.html`); dárselo a un asistente de IA y comprobar que resume problema, proceso y las 6 áreas.

**Checkpoint HU3.2:** escenario de aceptación HU3.2 (llms.txt completo) y criterio de éxito del resumen por IA.

## Cierre
- [x] T005 [front] Actualizar `docs/public/funcionalidades.md` (descubrimiento por buscadores e IA, `llms.txt`) y `docs/tech/sistema.md` (plantilla del head, JSON-LD, decisión sobre `item` relativo, pendientes: dominio/canonical/`og:image`/sitemap/robots/favicon/hreflang/`sameAs`). — `docs/public/funcionalidades.md`, `docs/tech/sistema.md` — FR-010 — depende de T004
- [x] Commit (Conventional Commits, archivos específicos: `index.html`, `5-elementos.html`, `estrategia.html`, `llms.txt`, docs y `specs/0001-seo-descubrimiento/`).
- [x] Pasos de prueba para el usuario y **check final humano** (abrir las 3 páginas desde disco, ver código fuente del `<head>`, validar JSON-LD, leer `llms.txt`). PR solo si se pide.

## Cobertura de FR
FR-001..005 → T001–T003 · FR-006, FR-007 → T004 · FR-008 → T002 · FR-009 → T001–T003 (verificación visual y de consola) · FR-010 → T001–T003, T005. Sin FR sin cubrir. Total: 5 tareas; `[P]`: T001, T002, T003.
