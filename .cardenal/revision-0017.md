# Revisión humana — 0017 Superficie, Componentes: Logos y licencias

**Fecha:** 2026-11-20 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado

## Qué se revisó
`superficie.html` y `superficie.css` (`specs/0017-superficie-logos-licencias/`), implementados en dos instrucciones:
- encabezado «Logos y licencias» con el ícono «License»;
- dos filas de 10 logos de series repartidas a todo el ancho;
- fila de 9 marcas centradas;
- licencias R, D, C, B y A en HTML y CSS, con el ícono de auto, la letra en Inter semibold 24 y los colores pedidos;
- responsive.

## Evidencia
- **Del usuario:** corrigió la caja de las licencias («El padding de las licencias era 16 px horizontal y 8 px vertical. El borde que sea outside») y luego respondió «Lo apruebo» en el chat el 2026-11-20. No objetó la separación de unos 71 px entre filas, que queda como se implementó.
- **Del asistente (checks técnicos):**
  - A 1920 px, las filas quedan a 111, 266, 421 y 540 px del encabezado (referencia: 111, 266, ~423 y ~543).
  - Licencias de 96 a 98 × 48 px, padding 8/16, gap 16, ícono de 32 px, radio 8 y borde de 2 px por fuera, con los colores de texto, fondo y borde pedidos (estilos computados).
  - Revisión visual en servidor local a 1920, 900 y 375 px: sin scroll horizontal; consola sin errores; las 29 imágenes cargan.
  - `validate` y `board-check` válidos.

## Pendientes
- Motion (#motion) y «Siguiente elemento UX».
