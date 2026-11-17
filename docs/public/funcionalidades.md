# Funcionalidades

## Actores

- **Lector del portfolio** (reclutador, líder de diseño, colega): recorre el case study, mira las comparativas y puede abrir el prototipo y las fuentes.
- **Autor** (Franco Aguirre): mantiene el contenido. No hay panel de administración; edita los archivos a mano.

No hay cuentas, login, formularios ni datos de usuario.

## Mapa de páginas

| Página | Archivo | Estado |
|---|---|---|
| Home del case study | `index.html` | Implementado |
| 5 Elementos UX (Jesse James Garrett) | `5-elementos.html` | Implementado; los CTA a las capas 2–5 todavía no llevan a ninguna parte |
| Estrategia (capa 1) | `estrategia.html` | Parcial: el texto está completo, las imágenes son placeholders |
| Alcance, Estructura, Esqueleto, Superficie | — | Pendiente (no existen) |
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
6. **Proceso de Diseño**: botón «¿Qué son los 5 elementos?» (→ `5-elementos.html`) y 5 tarjetas. **Solo «Estrategia» navega**; las otras 4 todavía no hacen nada visible.

## 5 Elementos UX (`5-elementos.html`)

- Presenta a Jesse James Garrett y el modelo de 5 capas (de abstracto a concreto: Estrategia, Alcance, Estructura, Esqueleto, Superficie), con un diagrama de círculos y uno de capas.
- Una sección por capa con su propósito y técnicas. Botones «Ir a…» para moverse entre secciones.
- Solo «Ver Estrategia» lleva a una página; «Ver Alcance», «Ver Estructura», «Ver Esqueleto» e «Ir a Superficie» están pendientes.
- Breadcrumb para volver al Home.

## Estrategia (`estrategia.html`)

Cuatro bloques con navegación interna:

1. **Evaluaciones Heurísticas**: 3 hallazgos (libertad y control, consistencia, estética minimalista), cada uno con problema y propuesta.
2. **Encuestas**: objetivos, 11 usuarios por país (España 8; Argentina, EE. UU., Canadá y Chile 1 cada uno), canales de contacto (Twitch de Stradi, Global Racing League), citas por tema y 3 hipótesis validadas.
3. **Mapa de Trayectoria**: persona «Sergio Barrientos», escenario hipotético de 5 pasos, experiencia en 14 pasos con reacciones, y descubrimientos con sus soluciones (License Progress, tab Cars, nombres en naranja para lo que hay que comprar, carrito dentro de la plataforma).
4. **Lean UX Canvas**: problema de negocio, arquetipos, soluciones, resultados esperados (+20 % de permanencia de usuarios nuevos en 3 meses, +40 % de AOV) e hipótesis.

**Menú de capas:** en la barra superior, la palabra «Estrategia» del breadcrumb (arriba a la izquierda) es un botón con una flecha; el título central no cambia. Al hacer click se despliega debajo de esa palabra un menú con las otras capas del proceso (Alcance, Estructura, Esqueleto y Superficie) y la flecha apunta hacia arriba. Esas opciones todavía no llevan a ninguna parte: se ven atenuadas y no se pueden abrir. El menú se cierra con un segundo click en la palabra, un click fuera del menú o la tecla Escape (que devuelve el foco al botón). Se maneja también con teclado (Tab, Enter o Espacio).

Cierre: «Siguiente elemento UX», que debería llevar a Alcance (pendiente).

**Partes incompletas:** las imágenes de hallazgos y escenarios son recuadros punteados con el nombre del archivo esperado; «Ver Alcance» todavía no lleva a ninguna parte. «Ver respuestas» abre en una pestaña nueva la planilla de respuestas de la encuesta.

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
