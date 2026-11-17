# Constitución del proyecto

Aplicar primero `.cardenal/templates/execution-policy.md`; prevalece sobre defaults operativos de este documento.


**Versión:** 0.2.0 · Pertenece al proyecto: Cardenal la crea una vez y no la sobrescribe.

Estado: relevado por `/inicializate` (2026-11-17). Los principios citan su fuente; lo que no tiene fuente queda en «Preguntas abiertas». Subir la versión al cambiarla (PATCH aclaraciones · MINOR principio nuevo · MAJOR regla que rompe las previas).

## Artículo I — Alcance
Solo se implementa lo pedido. El trabajo fuera de alcance se registra como pendiente, no como código parcial. Para contenido todavía no disponible se usa el patrón existente `.media-placeholder[data-label]` (fuente: `README.md`, `estrategia.html`).

## Artículo II — Datos y servicios externos
Ninguna migración de datos ni escritura en servicios externos se ejecuta sin aprobación explícita del usuario, mostrando antes el cambio y su impacto. El sitio no tiene backend: las integraciones son enlaces salientes (Google Fonts, Google Sheets, Figma, Twitch, GRL). Agregar scripts de terceros, analítica o llamadas a APIs requiere una decisión explícita.

## Artículo III — Verificación
No hay tests, linter ni CI en el repo (no existe `package.json`). La verificación vigente es QA manual: abrir las páginas afectadas en un navegador y revisarlas en escritorio (1920 px) y en los breakpoints 1300/900/640 px, sin errores en la consola y sin enlaces o assets rotos. TDD aplica solo si el usuario incorpora infraestructura de tests; `qualityGates` queda vacío hasta entonces.

## Artículo IV — Git
Rama y checkout actuales; sin ramas, worktrees ni PR automáticos. Conventional Commits con archivos específicos. Finales de línea normalizados por `.gitattributes` (`* text=auto`).

## Artículo V — Seguridad
No exponer secretos ni registrar datos sensibles. docs/private queda local e ignorado por Git para información confidencial. Los enlaces externos que abren pestaña nueva usan `target="_blank" rel="noopener"` (fuente: `index.html`, `estrategia.html`).

## Artículo VI — Stack y convenciones
1. **Stack**: HTML5 + CSS + JavaScript vanilla, sin build ni dependencias. Todo debe funcionar abriendo el archivo directamente (`file://`), con rutas relativas (fuente: `README.md`).
2. **Idioma**: contenido y comentarios en español rioplatense; `lang="es"`.
3. **Estilos**: los colores y fuentes salen de los tokens de `:root` en `styles.css`; no usar valores hex sueltos para colores de la paleta. `styles.css` es la base común; las páginas internas agregan `elementos.css` y una hoja por página (`<pagina>.css`), acotadas con una clase en `body` (`page-elementos`, `page-<pagina>`).
4. **Medidas**: se diseña a 1920 px con margen de 80 px y se escala con `clamp()` (fuente: `README.md`, `styles.css`).
5. **Reglas visuales**: las cards oscuras sin imagen usan `var(--card-bg)`; el fondo fijo va en una capa `position: fixed`; hay 3 tamaños de botón (72/48/40 px) según el README.
6. **Tipografía**: Exo 2 (títulos), Poppins (cuerpo), Inter (botones), desde Google Fonts.
7. **Páginas internas**: `topbar` con breadcrumb que vuelve a `index.html`, secciones `.layer-sec` con `id` y navegación «Ir a…» por anclas, y cierre con las tarjetas de proceso.
8. **Media**: los videos de contenido usan `muted loop playsinline preload="none"` y la reproducción se controla por visibilidad (`script.js`). Los assets van en `assets/` con nombres en kebab-case.
9. **Accesibilidad**: `alt` descriptivo en imágenes de contenido, `alt=""` en las decorativas y `aria-label` en los videos.

## Preguntas abiertas
- Hosting y límites de tamaño de los assets (ver `.cardenal/repository-context.json`, `q-hosting`).
- ¿Se adopta alguna verificación automática (por ejemplo, validación HTML o un chequeo de enlaces)? Hasta que se decida, no es regla.
