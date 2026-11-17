---
name: inicializate
description: Preparar Cardenal y relevar el repositorio, sin solicitar ni implementar una feature.
---

# Inicializar el repositorio

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.


1. Identificar el directorio solicitado y el asistente; preguntar solo si no están claros. Usar sesión inicio salvo indicación del usuario. Leer AGENTS.md.
2. Si falta Cardenal en este checkout, informar la ubicación y pedir que se incorpore con A/B; no cambiar de rama, hacer merge, fast-forward, reset o traer commits por ejecutar este comando. Esas operaciones requieren un pedido explícito separado.
3. Ejecutar una vez `node .cardenal/cli.mjs inicializate . <asistente> <sesion>` (asistente: claude, astra, codex o copilot). No repetir durante el mismo relevamiento si ya funcionó. No normalizar archivos manualmente ante conflictos: la CLI tolera CRLF/LF; otras diferencias requieren revisión. Si el resultado trae warnings (por ejemplo, documentación ignorada por .gitignore), resolverlos con el usuario antes de seguir.
4. Cargar solo `node .cardenal/cli.mjs prompt . repositorio`. Relevar producto y técnica actuales, no un cambio futuro. Conservar context.json y board.json de features existentes. Si se retoma memoria, cargar solo el último checkpoint de la sesión indicada.
5. Ejecutar `node .cardenal/cli.mjs validate-repo .`. No ejecutar validate de feature como requisito del onboarding. Una ficha de cambio vacía no bloquea la inicialización.
6. Completar documentación .md en docs/public (producto) y docs/tech (dominio técnico, integración y dependencies), con índices y fuentes según el prompt repositorio. Reutilizar y enlazar la documentación existente sin duplicarla. Preguntar por bibliotecas custom o que requieran atención especial; no declarar terminado con esqueletos vacíos. Guardar los JSON de control en .cardenal, nunca en la documentación.
7. Completar `.cardenal/constitution.md` con los principios observados del proyecto (stack, convenciones, quality gates, reglas de datos y migraciones) y proponer `qualityGates` para `.cardenal/config.json` si el repo los define. Lo que no esté respaldado por fuentes queda como pregunta, no como regla.
8. Guardar checkpoint según la sección de memoria de .cardenal/README.md y cerrar con mapa del repositorio, dudas reales y el siguiente comando: `/feature <necesidad>`.

No pedir una feature, asignar roles, crear tareas de implementación, exigir un entorno para probar un cambio inexistente ni preguntar sobre promoción de ramas. Sí preguntar contradicciones o datos de producto/técnica necesarios para comprender el repositorio. No ejecutar migraciones ni escrituras en servicios para relevarlo. No afirmar certeza a partir de hipótesis.

Trabajar en la rama y checkout actuales. No crear ramas ni worktrees, cambiar de rama, hacer merge ni abrir PR automáticamente por cada feature. Solo hacerlo si el usuario lo solicita explícitamente. Si hay cambios previos que interfieren, explicar el conflicto y preguntar; no crear aislamiento por cuenta propia.
