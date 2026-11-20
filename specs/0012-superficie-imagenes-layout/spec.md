# Spec 0012 — Superficie, Sistema de Diseño: Imágenes y Layout

Entrada: ficha 0012 en `.cardenal/context.json` (archivada en esta carpeta al cerrar). Referencia: `referencia-figma.png` (1608×2000, escala ≈ 0,8375 del diseño a 1920 px).

## Qué y por qué
El sistema de diseño termina en Tipografía y su botón «Ir a Imágenes» no tiene destino. Se agregan las dos subsecciones que siguen en la referencia para que el lector vea el estilo de imágenes y la grilla de layout del rediseño.

## Contenido
- **Imágenes** (`#imagenes`):
  - subtítulo «Autenticidad... ah ya lo dije?»;
  - botones ↑ Ir a Tipografía / ↓ Ir a Layout;
  - frase centrada: «Representación virtual de autos reales, mapas de circuitos y logos oficiales (algunos).»;
  - fila de 4 imágenes provistas, en el orden de la referencia: Corvette, logo IMSA, logo Formula A, BMW;
  - mapa del circuito centrado (`Track.svg` provisto).
- **Layout** (`#layout`):
  - subtítulo «Espacio y organización»;
  - botones ↑ Ir a Imágenes / ↓ Ir a Componentes (sin destino);
  - esquema de layout centrado: imagen default que pasa a la imagen hover al pasar el mouse.

## Requisitos
- FR-001: «Ir a Imágenes» (Tipografía) deja de estar sin destino y baja a `#imagenes`.
- FR-002: los Ir a internos llevan a su sección; «Ir a Componentes» usa el patrón `data-sin-destino`.
- FR-003: el esquema de Layout hace un fundido a la imagen hover con `:hover`; también con foco de teclado y, en táctil, al tocarlo.
- FR-004: responsive a 900 y 375 px sin scroll horizontal: las 4 imágenes pasan a 2 columnas; circuito y layout escalan al ancho.

## Supuestos (a confirmar en QA)
- El estado hover también se muestra con foco de teclado y con un toque, porque en táctil no hay mouse. Es una decisión de accesibilidad del asistente, no de la referencia.
- La frase usa Exo 2 light a 28 px, leído de la referencia.

## Fuera de alcance
Componentes, «Siguiente elemento UX» y el resto de Superficie.