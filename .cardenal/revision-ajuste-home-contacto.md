# Revisión humana — ajuste: textos, espaciado y contacto en el Home y las capas

**Fecha:** 2026-11-24 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado

## Qué cambió
### Home (ES y EN)
- «No lo digo yo, lo dicen los usuarios.» va en Poppins 400 32, con «usuarios» en #BCA447.
- «Plataforma actual» pasó a «Diseño final».
- «Más abajo todos los detalles» pasó a «¿Te interesa ver el proceso?», en #FAFAFA y sin la mano.
- Hay 160 px entre la última comparativa, «Probar prototipo» y ese texto.
- La frase del problema de Objetivos quedó así:
  - 26/32, Poppins 200 y blanca;
  - centrada, con 300 px de margen a cada lado (sin margen en ≤ 900 px).

### Contacto
- El contacto de Superficie (sin «Gracias por ver») está 160 px debajo de las cards finales en Home, 5 Elementos, Estrategia, Alcance, Estructura y Esqueleto, en ES y EN.
- Los estilos del contacto pasaron a `styles.css`. Superficie no cambió.

## Evidencia
- **Del usuario:** respondió «Lo apruebo» en el chat el 2026-11-24, después de varias correcciones.
- **Del asistente:** verificación local a 1920, 1280 y 375 px en ES y EN:
  - las distancias y estilos calculados son los pedidos;
  - los íconos de contacto cargan;
  - no hay scroll horizontal.

## Pendiente
- QA manual en el sitio publicado, después de subir el commit.
