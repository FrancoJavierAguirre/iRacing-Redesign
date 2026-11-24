# Revisión humana — ajuste: switch del Home con diseño propio

**Fecha:** 2026-11-24 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado

## Qué cambió
- En el Home (ES y EN), el switch de idioma reemplaza a «Franco Aguirre - 2025».
- Usa la variante `.lang-switch--hero`:
  - borde #0159CF;
  - texto blanco en las dos opciones;
  - la opción elegida con fondo #0159CF y la otra sin fondo.
- La referencia de diseño la dio el usuario en el chat. Después corrigió que lo único blanco debía ser el texto.
- El switch de las barras superiores no cambió.

## Evidencia
- **Del usuario:** respondió «Lo apruebo» en el chat el 2026-11-24.
- **Del asistente:**
  - verificación local en ES y EN: 114 × 48 px y colores calculados correctos;
  - sin scroll horizontal a 375 px.

## Pendiente
- QA manual en el sitio publicado, después de subir el commit.
