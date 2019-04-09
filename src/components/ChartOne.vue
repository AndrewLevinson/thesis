<template>
  <div id="chart-one">
    <div id="graph-one">
      <svg :width="svgWidth" :height="svgHeight">
        <g :transform="`translate(${margin.left}, ${margin.bottom})`" class="the-group">
          <g v-axis:x="scale" :transform="`translate(${0}, ${height})`" class="x-axis"></g>
          <g v-axis:y="scale" class="y-axis"></g>
          <g v-grid:gridLine="scale" class="grid"></g>
          <path class="link" :d="paths.line"></path>
          <g :class="[showArea ? 'area-active' : 'area-hide']">
            <path class="area-one" :d="paths.areaOne"></path>
            <path class="area-two" :d="paths.areaTwo"></path>
            <path class="area-three" :d="paths.areaThree"></path>
          </g>
          <g
            v-for="(d, i) in data"
            :key="i"
            @mouseover="showLabel = !showLabel,
            myTooltip(d),select(i)"
            @mouseleave="showLabel = !showLabel, myTooltip(d), select(null)"
          >
            <circle
              :class="[i == selected ? 'circle-active' : 'circle-up']"
              :cx="scale.x(d.year)"
              :cy="scale.y(d.rwpc)"
              r="5"
            ></circle>
          </g>
          <g>
            <text
              y="-78"
              :x="svgHeight/-2"
              transform="rotate(-90)"
              text-anchor="middle"
              class="axis-title"
            >Renewable water resources (m3/year)</text>
            <text
              :x="svgWidth - margin.right - margin.left - 5"
              :y="svgHeight - margin.bottom - margin.top -10"
              text-anchor="end"
              class="axis-title"
            >Years</text>
            <text
              y="-10"
              x="-65"
              text-anchor="left"
              id="graph-one-title"
            >Total Renewable Water Resources Per Capita (m3/inhab/year)</text>
          </g>
        </g>
      </svg>
    </div>
    <section class="text-section" id="sectionsOne">
      <div class="text-box">
        <h5 class="box-title">Why are we running out of water?</h5>
        <p>
          In 2012, the global demand for water exceeded supply and unless
          drastic action is taken the gap is expected to increase
          dramatically—reaching 90% by the year 2090. Population growth is reducing the static amount of renewable
          freshwater available per capita.
        </p>
      </div>
      <div class="text-box">
        <h5 class="box-title">Trending Down</h5>
        <p>
          According to Aquastat, 2014 has the official number at
          <span
            class="datum"
          >10,000 cubic meters/year/person</span> and the 2019 projection is estimated to be at
          <span class="datum">fill in</span>
        </p>
      </div>
      <div class="text-box">
        <h5 class="box-title">Where does our freshwater come from?</h5>
        <p>
          Renewable freshwater is mostly extracted from
          <span class="datum">surface water</span> (about 70%),
          <span class="datum">ground water</span> (about 25%), with some water coming from beyond the countries borders like from Canada marked as
          <span
            class="datum"
          >dependencies</span> (about 5%).
        </p>
      </div>
      <div class="text-box">
        <h5 class="box-title">What is it used for?</h5>
        <p>
          On average, United States freshwater is used on
          <span
            class="datum"
          >agriculture & irrigation</span> (x%),
          <span class="datum">industrial usage *</span> (about 30%), and finally the water that comes from the tap classified as
          <span
            class="datum"
          >municiapl or public usage</span> (about 12%). But these numbers are just averages, the breakdown in each state is much different...
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import * as d3 from "d3";
import { graphScroll } from "graph-scroll";

