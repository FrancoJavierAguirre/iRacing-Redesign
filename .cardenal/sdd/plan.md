# SDD · plan

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.


Traducir el spec a un plan técnico, sin escribir código.

1. Localizar la carpeta en `specs/` y leer `spec.md` (debe estar aclarado). Leer `.cardenal/constitution.md`, `.cardenal/sdd/templates/plan.md` y las fichas pertinentes de `docs/tech`.
2. Mapear los módulos reales del repo que se tocan, buscando rutas concretas antes de leer archivos.
3. Escribir `specs/<NNNN-slug>/plan.md` desde la plantilla: contexto técnico, estructura de archivos a crear/modificar, contratos (entradas, salidas, errores), modelo de datos si cambia (`data-model.md` si es complejo) e investigación de opciones (`research.md` si hace falta).
4. Si hay diseño de referencia, mapearlo a los componentes, tokens y estilos existentes del proyecto; no copiar estilos a ciegas.
5. Si la feature requiere migración de datos o cambios en servicios externos, describir el cambio, el impacto y la reversibilidad **sin ejecutarlo**: requiere aprobación explícita del usuario al implementar.
6. Completar el chequeo contra la constitución y justificar cualquier desviación.
7. Restricción: solo se escriben archivos `.md` dentro de `specs/<NNNN-slug>/`. No modificar código fuente.

Siguiente: `/sdd:tasks`.
