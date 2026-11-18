# Spec: Arquitectura Actual navegable

**Carpeta:** `specs/0006-arquitectura-actual-navegable/` · **Estado:** aprobado para implementar · **Ficha:** `.cardenal/context.json`

## Contexto
- **Actor:** lector del portfolio en la sección «Arquitectura Actual» de `estructura.html`.
- **Problema:** la sección tiene un placeholder. La idea (`d-placeholder` de 0005) es que el lector recorra la UI original de iRacing haciendo click sobre su menú.
- **Resultado:** una captura de la UI original con botones invisibles sobre los ítems del menú. Al hacer click, la captura cambia a la sección correspondiente.
- **Fuente:** 14 capturas del usuario (1919 × 1079, nombradas por sección), recortadas a la ventana de la app (sin barra de título ni barra de tareas de Windows: y 32–1030, 1920 × 998) y guardadas como JPG (calidad 85) en `assets/arquitectura-actual/`.

## Capturas y zonas
| Captura | Archivo | Menú lateral visible |
|---|---|---|
| Home (inicial) | `home.jpg` | Racing |
| Profile | `profile.jpg` | Racing |
| My Content | `my-content.jpg` | Racing |
| Official | `official.jpg` | Racing |
| Leagues | `leagues.jpg` | Racing |
| Hosted | `hosted.jpg` | Racing |
| Teams | `teams.jpg` | Racing |
| Spectate | `spectate.jpg` | Racing |
| Time Attack | `time-attack.jpg` | Racing |
| AI Single Player | `ai-single-player.jpg` | Racing |
| Results & Stats | `results-stats.jpg` | Racing |
| Replays | `replays.jpg` | Racing |
| Shop › Cars | `shop-cars.jpg` | Shop |
| Shop › Tracks | `shop-tracks.jpg` | Shop |

- **Menú Racing:** 12 zonas sobre Home … Replays. Riel izquierdo: «Racing» (→ Home) y «Shop» (→ Shop › Cars).
- **Menú Shop:** zonas sobre Cars y Tracks. Riel: «Racing» (→ Home) y «Shop» (→ Shop › Cars). Merch y Gift Cards no tienen captura y no llevan zona.
- Las zonas se ubican en % de la captura, así que escalan con ella.

## Requisitos
- **FR-001:** La captura reemplaza al placeholder con el mismo ancho (1462 px a 1920) y proporción 1920/998. Empieza en Home.
- **FR-002:** Botones invisibles (`<button>`, sin fondo ni borde) sobre cada ítem; al hacer click cambian `src` y `alt` de la captura y muestran el juego de zonas del menú correspondiente (Racing o Shop).
- **FR-003:** Accesibles: `aria-label` «Ver sección X de iRacing», foco visible solo con teclado (`:focus-visible`), y `aria-current="true"` en la zona de la sección mostrada. El `alt` dice qué sección se ve.
- **FR-004:** Indicación «Click aquí 👉» a la izquierda de la captura, a la altura de Shop, como en el diseño de 0005. Se oculta cuando no hay margen (≤ 900 px).
- **FR-005:** Funciona desde `file://`, sin dependencias; la lógica va en `estructura.js`.
- **FR-006:** Docs y `llms.txt` actualizados.

## Fuera de alcance
- Zonas dentro del contenido de cada captura (tabs, botones de tablas) y en la barra superior.
- Animaciones de transición.

## Aclaraciones
- **Supuestos (no consultados, avisar al usuario):** recorte de la barra de título y de la barra de tareas de Windows; conversión a JPG para que pese ~3 MB en total en lugar de ~12 MB; la indicación usa el emoji 👉 porque el diseño no trae un ícono de mano.
