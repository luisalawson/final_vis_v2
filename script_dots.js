d3.csv('datos/datos_merge.csv', d3.autoType).then(data => {
    const groupedData = d3.group(data, d => d.Nombre); // Agrupa los datos por 'Nombre'
  
    const charts = Array.from(groupedData.entries()).map(([nombre, grupo]) => {
      // Obtener el top 10 de las canciones más escuchadas por cada persona
      const top10Songs = grupo
        .sort((a, b) => b.msPlayed - a.msPlayed)
        .slice(0, 10);
  
      // Crear el arreglo de datos de canciones con la cantidad de horas escuchadas
      const songData = top10Songs.map(d => ({ name: d.trackName, hours: d.msPlayed / (1000 * 60 * 60) }));
  
      // Obtener la suma total de horas escuchadas del top 10 de canciones
      const totalHours = d3.sum(songData, d => d.hours);
  
      // Calcular el número de puntos a mostrar
      const numPoints = Math.round(totalHours);
  
      // Crear el arreglo de coordenadas para los puntos
      const pointsData = [];
      songData.forEach(song => {
        const numPointsPerSong = Math.round(song.hours);
        for (let i = 0; i < numPointsPerSong; i++) {
          pointsData.push({ name: song.name });
        }
      });
  
      // Calcular el tamaño del lado del cuadrado
      const squareSize = Math.ceil(Math.sqrt(numPoints));
  
// Crear la escala de colores para las canciones
const colorScale = d3.scaleOrdinal()
  .domain(songData.map(d => d.name))
  .range(["#1DB954", "#1DB99A", "#1DADB9", "#1D79B9", "#561DB9", "#831DB9", "#A41DB9", "#B91DAD", "#B91D7C", "#B91D4A"]); // Cambia los colores según tus necesidades

    // Crear el gráfico de puntos
  
      // Crear el gráfico de puntos
      const svg = d3.select("#chart_dots")
        .append("svg")
        .attr("width", 600) // Ajusta el ancho del gráfico según tus necesidades
        .attr("height", 500); // Ajusta la altura del gráfico según tus necesidades
  
      svg.selectAll("circle")
        .data(pointsData)
        .enter()
        .append("circle")
        .attr("cx", (_, i) => (i % squareSize) * 20 + 10) // Espaciado horizontal entre los puntos y compensación para centrarlos
        .attr("cy", (_, i) => Math.floor(i / squareSize) * 20 + 10) // Espaciado vertical entre los puntos y compensación para centrarlos
        .attr("r", 5) // Tamaño fijo de los puntos
        .attr("fill", d => colorScale(d.name)); // Color de los puntos según la canción
  
      // Crear la leyenda
      const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(520, 20)");
  
      const legendItems = legend.selectAll(".legend-item")
        .data(songData)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", (_, i) => `translate(0, ${i * 20})`);
  
      legendItems.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 5)
        .attr("fill", d => colorScale(d.name));
  
      legendItems.append("text")
        .attr("x", 10)
        .attr("y", 5)
        .text(d => `${d.name}`)
        .attr("alignment-baseline", "middle");
  
      return svg;
    });
  
    const container = d3.select('#chart_dots')
      .style('display', 'flex')
      .style('gap', '30px'); // Espacio entre los gráficos
  
    charts.forEach(chart => {
      container.append(() => chart);
    });
  });
  
  