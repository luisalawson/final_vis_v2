d3.csv('datos/datos_coninfo_olivia.csv').then(data => {

  var framed = true;
  console.log(data);
  
  const margin = { top: 20, right: 20, bottom: 100, left: 40 };
  const width = 1000 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;
  
  const svg = d3.select('#chart_energy_olivia')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  const xScale = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([0, width])
    .paddingInner(0.2)
    .paddingOuter(0.1);
  
  const yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([height, 0]);
  
    svg.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => xScale(i))
    .attr('y', d => yScale(d.energy)) // Reemplazar "d.energy" con "d.energia" si la columna se llama "energia" en el archivo CSV
    .attr('width', xScale.bandwidth())
    .attr('height', d => height - yScale(d.energy)) // Reemplazar "d.energy" con "d.energia" si la columna se llama "energia" en el archivo CSV
    .attr('fill', '#1DB954')
    .on('mouseover', function(d) {
      const song = d.trackName; // Reemplazar "d.trackName" con "d.Cancion" si la columna se llama "Cancion" en el archivo CSV
      const energy = d.energy; // Reemplazar "d.energy" con "d.energia" si la columna se llama "energia" en el archivo CSV
      const x = parseFloat(d3.select(this).attr('x')) + xScale.bandwidth() / 2;
      const y = parseFloat(d3.select(this).attr('y')) - 10;
      
      console.log('Song:', song);
      console.log('Energy:', energy);
      
      svg.append('text')
        .attr('class', 'tooltip')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .text(`${song}: ${energy}`);
    })
    .on('mouseout', () => {
      svg.select('.tooltip').remove();
    });
  
  const yAxis = d3.axisLeft(yScale).ticks(5);
  svg.append('g')
    .attr('class', 'y-axis')
    .call(yAxis);
});



  
d3.csv('datos/datos_coninfo_luisa.csv', d3.autoType).then(data => {
  var framed = true;
  console.log(data);
  
  const margin = { top: 20, right: 20, bottom: 100, left: 40 };
  const width = 1000 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;
  
  const svg = d3.select('#chart_energy_luisa')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  const xScale = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([0, width])
    .paddingInner(0.1) // Ajustar el ancho de las barras estableciendo el padding interior
    .paddingOuter(0); // Ajustar el espacio en los extremos de las barras
  
  const yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([height, 0]);
  
  svg.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => xScale(i))
    .attr('y', d => yScale(d.energy))
    .attr('width', xScale.bandwidth())
    .attr('height', d => height - yScale(d.energy))
    .attr('fill', '#1DB954'); // Color verde de Spotify
  
  const yAxis = d3.axisLeft(yScale);
  svg.append('g')
    .attr('class', 'y-axis')
    .call(yAxis);
});
d3.csv('datos/datos_coninfo_solva.csv', d3.autoType).then(data => {
  var framed = true;
  console.log(data);
  
  const margin = { top: 20, right: 20, bottom: 100, left: 40 };
  const width = 1000 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;
  
  const svg = d3.select('#chart_energy_solva')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  const xScale = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([0, width])
    .paddingInner(0.1) // Ajustar el ancho de las barras estableciendo el padding interior
    .paddingOuter(0.1); // Ajustar el espacio en los extremos de las barras
  
  const yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([height, 0]);
  
  svg.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => xScale(i))
    .attr('y', d => yScale(d.energy))
    .attr('width', xScale.bandwidth())
    .attr('height', d => height - yScale(d.energy))
    .attr('fill', '#1DB954'); // Color verde de Spotify
  
  const yAxis = d3.axisLeft(yScale);
  
  svg.append('g')
    .attr('class', 'y-axis')
    .call(yAxis);
});
