# Funcionalidades

## Actores

- **Lector del portfolio** (reclutador, líder de diseño, colega): recorre el case study, mira las comparativas y puede abrir el prototipo y las fuentes.
- **Autor** (Franco Aguirre): mantiene el contenido. No hay panel de administración; edita los archivos a mano.

No hay cuentas, login, formularios ni datos de usuario.

## Mapa de páginas

| Página | Archivo | Estado |
|---|---|---|
| Home del case study | `index.html` | Implementado |
| 5 Elementos UX (Jesse James Garrett) | `5-elementos.html` | Implementado |
| Estrategia (capa 1) | `estrategia.html` | Implementado (texto, videos e imágenes) |
| Alcance (capa 2) | `alcance.html` | Implementado (Matriz FVD) |
| Esqueleto (capa 4) | `esqueleto.html` | Implementado (wireframes en media) |
| Superficie (capa 5) | `superficie.html` | Parcial: UX Writing, Sistema de Diseño (Valores, Principios, Colores, Tipografía, Imágenes y Layout) , Componentes (Iconografía, Botones, Dropdowns y listas, Cards, y Logos y licencias) , Pruebas de Usabilidad, Iteraciones, Prototipo y el cierre «Fin del proyecto» implementados, con todos sus videos e imágenes |
| Cuestionario del Usuario 1 (Superficie) | `superficie-usuario-1.html` | Implementado (imágenes provisorias) |
| Cuestionario del Usuario 2 (Superficie) | `superficie-usuario-2.html` | Implementado (imágenes provisorias) |
| Cuestionario del Usuario 3 (Superficie) | `superficie-usuario-3.html` | Implementado (imágenes provisorias) |
| Guión de las pruebas (Superficie) | `superficie-guion.html` | Implementado (1 imagen provisoria) |
| Navegación general del portfolio (otros case studies) | — | Pendiente |

## Home (`index.html`)

1. **Hero**: video de fondo, logo de iRacing, título «¿Y si la UX fuera tan fluida como en la pista?» e íconos de las herramientas usadas (Figma, Make, Photoshop, UX Tweak).
2. **Contexto**: relato en segunda persona de cómo un usuario nuevo llega a iRacing, con una imagen.
3. **¿Por qué el rediseño?**: 4 testimonios de usuarios reales y el botón «Ver fuente», que abre una planilla de Google Sheets con las fuentes.
4. **Plataforma actual**: explica que iRacing tiene una *plataforma* (buscar carreras) y un *simulador* (correr), y que el rediseño apunta a la plataforma. Muestra 6 comparativas Antes/Después en video:
   - Lista de carreras · Registro a la carrera · Detalles de la carrera · Calendario · Detalles de autos y pistas · Carrito de compras.

   Los videos se reproducen solos, sin sonido y en bucle, solo mientras se ven en pantalla.
   CTA **«Probar prototipo»** → prototipo de Figma (pestaña nueva).
5. **Objetivos**: objetivos de negocio (retener usuarios, aumentar compras) y de usuario (encontrar una carrera adecuada a su nivel, comprar fácil), la frase del problema (flujo de usuarios → frustración → churn) y 3 videos que lo ilustran.
6. **Proceso de Diseño**: botón «¿Qué son los 5 elementos?» (→ `5-elementos.html`) y 5 tarjetas. **las 5 tarjetas navegan**; antes todavía no hacen nada visible.

## 5 Elementos UX (`5-elementos.html`)

- Presenta a Jesse James Garrett y el modelo de 5 capas (de abstracto a concreto: Estrategia, Alcance, Estructura, Esqueleto, Superficie), con un diagrama de círculos y uno de capas.
- Una sección por capa con su propósito y técnicas. Botones «Ir a…» para moverse entre secciones.
- «Ver Estrategia», «Ver Alcance», «Ver Estructura» y «Ver Esqueleto» llevan a su página (también las tarjetas del final); «Ir a Superficie» y su tarjeta llevan a Superficie.
- Breadcrumb para volver al Home.

## Estrategia (`estrategia.html`)

Cuatro bloques con navegación interna:

