# Revisión humana — 0018 Superficie: Pruebas de Usabilidad

**Fecha:** 2026-11-20 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado

## Qué se revisó
`superficie.html` y `superficie.css` (`specs/0018-superficie-pruebas-usabilidad/`):
- sección Pruebas de Usabilidad: contexto y tareas (con «Intentar en prototipo»), Insights, cards de los tres usuarios (con «Ver video») y Conclusiones con la card «Filtros»;
- «Ir a Motion» de Componentes reemplazado por «Ir a Pruebas de Usabilidad» (la sección Motion se descartó);
- responsive.

## Evidencia
- **Del usuario:** pidió dos rondas de correcciones (radio 16 y 32 px entre cards; cards de igual altura por par; ítems en Poppins light 24 con íconos de 32 px a 16 px; pulgares de 40 px; card de Conclusiones en 24/40 con texto en color regular; luego Insights en 20/40 y pulgar abajo #E75149; «Leer guión completo» como página futura) y después respondió «Lo apruebo» en el chat el 2026-11-20. No objetó los demás supuestos (padding 24, botones de 48 px, separaciones de ~72 px, «Fede» en la tercera card, «CTA» en lugar de «C1A»), que quedan como se implementaron.
- **Del asistente (checks técnicos):**
  - 5 enlaces externos con `target="_blank" rel="noopener"` y 5 sin destino (Iteraciones, guión y tres cuestionarios), verificados en el DOM.
  - Estilos computados a 1920 px tras las correcciones: radio 16; Tarea 1 y 2 de 402 px y cards de Insights de 584 px (iguales); Insights Poppins 300 20/40; usuarios Poppins 300 24; íconos de 32 px con gap 16; pulgares de 40 px; card Filtros 24/40 con `.hl` en 400.
  - Revisión visual en servidor local a 1920, 900 y 375 px: sin scroll horizontal; consola sin errores.
  - `validate` y `board-check` válidos.

## Pendientes
- Iteraciones (#iteraciones), guión completo, páginas de cuestionarios y «Siguiente elemento UX».
