# Selección de roles

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.

Entrada: alcance y dudas de la feature, tablero actual.
- El usuario es el team lead y da el check final; no asignar agentes lead ni infra. Consultar .cardenal/team.md solo al asignar trabajo.
- Elegir roles mínimos entre analyst (agente {{roles.analyst}}), front (agente {{roles.front}}) y back (agente {{roles.back}}); light para cambios localizados, standard para cambios transversales. Consultar dudas reales de roles antes de asignar y registrar workflow.questions.
- QA manual por defecto; registrar workflow.qa.mode=manual y browser=false. Solo seleccionar testing con pedido explicito y su referencia.
- El ejecutor mantiene checks técnicos pertinentes aunque QA sea manual. Roles declarados no equivalen a agentes ejecutados.
Salida: workflow, tarjetas y dependencias; acuerdo analyst en standard. Ejecutar board-check. No simular acuerdos ni revisiones.
Siguiente: implementación una vez resueltos los bloqueos y preparados los artefactos SDD.