1. **Evaluaciones Heurísticas**: 3 hallazgos (libertad y control, consistencia, estética minimalista), cada uno con problema y propuesta.
2. **Encuestas**: objetivos, 11 usuarios por país (España 8; Argentina, EE. UU., Canadá y Chile 1 cada uno), canales de contacto (Twitch de Stradi, Global Racing League), citas por tema y 3 hipótesis validadas.
3. **Mapa de Trayectoria**: persona «Sergio Barrientos», escenario hipotético de 5 pasos, experiencia en 14 pasos con reacciones, y descubrimientos con sus soluciones (License Progress, tab Cars, nombres en naranja para lo que hay que comprar, carrito dentro de la plataforma).
4. **Lean UX Canvas**: problema de negocio, arquetipos, soluciones, resultados esperados (+20 % de permanencia de usuarios nuevos en 3 meses, +40 % de AOV) e hipótesis.

**Menú de capas:** en la barra superior, la palabra «Estrategia» del breadcrumb (arriba a la izquierda) es un botón con una flecha; el título central no cambia. Al hacer click se despliega debajo de esa palabra un menú con las otras capas del proceso (Alcance, Estructura, Esqueleto y Superficie) y la flecha apunta hacia arriba. Alcance lleva a `alcance.html` y Estructura a `estructura.html`; Esqueleto y Superficie todavía no llevan a ninguna parte: se ven atenuadas y no se pueden abrir. El menú se cierra con un segundo click en la palabra, un click fuera del menú o la tecla Escape (que devuelve el foco al botón). Se maneja también con teclado (Tab, Enter o Espacio).

«Ver Alcance» (arriba a la derecha) lleva a Alcance. Cierre: «Siguiente elemento UX», cuya tarjeta «Sigue acá» lleva a Alcance.

**Videos e imágenes:** cada hallazgo, resultado de encuesta, paso del escenario hipotético, paso de la experiencia y descubrimiento tiene su captura o su video. Los videos se reproducen solos, en bucle y sin sonido. En «Estética y diseño minimalista» se ven dos capturas, una debajo de la otra. En «Lista de carreras» y «Carrito de compras» la imagen alterna entre antes y después cada 2 segundos (si el sistema pide reducir el movimiento, queda fija en el después).

«Ver respuestas» abre en una pestaña nueva la planilla de respuestas de la encuesta.

## Alcance (`alcance.html`)

Una sola sección, la **Matriz FVD** (factibilidad, viabilidad y deseabilidad), que ordena 12 soluciones en 4 cuadrantes.

- **Encabezado:** título «Matriz FVD», subtítulo «Factibilidad, viabilidad y deseabilidad» y la leyenda centrada «★ Máxima prioridad».
- **Ejes:** eje vertical dorado con flecha y la etiqueta «Muy deseable»; eje horizontal dorado con flecha y la etiqueta «Muy factible»; «Poco deseable y factible» en el origen. Divisiones punteadas entre cuadrantes y un número grande por cuadrante.
- **Cuadrante 1** (arriba a la derecha, número dorado con estrella, máxima prioridad), 5 tarjetas con borde dorado y texto más grande: ícono de carrito junto al perfil, pagos dentro de la UI, nueva vista License Progress, colorear autos y pistas que hay que comprar, botón de registro convertido en menú.
- **Cuadrante 2** (abajo a la derecha), 2 tarjetas: nueva sección «Cars» y mensajes de error con solución práctica.
- **Cuadrante 3** (arriba a la izquierda), 3 tarjetas: quitar columnas de la tabla de carreras para sumar el auto favorito, botón de registro como menú con más opciones y rediseño de la arquitectura de información para usuarios nuevos.
- **Cuadrante 4** (abajo a la izquierda), 2 tarjetas: botón para abortar la carga del simulador y breadcrumb en lugar de modales.
- **Mobile (640 px o menos):** los cuadrantes se apilan en orden 1, 2, 3, 4, cada uno con su número y una leyenda de texto que explica qué significa; los ejes se ocultan.
- **Navegación:** breadcrumb con el menú de capas (Estrategia, Estructura, Esqueleto y Superficie habilitadas; Alcance no figura), botón azul «Ver Estructura» que lleva a `estructura.html` y cierre «Siguiente elemento UX» (Estamos acá: Alcance; Sigue acá: Estructura; también: Estrategia, Esqueleto y Superficie).

## Estructura (`estructura.html`)

Cuatro bloques con navegación interna («Ir a…»):

