# Spec: Detalle de la Tarea 2 del Tree Testing

**Carpeta:** `specs/0008-detalle-tarea-2/` · **Estado:** aprobado para implementar · **Ficha:** `.cardenal/context.json`

## Contexto
- **Actor:** lector que, en el Tree Testing de Estructura, quiere ver los resultados completos de la Tarea 2.
- **Resultado:** página `estructura-tarea-2.html`, abierta desde «Ver más detalles» de la Tarea 2. Tiene la misma estructura, estilos (`estructura-tarea.css`) y breadcrumb que el detalle de la Tarea 1 (spec 0007), con los datos de la Tarea 2. Referencia: [referencia-figma.jpg](referencia-figma.jpg), 1920 × 2341.
- **Assets del usuario** en `assets/tarea-2/`: `success.png`, `directness.png`, `torta-resultados.png`, `tabla-resultados.png` y `pietree.png`. Se reutilizan los íconos de 0007.

## Diferencias con la Tarea 1
- Breadcrumb y título «Tarea 2». La flecha vuelve a `estructura.html#tree-testing`.
- Enunciado: «“Te das cuenta que para correr la carrera que elegiste y te gusta tienes que <dorado>comprar el auto</dorado> para participar. ¿A dónde irías para comprar el auto? ”» (literal, como en la card de Estructura).
- Datos en los `alt`:
  - éxito 100 % (límites 75,1–100 %);
  - directness 50 % (límites 23,7–76,3 %);
  - torta con éxito directo 50 % y éxito indirecto 50 %;
  - tabla con éxito 10 (5 directos y 5 indirectos) y fallo 0;
  - pietree: Root › Shop › Content › Cars › Car Info, con desvíos por More y Tracks › Track Info.
- Las leyendas de Estadísticas y Pietree son las mismas que en la Tarea 1.

## Requisitos
- **FR-001:** Fidelidad a la referencia y responsive igual que 0007.
- **FR-002:** «Ver más detalles» de la Tarea 2 en `estructura.html` lleva a la página.
- **FR-003:** SEO (description de 157 caracteres, JSON-LD con breadcrumb de 3 niveles), `llms.txt` y docs.