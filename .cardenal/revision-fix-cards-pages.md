# Revisión humana — fix: imágenes de las cards en /en/ con el sitio publicado

**Fecha:** 2026-11-24 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado

## Qué se corrigió
En GitHub Pages, las cards de capas de las páginas EN daban 404 en su imagen de fondo.

- **Causa:** la imagen se declaraba en `style="--img:url(../assets/…)"`. El navegador resuelve esa URL desde `styles.css`, en la raíz del sitio, así que desde `/en/` quedaba fuera de `/iRacing-Redesign/`.
- **Cambio:** las cards usan el atributo `data-card` y `styles.css` declara la imagen de cada una. Las páginas EN se regeneraron.

## Evidencia
- **Del usuario:** respondió «Lo apruebo» en el chat el 2026-11-24.
- **Del asistente:**
  - **Antes del fix, en el sitio publicado:** 26 páginas y 382 recursos OK; solo fallaban las imágenes de las cards en EN.
  - **Después del fix, con un servidor local bajo `/iRacing-Redesign/`:** las 70 cards de las 14 páginas ES/EN cargan su imagen y ningún recurso se pide fuera de la subcarpeta, salvo `favicon.ico`.

## Pendiente
- QA manual en el sitio publicado después de subir el commit.