1. **Arquitectura Actual** («Encontrando las carreras»): una captura de la UI original de iRacing que se puede recorrer. Al hacer click en el menú lateral (Home, Profile, My Content, Official, Leagues, Hosted, Teams, Spectate, Time Attack, AI Single Player, Results & Stats, Replays; Racing y Shop en el riel; Cars y Tracks dentro de Shop) la captura cambia a esa sección. Las zonas de click son invisibles; la indicación «Click aquí» señala dónde empezar. Merch, Gift Cards y los botones dentro de cada pantalla no hacen nada.
2. **Tree Testing** («Dónde deberían estar las carreras»): estudio en UXtweak con 10 usuarios y 2 tareas. Cada tarea tiene:
   - una tarjeta con el enunciado;
   - un ícono de ayuda (?) que abre una nota. La nota se cierra con un click afuera, con otro click en el ícono o con Escape;
   - el árbol de navegación original de iRacing, con las respuestas correctas en verde y las incorrectas en rojo. Tarea 1: 7 correctas y 3 incorrectas. Tarea 2: 10 correctas;
   - un botón «Ver más detalles» que abre la página de detalle de esa tarea.

   Cierra con 3 **Conclusiones**: nomenclatura confusa, arquitectura ambigua y categorías mal contenidas.
3. **Arquitectura Nueva**: árbol propuesto con 7 categorías principales; Racing agrupa Official, Hosted, Leagues, Time Attack, AI Single Player, Results & Stats y Replays. Un selector «Antes / Después» alterna entre ese árbol («Después», por defecto) y el árbol original de iRacing («Antes»).
4. **Taskflow** («Necesidades del piloto»): la persona Sergio Barrientos con sus objetivos (como en Estrategia) y los flujos de 5 pasos de las dos tareas, desde «Inicio» (borde verde) hasta «Fin» (borde azul):
   - registrarse a una carrera de licencia D y sport cars;
   - comprar el auto necesario para otra carrera.

**Mobile (640 px o menos):** los árboles se ven como listas con sangría por nivel, sin scroll horizontal.

**Navegación:**
- Breadcrumb con el menú de capas: todas las demás capas habilitadas.
- Botón azul «Ver Esqueleto», que lleva a `esqueleto.html`.
- Cierre «Siguiente elemento UX»: Estamos acá Estructura, Sigue acá Esqueleto, y también Estrategia, Alcance y Superficie.
## Detalle de la Tarea 1 (`estructura-tarea-1.html`)

Se abre desde «Ver más detalles» de la Tarea 1 en Estructura. El breadcrumb es «← Rediseño UX/UI › Estructura ⌄ › Tarea 1». La flecha vuelve a Estructura, a la sección Tree Testing; «Rediseño UX/UI» lleva al Home y «Estructura» abre el menú de capas. «Ver Esqueleto» lleva a Esqueleto.

1. **Enunciado** de la tarea, centrado.
2. **Estadísticas** («Resumen del éxito en la tarea»):
   - a la izquierda, qué significa éxito directo, éxito indirecto, fallo directo y fallo indirecto, cada uno con su ícono y su color;
   - a la derecha, las capturas de UXtweak: éxito 70 %, directness 20 %, la torta (60 % éxito indirecto, 20 % fallo indirecto, 10 % éxito directo y 10 % fallo directo) y la tabla de resultados.
3. **Pietree** («Representación visual del trayecto del usuario»): la leyenda de los 6 colores (dirección correcta, incorrecta, duda, se volvió, nominó la respuesta y se saltó la tarea) y la imagen del pietree.

Los gráficos son imágenes con su texto alternativo. En pantallas de 900 px o menos, las columnas se apilan.
## Detalle de la Tarea 2 (`estructura-tarea-2.html`)

Tiene la misma estructura y navegación que el detalle de la Tarea 1, con los datos de la Tarea 2 (comprar el auto):
- éxito 100 % (5 directos y 5 indirectos), sin fallos;
- directness 50 %;
- pietree del camino Shop › Content › Cars › Car Info.

La flecha del breadcrumb vuelve a Estructura.
## Esqueleto (`esqueleto.html`)

