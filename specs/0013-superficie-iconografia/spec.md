# Spec 0013 — Superficie, Componentes: Iconografía

Entrada: ficha 0013 en `.cardenal/context.json` (archivada en esta carpeta al cerrar). Referencia: `referencia-figma.png` (1920 px).

## Qué y por qué
El sistema de diseño termina en Layout y «Ir a Componentes» no tiene destino. Se agrega Componentes con su primera parte, Iconografía, para mostrar el set de íconos del rediseño, su estilo y sus tamaños.

## Contenido
- **Componentes** (`#componentes`): subtítulo «Elementos visuales reutilizables»; botones ↑ Ir a Layout / ↓ Ir a Motion (sin destino).
- **Iconografía** (`#iconografia`): encabezado con el ícono de banderas dorado y línea (patrón `.rule-head`).
- Recuadro punteado violeta con los 68 íconos provistos a 20 px, en orden numérico (2 filas de 34 a 1920).
- «Estilo relleno» con el trofeo dorado a 48 px y «3 tamaños» con el trofeo a 16, 20 y 24 px y su etiqueta.

## Requisitos
- FR-001: «Ir a Componentes» (Layout) deja de estar sin destino; «Ir a Motion» usa `data-sin-destino`.
- FR-002: el set de íconos es una imagen con una descripción accesible única; cada ícono es decorativo (`alt=""`).
- FR-003: responsive a 900 y 375 px sin scroll horizontal: los íconos se reacomodan en más filas; los dos bloques de abajo se apilan en ≤ 640 px.

## Supuestos (a confirmar en QA)
- Los íconos van en el orden de los archivos (01–68), porque el orden es indistinto.
- Los títulos «Estilo relleno» y «3 tamaños» usan Exo 2 light a 40 px, y las etiquetas Inter 14 px, leídos de la referencia.

## Fuera de alcance
Motion, otras partes de Componentes y «Siguiente elemento UX».