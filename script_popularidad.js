d3.csv('datos/datos_merge.csv', d3.autoType).then(data => {
  const filteredData = data.filter(d => d.popularidad !== 0); // Filtra los datos donde popularidad no es igual a 0

  const groupedData = d3.group(filteredData, d => d.Nombre); // Agrupa los datos por 'Nombre'

  const charts = Array.from(groupedData.entries()).map(([nombre, grupo]) => {
    const averageLiveness = d3.mean(grupo, d => d.popularidad); // Calcula el promedio de 'liveness' para cada grupo

    const chart4 = Plot.plot({
      style: {
        backgroundColor: "#2f2f2f",
        color: "white"
      },
      height: 500,
      width: 500, // Ajusta el ancho del gráfico según tus necesidades
      y: { grid: true, domain:[0,100] },
      color: { legend: true },
      marks: [
        Plot.dot(grupo, Plot.dodgeX("middle", { fx: "Nombre", y: "popularidad", fill: "#1DB954" })),
        Plot.ruleY([averageLiveness], { stroke: "red" }) // Agrega la línea roja en el promedio de 'energy' para cada grupo
      ]
    });

    return chart4;
  });

  const container = d3.select('#chart_popularidad_mixto')
    .style('display', 'flex')
    .style('gap', '20px'); // Espacio entre los gráficos

  charts.forEach(chart4 => {
    container.append(() => chart4);
  });
});
