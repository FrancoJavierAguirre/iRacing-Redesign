# Spec 0022 — Superficie: cuestionario del Usuario 1

Entrada: ficha 0022 en `.cardenal/context.json` (archivada en esta carpeta al cerrar).

Referencia: `referencia-figma.webp` (888 × 2000 px, escala ~1:2,16; texto blanco sobre transparente).

## Página `superficie-usuario-1.html`
- **Barra superior:** breadcrumb «Rediseño UX/UI › Superficie (menú de capas) › Franco», con la flecha de volver a `superficie.html#pruebas-de-usabilidad`; título «Usuario 1 | Franco»; «Ver video» abre en otra pestaña el mismo video que la card.
- **Cuestionario** («Facilidad de las tareas»), con «Ir a Preguntas Cualitativas»:
  - «Qué tan fácil fue…» (Exo 2 Light 24), a 48 px del primer grupo.
  - 4 grupos (texto Exo 2 Light 32 con la tarea en dorado; 5 estrellas de 48 × 48 a 80 px entre sí y a 48 px del texto; 96 px entre grupos): elegir el Mazda (4/5), registrarse a la carrera (4/5), encontrar la serie (5/5), añadir al carrito y comprar (5/5).
- **Preguntas Cualitativas** («Entendiendo los detalles»), con «Ir a Cuestionario» e «Ir a Insights»: 2 grupos de pregunta (Exo 2 Light 24), respuesta entre comillas (Exo 2 Light Italic 40) e imagen provisoria de 1162 × 684, a 56 px entre sí; 96 px entre grupos.
- **Insights** («Descubrimientos para mejorar»), con «Ir a Preguntas Cualitativas»: los 4 ítems de la card del usuario 1, ícono de 32 × 32 a 17 px del texto (Poppins Light 24), 56 px entre ítems.
- En `superficie.html`, «Ver cuestionario» del usuario 1 pasa a enlazar la página.

## Requisitos
- FR-001: cada fila de estrellas se anuncia como «N de 5 estrellas» (`role="img"` + `aria-label`).
- FR-002: imágenes `.media-placeholder` con `data-label`.
- FR-003: responsive sin scroll horizontal; en celular las estrellas se achican y reducen su separación.

## Supuestos (a confirmar en QA)
- Se corrigen erratas de la referencia: «Facilidad de las tareas» y «Challenge».
- Distancia entre el encabezado de sección y su contenido: la de las páginas de Superficie.

## Clarificaciones 2026-11-23
- FR-002 (ajustado por fix): las dos preguntas cualitativas muestran el mismo video `assets/usuarios/usuario-1-preguntas.mp4` (autoplay, muted, loop) en lugar del placeholder, en su proporción real (`.cu-media`, radio 12).

## Fuera de alcance
Usuarios 2 y 3; imágenes finales.
