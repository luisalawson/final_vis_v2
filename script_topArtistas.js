d3.csv('datos/datos_merge.csv', d3.autoType).then(data => {
  const groupedData = d3.group(data, d => d.Nombre); // Agrupa los datos por 'Nombre'

  const charts = Array.from(groupedData.entries()).map(([nombre, grupo]) => {
    const artistSums = d3.rollup(
      grupo,
      v => d3.sum(v, d => d.msPlayed) / 3600000, // Convierte los ms a horas
      d => {
        // Reemplaza el nombre del artista "Julie and the phantoms caste" por "Julie & cast"
        if (d.artistName === "Julie and the Phantoms Cast") {
          return "Julie & cast";
        } else {
          return d.artistName;
        }
      }
    );

    const aggregatedData = Array.from(artistSums, ([artistName, sum]) => ({ artistName, sum }));
    const top5Artists = aggregatedData
      .sort((a, b) => b.sum - a.sum)
      .slice(0, 5);

    const colorScale = d3.scaleOrdinal()
      .domain(top5Artists.map(d => d.artistName))
      .range(['#1DB954', '#E4E4E4', '#E4E4E4', '#E4E4E4', '#E4E4E4']);

    const chart = Plot.plot({
      style: {
        fontSize: 20,
        marginBottom: 20,
      },
      width: 1000, // Ajusta el ancho del gráfico según tus necesidades
      height: 800, // Ajusta la altura del gráfico según tus necesidades
      font: 'Poppins', // Establece la fuente a Poppins
      y: { domain: [0, 35] },
      x:{label:''}
      ,
      marks: [
        Plot.barY(top5Artists, {
          x: 'artistName',
          y: 'sum',
          sort: { x: "y", reverse: true },
          fill: d => colorScale(d.artistName),
        }),
      ],
    });

    return chart;
  });

  const container = d3.select('#chart_top_artistas')
    .style('display', 'flex')
    .style('gap', '20px'); // Espacio entre los gráficos

  charts.forEach(chart => {
    container.append(() => chart);
  });
});
