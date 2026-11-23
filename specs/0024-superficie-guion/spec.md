# Spec 0024 — Superficie: guión de las pruebas

Entrada: ficha 0024 en `.cardenal/context.json` (archivada en esta carpeta al cerrar).

Referencia: `referencia-figma.webp` (519 × 2000 px, escala ~1:3,7; texto blanco sobre transparente). Imágenes provistas en `assets/guion/`.

## Página `superficie-guion.html`
- **Barra superior:** breadcrumb «Rediseño UX/UI › Superficie › Guión» (la flecha vuelve a Pruebas de Usabilidad), título «Guión de las pruebas», «Ver Video» al video de Drive indicado, en otra pestaña.
- **Introducción** («Agradecimientos y saludos»): 4 párrafos.
- **Contexto** («Sobre iRacing»): 4 filas de 2 columnas alternando texto e imagen: escena de iRacing (`assets/contexto.png`), gráfico de puntuación (placeholder), licencias (`licencias.png`), carrera con horario (`carrera-horario.png`).
- **Ambientación** («En la piel del piloto»): 5 párrafos.
- **Instrucciones** («Probando el prototipo»): 2 párrafos; Tarea 1 y Tarea 2 con ícono, línea y «Intentar en prototipo» (enlaces de Figma dados, otra pestaña), enunciado, logo de la serie con chip «Clase D» y el auto con su nombre.
- **Cuestionario** («Facilidad de las tareas»): 4 preguntas «¿Qué tan fácil fue…?» en 2 × 2, cada una con su imagen.
- **Preguntas Cualitativas** («Entendiendo los detalles»): 3 preguntas con número en recuadro dorado.
- **Cierre** («Agradecimientos»): 3 párrafos.
- Cada sección con sus «Ir a…» (anterior y siguiente).
- En `superficie.html`, «Leer guión completo» enlaza la página.

## Correcciones del usuario (QA, 2026-11-22)
- El chip «Clase D» lleva el ícono del auto en #9B3F06 (`assets/ico-auto-d.svg`).
- 16 px entre el título «Tarea 1»/«Tarea 2», la línea y el botón.
- La primera imagen de Contexto es `assets/contexto.png`, con radio de 8 px.

## Tipografías (pedido del usuario)
- Textos: Poppins Light Italic 24; palabras en #BCA447 en italic (Regular).
- Cuestionario: Exo 2 Light 32 (como en las páginas de usuario); dorado en Regular.
- Preguntas Cualitativas: Exo 2 Light 32.

## Supuestos (a confirmar en QA)
- «Ver Video» con el texto aprobado en la spec 0022.
- Los nombres bajo los autos y el chip «Clase D» son etiquetas chicas (Poppins 16 / Inter 12), como en la referencia, no texto de párrafo.
- Se corrigen erratas («Facilidad de las tareas», «Challenge», «carreras») y se usa la ortografía estándar donde la referencia no se lee con claridad.
- Distancias tomadas de la referencia: 72 px del encabezado al contenido, 32 px entre párrafos, 96 px entre filas y bloques.

## Clarificaciones 2026-11-23
- El gráfico de puntuación de habilidad (Contexto) es el video `assets/guion/grafico-puntuacion.mp4` (autoplay, muted, loop, radio 8) en lugar del placeholder.

## Fuera de alcance
Nada pendiente.
