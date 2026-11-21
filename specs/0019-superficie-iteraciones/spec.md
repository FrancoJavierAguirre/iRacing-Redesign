# Spec 0019 — Superficie: Iteraciones

Entrada: ficha 0019 en `.cardenal/context.json` (archivada en esta carpeta al cerrar).

Referencia: `referencia-figma.webp` (771 × 2000 px, texto blanco sobre transparente; escala ~1:2,49 respecto de 1920 px).

## Contenido
- **Encabezado** (`#iteraciones`): «Iteraciones» / «Puliendo el producto», con «Ir a Pruebas de Usabilidad» e «Ir a Prototipo» (sin destino hasta que exista esa sección).
- **License Progress** (ícono licencia): gif a la izquierda (placeholder, ~1163 × 797) y, a 32 px, la columna «Solución para nuevos usuarios» (Exo 2 regular 36) con 4 bullets (Exo 2 regular 24) y «Probar funcionalidad». 72 px entre título, cada bullet y el botón.
- **All Series** (ícono lista), con «Probar flow» al final de la línea: «Antes» y «Después» (Exo 2 36) sobre dos imágenes (placeholders, ~864 × 605) separadas por 32 px; debajo, la imagen anotada `assets/iteraciones/diferencias-all-series.svg` (1674 × 805).
- **Filtros y búsqueda** (ícono filtro), con «Probar filtros»: Antes y Después.
- **Registro a la carrera** (ícono check), con «Probar registrarse»: Antes y Después.
- «Ir a Iteraciones» de Pruebas de Usabilidad pasa a tener destino.

## Requisitos
- FR-000 (corrección del usuario): la distancia vertical es siempre 56 px (de «Antes»/«Después» a su imagen y de las imágenes de All Series al SVG anotado); la horizontal entre las dos imágenes es 32 px.
- FR-001: los 4 botones «Probar…» abren en otra pestaña (`target="_blank" rel="noopener"`, con aviso para lectores de pantalla).
- FR-002: los placeholders usan `.media-placeholder` con `data-label` que nombra la imagen o el gif que va.
- FR-003: la imagen anotada tiene un `alt` que resume sus indicaciones.
- FR-004: responsive sin scroll horizontal. En ≤ 900 px, License Progress se apila (imagen arriba, texto abajo) y Antes/Después pasan a una columna.

## Supuestos (a confirmar en QA)
- El cuarto enlace del pedido (rotulado otra vez «probar filtros») es el de «Probar registrarse».
- En pantallas angostas, las distancias de 72 px y la letra de 36/24 px se achican en proporción.
- Medidas no indicadas leídas de la referencia: separación entre bloques.

## Fuera de alcance
Imágenes y gifs finales.
