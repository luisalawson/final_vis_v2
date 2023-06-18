

d3.csv('datos/datos_merge.csv', d3.autoType).then(data => {
   
    const groupedData = d3.group(data, d => d.Nombre); // Agrupa los datos por 'Nombre'
  
    const charts = Array.from(groupedData.entries()).map(([nombre, grupo]) => {
      const averageLoudness = d3.mean(grupo, d => d.loudness); // Calcula el promedio de 'energy' para cada grupo
  
      const chart1 = Plot.plot({
        style:{
          backgroundColor: "#2f2f2f",
          color:"white"
        },
        height: 500,
        width: 500, // Ajusta el ancho del gráfico según tus necesidades
        y: { grid: true, domain:[-26,0], ticks:10 },
        color: { legend: true },
        marks: [
          Plot.dot(grupo, Plot.dodgeX("middle", { fx: "Nombre", y: "loudness", fill: "#1DB954" })),
          Plot.ruleY([averageLoudness], { stroke: "red" }) // Agrega la línea roja en el promedio de 'energy' para cada grupo
        ]
      });
  
      return chart1;
    });
  
    const container = d3.select('#chart_loudness_mixto')
      .style('display', 'flex')
      .style('gap', '20px'); // Espacio entre los gráficos
  
    charts.forEach(chart1 => {
      container.append(() => chart1);
    });


});
