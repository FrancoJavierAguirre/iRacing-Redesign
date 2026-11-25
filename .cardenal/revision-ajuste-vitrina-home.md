# Revisión humana — ajuste: vitrina de videos «después» en «Diseño final»

**Fecha:** 2026-11-24 · **Revisor:** usuario (team lead) · **Veredicto:** aprobado

## Qué cambió (Home, ES y EN)
- Las 6 comparativas Antes/Después se reemplazaron por una vitrina:
  - una lista de pantallas, con la opción activa en #BCA447, un ecualizador y una barra de avance;
  - un video «después» por vez, que pasa solo a la siguiente pantalla al terminar;
  - un botón «Ampliar video» para verlo en pantalla completa.
- Referencia: la sección «El producto final» de nicoaguirre.vercel.app. El usuario eligió el color dorado y el botón de ampliar.
- El subtítulo pasó a ser «Rediseñé la plataforma donde se buscan carreras», con «plataforma» en dorado, y se quitó el h3.
- «Diseño final» y su subtítulo van centrados.
- «Probar prototipo» va centrado 72 px debajo de la lista. La columna con la lista y el botón queda centrada en vertical respecto del video.

## Evidencia
- **Del usuario:** respondió «Lo apruebo» en el chat el 2026-11-24, después de varias correcciones.
- **Del asistente:** verificación local en ES y EN a 1920, 1280 y 375 px:
  - interacción con click y con teclado;
  - avance automático y vuelta de la sexta pantalla a la primera;
  - pausa al salir de pantalla;
  - medidas y alineaciones pedidas;
  - sin scroll horizontal.
- **No verificado:** el salto con `currentTime`, porque el servidor local no sirve rangos.

## Pendiente
- QA manual en el sitio publicado: avance automático y botón de pantalla completa, también en un celular real.
