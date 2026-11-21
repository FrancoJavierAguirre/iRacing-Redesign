# Revisión humana — 0019 Superficie: Iteraciones

**Fecha:** 2026-11-21 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado

## Qué se revisó
`superficie.html` y `superficie.css` (`specs/0019-superficie-iteraciones/`):
- sección Iteraciones: License Progress (gif provisorio, «Solución para nuevos usuarios», bullets y «Probar funcionalidad»), All Series (Antes/Después provisorios y el SVG anotado), Filtros y búsqueda, y Registro a la carrera, cada una con su «Probar…»;
- «Ir a Iteraciones» de Pruebas de Usabilidad con destino; «Ir a Prototipo» sin destino;
- responsive.

## Evidencia
- **Del usuario:** corrigió las distancias (32 px horizontales entre imágenes; distancia vertical siempre de 56 px) y el texto del segundo botón («Ir a Prototipo»), y luego respondió «Lo apruebo» en el chat el 2026-11-21. No objetó usar el cuarto enlace para «Probar registrarse» ni las imágenes provisorias, que quedan como se implementaron.
- **Del asistente (checks técnicos):**
  - A 1920 px (medido): gif de 1163 px y texto a 32 px; 72 px entre título, bullets y botón; Exo 2 36/24; Antes/Después a 56 px de su imagen y con 32 px entre imágenes; 56 px de las imágenes al SVG.
  - 4 enlaces externos con `target="_blank" rel="noopener"`.
  - Revisión visual en servidor local a 1920, 900 y 375 px: sin scroll horizontal; consola sin errores.
  - `validate` y `board-check` válidos.

## Pendientes
- Imágenes y gif finales de Iteraciones (hoy recuadros provisorios).
- Sección Prototipo (#prototipo), guión completo, páginas de cuestionarios y «Siguiente elemento UX».
- Opcional: versión del SVG anotado legible en celular.
