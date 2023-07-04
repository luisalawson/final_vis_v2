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
        //color: "2f2f2f",
        fontFamily:"Gotham, sans-serif",
      },
      width: 1000, // Ajusta el ancho del gráfico según tus necesidades
      height: 800, // Ajusta la altura del gráfico según tus necesidades
      font: 'Gotham sans-serif', // Establece la fuente a Poppins
      y: {
        //ticks: 0,
        label: '',
        domain: [0, 35],
      
        //tickFormat: () => '', // Elimina los ticks del eje Y
        //showAxis: false // Oculta el eje Y
      },
      x: {
        label: " ",
        ticks: 0,
        tickFormat: () => '', // Elimina los ticks del eje X
        showAxis: false, // Oculta el eje X
      },
      marks: [
        Plot.barY(top5Artists, {
          x: 'artistName',
          y: 'sum',
          tip: "x",
          sort: { x: "y", reverse: true },
          fill: d => colorScale(d.artistName),
          paddingInner: 1, 
        }),
        Plot.text(
          top5Artists,{
            x: 'artistName',
            y: 'sum',
            text: d => d.artistName, 
            textBaseline: 'middle', 
            fontWeight: 'bold', 
            fontSize: (d, i) => (i === 0 ? 40 : 40), // Tamaño de fuente de 40 solo para el primer artista del top 5
            fill: d => colorScale(d.artistName),
            dx: 0, 
            dy: -40, 
            font: 'Gotham sans-serif', 
            paddingInner: 1, 

          }
        )
      ],
    });
    

    return chart;
  });

  const container = d3.select('#chart_top_artistas')
    .style('display', 'flex')
    .style('gap', '30px'); // Espacio entre los gráficos

  charts.forEach(chart => {
    container.append(() => chart);
  });
});