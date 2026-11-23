# Revisión humana — 0027 Inglés, parte 1: base, Home y 5 Elementos

**Fecha:** 2026-11-23 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado

## Qué se revisó
- `lang.js`: recuerda el idioma elegido y redirige a la página equivalente.
- Estilos del switch en `styles.css` y grupo `.topbar-tools`, más la topbar en dos renglones en ≤ 760 px (`elementos.css`).
- Switch y `hreflang` en `index.html` y `5-elementos.html`.
- Páginas traducidas `en/index.html` y `en/5-elementos.html` (`specs/0027-idioma-en/`, parte 1).

## Evidencia
- **Del usuario:**
  - Pidió la funcionalidad con medidas y colores del switch. Corrigió las opciones (56 × 48, radio solo hacia afuera, sombra de la seleccionada hacia la otra) y la ubicación en el Home (24 px debajo de «Franco Aguirre - 2025»).
  - Respondió «Lo apruebo» en el chat el 2026-11-23.
  - No objetó la traducción, «Try prototype» en lugar de «Try the prototype», los valores de la sombra, la topbar en dos renglones en celular ni el contraste del azul sobre fondos oscuros, que quedan como se implementaron.
- **Del asistente (checks técnicos):**
  - Medidas del switch en las 4 páginas.
  - Ida y vuelta entre idiomas: guarda la elección y conserva el `#hash`.
  - Redirección según el idioma guardado.
  - Rutas `../` sin imágenes rotas; sin restos en español.
  - Sin cruces ni scroll en 9 anchos; el switch no pisa el logo del hero en 8 tamaños de pantalla; consola sin errores.
  - `validate` y `board-check` válidos.

## Pendientes
- Partes 2 a 5: Estrategia + Alcance; Estructura + tareas; Esqueleto + Superficie; usuarios + guión.
- Estrategia a 320 px: desborde previo, anotado en `docs/tech/sistema.md`.
