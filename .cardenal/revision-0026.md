# Revisión humana — 0026 Menú de usuarios en el breadcrumb

**Fecha:** 2026-11-23 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado

## Qué se revisó
`menu-capas.js`, `superficie-usuario-1.html`, `-2`, `-3`, `superficie-usuario.css` y `assets/ico-user-gray.svg` (`specs/0026-menu-usuarios/`):
- en cada página de usuario, el nombre del breadcrumb abre un menú igual al de capas con los otros dos usuarios (`ico-user` en #B7B7BA);
- `menu-capas.js` maneja varios menús por página.

## Evidencia
- **Del usuario:** pidió el menú («igual al que se usa al hacer click en el breadcrumb … para navegar entre fede, franco y martin», con ico-user #B7B7BA) y respondió «Lo apruebo» en el chat el 2026-11-23. No objetó que el usuario actual no figure en el menú ni que las opciones muestren solo el nombre.
- **Del asistente (checks técnicos):**
  - Clicks y teclas simulados en las 3 páginas: el menú abre y cierra con click, click afuera, doble click y Escape (que devuelve el foco); abrir el menú de capas cierra el de usuarios; enlaces e íconos correctos.
  - Mismo aspecto que el menú de capas; el disparador queda en blanco 600 con `aria-current`.
  - El menú de capas de `estrategia.html` sigue funcionando.
  - En servidor local, a 1920 y 375 px (sin captura: el panel del navegador estaba oculto): sin scroll horizontal; consola sin errores.
  - `validate` y `board-check` válidos.

## Pendientes
- Hallazgo previo, no causado por este cambio: a 375 px, el breadcrumb de 3 niveles se superpone al título de la topbar (detalles de tareas, usuarios y guión). Está anotado en `docs/tech/sistema.md`.
