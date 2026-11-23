# Revisión humana — fixes 2026-11-23: video del Usuario 3 y gráfico del guión

**Fecha:** 2026-11-23 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado (los dos)
**Features dueñas:**
- `specs/0023-superficie-usuarios-2-3`: addendum T007–T009 (tablero T29).
- `specs/0024-superficie-guion`: addendum T004–T006 y clarificación (tablero T30).

## Qué se revisó
- `superficie-usuario-3.html`: la pregunta cualitativa muestra `assets/usuarios/usuario-3-favorito.mp4` en lugar del placeholder.
- `superficie-guion.html` + `superficie-guion.css`: el gráfico de puntuación de habilidad (Contexto) es `assets/guion/grafico-puntuacion.mp4`, con radio 8.

Con estos dos cambios, el sitio ya no tiene placeholders.

## Evidencia
- **Del usuario:** pidió ambos cambios con `/fix` y respondió «Apruebo los dos» en el chat el 2026-11-23. No objetó el radio de 8 px del gráfico.
- **Del asistente (checks técnicos):**
  - Conversión con ffmpeg: 72 KB y 14 KB, frente a 1,7 MB y 135 KB de los GIF; sin acelerar.
  - En el navegador: los dos videos tienen readyState 4 (3,1 y 2,1 s); distancias sin cambios; 0 `class="media-placeholder` en todos los `.html`.
  - Revisión en servidor local por medición a 1920 y 375 px (sin captura: el panel del navegador estaba oculto): sin scroll horizontal; consola sin errores.
  - `validate` y `board-check` válidos.

## Pendientes
- Ninguno de imágenes. Del sitio quedan el SEO del dominio, el favicon y los typos ya listados en `docs/tech/sistema.md`.
