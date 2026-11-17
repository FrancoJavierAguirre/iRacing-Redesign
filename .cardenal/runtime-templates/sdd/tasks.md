# SDD · tasks

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.


Convertir el plan en tareas accionables.

1. Localizar la carpeta en `{{specs}}/`; leer `spec.md`, `plan.md` y `.cardenal/sdd/templates/tasks.md`.
2. Escribir `{{specs}}/<NNNN-slug>/tasks.md` con tareas chicas, aisladas y verificables:
   - **ID** (`T001`…), **rol** (`[front]` interfaz y componentes · `[back]` API, persistencia y contratos) y **rutas reales** de archivos.
   - Orden **TDD**: el test va antes que la implementación.
   - `[P]` solo si la tarea no comparte archivos ni estado con otra `[P]` del mismo bloque.
   - Agrupar por historia de usuario con un checkpoint al cierre de cada una ({{qualityGates}} + criterios de aceptación).
   - Declarar dependencias entre tareas y referenciar los FR que cubre cada una.
   - Tareas de cierre: actualizar {{docs.public}} y {{docs.tech}} si hay cambio funcional o técnico, commit, y el **check final humano** del usuario. PR solo si el usuario lo pide.
3. Verificar que cada FR del spec tiene al menos una tarea. Solo se escribe ese `.md`.
4. Reportar: cantidad de tareas, cuáles son `[P]` y FR sin cubrir.

Siguiente: `/sdd:analyze` (recomendado) y luego `/sdd:implement`.
