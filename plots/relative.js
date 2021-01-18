dfd.read_csv("results.csv").then(df => {
  df.set_index({key: 'city', inplace: true});
  df = df.query({"column": "year", "is": "==", "to": "2021"});

  var buildings = df.query({"column": "usage", "is": "==", "to": "Buildings"}).loc({columns: ["sum(area)"]});
  var parks = df.query({"column": "usage", "is": "==", "to": "Parks"}).loc({columns: ["sum(area)"]});
  var cemeteries = df.query({"column": "usage", "is": "==", "to": "Cemeteries"}).loc({columns: ["sum(area)"]});
  
  var cities = ["Jena", "Muenchen", "Hamburg", "Berlin"];
  var city_names = ["Jena", "München", "Hamburg", "Berlin"];
  var i = 0;
  var total = new Array(cities.length)
  var buildings_ordered = new Array(cities.length)
  var parks_ordered = new Array(cities.length)
  var cemeteries_ordered = new Array(cities.length)

  for (const city of cities) {
    var area_buildings = buildings.loc({rows: [city]}).values[0][0]
    var area_parks = parks.loc({rows: [city]}).values[0][0]
    var area_cemeteries = cemeteries.loc({rows: [city]}).values[0][0]
    total[i] = area_buildings + area_parks + area_cemeteries;
    buildings_ordered[i] = area_buildings / total[i];
    parks_ordered[i] = area_parks / total[i];
    cemeteries_ordered[i] = area_cemeteries / total[i];
    ++i;
  }

  var trace_buildings = {
    y: city_names,
    x: buildings_ordered,
    name: 'Bebauung',
    marker: {
      color: '#ffa600',
      width: 1
    },
    type: 'bar',
    orientation: 'h',
    hovertemplate: '%{x:.1%}'
  };

  var trace_parks = {
    y: city_names,
    x: parks_ordered,
    name: 'Grünflächen',
    marker: {
      color: '#16574e',
      width: 1
    },
    type: 'bar',
    orientation: 'h',
    hovertemplate: '%{x:.1%}'
  };

  var trace_cemeteries = {
    y: city_names,
    x: cemeteries_ordered,
    name: 'Friedhöfe',
    marker: {
      color: '#d25c53',
      width: 1
    },
    type: 'bar',
    orientation: 'h',
    hovertemplate: '%{x:.1%}'
  };
  
  var layout = {
    barmode: 'stack',
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: {
      color: '#ffffff',
      size: 32
    },
    yaxis: {
      automargin: true,
      fixedrange: true
    },
    xaxis: {
      fixedrange: true,
      tickformat: '.1%'
    },
    title: "Relative Nutzungsanteile 2021",
    hovermode: true,
  };

  var options = {
    displayModeBar: false
  }

  Plotly.newPlot('plot-relative', [trace_buildings, trace_parks, trace_cemeteries],
    layout, options);
});