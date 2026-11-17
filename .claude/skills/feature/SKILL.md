---
name: feature
description: Iniciar o retomar una feature con Cardenal, partiendo del contexto del repositorio y siguiendo SDD hasta verificación y revisión.
---

# Trabajar una feature

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.


El usuario solo debe indicar `/feature <necesidad>`. Este flujo incorpora reutilización de contexto, preguntas pertinentes, specs, roles mínimos, verificación y checkpoint; no pedir que el usuario repita estas instrucciones.

1. Usar la necesidad indicada junto al comando; si no se indicó, preguntar actor, problema y resultado esperado. Esta pregunta pertenece a feature, no a inicializate.
2. Leer los índices docs/public/README.md y docs/tech/README.md y abrir solo las fichas funcionales/técnicas y dependencias pertinentes. Consultar .cardenal/repository-context.json y revalidar solo las fuentes pertinentes. Si el repositorio no fue relevado, ejecutar primero inicializate. No cambiar de rama ni hacer merge sin un pedido explícito.
3. Cargar únicamente el prompt activo mediante `node .cardenal/cli.mjs prompt . <etapa>`: relevamiento, seleccion-roles, implementacion, verificacion, cierre. Retomar donde indique la evidencia, sin cargar todos a la vez.
4. Preservar contexto y tareas anteriores antes de preparar la ficha del nuevo cambio. Registrar actor, alcance, aceptación, decisiones y dudas en .cardenal/context.json. Consultar entorno de pruebas cuando el cambio lo requiera, especialmente si hay datos compartidos. No deducir aprobación ni simular revisores.
5. Usar validate y board-check para la feature. Especificar, planificar e implementar con el flujo SDD en `specs/<NNNN-slug>/`, pasando la ficha de .cardenal/context.json como entrada: `/sdd:specify` → `/sdd:clarify` (si hay ambigüedades) → `/sdd:plan` → `/sdd:tasks` → `/sdd:analyze` → `/sdd:implement`. En asistentes sin esos comandos, seguir directamente `.cardenal/sdd/<etapa>.md`. Completar tasks.md no prueba código verificado. Si se autorizó implementar, continuar tras resolver bloqueos; si solo se pidió planificar, detenerse allí.
6. El usuario actúa como team lead; no crear agentes lead ni infra. Roles → agentes: analyst = analyst, front = front, back = back, testing = testing. QA manual por defecto; registrar workflow.qa. Automatizado solo por pedido explicito con referencia, sin heredar permisos de otra feature. Mantener los quality gates del repo y esperar el check final humano para cerrar.
7. Actualizar en la misma feature docs/public y docs/tech con el comportamiento realmente implementado, sus límites y dependencias afectadas. Enlazar fichas desde sus índices; specs/<NNNN-slug> documenta el cambio pero no reemplaza la documentación vigente del sistema. Si falta implementación o verificación, marcarlo como pendiente.
8. Si el proyecto tiene memoria compartida propia (indicada en AGENTS.md), registrar allí las decisiones durables; el checkpoint de sesión va a user-memory. Cerrar con evidencia y revisión real según los contratos de Cardenal.

Alternativa de terminal: `node .cardenal/cli.mjs feature .` muestra el prompt de relevamiento. No inicia un modelo ni ejecuta automáticamente la feature. En interfaces sin slash commands pedir que siga .cardenal/templates/feature.md.

Trabajar en la rama y checkout actuales. No crear ramas ni worktrees, cambiar de rama, hacer merge ni abrir PR automáticamente por cada feature. Solo hacerlo si el usuario lo solicita explícitamente. Si hay cambios previos que interfieren, explicar el conflicto y preguntar; no crear aislamiento por cuenta propia.
