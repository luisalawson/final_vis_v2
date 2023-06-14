

  d3.csv('datos/datos_merge.csv', d3.autoType).then(data => {
    var framed = true;
    console.log(data)
    let chart_5 = 

    //puntos en el plano
    Plot.plot({
      grid: true,
      inset: 10,
      
      marks: [
        framed ? Plot.frame() : null,
        Plot.dot(data, {x: "danceability", y: "popularidad", fill: "#eee"}),
        Plot.dot(data, {x: "danceability", y: "popularidad", fx: "Nombre"})
      ]
    })

    //puntos en el plano unidos
  //   Plot.plot({
  //     marks: [
  //       Plot.delaunayMesh(data, {x: "danceability", y: "popularidad", z: "Nombre", stroke: "Nombre", strokeOpacity: 0.5}),
  //       Plot.dot(data, {x: "danceability", y: "popularidad", fill: "Nombre"})
  //     ]
  //   })

  // densidad colores
  // Plot.plot({
  //   marks: [
  //     Plot.density(data, {fx: "Nombre", x: "danceability", y: "popularidad", stroke: "density", clip: true}),
  //     Plot.frame()
  //   ],
  //   color: {
  //     legend: true,
  //     grid: true
  //   },
  //   style: {
  //     background: '#141414',
  //     fontSize: 10,
  //   },
  // })
  // Plot.plot({
  //     inset: 10,
  //     color: {legend: true},
  //     marks: [
  //       Plot.density(data, {
  //         x: "danceability",
  //         fillOpacity: 0.2,
  //         thresholds: [0.05]
  //       }),
  //       Plot.dot(data, {
  //         x: "danceability",
  //         stroke: "Nombre"
  //       }),
  //       Plot.frame()
  //     ]
  //   });
    
    d3.select('#chart_6').append(() => chart_5);
  });
  