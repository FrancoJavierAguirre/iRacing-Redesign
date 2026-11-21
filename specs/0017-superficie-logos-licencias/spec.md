# Spec 0017 — Superficie, Componentes: Logos y licencias

Entrada: ficha 0017 en `.cardenal/context.json` (archivada en esta carpeta al cerrar).

Referencia: `referencia-figma.png` (texto blanco sobre transparente, compuesto sobre el fondo del sitio para leerlo).

## Contenido
- **Encabezado** (`#logos`): «Logos y licencias» con `ico-license-gold.svg`.
- **Fila 1:** 10 logos de series de 84 × 84 px, el primero alineado a la izquierda y el último a la derecha: Legends Road Cup, Falken GT4 Challenge, Simagic GR Cup, Ferrari 296 Challenge, Mustang Challenge, Rain Master, TCR Virtual Challenge Fixed, Clio Cup, Mission R Challenge y TCR Virtual Challenge Open.
- **Fila 2:** 10 logos de series más (Nürburgring Endurance, Global Challenge, Power Challenge, SCCA, M2 Cup, Production Car Challenge, Production Endurance Challenge, Global MX-5 Cup, Formula Vee y Formula 1600).
- **Fila 3:** 9 logos de marcas de 48 px de alto, centrados y separados por unos 101 px: Mazda, Toyota, BMW, Ferrari, Ford, Porsche, Renault, Ray y Formula Vee.
- **Fila 4:** licencias R, D, C, B y A, centradas y separadas por unos 96 px. Cada una es HTML y CSS, no una imagen:
  - ícono `ico-auto.svg` en línea (`currentColor`) de 32 × 32 y la letra en Inter semibold 24, con 16 px entre ambos;
  - 48 px de alto, padding de 8 px vertical y 16 px horizontal, radio 8 y borde de 2 px por fuera (`box-shadow` externo, que no cambia el tamaño de la caja);
  - colores (texto e ícono / fondo / borde): A #02449F / #CCE2FF / #006EFF; B #217C06 / #D6F5CC / #33CC00; C #9C7C06 / #FFF5CC / #FFED09; D #9B3F06 / #FFE0CC / #FF6600; R #891828 / #F9D3D1 / #FE0708.

## Requisitos
- FR-001: los logos son imágenes con `alt` con el nombre de la serie o marca, dentro de una lista. No navegan.
- FR-002b: cada licencia tiene `aria-label` «Licencia X»; el ícono es decorativo.
- FR-002: responsive sin scroll horizontal. En ≤ 900 px las filas de 10 pasan a 5 columnas y los logos se achican en proporción; las marcas y las licencias se acomodan en varias líneas, centradas.

## Supuestos (a confirmar en QA)
- Unos 71 px entre filas, leídos de la referencia.
- Unos 23 px extra entre el encabezado y la primera fila, y separación con Detalles de auto igual a la de los otros encabezados de Componentes; las dos medidas se leyeron de la referencia.

## Fuera de alcance
Motion y «Siguiente elemento UX».
