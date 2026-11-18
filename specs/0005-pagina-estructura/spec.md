# Spec: Página de Estructura

**Carpeta:** `specs/0005-pagina-estructura/` · **Estado:** aprobado para planificar · **Ficha:** `.cardenal/context.json`

## Contexto
- **Actor:** lector del portfolio que recorre el proceso UX y llega a la capa Estructura.
- **Problema:** Estructura no tiene página; sus links no llevan a ningún lado y el tree testing, las conclusiones, la arquitectura nueva y el taskflow no se pueden ver.
- **Resultado:** existe `estructura.html`, fiel al diseño de Figma (salvo los placeholders), y el sitio enlaza a ella.
- **Decisiones confirmadas:** `d-placeholder`, `d-icons`, `d-tooltip`, `d-ver-detalles`, `d-taskflow-cards`, `d-antes-despues`, `d-mobile`. Propuesta según el precedente de 0004: `p-links`.
- **Diseño de referencia:** [referencia-figma.jpg](referencia-figma.jpg), exportación de Figma a 1920 × 8437 px (escala 1:1 con el sistema de `clamp()` del sitio). Las medidas confirmadas por el usuario son las del tooltip y del botón «Ver más detalles».
- **Íconos nuevos (`assets/`):**

  | Archivo | Uso |
  |---|---|
  | `logo-uxtweak.png` | logo de UXtweak (200 × 50) |
  | `ico-usuario-gold.svg` | junto a «10 usuarios» |
  | `ico-circulo-check.svg` | junto a «2 tareas», en las cards Tarea 1/2 y en los encabezados Tarea 1/2 del Taskflow |
  | `ico-help.svg` | arriba a la derecha de las cards Tarea 1/2 (24 × 24) |
  | `ico-check-green.svg` / `ico-cross-red.svg` | respuestas correctas e incorrectas (supuesto de `d-icons`) |
  | `ico-flag-green.svg` | junto a «Inicio» |
  | `ico-flag-checkered.svg` | junto a «Fin» |
  | `ico-esqueleto-white.svg` | botón «Ver Esqueleto»; es `icon-esqueleto.svg` en blanco |

## Historias de usuario

### HU1 — Arquitectura Actual (P1)
1. **Dado** `estructura.html`, **entonces** la primera sección muestra:
   - el título «Arquitectura Actual» y el subtítulo «Encontrando las carreras»;
   - a la derecha, el botón «Ir a Tree Testing» con flecha abajo, que lleva a `#tree-testing`;
   - en lugar de la captura de la UI de iRacing, un `.media-placeholder` con el mismo ancho y proporción (≈ 1462 × 720 a 1920 px), rotulado «Imagen — arquitectura-actual (navegable)».
2. El placeholder se marca con un atributo o contenedor que permita, más adelante, superponer botones invisibles que cambien la imagen (`d-placeholder`). No se implementa ese comportamiento.

### HU2 — Tree Testing (P1)
1. **Dado** la sección «Tree Testing» / «Dónde deberían estar las carreras», **entonces**:
   - tiene los botones «Ir a Arquitectura Actual» (flecha arriba) e «Ir a Arquitectura Nueva» (flecha abajo);
   - tiene la fila centrada: logo UXtweak · ícono usuario + «10 usuarios» · círculo check + «2 tareas».
2. **Dado** la card «Tarea 1» (fondo de card oscuro, ancho completo), **entonces** muestra el círculo check, «Tarea 1», el ícono help arriba a la derecha y el enunciado en itálica:
   «“Eres nuevo en iRacing. Te registras y logueas a la UI. Quieres <dorado>encontrar tu primera carrera</dorado> para correr. ¿A dónde irías para lograrlo?”»
3. **Dado** la card «Tarea 2», ídem con:
   «“Te das cuenta que para correr la carrera que elegiste y te gusta tienes que <dorado>comprar el auto</dorado> para participar. ¿A dónde irías para comprar el auto? ”»
4. **Dado** el árbol de cada tarea, **entonces** reproduce el árbol original de iRacing con conectores (llaves horizontales con flecha hacia los hijos de los niveles 1 y 2, líneas verticales con flechas hacia los hijos de nivel 3 y 4):
   - Log In → Racing, Shop
   - Racing → Multiplayer, Racing, Single Player, More
     - Multiplayer → Spectate, Teams, Hosted, Leagues, Official
     - Racing → Home, Profile, My Content → (Cars, Tracks)
     - Single Player → Time Attack, AI Single Player
     - More → Results & Stats, Replays
   - Shop → Content, More
     - Content → Cars, Tracks
     - More → March, Gift Cards
5. **Tarea 1:** en verde (`#5CD633`) Hosted, Leagues, Official y AI Single Player; en rojo (`#E75149`) Home y Time Attack. A la izquierda, «✓ Respuestas correctas: 7» (verde) y «✗ Respuestas incorrectas: 3» (rojo; la captura dice «inorrectas», ver Aclaraciones).
6. **Tarea 2:** en verde Cars (hijo de Shop › Content). «✓ Respuestas correctas: 10».
7. Abajo a la derecha de cada árbol, el botón «Ver más detalles» (`d-ver-detalles`): como «Ir a» pero sin ícono, sin fondo, borde 2 px `#679BE2`, texto `#679BE2`. No navega.

