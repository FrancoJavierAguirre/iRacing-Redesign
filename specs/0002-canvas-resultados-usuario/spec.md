# Spec: Lean UX Canvas — resultados para el usuario y enlace «Ver respuestas»

**Carpeta:** `specs/0002-canvas-resultados-usuario/` · **Estado:** aprobado para planificar · **Ficha:** `.cardenal/context.json`

## Contexto
- **Actor:** lector del portfolio (cliente potencial o reclutador) que recorre `estrategia.html`.
- **Problema:** en el Lean UX Canvas, la card «Resultados para el Usuario» repite por error los resultados de negocio (`d-canvas-error` en `.cardenal/repository-context.json`). En la sección Encuestas, el botón «Ver respuestas» no lleva a ninguna parte.
- **Resultado:** la card muestra los resultados para el usuario reales y el botón abre las respuestas de la encuesta.
- **Decisiones confirmadas:** `d-user-results`, `d-ver-respuestas` (`.cardenal/context.json`).
- **Documentación pertinente:** [docs/public/funcionalidades.md](../../docs/public/funcionalidades.md#estrategia-estrategiahtml).

## Historias de usuario

### HU1 — Resultados para el usuario correctos (P1)
Como lector, quiero ver en el canvas qué gana el usuario con el rediseño, para entender el valor de la propuesta más allá del negocio.

**Escenarios de aceptación**
1. **Dado** `estrategia.html`, sección Lean UX Canvas, **cuando** leo la card «Resultados para el Usuario», **entonces** veo exactamente estos 4 bullets, en este orden:
   - Realizar compras sin abandonar la plataforma.
   - Buscar y encontrar carreras más rápidamente.
   - Acelerar el registro a una carrera.
   - Guía práctica para subir de licencias.
2. **Dado** la misma card, **entonces** los bullets tienen el mismo estilo que las otras cards con lista, y la card «Resultados para el Negocio» no cambia.

### HU2 — Ver las respuestas de la encuesta (P1)
Como lector, quiero abrir las respuestas de la encuesta desde la página, para comprobar la evidencia.

**Escenarios de aceptación**
1. **Dado** la sección Encuestas, **cuando** hago click en «Ver respuestas», **entonces** se abre en una pestaña nueva `https://docs.google.com/spreadsheets/d/1PSs_GEPbFZEOwT5oAiEQkvclF1DfmOjBHSV1Y4nSWa4/edit?usp=sharing` y `estrategia.html` sigue abierta en la pestaña original.

## Requisitos funcionales
- **FR-001**: La card «Resultados para el Usuario» DEBE contener solo los 4 bullets de HU1.1, con el texto literal y en ese orden.
- **FR-002**: «Ver respuestas» DEBE enlazar a la URL de HU2.1 y abrirse en una pestaña nueva, siguiendo el patrón de enlaces externos del sitio (pestaña nueva y `noopener`).
- **FR-003**: No DEBE cambiar ningún otro elemento visible ni aparecer errores en la consola.
- **FR-004**: `llms.txt`, `docs/public/funcionalidades.md` y `docs/tech/sistema.md` DEBEN dejar de decir que «Ver respuestas» no lleva a ninguna parte y que la card está duplicada. `llms.txt` DEBE incluir los resultados para el usuario en la sección Objetivos.

## Entidades clave
- **Card del Lean UX Canvas**: título y lista de bullets.
- **Planilla de respuestas**: documento externo de Google Sheets. Es la misma URL que «Ver fuente» del Home.

## Estados de pantalla
Solo cambia contenido. El layout y el comportamiento responsive de la card y del botón quedan como están.

## Fuera de alcance
- Otros botones `href="#"` («Ver Alcance», siguientes elementos UX).
- Otros typos y cambios de estilo.

## Criterios de éxito
- QA manual: la card muestra los 4 bullets y el click abre la planilla en una pestaña nueva.

## Aclaraciones
Sin aclaraciones pendientes: los textos y la URL los dio el usuario literalmente.
