# Spec: Menú desplegable de capas UX en la topbar

**Carpeta:** `specs/0003-menu-capas-topbar/` · **Estado:** aprobado para planificar · **Ficha:** `.cardenal/context.json`

## Contexto
- **Actor:** lector del portfolio que está en la página de una capa del proceso UX (hoy solo existe Estrategia) y quiere ir a otra capa.
- **Problema:** la topbar solo ofrece el breadcrumb al Home y el botón «Ver Alcance». No hay forma directa de saltar entre capas.
- **Resultado:** al hacer click en el título de la topbar («Estrategia») se despliega un menú con las demás capas.
- **Decisiones confirmadas:** `d-menu-visual`, `d-menu-behavior`, `d-disabled`, `d-sizes` (`.cardenal/context.json`).
- **Diseño de referencia:** captura del usuario del 2026-11-17. Es un menú oscuro con 5 filas (ícono + texto): Estrategia, Alcance, Estructura, Esqueleto y Superficie. Los chevrons vienen como SVG del usuario, copiados a `assets/ico-chevron-down.svg` y `assets/ico-chevron-up.svg`.

## Historias de usuario

### HU1 — Abrir y cerrar el menú (P1)
Como lector, quiero desplegar un menú desde el título de la página, para ver a qué otras capas puedo ir.

**Escenarios de aceptación**
1. **Dado** `estrategia.html` cargada, **entonces** a la derecha de la palabra «Estrategia» de la topbar, separado por 8 px, se ve el chevron hacia abajo.
2. **Dado** el menú cerrado, **cuando** hago click en «Estrategia» o en su chevron, **entonces** el menú aparece debajo de la palabra y el chevron pasa a apuntar hacia arriba.
3. **Dado** el menú abierto, **cuando** vuelvo a hacer click en «Estrategia», hago click fuera del menú o presiono Escape, **entonces** el menú se cierra y el chevron vuelve a apuntar hacia abajo.

### HU2 — Opciones del menú (P1)
Como lector, quiero ver las otras capas con su ícono y saber cuáles ya puedo visitar.

**Escenarios de aceptación**
1. **Dado** que estoy en Estrategia, **cuando** abro el menú, **entonces** veo Alcance, Estructura, Esqueleto y Superficie, en ese orden y con sus íconos. La opción Estrategia no aparece.
2. **Dado** una opción cuya página todavía no existe (hoy, las 4), **entonces** se ve atenuada, no navega al hacer click y no se puede activar con el teclado.
3. **Dado** una opción cuya página existe, **cuando** hago click, **entonces** navego a esa página. Hoy no hay ninguna en este caso, pero tiene que bastar con poner el enlace y quitar el estado deshabilitado.

### HU3 — Aspecto (P1)
**Escenarios de aceptación**
1. **Dado** el menú abierto, **entonces**:
   - radio de esquinas de 8 px y fondo `#212121`;
   - cada opción con padding de 12 px vertical y 8 px horizontal;
   - ícono de 16 × 16 px en `#B7B7BA`, separado 8 px del texto;
   - texto en Inter 12 px regular, `#FFFFFF`;
   - ancho mínimo de 102 px, que crece si el texto lo necesita, sin cortar palabras.
2. **Dado** un viewport mobile (≤ 640 px), **entonces** el menú sigue debajo del título, entero dentro de la pantalla y usable.

## Requisitos funcionales
- **FR-001**: El título de la topbar DEBE funcionar como disparador del menú, con el chevron 8 px a su derecha.
- **FR-002**: El chevron DEBE alternar entre `ico-chevron-down.svg` (cerrado) y `ico-chevron-up.svg` (abierto).
- **FR-003**: El menú DEBE posicionarse debajo del título, por encima del contenido de la página.
- **FR-004**: El menú DEBE cerrarse con un segundo click en el disparador, con un click fuera del menú y con Escape.
- **FR-005**: El menú DEBE listar las 5 capas en orden y omitir la de la página actual.
- **FR-006**: Las opciones sin página DEBEN mostrarse deshabilitadas: visibles, atenuadas, sin navegación y anunciadas como deshabilitadas a lectores de pantalla.
- **FR-007**: El menú DEBE cumplir los valores visuales de HU3.1 y cargar Inter 400.
- **FR-008**: El disparador DEBE ser accesible por teclado (Enter o Espacio para abrir) y comunicar su estado abierto o cerrado a tecnologías asistivas. El h1 de la página debe seguir conteniendo «Estrategia», para no afectar el SEO de 0001.
- **FR-009**: Los estilos y el comportamiento DEBEN poder reutilizarse en las futuras páginas de capa, cambiando solo qué capa es la actual y qué opciones tienen página.
- **FR-010**: No DEBE cambiar ningún otro elemento visible ni aparecer errores en consola. Debe funcionar desde `file://`.

## Entidades clave
- **Capa UX**: nombre, ícono (`assets/icon-<capa>.svg`), página (puede no existir todavía), si es la actual.

## Estados de pantalla
- **Cerrado:** título + chevron hacia abajo.
- **Abierto:** menú visible, chevron hacia arriba.
- **Opción deshabilitada:** atenuada, cursor de no permitido.
- **Hover/foco sobre una opción habilitada:** realce sutil. Hoy no se ve porque no hay ninguna opción habilitada.
- **Responsive:** en ≤ 900 px el título baja a 14 px (regla existente) y el menú se mantiene debajo y dentro del viewport.

## Fuera de alcance
- Crear las páginas de Alcance a Superficie.
- Agregar el menú en `index.html` o `5-elementos.html`.
- Cambios en el breadcrumb o en el botón «Ver Alcance».

## Criterios de éxito
- QA manual: el menú se abre y se cierra según HU1, muestra las 4 opciones deshabilitadas, coincide con la captura y no rompe la topbar en escritorio ni en mobile.

## Aclaraciones
### Sesión 2026-11-17
- **P:** ¿Qué hacen las opciones sin página? → **R:** Visibles pero deshabilitadas.
- **P:** ¿Tamaños? → **R:** Texto Inter 12 px regular; íconos de 16 × 16 px.
- **Corrección del usuario tras la primera implementación** (`d-trigger-breadcrumb`): el disparador NO es el título central de la topbar, sino la palabra «Estrategia» del **breadcrumb**, arriba a la izquierda (`span.current`). Esto reemplaza toda referencia a «el título de la topbar» como disparador en HU1, FR-001, FR-003 y FR-008: el chevron va 8 px a la derecha de la palabra del breadcrumb y el menú se despliega debajo de ella, alineado con su inicio. El `h1.topbar-title` vuelve a ser `<h1 class="topbar-title">Estrategia</h1>` sin cambios, y el h1 conserva su texto para el SEO.
- **Supuestos de patrón estándar, sin confirmar** (`p-close-a11y`): el menú también se cierra con click afuera y con Escape; las opciones deshabilitadas se muestran atenuadas por opacidad. Son reversibles en la revisión.