### HU3 — Tooltips de help (P1)
1. **Cuando** hago click en el help de Tarea 1, **entonces** aparece un tooltip:
   - fondo `#212121`, radio 16 px, padding 16 px, ancho 536 px (o menos si no entra en la pantalla), alto según el texto, Poppins 16 regular blanco;
   - a 16 px del ícono, con el ícono arriba a la derecha respecto del tooltip (el tooltip se abre hacia abajo y a la izquierda);
   - texto: «**NOTA:** hay muchas formas de empezar una carrera y desde diferentes lugares. Además, en algunos casos, es necesario **<dorado>cumplir ciertos requisitos</dorado>**. Por ejemplo: en una liga primero deben aceptarte una solicitud de ingreso.»
2. **Cuando** hago click en el help de Tarea 2, aparece el tooltip con: «**NOTA:** hay tantas respuestas correctas porque en el mismo lugar donde se empieza una carrera, si no se tiene el contenido requerido, te permite comprarlo desde ahí. Aunque a veces **<dorado>es un poco confuso</dorado>** saber qué estas comprando hasta que no empiezas el proceso.»
3. Negrita = Poppins 600; dorado = `#BCA447`.
4. **Cuando** hago click afuera del tooltip, se cierra. Un segundo click en el mismo help también lo cierra; abrir uno cierra el otro. Escape lo cierra y devuelve el foco al ícono (accesibilidad).
5. El ícono es un `<button>` con `aria-label`, `aria-expanded` y `aria-controls`.

### HU4 — Conclusiones (P1)
Título centrado «Conclusiones» y 3 cards de ancho completo, con un número en recuadro dorado (`.numbox` dorado):
1. «Nomenclatura confusa» — «La mayoría de usuarios tuvieron mucha vacilación a la hora de hacer la elección final.»
2. «Arquitectura ambigua» — «Las subcategorías “Teams”, “Spectate” y “More” (results and replays), que pertenecen a “Racing” (carreras), son ambiguas a dicho término.»
3. «Categorías mal contenidas» — «”Home”, ”Profile” y “My Content” no deberían estar dentro de la categoría “Racing” porque no contienen nada referido a la acción CORRER.»

### HU5 — Arquitectura Nueva (P1)
1. Título «Arquitectura Nueva», subtítulo «Encontrando las carreras», botones «Ir a Tree Testing» (arriba) e «Ir a Taskflow» (abajo).
2. Switch «Antes | Después» arriba a la derecha del diagrama; «Después» activo por defecto (fondo azul tenue y texto azul, como `.btn-info`); «Antes» solo texto azul.
3. **Después** muestra el árbol nuevo:
   - Log In → Racing, Teams, Spectate, My Content, Home, Shop, Profile
   - Racing → Official, Hosted, Leagues, Time Attack, AI Single Player, Results & Stats, Replays
   - Shop → Content (Cars, Tracks), More (March, Gift Cards)
4. **Antes** muestra un `.media-placeholder` rotulado «Imagen — arquitectura-antes» (`d-antes-despues`); al cambiar de vuelta, vuelve el árbol. El switch usa `aria-pressed` (o patrón tabs) y funciona con teclado.

### HU6 — Taskflow (P1)
1. Título «Taskflow», subtítulo «Necesidades del piloto», botón «Ir a Arquitectura Nueva» (flecha arriba).
2. Fila de 3 cards igual a «Foco» de Estrategia (`.focus-row`): persona Sergio Barrientos (bandera España, 33 años, Analista de Sistemas, PC y Celular, imagen `card-sergio.png`), «Qué quiere hacer en la plataforma» y «Cómo le gustaría lograrlo» con los mismos textos de Estrategia.
3. Encabezado «Tarea 1» con círculo check y línea horizontal hasta el borde derecho (como `.rule-head`). Título centrado «Registrarse a una carrera de “licencia D” y de “sport cars”». 5 cards (`.t-card`, texto centrado, palabra dorada):
   1. borde verde `#5CD633`: bandera verde + «Inicio»; «El usuario <dorado>navega</dorado> a “Racing”.»
   2. «<dorado>Filtra</dorado> por “sport cars” y “licencia D”.»
   3. «<dorado>Abre</dorado> los detalles de la carrera.»
   4. «<dorado>Selecciona</dorado> un auto como favorito.»
   5. borde azul (`#0a5bd6`, el de `.btn-blue`): bandera a cuadros + «Fin»; «El usuario <dorado>entra</dorado> a la carrera.»
