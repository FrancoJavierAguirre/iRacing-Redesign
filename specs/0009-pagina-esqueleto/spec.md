# Spec: Página de Esqueleto

**Carpeta:** `specs/0009-pagina-esqueleto/` · **Estado:** aprobado para implementar · **Ficha:** `.cardenal/context.json`

## Contexto
- **Actor:** lector del portfolio que llega a la capa Esqueleto.
- **Resultado:** `esqueleto.html`, fiel a [referencia-figma.jpg](referencia-figma.jpg) (1920 × 5404), y el sitio enlaza a ella.
- **Assets del usuario:**
  - wireframes (1162 px de ancho) en `assets/esqueleto/`;
  - íconos `ico-calendario.svg` e `ico-auto.svg`.

  Los otros íconos de títulos ya existían: `ico-lista.svg` e `ico-detalles-serie.svg`.

## Contenido
1. **Topbar:** breadcrumb «← Rediseño UX/UI › Esqueleto ⌄» con el menú de capas (Estrategia, Alcance y Estructura habilitadas; Superficie deshabilitada), título «Esqueleto» y «Ver Superficie» sin destino (`ico-superficie-white.svg`).
2. **«Wireframes en Media» / «Empezando el rediseño»:** 4 bloques. Cada uno lleva título con ícono y línea (`.rule-head`), el wireframe centrado y las notas en viñetas, literales de la referencia:
   - **Lista de series:** «Arquitectura nueva, carrito de compras agregado y ajuste en la información en las columnas.»
   - **Detalles de serie:**
     - «Añadido feedback visual “MPR” que significa que participar en esta serie aumenta la licencia del usuario.»
     - «“Rules & Format” colapsado en un dropdown.»
     - «Rediseñado la disposición de información del tiempo, pilotos, y CTA.»
     - «Rediseñado las tablas de prácticas y carreras con sus horarios.»
     - «Rediseñado en 3 columnas las cards de autos, pistas y clima.»
   - **Calendario de la serie:**
     - «Rediseñado las cards de eventos pasados, actuales y futuros.»
     - «“Content Manager” colapsado en un dropdown.»
   - **Sección de autos:**
     - «Se añade esta sección para visualizar los autos que compiten.»
     - «Se agrega aquí también la opción de elegir el auto como favorito.»
3. **«Siguiente elemento UX»:** Estamos acá Esqueleto; Sigue acá Superficie (sin destino); Pero también Estrategia, Alcance y Estructura.

## Requisitos
- **FR-001:** Fidelidad a 1920 px con `clamp()`; en ≤ 900 px el wireframe ocupa el 100 %.
- **FR-002:** Links a Esqueleto activos en todo el sitio (precedente `d-links` de 0004): menús de capas, «Ver Esqueleto», tarjetas de «Siguiente elemento UX», Home y 5-elementos.
- **FR-003:** SEO (description de 150 caracteres, JSON-LD con breadcrumb), `llms.txt` y docs.
- **FR-004:** Sin errores de consola; funciona desde `file://`.

## Fuera de alcance
- Página de Superficie.