# Revisión humana — fix 2026-11-23: medios de las preguntas del Usuario 2

**Fecha:** 2026-11-23 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado
**Feature dueña:** `specs/0023-superficie-usuarios-2-3` (addendum T004–T006, clarificación del 2026-11-23)

## Qué se revisó
`superficie-usuario-2.html` y `assets/usuarios/usuario-2-*`: las tres preguntas cualitativas con su medio en lugar del placeholder:
- video «Encontrar la serie», sin recorte, 1162 × 538;
- video «Positivo: la facilidad de la compra», recortado abajo a 642 px;
- captura «Los logos de los autos y pistas».

## Evidencia
- **Del usuario:** pidió el cambio con `/fix` (convertir los GIF y recortar solo la parte inferior para ajustarse al recuadro) y respondió «Lo apruebo» en el chat el 2026-11-23. No objetó que «Encontrar la serie» quedara 13 px más bajo que el recuadro ni el recorte de 44 px del video de la compra.
- **Del asistente (checks técnicos):**
  - Conversión con ffmpeg: 52 KB y 454 KB, frente a 414 KB y 6,2 MB de los GIF; sin acelerar.
  - En el navegador: 2 videos con readyState 4 (3,1 y 8,8 s) y la imagen cargan; distancias de 56 px sin cambios; 0 placeholders en la página.
  - Revisión en servidor local por medición a 1920 y 375 px (sin captura: el panel del navegador estaba oculto): sin scroll horizontal; consola sin errores.
  - `validate` y `board-check` válidos.

## Pendientes
- Captura del cuestionario del Usuario 3 y gráfico del guión.
