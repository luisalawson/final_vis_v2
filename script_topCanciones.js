d3.csv('datos/datos_merge.csv', d3.autoType).then(data => {
  const groupedData = d3.group(data, d => d.Nombre); // Agrupa los datos por 'Nombre'

  const charts = Array.from(groupedData.entries()).map(([nombre, grupo]) => {
    const songSums = d3.rollup(
      grupo,
      v => d3.max(v, d => d.msPlayed) / 3600000, // Convierte los ms a horas y toma el máximo
      d => d.trackName
    );

    const aggregatedData = Array.from(songSums, ([trackName, sum]) => ({ trackName, sum }));
    const top5Songs = aggregatedData
      .sort((a, b) => b.sum - a.sum)
      .slice(0, 5);

    let colorScale, colorScaletxt;

    if (nombre === "Luisa") {
      colorScale = d3.scaleOrdinal()
        .domain(top5Songs.map(d => d.trackName))
        .range(['#7E2AC5', '#c2c2c281', '#c2c2c281', '#c2c2c281', '#c2c2c281']);

      colorScaletxt = d3.scaleOrdinal()
        .domain(top5Songs.map(d => d.trackName))
        .range(['#c2c2c281', '#7E2AC5', '#7E2AC5', '#7E2AC5', '#7E2AC5']);

    } else if (nombre === "Olivia") {
      colorScale = d3.scaleOrdinal()
        .domain(top5Songs.map(d => d.trackName))
        .range(['#D23A6D', '#c2c2c281', '#c2c2c281', '#c2c2c281', '#c2c2c281']);

      colorScaletxt = d3.scaleOrdinal()
        .domain(top5Songs.map(d => d.trackName))
        .range(['#c2c2c281', '#D23A6D', '#D23A6D', '#D23A6D', '#D23A6D']);
    } else if (nombre === "Sol") {
      colorScale = d3.scaleOrdinal()
        .domain(top5Songs.map(d => d.trackName))
        .range(['#3FB89B', '#c2c2c281', '#c2c2c281', '#c2c2c281', '#c2c2c281']);

      colorScaletxt = d3.scaleOrdinal()
        .domain(top5Songs.map(d => d.trackName))
        .range(['#c2c2c281', '#3FB89B', '#3FB89B', '#3FB89B', '#3FB89B']);
    }

    const chart = Plot.plot({
      style: {
        fontSize: 20,
        marginBottom: 20,
        backgroundColor: "#362B3D",
        color: "2f2f2f",
        fontFamily: "Gotham, sans-serif",
      },
        width: 1000, // Ajusta el ancho del gráfico según tus necesidades
        height: 800, // Ajusta la altura del gráfico según tus necesidades
        font: 'Gotham sans-serif', // Establece la fuente a Poppins
        y: {
          label: '',
          ticks: 0,
          tickFormat: () => '', // Elimina los ticks del eje Y
          showAxis: false // Oculta el eje Y
        },
        x: {
          label: '',
          ticks: 0,

          domain: [0, d3.max(top5Songs, d => d.sum) * 1.1], // Ajusta el factor de multiplicación según tus necesidades
          tickFormat: () => '', // Elimina los ticks del eje X
          showAxis: false, // Oculta el eje X
        },
        marks: [
          Plot.barX(top5Songs, {
            x: 'sum',
            y: 'trackName',
            sort: { y: "x", reverse: true },
            fill: d => colorScale(d.trackName),
            paddingInner: 1,
          }),
          Plot.text(
            top5Songs, {
              x: 'sum',
              y: 'trackName',
              text: d => d.trackName,
              textBaseline: 'middle',
              fontWeight: 'bold',
              fontSize: (d, i) => (i === 0 ? 40 : 40),
              fill: '#FFFFFFCC',
              dx: -20,
              dy: -5, // Ajusta este valor para que el texto esté en el medio literalmente
              font: 'Gotham sans-serif',
              paddingInner: 1,
              textAnchor: 'end',
              inside: true,
            }
          )  ,
          Plot.text(
            top5Songs, {
              x: d => d.sum, // Posición X en función de la cantidad de horas
              y: 'trackName',
              text: d => d.sum.toFixed(1) + 'hs', // Mostrar solo un decimal
              textBaseline: 'middle',
              fontWeight: 'bold',
              fontSize: (d, i) => (i === 0 ? 40 : 40),
              fill: "#FFFFFFCC",
              dx: 2, // Ajusta este valor para el espacio entre la barra y el texto
              dy: 0,
              font: 'Gotham sans-serif',
              paddingInner: 1,
              textAnchor: 'start', // Alinea el texto a la izquierda
              inside: true,
            }
          )
                            
        ],
      });
  
      return chart;
    });
  
    const container = d3.select('#chart_top_canciones')
      .style('display', 'flex')
      .style('gap', '40px'); // Espacio entre los gráficos
  
    charts.forEach(chart => {
      container.append(() => chart);
    });
  });
  
  
  
  
  