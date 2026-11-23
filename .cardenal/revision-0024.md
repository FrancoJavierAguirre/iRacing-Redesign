# Revisión humana — 0024 Superficie: guión de las pruebas

**Fecha:** 2026-11-22 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado

## Qué se revisó
`superficie-guion.html`, `superficie-guion.css`, `assets/guion/`, `assets/ico-auto-d.svg` y el enlace «Leer guión completo» en `superficie.html` (`specs/0024-superficie-guion/`):
- barra superior con breadcrumb «… › Superficie › Guión» y «Ver Video»;
- secciones Introducción, Contexto, Ambientación, Instrucciones (Tarea 1 y 2 con «Intentar en prototipo»), Cuestionario, Preguntas Cualitativas y Cierre;
- responsive.

## Evidencia
- **Del usuario:**
  - Pidió agregar al chip «Clase D» el ícono del auto en #9B3F06. Faltaba por un bug: la máscara CSS no carga desde `file://`. Se resolvió con `ico-auto-d.svg` como `<img>`.
  - Pidió 16 px entre el título de cada tarea y el botón, y usar `assets/contexto.png` como primera imagen de Contexto, con radio de 8 px.
  - Luego respondió «Lo apruebo» en el chat el 2026-11-22.
  - No objetó la transcripción del texto, las erratas corregidas, las etiquetas chicas (nombres de autos, chip) ni las distancias tomadas de la referencia, que quedan como se implementaron.
- **Del asistente (checks técnicos):**
  - A 1920 px (medido): párrafos Poppins 300 italic 24 con 32 px entre sí y dorado 400 italic #BCA447; Cuestionario Exo 2 300 32 con dorado 400; Preguntas Exo 2 300 32 con recuadro dorado de 48 px; filas de Contexto con 96 px entre sí; gap de 16 px en los encabezados de tarea; ícono del chip 16 × 16 visible; `contexto.png` con radio de 8 px.
  - 2 «Intentar en prototipo» y «Ver Video» con `target="_blank" rel="noopener"`; las imágenes cargan; `.sr-only` ocultos.
  - Revisión en servidor local por medición a 1920, 900 y 375 px (sin captura: el panel del navegador estaba oculto): sin scroll horizontal; consola sin errores.
  - `validate` y `board-check` válidos.

## Pendientes
- Imagen del gráfico de puntuación de habilidad (hoy placeholder).
- Capturas finales de los cuestionarios e imágenes y gif de Iteraciones y Prototipo.
