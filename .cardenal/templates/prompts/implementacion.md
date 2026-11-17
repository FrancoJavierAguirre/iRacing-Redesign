# Implementación

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.

Entrada: cambio solicitado, ficha (.cardenal/context.json), tarjeta asignada y artefactos SDD pertinentes en specs/<NNNN-slug>/.
- Resolver dudas que alteren comportamiento antes de implementar esa parte. No inventar una feature si solo se pidió inicializar.
- Antes de modificar código, preparar spec, plan y tareas con el flujo SDD: /sdd:specify (analyst, con la ficha como entrada) → /sdd:clarify si quedan [NECESITA ACLARACIÓN] → /sdd:plan → /sdd:tasks → /sdd:analyze → /sdd:implement. Respetar .cardenal/constitution.md y las plantillas de .cardenal/sdd/templates; no crear otro esquema de specs.
- Cargar solo el archivo de la etapa activa (.cardenal/sdd/<etapa>.md) y sus dependencias. No leer todos los prompts ni copiar reglas entre documentos.
- Delegar cada tarjeta en el agente de su rol: front → front, back → back, analyst → analyst; testing → testing solo con QA automatizado elegido por el usuario. En asistentes sin subagentes, ejecutar el rol siguiendo su archivo de agente.
- Referenciar IDs de decisiones, requisitos (FR) y escenarios del spec. No marcar tareas terminadas antes de verificarlas.
- Implementar el alcance acordado; ante hallazgos que lo cambien, registrar la duda y preguntar. Preservar cambios ajenos.
- Consultar índices docs/public y docs/tech, cargar solo fichas pertinentes y referencias de docs/tech/dependencies. Actualizar ambas perspectivas con la feature implementada; no dejar el conocimiento vigente solo en specs/<NNNN-slug>. No sobrescribir documentación ajena ni convertir planes en capacidades existentes.
Salida: cambio y tareas actualizados, evidencia disponible y pendientes reales.
Siguiente: verificacion.

Completar /sdd:tasks o /sdd:analyze acredita artefactos de planificación, no código probado. Si el usuario autorizó implementar el cambio, continuar a /sdd:implement después de planificar y resolver bloqueos; no pedir de nuevo la misma autorización solo porque termine un comando. Si pidió únicamente planificar, detenerse allí. Migraciones de datos y escrituras en servicios externos siguen requiriendo aprobación explícita del usuario.

Trabajar en la rama y checkout actuales. No crear ramas ni worktrees, cambiar de rama, hacer merge ni abrir PR automáticamente por cada feature. Solo hacerlo si el usuario lo solicita explícitamente. Si hay cambios previos que interfieren, explicar el conflicto y preguntar; no crear aislamiento por cuenta propia.
