# Revisión humana — 0022 Superficie: cuestionario del Usuario 1

**Fecha:** 2026-11-22 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado

## Qué se revisó
`superficie-usuario-1.html`, `superficie-usuario.css`, `assets/ico-star-vacia.svg` y el enlace «Ver cuestionario» del usuario 1 en `superficie.html` (`specs/0022-superficie-usuario-1/`):
- barra superior con breadcrumb de 3 niveles, título «Usuario 1 | Franco» y «Ver Video»;
- secciones Cuestionario (4 tareas con estrellas), Preguntas Cualitativas (2 preguntas con imágenes provisorias) e Insights;
- responsive.

## Evidencia
- **Del usuario:**
  - Pidió que el botón de arriba a la derecha dijera simplemente «Ver Video».
  - Detectó que seguía mostrando «Ver Video del usuario 1 (se abre en una pestaña nueva)». Era un bug: `.sr-only` no estaba definida para esta página. Se corrigió en `superficie-usuario.css`, y con eso también dejaron de verse «Problema:», «Funcionó:» y «Sugerencia:» en Insights.
  - Luego respondió «Lo apruebo» en el chat el 2026-11-22.
  - No objetó las erratas corregidas («Facilidad de las tareas», «Challenge») ni los 72 px entre encabezado y contenido, que quedan como se implementaron.
- **Del asistente (checks técnicos):**
  - A 1920 px (medido): «Qué tan fácil fue…» Exo 2 300 24 a 48 px; tareas Exo 2 300 32; estrellas 48 × 48, 80 px entre sí y 48 px del texto; 96 px entre grupos; pregunta Exo 2 300 24, respuesta Exo 2 300 italic 40, 56 px entre texto, texto e imagen (1162 × 684), 96 px entre preguntas; insights Poppins 300 24, ícono de 32 px a 17 px, 56 px entre ítems.
  - Los 5 textos `.sr-only` quedan ocultos tras la corrección.
  - Revisión en servidor local por medición a 1920, 900 y 375 px (sin captura: el panel del navegador estaba oculto): sin scroll horizontal; consola sin errores; sin imágenes rotas.
  - `validate` y `board-check` válidos.

## Pendientes
- Capturas finales de las preguntas cualitativas.
- Cuestionarios de los usuarios 2 y 3 (pueden reutilizar `superficie-usuario.css`) y página de guión completo.
