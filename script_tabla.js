d3.csv('datos/datos_merge.csv', d3.autoType).then(data => {
  data.forEach(d => {
    d.msPlayed = d.msPlayed / (1000 * 60 * 60); // Convertir los milisegundos a horas
  });

  const artistCounts = d3.rollup(
    data,
    v => new Set(v.map(d => d.artistName)).size,
    d => d.Nombre
  );
  const songCounts = d3.rollup(
    data,
    v => new Set(v.map(d => d.trackName)).size,
    d => d.Nombre
  );
  const hoursPlayed = d3.rollup(
    data,
    v => d3.sum(v, d => d.msPlayed),
    d => d.Nombre
  );

  const container = d3.select("#container");

  /* Crear tabla en el HTML */
  const tableDiv = container.append("div").style("flex-grow", 1);
  const table = tableDiv.append("table").classed("table", true).style("margin", "auto");

  /* Encabezado de la tabla */
  const thead = table.append("thead");
  const headerRow = thead.append("tr");

  headerRow.append("th")
    .text("")
    .classed("column-title", true);

  headerRow.append("th")
    .text("Total artistas")
    .classed("column-title", true);

  headerRow.append("th")
    .text("Total canciones")
    .classed("column-title", true);

  headerRow.append("th")
    .text("Horas totales")
    .classed("column-title", true);


  /* Filas de la tabla */
  const rows = table.append("tbody")
    .selectAll("tr")
    .data(Array.from(artistCounts.keys()))
    .enter()
    .append("tr");

  /* Celdas de la tabla */
  rows.append("td")
    .text(d => d)
  rows.append("td")
    .text(d => artistCounts.get(d))
  rows.append("td")
    .text(d => songCounts.get(d));
  rows.append("td")
    .text(d => Math.floor(hoursPlayed.get(d)))
});
