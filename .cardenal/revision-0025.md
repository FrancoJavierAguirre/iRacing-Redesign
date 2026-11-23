# Revisión humana — 0025 Estrategia: videos e imágenes

**Fecha:** 2026-11-23 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado

## Qué se revisó
`estrategia.html`, `estrategia.css` y `assets/estrategia/` (`specs/0025-estrategia-medios/`):
- los 19 lugares que tenían recuadros provisorios, ahora con sus medios: 11 MP4 convertidos desde GIF (1,5× salvo «no acelerar») y 11 PNG;
- Estética y diseño minimalista apilada (1 arriba, 2 abajo, sin separación, radio 8);
- Lista de carreras y Carrito de compras alternando antes/después cada 2 s.

## Evidencia
- **Del usuario:** pidió el cambio con `/fix`. Eligió registrarlo como feature 0025, porque no había feature dueña. Definió cómo mostrar Estética y luego respondió «Lo apruebo» en el chat el 2026-11-23, sin pedir correcciones. No objetó el corte directo en la alternancia ni que las imágenes tomen su proporción real, que quedan como se implementaron.
- **Del asistente (checks técnicos):**
  - Conversión con ffmpeg: 11 MP4 que suman 2,8 MB, frente a ~70 MB de los GIF; duraciones medidas en el navegador iguales a las esperadas.
  - En el navegador: 0 placeholders; 11 videos cargan con autoplay, muted y loop; 11 imágenes cargan; Estética con gap 0, radio 8 y overflow hidden; alternancias con la animación de 4 s en pasos.
  - Revisión en servidor local por medición a 1920, 900 y 375 px (sin captura: el panel del navegador estaba oculto): sin scroll horizontal; consola sin errores.
  - `validate` y `board-check` válidos.

## Pendientes
- Las demás imágenes provisorias del sitio: Iteraciones y Prototipo (Superficie), capturas de los cuestionarios y el gráfico del guión.
