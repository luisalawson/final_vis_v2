const names = ['LUISA', 'OLIVIA', 'SOLVA'];

names.forEach((name, index) => {
  d3.csv(`datos/datos_actualizados_${name}.csv`, d3.autoType).then(data => {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const monthCounts = Array.from({ length: 12 }, () => 0);

    data.forEach(d => {
      const fecha_hora = d.endTime.split(' ');
      const mes = fecha_hora[0].split('-')[1];
      d.month = mes;
      d.hoursPlayed = d.msPlayed / (1000 * 60 * 60);
      monthCounts[mes - 1] += d.hoursPlayed;
    });

    const maxHours = Math.max(...monthCounts);

    const dataForPlot = months.map((month, i) => {
      return {
        month: month,
        value: monthCounts[i],
        radius: (monthCounts[i] / maxHours) * 100 // Escala el radio en proporción a las horas escuchadas
      };
    });

    const svg = d3.select('body')
      .append('svg')
      .attr('class', 'chart')
      .attr('width', 200)
      .attr('height', 200)
      .style('margin-right', '100px'); // Establece el espacio entre los gráficos

    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const radius = Math.min(width, height) / 2;

    const g = svg.append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const colorScale = d3.scaleOrdinal()
      .domain(months)
      .range(d3.schemeCategory10);

    const pie = d3.pie()
      .sort(null)
      .value(d => d.value);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(d => d.data.radius);

    const arcs = g.selectAll('.arc')
      .data(pie(dataForPlot))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => d.data.value === maxHours ? '#1DB954' : 'gray'); // El mes con más horas escuchadas se muestra en rojo, los demás en gris

    arcs.append('text')
      .attr('transform', d => 'translate(' + arc.centroid(d) + ')')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('font-size', '10px') // Establece el tamaño de fuente más pequeño
      .text(d => d.data.month);

    svg.attr('transform', `translate(${index * (width + 100)}, 0)`); // Establece la posición horizontal del gráfico en función de su índice
  });
});
