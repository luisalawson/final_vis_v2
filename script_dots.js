Promise.all([
  d3.csv("datos/datos_actualizados_LUISA.csv", d3.autoType),
  d3.csv("datos/datos_actualizados_SOLVA.csv", d3.autoType),
  d3.csv("datos/datos_actualizados_OLIVIA.csv", d3.autoType)
]).then(([dataLuisa, dataOlivia, dataSolva]) => {
  const datasets = [dataLuisa, dataOlivia, dataSolva];
  const colors = ["#ec6dbf", "#6900ba", "white"]; // Colores para cada dataset
  const names = ["Luisa", "Olivia", "Sol"]; // Nombres de los datasets

  const totalHoursArr = datasets.map(data =>
    d3.sum(data, d => d.msPlayed / (1000 * 60 * 60))
  );
  const maxTotalHours = d3.max(totalHoursArr);

  const squareSize = 20; // Cantidad de puntos a lo ancho del gráfico
  const pointsData = [];
  datasets.forEach(data => {
    const totalHours = d3.sum(data, d => d.msPlayed / (1000 * 60 * 60));
    const numPoints = Math.round(totalHours);

    for (let i = 0; i < numPoints; i++) {
      pointsData.push({ dataset: data, color: colors[datasets.indexOf(data)] });
    }
  });

  const containerWidth = squareSize * 30 + 200; // Ancho del contenedor ajustado al tamaño del cuadrado
  const marginLeft = (containerWidth - (squareSize * 30)) / 2 - 100;

  const svg = d3.select("#chart_dots")
    .append("svg")
    .attr("width", containerWidth) // Utiliza el ancho del contenedor
    .attr("height", 500) // Ajusta la altura del gráfico según tus necesidades
    .style("padding-left", marginLeft + "px"); // Agrega el margen izquierdo

  svg.selectAll("circle")
    .data(pointsData)
    .enter()
    .append("circle")
    .attr("cx", (_, i) => ((i % squareSize) * 30) + 10) // Ajusta la posición horizontal para que los puntos no se corten
    .attr("cy", (_, i) => Math.floor(i / squareSize) * 20 + 10) // Espaciado vertical entre los puntos y compensación para centrarlos
    .attr("r", 5) // Tamaño fijo de los puntos
    .attr("fill", d => d.color); // Color de los puntos según el dataset

  const legend = svg.append("g")
    .attr("transform", "translate(500, 10)"); // Posición de la leyenda

  legend.selectAll("text")
    .data(names)
    .enter()
    .append("text")

  // Textos al costado del gráfico
  const sidebar = svg.append("g")
    .attr("transform", "translate(650, 20)"); // Posición del sidebar

  sidebar.selectAll("text")
    .data([
      { name: "Luisa", hours: 254 },
      { name: "Sol", hours: 120 },
      { name: "Olivia", hours: 94 }
    ])
    .enter()
    .append("text")
    .attr("font-family", "Gotham, sans-serif") // Establece la fuente de los textos
    .attr("font-size", "20px") // Establece el tamaño de los textos
    .attr("x", 0)
    .attr("y", (_, i) => i * 30) // Espaciado vertical entre los textos en el sidebar
    .text(d => `${d.name}: ${d.hours} horas`)
    .attr("fill", (_, i) => colors[i]); // Color del texto según el dataset
});