export default {
  name: "chart-one",
  data() {
    return {
      svgWidth: window.innerWidth * 0.95,
      svgHeight: window.innerHeight * 0.95,
      margin: { top: 50, left: 90, bottom: 50, right: 25 },
      data: [{}],
      stackedData: null,
      scaled: {
        x: null,
        y: null,
        color: null
      },
      paths: {
        line: "",
        areaOne: "",
        areaTwo: "",
        areaThree: ""
      },
      points: [[], [], [], []],
      myFilters: {
        yearMax: 2014
      },
      showLabel: false,
      selected: null,
      myCount: null,
      tooltip: null,
      showArea: false,
      domainMin: 7000,
      domainMax: 13500,
      stackKeys: ["gpc", "spc", "dpc"]
      // stackKeys: ["groundpercent", "surfacepercent", "deppercennt"]
    };
  },
  computed: {
    filteredData() {
      let filteredData = this.data.filter(d => d.year > this.myFilters.yearMax);
      return filteredData;
    },
    width() {
      return this.svgWidth - this.margin.left - this.margin.right;
    },
    height() {
      return this.svgHeight - this.margin.top - this.margin.bottom;
    },
    count() {
      return (this.myCount = this.data.length);
    },
    scale() {
      const x = d3
        // .scaleBand()
        // .domain(this.data.map(x => x.year))
        .scaleLinear()
        .domain([1987, Math.max(...this.data.map(x => x.year))])
        // https://github.com/d3/d3-scale/blob/master/README.md#band_rangeRound
        .rangeRound([0, this.width]);
      // .paddingInner(1);
      const y = d3
        .scaleLinear()
        .domain([this.domainMin, this.domainMax])
        // .domain([this.domainMin, Math.max(...this.data.map(y => y.rwpc)) + 500])

        // .domain([0, 10000])
        .rangeRound([this.height, 0]); // Already flipped

      const colorScale = d3
        .scaleOrdinal()
        .range(["#4C82C3", "#F37B6D", "#6CC071"]);

      const gridLine = d3
        .scaleLinear()
        .domain([this.domainMin, this.domainMax])
        .rangeRound([this.height, 0]);

      this.scaled.x = x;
      this.scaled.y = y;
      this.scaled.color = colorScale;
      return { x, y, colorScale, gridLine };
    }
  },
  mounted() {
    this.loadData();
    this.initTooltip();
    this.scrollTrigger();
  },
  updated() {
    console.log("im updated");
    this.updatePath();
  },
  methods: {
    loadData() {
      d3.csv("data/clean/renewable_water_capita.csv", d => {
        return {
          year: +d["years"],
          rwpc: +d["rwpc"],
          spc: +d["spc"],
          gpc: +d["gpc"],
          dpc: +d["dpc"],
          surfacepercent: +d["surfacepercent"],
          groundpercent: +d["groundpercent"],
          deppercent: +d["deppercent"]
        };
      })
        .then(d => {
          return (this.data = d);
          // console.log(d);
        })
        .then(() => {
          this.updatePath();
        });
    },
    createLine: d3
      .line()
      .x(d => d.x)
      .curve(d3.curveBundle.beta(1))
      .y(d => d.y)
      .curve(d3.curveBundle.beta(1)),
    createArea: d3
      .area()
      .x(d => d.x)
      .y0(d => d.first)
      .y1(d => d.second),
    initTooltip() {
      this.tooltip = {
        element: null,
        init: function() {
          this.element = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("right", `0px`)
            .style("bottom", `50px`)
            .style("opacity", 0);
        },
        show: function(t) {
          this.element
            .html(t)
            .transition()
            .duration(200)
            .style("right", `50px`)
            .style("bottom", `50px`)
            .style("opacity", 0.925);
        },
        move: function() {
          this.element
            .transition()
            .duration(30)
            .style("right", 20 + "px")
            .style("top", 20 + "px")
            .style("opacity", 0.9);
        },
        hide: function() {
          this.element
            .transition()
            .duration(200)
            .style("opacity", 0)
            .delay(400)
            .style("right", `0px`);
        }
      };
      this.tooltip.init();
    },
    myTooltip(d) {
      if (this.showLabel) {
        this.tooltip.show(`<h5 class="total">${d.year}</h5><p>
        <span class="datum">${
          d.rwpc
        }</span> cookie used for <span class="datum">${
          d.purpose
        }</span> that will be stored on my computer as a <span class="datum">${
          d.type
        }</span> type with a duration of <span class="datum">${
          d.expire
        }</span> days.
        </p>`);
      } else if (!this.showLabel) {
        this.tooltip.hide();
      }
    },
    updatePath() {
      this.points[0] = [];
      this.points[1] = [];
      this.points[2] = [];
      this.points[3] = [];
      // total rwpc for line
      for (const d of this.data) {
        this.points[0].push({
          x: this.scaled.x(d.year),
          y: this.scaled.y(d.rwpc),
          max: this.height
        });
      }
      this.paths.line = this.createLine(this.points[0]);

      const stack = d3.stack();
      stack.keys(this.stackKeys);
      this.stackedData = stack(this.data);

      // area 1
      for (const d of this.stackedData[0]) {
        this.points[1].push({
          x: this.scaled.x(d.data.year),
          first: this.scaled.y(d[0]),
          second: this.scaled.y(d[1])
        });
      }
      // area 2
      for (const d of this.stackedData[1]) {
        this.points[2].push({
          x: this.scaled.x(d.data.year),
          first: this.scaled.y(d[0]),
          second: this.scaled.y(d[1])
        });
      }
      // area 3
      for (const d of this.stackedData[2]) {
        this.points[3].push({
          x: this.scaled.x(d.data.year),
          first: this.scaled.y(d[0]),
          second: this.scaled.y(d[1])
        });
      }

      this.paths.areaOne = this.createArea(this.points[1]);
      this.paths.areaTwo = this.createArea(this.points[2]);
      this.paths.areaThree = this.createArea(this.points[3]);
    },
    updateArea() {
      // const keys = ["spc", "gpc", "dpc"];
      // const stack = d3.stack();
      // stack.keys(keys);
      // this.stackedData = stack(this.data);
      // let area = d3
      //   .area()
      //   .x(d => this.scaled.x(d.data.year))
      //   .y0(d => this.scaled.y(d[0]))
      //   .y1(d => this.scaled.y(d[1]));
      // var baseGroup = d3.select(".the-group");
      // let ageGroup = baseGroup
      //   .selectAll(".area")
      //   .data(this.stackedData)
      //   .enter()
      //   .insert("g")
      //   .style("fill", (d, i) => {
      //     return this.scaled.color(i);
      //   })
      //   .attr("class", "area")
      //   .insert("path")
      //   .attr("d", d => {
      //     return area(d);
      //   });
    },
    select(index) {
      this.selected = index;
    },
    scrollTrigger() {
      graphScroll()
        .offset(225)
        .graph(d3.selectAll("#graph-one"))
        .container(d3.select("#chart-one"))
        .sections(d3.selectAll("#sectionsOne > div"))
        .eventId("uniqueId1")
        .on("active", i => {
          // console.log(i + "th section active");
          // if (i === 0) {
          //   // offscreen so do nothing
          // } else if (i === 1) {
          //   this.selected = 3;
          // } else if (i === 2) {
          //   this.selected = 4;
          // }

          switch (i) {
            case 0:
              // offscreen so do nothing
              this.domainMin = 7000;
              this.showArea = false;
              this.selected = null;
              console.log("case 0");
              break;
            case 1:
              this.domainMin = 7000;

              this.showArea = false;
              this.selected = 6;
              console.log("case 1");

              break;
            case 2:
              this.domainMin = 0;
              // this.domainMax = 1;
              // this.stackKeys = [
              //   "groundpercent",
              //   "surfacepercent",
              //   "deppercennt"
              // ];
              this.showArea = true;
              console.log("case 2");

              break;
            case 3:
              this.updatePath();
              console.log("case 3");

              break;
            case 4:
              break;
            case 5:
              break;
            case 6:
          }
        });
    }
  },
  directives: {
    axis(el, binding) {
      const axis = binding.arg; // x or y
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      // The line below assigns the x or y function of the scale object
      const methodArg = binding.value[axis];
      // d3.axisBottom(scale.x)
      d3.select(el).call(
        d3[axisMethod](methodArg)
          .tickFormat(d3.format(binding.arg === "x" ? "d" : ",d"))
          .ticks(binding.arg === "x" ? 9 : 5)
      );
    },
    grid(el, binding) {
      const axis = binding.arg; // x or y
      const axisMethod = { gridLine: "axisLeft" }[axis];
      // The line below assigns the x or y function of the scale object
      const methodArg = binding.value[axis];
      // d3.axisBottom(scale.x)
      d3.select(el).call(
        d3[axisMethod](methodArg)
          .tickFormat("")
          .tickSize(-2000)
          .ticks(5)
      );
    }
  }
};
</script>

