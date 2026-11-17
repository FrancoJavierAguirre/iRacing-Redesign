# Cardenal — opción B

Copiar TODO el contenido de esta carpeta, incluidas carpetas ocultas, a la raíz del proyecto. Aceptar el reemplazo de AGENTS.md, CLAUDE.md y .github/copilot-instructions.md: esta variante entrega las instrucciones de Cardenal completas. Para conservar instrucciones previas, usar opción A.

Abrir el proyecto con el asistente y usar /inicializate en Claude Code; en otros asistentes seleccionar la skill inicializate o pedir: «Seguí .cardenal/templates/inicializate.md». El asistente ejecuta el arranque, crea .cardenal/config.json y la documentación base, y releva el repositorio sin pedir una feature. Luego usar /feature seguido de la necesidad: el spec, el plan, las tareas y la implementación se hacen con /sdd:specify, /sdd:clarify, /sdd:plan, /sdd:tasks, /sdd:analyze y /sdd:implement. Ambos comandos usan la rama y checkout actuales; no crean ramas, worktrees ni PR ni hacen merge sin pedido explícito. Requiere Node >=22 y Git; no descarga dependencias.

Esta copia usa la configuración por defecto (docs/public, docs/tech, docs/private ignorado, specs/ y agentes analyst, front, back y testing). Para otras rutas o nombres de agentes, editar .cardenal/config.json y ejecutar `node .cardenal/cli.mjs upgrade .`.

El usuario es el team lead; no hay agentes lead ni infraestructura. QA manual por defecto; automatizado y Docker solo por pedido explicito. Forge y Front usan los agentes registrados de Cardenal con modelo inferior; siempre se requiere el check final humano.

Versionar .cardenal, instrucciones, skills, comandos y agentes de integración, specs/, docs/public y docs/tech. La ficha del MVP está en .cardenal/templates/ficha-mvp-del-equipo.md. Solo las sesiones locales (user-memory/) y docs/private son privados dentro de este flujo; conservar exclusiones habituales de secretos, dependencias y builds.
