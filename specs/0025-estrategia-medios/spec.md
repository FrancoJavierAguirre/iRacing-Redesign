# Spec 0025 — Estrategia: videos e imágenes

Entrada: ficha 0025 en `.cardenal/context.json` (archivada en esta carpeta al cerrar). Origen: pedido `/fix`, registrado como feature porque ninguna spec define los medios de `estrategia.html` (decisión del usuario).

## Asignación (nombre del archivo → lugar)
| Archivo del usuario | Lugar en `estrategia.html` | Resultado |
|---|---|---|
| Libertad y control por parte del usuario.gif | Heurística «Libertad y control…» | MP4 1,5× |
| Consistencia y Estándares.gif | Heurística «Consistencia y Estándares» | MP4 1,5× |
| Estética y diseño minimalista 1 y 2.png | Heurística «Estética y diseño minimalista» | 1 arriba, 2 abajo, sin separación, radio 8 |
| Búsqueda y registro a una carrera.gif | Resultados «Búsqueda y registro…» | MP4 1,5× |
| Detalles de una serie.gif | Resultados «Detalles de una serie» | MP4 1,5× |
| El carrito de compra (no acelerar).gif | Resultados «El carrito de compra» | MP4 1× |
| Escenario Hipotético 1, 2 y 4 (no acelerar).gif | Escenario, pasos 1, 2 y 4 | MP4 1× |
| Escenario Hipotético 3 y 5.gif | Escenario, pasos 3 y 5 | MP4 1,5× |
| Entrar a la UI…, Buscar una carrera, Comprar el auto, Registrarse a la carrera.png | Experiencia, pasos 1 a 4 | PNG |
| La primera vez.gif | Descubrimientos «La primera vez» | MP4 1,5× |
| Detalles de carreras.png | Descubrimientos «Detalles de carreras» | PNG |
| Lista de carreras antes/despues.png | Descubrimientos «Lista de carreras» | alternan cada 2 s |
| Carrito de compras antes/despues.png | Descubrimientos «Carrito de compras» | alternan cada 2 s |

## Requisitos
- FR-001: videos `<video autoplay muted loop playsinline>` sin audio ni controles, H.264, a lo sumo el ancho en que se muestran (1160, 864 o 1340 px).
- FR-002: las imágenes toman su proporción real (sin recorte); radio de 12 px como los recuadros que reemplazan, salvo Estética (8 px).
- FR-003: los pares antes/después alternan cada 2 s con CSS (ciclo de 4 s); con `prefers-reduced-motion` se muestra el «después» fijo.
- FR-004: los videos tienen texto alternativo (`aria-label`) y las imágenes `alt`.

## Supuestos (a confirmar en QA)
- La alternancia es un corte directo (sin fundido) entre las dos imágenes.
- Los videos se reproducen solos al cargar la página; el navegador los descarga a medida que se acercan (`preload="metadata"`).

## Fuera de alcance
Cambios de texto o de estructura de la página.
