# Spec 0014 — Superficie, Componentes: Botones

Entrada: ficha 0014 en `.cardenal/context.json` (archivada en esta carpeta al cerrar). Referencia: `referencia-figma.png`. El PNG original es transparente con el texto en blanco; para leerlo se compuso sobre el fondo del sitio.

## Qué y por qué
Componentes solo muestra la iconografía. Se agrega Botones para contar qué cambió respecto de los botones originales y mostrar el sistema nuevo de estilos, estados y tamaños, con botones que se pueden probar.

## Contenido
- **Encabezado** «Botones» (`#botones`) con el ícono de botones dorado y línea (`.rule-head`).
- **Originalmente:** los PNG de Register, View Series y Add to Cart, con «Primario», «Secundario» y «Compras».
- **Ahora** (entre líneas): Race (primario), Test Drive (secundario) y Add to Cart (compras), con su leyenda.
  - Son `button` reales con hover y press, que no navegan.
- **Register tachado:** el PNG con «Primario» tachado y la frase «Verde reservado para estados de “éxito”».
- **Tres columnas 48 px, 40 px y 32 px:** cada una con un botón «Cambiar estilo» de ese alto.
  - Cada click pasa al estilo siguiente: primario → secundario → compras → bordeado → solo texto → primario.
  - Debajo, «5 estilos» (pincel), «4 estados» (click) y «3 tamaños» (escalar).

## Requisitos
- FR-001: los botones de «Ahora» y «Cambiar estilo» tienen hover, press y foco visible; no navegan.
- FR-002: el cambio de estilo funciona con mouse y teclado (Enter o Espacio) y se anuncia en una región `aria-live`.
- FR-003: los íconos dentro de los botones son SVG en línea con `currentColor`, para que tomen el color de cada estilo y funcionen desde `file://`.
- FR-004: responsive a 900 y 375 px sin scroll horizontal; en ≤ 640 px las filas se apilan.

## Supuestos (a confirmar en QA)
- Los colores de hover y press salen de la paleta del sistema de diseño:
  - primario: #0159CF → #1A6AD4 → #02449F;
  - compras: #FF8533 → #FF6600 → #CD5303;
  - secundario, bordeado y texto: fondo azul al 15 %, 25 % y 35 %.
- Los «4 estados» son default, hover, press y foco.
- Las fuentes se leyeron de la referencia:
  - títulos en Exo 2 light de 40 px;
  - leyendas en Inter de 16 px;
  - «48 px», «40 px» y «32 px» en Exo 2 light de 32 px;
  - «5 estilos», «4 estados» y «3 tamaños» en Exo 2 de 24 px.

## Fuera de alcance
Motion, el resto de Componentes y «Siguiente elemento UX».