Una sección, **Wireframes en Media** («Empezando el rediseño»), con 4 wireframes en media fidelidad. Cada uno tiene un título con ícono y debajo los cambios que propone:
1. **Lista de series:** arquitectura nueva, carrito de compras y columnas ajustadas.
2. **Detalles de serie:**
   - indicador «MPR» (participar en la serie sube la licencia);
   - «Rules & Format» en un dropdown;
   - nueva disposición de tiempo, pilotos y CTA;
   - tablas de prácticas y carreras rediseñadas;
   - cards de autos, pistas y clima en 3 columnas.
3. **Calendario de la serie:** cards de eventos pasados, actuales y futuros, y «Content Manager» en un dropdown.
4. **Sección de autos:** nueva sección con los autos que compiten y la opción de elegir el favorito.

**Navegación:**
- Breadcrumb con el menú de capas: todas las demás capas habilitadas.
- Botón azul «Ver Superficie», que lleva a `superficie.html`.
- Cierre «Siguiente elemento UX»: Estamos acá Esqueleto, Sigue acá Superficie (lleva a `superficie.html`), y también Estrategia, Alcance y Estructura.

El menú de capas de las demás páginas, sus tarjetas, el Home y 5-elementos ya enlazan a Esqueleto.
## Cuestionario del Usuario 1 (`superficie-usuario-1.html`)

Se llega desde «Ver cuestionario» de la card «Usuario 1 | Franco» (Pruebas de Usabilidad). Arriba: breadcrumb «Rediseño UX/UI › Superficie › Franco» (la flecha vuelve a Pruebas de Usabilidad), el título «Usuario 1 | Franco» y «Ver Video», que abre en otra pestaña el mismo video que la card. Tres secciones, cada una con sus botones «Ir a…»:
1. **Cuestionario** («Facilidad de las tareas»): «Qué tan fácil fue…» y las 4 tareas con su puntuación en estrellas: elegir el Mazda (4 de 5), registrarse a la carrera (4 de 5), encontrar la serie (5 de 5) y añadir al carrito y comprar (5 de 5).
2. **Preguntas Cualitativas** («Entendiendo los detalles»): dos preguntas, cada una con la respuesta del usuario entre comillas y una captura (provisoria por ahora).
3. **Insights** («Descubrimientos para mejorar»): los 4 hallazgos de la card del usuario 1, con su ícono.

En celular las estrellas se achican y se acercan; las capturas ocupan el ancho.
## Cuestionarios de los usuarios 2 y 3 (`superficie-usuario-2.html` y `superficie-usuario-3.html`)

Tienen la misma estructura y navegación que la del usuario 1. «Ver Video» abre el video de cada usuario, y el breadcrumb termina en su nombre.
- **Usuario 2 | Martín:** puntuó 0, 0, 4 y 5 estrellas; a la derecha de las dos primeras filas se lee «No terminó la tarea» con un emoji de shrug (en celular, debajo). Responde tres preguntas (le costó encontrar la serie; destaca lo visible y fácil de la compra; le faltaron los logos de autos y pistas), cada una con su captura provisoria. Tiene 6 insights.
- **Usuario 3 | Fede:** puntuó 2, 4, 5 y 3 estrellas. Responde una pregunta (le faltó una estrellita para marcar el auto como favorito) con su captura provisoria. Tiene 6 insights.

Los insights de estas páginas siguen sus referencias y no coinciden exactamente con las cards de Superficie.
## Guión de las pruebas (`superficie-guion.html`)

Se llega desde «Leer guión completo» (Pruebas de Usabilidad). Arriba: breadcrumb «Rediseño UX/UI › Superficie › Guión», el título «Guión de las pruebas» y «Ver Video», que abre una de las pruebas en otra pestaña. Es el guion que se leyó a cada usuario, en siete secciones con sus botones «Ir a…»:
1. **Introducción** («Agradecimientos y saludos»): presentación, permiso para grabar, «no hay respuestas correctas o incorrectas» y pedido de pensar en voz alta.
2. **Contexto** («Sobre iRacing»): qué es el juego, su objetivo y la puntuación de habilidad, las licencias y el horario fijo de las carreras. Cada bloque se acompaña de una imagen; la del gráfico es provisoria.
3. **Ambientación** («En la piel del piloto»): el escenario del usuario nuevo que llegó a la licencia D de sport cars.
4. **Instrucciones** («Probando el prototipo»): cómo hacer la prueba y las dos tareas, cada una con «Intentar en prototipo» (abre el prototipo de Figma en otra pestaña), el enunciado, el logo de la serie con su licencia Clase D y el auto.
5. **Cuestionario** («Facilidad de las tareas»): las cuatro preguntas «¿Qué tan fácil fue…?», cada una con su imagen.
6. **Preguntas Cualitativas** («Entendiendo los detalles»): las tres preguntas abiertas, numeradas.
7. **Cierre** («Agradecimientos»).

