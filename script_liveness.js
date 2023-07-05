d3.csv('datos/datos_merge.csv', d3.autoType).then(data => {
   
    const groupedData = d3.group(data, d => d.Nombre); // Agrupa los datos por 'Nombre'
  
    const charts = Array.from(groupedData.entries()).map(([nombre, grupo]) => {
      const averageLiveness = d3.mean(grupo, d => d.liveness); // Calcula el promedio de 'liveness' para cada grupo
  
      const chart3 = Plot.plot({
        style:{
          backgroundColor: "#000000",
          color:"white"
        },
        height: 500,
        width: 500, // Ajusta el ancho del gráfico según tus necesidades
        y: { grid: true, domain:[0,1],ticks:5 },
        color: { legend: true },
        marks: [
          Plot.dot(grupo, Plot.dodgeX("middle", { fx: "Nombre", y: "liveness", fill: "#999999" })),
          Plot.ruleY([averageLiveness], { stroke: "red" }) // Agrega la línea roja en el promedio de 'energy' para cada grupo
        ]
      });
  
      return chart3;
    });
  
    const container = d3.select('#chart_liveness_mixto')
      .style('display', 'flex')
      .style('gap', '20px'); // Espacio entre los gráficos
  
    charts.forEach(chart3 => {
      container.append(() => chart3);
    });


});
