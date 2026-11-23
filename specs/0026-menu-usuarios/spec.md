# Spec 0026 — Menú de usuarios en el breadcrumb

Entrada: ficha 0026 en `.cardenal/context.json` (archivada en esta carpeta al cerrar). Relacionada: spec 0003 (menú de capas).

## Comportamiento
- En `superficie-usuario-1.html`, `-2` y `-3`, el último nivel del breadcrumb («Franco», «Martín», «Fede») pasa a ser un botón con chevron, igual al de «Superficie».
- Al abrirlo se despliega un menú con el mismo aspecto que el de capas (#212121, radio 8, filas Inter 12 con ícono de 16 px) que lista **a los otros dos usuarios** en orden (1, 2, 3), cada uno con `assets/ico-user-gray.svg` (copia de `ico-user.svg` en #B7B7BA), y lleva a su página.
- Se cierra con un segundo click en el nombre, un click afuera o Escape (que devuelve el foco al botón). Abrir un menú cierra el otro.
- El nombre conserva el estilo de página actual (blanco, 600) y `aria-current="page"`.

## Requisitos
- FR-001: `menu-capas.js` maneja todos los `[data-capas]` de la página, cada uno con su disparador y su menú (ids únicos).
- FR-002: el menú de capas sigue funcionando igual en todas las páginas.
- FR-003: accesible por teclado (Tab, Enter/Espacio, Escape); el menú tiene `aria-label="Usuarios de las pruebas"`.

## Supuestos (a confirmar en QA)
- Como en el menú de capas, no se lista el usuario actual.
- Las opciones muestran solo el nombre («Franco», «Martín», «Fede»).

## Fuera de alcance
La página del guión y las demás páginas.
