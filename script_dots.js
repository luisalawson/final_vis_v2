Promise.all([
  d3.csv("datos/datos_actualizados_LUISA.csv", d3.autoType),
  d3.csv("datos/datos_actualizados_OLIVIA.csv", d3.autoType),
  d3.csv("datos/datos_actualizados_SOLVA.csv", d3.autoType)
]).then(([dataLuisa, dataOlivia, dataSolva]) => {
  const datasets = [dataLuisa, dataOlivia, dataSolva];
  const colors = ["#1DB954", "#1DB99A", "#1DADB9"]; // Colores para cada dataset
  const names = ["Luisa", "Olivia", "Sol"]; // Nombres de los datasets

  const totalHoursArr = datasets.map(data =>
    d3.sum(data, d => d.msPlayed / (1000 * 60 * 60))
  );
  const maxTotalHours = d3.max(totalHoursArr);

  const squareSize = Math.ceil(Math.sqrt(maxTotalHours));
  const pointsData = [];
  datasets.forEach(data => {
    const totalHours = d3.sum(data, d => d.msPlayed / (1000 * 60 * 60));
    const numPoints = Math.round(totalHours);

    for (let i = 0; i < numPoints; i++) {
      pointsData.push({ dataset: data, color: colors[datasets.indexOf(data)] });
    }
  });

  const svg = d3.select("#chart_dots")
    .append("svg")
    .attr("width", 1000) // Ajusta el ancho del gráfico según tus necesidades
    .attr("height", 500); // Ajusta la altura del gráfico según tus necesidades

  svg.selectAll("circle")
    .data(pointsData)
    .enter()
    .append("circle")
    .attr("cx", (_, i) => (i % squareSize) * 20 + 10) // Espaciado horizontal entre los puntos y compensación para centrarlos
    .attr("cy", (_, i) => Math.floor(i / squareSize) * 20 + 10) // Espaciado vertical entre los puntos y compensación para centrarlos
    .attr("r", 5) // Tamaño fijo de los puntos
    .attr("fill", d => d.color); // Color de los puntos según el dataset

  const legend = svg.append("g")
    .attr("transform", "translate(500, 10)"); // Posición de la leyenda

  legend.selectAll("rect")
    .data(datasets)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", (_, i) => i * 30) // Espaciado vertical entre los elementos de la leyenda
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", (_, i) => colors[i]); // Color de cada elemento de la leyenda

  legend.selectAll("text")
    .data(names)
    .enter()
    .append("text")
    .attr("x", 30) // Espaciado horizontal entre el rectángulo y el texto
    .attr("y", (_, i) => i * 30 + 15) // Espaciado vertical entre los elementos de la leyenda y compensación para el texto
    .text(d => d) // Nombre del dataset
    .attr("fill", "white"); // Color del texto
});
