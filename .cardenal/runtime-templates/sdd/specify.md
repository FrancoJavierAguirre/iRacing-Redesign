# SDD · specify

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.


Iniciar el ciclo SDD de una feature. Responsable: rol analyst (agente `{{roles.analyst}}`).

1. Leer `.cardenal/constitution.md` y la plantilla `.cardenal/sdd/templates/spec.md`. Si `.cardenal/context.json` tiene la ficha de esta feature (actor, problema, alcance, aceptación, decisiones confirmadas), usarla como entrada y no volver a preguntar lo ya confirmado.
2. Derivar la carpeta: revisar `{{specs}}/` y tomar el siguiente número correlativo de 4 dígitos + kebab-case (por ejemplo `{{specs}}/0003-filtros-por-materia/`).
3. Si hay un diseño de referencia (Figma, capturas, mockups), registrarlo en el spec como fuente y describir la pantalla a partir de él; no inventar UI.
4. Escribir `{{specs}}/<NNNN-slug>/spec.md` desde la plantilla: qué y por qué, NUNCA el cómo técnico. Historias de usuario con escenarios verificables, requisitos funcionales numerados (FR-001…), entidades clave, estados de pantalla si hay UI (carga, vacío, error, éxito, responsive) y criterios de éxito medibles.
5. Marcar cada ambigüedad con `[NECESITA ACLARACIÓN: …]`; no completarla con supuestos.
6. Reportar: ruta del spec, aclaraciones pendientes y siguiente paso.

Siguiente: `/sdd:clarify` si quedaron aclaraciones; si no, `/sdd:plan`.
