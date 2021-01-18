
Plotly.d3.json('geojson/2021_Jena_Buildings.geojson', function(bluejson) {
    Plotly.d3.json('geojson/2021_Jena_Parks.geojson', function(redjson) {
        Plotly.d3.json('geojson/2021_Jena_Cemeteries.geojson', function(greenjson) {
            Plotly.d3.json('geojson/Jena.geojson', function(boundjson) {
  
    Plotly.newPlot('map-problem-missing', [{
      type: 'scattermapbox',
      lat: [46],
      lon: [-74]
    }], {
      height: 500,
      width: 500,
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      font: {
        color: '#ffffff',
        size: 16
      },
      mapbox: {
        center: {
          lat: 50.9362,
          lon: 11.5920
        },
        style: 'dark',
        zoom: 14.2,
        layers: [
          {
            sourcetype: 'geojson',
            source: boundjson,
            type: 'fill',
            color: 'rgba(255,255,255,0.2)'
          },
          {
            sourcetype: 'geojson',
            source: bluejson,
            type: 'fill',
            color: 'rgba(255, 166, 0, 0.6)'
          },
          {
            sourcetype: 'geojson',
            source: redjson,
            type: 'fill',
            color: 'rgba(22, 87, 78, 0.6)'
          },  
          {
            sourcetype: 'geojson',
            source: greenjson,
            type: 'fill',
            color: 'rgba(210, 92, 83, 0.6)'
          }       
        ]
      }
    }, {
      mapboxAccessToken: 'pk.eyJ1Ijoiam9obi13aWdnIiwiYSI6ImNrazE3OXZ0bjBvaTcydm81NHpmNHI4ODUifQ.apAUJNXn33wDZJIulQwrjw',
      'staticPlot': true
    });
      
    
  });
  });
  });
  });