En tablet y celular, las filas de Contexto y el cuestionario pasan a una columna, con la imagen debajo del texto.
## Superficie (`superficie.html`) — UX Writing y Sistema de Diseño

Encabezado «UX Writing» con el link «Saltar a Sistema de Diseño», que baja a esa sección. Arriba a la derecha, «Ver Prototipo» abre el prototipo de Figma en una pestaña nueva.

1. **Círculo de Oro** («Identidad de la marca»): tres bloques, ¿Por qué?, ¿Cómo? y ¿Qué?. Cada uno tiene el diagrama de círculos con su anillo resaltado y el texto que lo explica.
2. **Matriz de Voz** («Definiendo la personalidad»): tabla con Autenticidad, Claridad y Conciso aplicados a concepto, verbosidad, vocabulario, gramática, puntuación y uso de mayúsculas.
3. **Matriz de Tono** («Cómo se le habla al piloto»): sobre la trayectoria del usuario, Log in y Carrito de compras van en tono informativo y serio, y Lista de carreras y Detalles de carrera en tono casual y directo.
4. **Guía de Estilo** («Cómo se le habla al piloto»): reglas y buenas y malas prácticas para títulos de columnas, filtros y tags, numeración, títulos y subtítulos, y botones. «Ir a Valores» baja al Sistema de Diseño.

**Sistema de Diseño** (título grande con el link «Volver a UX Writing»):

5. **Valores** («El combustible de la marca»): Autenticidad, Claridad y Conciso, cada uno con su descripción.
6. **Principios** («Las reglas de comunicación»): Simple, Entendible, Escalonado y Eficiente, cada uno con su ícono y lo que exige.
7. **Colores** («Accesibilidad y armonía»): neutrales, primario azul, secundario naranja, éxito, advertencia y error, con tono y código hex, y para qué se usa cada grupo. Al final, los estados (hover, selected, activated, pressed y dragged) con su opacidad sobre gris y sobre azul.
8. **Tipografía** («Transmitiendo los valores y principios»): tabla de 10 estilos con nombre, uso y un ejemplo del rediseño. Cada nombre se muestra en su propio estilo, de «10 Inter - label 3 - medium» a «36 Exo 2 - Title 1 - bold». «Ir a Imágenes» baja a la sección siguiente.
9. **Imágenes** («Autenticidad... ah ya lo dije?»): una frase sobre autos reales, circuitos y logos oficiales; una fila con dos autos (Corvette y BMW) y dos logos de carreras (IMSA y Formula A); debajo, el mapa de un circuito.
10. **Layout** («Espacio y organización»): el esquema de la grilla de pantalla (Page nav, Page title, Navigation tabs, Page content, Licenses). Al pasar el mouse, enfocarlo con el teclado o tocarlo en el celular, cambia con un fundido a la pantalla Racing con la grilla aplicada. «Ir a Componentes» baja a la sección siguiente.
11. **Componentes** («Elementos visuales reutilizables»), parte **Iconografía**: un encabezado con banderas doradas y, dentro de un recuadro punteado, los 68 íconos del rediseño. Debajo, «Estilo relleno» con un trofeo dorado y «3 tamaños» con el trofeo a 16, 20 y 24 px. Su botón «Ir a Pruebas de Usabilidad» lleva a la sección siguiente (antes decía «Ir a Motion»; esa sección se descartó).
12. **Botones** (dentro de Componentes): «Originalmente» muestra los botones viejos (Register, View Series y Add to Cart: primario, secundario y compras). «Ahora» muestra los nuevos (Race, Test Drive y Add to Cart), que reaccionan al pasar el mouse y al presionarlos pero no llevan a ningún lado. El Register verde aparece tachado: el verde queda reservado para estados de «éxito». Al final, tres botones «Cambiar estilo» de 48, 40 y 32 px: cada click los pasa al estilo siguiente (primario, secundario, compras, bordeado y solo texto), también con Enter o Espacio. Leyendas: «5 estilos», «4 estados» y «3 tamaños».
13. **Dropdowns y listas:** cuatro dropdowns «Filters» (default, hover, presionado y con 3 filtros seleccionados) dentro de un recuadro punteado, y una lista de opciones con checkbox en sus cuatro estados. Son imágenes.
14. **Cards:** cuatro cards con su título.
    - «Elegir auto» cambia de auto cada 3 segundos (Mazda, Toyota, BMW y Clio, en bucle).
    - «Comprar auto» muestra el Clio con un triángulo naranja y un carrito en la esquina.
    - «Pista» muestra el mapa de Spa y «Clima», el clima de la carrera.
    - Al pasar el mouse (o enfocar con el teclado), la card se marca con un borde de 2 px: azul en Elegir auto, Pista y Clima, y naranja en Comprar auto, que además muestra el precio «$12.95» arriba a la izquierda. Las cards no llevan a ningún lado.
    - «Detalles de auto», debajo, muestra dos imágenes con bordes redondeados: el BMW M2 a la izquierda (5 vistas) y el Ferrari 296 a la derecha (4 vistas). Cada una pasa a la vista siguiente cada 3 segundos, en bucle. No reaccionan al mouse.
