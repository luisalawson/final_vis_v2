d3.csv('datos/datos_merge.csv', d3.autoType).then(data => {
  const groupedData = d3.group(data, d => d.Nombre); // Agrupa los datos por 'Nombre'

  const charts = Array.from(groupedData.entries()).map(([nombre, grupo]) => {
    const artistSums = d3.rollup(
      grupo,
      v => d3.sum(v, d => d.msPlayed) / 3600000, // Convierte los ms a horas
      d => {
        // Reemplaza el nombre del artista "Julie and the phantoms caste" por "Julie & cast"
        if (d.artistName === "Julie and the Phantoms Cast") {
          return "J&Ph" + "\n" + "cast";
        }
        if(d.artistName === "Selena Gomez") {
          return "Selena" + "\n" + "Gomez";
        }
        if(d.artistName === "Olivia Rodrigo") {
          return "Olivia" + "\n" + "Rodrigo";
        }
        if(d.artistName === "Tate McRae") {
          return "Tate" + "\n" + "McRae";
        }
        else {
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
      .range(['#1DB954', '#c2c2c281', '#c2c2c281', '#c2c2c281', '#c2c2c281']);

    const chart = Plot.plot({
      style: {
        fontSize: 20,
        marginBottom: 20,
        backgroundColor: "#6900ba",
        fontFamily: "Gotham, sans-serif",
      },
      width: 1000,
      height: 800,
      font: 'Gotham sans-serif',
      y: {
        label: '',
        domain: [0, 35],
      },
      x: {
        label: " ",
        ticks: 0,
        tickFormat: () => '',
        showAxis: false,
      },
      marks: [
        Plot.barY(top5Artists, {
          x: 'artistName',
          y: 'sum',
          sort: { x: "y", reverse: true },
          fill: d => colorScale(d.artistName),
          paddingInner: 1,
        }),
        Plot.text(
          top5Artists, {
            x: 'artistName',
            y: 'sum',
            text: d => d.artistName,
            textBaseline: 'middle',
            fontWeight: 'bold',
            fontSize: (d, i) => (i === 0 ? 40 : 40),
            fill: d => colorScale(d.artistName),
            dx: 0,
            dy: -40,
            font: 'Gotham sans-serif',
            paddingInner: 1,
          }
        )
      ],
    });

    // Agregar interacción con el mouse
    const tooltip = container.append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    const bars = chart.marks[0];

    bars.on('mouseover', (event, datum) => {
      tooltip.transition()
        .duration(200)
        .style('opacity', .9);
      tooltip.html(datum.sum)
        .style('left', (event.pageX) + 'px')
        .style('top', (event.pageY - 28) + 'px');
    })
    .on('mouseout', () => {
      tooltip.transition()
        .duration(500)
        .style('opacity', 0);
    });

    return chart;
  });

  const container = d3.select('#chart_top_artistas')
    .style('display', 'flex')
    .style('gap', '30px');

  charts.forEach(chart => {
    container.append(() => chart);
  });
});
