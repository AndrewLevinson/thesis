<template>
  <div>
    <svg :width="width" :height="height" id="county-svg"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "county-map",

  data() {
    return {
      svgWidth: window.innerWidth,
      svgHeight: window.innerHeight,
      margin: { top: 50, left: 25, bottom: 50, right: 25 }
    };
  },
  computed: {
    width() {
      return this.svgWidth - this.margin.left - this.margin.right;
    },
    height() {
      return this.svgHeight - this.margin.top - this.margin.bottom;
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      var svg = d3.select("#county-svg");

      var usage = d3.map();

      var path = d3.geoPath();

      var promises = [
        d3.json("https://cdn.jsdelivr.net/npm/us-atlas@1/us/10m.json"),
        d3.csv("data/clean/countyusage.csv", d => {
          usage.set(d.ID, +d.freshPer);
        })
      ];

      Promise.all(promises).then(ready);

      function ready([us]) {
        var x = d3
          .scaleLinear()
          // .scalePow()
          // .exponent(3)
          .domain([0, 300])
          .rangeRound([600, 1200]);

        // var color = d3
        //   .scaleThreshold()
        //   .domain(d3.range(0, 6))
        //   .range(d3.schemeBlues[9]);

        let color = d3
          .scaleThreshold()
          .domain([0, 0.5, 1, 10, 100, 250, 300])
          .range(d3.schemeBlues[7]);

        var g = svg
          .append("g")
          .attr("class", "key")
          .attr("transform", "translate(0,40)");

        g.selectAll("rect")
          .data(
            color.range().map(function(d) {
              d = color.invertExtent(d);
              if (d[0] == null) d[0] = x.domain()[0];
              if (d[1] == null) d[1] = x.domain()[1];
              return d;
            })
          )
          .enter()
          .append("rect")
          .attr("height", 8)
          .attr("x", function(d) {
            return x(d[0]);
          })
          .attr("width", function(d) {
            return x(d[1]) - x(d[0]);
          })
          .attr("fill", function(d) {
            return color(d[0]);
          });

        g.append("text")
          .attr("class", "caption")
          .attr("x", x.range()[0])
          .attr("y", -6)
          .attr("fill", "#000")
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text("Freshwater Withdrawal Per Capita");

        g.call(
          d3
            .axisBottom(x)
            .tickSize(13)
            .tickFormat(function(x, i) {
              return i ? x : x + " Mgal/d";
            })
            .tickValues(color.domain())
        )
          .select(".domain")
          .remove();

        // map
        svg
          .append("g")
          .attr("class", "counties")
          .selectAll("path")
          .data(topojson.feature(us, us.objects.counties).features)
          .enter()
          .append("path")
          .attr("fill", function(d) {
            console.log(d);
            return color((d.freshPer = usage.get(d.id)));
          })
          .attr("d", path)
          .append("title")
          .text(function(d) {
            return d.freshPer;
          });

        svg
          .append("path")
          .datum(
            topojson.mesh(us, us.objects.states, function(a, b) {
              return a !== b;
            })
          )
          .attr("class", "states")
          .attr("d", path);
      }
    }
  }
};
</script>

<style>
#county-svg {
  border: 1px solid red;
}
.counties {
  fill: none;
}

.states {
  fill: none;
  stroke: #fff;
  stroke-linejoin: round;
}
</style>