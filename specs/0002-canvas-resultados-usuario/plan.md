# Plan: Lean UX Canvas — resultados para el usuario y enlace «Ver respuestas»

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.


**Spec:** `spec.md` · **Constitución:** `.cardenal/constitution.md`

## Resumen
Dos ediciones de contenido en `estrategia.html`: reemplazar los 2 `<li>` duplicados de la card «Resultados para el Usuario» por los 4 bullets del spec, y convertir el `href="#"` de «Ver respuestas» en un enlace externo con `target="_blank" rel="noopener"`. Después, alinear la documentación (`llms.txt`, `docs/public/funcionalidades.md`, `docs/tech/sistema.md`). Sin CSS, JS ni cambios de layout.

## Contexto técnico
- Stack: HTML5 + CSS + JS vanilla estático, sin build (Art. VI.1). No hay tests automatizados (Art. III): la verificación es QA manual.
- `estrategia.html:119`: `<div class="sec-cta"><a href="#" class="btn btn-primary">Ver respuestas</a></div>`. Se agregan solo `href`, `target` y `rel`; las clases quedan igual.
- `estrategia.html:187`: card `Resultados para el Usuario` con un `<ul>` de 2 `<li>` copiados de «Resultados para el Negocio» (línea 186, no se toca). Los `<li>` nuevos van sin `<span class="hl">`, igual que los de la card de negocio, para mantener el mismo estilo (HU1.2).
- Fichas consultadas: `docs/tech/sistema.md` (línea 71, lista de `href="#"`; la sección «SEO y descubrimiento» no menciona la card ni el botón, no requiere cambio) y `docs/public/funcionalidades.md` (sección Estrategia, línea 51 «Partes incompletas»).
- Las ediciones no agregan ni quitan líneas en `estrategia.html`, así que las otras referencias de línea de `sistema.md` (57, 200, 203; `5-elementos.html`) no cambian.

## Estructura de archivos
| Archivo | Acción | Motivo |
| --- | --- | --- |
| `estrategia.html` | modificar | Línea 119: `href` externo + `target="_blank" rel="noopener"` (FR-002). Línea 187: 4 bullets (FR-001). |
| `llms.txt` | modificar | Línea 37: quitar «Ver respuestas» de los botones que no llevan a ninguna parte (queda «Ver Alcance»). Sección Objetivos (línea 15): agregar los resultados para el usuario (FR-004). |
| `docs/public/funcionalidades.md` | modificar | Línea 51: quitar «Ver respuestas» de las partes incompletas y la nota de la card duplicada; describir que abre la planilla (FR-004). |
| `docs/tech/sistema.md` | modificar | Línea 71: quitar `119` de las líneas con `href="#"` de `estrategia.html` (queda 57, 200, 203) (FR-004). |

## Contratos
- Enlace «Ver respuestas»: `href="https://docs.google.com/spreadsheets/d/1PSs_GEPbFZEOwT5oAiEQkvclF1DfmOjBHSV1Y4nSWa4/edit?usp=sharing"`, `target="_blank"`, `rel="noopener"`. Mismo patrón que los enlaces externos de `index.html` y `estrategia.html` (Art. V).
- Card: `<ul>` con exactamente 4 `<li>` con el texto literal del spec, en este orden:
  1. Realizar compras sin abandonar la plataforma.
  2. Buscar y encontrar carreras más rápidamente.
  3. Acelerar el registro a una carrera.
  4. Guía práctica para subir de licencias.
- Sin errores ni permisos nuevos: el destino es una planilla externa que ya enlaza «Ver fuente» del Home.

## Datos
Sin cambios de modelo ni almacenamiento. Sin migración.

## Diseño de referencia (si hay UI)
Solo contenido. La card reutiliza `.t-card` + `<ul>` ya existente y el botón reutiliza `.sec-cta .btn .btn-primary`; no se tocan clases ni hojas de estilo. Layout y responsive quedan como están.

## Riesgos y decisiones
- Decisión: sin `<span class="hl">` en los bullets, para que sean idénticos en estilo a «Resultados para el Negocio».
- Decisión: en `llms.txt`, los resultados para el usuario se agregan a la sección Objetivos como un bullet nuevo propio, sin mezclarlos con las metas de negocio de la línea 15.
- Riesgo bajo: el número de línea de `sistema.md` queda desactualizado si `estrategia.html` cambia de líneas; las ediciones del plan no cambian el conteo. El check final lo revisa con Grep.
- Fuera de alcance: «Ver Alcance» y los otros `href="#"` (spec).
- Sin dudas abiertas.

## Chequeo contra la constitución
| Principio | Cumple | Desviación justificada |
| --- | --- | --- |
| Art. I Alcance | Sí: solo la card, el botón y sus docs | — |
| Art. II Datos y servicios externos | Sí: enlace saliente, sin escritura ni scripts | — |
| Art. III Verificación | Sí: QA manual (1920 px y 1300/900/640 px, sin errores en consola) más Grep acotado | Sin TDD: no hay infraestructura de tests |
| Art. IV Git | Sí: checkout actual, Conventional Commits con archivos específicos | — |
| Art. V Seguridad | Sí: `target="_blank" rel="noopener"` | — |
| Art. VI Stack y convenciones | Sí: HTML estático, español rioplatense, sin estilos nuevos | — |
