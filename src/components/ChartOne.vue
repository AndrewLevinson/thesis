<template>
  <div id="chart-one">
    <div id="graph-one">
      <svg :width="svgWidth" :height="svgHeight">
        <g :transform="`translate(${margin.left}, ${margin.bottom})`" class="the-group">
          <g v-axis:x="scale" :transform="`translate(${0}, ${height})`" class="x-axis"></g>
          <g v-axis:y="scale" class="y-axis"></g>
          <g v-grid:gridLine="scale" class="grid"></g>
          <path :class="[setShown === 1 ? 'link' : 'link-hide']" :d="paths.line"></path>
          <g
            :class="[showArea ? 'area-active' : 'area-hide']"
            @select="onSelect"
            @mousemove="mouseoverArea"
          >
            <path v-show="setShown === 2" class="selector" :d="paths.selector"></path>
            <path :class="[setShown === 1 ? 'area-one' : 'area-one-100']" :d="paths.areaOne"></path>
            <path :class="[setShown === 1 ? 'area-two' : 'area-two-100']" :d="paths.areaTwo"></path>
            <path :class="[setShown === 1 ? 'area-three' : 'area-three-100']" :d="paths.areaThree"></path>
            <path class="area-four-100" :d="paths.areaFour"></path>
            <path class="area-five-100" :d="paths.areaFive"></path>
          </g>
          <g v-for="(d, i) in filteredData" :key="i">
            <circle
              v-if="setShown === 1"
              :class="[i == selected ? 'circle-active' : 'circle-up']"
              :cx="scale.x(d.year)"
              :cy="[setShown === 1 ? scale.y(d.rwpc) : scale.y(1)]"
              r="5"
              @mouseover="showLabel = !showLabel,
            myTooltip(d),select(i)"
              @mouseleave="showLabel = !showLabel, myTooltip(d), select(null)"
            ></circle>
          </g>
          <g>
            <text
              v-if="setShown === 1"
              y="-78"
              :x="svgHeight/-2"
              transform="rotate(-90)"
              text-anchor="middle"
              class="axis-title"
            >Renewable water resources (m3/year)</text>
            <text
              v-else
              y="-60"
              :x="svgHeight/-2"
              transform="rotate(-90)"
              text-anchor="middle"
              class="axis-title"
            >% of Total Water Withdrawn</text>
            <text
              :x="svgWidth - margin.right - margin.left - 5"
              :y="svgHeight - margin.bottom - margin.top -10"
              text-anchor="end"
              class="axis-title"
            >Years</text>
            <text
              v-if="setShown === 1"
              y="-32"
              x="0"
              text-anchor="left"
              class="graph-one-title"
            >Total Renewable Water Resources Per Capita (m3/inhab/year)</text>
            <text
              v-else
              y="-32"
              x="0"
              text-anchor="left"
              class="graph-one-title"
            >Percentage of Water Withdrawls by Category</text>
          </g>
        </g>
      </svg>
      <p>the current x value is {{ currentValue === null ? '' : currentValue.offsetX }}</p>
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
        areaThree: "",
        areaFour: "",
        areaFive: "",
        selector: ""
      },
      pointsLine: [],
      pointsArea: [[], [], [], [], []],
      lastHoverPoint: {},
      myFilters: {
        yearMax: 2014
      },
      showLabel: false,
      showTip: false,
      selected: null,
      selectedArea: null,
      currentValue: null,
      myCount: null,
      tooltip: null,
      showArea: false,
      domain: {
        x: {
          min: 1985,
          max: 2015
        },
        y: {
          min: 7400,
          max: 14000
        }
      },
      stackKeys: ["gpc", "spc", "dpc"],
      setShown: 1
    };
  },
  computed: {
    filteredData() {
      // let filteredData = this.data.filter(d => d.set === this.setShown);
      // return filteredData;
      // return (this.filteredData = this.data);
      return this.data.filter(d => d.set === this.setShown);
    },
    width() {
      return this.svgWidth - this.margin.left - this.margin.right;
    },
    height() {
      return this.svgHeight - this.margin.top - this.margin.bottom;
    },
    count() {
      return (this.myCount = this.filteredData.length);
    },
    scale() {
      // this.domain.x.min = Math.min(...this.filteredData.map(x => x.year));
      // this.domain.x.max = Math.max(...this.filteredData.map(x => x.year));
      // console.log(this.filteredData);
      const x = d3
        // .scaleBand()
        // .domain(this.data.map(x => x.year))
        .scaleLinear()
        .domain([
          Math.min(...this.filteredData.map(x => x.year)),
          Math.max(...this.filteredData.map(x => x.year))
        ])
        // https://github.com/d3/d3-scale/blob/master/README.md#band_rangeRound
        .rangeRound([0, this.width]);
      // .paddingInner(1);
      const y = d3
        .scaleLinear()
        .domain([this.domain.y.min, this.domain.y.max])
        // .domain([this.domainMin, Math.max(...this.data.map(y => y.rwpc)) + 500])
        .rangeRound([this.height, 0]);

      const colorScale = d3
        .scaleOrdinal()
        .range(["#4C82C3", "#F37B6D", "#6CC071"]);

      const gridLine = d3
        .scaleLinear()
        .domain([this.domain.y.min, this.domain.y.max])
        .rangeRound([this.height, 0]);

      this.scaled.x = x;
      this.scaled.y = y;
      this.scaled.color = colorScale;
      return { x, y, colorScale, gridLine };
    }
  },
  created() {
    this.loadData();
  },
  mounted() {
    // this.loadData();
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
          set: +d["set"],
          year: +d["years"],
          rwpc: +d["rwpc"],
          spc: +d["spc"],
          gpc: +d["gpc"],
          dpc: +d["dpc"],
          totalW: +d["Total in Bgal/d"],
          publicPer: +d["Public and Domestic"],
          irrigationPer: +d["Irrigation"],
          thermoPer: +d["Thremoelectric"],
          industrialPer: +d["Industrial"],
          otherPer: +d["Other"]
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
    createValueSelector: d3
      .area()
      .x(d => d.x)
      .y0(d => d.max)
      .y1(0),
    updatePath() {
      // reset line points
      this.pointsLine = [];

      // total rwpc for line
      for (const d of this.filteredData) {
        this.pointsLine.push({
          x: this.scaled.x(d.year),
          y: this.scaled.y(d.rwpc),
          max: this.height
        });
      }
      this.paths.line = this.createLine(this.pointsLine);

      // reset area points
      this.pointsArea = [[], [], [], [], []];

      // stack area
      const stack = d3.stack();
      stack.keys(this.stackKeys);
      this.stackedData = stack(this.filteredData);

      // all areas points loop
      for (let i = 0; i < this.stackedData.length; i++) {
        for (const d of this.stackedData[i]) {
          this.pointsArea[i].push({
            x: this.scaled.x(d.data.year),
            first: this.scaled.y(d[0]),
            second: this.scaled.y(d[1]),
            max: this.height
          });
        }
      }
      // add create area from points
      this.paths.areaOne = this.createArea(this.pointsArea[0]);
      this.paths.areaTwo = this.createArea(this.pointsArea[1]);
      this.paths.areaThree = this.createArea(this.pointsArea[2]);
      this.paths.areaFour = this.createArea(this.pointsArea[3]);
      this.paths.areaFive = this.createArea(this.pointsArea[4]);
    },
    mouseoverArea({ offsetX }) {
      console.log("hi");
      if (this.setShown === 2 && this.pointsArea[1].length > 0) {
        const x = offsetX - this.margin.left;
        const closestPoint = this.getClosestPoint(x);
        if (this.lastHoverPoint.index !== closestPoint.index) {
          const point = this.pointsArea[1][closestPoint.index];
          this.paths.selector = this.createValueSelector([point]);
          this.$emit("mouseOver", this.filteredData[closestPoint.index]);
          this.lastHoverPoint = closestPoint;
        }
      }
    },
    getClosestPoint(x) {
      return this.pointsArea[1]
        .map((point, index) => ({
          x: point.x,
          diff: Math.abs(point.x - x),
          index
        }))
        .reduce((memo, val) => (memo.diff < val.diff ? memo : val));
    },
    onSelect(value) {
      this.currentValue = value;
    },
    select(index) {
      this.selected = index;
    },
    selectArea(index) {
      this.selectedArea = index;
    },
    initTooltip() {
      this.tooltip = {
        element: null,
        init: function() {
          this.element = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("right", `10px`)
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
        <span class="datum">Total: ${d.rwpc}</span><br>
           <span class="datum">Surface Water: ${d.spc}</span><br>
           <span class="datum">Ground Water: ${d.gpc}</span><br>
           <span class="datum">Foreign Dependencies: ${d.dpc}</span><br>
        
        </p>`);
      } else if (!this.showLabel) {
        this.tooltip.hide();
      }
    },
    areaToolTip(d) {
      console.log("hi");
      if (this.showTip) {
        this.tooltip.show(`hi ${d.year}`);
      } else if (!this.showTip) {
        this.tooltip.hide();
      }
    },
    scrollTrigger() {
      graphScroll()
        .offset(225)
        .graph(d3.selectAll("#graph-one"))
        .container(d3.select("#chart-one"))
        .sections(d3.selectAll("#sectionsOne > div"))
        .eventId("uniqueId1")
        .on("active", i => {
          switch (i) {
            case 0:
              // offscreen so do nothing / reset with just line
              this.domain.y.min = 7000;
              this.domain.y.max = 14000;
              this.setShown = 1;
              this.showArea = false;
              this.selected = null;
              this.stackKeys = ["gpc", "spc", "dpc"];

              console.log("case 0");
              break;
            case 1:
              // highlight point on line
              this.showArea = false;
              this.domain.y.min = 7000;
              this.domain.y.max = 14000;
              this.setShown = 1;
              this.selected = 6;
              this.stackKeys = ["gpc", "spc", "dpc"];

              console.log("case 1");
              break;
            case 2:
              // update y axis to show first area per cap
              this.setShown = 1;
              this.showArea = true;
              this.domain.y.min = 0;
              this.domain.y.max = 14000;
              this.selected = null;
              this.stackKeys = ["gpc", "spc", "dpc"];

              console.log("case 2");
              break;
            case 3:
              // change dataset to 100% area
              this.setShown = 2;
              this.showArea = true;
              this.domain.y.min = 0;
              this.domain.y.max = 100;
              this.stackKeys = [
                "irrigationPer",
                "thermoPer",
                "industrialPer",
                "publicPer",
                "otherPer"
              ];

              console.log("case 3");
              break;
            default:
              console.log("none");
              break;
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
          .ticks(binding.arg === "x" ? 10 : 5)
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

.text-box p {
  margin-bottom: 0px;
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

.graph-one-title {
  font-weight: bold;
  font-size: 2.5rem;
  /* fill: #485465; */
  font-family: "IBM Plex Sans", sans-serif;
  opacity: 0.75;
  visibility: hidden;
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

.circle-group {
  opacity: 1;
  transition: all 0.7s ease-in-out;
}
.circle-group-hide {
  opacity: 0;
  transition: all 0.7s ease-in-out;
}

.selector {
  stroke: var(--main-body-type);
  stroke-width: 2px;
  stroke-dasharray: 2;
  fill: none;
  opacity: 1;
  transition: all 0s ease-in-out;
}

svg:hover {
  cursor: crosshair;
}

.link {
  stroke: black;
  stroke-width: 2px;
  /* stroke-opacity: 0.8; */
  fill: none;
  opacity: 1;
  transition: all 0.7s ease-in-out;
}

.link-hide {
  opacity: 0;
  transition: all 0.7s ease-in-out;
}

.area-active {
  opacity: 1;
  transition: all 0.7s ease-in-out;
}
.area-hide {
  opacity: 0;
  transition: all 0.7s ease-in-out;
}

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

/* ordinal */
.area-one-100 {
  fill: #3c5a99;
  opacity: 0.6;
}

.area-two-100 {
  fill: #0f9d58;
  opacity: 0.6;
}

.area-three-100 {
  fill: #ff9900;
  opacity: 0.6;
}

.area-four-100 {
  fill: coral;
  opacity: 0.6;
}

.area-five-100 {
  fill: teal;
  opacity: 0.6;
}
</style>