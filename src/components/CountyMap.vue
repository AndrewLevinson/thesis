<template>
  <div id="chart-three">
    <div id="county-section">
      <svg :width="width" :height="height" id="county-svg"></svg>
    </div>
    <section class="text-section" id="sectionsThree">
      <div class="text-box">
        <h5 class="box-title">Freshwater withdrawals by county</h5>
        <p>Total withdrawals and withdrawal per capita</p>
      </div>
      <div class="text-box">
        <h5 class="box-title">Freshwater withdrawals by usage</h5>
        <p>Take a look at freshwater usage among major usage categories displayed in previous chart</p>
      </div>
    </section>
  </div>
</template>

<script>
import * as d3 from "d3";
import { graphScroll } from "graph-scroll";

export default {
  name: "county-map",

  data() {
    return {
      svgWidth: 1000,
      svgHeight: window.innerHeight,
      margin: { top: 25, left: 25, bottom: 25, right: 25 }
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
    this.scrollTrigger();
  },
  methods: {
    loadData() {
      // test code
      // var chart = d3.select("#county-svg");
      // var width = 1000;
      // var height = 600;
      // var aspect = 1000 / 600;
      // d3.select(window).on("resize", function() {
      //   var targetWidth = chart.node().getBoundingClientRect().width;
      //   console.log(targetWidth);
      //   chart.attr("width", width);
      //   chart.attr("height", targetWidth / aspect);
      // });

      // var svg = d3
      //   .select("#county-svg")
      //   .attr("width", width)
      //   .attr("height", height);

      let svg = d3.select("#county-svg");

      var path = d3.geoPath();

      var usage = d3.map();
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
          .domain([0, 350])
          .rangeRound([550, 875]);

        // var color = d3
        //   .scaleThreshold()
        //   .domain(d3.range(0, 6))
        //   .range(d3.schemeBlues[9]);

        let color = d3
          .scaleThreshold()
          .domain([0, 0.5, 1, 5, 100, 350])
          // .domain([0, 1, 5, 10, 100, 350])
          .range(d3.schemeBlues[6]);

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
          .attr("fill", "#3d3d3d")
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text("Freshwater Withdrawal Per Capita");

        g.call(
          d3
            .axisBottom(x)
            .tickSize(13)
            .tickFormat(function(x, i) {
              // return i ? x : x + " Mgal/d";
              return i ? x : x + "";
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

          .join("path")
          .attr("fill", d => {
            // console.log(d);
            return color(usage.get(d.id));
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
    },
    scrollTrigger() {
      graphScroll()
        .offset(225)
        .graph(d3.selectAll("#county-section"))
        .container(d3.select("#chart-three"))
        .sections(d3.selectAll("#sectionsThree > div"))
        .eventId("uniqueId3")
        .on("active", i => {
          console.log(this);
          switch (i) {
            case 0:
              console.log("im the county graph! 0");
              // offscreen so do nothing
              break;
            case 1:
              console.log("im the county graph! 1");
              break;
          }
        });
    }
  }
};
</script>

<style>
#county-section {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
}
#county-svg {
  margin: 0 auto;
}

.counties {
  fill: none;
}

.states {
  fill: none;
  stroke: #fff;
  stroke-linejoin: round;
}

#chart-three .text-section {
  padding-bottom: 20rem;
  font-size: 90%;
}

#sectionsThree .text-box {
  /* transition: 1.5s all cubic-bezier(0.39, 0.575, 0.565, 1); */
  width: 45%;
  max-width: 600px;
  padding: 1.25rem 1.75rem 1.5rem 1.75rem;
  margin: 0 auto;
  margin-bottom: 60rem;
  /* z-index: 999; */
  border-radius: 4px;
  opacity: 0.925;
  filter: drop-shadow(0px 2px 4px rgba(59, 59, 61, 0.2));
  /* unique to chart one */
  background-color: var(--main-bg-color);
  border: 1px solid rgba(112, 112, 112, 0.33);
}

#sectionsThree .text-box p {
  margin-bottom: 0px;
}

#sectionsThree .box-title {
  margin-bottom: 0.5rem;
  /* font-size: 120%; */

  /* border-bottom: 1px dashed var(--main-body-type); */
}

/* text -- graph scroll */
#sectionsThree > div {
  z-index: 999;
  opacity: 0.3;
}

#sectionsThree div.graph-scroll-active {
  z-index: 999;
  opacity: 1;
}
</style>