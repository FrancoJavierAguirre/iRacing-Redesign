# iRacing — Case Study (Rediseño UX/UI)

## Archivos
- `index.html` — estructura y contenido de la página
- `styles.css` — todos los estilos (colores, tipografía, layout, responsive)
- `script.js` — interacción mínima (tarjetas de "Proceso de Diseño")

## Cómo ver la página
Abrí `index.html` con doble click en cualquier navegador. No necesita servidor ni instalación.

## Dónde van tus imágenes y videos
Cada bloque con **líneas punteadas y una etiqueta de texto** es un placeholder. Por ejemplo:

```html
<div class="media-placeholder hero-media" data-label="Video/imagen de fondo — hero-background.mp4">
```

Para reemplazarlo por tu video, cambiá ese `div` por:

```html
<video class="hero-media" autoplay muted loop playsinline>
  <source src="assets/hero-background.mp4" type="video/mp4">
</video>
```

Y para una imagen:

```html
<img class="media-placeholder" src="assets/contexto.jpg" alt="Contexto">
```

Dejé una carpeta `assets/` vacía lista para que pongas ahí tus archivos (así los `src="assets/..."` funcionan directo).

## Colores usados (extraídos de tu captura)
Están definidos como variables en la parte superior de `styles.css`, así que si algo no coincide 100% con tu diseño original, se cambia en un solo lugar:

- `--bg: #04020d` — fondo general (el que me pasaste)
- `--panel: #0a1428` — fondo de tarjetas/testimonios
- `--orange: #fc8738` — botón principal "Probar prototipo"
- `--gold: #e2b04a` — nombres/palabras destacadas (Val DiPietro, "flujo constante", etc.)
- `--blue: #3b82f6` — acentos de íconos y hover

## Tipografía
- Títulos: **Exo 2**
- Cuerpo: **Poppins**
Ambas cargadas desde Google Fonts en el `<head>` del HTML, no requieren instalación.

## Lo que falta / próximos pasos
- Las 6 comparativas Antes/Después (12 capturas) siguen como placeholder — me dijiste que tenés que rehacerlas.
- Las 3 imágenes/videos de la fila de stats en "Objetivos" siguen como placeholder — también a rehacer.
- Las tarjetas de "Proceso de Diseño" van a llevar a otras páginas del proyecto (a definir cuando cerremos las visuales del Home).
- La nav general del portfolio (para ir a otros case studies) sigue pendiente.

## Ya resuelto
- Video del hero, logo e íconos (Figma, Make, Photoshop, UX Tweak) ✅
- Imagen de "Contexto" ✅
- Las 4 fotos de testimonios ✅
- Botón "Ver fuentes" (antes "Ver tuits") → enlaza a la planilla de Google Sheets ✅
- Botón "Probar prototipo" → enlaza al prototipo de Figma ✅


## Reglas de diseño del proyecto (para próximas adiciones)
- **Cards oscuras sin imagen:** siempre `background: var(--card-bg)` (negro `#000000` al 60%), así se ve el fondo fijo de atrás. No usar colores sólidos.
- **Fondo:** `assets/background.png`, fijo (no se mueve con el scroll). En el home empieza después de las secciones Hero y Contexto.
- **Botones:** 72px (radio 12, padding 21/24, Inter Semibold 24, íconos 30), 48px (radio 8, padding 14/16, Inter Semibold 16, íconos 20) y 40px (radio 8, padding 10/16, Inter Semibold 16, íconos 16).
- **Medidas:** se diseñan a 1920px con 80px de margen y escalan con `clamp()`.
