### Big-Data Projektarbeit
## Verarbeitung von OpenStreetMap-Daten mit Spark <!-- .element: style="color: #fff !important" --> 
John Wigg <!-- .element: class="light" -->

---

## Grundidee
* Eignen sich die Daten aus dem OpenStreetMap-Projekt zur parallelen Verarbeitung mit Spark?

### Fragestellung

*Wie setzt sich die Flächennutzung in verschiedenen deutschen Großstädten zusammen?*

---

## Datenbeschaffung

--

### Datenbeschaffung: OpenStreetMap

https://www.openstreetmap.org/

* 2004 gegründetes, internationales Projekt mit dem Ziel einer freien Weltkarte
* Freiwillige können selber Daten beitragen
* Die OSM-Daten stehen offen zur Verüfung (auch gewerblich, unter Quellenangabe)

--

### OpenStreetMap: Datenbank
* Selektiver Download aus der OSM-Datenbank: *Overpass API*
    - Abfragesprachen: *Overpass XML* und das neuere <a class="accent">***Overpass QL***</a>

* Öffentliche Endpunkte (z.B. http://overpass-api.de/api)

--

### OpenStreetMap: Datenstruktur

Elemente: 

<div style="display: flex; justify-content: center;">
    <div>
        <h4>Node</h4>
        <div style="width: 300px; height: 300px">
            <img src="images/node.svg"></img>
        </div>
    </div>
    <div>
        <h4>Way</h4>
        <div style="width: 300px; height: 300px">
            <img src="images/way.svg"></img>
        </div>
    </div>
    <div>
        <h4>Relation</h4>
        <div style="width: 300px; height: 300px">
            <img src="images/relation.svg"></img>
        </div>
    </div>
</div>

* <a class="accent">Attribute</a> weisen Elementen Rollen oder Informationen zu

--

### OpenStreetMap: *Attic Data*
* Ältere Versionen von Objekten in der OSM-Datenbank seit dem <a class="accent">12.09.2012</a>

--

### OpenStreetMap: Gesammelte Daten
* Daten für <a class="accent">bebaute Flächen</a>, <a class="accent">Grünflächen</a> und <a class="accent">Friedhöfe</a>
* Zeitraum von <a class="accent">2013</a>&ndash;<a class="accent">2021</a>
* Für <a class="accent">Berlin</a>, <a class="accent">Hamburg</a>, <a class="accent">München</a> und <a class="accent">Jena</a>

--

### OpenStreetMap: Beispielabfrage
* Abfrage der Daten zu <a class="accent">bebauten Flächen</a> in <a class="accent">Jena</a> vom <a class="accent">01.01.2015</a>
* `wr` steht für *Ways* und *Relations*
* `geom` gibt Koordinaten der Geometrie direkt aus
```
[out:json]
[date:"2015-01-01T00:00:00Z"];
( area[name="Jena"][wikipedia="de:Jena"]; )->.searchArea;
(
    wr["landuse"="commercial"](area.searchArea);
    wr["landuse"="construction"](area.searchArea);
    wr["landuse"="industrial"](area.searchArea);
    wr["landuse"="residential"](area.searchArea);
    wr["landuse"="retail"](area.searchArea);
    wr["landuse"="garages"](area.searchArea);
);
out geom;
```

--

### OpenStreetMap: Probleme
* Nur Download kleiner Datenmengen (~300 MB unkomprimiert)
* Abfragen von <a class="accent">*Attic Data*</a> können lange dauern
* Overpass API erlaubt kein Kombinieren mehrerer kleiner Anfragen zu einer großen Anfrage

&xrarr; Viele kleine Anfragen für verschiedene Nutzungstypen und Städte zeitaufwending <!-- .element: class="accent" -->

---

## Datenverarbeitung

--

### Datenverarbeitung: Theorie
***Ziel:*** Flächenberechnung.

* Berechnung der einzelnen Flächen mit optimierter Form der <a class="accent"><i>Gaußschen Trapezformel</i></a>:

$\begin{align}
2A &= \lvert \sum_{i=0}^{n-1} (x_i + x_{i+1\mod n})(y_i - y_{i+1\mod n})\rvert\newline
&= \lvert\sum_{i=1}^{n} x_i (y_{i+1\mod n} - y_{i-1})\rvert
\end{align}$

mit $y = \text{LAT}$ und $x = \cos(\text{LAT}) \cdot \text{LON}$

--

### Datenverarbeitung: Pipeline
<a class="accent">Lokal:</a> Overpass API

&darr;

<a class="accent">Cluster:</a> Reduzieren mit Spark

&darr;

<a class="accent">Lokal:</a> Plotten der Ergebnisse

--

### Datenverarbeitung: Ausgangsdaten
* OSM-Rohdaten werden als `.json`-Datei ausgegeben
```JSON
{
   ...
   "elements":[
      {
         "type":"way",
         ...
         "geometry":[
            {
               "lat":50.9321302, "lon":11.5863076
            },
            ...
]}]}
```

* 319 MB in vielen Einzeldateien

--

### Datenverarbeitung: PySpark
Spark `SQLContext` zum Lesen der `.json`-Daten als DataFrame

&darr;

Anpassen des Schemas zum Filtern und Umstrukturieren der Daten

(Jede Zeile des DataFrames enthält eine *Way* oder *Relation*)

&darr;

Flächenberechnung als <a class="accent">UDF</a> für jede Zeile des DataFrames

&darr;

Gruppierung und Summation nach <a class="accent">Jahr</a>, <a class="accent">Stadt</a> und <a class="accent">Nutzung</a>

--

### Datenverarbeitung: Ergebnisse

| year | city | usage | sum(area) |
| ---- | ---- | ----- | --------- |
| 2013 | Berlin | Buildings | 411.070 |
| 2013 | Berlin | Cemeteries | 11.199 |
| ...  | ...    | ...        | ...    |
| 2021 | Muenchen | Parks | 46.091 |

---

## Ergebnisse

--

### Karten der Rohdaten
* Konvertierung der Rohdaten zu GeoJSON und plotten im Browser mit Plotly und mapbox (lokal)

--

### Berlin
<div id="map-berlin" class="plot r-stretch"></div>

--

### Hamburg
<div id="map-hamburg" class="plot r-stretch"></div>

--

### München
<div id="map-muenchen" class="plot r-stretch"></div>

--

### Jena
<div id="map-jena" class="plot r-stretch"></div>

---

## Vergleich der Flächennutzung
<div id="plot-total" class="plot r-stretch"></div>

--

## Relative Flächennutzung
<div id="plot-relative" class="plot r-stretch"></div>

--

## Entwicklung der Flächen auf OSM
<div id="plot-development-Buildings" class="plot r-stretch"></div>

--

<div id="plot-development-Parks" class="plot r-stretch"></div>

--

<div id="plot-development-Cemeteries" class="plot r-stretch"></div>

---

## Probleme mit den Daten

--

<div class="plot r-stretch" style="display: flex">
    <div>
        Fehlende Daten
        <div id="map-problem-missing" style="width: 500px; height: 500px"></div>
    </div>
    <div>
        Überschneidungen
        <div id="map-problem-overlap" style="width: 500px; height: 500px"></div>
    </div>
    <div>
        Überhänge
        <div id="map-problem-overhang" style="width: 500px; height: 500px"></div>
    </div>
</div>

---

## Benchmarks

--

### Kerne pro Exekutor
* Nur Messung der Berechnung, nicht des Ladens der Daten
<div class="plot r-stretch" style="display: flex; justify-content: center;">
<div id="plot-benchmark-cores"></div>
</div>

--

### Datenmenge
* Künstliche Vervielfachung der Datenmenge mit `df.union(df)`
<div class="plot r-stretch" style="display: flex; justify-content: center;">
<div id="plot-benchmark-data"></div>
</div>

--

### Benchmarks

* Berechnung wirkt recht langsam, eventuell noch Optimierungsbedarf
* Kein weiterer Speedup ab 8 Kernen pro Exekutor
* Ausführungszeit nicht ganz Linear zur Datenmenge

---

## Ausblick
* Datenbeschaffung nahm Großteil der Zeit in Anspruch
    * Aufsetzen einer lokalen Datenbank
    * Direkt auf den XML-Rohdaten arbeiten
    * Viele kleine Anfragen vermeiden
* Arbeit mit der Datenstruktur in Spark war kompliziert
    * Vorbereitung der Daten mit verfügbaren Bibliotheken (z.B. GeoPandas)

---

## Quellen und verwendete Software

* Präsentation erstellt mit Reveal.js (MIT License)
* Abbildungen erstellt mit Plotly.js (MIT License) und mapbox
* Daten von OpenStreetMap (ODbL 1.0, DbCL 1.0)
