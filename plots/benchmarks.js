window.onload = function () {
    // Executor Core Benchmark
    var trace = {
        x: [1, 2, 4, 8, 16, 32],
        y: [29230.8, 28559.4, 27785.8, 24908.4, 25151.8, 25147.4],
        error_y: {
            type: 'data',
            array: [1274.955176, 492.8613395, 2067.887739, 811.3866526, 366.3239004, 680.045072],
            visible: true,
            width: 10,
            thickness: 4.0
        },
        marker: {
            size: 10
        },
        line: {
            width: 5
        },
        type: 'scatter'
    };

    var layout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: {
            color: '#ffffff',
            size: 32
        },
        yaxis: {
            title: "Benötigte Zeit in ms",
            automargin: true,
            fixedrange: true
        },
        xaxis: {
            title: "spark.executor.cores",
            fixedrange: true
        }
    };

    var options = {
        displayModeBar: false
    }

    var data = [trace];
    
    Plotly.newPlot('plot-benchmark-cores', data, layout, options);

    // Data Amount Benchmark
    var trace = {
        x: [1, 2, 4],
        y: [24726.2, 32988.6, 81611.6],
        error_y: {
            type: 'data',
            array: [834.2018341, 1321.882673, 3938.726609],
            visible: true,
            width: 10,
            thickness: 4.0
        },
        marker: {
            size: 10
        },
        line: {
            width: 5
        },
        type: 'scatter',
        name: "Messwerte"
    };

    var ideal = {
        x: [0, 5],
        y: [0.0, 5*24726.2],
        type: 'scatter',
        line: {
            dash: 'dashdot',
            width: 4
        },
        name: 'Linear'
    }

    var layout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: {
            color: '#ffffff',
            size: 32
        },
        yaxis: {
            title: "Benötigte Zeit in ms",
            automargin: true,
            fixedrange: true,
            range: [20000, 100000]
        },
        xaxis: {
            title: "Vielfaches der Datenmenge",
            fixedrange: true,
            range: [0.9, 4.1],
        }
    };

    var options = {
        displayModeBar: false
    }

    var data = [trace, ideal];
    
    Plotly.newPlot('plot-benchmark-data', data, layout, options);
}