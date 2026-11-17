# Tareas: Lean UX Canvas — resultados para el usuario y enlace «Ver respuestas»

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.


**Spec:** `spec.md` · **Plan:** `plan.md`
Formato: `- [ ] T001 [rol] [P?] Descripción — archivos — FR cubiertos — depende de`
Sin tests automatizados (Art. III): cada tarea lleva un check acotado con Grep y verificación manual en lugar de test previo.

## HU1 — Resultados para el usuario correctos
- [x] T001 [front] Reemplazar los 2 `<li>` de la card «Resultados para el Usuario» (línea 187) por los 4 bullets del spec, texto literal y en orden, sin `<span class="hl">`; no tocar la card de negocio (línea 186). Check: Grep de los 4 textos en `estrategia.html` (4 coincidencias, todas en la línea 187) y de «Aumentar un 20%» (solo en la línea 186). Manual: abrir `estrategia.html#lean` y ver 4 bullets con el mismo estilo que las otras cards. — `estrategia.html` — FR-001, FR-003

**Checkpoint HU1:** sin quality gates definidos en el repo (`qualityGates` vacío). QA manual de los escenarios HU1.1 y HU1.2 en 1920 px y en 1300/900/640 px, sin errores en la consola.

## HU2 — Ver las respuestas de la encuesta
- [x] T002 [front] En «Ver respuestas» (línea 119) reemplazar `href="#"` por `href="https://docs.google.com/spreadsheets/d/1PSs_GEPbFZEOwT5oAiEQkvclF1DfmOjBHSV1Y4nSWa4/edit?usp=sharing" target="_blank" rel="noopener"`, manteniendo las clases. Check: Grep de `1PSs_GEPbFZEOwT5oAiEQkvclF1DfmOjBHSV1Y4nSWa4` en `estrategia.html` (línea 119, con `target="_blank" rel="noopener"`) y de que `href="#"` ya no esté en la 119. Manual: click en el botón abre la planilla en pestaña nueva y `estrategia.html` sigue abierta. — `estrategia.html` — FR-002, FR-003 — depende de T001 (mismo archivo)

**Checkpoint HU2:** sin quality gates definidos. QA manual del escenario HU2.1, sin errores en la consola y sin otros cambios visibles en la página.

## Cierre
- [x] T003 [front] Actualizar la documentación: `llms.txt` (línea 37 sin «Ver respuestas»; sección Objetivos con un bullet de resultados para el usuario con los 4 puntos), `docs/public/funcionalidades.md` (línea 51 sin «Ver respuestas» ni la nota de la card duplicada; indicar que abre la planilla de respuestas), `docs/tech/sistema.md` (línea 71 sin el `119`: queda 57, 200, 203). Check: Grep de «todavía no llevan a ninguna parte» y «repite el texto» (sin coincidencias sobre «Ver respuestas» o la card) y de `119` en `sistema.md` línea 71. — `llms.txt`, `docs/public/funcionalidades.md`, `docs/tech/sistema.md` — FR-004 — depende de T002
- [x] Commit (Conventional Commits, archivos específicos: los 4 archivos anteriores más `specs/0002-canvas-resultados-usuario/`).
- [x] Pasos de prueba para el usuario y **check final humano**. PR solo si se pide.
