# Revisión humana — 2026-11-23: degradado del hero e imagen de Contexto (Home)

**Fecha:** 2026-11-23 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado
**Spec dueña:** ninguna (el Home es anterior a Cardenal). Se registró como tarea T34 del tablero.

## Qué se revisó
Cambios en `styles.css`:
- **Hero:** `.hero-overlay` con un degradado horizontal de negro opaco a transparente, entre el video y el contenido. Se quitó el degradado vertical inferior, así que el video termina en un corte recto contra Contexto.
- **Contexto:** sección de 720 px de alto (@1920). La imagen `contexto.png` ocupa el 100 % del alto (1205 × 720) y sobresale 75 px a la derecha. En ≤ 900 px va debajo del texto, con `object-fit: cover`.

## Evidencia
- **Del usuario:**
  - Pidió el degradado con una imagen de referencia: negro con alfa de 255 a 0 de izquierda a derecha.
  - Pidió quitar el degradado inferior para que quedara como su segunda referencia.
  - Pidió la imagen de Contexto a todo el alto y 75 px por fuera a la derecha.
  - Respondió «Lo apruebo» en el chat el 2026-11-23.
- **Del asistente (checks técnicos):**
  - Hero: el overlay cubre todo el hero a 1920 y 375 px, después del video y debajo del contenido; el logo queda por encima. Capturas a 1920 y 375 px.
  - Contexto: imagen de 1205 × 720 con `top 0` que sobresale 75 px a 1920 px, en proporción 1,674 sin deformar; en ≤ 900 px usa `cover`; sin scroll horizontal en 9 anchos (375–2400 px).
  - `validate` y `board-check` válidos.