<style scoped>
/* text */
.text-section {
  padding-bottom: 20rem;
  /* z-index: 999; */
  font-size: 90%;
}

.text-box {
  /* transition: 1.5s all cubic-bezier(0.39, 0.575, 0.565, 1); */
  width: 45%;
  max-width: 600px;
  padding: 1.25rem 1.25rem 1rem 1.75rem;
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

.box-title {
  margin-bottom: 0.5rem;
  /* font-size: 120%; */

  /* border-bottom: 1px dashed var(--main-body-type); */
}

section {
  z-index: 999;
}
/* text -- graph scroll */
#sectionsOne > div {
  z-index: 999;
  opacity: 0.3;
}

#sectionsOne div.graph-scroll-active {
  z-index: 999;
  opacity: 1;
}

/* chart */
#chart-one {
  width: 95%;
  margin: 0 auto;
}

#graph-one-title {
  font-weight: bold;
  font-size: 2.5rem;
  fill: #485465;
  /* opacity: 0.8; */
}
#graph-one {
  position: sticky;
  position: -webkit-sticky;
  top: 40px;
}

.axis-title {
  font-weight: bold;
}

div,
rect,
path,
text,
g,
circle,
line {
  transition: all 0.7s ease-in-out;
}

.circle-up {
  fill: #fff;
  stroke: #000;
  transition: all 0.7s ease-in-out;
}

.circle-active {
  fill: #3c5a99;
  stroke: #000;
  transition: all 0.7s ease-in-out;
}

circle:hover {
  cursor: crosshair;
}

.link {
  stroke: black;
  stroke-width: 2px;
  /* stroke-opacity: 0.8; */
  fill: none;
}

.area-active {
  opacity: 1;
  transition: all 0.7s ease-in-out;
}
.area-hide {
  opacity: 0;
  transition: all 0.7s ease-in-out;
}

/* ordinal */
/* .area-one {
  fill: #3c5a99;
  opacity: 0.45;
}

.area-two {
  fill: #0f9d58;
  opacity: 0.45;
}

.area-three {
  fill: #ff9900;
  opacity: 0.45;
} */

/* all blues */
.area-one {
  fill: #51c1ed;
  opacity: 0.8;
}

.area-two {
  fill: #9dd7ef;
  opacity: 0.8;
}

.area-three {
  fill: #c8e6f3;
  opacity: 0.8;
}
</style>