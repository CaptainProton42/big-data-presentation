dfd.read_csv("results.csv").then(df => {
  df.set_index({key: 'city', inplace: true});

  var titles = ["Änderung der bebauten Fläche seit 2013",
                "Änderung der Grünfläche seit 2013",
                "Änderung der Friedhofsfläche seit 2013"]

  var k = 0
  for (const usage of ["Buildings", "Parks", "Cemeteries"]) {
    var berlin = df.loc({rows: ["Berlin"]}).query({"column": "usage", "is": "==", "to": usage}).loc({columns: ["year", "sum(area)"]}).set_index({key: 'year'});
    var hamburg = df.loc({rows: ["Hamburg"]}).query({"column": "usage", "is": "==", "to": usage}).loc({columns: ["year", "sum(area)"]}).set_index({key: 'year'});
    var muenchen = df.loc({rows: ["Muenchen"]}).query({"column": "usage", "is": "==", "to": usage}).loc({columns: ["year", "sum(area)"]}).set_index({key: 'year'});
    var jena = df.loc({rows: ["Jena"]}).query({"column": "usage", "is": "==", "to": usage}).loc({columns: ["year", "sum(area)"]}).set_index({key: 'year'});

    var berlin_values = berlin.values
    var hamburg_values = hamburg.values
    var muenchen_values = muenchen.values
    var jena_values = jena.values

    var berlin_norm = berlin_values[0][0]
    var hamburg_norm = hamburg_values[0][0]
    var muenchen_norm = muenchen_values[0][0]
    var jena_norm = jena_values[0][0]

    for (var i = 0; i < berlin_values.length; ++i) {
      berlin_values[i][0] = berlin_values[i][0] / berlin_norm - 1
      hamburg_values[i][0] = hamburg_values[i][0] / hamburg_norm - 1
      muenchen_values[i][0] = muenchen_values[i][0] / muenchen_norm - 1
      jena_values[i][0] = jena_values[i][0] / jena_norm - 1
    }
    
    var plot_df = new dfd.DataFrame({
      "Jahr": ["2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"],
      "Berlin": berlin_values,
      "Hamburg": hamburg_values,
      "München": muenchen_values,
      "Jena": jena_values
    })
    plot_df.set_index({key: 'Jahr', inplace: true});

    var layout = {
      title: titles[k],
      xaxis: {
          title: 'Jahr',
          fixedrange: true,
          automargin: true
      },
      yaxis: {
          title: 'Änderung',
          tickformat: '+%',
          fixedrange: true,
          automargin: true
      },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      font: {
        color: '#ffffff',
        size: 32
      }
    }

    var options = {
      displayModeBar: false
    }

    plot_df.plot("plot-development-"+usage).line({layout: layout, config: options})
    ++k;
  }
});