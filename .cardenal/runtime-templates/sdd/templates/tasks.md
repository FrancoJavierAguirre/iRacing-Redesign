# Tareas: [nombre de la feature]

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.


**Spec:** `spec.md` · **Plan:** `plan.md`
Formato: `- [ ] T001 [rol] [P?] Descripción — archivos — FR cubiertos — depende de`

## HU1 — [título]
- [ ] T001 [back] Test de … — `ruta/al/test` — FR-001
- [ ] T002 [back] Implementar … — `ruta/al/archivo` — FR-001 — depende de T001
- [ ] T003 [front] [P] Test de … — `ruta/al/test` — FR-002

**Checkpoint HU1:** {{qualityGates}} y escenarios de aceptación de HU1.

## Cierre
- [ ] Actualizar {{docs.public}} y {{docs.tech}} con el comportamiento implementado.
- [ ] Commit (Conventional Commits, archivos específicos).
- [ ] Pasos de prueba para el usuario y **check final humano**. PR solo si se pide.
