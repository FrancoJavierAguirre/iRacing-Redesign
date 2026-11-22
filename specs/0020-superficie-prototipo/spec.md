# Spec 0020 — Superficie: Prototipo

Entrada: ficha 0020 en `.cardenal/context.json` (archivada en esta carpeta al cerrar).

Referencia: `referencia-figma.webp` (1160 × 2000 px, texto blanco sobre transparente).

## Contenido
- **Encabezado** (`#prototipo`): «Prototipo» / «Un prototipo vale más que mil imágenes», con solo «Ir a Iteraciones».
- Tres bloques imagen + texto, con las mismas clases y distancias que License Progress de Iteraciones (`.it-solucion`):
  - **License Progress** (ícono licencia): «Solución para nuevos usuarios»; separado por disciplinas, barra de progresión de licencia, primero y solamente se muestra lo que puede correr, luego se muestra lo que puede comprar.
  - **Encontrar tu carrera** (ícono lupa): «Nueva tabla, nuevos detalles»; nueva tab para la sección «Cars», rediseño del calendario y detalles de autos/pistas, imágenes de autos y pistas para mejorar identificación, nuevo texto para los CTA, filtros rediseñados.
  - **Carrito de compras** (ícono carrito): «Compra en un solo lugar»; carrito de compras sin abandonar la plataforma, información sobre descuentos.
- Cada bloque tiene «Abrir prototipo», que abre en otra pestaña el enlace correspondiente (primero, segundo y tercero del pedido).
- «Ir a Prototipo» de Iteraciones pasa a tener destino.

## Requisitos
- FR-001: los tres «Abrir prototipo» abren en otra pestaña (`target="_blank" rel="noopener"`, con aviso para lectores de pantalla que nombra el bloque).
- FR-002: las imágenes son `.media-placeholder` con `data-label`.
- FR-003: responsive igual que Iteraciones (bloques apilados en ≤ 900 px), sin scroll horizontal.

## Corrección del usuario (QA, 2026-11-22)
- Subtítulo (Exo 2 Regular 36) y «Abrir prototipo» centrados respecto de los bullets (Exo 2 Regular 24). Solo en Prototipo; Iteraciones queda alineada a la izquierda como se aprobó.

## Supuestos
- Separación entre bloques: la de los encabezados de sección (`.rule-head`).

## Fuera de alcance
Imágenes finales.
