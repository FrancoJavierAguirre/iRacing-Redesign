# Spec 0021 — Superficie: Fin del proyecto

Entrada: ficha 0021 en `.cardenal/context.json` (archivada en esta carpeta al cerrar).

Referencia: `referencia-figma.png` (1920 × 1401 px, texto blanco sobre transparente).

## Contenido
- **«Fin del proyecto»** (Exo 2 Regular 64) entre dos banderas a cuadros (`assets/ico-flag-checkered.svg`, 48 px como en la referencia), a 90 px del texto.
- **«Gracias por ver»** (Exo 2 Light 48), a 160 px de «Fin del proyecto».
- **Contacto**, a 96 px de «Gracias por ver»: cuatro datos repartidos a lo ancho, ícono de 40 px de alto a 16 px del texto (Poppins Light 24):
  - LinkedIn: «Franco Javier Aguirre», enlace al perfil en otra pestaña.
  - Behance: «Franco Javier Aguirre», enlace al perfil en otra pestaña.
  - Gmail: el correo, como texto.
  - Teléfono: el número, como texto.
- **Cards de capas**, a 160 px del contacto: las 5 `a.proceso-card` (Estrategia, Alcance, Estructura, Esqueleto, Superficie) en filas de 3 y 2, como en el resto del sitio.

## Requisitos
- FR-001: LinkedIn y Behance con `target="_blank" rel="noopener"` y aviso para lectores de pantalla.
- FR-002: banderas e íconos decorativos (`alt=""`); la red de cada dato se nombra en texto oculto.
- FR-003: responsive: contactos en 2 columnas en ≤ 900 px y en 1 en ≤ 640 px; sin scroll horizontal.

## Supuestos (a confirmar en QA)
- El correo y el teléfono quedan como texto (el pedido solo enlaza LinkedIn y Behance).
- Los PNG de LinkedIn y Behance traen 5 px de sombra: se muestran a 50 px con margen negativo para que el ícono visible mida 40 px.

## Fuera de alcance
Cambios en otras páginas.
