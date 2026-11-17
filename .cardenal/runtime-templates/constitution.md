# Constitución del proyecto

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.


**Versión:** 0.1.0 · Pertenece al proyecto: Cardenal la crea una vez y no la sobrescribe.

Estado: pendiente de relevamiento. `/inicializate` la completa con principios **respaldados por fuentes** del repositorio; lo que no tenga fuente queda como pregunta. Cada principio debe ser accionable y verificable por un agente. Subir la versión al cambiarla (PATCH aclaraciones · MINOR principio nuevo · MAJOR regla que rompe las previas).

## Artículo I — Alcance
Solo se implementa lo pedido. El trabajo fuera de alcance se registra como pendiente, no como código parcial.

## Artículo II — Datos y servicios externos
Ninguna migración de datos ni escritura en servicios externos se ejecuta sin aprobación explícita del usuario, mostrando antes el cambio y su impacto.

## Artículo III — Pruebas
Test primero en cada tarea (TDD). Los quality gates del proyecto: {{qualityGates}}.

## Artículo IV — Git
Rama y checkout actuales; sin ramas, worktrees ni PR automáticos. Conventional Commits con archivos específicos.

## Artículo V — Seguridad
No exponer secretos ni registrar datos sensibles. {{docs.privatePolicy}}.

## Artículo VI — Stack y convenciones
Pendiente: completar con el stack, la estructura y las convenciones observadas en el repositorio.
