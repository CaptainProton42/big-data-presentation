dfd.read_csv("results.csv").then(df => {
  df.set_index({key: 'city', inplace: true});
  df = df.query({"column": "year", "is": "==", "to": "2021"});

  var buildings = df.query({"column": "usage", "is": "==", "to": "Buildings"}).loc({columns: ["sum(area)"]});
  var parks = df.query({"column": "usage", "is": "==", "to": "Parks"}).loc({columns: ["sum(area)"]});
  var cemeteries = df.query({"column": "usage", "is": "==", "to": "Cemeteries"}).loc({columns: ["sum(area)"]});
  
  var cities = ["Berlin", "Hamburg", "Muenchen", "Jena"];
  var city_names = ["Berlin", "Hamburg", "München", "Jena"];
  var i = 0;
  var total = new Array(cities.length)
  var buildings_ordered = new Array(cities.length)
  var parks_ordered = new Array(cities.length)
  var cemeteries_ordered = new Array(cities.length)

  for (const city of cities) {
    buildings_ordered[i] = buildings.loc({rows: [city]}).values[0][0]
    parks_ordered[i] = parks.loc({rows: [city]}).values[0][0]
    cemeteries_ordered[i] = cemeteries.loc({rows: [city]}).values[0][0]
    ++i;
  }

  var trace_buildings = {
    x: city_names,
    y: buildings_ordered,
    name: 'Bebauung',
    marker: {
      color: '#ffa600',
      width: 1
    },
    type: 'bar',
    hovertemplate: '%{y:.1f}'
  };

  var trace_parks = {
    x: city_names,
    y: parks_ordered,
    name: 'Grünflächen',
    marker: {
      color: '#16574e',
      width: 1
    },
    type: 'bar',
    hovertemplate: '%{y:.1f}'
  };

  var trace_cemeteries = {
    x: city_names,
    y: cemeteries_ordered,
    name: 'Friedhöfe',
    marker: {
      color: '#d25c53',
      widt: 1
    },
    type: 'bar',
    hovertemplate: '%{y:.1f}'
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
      title: "Fläche in km²",
      automargin: true,
      fixedrange: true
    },
    xaxis: {
      fixedrange: true
    },
    title: "Genutzte Fläche 2021"
  };

  var options = {
    displayModeBar: false
  }

  Plotly.newPlot('plot-total', [trace_buildings, trace_parks, trace_cemeteries],
    layout, options);
});