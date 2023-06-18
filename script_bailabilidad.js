

  d3.csv('datos/datos_merge.csv', d3.autoType).then(data => {
   
      const groupedData = d3.group(data, d => d.Nombre); // Agrupa los datos por 'Nombre'
    
      const charts = Array.from(groupedData.entries()).map(([nombre, grupo]) => {
        const averageEnergy = d3.mean(grupo, d => d.danceability); // Calcula el promedio de 'energy' para cada grupo
    
        const chart = Plot.plot({
          style:{
            backgroundColor: "#2f2f2f",
            color:"white"
          },
          height: 500,
          width: 500, // Ajusta el ancho del gráfico según tus necesidades
          y: { grid: true, domain:[0,1] },
          color: { legend: true },
          marks: [
            Plot.dot(grupo, Plot.dodgeX("middle", { fx: "Nombre", y: "danceability", fill: "#1DB954" })),
            Plot.ruleY([averageEnergy], { stroke: "red" }) // Agrega la línea roja en el promedio de 'energy' para cada grupo
          ]
        });
    
        return chart;
      });
    
      const container = d3.select('#chart_danceability_mixto')
        .style('display', 'flex')
        .style('gap', '20px'); // Espacio entre los gráficos
    
      charts.forEach(chart => {
        container.append(() => chart);
      });

  
  });
  