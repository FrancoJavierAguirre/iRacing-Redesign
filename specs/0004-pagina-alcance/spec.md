# Spec: Página de Alcance (Matriz FVD)

**Carpeta:** `specs/0004-pagina-alcance/` · **Estado:** aprobado para planificar · **Ficha:** `.cardenal/context.json`

## Contexto
- **Actor:** lector del portfolio que recorre el proceso UX y llega a la capa Alcance.
- **Problema:** Alcance no tiene página. Todos los links a Alcance quedan sin destino y la priorización de soluciones no se puede ver.
- **Resultado:** existe `alcance.html`, fiel al diseño de Figma, y el sitio enlaza a ella.
- **Decisiones confirmadas:** `d-star`, `d-links`, `d-no-dup`, `d-mobile` (`.cardenal/context.json`).
- **Diseño de referencia:** [referencia-figma.webp](referencia-figma.webp), captura de Figma provista por el usuario. La captura mide 1410 px de ancho y el diseño original 1920 px (escala ≈ 0,734). Las medidas se derivan de ella con el sistema de `clamp()` del sitio. Solo la estrella tiene medidas confirmadas: 24 × 24 px, separada 24 px del texto.
- **Documentación pertinente:** [docs/public/funcionalidades.md](../../docs/public/funcionalidades.md), [docs/tech/sistema.md](../../docs/tech/sistema.md) (menú de capas y SEO).

## Historias de usuario

### HU1 — Ver la Matriz FVD (P1)
Como lector, quiero ver cómo se priorizaron las soluciones según factibilidad, viabilidad y deseabilidad, para entender qué se decidió construir primero.

**Escenarios de aceptación**
1. **Dado** `alcance.html` a 1920 px, **entonces** veo, como en la captura:
   - el título «Matriz FVD» y el subtítulo «Factibilidad, viabilidad y deseabilidad»;
   - la leyenda centrada «★ Máxima prioridad», con la estrella de 24 × 24 px a 24 px del texto;
   - el eje vertical dorado con flecha y la etiqueta «Muy deseable», el eje horizontal dorado con flecha y la etiqueta «Muy factible», y en el origen la etiqueta «Poco deseable y factible»;
   - las divisiones punteadas entre cuadrantes y los números grandes de cada cuadrante.
2. **Dado** el cuadrante 1 (arriba a la derecha), **entonces** su número «1.» es dorado, tiene la estrella y sus tarjetas tienen borde dorado y texto más grande. Las tarjetas son:
   1. Añadir en la esquina superior derecha al lado del perfil un icon button de carrito para poder acceder al carrito luego de añadir productos.
   2. Procesar los pagos dentro de la UI y rediseñar los mismos pasos de la web pero en la UI.
   3. Nueva vista License Progress para ayudar a los novatos a progresar sus cuentas y acceder a más contenido.
   4. Colorear el nombre de los autos y pistas que necesitan comprarse, como indicador para el usuario de qué NO tiene.
   5. Cambiar el botón de “registro” por un botón menú para dar más opciones solo disponibles ahora en los detalles.
3. **Dado** el cuadrante 2 (abajo a la derecha, número «2.» gris), **entonces** sus tarjetas, sin borde y con texto chico, son:
   1. Nueva sección de “Cars” y reordenamiento de la información
   2. Mensajes de error que proporcionen una solución práctica.
4. **Dado** el cuadrante 3 (arriba a la izquierda, número «3.» gris), **entonces** sus tarjetas son (sin «Nueva vista License Progress…», por `d-no-dup`):
   1. Remover algunas columnas innecesarias de la tabla de carreras para añadir el auto favorito seleccionado, así al darle a “registrarse” no debería pedir elegir otro auto.
   2. Cambiar el botón de “registro” por un botón menú para dar la opción de elegir otro auto e incluso para registrarse a una sesión de práctica online o una sesión de pruebas offline.
   3. Rediseñar la arquitectura de información para disminuir la vacilación de los usuarios nuevos al buscar una carrera.
5. **Dado** el cuadrante 4 (abajo a la izquierda, número «4.» gris), **entonces** sus tarjetas son:
   1. Un botón para abortar la carga del simulador.
   2. Utilizar breadcrumb navigation para mejorar la navegación por links en lugar de utilizar modales.

### HU2 — Navegación de la página (P1)
**Escenarios de aceptación**
1. **Dado** la topbar de Alcance, **entonces**:
   - el breadcrumb dice «← Rediseño UX/UI › Alcance ⌄» y la flecha vuelve al Home;
   - el título central es «Alcance»;
   - a la derecha está el botón azul «Ver Estructura» con el ícono de estructura, que no lleva a ninguna parte porque Estructura todavía no existe.
