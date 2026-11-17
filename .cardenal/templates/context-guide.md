# Contexto de Cardenal

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.


`context.json` es un registro compartible del cambio activo. No guardar secretos, transcripciones privadas ni sesiones personales. No reemplaza los specs de cada feature en specs/.

## Formato v1

- `sources`: IDs únicos globalmente. `kind: user`, `reference`: referencia explícita a una respuesta real; o `kind: file`, `reference`: ruta relativa con `/`, `sha256`: hash del contenido actual. No se admiten rutas privadas ni enlaces simbólicos.
- `facts`: `id`, `area` (`product`/`technical`), `statement`, `status` (`confirmed`/`observed`/`proposed`/`superseded`), `source` (ID). Confirmado requiere fuente de usuario; observado requiere archivo. Una propuesta puede carecer de fuente. Reemplazado incluye `replacedBy` con el ID vigente.
- `questions`: `id`, `question`, `blocking` (booleano para el cambio activo), `status` (`open`/`resolved`/`deferred`). Resolver requiere `resolution` apuntando a una decisión confirmada. Posponer una pregunta bloqueante no desbloquea la tarea.
- `change`: `actor`, `problem`, `outcome`, `scope`, `acceptance`, `valueSignal` y `evidence` (IDs de hechos vigentes que sustentan esta ficha).

Para calcular un hash en PowerShell: `(Get-FileHash -LiteralPath 'ruta/al/archivo' -Algorithm SHA256).Hash.ToLowerInvariant()`. Volver a inspeccionar el archivo si cambió antes de actualizar su hash; no actualizarlo sólo para silenciar la validación.

## Uso

Para asignación y entregas, consultar [equipo y tablero](team.md). `board-check` valida el tablero compartido y `task-package` prepara una tarjeta ready/active con sus referencias; ninguno ejecuta agentes ni carga memoria ajena.

Invocar `/cardenal-relevar` en Claude Code o pedir que use esa skill. La disponibilidad en la pestaña Code de Desktop debe comprobarse en la instalación utilizada.

Desde la raíz: `node .cardenal/cli.mjs inspect .` y `node .cardenal/cli.mjs validate .`.

La CLI sólo inventaría rutas y verifica estructura, referencias y vigencia de archivos. No entrevista, decide ni llama a un modelo: la skill guía esa conversación. Una fuente de usuario se declara en el registro; la CLI no puede comprobar que la respuesta fue auténtica. Revisar semánticamente antes de pasar a `/sdd:specify`.

`validate`: salida 0 = listo para revisión, 2 = registro válido pero incompleto/bloqueado, 1 = inválido/error. El JSON inicial es deliberadamente incompleto.

## Memoria local

La memoria local usa un identificador de sesión, inicio por defecto, sin perfiles de desarrollador (letras minúsculas, números, guion o guion bajo). En un repo Git con memoria ignorada, crear `user-memory/sessions/<session>/draft.json` con:

```json
{
  "objective": "Objetivo del cambio activo",
  "summary": "Resumen explícito del trabajo observado",
  "decisions": ["ID de decisión compartida y referencia; no inventar confirmaciones"],
  "questions": ["Dudas todavía abiertas"],
  "nextSteps": ["Próxima acción verificable"],
  "sources": [{"reference": "ruta/archivo", "sha256": "hash real del archivo inspeccionado"}]
}
```

El ejemplo es un esquema ilustrativo: reemplazar las referencias y calcular hashes reales. Las listas pueden estar vacías si no hay elementos que registrar.

```text
node .cardenal/cli.mjs checkpoint . <session> user-memory/sessions/<session>/draft.json
node .cardenal/cli.mjs resume . <session>
```

El checkpoint admite hasta 16000 bytes de payload: rechaza excesos sin truncar dudas. Resume carga solo el último y devuelve código 2 si hay fuentes obsoletas. Los anteriores permanecen en disco. La reducción es selección de contexto, no compactación automática del asistente ni un cálculo de tokens. Revisar decisiones y dudas contra el registro compartido, que sigue siendo la fuente durable del equipo.

La memoria se vincula al checkout por su ruta real; otro clon no la hereda. Los perfiles evitan mezclas accidentales, pero no son permisos de acceso: una máquina compartida requiere cuentas y permisos del sistema operativo. No guardar credenciales; no hay detección infalible de secretos en texto libre. No versionar ni sincronizar estas carpetas. Si un proceso se interrumpe dejando `writer.lock`, comprobar que no haya otro escritor antes de retirarlo manualmente.

La integración agrega skills, comandos `/sdd:*`, agentes por rol y herramientas en `.cardenal/`; en `CLAUDE.md`, `AGENTS.md` y `.github/copilot-instructions.md` solo agrega un bloque delimitado y conserva el resto. init solo copia los archivos; inicializate además mapea instrucciones y prepara la memoria local; upgrade actualiza una instalación anterior.

El formato de memoria v2 no importa sesiones antiguas por desarrollador. La migración es deliberadamente incompatible: no copiar historiales automáticamente. Mantener las decisiones de negocio en docs/public, docs/tech y specs/, versionados.