15. **Logos y licencias:** cuatro filas. Son imágenes y no llevan a ningún lado.
    - Dos filas de 10 logos de series (Legends Road Cup, GT4, GR Cup, Ferrari, Mustang, Rain Master, TCR, Clio Cup, Mission R, Nürburgring, Global Challenge, Power Challenge, SCCA, M2 Cup, Production Car, Production Endurance, MX-5 Cup, Formula Vee y Formula 1600), repartidas a todo el ancho. En tablet y celular cada fila pasa a dos de 5.
    - Una fila de 9 marcas centradas: Mazda, Toyota, BMW, Ferrari, Ford, Porsche, Renault, Ray y Formula Vee.
    - Las 5 licencias R, D, C, B y A, cada una con el ícono de auto, la letra y su color (rojo, naranja, amarillo, verde y azul).
    - Las marcas y las licencias se acomodan en varias líneas en pantallas angostas.
16. **Pruebas de Usabilidad** («Validando decisiones de diseño»):
    - **Contexto y tareas para el usuario:** el escenario que se le leyó a cada usuario (un usuario nuevo que llegó a la Licencia D de Sport Cars) y las dos tareas con sus objetivos. «Intentar en prototipo» abre en otra pestaña el prototipo de Figma de cada tarea.
    - **Insights:** lo que sí funcionó (ejecución de la tarea 2, feedbacks, CTA y tablas) y lo que no (filtros, elección del auto favorito y el problema del usuario nuevo).
    - **Usuarios:** una card por usuario (Franco, Martín y Fede) con lo que le costó, lo que le resultó fácil y sus sugerencias. «Ver video» abre la grabación de la prueba en Google Drive, en otra pestaña.
    - **Conclusiones:** «Fue muy mala idea dejar filtros previamente activados y muy mal diseñados» y una card «Filtros» con el problema y sus causas.
    - «Ver cuestionario» de cada usuario lleva a su página (`superficie-usuario-1.html`, `-2` y `-3`). «Leer guión completo» lleva al guión (`superficie-guion.html`). Ya no quedan botones sin destino en Superficie. «Ir a Iteraciones» lleva a la sección siguiente.
17. **Iteraciones** («Puliendo el producto»): qué cambió después de las pruebas.
    - **License Progress:** «Solución para nuevos usuarios» con cuatro puntos (separado por disciplinas, barra de progresión de licencia, primero solo lo que puede correr y luego lo que puede comprar) y «Probar funcionalidad», que abre el prototipo de Figma en otra pestaña. El título y el botón están centrados respecto de los puntos.
    - **All Series**, **Filtros y búsqueda** y **Registro a la carrera:** cada una compara «Antes» y «Después» y tiene un botón «Probar…» que abre su prototipo en otra pestaña. All Series suma una imagen de la pantalla nueva con flechas que señalan cada cambio.
    - License Progress muestra un video en bucle; All Series, Filtros y búsqueda y Registro a la carrera, sus capturas de antes y después.
    - «Ir a Prototipo» lleva a la última sección.
