# Spec 0018 — Superficie: Pruebas de Usabilidad

Entrada: ficha 0018 en `.cardenal/context.json` (archivada en esta carpeta al cerrar).

Referencia: `referencia-figma.webp` (789 × 2000 px, texto blanco sobre transparente; se compuso sobre el fondo del sitio para leerla). Escala aproximada 1:2,23 respecto de 1920 px.

## Contenido
- **Encabezado** (`#pruebas-de-usabilidad`): «Pruebas de Usabilidad» / «Validando decisiones de diseño», con «Ir a Componentes» e «Ir a Iteraciones».
- **Contexto y tareas para el usuario** (ícono check dorado), con «Leer guión completo» al final de la línea:
  - párrafo de contexto con frases resaltadas en dorado;
  - cards Tarea 1 y Tarea 2: título con ícono, botón naranja «Intentar en prototipo», descripción y «Objetivos» (ícono objetivos) con su lista.
- **Insights** (ícono lupa): cards «Lo que sí funcionó» (verde, pulgar arriba, ítems con check) y «Lo que no funcionó» (rojo, pulgar abajo, ítems con cruz).
- **Cards de usuario:** Usuario 1 | Franco, Usuario 2 | Martín y Usuario 3 | Fede, con «Ver cuestionario» y «Ver video». Ítems con check, cruz o lupa verde.
- **Conclusiones** (ícono lámpara): frase «Fue muy mala idea dejar filtros previamente activados y muy mal diseñados» entre dos manos, y card «Filtros» (ícono filtro) con dos párrafos y «Causas».
- «Ir a Motion» de Componentes pasa a «Ir a Pruebas de Usabilidad».

## Requisitos
- FR-001: «Intentar en prototipo» y «Ver video» abren en otra pestaña (`target="_blank" rel="noopener"`, con aviso para lectores de pantalla).
- FR-002: «Ver cuestionario» y «Leer guión completo» (páginas del proyecto que se harán después) e «Ir a Iteraciones» quedan sin destino (`data-sin-destino`, `aria-disabled`).
- FR-003: los íconos son decorativos; el significado de cada ítem (funcionó, no funcionó, sugerencia) se anuncia con texto oculto.
- FR-005 (corrección del usuario): cards con radio de 16 px y 32 px entre cards. Tarea 1 y Tarea 2 tienen la misma altura, igual que «Lo que sí funcionó» y «Lo que no funcionó».
- FR-006 (corrección del usuario): en Insights y en las cards de usuario, el texto de los ítems es Poppins light 24; sus íconos miden 32 × 32, van a la izquierda centrados verticalmente con el texto y a 16 px de él. Los pulgares miden 40 × 40, centrados con el título.
- FR-006b (segunda corrección del usuario): en «Lo que sí funcionó» y «Lo que no funcionó» el texto es Poppins light 20 con interlineado de 40 px (las cards de usuario siguen en 24). El pulgar abajo es #E75149 (`ico-thumb-down-red.svg`; el original #CB2118 sigue en estrategia.html).
- FR-007 (corrección del usuario): en la card de Conclusiones, el texto es Poppins light 24 con interlineado de 40 px; el texto en color es regular.
- FR-004: responsive sin scroll horizontal. Las cards de a dos pasan a una columna en ≤ 900 px y los botones de las cards bajan debajo del título si no entran.

## Supuestos (a confirmar en QA)
- «Ir a Iteraciones» (sección que todavía no existe) queda sin destino.
- Medidas leídas de la referencia de baja resolución: cards con padding de 24 px, botones de 48 px, separaciones de unos 72 px entre bloques. Tipografías y colores, los del sitio salvo lo corregido por el usuario.
- Texto transcripto de la referencia tal como está; «C1A» se leyó como «CTA».
- La imagen termina en las causas de «Filtros»; si la sección sigue, falta.
- La tercera card dice «Fede», como en la referencia (el pedido decía «usuario 3 franco»).

## Fuera de alcance
Páginas de cuestionarios, guión completo e Iteraciones.
