d3.csv('datos/datos_actualizados_LUISA.csv', d3.autoType).then(data => {
  function getImageUrl(artistName) {
    if (artistName === "WOS") {
      return "imagenes/wos.jpg";
    } 
  }

  const artistCounts = d3.rollup(
    data,
    v => v.length,
    d => d.artistName
  );

  const aggregatedData = Array.from(artistCounts, ([artistName, count]) => ({ artistName, count }));
  const top5Artists = aggregatedData
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const colorScale = d3.scaleOrdinal()
    .domain(top5Artists.map(d => d.artistName))
    .range(['#6823D3', '#E4E4E4', '#E4E4E4', '#E4E4E4', '#E4E4E4']);

  const chart = Plot.plot({
    style: {
      fontSize: 10,
      backgroundColor:'#f9f9f9',
    },
    width: 650, // Aumenta el ancho del gráfico
    height: 400, // Aumenta la altura del gráfico
    font: 'Poppins', // Establece la fuente a Poppins
    y:{domain:[0,1100]},
    marks: [
      Plot.barY(top5Artists, {
        x: 'artistName',
        y: 'count',
        sort: { x: "y", reverse: true },
        fill: d => colorScale(d.artistName),
      }),
      Plot.image(top5Artists, {
        x: d => d.artistName,
        y: d => d.count-2.1, // Ajusta la posición vertical de las imágenes
        src: d => getImageUrl(d.artistName),
        height: 104, // Ajusta la altura de las imágenes
        anchor: 'top', // Ancla las imágenes al centro
      }),
    ],
  });

  d3.select('#chart_luisa_top_artistas').append(() => chart);
});

d3.csv('datos/datos_actualizados_OLIVIA.csv', d3.autoType).then(data => {
  function getImageUrl(artistName) {
    if (artistName === "WOS") {
      return "imagenes/wos.jpg";
    }
  }

  const artistCounts = d3.rollup(
    data,
    v => v.length,
    d => d.artistName
  );

  const aggregatedData = Array.from(artistCounts, ([artistName, count]) => ({ artistName, count }));
  const top5Artists = aggregatedData
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const colorScale = d3.scaleOrdinal()
    .domain(top5Artists.map(d => d.artistName))
    .range(['#D32373', '#E4E4E4', '#E4E4E4', '#E4E4E4', '#E4E4E4']);

  const chart = Plot.plot({
    style: {
      fontSize: 10,
      backgroundColor:'#f9f9f9',
    },
    width: 650, // Aumenta el ancho del gráfico
    height: 400, // Aumenta la altura del gráfico
    font: 'Poppins', // Establece la fuente a Poppins
    y:{domain:[0,1100] },
    marks: [
      Plot.barY(top5Artists, {
        x: 'artistName',
        y: 'count',
        sort: { x: "y", reverse: true },
        fill: d => colorScale(d.artistName),
      }),
      Plot.image(top5Artists, {
        x: d => d.artistName,
        y: d => d.count-2.1, // Ajusta la posición vertical de las imágenes
        src: d => getImageUrl(d.artistName),
        height: 104, // Ajusta la altura de las imágenes
        anchor: 'top', // Ancla las imágenes al centro
      }),
    ],
  });

  d3.select('#chart_olivia_top_artistas').append(() => chart);
});

d3.csv('datos/datos_actualizados_SOLVA.csv', d3.autoType).then(data => {
  function getImageUrl(artistName) {
    if (artistName === "Anson Seabra") {
      return "imagenes/anson.jpeg";
    } 
  }

  const artistCounts = d3.rollup(
    data,
    v => v.length,
    d => d.artistName
  );

  const aggregatedData = Array.from(artistCounts, ([artistName, count]) => ({ artistName, count }));
  const top5Artists = aggregatedData
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const colorScale = d3.scaleOrdinal()
    .domain(top5Artists.map(d => d.artistName))
    .range(['#23B0D3', '#E4E4E4', '#E4E4E4', '#E4E4E4', '#E4E4E4']);

  const chart = Plot.plot({
    style: {
      fontSize: 10,
      backgroundColor:'#f9f9f9',
    },
    width: 650, // Aumenta el ancho del gráfico
    height: 400, // Aumenta la altura del gráfico
    font: 'Poppins', // Establece la fuente a Poppins
    y:{domain:[0,1100]},
    marks: [
      Plot.barY(top5Artists, {
        x: 'artistName',
        y: 'count',
        sort: { x: "y", reverse: true },
        fill: d => colorScale(d.artistName),
      }),
      Plot.image(top5Artists, {
        x: d => d.artistName,
        y: d => d.count-2.1, // Ajusta la posición vertical de las imágenes
        src: d => getImageUrl(d.artistName),
        height: 104, // Ajusta la altura de las imágenes
        anchor: 'top', // Ancla las imágenes al centro
      }),
    ],
  });

  d3.select('#chart_solva_top_artistas').append(() => chart);
});