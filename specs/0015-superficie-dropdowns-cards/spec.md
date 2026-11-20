# Spec 0015 — Superficie, Componentes: Dropdowns y listas, y Cards

Entrada: ficha 0015 en `.cardenal/context.json` (archivada en esta carpeta al cerrar).

Referencias:
- `referencia-figma.png`: texto blanco sobre transparente, compuesto sobre el fondo del sitio para leerlo.
- `referencia-card-compra-default.png` y `referencia-card-compra-hover.png`.

## Contenido
- **Dropdowns y listas** (`#dropdowns`): encabezado con `ico-lista.svg`.
  - Recuadro punteado con los 4 dropdowns en PNG: default, hover, presionado y con 3 filtros seleccionados.
  - Al lado, la lista de opciones en PNG.
- **Cards** (`#cards`): encabezado con un ícono de card dorado. No se pasó un archivo para ese ícono, así que es un rectángulo dorado dibujado según la referencia.
- **Elegir auto | After delay y hover:** Mazda, Toyota, BMW y Clio, en ese orden.
  - Cada 3 s pasa a la imagen siguiente con un fundido, en bucle.
  - Hover: outline de 2 px #0159CF.
- **Comprar auto | Hover:** imagen fija del Clio.
  - Triángulo #FF8533 en la esquina superior derecha, con el ícono cart #1E1E27 de 16 px a 8 px del borde superior y del derecho.
  - Hover: outline de 2 px #FF8533 y tag arriba a la izquierda: #FFB685, radio 4, padding 4, gap 4, ícono tag y «$12.95» en Inter 12 medium #1E1E27.
- **Pista | Hover** y **Clima | Hover:** imágenes provistas, con el hover azul.

## Requisitos
- FR-001: el carrusel es solo CSS (12 s, 3 s por imagen). Con `prefers-reduced-motion` queda fija la primera imagen.
- FR-002: las cards muestran el estado hover también con foco de teclado (`tabindex="0"`). No navegan.
- FR-003: responsive sin scroll horizontal. Las cards pasan a 2 columnas en ≤ 900 px y a 1 en ≤ 640 px. Los recuadros de dropdowns y lista se apilan en ≤ 900 px.

## Supuestos (a confirmar en QA)
- Triángulo de 56 px de cateto, cards con radio de 8 px y tag a 16 px de la esquina. Las tres medidas se leyeron de la referencia.
- El tag aparece solo en hover o foco, como en la referencia de hover.

## Fuera de alcance
Detalles de auto, Motion y «Siguiente elemento UX».