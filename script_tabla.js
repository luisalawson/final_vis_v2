const tableDiv = containerr.append("div").style("flex-grow", 1);

/* Crear tabla en el HTML */
const table = tableDiv.append("table").style("margin", "auto");


  /* Encabezado de la tabla */
  table.append("thead")
    .append("tr")
    .selectAll("th")
    .data(["Barrio", "Cantidad de contactos"])
    .enter()
    .append("th")
    .text(d => d);

  /* Filas de la tabla */
  const rows = table.append("tbody")
    .selectAll("tr")
    .data(conteoContactos)
    .enter()
    .append("tr");

  /* Celdas de la tabla */
  rows.append("td")
    .text(d => d.barrio);
  rows.append("td")
    .text(d => d.cantidad);