d3.csv('datos/datos_merge.csv', d3.autoType).then(data => {
    const groupedData = d3.group(data, d => d.Nombre); // Agrupa los datos por 'Nombre'
  
    const charts = Array.from(groupedData.entries()).map(([nombre, grupo]) => {
      const averageEnergy = d3.mean(grupo, d => d.energy); // Calcula el promedio de 'energy' para cada grupo
  
      const chart = Plot.plot({
        width: 400, // Ajusta el ancho del gráfico según tus necesidades
        y: { grid: true, domain:[0,1] },
        color: { legend: true },
        marks: [
          Plot.dot(grupo, Plot.dodgeX("middle", { fx: "Nombre", y: "energy", fill: "#1DB954" })),
          Plot.ruleY([averageEnergy], { stroke: "red" }) // Agrega la línea roja en el promedio de 'energy' para cada grupo
        ]
      });
  
      return chart;
    });
  
    const container = d3.select('#chart_popularidad_mixto')
      .style('display', 'flex')
      .style('gap', '20px'); // Espacio entre los gráficos
  
    charts.forEach(chart => {
      container.append(() => chart);
    });
  });
  