# SDD · clarify

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.


Resolver las ambigüedades del spec antes de planificar. Responsable: rol analyst (agente `analyst`).

1. Localizar la carpeta indicada en `specs/` (o la más reciente si no se indicó). Leer `spec.md`.
2. Detectar todos los `[NECESITA ACLARACIÓN: …]` y cualquier requisito interpretable de dos formas.
3. Preguntar al usuario **de a una**, priorizando lo que más impacta el diseño. Preferir opciones concretas con una recomendación.
4. Registrar cada respuesta en la sección `## Aclaraciones` del spec (`### Sesión AAAA-MM-DD` → `- **P:** … → **R:** …`), quitar el marcador y ajustar el requisito afectado. Registrar también la decisión confirmada en `.cardenal/context.json`.
5. No tomar el silencio como respuesta. Si una duda queda abierta, el spec no está listo.

Siguiente: `/sdd:plan`.
