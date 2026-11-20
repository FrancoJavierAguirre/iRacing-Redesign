# Spec: Superficie — parte 2, Sistema de Diseño

**Carpeta:** `specs/0011-superficie-sistema-diseno/` · **Estado:** aprobado para implementar · **Ficha:** `.cardenal/context.json`

## Contexto
- **Actor:** lector del portfolio que recorre la capa Superficie.
- **Resultado:** la sección Sistema de Diseño debajo de UX Writing en `superficie.html`, fiel a [referencia-figma.png](referencia-figma.png) (573 × 2000, escala de 1920 px). El usuario entrega la página por partes.
- **Assets del usuario:**
  - `assets/ico-escalera.svg` y `assets/ico-chart-up.svg` (Principios);
  - 17 PNG de ejemplo en `assets/sistema-diseno/` (Tipografía).

  Se reutilizan `ico-lampara.svg` y `ico-check-green.svg`, este último recoloreado en dorado como `ico-check-gold.svg`.

## Contenido
1. **«Sistema de Diseño»** centrado (`#sistema-de-diseno`), con el link de texto **«Volver a UX Writing»**.
2. **Valores** («El combustible de la marca»; botones Ir a Guía de Estilo / Ir a Principios). Tres columnas: Autenticidad, Claridad y Conciso, con título dorado y su descripción.
3. **Principios** («Las reglas de comunicación»; Ir a Valores / Ir a Colores). Cuatro filas, cada una con una tarjeta ícono + nombre y la descripción: Simple, Entendible, Escalonado y Eficiente.
4. **Colores** («Accesibilidad y armonía»; Ir a Principios / Ir a Tipografía). Grupos con título, descripción y muestras (tono a la izquierda, hex a la derecha):
   - Neutrales: 0/100, más dos filas de 6;
   - Primario | Azul: 6 tonos;
   - Secundario | Naranja, Éxito, Advertencia y Error: 5 tonos cada uno;
   - Estados: Hover, Selected, Activated, Pressed y Dragged, con su opacidad sobre `#C9C9CC` y sobre `#0159CF`.
5. **Tipografía** («Transmitiendo los valores y principios»; Ir a Colores / Ir a Imágenes). Tabla Nombre / Uso / Ejemplo de 10 estilos, de «10 Inter - label 3 - medium» a «36 Exo 2 - Title 1 - bold». Cada nombre se muestra en su propio estilo. Los ejemplos son los PNG del usuario, salvo Texto, Título de sección y Título de pantalla, que son texto vivo en su estilo.

## Requisitos
- **FR-001:** Fidelidad a 1920 px; textos literales de la referencia.
- **FR-002:** Se activan «Saltar a Sistema de Diseño» e «Ir a Valores». «Ir a Imágenes» queda sin destino (`data-sin-destino`) hasta la parte de Imágenes.
- **FR-003:** Responsive:
  - ≤ 900 px: Valores apilados, muestras en 3 columnas y Tipografía en bloques con el nombre de cada columna;
  - ≤ 640 px: Principios con la tarjeta arriba de la descripción y muestras en 2 columnas.
- **FR-004:** SEO (description de ≤ 160 caracteres, JSON-LD), `llms.txt` y docs.

## Fuera de alcance
- Imágenes (`Track.svg`), «Siguiente elemento UX» y el resto de Superficie.

## Aclaraciones
- La referencia es de baja resolución. Los nombres «label 3» (fila Labels) y «light» (fila Título de columnas) son la mejor lectura posible y se confirman en el QA.