d3.csv('datos/datos_agrupados_OLIVIA.csv', d3.autoType).then(data => {
  const filteredData = data.filter(d => d.artistName === 'WOS').slice(0,5);
  filteredData.forEach(d => {
    d.msPlayed = d.msPlayed / (1000 * 60 * 60); // Convertir los milisegundos a horas
  });
  const sums = d3.rollup(filteredData, v => d3.sum(v, d => d.msPlayed), d => d.trackName);
  const sortedData = Array.from(sums, ([trackName, msPlayed]) => ({ trackName, msPlayed })).sort((a, b) => b.msPlayed - a.msPlayed);

  const chart_3 = Plot.plot({
    style: {
      fontSize: 10,
    },
    x: { domain: [0, d3.max(sortedData, d => d.msPlayed)+1] },
    y: { padding: 0.4 },
    marks: [
      Plot.barX(sortedData, { x: d => d.msPlayed, y: d => d.trackName,fill: "#D32373",marginLeft: 150, dy: 2, dx: 2, sort: { y: 'x', reverse: true } }),
    ]
  });

  d3.select('#chart_canciones_olivia').append(() => chart_3);
});



d3.csv('datos/datos_agrupados_LUISA.csv', d3.autoType).then(data => {
  const filteredData = data.filter(d => d.artistName === 'WOS').slice(0,5);
  filteredData.forEach(d => {
    d.msPlayed = d.msPlayed / (1000 * 60 * 60); // Convertir los milisegundos a horas
  });
  const sums = d3.rollup(filteredData, v => d3.sum(v, d => d.msPlayed), d => d.trackName);
  const sortedData = Array.from(sums, ([trackName, msPlayed]) => ({ trackName, msPlayed })).sort((a, b) => b.msPlayed - a.msPlayed);

  const chart_3 = Plot.plot({
    style: {
      fontSize: 10,
    },
    x: { domain: [0, d3.max(sortedData, d => d.msPlayed)+1] },
    y: { padding: 0.4 },
    marks: [
      Plot.barX(sortedData, { x: d => d.msPlayed, y: d => d.trackName, fill:"#6823D3", marginLeft: 150, dy: 2, dx: 2, sort: { y: 'x', reverse: true } }),
    ]
  });

  d3.select('#chart_canciones_luisa').append(() => chart_3);
});


d3.csv('datos/datos_agrupados_SOLVA.csv', d3.autoType).then(data => {
  const filteredData = data.filter(d => d.artistName === 'Anson Seabra').slice(0,5);
  filteredData.forEach(d => {
    d.msPlayed = d.msPlayed / (1000 * 60 * 60); // Convertir los milisegundos a horas
  });
  const sums = d3.rollup(filteredData, v => d3.sum(v, d => d.msPlayed), d => d.trackName);
  const sortedData = Array.from(sums, ([trackName, msPlayed]) => ({ trackName, msPlayed })).sort((a, b) => b.msPlayed - a.msPlayed);

  const chart_3 = Plot.plot({
    style: {
      fontSize: 10,
    },
    x: { domain: [0, d3.max(sortedData, d => d.msPlayed)+1] },
    y: { padding: 0.4 },
    marks: [
      Plot.barX(sortedData, { x: d => d.msPlayed, y: d => d.trackName,fill:"#23B0D3" , marginLeft: 150, dy: 2, dx: 2, sort: { y: 'x', reverse: true } }),
    ]
  });

  d3.select('#chart_canciones_solva').append(() => chart_3);
});



