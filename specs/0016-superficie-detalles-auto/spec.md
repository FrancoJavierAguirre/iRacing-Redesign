# Spec 0016 — Superficie, Componentes: Cards, Detalles de auto

Entrada: ficha 0016 en `.cardenal/context.json` (archivada en esta carpeta al cerrar).

Referencia: `specs/0015-superficie-dropdowns-cards/referencia-figma.png` (parte inferior).

## Contenido
- **Detalles de auto | After delay**: título centrado debajo de las cuatro cards.
- Dos imágenes de 580 × 326 px, separadas por 32 px y centradas, con radio de 8 px.
  - Izquierda, BMW M2: 5 imágenes (`detalle-bmw-1` a `-5`).
  - Derecha, Ferrari 296: 4 imágenes (`detalle-ferrari-1` a `-4`).
- Cada imagen pasa a la siguiente de su grupo cada 3 s con un fundido, en bucle. No tienen hover.

## Requisitos
- FR-001: rotación solo con CSS, igual que «Elegir auto»: 15 s por vuelta en BMW y 12 s en Ferrari, 3 s por imagen. Con `prefers-reduced-motion` queda fija la primera imagen.
- FR-002: sin hover ni foco; no navegan. Cada grupo es `role="img"` con un `aria-label`.
- FR-003: responsive sin scroll horizontal. Las imágenes se achican en proporción y pasan a una columna en ≤ 640 px.

## Supuestos (a confirmar en QA)
- Orden: empieza por las imágenes que muestra la referencia (BMW de frente y Ferrari en la curva) y sigue con el resto en el orden en que se pasaron.
- Separación de unos 72 px entre las cards y el título, leída de la referencia.

## Fuera de alcance
Motion y «Siguiente elemento UX».