2. **Dado** el menú de capas de Alcance (mismo componente que 0003), **cuando** lo abro, **entonces** veo Estrategia (habilitada, lleva a `estrategia.html`) y Estructura, Esqueleto y Superficie (deshabilitadas). Alcance no aparece.
3. **Dado** la sección «Siguiente elemento UX», **entonces**:
   - «Estamos acá» muestra la tarjeta Alcance (lleva a `alcance.html`);
   - «Sigue acá» muestra Estructura;
   - «Pero también están…» muestra Estrategia (lleva a `estrategia.html`), Esqueleto y Superficie.

   Las tarjetas sin página no navegan, igual que hoy en Estrategia.

### HU3 — Links al sitio (P1)
1. **Dado** cualquier link a Alcance de `d-links`, **cuando** lo uso, **entonces** llego a `alcance.html`. Esos links son:
   - en Estrategia: la opción del menú, «Ver Alcance» y la tarjeta «Sigue acá»;
   - en el Home: la tarjeta Alcance;
   - en 5-elementos: «Ver Alcance» y la tarjeta Alcance del final.

### HU4 — Mobile (P2)
1. **Dado** un viewport de 640 px o menos, **entonces**:
   - los cuadrantes se apilan en orden 1, 2, 3, 4, cada uno con su número;
   - los ejes se ocultan y una leyenda de texto explica qué significa cada cuadrante;
   - no hay scroll horizontal.

## Requisitos funcionales
- **FR-001**: DEBE existir `alcance.html` con la estructura de las páginas de capa: topbar, `main`, sección de la matriz y sección `.next`.
- **FR-002**: La matriz DEBE reproducir la captura: ejes, etiquetas, divisores, números, leyenda y estilos diferenciados del cuadrante 1.
- **FR-003**: Los textos de las tarjetas DEBEN ser los de HU1, literales y en ese orden.
- **FR-004**: La estrella DEBE ser `assets/ico-star.svg` a 24 × 24 px, separada 24 px de «Máxima prioridad».
- **FR-005**: La topbar DEBE reutilizar el breadcrumb con el menú de capas (`menu-capas.js` y los estilos `.capas-*`) y el botón `topbar-action`.
- **FR-006**: Todos los links de HU3 DEBEN apuntar a `alcance.html`, y la opción Alcance del menú de Estrategia debe quedar habilitada.
- **FR-007**: El aspecto de Estrategia, del Home y de 5-elementos NO DEBE cambiar. Si se mueven estilos compartidos, deben verse igual.
- **FR-008**: La versión mobile DEBE cumplir HU4.
- **FR-009**: `alcance.html` DEBE tener title, meta description, OG/Twitter y JSON-LD como el resto (patrón de 0001), y `llms.txt` debe incluir la página con un resumen de la matriz.
- **FR-010**: Sin errores en consola. Debe funcionar desde `file://`.

## Entidades clave
- **Cuadrante**: número (1–4), prioridad, posición (deseabilidad × factibilidad) y lista de tarjetas.
- **Tarjeta de solución**: texto.

## Estados de pantalla
Página estática. Responsive: 1920 / 1300 / 900 / 640 px, apilada en ≤ 640 px. Las tarjetas de proceso de `.next` muestran la descripción en hover, como en Estrategia.

## Fuera de alcance
- Páginas de Estructura, Esqueleto y Superficie.
- Contenido que no está en la captura.

## Criterios de éxito
- QA manual: Alcance comparada contra la captura a 1920 px, revisada en mobile, y todos los links de HU3 llevan a ella.

## Aclaraciones
### Sesión 2026-11-17
- **P:** ¿Activar los links a Alcance? → **R:** Sí, todos.
- **P:** ¿License Progress duplicada en el cuadrante 3? → **R:** Es un error, se saca del 3.
- **P:** ¿Mobile? → **R:** Cuadrantes apilados.
- **Corrección del usuario en el QA (2026-11-17):** los números 1 a 4 de los cuadrantes van en **Inter regular (400), 128 px** a 1920 px, escalando con `clamp()` como el resto de las medidas.
- **Supuesto:** el ícono blanco de «Ver Estructura» se deriva de `assets/icon-estructura.svg` (hoy en `#B7B7BA`), como existe `ico-alcance-white.svg` para Alcance.