## Repositorio y feature separados

/inicializate genera repository-context.json con schemaVersion, sources, facts y questions; no tiene change. validate-repo verifica este registro y admite producto observado con fuente, sin exigir decisiones de una feature. /feature usa ese contexto como base y registra su alcance en context.json y tareas en board.json. validate sigue siendo estricto para una feature: no se debilitó esa validación.

## Documentación vigente

Los JSON repository-context.json, context.json y board.json viven en .cardenal. La documentación Markdown para personas vive en docs/public (producto/stakeholders), docs/tech (dominio técnico, integración y dependencies) y docs/private (información confidencial; docs/private queda local e ignorado por Git para información confidencial). Los índices README.md permiten recuperar contexto selectivamente al comenzar una conversación. specs/<NNNN-slug>/ conserva spec, plan y tareas de cada cambio; cada feature actualiza también la documentación vigente en ambas audiencias. No copiar información confidencial de private a public ni a registros compartidos: referenciar archivos cuando corresponda.

Las librerías propias confidenciales del cliente se resumen en docs/private/dependencies; las compartibles en docs/tech/dependencies, con propósito, versión y uso observado. Preguntar por dependencias de consideración especial. node_modules solo se consulta de forma dirigida; no se incorpora al inventario ni se copia su contenido. Los resúmenes tienen referencias a los archivos consultados y se revalidan al cambiar versión.

Al actualizar desde versiones anteriores, mover los tres JSON de doc/cardenal a .cardenal sin perder hechos, tarjetas ni aprobaciones. Si existen ambos destinos con datos distintos, detener la migración y resolver el conflicto; nunca reemplazar por esqueletos. Actualizar referencias y hashes después de revisar las fuentes. Conservar documentos ajenos y evidencias históricas; reorganizarlos solo con trazabilidad. No mover contenido de docs/private a tech ni public sin autorización.

### Público, técnico y confidencial

- docs/public: funcionalidades y reglas comprensibles para producto y stakeholders, en Markdown.
- docs/tech: funcionalidades técnicas, dominio, integración y dependencies compartibles, en Markdown versionado.
- docs/private: notas confidenciales y bibliotecas propietarias del cliente en dependencies/ cuando corresponda; docs/private queda local e ignorado por Git para información confidencial. No usar para credenciales ni datos personales reales. No inferir que una biblioteca es confidencial solo por ser custom: preguntar.

Leer primero los índices public/tech y después las fichas necesarias. Consultar private solo si el trabajo requiere esa información y mantener su contenido fuera de artefactos compartidos. La pregunta inicial sobre librerías especiales incluye si sus detalles son compartibles o confidenciales.

## Archivos compartidos por Git

.cardenal se versiona completo como parte del proyecto: runtime, plantillas y JSON de contexto/tablero. También se versionan las instrucciones, skills, comandos y agentes de integración (AGENTS.md, CLAUDE.md, .github, .claude y .agents según corresponda), specs/, docs/public y docs/tech. Que una carpeta empiece con punto no significa que sea privada.

El estado de sesión del usuario en user-memory queda ignorado, al igual que la ruta legacy de sesiones .local/sdd; docs/private queda local e ignorado por Git para información confidencial. Esto no elimina exclusiones habituales de credenciales, node_modules o builds ni implica versionar caches o worktrees del asistente.

La ficha para participantes está en .cardenal/templates/ficha-mvp-del-equipo.md tras incorporar Cardenal. Completar una copia como acuerdo del equipo, sin datos confidenciales.

## Configuración del proyecto

`.cardenal/config.json` pertenece al proyecto: se crea una vez y upgrade no lo sobrescribe.

- `docs.public`, `docs.tech`, `docs.private`: rutas de la documentación (por defecto `docs/public`, `docs/tech`, `docs/private`; las instalaciones 0.x con `doc/` se detectan y se respetan).
- `privateDocsTracked`: `false` ignora `docs.private` en Git; `true` respeta un repo que ya lo versiona.
- `specs`: carpeta de specs por feature (`specs` por defecto).
- `roles`: nombre del agente de cada rol (analyst, front, back, testing). Permite mapearlos a agentes propios del proyecto.
- `generateAgents`: `false` si el proyecto ya define sus agentes y no quiere los genéricos de Cardenal.
- `qualityGates`: comandos que se exigen al verificar (por ejemplo `npm test`, `npx tsc --noEmit`, `npm run lint`).

Después de cambiarla, ejecutar `node .cardenal/cli.mjs upgrade .` para regenerar instrucciones, comandos y agentes con los valores nuevos.

## Flujo SDD

`/feature` orquesta; el trabajo de cada etapa se hace con `/sdd:specify` → `/sdd:clarify` (si hay ambigüedades) → `/sdd:plan` → `/sdd:tasks` → `/sdd:analyze` → `/sdd:implement`. La fuente de cada etapa es `.cardenal/sdd/<etapa>.md` y las plantillas viven en `.cardenal/sdd/templates/`. Los principios del proyecto están en `.cardenal/constitution.md`, que pertenece al proyecto y se completa en /inicializate.
