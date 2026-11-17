---
name: fix
description: Use when the user runs /fix or asks to correct, adjust or extend behavior that already exists in el proyecto (bug, regresión, error en producción, cambio chico o agregado sobre algo ya especificado en {{specs}}/<NNNN-slug>/), en vez de iniciar una feature nueva.
---

# Corregir o ajustar algo existente

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.


En Codex, leer primero .cardenal/templates/codex.md: prevalece sobre defaults de QA, delegacion y entorno de este flujo.

El usuario indica `/fix <qué pasa o qué cambiar>`. El fix trabaja SOBRE la feature dueña de ese comportamiento: su spec, plan, tareas, documentación e implementación son el contexto. No crea una carpeta de specs nueva ni reemplaza la ficha activa de Cardenal.

1. **Entender el pedido:** comportamiento observado vs esperado (bug) o cambio pedido (ajuste o agregado), dónde se vio (app, ruta, customer, versión desplegada), si antes funcionaba (regresión) y evidencia (error, log, captura). Si falta algo que cambie el comportamiento o el alcance, preguntar en texto plano antes de seguir.
2. **Ubicar la feature dueña:** buscar el módulo, la ruta o el término en `{{specs}}/*/spec.md`, `plan.md` y `tasks.md`, en los índices `{{docs.public}}/README.md` y `{{docs.tech}}/README.md`, y en `git log -- <archivos afectados>`. Leer solo los FR/SC pertinentes, las notas de tareas relacionadas y el código involucrado.
   - Dueña = la feature cuyo FR define **exactamente** el comportamiento pedido; si varias lo tocan, la más reciente que lo define. Las demás se listan como relacionadas.
   - Declararlo: `Feature dueña: {{specs}}/<NNNN-slug> (FR-x, T-y) · relacionadas: <NNNN>, …`.
   - Ficha activa de Cardenal: es la dueña si `.cardenal/board.json` → `agreements.analyst.path` apunta a su `spec.md`.
3. **Clasificar y decidir el camino:**
   - **Tarea pendiente:** si el pedido cae en una tarea o checkpoint todavía sin tildar de la dueña, se completa esa tarea (con nota) en lugar de abrir un addendum.
   - **Bug:** contradice la spec o rompe algo que funcionaba → fix.
   - **Ajuste o agregado chico** dentro del alcance de la dueña → fix con addendum.
   - **Escala a `/feature`** (proponerlo y esperar OK) si no hay feature dueña, si crea un módulo, pantalla o flujo nuevo, si cambia contratos entre apps (`@noc/shared`, API interna) o si necesita un modelo de datos nuevo.
4. **QA:** manual por defecto. Automatizado solo por pedido explicito con referencia vigente.
5. **Registrar en la feature dueña**, con ediciones puntuales (nunca reescribir el archivo completo):
   - `tasks.md`: al final del archivo (antes de la matriz o las dependencias finales si existen), `## Addendum <AAAA-MM-DD> — fix: <título>`. Las tareas siguen la numeración del archivo (`T<último+1>`), con rol `[back]`/`[front]` en orden TDD y `[HUMANO]` para el QA si es manual.
   - `spec.md`: solo si cambia el comportamiento esperado, `## Clarificaciones <AAAA-MM-DD>` con el FR nuevo o ajustado.
   - Cardenal: si la dueña es la ficha activa, sumar el hecho o la decisión con su fuente y correr `node .cardenal/cli.mjs validate .`. Si no lo es, no tocar `.cardenal/context.json`; su ficha preservada en `{{specs}}/<NNNN-slug>/cardenal/` queda como referencia.
6. **Implementar con TDD:** primero un test que reproduce el bug o fija el comportamiento nuevo (rojo), después el cambio mínimo (verde), sin ampliar alcance. Rol por archivos: UI → agente `front`; actions, API, Prisma o infraestructura → agente `back`. Si la causa no es evidente, debugging sistemático: hipótesis → evidencia en código o logs → test → fix. Migraciones y cambios de infraestructura: mostrar el SQL o el bloque y esperar aprobación explícita (Artículo II).
7. **Gates** en cada app tocada: checks pertinentes a los archivos afectados segun la politica de ejecucion; comparar contra el drift preexistente conocido y reportar números reales.
8. **Commits:** verificar la rama antes de cada commit con `[ "$(git branch --show-current)" != main ] || { echo EN MAIN; exit 1; }`; Conventional `fix(<scope>): …` (o `feat(<scope>): …` para un agregado); archivos específicos, nunca `git add .`; sin push ni deploy salvo pedido.
9. **Documentación:** actualizar `{{docs.public}}` y `{{docs.tech}}` si cambió el comportamiento, un límite o una dependencia. Con QA manual, en `{{docs.private}}/reports/qa-manual-pendiente.md` (sección de la dueña): si un ítem ya cubre el caso, destildarlo y anotar debajo `> re-probar tras fix <AAAA-MM-DD>`; si no, sumar un ítem `- [ ]` nuevo.
10. **Cierre:** reportar feature dueña, causa raíz (si es bug), cambio, tests, gates, commits, documentación y pasos de QA. Clasificar session memory según AGENTS.md. El fix queda en review hasta el OK del team lead.

Trabajar en la rama y checkout actuales. No crear ramas ni worktrees, cambiar de rama, hacer merge ni abrir PR salvo pedido explícito.
