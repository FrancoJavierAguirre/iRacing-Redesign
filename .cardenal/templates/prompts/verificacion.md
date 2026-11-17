# Verificación

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.

Entrada: diff, aceptación, escenarios y elección QA de la feature.
- Ejecutar checks técnicos pertinentes y registrar resultados reales; mantener pruebas existentes y cubrir regresiones necesarias sin lanzar QA separado por defecto.
- Con QA manual (elegido por el usuario para esta feature), entregar al usuario pasos, resultados esperados y limitaciones para probar. No lanzar suite E2E nueva ni agente de navegador por iniciativa propia. Mantener review hasta el check explícito del usuario.
- Con QA automatizado elegido, el rol testing (agente testing) ejecuta la suite acordada. Usar un agente de navegador solo si workflow.qa.browser es true por elección del usuario. Registrar escenarios, entorno, comandos y resultados; si la capacidad no existe, informar y no simular la prueba.
- Ejecutar validate y board-check de Cardenal y los quality gates del repo (tests, chequeo de tipos y lint que el proyecto defina). La estructura no acredita comportamiento.
- Corregir fallos y repetir lo afectado, sin ampliar baterías sin motivo. QA automatizado tampoco sustituye el check final humano.
- Verificar que la feature se refleja en Markdown de docs/public y docs/tech y en sus índices, con reglas, integración y dependencias afectadas. Contrastar con código y escenarios; un spec completo no sustituye estos documentos.
Salida: evidencia, pasos de prueba manual y pendientes. No declarar éxito con comprobaciones omitidas.
Siguiente: cierre tras verificación y check del usuario; si falta, guardar checkpoint y dejar review.
