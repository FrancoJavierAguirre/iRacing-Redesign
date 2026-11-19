# Spec: Superficie — parte 1, UX Writing

**Carpeta:** `specs/0010-superficie-ux-writing/` · **Estado:** aprobado para implementar · **Ficha:** `.cardenal/context.json`

## Contexto
- **Actor:** lector del portfolio que llega a la capa Superficie.
- **Resultado:** `superficie.html` con la parte de UX Writing, fiel a [referencia-figma.jpg](referencia-figma.jpg) (1920 × 6794). El usuario entrega la página por partes.
- **Assets del usuario:**
  - `assets/matriz-tono.svg`: vectores de la Matriz de Tono;
  - `assets/ico-play.svg`.

  Se reutilizan `ico-circulo-check.svg`, `ico-check-green.svg` e `ico-cross-red.svg`.

## Contenido
1. **Topbar:**
   - breadcrumb «Superficie ⌄», con todas las demás capas habilitadas en el menú;
   - título «Superficie»;
   - **«Ver Prototipo»** con el ícono play: abre en pestaña nueva el prototipo de Figma (link dado por el usuario).
2. **«UX Writing»** centrado y el link de texto **«Saltar a Sistema de Diseño»**. Debe llevar a la sección Sistema de Diseño, que todavía no existe: queda apuntando a `#sistema-de-diseno` sin destino hasta que exista.
3. **Círculo de Oro** («Identidad de la marca», «Ir a Matriz de Voz»): bloques ¿Por qué?, ¿Cómo? y ¿Qué?, alternando lados. Cada uno lleva el diagrama de 3 anillos con el anillo correspondiente resaltado y su etiqueta en dorado. Textos literales de la referencia, con las frases doradas.
4. **Matriz de Voz** («Definiendo la personalidad»): tabla con Autenticidad, Claridad y Conciso. Filas: Concepto, Verbosidad, Vocabulario, Gramática, Puntuación y Uso de mayúsculas (en esta última, Claridad y Conciso comparten celda).
5. **Matriz de Tono** («Cómo se le habla al piloto»):
   - ejes «Casual / Directo», «Informativo / Serio» y «Trayectoria del usuario», dibujados con los vectores del usuario;
   - cajas con círculo check: Log in y Carrito de compras abajo; Lista de carreras y Detalles de carrera arriba.
6. **Guía de Estilo** («Cómo se le habla al piloto»): tabla con Contexto, Reglas, Buenas prácticas (✓ verde) y Malas prácticas (✗ rojo), en 5 filas. «Ir a Valores» queda sin destino (sección futura).

## Requisitos
- **FR-001:** Fidelidad a 1920 px; textos literales. Se mantiene «Titulos cortos…» sin tilde, como está en la referencia.
- **FR-002:** Responsive:
  - ≤ 900 px: Círculo de Oro apilado y tablas en bloques con el nombre de cada columna;
  - ≤ 640 px: Matriz de Tono como lista de pasos con su tono.
- **FR-003:** Links a Superficie activos en todo el sitio (precedente `d-links`).
- **FR-004:** SEO (description de 156 caracteres, JSON-LD), `llms.txt` y docs.

## Fuera de alcance
- Sistema de Diseño, Valores, el resto de Superficie y su «Siguiente elemento UX».

## Aclaraciones
- **Corrección del usuario en el QA (2026-11-19):** «Saltar a Sistema de Diseño» se ve y se comporta como «Ver más detalles» de Estructura, pero sin borde: mismo hover y estado presionado (fondo azul tenue y leve subida), sin subrayado. Usa la nueva variante .btn-ghost-info en styles.css.
- **Corrección del usuario en el QA (2026-11-19):** los párrafos del Círculo de Oro van en Poppins light italic de 24 px, salvo las palabras en `#BCA447`, que van en semibold. Los círculos tienen opacidad y se apilan con ¿Por qué? arriba, ¿Cómo? en el medio y ¿Qué? abajo. Los PNG del usuario son colores planos, azul `#0057D0` al 15 % y negro al 60 %, así que se aplican esos colores en CSS a 565, 420 y 249 px.
