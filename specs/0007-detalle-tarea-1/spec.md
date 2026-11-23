# Spec: Detalle de la Tarea 1 del Tree Testing

**Carpeta:** `specs/0007-detalle-tarea-1/` · **Estado:** aprobado para implementar · **Ficha:** `.cardenal/context.json`

## Contexto
- **Actor:** lector del portfolio que, en el Tree Testing de Estructura, quiere ver los resultados completos de la Tarea 1.
- **Resultado:** página `estructura-tarea-1.html`, abierta desde «Ver más detalles» de la Tarea 1, fiel a [referencia-figma.jpg](referencia-figma.jpg) (1920 × 2341, escala 1:1).
- **Assets del usuario:**
  - íconos `ico-exito-directo.svg`, `ico-exito-indirecto.svg`, `ico-fallo-directo.svg` y `ico-fallo-indirecto.svg` (40 × 40);
  - capturas de UXtweak en `assets/tarea-1/`: `success.png`, `directness.png`, `torta-resultados.png`, `tabla-resultados.png` y `pietree.png`;
  - ícono de leyenda del pietree, recoloreado según la referencia en `ico-pietree-{correcta,incorrecta,duda,volvio,nomino,salto}.svg` (`#C2DFA0`, `#F44336`, `#FF9800`, `#2962FF`, `#FDD835`, `#9E9E9E`, colores medidos en la referencia).

## Contenido
1. **Topbar:**
   - breadcrumb «← Rediseño UX/UI › Estructura ⌄ › Tarea 1». «Estructura» abre el menú de capas, con Estructura habilitada hacia `estructura.html`. «Tarea 1» es la página actual;
   - título «Tarea 1»;
   - botón «Ver Esqueleto» sin destino.
2. **Enunciado** centrado en itálica, con «encontrar tu primera carrera» en dorado. Es el mismo texto que la card de Tarea 1.
3. **Estadísticas** («Resumen del éxito en la tarea»), con el botón «Ir a Pietree». A la izquierda, 4 ítems con su ícono, título en el color del ícono y descripción:
   - **Éxito directo** (`#BEE45F`): «El usuario fue directo a la respuesta correcta.»
   - **Éxito indirecto** (`#90BE21`): «El usuario tomó un camino diferente y se volvió antes de ir a la respuesta correcta.»
   - **Fallo directo** (`#DA1F47`): «El usuario fue directo a una respuesta incorrecta.»
   - **Fallo indirecto** (`#F56200`): «El usuario tomó un camino diferente y se volvió antes de ir a una respuesta incorrecta.»

   A la derecha, Success, Directness y la torta en fila, y la tabla debajo. Cada imagen lleva un `alt` con sus datos: éxito 70 % (límites 39,2–89,7 %), directness 20 % (límites 4,6–52,1 %), éxito directo 1 (10 %), éxito indirecto 6 (60 %), fallo directo 1 (10 %) y fallo indirecto 2 (20 %).
4. **Pietree** («Representación visual del trayecto del usuario»), con el botón «Ir a Estadísticas». A la izquierda, 6 ítems con su ícono:
   - «El usuario fue por la dirección correcta.»
   - «El usuario fue por la dirección incorrecta.»
   - «El usuario interactuó con un nodo nuevamente (cerrado o abierto de nuevo). Un signo de duda.»
   - «El usuario se volvió. Un signo de que el usuario no encontró lo que buscaba.»
   - «El usuario nominó este nodo como respuesta correcta.»
   - «El usuario se saltó esta tarea en este nodo.»

   A la derecha, la imagen `pietree.png` con un `alt` descriptivo.
5. En `estructura.html`, «Ver más detalles» de la Tarea 1 lleva a esta página. El de la Tarea 2 sigue sin destino.

## Requisitos
- **FR-001:** Fidelidad a la referencia a 1920 px con el sistema `clamp()`; textos literales. El doble espacio de «El usuario  se saltó» de la referencia se normaliza a uno.
- **FR-002:** ≤ 900 px: las columnas se apilan (leyenda arriba, imágenes debajo). ≤ 640 px: las tarjetas de estadísticas pasan a una columna. Sin scroll horizontal.
- **FR-003:** SEO como el resto (description ≤ 160, OG/Twitter, JSON-LD con breadcrumb de 3 niveles) y `llms.txt`.
- **FR-004:** Menú de capas funcional (`menu-capas.js`); «Ver Esqueleto» sin destino y sin saltar al tope.
- **FR-005:** Docs actualizadas; sin errores de consola; funciona desde `file://`.

## Fuera de alcance
- Detalle de la Tarea 2.
- Gráficos interactivos: los gráficos son las imágenes del usuario.

## Clarificaciones 2026-11-23
- Topbar responsive (fix): en ≤ 760 px la topbar de las páginas `page-tarea` va en dos renglones (breadcrumb arriba a la izquierda, título centrado debajo); en ≤ 1024 px se ocultan «Rediseño UX/UI» y su separador. Así el breadcrumb nunca pisa el título.

## Aclaraciones
- **Corrección del usuario en el QA (2026-11-18):** en el breadcrumb, la flecha vuelve a la página anterior en la jerarquía (Estructura, sección Tree Testing). «Rediseño UX/UI» sigue llevando al Home.
