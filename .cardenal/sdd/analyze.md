# SDD · analyze

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.


Validar que spec, plan y tareas sean coherentes antes de escribir código. Solo analiza: no escribe código de la feature.

1. Localizar la carpeta en `specs/`; leer `spec.md`, `plan.md` y `tasks.md`.
2. Escribir `specs/<NNNN-slug>/analysis.md` con severidad por hallazgo (crítico | alto | medio | bajo):
   - **Cobertura:** cada FR tiene tareas que lo implementan y tests que lo validan.
   - **Consistencia:** el plan respeta el spec y las tareas respetan el plan; no hay decisiones contradictorias.
   - **Constitución:** ningún artefacto viola `.cardenal/constitution.md` sin desviación justificada.
   - **Testing:** casos sin test y escenarios de error omitidos.
   - **Riesgos:** migraciones pendientes de aprobación, ambigüedades remanentes, dependencias frágiles.
3. Reportar la cantidad de hallazgos por severidad y si está en condiciones de implementar.

Siguiente: resolver hallazgos críticos y altos (volviendo a plan o tasks si hace falta) y luego `/sdd:implement`.
