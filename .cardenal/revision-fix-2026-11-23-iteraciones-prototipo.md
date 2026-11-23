# Revisión humana — fix 2026-11-23: medios de Iteraciones y Prototipo y centrado de License Progress

**Fecha:** 2026-11-23 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado
**Features dueñas:** `specs/0019-superficie-iteraciones` (FR-002, addendum T005–T008) · `specs/0020-superficie-prototipo` (FR-002, addendum T004–T006)

## Qué se revisó
`superficie.html`, `superficie.css` y `assets/iteraciones/`:
- License Progress como video en bucle, en Iteraciones y en Prototipo (el mismo MP4);
- Encontrar tu carrera y Carrito de compras (Prototipo) como video;
- los tres Antes/Después de Iteraciones (All Series, Filtros y búsqueda, Registro a la carrera) con sus capturas;
- en License Progress de Iteraciones, título y «Probar funcionalidad» centrados respecto de los bullets.

## Evidencia
- **Del usuario:**
  - Pidió el cambio con `/fix` y luego agregó a la carpeta las 4 capturas que había olvidado (Filtros y búsqueda, Registro a la carrera).
  - Pidió centrar el título y el botón de License Progress en Iteraciones.
  - Respondió «Lo apruebo» en el chat el 2026-11-23.
- **Del asistente (checks técnicos):**
  - Conversión con ffmpeg: 3 MP4 que suman 3,2 MB, frente a 53 MB de los GIF, sin acelerar.
  - En el navegador: 4 videos con readyState 4 y duraciones iguales a los GIF; 6 capturas cargan; 0 placeholders en Superficie; distancias sin cambios (32/56/72 px); centros alineados en los 4 bloques a 1920 y 375 px.
  - Revisión en servidor local por medición a 1920, 900 y 375 px (sin captura: el panel del navegador estaba oculto): sin scroll horizontal; consola sin errores.
  - `validate` y `board-check` válidos.

## Pendientes
- Capturas de los tres cuestionarios y gráfico del guión (las últimas imágenes provisorias del sitio).
