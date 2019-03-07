let hide;

// d3.json("data/africaRev.geojson").then(geojson => {
d3.json("data/test.geojson").then(geojson => {
  // https://www.mapbox.com/mapbox-gl-js/api/#accesstoken
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic2F1dGVyZCIsImEiOiJjajl6MDhhbmM4bWZjMndzNHdwc2dnM2JwIn0.ymR0Z5IEDE04lo11FJBvYw";

  // https://www.mapbox.com/mapbox-gl-js/api/#map
  let map = new mapboxgl.Map({
    container: "map",
    // style: "mapbox://styles/mapbox/navigation-preview-night-v2",
    style: "mapbox://styles/mapbox/outdoors-v11",
    center: [18.2812, 9.1021], // 9.1021° N, 18.2812° E
    zoom: 1
  });

  map.addControl(new mapboxgl.NavigationControl());
  const numFormatT = d3.format(",d");
  const numFormatF = d3.format(".2f");
  let container = map.getCanvasContainer();
  let svgAfrica = d3
    .select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height + 15);

  let transform = d3.geoTransform({ point: projectPoint }); // https://bl.ocks.org/Andrew-Reid/496078bd5e37fd22a9b43fd6be84b36b
  let path = d3.geoPath().projection(transform); // https://github.com/d3/d3-3.x-api-reference/blob/master/Geo-Paths.md

  let domainMin = 0;
  let capitaMax = 0.002;
  let areaMax = 0.05;

  let colorScaleGreen = d3
    .scaleSequential(d3.interpolateGreens)
    .domain([domainMin, areaMax]);

  // need to fix below color
  let colorScalePurple = d3
    .scaleSequential(d3.interpolateRdBu)
    .domain([0, 50, 100]);

  let featureElement = svgAfrica
    .selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("d", d3.geoPath().projection(transform))
    .attr("stroke", "none")
    .attr("fill", function(d) {
      return d.properties.totaltwh == 0 ||
        d.properties.region_wb != "Sub-Saharan Africa"
        ? "#696969"
        : colorScaleGreen(d.properties.totaltwh / d.properties.areakm); // per area
    })
    .attr("fill-opacity", 0.5);

  // stroke
  // .attr("stroke", function(d) {
  //   return d.properties.access == 0 ||
  //     d.properties.region_wb != "Sub-Saharan Africa"
  //     ? "none"
  //     : colorScalePurple(d.properties.access); // percent access
  // })
  // .attr("stroke-opacity", 1);

  // tooltip method
  var tooltip = {
    element: null,
    init: function() {
      this.element = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    },
    show: function(t) {
      this.element
        .html(t)
        .transition()
        .duration(200)
        .style("left", d3.event.pageX + 20 + "px")
        .style("top", d3.event.pageY - 20 + "px")
        .style("opacity", 0.9);
    },
    move: function() {
      this.element
        .transition()
        .duration(30)
        .style("left", d3.event.pageX + 20 + "px")
        .style("top", d3.event.pageY - 20 + "px")
        .style("opacity", 0.9);
    },
    hide: function() {
      this.element
        .transition()
        .duration(500)
        .style("opacity", 0);
    }
  };

  tooltip.init();

  featureElement
    .on("mouseover", function(d) {
      tooltip.show(
        `<b>${d.properties.name.toUpperCase()}</b><br>
        Access to Electricity: ${
          d.properties.access == 0 || d.properties.access == null
            ? "--"
            : d.properties.access + "%"
        }<br>
        Doing Business Rank: ${
          d.properties.easedb == 0 || d.properties.easedb == null
            ? "--"
            : numFormatT(d.properties.easedb) + " of 190"
        }<br>
       `
      );
    })
    .on("mousemove", function(d, i) {
      tooltip.move();
      featureElement.attr("fill-opacity", 0.5);
      d3.select(this).attr("fill-opacity", 0.8);
    })
    .on("mouseout", function(d, i) {
      tooltip.hide();
      featureElement
        .attr("fill", function(d) {
          return d.properties.totaltwh == 0 ||
            d.properties.region_wb != "Sub-Saharan Africa"
            ? "#696969"
            : colorScaleGreen(d.properties.totaltwh / d.properties.areakm); // per area
        })
        .attr("fill-opacity", 0.5);
    });

  // old tooltip code to show energy potential
  // <b><span class="green">Solar & Wind Potential</span></b><br>
  // Total Potential:
  // ${numFormatT(d.properties.totaltwh)} TWh/year<br>
  // Per Capita: ${numFormatT(
  //   (d.properties.totaltwh * 1000000000) / d.properties.pop_2017
  // )} KWh/year<br>
  // Per KM<sup>2</sup>: ${numFormatT(
  //   (d.properties.totaltwh * 1000000000) / d.properties.areakm
  // )} KWh/year

  function update() {
    featureElement.attr("d", path);
  }

  map.on("viewreset", update);
  map.on("movestart", function() {
    if (!hide) {
      svgAfrica.classed("hide-map", false);
    } else {
      svgAfrica.classed("hide-map", true);
    }
  });
  map.on("rotate", function() {
    svgAfrica.classed("hide-map", true);
  });
  map.on("moveend", function() {
    update();
    svgAfrica.classed("hide-map", false);
  });
  update();

  function projectPoint(lon, lat) {
    let point = map.project(new mapboxgl.LngLat(lon, lat));
    this.stream.point(point.x, point.y);
  }

  function resetStrokeAndFill() {
    featureElement
      .attr("stroke", "none")
      .attr("fill", function(d) {
        return d.properties.totaltwh == 0 ||
          d.properties.region_wb != "Sub-Saharan Africa"
          ? "#696969"
          : colorScaleGreen(d.properties.totaltwh / d.properties.areakm); // per area
      })
      .attr("fill-opacity", 0.5);
  }

  // graph-scroll library credit: http://1wheel.github.io/graph-scroll/
  d3.graphScroll()
    .container(d3.select(".container-3"))
    .graph(d3.selectAll(".container-3 #graph"))
    .eventId("uniqueId3") // namespace for scroll and resize events
    .sections(d3.selectAll(".container-3 #sections > div"))
    // .offset(3000)
    .on("active", function(i) {
      // if (i == 2 || i == 3 || i == 4) {
      //   featureElement.attr("stroke", "green").attr("stroke-opacity", 0.9);
      //   // .attr("fill-opacity", 0.0);
      // } else {
      //   featureElement.attr("stroke", "none").attr("fill-opacity", 0.4);
      // }
      console.log("map", i);

      if (i == 1) {
        resetStrokeAndFill();
        map.flyTo({
          // center: [18.2812, 4.0], // africa
          center: [-98.820191, 30.635745], // africa
          zoom: 6
        });
      } else if (i == 2) {
        hide = false;

        // position
        map.flyTo({
          center: [18.2812, 4.0], // africa
          zoom: 2.2
        });
        //stroke
        resetStrokeAndFill();
        featureElement.attr("stroke", function(d) {
          if (
            d.properties.name == "Gabon" ||
            d.properties.name == "Cape Verde" ||
            d.properties.name == "South Africa" ||
            d.properties.name == "Seychelles" ||
            d.properties.name == "Mauritius"
          ) {
            return "#00FF40";
          }
        });

        featureElement.attr("fill-opacity", function(d) {
          if (
            d.properties.name == "Gabon" ||
            d.properties.name == "Cape Verde" ||
            d.properties.name == "South Africa" ||
            d.properties.name == "Seychelles" ||
            d.properties.name == "Mauritius"
          ) {
            return 0.7;
          } else {
            return 0.3;
          }
        });
      } else if (i == 3) {
        hide = false;
        // position
        map.flyTo({
          center: [18.2812, 4.0], // africa
          zoom: 2.2
        });
        // stroke and fill
        resetStrokeAndFill();
        featureElement.attr("stroke", function(d) {
          if (
            d.properties.name == "S. Sudan" ||
            // d.properties.name == "Mozambique" ||
            // d.properties.name == "Niger" ||
            // d.properties.name == "Dem. Rep. Congo" ||
            d.properties.name == "Chad" ||
            // d.properties.name == "Burkina Faso" ||
            d.properties.name == "Malawi" ||
            // d.properties.name == "Madagascar" ||
            d.properties.name == "Central African Rep." ||
            // d.properties.name == "Guinea-Bissau" ||
            // d.properties.name == "Sierra Leone" ||
            d.properties.name == "Burundi"
            // || d.properties.name == "Liberia"
          ) {
            // return "#FF0059";
            return "#00FF40";
          }
        });
        featureElement.attr("fill-opacity", function(d) {
          if (
            d.properties.name == "S. Sudan" ||
            // d.properties.name == "Mozambique" ||
            // d.properties.name == "Niger" ||
            // d.properties.name == "Dem. Rep. Congo" ||
            d.properties.name == "Chad" ||
            // d.properties.name == "Burkina Faso" ||
            d.properties.name == "Malawi" ||
            // d.properties.name == "Madagascar" ||
            d.properties.name == "Central African Rep." ||
            // d.properties.name == "Guinea-Bissau" ||
            // d.properties.name == "Sierra Leone" ||
            d.properties.name == "Burundi"
            // || d.properties.name == "Liberia"
          ) {
            return 0.7;
          } else {
            return 0.3;
          }
        });
      } else if (i == 4) {
        hide = true;
        resetStrokeAndFill();

        // country selector
        let countryTable = document.querySelector(".countryTable");
        let analysisP = document.getElementById("analysis");
        let activeCountry = document.getElementById("name");
        activeCountry.innerHTML = `Comparing Energy Potential`;
        analysisP.innerHTML = ``;
        countryTable.innerHTML = `<div class="emptyState"><p>← ← ←<br>Select a country on the map to see how its potential compares to the United States<br>← ← ←</p></div>`;

        // click on country to build energy profile
        featureElement.on("click", function(d, i) {
          resetStrokeAndFill();
          d3.select(this).attr("stroke", "#00FF40");

          // fly to clicked country
          map.on("click", function(e) {
            map.flyTo({
              center: [e.lngLat.lng, e.lngLat.lat],
              zoom: 3.5
            });
          });

          // dynamically set title to active country
          let activeCountry = document.getElementById("name");
          activeCountry.innerHTML = `${d.properties.name}`;

          // dynamically build HTML table and analysis paragraph
          let countryTable = document.querySelector(".countryTable");
          countryTable.innerHTML = `
        <caption>
        </caption>
        <thead>
          <tr>
         <th class="left">Metrics</th>
            <th class="right" colspan="1">${d.properties.name}</th>
            <th class="right">USA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="left tick">Business Ranking</td>
            <td class="negative">${d.properties.easedb}</td>
            <td class="positive">8</td>
          </tr>
          <tr>
            <td class="left tick bottom">Electrification %</td>
            <td class="negative bottom">${d.properties.access}%</td>
            <td class="positive bottom">100%</td>
          </tr>
          <tr class="table-break">
            <td class="left total bottom" colspan="3">Annual Energy Potential in Millions</td>
          </tr>
          <tr>
            <td class="left tick">Per Capita (KWh)</td>
            <td>${numFormatF(
              ((d.properties.totaltwh / d.properties.pop_2017) * 1000000000) /
                1000000
            )}</td>
            <td>${numFormatF((0.001380319312251 * 1000000000) / 1000000)}</td>
          </tr>
          <tr>
            <td class="left tick bottom">Per Km<sup>2</sup> (KWh)</td>
            <td class="bottom">${numFormatF(
              ((d.properties.totaltwh / d.properties.areakm) * 1000000000) /
                1000000
            )}</td>
            <td class="bottom">${numFormatF(
              (0.045678932691726 * 1000000000) / 1000000
            )}</td>
        </tbody>`;

          let analysisP = document.getElementById("analysis");
          analysisP.innerHTML = `Let's put this in perspective...<br><br>In a single year, there's <span class="green large-pos"><strong>${numFormatT(
            ((d.properties.totaltwh / d.properties.areakm) * 1000000000) /
              (12984 * 78.69)
          )}x</strong></span> more potential solar + wind energy per square kilometer in <span class="border">${
            d.properties.name
          }</span> than the average US resident will use in their <strong class="upper">entire lifetime.</strong> <sup>[ 2 ]</sup> <sup>[ 3 ]</sup><br><br>And yet, they still only have <strong class="negative large-neg">${
            d.properties.access
          }%</strong> access to electricity.`;
        });
        map.flyTo({
          // center: [18.7322, 15.4542], // chad
          // zoom: 4.5
          center: [18.2812, 4.0], // africa
          zoom: 2.2
        });
        // colorScale.domain([domainMin, capitaMax]);
        // featureElement.transition().attr("fill", function(d) {
        //   return d.properties.totaltwh == 0
        //     ? "grey"
        //     : colorScale(d.properties.totaltwh / d.properties.pop_2017);
        // });
      } else {
        hide = true;

        resetStrokeAndFill();
        map.flyTo({
          center: [18.2812, 9.1021],
          zoom: 1
        });
      }
    });
});