4. Encabezado «Tarea 2», título «Comprar el auto necesario para entrar a otra carrera». Cards:
   1. Inicio: «<dorado>Abre</dorado> los detalles de la carrera»
   2. «<dorado>Añade</dorado> el auto al carrito de compras»
   3. «<dorado>Abre</dorado> el carrito de compras»
   4. «<dorado>Revisa</dorado> los detalles antes de la compra»
   5. Fin: «<dorado>Compra</dorado> el auto»

### HU7 — Navegación (P1)
1. Topbar: breadcrumb «← Rediseño UX/UI › Estructura ⌄» (menú de capas de 0003), título «Estructura», botón azul «Ver Esqueleto» con `ico-esqueleto-white.svg`, sin destino.
2. Menú de capas de Estructura: Estrategia (`estrategia.html`) y Alcance (`alcance.html`) habilitadas; Esqueleto y Superficie deshabilitadas; Estructura no aparece.
3. «Siguiente elemento UX»: Estamos acá = Estructura (`estructura.html`); Sigue acá = Esqueleto (sin destino); Pero también = Estrategia, Alcance (con destino) y Superficie (sin destino).
4. **`p-links`:** pasan a `estructura.html` la opción Estructura del menú y «Ver Estructura» de Alcance, la tarjeta «Sigue acá» de Alcance, la tarjeta Estructura de «Pero también» y la opción del menú de Estrategia, la tarjeta Estructura del Home y los links a Estructura de 5-elementos que hoy son `href="#"` o equivalentes (relevar con Grep).

### HU8 — Mobile (P2)
1. ≤ 900 px: las filas de 3 y 5 cards y los botones de `sec-header` se reacomodan como en Estrategia (apilado o en columnas que entren) sin desbordes.
2. ≤ 640 px: los dos árboles del Tree Testing y el de Arquitectura Nueva se muestran como lista vertical indentada por nivel (sin llaves horizontales), conservando los colores verde/rojo; los contadores quedan arriba del árbol; no hay scroll horizontal (`d-mobile`).
3. El tooltip nunca sale de la pantalla: su ancho es `min(536px, 100vw - 2 × gutter)`.

## Requisitos funcionales
- **FR-001**: `estructura.html` con la estructura de las páginas de capa (topbar, `main`, secciones `.layer-sec` con `id` `arquitectura-actual`, `tree-testing`, `arquitectura-nueva`, `taskflow`, y `.next`).
- **FR-002**: Textos literales de este spec.
- **FR-003**: Árboles en HTML semántico (listas anidadas) para que sean legibles por lectores de pantalla y agentes; conectores dibujados con CSS. Colores verde/rojo acompañados de algo no cromático para lectores de pantalla (texto oculto «respuesta correcta/incorrecta»).
- **FR-004**: Tooltips según HU3 (`d-tooltip`), en un script nuevo sin dependencias.
- **FR-005**: Switch Antes/Después según HU5, en el mismo script.
- **FR-006**: Reutilizar topbar, menú de capas, `.sec-header`/`.btn-info`, `.t-card`, `.focus-row`, `.persona`, `.numbox`, `.hl` y `.next`. Si hay que mover estilos de `estrategia.css` a `elementos.css` para compartirlos, Estrategia debe verse igual (como en 0004).
- **FR-007**: Links de HU7 activos; el resto del sitio no cambia de aspecto.
- **FR-008**: Mobile según HU8.
- **FR-009**: SEO como el resto (title, description ≤ 160, OG/Twitter, JSON-LD con breadcrumb) y `llms.txt` actualizado.
- **FR-010**: Sin errores en consola; funciona desde `file://`.

## Fuera de alcance
- Imagen navegable de Arquitectura Actual (botones invisibles que cambian la imagen).
- Imágenes Antes/Después de la arquitectura.
- Pantallas de detalle de Tarea 1 y Tarea 2 («Ver más detalles»).
- Páginas de Esqueleto y Superficie.

## Criterios de éxito
- QA manual: Estructura comparada contra la captura a 1920 px, tooltips y switch probados con mouse y teclado, mobile revisado, links de HU7 recorridos.

## Aclaraciones
### Sesión 2026-11-17
- **P:** ¿Qué hace el switch Antes/Después? → **R:** alterna entre dos diagramas; las imágenes llegan en la próxima instrucción.
- **P:** ¿Árboles en mobile? → **R:** lista indentada.
- **Supuesto:** «Respuestas inorrectas» es un typo de la captura; se transcribe como «Respuestas incorrectas» y se le avisa al usuario.
- **Supuesto:** el árbol de «Después» se construye en HTML desde la captura hasta que lleguen las imágenes.
- **Corrección del usuario en el QA (2026-11-17):** los contadores «Respuestas correctas/incorrectas» van arriba, por fuera del diagrama. Las flechas dibujadas con CSS no convencían: los 4 diagramas pasan a ser SVG exportados de Figma con el texto convertido en curvas (	ree-tarea-1/2.svg, rquitectura-nueva/vieja.svg). En la vista «Antes» el SVG viejo reemplaza al placeholder. Las listas HTML se conservan para ≤ 640 px y para lectores de pantalla.
