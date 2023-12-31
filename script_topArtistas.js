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

      if (nombre === "Luisa") {
        colorScale = d3.scaleOrdinal()
          .domain(top5Artists.map(d => d.artistName))
          .range(['#7E2AC5', '#666666', '#666666', '#666666', '#666666']);
  
      } else if (nombre === "Olivia") {
        colorScale = d3.scaleOrdinal()
          .domain(top5Artists.map(d => d.artistName))
          .range(['#D23A6D', '#666666', '#666666', '#666666', '#666666']);

      } else if (nombre === "Sol") {
        colorScale = d3.scaleOrdinal()
          .domain(top5Artists.map(d => d.artistName))
          .range(['#3FB89B', '#666666', '#666666', '#666666', '#666666']);
  
      }
    const chart = Plot.plot({
      
      style: {
        fontSize: 20,
        marginBottom: 20,
        backgroundColor: "#e0e0e0",
        color: "2f2f2f",
        fontFamily:"Gotham, sans-serif",
      },
      width: 1000, // Ajusta el ancho del gráfico según tus necesidades
      height: 800, // Ajusta la altura del gráfico según tus necesidades
      font: 'Gotham sans-serif', // Establece la fuente a Poppins
      y: {
        ticks: 0,
        label: '',
        domain: [0, 40],
      
        tickFormat: () => '', // Elimina los ticks del eje Y
        showAxis: false // Oculta el eje Y
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
            dy: -100, 
            font: 'Gotham sans-serif', 
            paddingInner: 1, 

          }
        ),
        Plot.text(
          top5Artists, {
            x: d => d.artistName, // Posición horizontal del centro de cada barra
            y: d => d.sum, // Posición vertical del centro de cada barra
            text: d => `${d.sum.toFixed(1)} hrs`, // Texto a mostrar (horas)
            textBaseline: 'middle', // Alineación vertical en el centro de la barra
            fontWeight: 'bold', // Estilo de fuente en negrita
            fontSize: (d, i) => (i === 0 ? 40 : 40), // Tamaño de fuente (40 para el primer artista, 40 para los demás)
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