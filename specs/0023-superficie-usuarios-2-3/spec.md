# Spec 0023 — Superficie: cuestionarios de los usuarios 2 y 3

Entrada: ficha 0023 en `.cardenal/context.json` (archivada en esta carpeta al cerrar).

Referencias: `referencia-usuario-2.webp` (742 × 2000) y `referencia-usuario-3.webp` (1098 × 2000), texto blanco sobre transparente.

## Páginas
Misma plantilla, medidas y CSS que `superficie-usuario-1.html` (spec 0022), con «Ver Video» y breadcrumb hacia cada usuario:
- **`superficie-usuario-2.html` — Usuario 2 | Martín:** estrellas 0, 0, 4 y 5. Tres preguntas: complicación («Encontrar la serie»), cambios («Positivo: la facilidad de la compra, muy visible») e información faltante («Los logos de los autos y pistas»), cada una con su imagen provisoria en la proporción de la referencia (1162 × 551, 642 y 600). 6 insights.
- **`superficie-usuario-3.html` — Usuario 3 | Fede:** estrellas 2, 4, 5 y 3. Una pregunta: información faltante («Una estrellita para agregar el auto como favorito»), imagen provisoria de 1162 × 684. 6 insights.
- En `superficie.html`, «Ver cuestionario» de los usuarios 2 y 3 enlaza cada página.

## Corrección del usuario (QA, 2026-11-22)
- Usuario 2: a la derecha de la última estrella de las filas 1 y 2, a 40 px, el texto «No terminó la tarea» (Exo 2 Light 16) y la imagen «shrug».

## Supuestos (a confirmar en QA)
- La nota no desplaza las estrellas (siguen centradas como las demás filas); separación de 8 px entre texto e imagen; en celular la nota va debajo de las estrellas.
- Los insights siguen la referencia de cada página, que difiere de las cards de Superficie: Martín no incluye «Los filtros no fueron intuitivos…» y Fede agrega «Identificaría más fácilmente los autos/pistas…».
- Se mantienen las erratas corregidas en la página del usuario 1 («Facilidad de las tareas», «Challenge»).
- «Ver Video» con el texto aprobado en la spec 0022.

## Clarificaciones 2026-11-23
- Usuario 2 (fix): las tres preguntas muestran `usuario-2-encontrar-serie.mp4`, `usuario-2-compra-visible.mp4` (recortado abajo al alto del recuadro, 642 px) y `usuario-2-logos.png` (`assets/usuarios/`, `.cu-media`) en lugar de los placeholders. El primero queda en su proporción (1162 × 538), 13 px más bajo que el recuadro original.

## Fuera de alcance
Imágenes finales.
