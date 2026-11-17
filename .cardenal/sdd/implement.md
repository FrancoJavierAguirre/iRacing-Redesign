# SDD · implement

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.


Ejecutar la implementación siguiendo `tasks.md`.

1. Localizar la carpeta en `specs/`; leer `spec.md`, `plan.md`, `tasks.md`, `analysis.md` si existe y `.cardenal/constitution.md`.
2. Precondiciones: no quedan hallazgos críticos ni altos sin resolver. Si el plan declara una migración de datos o escrituras en servicios externos, mostrar el cambio y **pedir aprobación explícita** antes de ejecutarlo.
3. **Rama:** trabajar en la rama y checkout actuales. No crear ramas, worktrees ni PR salvo pedido explícito. Si el checkout está en la rama principal, avisar y preguntar antes de commitear.
4. **QA:** si falta workflow.qa, registrar manual por defecto. Automatizado y navegador solo por pedido explicito con referencia vigente.
5. Delegar cada tarea según su rol, en orden TDD:
   - `[front]` → agente `front`; `[back]` → agente `back`. Si una tarea no tiene rol, asignarlo por los archivos que toca. En asistentes sin subagentes, ejecutar el rol siguiendo `.claude/agents/<agente>.md`.
   - Las tareas `[P]` del mismo bloque pueden ir en paralelo; serializar las que comparten archivos.
   - Por historia: test primero (rojo) → implementación (verde) → checkpoint con los quality gates del repo (tests, chequeo de tipos y lint que el proyecto defina).
   - Commits con Conventional Commits por unidad lógica, agregando archivos específicos (nunca `git add .`).
   - Bugs encontrados durante la tarea: los corrige el mismo rol con test primero, sin ampliar el alcance.
   - Con QA automatizado, delegar la suite acordada en `testing`; con QA manual, no lanzarlo.
6. Marcar en `tasks.md` solo las tareas verificadas. Actualizar docs/public y docs/tech con el comportamiento implementado.
7. Verificar de punta a punta: los quality gates del repo (tests, chequeo de tipos y lint que el proyecto defina) y criterios de aceptación del spec. Reportar el resultado real; no afirmar éxito sin evidencia.
8. Si la feature tiene UI, verificarla en la app en ejecución (captura real, estados de carga, vacío, error, éxito y mobile) antes de darla por terminada.
9. Con QA manual, entregar pasos de prueba, resultado esperado y límites de lo verificado. La feature queda en **review** hasta el check final explícito del usuario.

Cierre: tareas completadas y pendientes, resultado de los checks, modo de QA, pasos de prueba manual y migraciones aplicadas (con su aprobación).
