# Revisión humana — 0015 Superficie, Componentes: Dropdowns y listas, y Cards

**Fecha:** 2026-11-20 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado

## Qué se revisó
`superficie.html` y `superficie.css` (`specs/0015-superficie-dropdowns-cards/`):
- Dropdowns y listas: 4 dropdowns en recuadro punteado y lista de opciones (PNG);
- Cards:
  - Elegir auto: carrusel de 4 imágenes cada 3 s y hover azul;
  - Comprar auto: triángulo con carrito, hover naranja y tag «$12.95»;
  - Pista y Clima: hover azul;
- responsive.

## Evidencia
- **Del usuario:** eligió probarla él mismo («La pruebo yo») y respondió «Lo apruebo» en el chat el 2026-11-20, sin pedir correcciones. No objetó los supuestos (ícono de Cards dibujado, triángulo de 56 px, radio 8, tag a 16 px y visible solo en hover/foco), que quedan como se implementaron.
- **Del asistente (checks técnicos):**
  - JSON-LD válido; description de 156 caracteres.
  - Carrusel medido: cambia cada 3 s y vuelve al Mazda.
  - Hover: borde de 2 px azul o naranja, con el tag en Comprar auto. Cart de 16 px a 8/8 px del borde y tag con padding y gap de 4 px.
  - Revisión visual en servidor local a 1920, 900 y 375 px: sin scroll horizontal; consola sin errores.
  - `validate` y `board-check` válidos.

## Pendientes
- Detalles de auto (Cards), Motion (#motion) y «Siguiente elemento UX».