# Spec 0027 — Versión en inglés con switch ES/EN

Entrada: ficha 0027 en `.cardenal/context.json` (archivada en esta carpeta al cerrar). Referencia del switch: `referencia-switch.png`.

## Comportamiento
- El sitio sigue en español por defecto. Cada página tiene su copia en inglés en `en/<misma-página>.html`.
- **Switch ES/EN** (`nav.lang-switch`, dos enlaces): 48 px de alto, radio 8, texto Inter 600 16 #0159CF; la opción del idioma actual lleva fondo #0159CF al 15 % y `aria-current="true"`. Cada opción enlaza la página equivalente en ese idioma.
  - Páginas interiores: arriba a la derecha de la barra superior, en `.topbar-tools` junto al botón azul, 32 px a su izquierda (en 5-elementos, sin botón, queda solo contra el borde derecho).
  - Home (sin barra superior): arriba a la izquierda del hero, 24 px debajo de «Franco Aguirre - 2025» (corrección del usuario).
- **Recordar la elección:** al tocar una opción se guarda el idioma en `localStorage`; `lang.js` (en el `<head>`) redirige a la página equivalente si el idioma guardado no es el de la página. Sin elección guardada no redirige.
- Cada página declara `<link rel="alternate" hreflang="es|en|x-default">` (relativos hasta definir el dominio).
- Las páginas en inglés traducen texto visible, `alt`, `aria-label`, `title`, metadatos y JSON-LD (`inLanguage: "en"`, `og:locale en_US`). Las imágenes con texto quedan en español. Las citas de usuarios en español se traducen.
- Mientras una página no tenga versión en inglés, los enlaces desde las páginas en inglés llevan a la versión en español.

## Correcciones del usuario (QA, 2026-11-23)
- Cada opción mide 56 × 48 con el texto centrado. Radio 8 solo hacia afuera: la izquierda (ES) arriba y abajo a la izquierda; la derecha (EN) arriba y abajo a la derecha.
- La opción seleccionada lleva sombra hacia el lado de la otra opción (ES → a la derecha; EN → a la izquierda).
- Home: el switch va debajo de «Franco Aguirre - 2025», a 24 px.

## Supuestos de la corrección
- Sombra `4px 0 8px rgba(0,0,0,.35)` (no se indicaron valores).

## Partes (cada una se revisa y commitea por separado)
1. Base (lang.js, estilos, hreflang) + Home + 5 Elementos.
2. Estrategia + Alcance.
3. Estructura + detalles de las tareas 1 y 2.
4. Esqueleto + Superficie.
5. Cuestionarios de los usuarios 1-3 + guión.

## Supuestos (a confirmar en QA)
- Nombres de las capas en inglés según Garrett: Strategy, Scope, Structure, Skeleton, Surface.
- En celular (≤ 760 px) la barra superior de las páginas interiores pasa a dos renglones (breadcrumb y switch arriba, título debajo) para que el switch no pise el título.
- El contraste de #0159CF sobre las barras y el hero oscuros es bajo; se respeta el color pedido.
