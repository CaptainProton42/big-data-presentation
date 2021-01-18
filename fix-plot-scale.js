// Fix interaction and resolution of Plotly plots by reversing the slide scale.

var observer = new MutationObserver(function(mutations) {
    fix_scale();  
});

var source = document.getElementsByClassName('slides')[0];
var targets = document.getElementsByClassName('plot');
observer.observe(source, { attributes : true, attributeFilter : ['style'] });

function fix_scale() {
    for (var target of targets) {
        target.style['zoom'] = 1.0 / source.style['zoom']
        target.style['width'] = 1.0 * source.style['zoom']
    }
}

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      fix_scale();
    }
  }