async function plotWorldTour(dataPromise, divId) {
  var top5artistas = await dataPromise;
  var width = 400;
  var height = 400;
  var inset =20;
  var outline = ({type: "Sphere"});
  var world = await d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json");
  var countries = topojson.feature(world, world.objects.countries).features;
  var borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b)
  var land = topojson.feature(world, world.objects.land)
  
  var tilt = 20;
  var projection = d3.geoOrthographic().fitExtent(
    [
      [inset, inset],
      [width - inset, height - inset],
    ],
    outline
  );
  var context = d3
                .select(divId)
                .append("canvas")
                .attr("width", width)
                .attr("height", height)
                .attr("id", "worldmap")
                .node()
                .getContext("2d");
  const path = d3.geoPath(projection, context);
  function render(country, arc) {
    context.clearRect(0, 0, width, height);
    context.beginPath(), path(land), (context.fillStyle = "white"),
  context.fill();
    context.beginPath(), path(country), (context.fillStyle = "#1DB954"),
  context.fill();
    context.beginPath(), path(borders), (context.strokeStyle = "#2f2f2f;"),
(context.lineWidth = 0.5), context.stroke();
    context.beginPath(), path(outline), (context.strokeStyle = "white"),
  (context.lineWidth = 1.5), context.stroke();
    context.beginPath(), path(arc), context.stroke();
    return context.canvas;
  }

  let p1, p2 = [0, 0], r1, r2 = [0, 0, 0];

  for (const artista of top5artistas) {
    var artista_pais = artista.Pais;

    var country_name_map = {
      "Estados Unidos": "United States of America",
      "Argentina": "Argentina",
      "Canada": "Canada",
      "Puerto Rico": "Puerto Rico",
      "España": "Spain",
      "Colombia":"Colombia",
    };
    if (country_name_map[artista_pais] != undefined) {
      artista_pais = country_name_map[artista_pais];
    }
    var country = countries.find((c) => c.properties.name === artista_pais);
    var typed_name = new Typed("#nombre", {
      strings: ["Nombre: ", "Nombre: " + artista.artistName+ "\n"],
      typeSpeed: 40,
      loop: false,
      cursorChar: "",
      smartBackspace: true,
    });
    var typed_pais = new Typed("#nacionalidad", {
      strings: ["País: ", "País: "+ " " + artista.Pais+ "\n"],
      typeSpeed: 40,
      loop: false,
      cursorChar: "",
      smartBackspace: true,
    });
    var typed_puesto = new Typed("#puesto_en_el_top", {
      strings: ["Puesto en el top: ", "Puesto en el top:  " + artista.Puesto+ "\n"],
      typeSpeed: 40,
      loop: false,
      cursorChar: "",
      smartBackspace: true,
    });
    var typed_nombretop = new Typed("#en_el_top_de", {
      strings: ["En el top de: ", "En el top de: " + artista.Nombre+ "\n"],
      typeSpeed: 40,
      loop: false,
      cursorChar: "",
      smartBackspace: true,
    });
    var typed_genre = new Typed("#genero", {
      strings: ["Género musical: ", "Género musical: " + artista.Genero+ "\n"],
      typeSpeed: 40,
      loop: false,
      cursorChar: "",
      smartBackspace: true,
    });
    p1 = p2, p2 = d3.geoCentroid(country);
    r1 = r2, r2 = [-p2[0], tilt - p2[1], 0];
    const ip = d3.geoInterpolate(p1, p2);
    const iv = Versor.interpolateAngles(r1, r2);
    await d3.transition()
        .duration(1250)
        .tween("render", () => t => {
          projection.rotate(iv(t));
          render(country, {type: "LineString", coordinates: [p1, ip(t)]});
        })
      .transition()
        .tween("render", () => t => {
          render(country, {type: "LineString", coordinates: [ip(t), p2]});
        })
      .end();
  }
}
class Versor {
  static fromAngles([l, p, g]) {
    l *= Math.PI / 360;
    p *= Math.PI / 360;
    g *= Math.PI / 360;
    const sl = Math.sin(l), cl = Math.cos(l);
    const sp = Math.sin(p), cp = Math.cos(p);
    const sg = Math.sin(g), cg = Math.cos(g);
    return [
      cl * cp * cg + sl * sp * sg,
      sl * cp * cg - cl * sp * sg,
      cl * sp * cg + sl * cp * sg,
      cl * cp * sg - sl * sp * cg
    ];
  }
  static toAngles([a, b, c, d]) {
    return [
      Math.atan2(2 * (a * b + c * d), 1 - 2 * (b * b + c * c)) * 180 / Math.PI,
      Math.asin(Math.max(-1, Math.min(1, 2 * (a * c - d * b)))) * 180 / Math.PI,
      Math.atan2(2 * (a * d + b * c), 1 - 2 * (c * c + d * d)) * 180 / Math.PI
    ];
  }
  static interpolateAngles(a, b) {
    const i = Versor.interpolate(Versor.fromAngles(a), Versor.fromAngles(b));
    return t => Versor.toAngles(i(t));
  }
  static interpolateLinear([a1, b1, c1, d1], [a2, b2, c2, d2]) {
    a2 -= a1, b2 -= b1, c2 -= c1, d2 -= d1;
    const x = new Array(4);
    return t => {
      const l = Math.hypot(x[0] = a1 + a2 * t, x[1] = b1 + b2 * t, x[2] = c1 + c2 * t, x[3] = d1 + d2 * t);
      x[0] /= l, x[1] /= l, x[2] /= l, x[3] /= l;
      return x;
    };
  }
  static interpolate([a1, b1, c1, d1], [a2, b2, c2, d2]) {
    let dot = a1 * a2 + b1 * b2 + c1 * c2 + d1 * d2;
    if (dot < 0) a2 = -a2, b2 = -b2, c2 = -c2, d2 = -d2, dot = -dot;
    if (dot > 0.9995) return Versor.interpolateLinear([a1, b1, c1, d1], [a2, b2, c2, d2]); 
    const theta0 = Math.acos(Math.max(-1, Math.min(1, dot)));
    const x = new Array(4);
    const l = Math.hypot(a2 -= a1 * dot, b2 -= b1 * dot, c2 -= c1 * dot, d2 -= d1 * dot);
    a2 /= l, b2 /= l, c2 /= l, d2 /= l;
    return t => {
      const theta = theta0 * t;
      const s = Math.sin(theta);
      const c = Math.cos(theta);
      x[0] = a1 * c + a2 * s;
      x[1] = b1 * c + b2 * s;
      x[2] = c1 * c + c2 * s;
      x[3] = d1 * c + d2 * s;
      return x;
    };
  }
}