---
name: proyect
description: Crear un proyecto desde un repositorio local usando solo su estado commiteado.
---

# Crear proyecto desde template

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.


Aplicar .cardenal/templates/execution-policy.md.
1. Identificar referencia, revision, destino vacio y objetivo. No modificar el origen.
2. Copiar solo el commit elegido con git archive; excluir secretos y conservar historial fuera del proyecto nuevo. No copiar working tree, dependencias ni sesiones.
3. Instalar Cardenal desde su distribucion vigente y conservar rutas/configuracion del proyecto. No copiar fichas, boards ni historiales de features del template como estado activo.
4. Inventariar integraciones del template (login, datos, analytics, leads u otras) y preguntar cuales conservar. No conectar servicios ni datos compartidos por inferencia. Las integraciones especificas de NOC se describen en el proyecto consumidor, no se presuponen en el framework.
5. Aplicar identidad y configuracion autorizadas. Relevar con inicializate, que genera code-map; documentar en docs/public y docs/tech.
6. Verificar lo afectado segun contrato; QA manual y sin Docker salvo pedido expreso. No crear remote, publicar, hacer push ni deploy sin pedido.

<!-- cardenal:managed -->
