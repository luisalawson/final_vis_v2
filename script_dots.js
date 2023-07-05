Promise.all([
  d3.csv("datos/datos_actualizados_LUISA.csv", d3.autoType),
  d3.csv("datos/datos_actualizados_SOLVA.csv", d3.autoType),
  d3.csv("datos/datos_actualizados_OLIVIA.csv", d3.autoType)
]).then(([dataLuisa, dataOlivia, dataSolva]) => {
  const datasets = [dataLuisa, dataOlivia, dataSolva];
  const colors = ["#7E2AC5 ", "#3FB89B", "#D23A6D"]; // Colores para cada dataset
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
    .attr("width", 500 ) // Ajusta el ancho del SVG para incluir el margen izquierdo
    .attr("height", 500) // Ajusta la altura del gráfico según tus necesidades

  svg.append("g")
    .attr("transform", "translate(" + marginLeft + ", 0)") // Agrega el margen izquierdo
    .selectAll("circle")
    .data(pointsData)
    .enter()
    .append("circle")
    .attr("cx", (_, i) => ((i % squareSize) * 30) + 10) // Ajusta la posición horizontal para que los puntos no se corten
    .attr("cy", (_, i) => Math.floor(i / squareSize) * 20 + 10) // Espaciado vertical entre los puntos y compensación para centrarlos
    .attr("r", 5) // Tamaño fijo de los puntos
    .attr("fill", d => d.color); // Color de los puntos según el dataset
});
