# Cierre y continuidad

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.

Entrada: resultados verificados, decisiones, dudas y próximos pasos.
- Mantener documentación vigente del producto en {{docs.public}} y dominio técnico, integración y dependencias en {{docs.tech}}. Los JSON de contexto/tablero están en .cardenal y los specs en {{specs}}/<NNNN-slug>/. No dejar conocimiento del equipo solamente en user-memory; si AGENTS.md define una memoria compartida del proyecto, registrar ahí las decisiones durables.
- Actualizar tablero y {{specs}}/<NNNN-slug>/tasks.md con evidencia real; no marcar como completo trabajo incompleto.
- Consultar la sección de memoria de .cardenal/README.md. Guardar un borrador en user-memory/sessions/<sesion>/draft.json y ejecutar checkpoint. Conservar dudas y referencias vigentes sin secretos ni transcripciones. Si excede el límite, resumir explícitamente, sin truncar dudas.
- Para continuar en otra conversación, indicar resume con la sesión elegida: carga solo el último checkpoint y revalida fuentes. No afirmar compactación nativa ni ahorro medido.
- Antes del cierre, comprobar documentación pública y técnica de la feature y enlaces en índices. Dejar explícitos los pendientes y actualizar contexto del repositorio si cambió.
Salida al usuario: qué cambió, qué se verificó, limitaciones y próximo paso, de forma breve. No duplicar los artefactos completos.

En light y standard, done requiere check final humano explícito del usuario (team lead). QA automatizado es opcional por feature y no reemplaza ese check. Con QA manual, el usuario realiza las pruebas con los pasos entregados. No atribuir aprobación sin respuesta real; dejar review y guardar checkpoint mientras falte. Un tasks.md completo no acredita implementación, pruebas ni aprobación.
