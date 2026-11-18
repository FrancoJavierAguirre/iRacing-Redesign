# Funcionalidades

## Actores

- **Lector del portfolio** (reclutador, líder de diseño, colega): recorre el case study, mira las comparativas y puede abrir el prototipo y las fuentes.
- **Autor** (Franco Aguirre): mantiene el contenido. No hay panel de administración; edita los archivos a mano.

No hay cuentas, login, formularios ni datos de usuario.

## Mapa de páginas

| Página | Archivo | Estado |
|---|---|---|
| Home del case study | `index.html` | Implementado |
| 5 Elementos UX (Jesse James Garrett) | `5-elementos.html` | Implementado; los CTA a las capas 3–5 todavía no llevan a ninguna parte |
| Estrategia (capa 1) | `estrategia.html` | Parcial: el texto está completo, las imágenes son placeholders |
| Alcance (capa 2) | `alcance.html` | Implementado (Matriz FVD); «Ver Estructura» todavía no lleva a ninguna parte |
| Estructura, Esqueleto, Superficie | — | Pendiente (no existen) |
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
6. **Proceso de Diseño**: botón «¿Qué son los 5 elementos?» (→ `5-elementos.html`) y 5 tarjetas. **«Estrategia» y «Alcance» navegan**; las otras 3 todavía no hacen nada visible.

## 5 Elementos UX (`5-elementos.html`)

- Presenta a Jesse James Garrett y el modelo de 5 capas (de abstracto a concreto: Estrategia, Alcance, Estructura, Esqueleto, Superficie), con un diagrama de círculos y uno de capas.
- Una sección por capa con su propósito y técnicas. Botones «Ir a…» para moverse entre secciones.
- «Ver Estrategia» y «Ver Alcance» llevan a su página (también la tarjeta Alcance del final); «Ver Estructura», «Ver Esqueleto» e «Ir a Superficie» están pendientes.
- Breadcrumb para volver al Home.

## Estrategia (`estrategia.html`)

Cuatro bloques con navegación interna:

1. **Evaluaciones Heurísticas**: 3 hallazgos (libertad y control, consistencia, estética minimalista), cada uno con problema y propuesta.
2. **Encuestas**: objetivos, 11 usuarios por país (España 8; Argentina, EE. UU., Canadá y Chile 1 cada uno), canales de contacto (Twitch de Stradi, Global Racing League), citas por tema y 3 hipótesis validadas.
3. **Mapa de Trayectoria**: persona «Sergio Barrientos», escenario hipotético de 5 pasos, experiencia en 14 pasos con reacciones, y descubrimientos con sus soluciones (License Progress, tab Cars, nombres en naranja para lo que hay que comprar, carrito dentro de la plataforma).
4. **Lean UX Canvas**: problema de negocio, arquetipos, soluciones, resultados esperados (+20 % de permanencia de usuarios nuevos en 3 meses, +40 % de AOV) e hipótesis.

**Menú de capas:** en la barra superior, la palabra «Estrategia» del breadcrumb (arriba a la izquierda) es un botón con una flecha; el título central no cambia. Al hacer click se despliega debajo de esa palabra un menú con las otras capas del proceso (Alcance, Estructura, Esqueleto y Superficie) y la flecha apunta hacia arriba. Alcance lleva a `alcance.html`; Estructura, Esqueleto y Superficie todavía no llevan a ninguna parte: se ven atenuadas y no se pueden abrir. El menú se cierra con un segundo click en la palabra, un click fuera del menú o la tecla Escape (que devuelve el foco al botón). Se maneja también con teclado (Tab, Enter o Espacio).

«Ver Alcance» (arriba a la derecha) lleva a Alcance. Cierre: «Siguiente elemento UX», cuya tarjeta «Sigue acá» lleva a Alcance.

**Partes incompletas:** las imágenes de hallazgos y escenarios son recuadros punteados con el nombre del archivo esperado. «Ver respuestas» abre en una pestaña nueva la planilla de respuestas de la encuesta.

## Alcance (`alcance.html`)

Una sola sección, la **Matriz FVD** (factibilidad, viabilidad y deseabilidad), que ordena 12 soluciones en 4 cuadrantes.

- **Encabezado:** título «Matriz FVD», subtítulo «Factibilidad, viabilidad y deseabilidad» y la leyenda centrada «★ Máxima prioridad».
- **Ejes:** eje vertical dorado con flecha y la etiqueta «Muy deseable»; eje horizontal dorado con flecha y la etiqueta «Muy factible»; «Poco deseable y factible» en el origen. Divisiones punteadas entre cuadrantes y un número grande por cuadrante.
- **Cuadrante 1** (arriba a la derecha, número dorado con estrella, máxima prioridad), 5 tarjetas con borde dorado y texto más grande: ícono de carrito junto al perfil, pagos dentro de la UI, nueva vista License Progress, colorear autos y pistas que hay que comprar, botón de registro convertido en menú.
- **Cuadrante 2** (abajo a la derecha), 2 tarjetas: nueva sección «Cars» y mensajes de error con solución práctica.
- **Cuadrante 3** (arriba a la izquierda), 3 tarjetas: quitar columnas de la tabla de carreras para sumar el auto favorito, botón de registro como menú con más opciones y rediseño de la arquitectura de información para usuarios nuevos.
- **Cuadrante 4** (abajo a la izquierda), 2 tarjetas: botón para abortar la carga del simulador y breadcrumb en lugar de modales.
- **Mobile (640 px o menos):** los cuadrantes se apilan en orden 1, 2, 3, 4, cada uno con su número y una leyenda de texto que explica qué significa; los ejes se ocultan.
- **Navegación:** breadcrumb con el menú de capas (Estrategia habilitada; Estructura, Esqueleto y Superficie atenuadas; Alcance no figura), botón azul «Ver Estructura» que todavía no lleva a ninguna parte y cierre «Siguiente elemento UX» (Estamos acá: Alcance; Sigue acá: Estructura; también: Estrategia, Esqueleto y Superficie).

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