18. **Prototipo** («Un prototipo vale más que mil imágenes»): la última sección. Tres bloques con un video en bucle del prototipo, un resumen y «Abrir prototipo», que abre el prototipo de Figma en otra pestaña. El subtítulo y el botón están centrados respecto de los puntos:
    - **License Progress:** «Solución para nuevos usuarios».
    - **Encontrar tu carrera:** «Nueva tabla, nuevos detalles» (tab «Cars», calendario y detalles de autos/pistas, imágenes de autos y pistas, nuevo texto en los CTA y filtros rediseñados).
    - **Carrito de compras:** «Compra en un solo lugar» (carrito sin abandonar la plataforma e información sobre descuentos).
19. **Fin del proyecto**: cierre de la página y del case study. «Fin del proyecto» entre dos banderas a cuadros, «Gracias por ver» y los datos de contacto:
    - **LinkedIn** y **Behance** («Franco Javier Aguirre») abren el perfil en otra pestaña.
    - El correo y el teléfono se muestran como texto.
    - Debajo, las 5 cards de las capas (Estrategia, Alcance, Estructura, Esqueleto y Superficie) llevan a cada página, como en «Siguiente elemento UX».

Cada subsección tiene botones para ir a la anterior y a la siguiente.

**Celular:** las tablas pasan a bloques por fila, con el nombre de cada columna. La Matriz de Tono se muestra como lista de pasos con su tono. Valores se apila, Principios pone la tarjeta arriba de la descripción y las muestras de color van de a 2. Las cuatro imágenes pasan a dos columnas; el circuito y el layout ocupan el ancho. Los íconos se reacomodan en más filas y, en celular, «Estilo relleno» y «3 tamaños» se apilan, igual que las filas de botones; las cards pasan a dos columnas en tablet y a una en celular; las imágenes de Detalles de auto se apilan en celular. En Pruebas de Usabilidad, las cards de a dos pasan a una columna en tablet y los botones de cada card bajan debajo del título en celular. En Iteraciones, la imagen y el texto de License Progress se apilan y Antes/Después pasan a una columna en tablet y celular; las indicaciones de la imagen de All Series se ven muy chicas en celular. Los bloques de Prototipo se apilan igual que License Progress. En el cierre, los contactos pasan a dos columnas en tablet y a una en celular, y las cards de capas a dos y a una.
## Descubrimiento por buscadores y asistentes de IA

- Cada página tiene un título y una descripción propios en español (que nombran el proyecto y a Franco Aguirre). Se usan en los resultados de búsqueda y en las vistas previas al compartir el enlace (Open Graph y Twitter Card). No cambia nada de lo que se ve en pantalla.
- Cada página incluye datos estructurados (schema.org): tipo de obra, autor, año 2025, idioma español, tema y la ruta de navegación (Rediseño UX/UI → página).
- El archivo `llms.txt`, en la raíz del sitio, resume en texto el problema, los objetivos, el proceso, las 6 comparativas Antes/Después y el estado de cada página, para que un asistente de IA pueda entender el case study sin ver los videos. Describe solo lo que dice el sitio: de «Calendario» y «Detalles de autos y pistas» el sitio no explica qué cambió, y el archivo lo aclara.
- Se corrigió «James Garret» por «James Garrett» en el título y el encabezado de `5-elementos.html`.

**Pendiente (necesita dominio u otras decisiones):** vista previa con imagen, enlace canónico, sitemap, `robots.txt` y política para crawlers de IA, ícono del sitio (favicon), versión en inglés y perfiles del autor.

## Reglas de diseño vigentes

Del [README](../../README.md#reglas-de-diseño-del-proyecto-para-próximas-adiciones):
- Las cards oscuras sin imagen usan negro al 60 % para que se vea el fondo fijo.
- El fondo (`background.png`) queda fijo; en el Home empieza después de Hero y Contexto.
- Hay 3 tamaños de botón (72, 48 y 40 px).
- Se diseña a 1920 px con margen de 80 px y escala de forma fluida.

## Límites

- Contenido solo en español (sin versión en inglés todavía).
- El sitio no mide visitas ni guarda datos.
- Las citas de usuarios y el prototipo dependen de servicios externos (Google Sheets, Figma).
