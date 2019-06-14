<template>
  <div id="chart-three">
    <div id="graph-three">
      <h5 class="subtitle">
        Investments and Behavioral Changes to
        <span class>Conserve Water</span>
      </h5>
      <div class="chart-three-columns">
        <div id="column-1">
          <div class="tip-band-hero third"></div>
          <h5 id="category-title">1. Pick your conservation strategy ↓</h5>
          <button @click="resetSliders" class="reset">Reset Model</button>
          <div id="category-names">
            <div>
              <h6>Behavioral Changes</h6>
              <p class="units">Gallons / Person / Day</p>
              <div v-for="(d,i) in behaviorFilter" :key="i" class="slider">
                <div @mouseover="modelTip(d)" @mouseleave="modelTip(null)" :class="d.tag">
                  <label :for="i">{{ d.name }}</label>
                  <span>
                    <!-- <span class="datum">{{ d.input }}</span> -->
                    <span class="datum">&nbsp;{{ perFormat((d.input - d.average) / d.average) }}</span>
                  </span>
                </div>

                <vue-slider
                  :key="d.name"
                  v-bind="sliderOptions"
                  :min="d.min"
                  :max="d.max"
                  v-model="d.input"
                  :value="d.default"
                  :marks="[d.min, d.average, d.max]"
                  :class="d.sliderTag"
                ></vue-slider>
              </div>
            </div>
            <div>
              <h6>Infrastructure Investments</h6>
              <p class="units">$ Billions Invested / Year</p>
              <div v-for="(d,i) in investmentFilter" :key="i" class="slider">
                <div @mouseover="modelTip(d)" @mouseleave="modelTip(null)" :class="d.tag">
                  <label :for="i">{{ d.name }}</label>
                  <span class="datum">+${{ d.input }}B</span>
                </div>

                <vue-slider
                  :key="d.name"
                  v-bind="sliderOptions"
                  :min="d.min"
                  :max="d.max"
                  v-model="d.input"
                  :value="d.default"
                  :marks="[d.min, d.average, d.max]"
                  :class="d.sliderTag"
                ></vue-slider>
              </div>
            </div>
          </div>
        </div>
        <div id="column-2">
          <div class="flex">
            <div>
              <div class="tip-band-hero third"></div>
              <h5 id="category-title">2. Compare categories by annual water savings ↓</h5>
            </div>
            <div>
              <div class="tip-band-hero third"></div>
              <h5 id="category-title">3. See total water saved ↓</h5>
            </div>
          </div>
          <svg :width="svgWidth" :height="svgHeight">
            <g :transform="`translate(${margin.left}, ${margin.bottom})`" class="the-group">
              <!-- <g v-grid:gridLines="scale" class="gridlines grid-three"></g> -->
              <!-- <g v-grid:gridLinesY="scale" class="gridlines grid-three grid-three-y"></g> -->
              <!-- <g v-axis:x="scale" :transform="`translate(${0}, ${height})`" class="x-axis"></g> -->
              <g v-axis:y="scale" :transform="`translate(${width}, ${0})`" class="y-axis"></g>

              <g
                class="metric"
                v-for="metric in circleData.children"
                :key="metric.data.name"
                :transform="`translate(${metric.x - 150}, ${metric.y})`"
              >
                <circle class="metric-circle" :r="metric.r" :fill="metric.data.color"></circle>
                <text class="metric-label">{{ metric.data.shorthand }}</text>
                <text y="22" class="metric-label-projection">{{ numFormat(metric.data.size) }}</text>
              </g>

              <g>
                <text :y="height" :x="width - 50" text-anchor="end">Billions of Gallons / Year</text>

                <text
                  id="total-label"
                  :y="scale.y(totalSum) - 6"
                  :x="width - 50"
                  text-anchor="end"
                >{{numFormat(totalSum)}}</text>
                <line
                  :x1="width - 5"
                  :y1="scale.y(totalSum)"
                  :x2="width - 110"
                  :y2="scale.y(totalSum)"
                  id="total-bar"
                ></line>
                <rect
                  @mouseover="totalTip(totalSum)"
                  @mouseleave="totalTip(null)"
                  :x="width - 40"
                  :y="scale.y(totalSum)"
                  width="35"
                  :height="height -scale.y(totalSum)"
                  rx="3"
                  ry="3"
                  class="total-bar"
                ></rect>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
    <section class="text-section" id="sectionsThree">
      <div class="text-box">
        <h5 class="box-title">Behavioral Changes vs. Direct Investments</h5>
        <p>This scenario model helps visualize the massive impact that seemingly small behavioral changes have in aggregate when compared against massive spending efforts.</p>
        <br>
        <p>Try adjusting the sliders to the left to set your own water conservation strategy.</p>
      </div>
    </section>
  </div>
</template>

<script>
import * as d3 from "d3";
import { graphScroll } from "graph-scroll";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/material.css";

export default {
  name: "chart-three",
  components: { VueSlider },
  data() {
    return {
      svgWidth: window.innerWidth * 0.725,
      svgHeight: window.innerHeight * 0.825,
      margin: { top: 40, left: 0, bottom: 20, right: 70 },
      policyData: [{}],
      totalSaved: {
        name: "Total Water Conserved",
        cat: "",
        default: 1084,
        input: 1084
      },
      totalSum: 0,
      sliderOptions: {
        tooltipPlacement: "bottom",
        contained: true
      }
    };
  },
  watch: {
    // height: "total"
  },
  computed: {
    width() {
      return this.svgWidth - this.margin.left - this.margin.right;
    },
    height() {
      return this.svgHeight - this.margin.top - this.margin.bottom;
    },
    numFormat() {
      return d3.format(",d");
    },
    perFormat() {
      return d3.format(".0%");
    },
    behaviorFilter() {
      return this.policyData.filter(d => d.cat === "behavior");
    },
    investmentFilter() {
      return this.policyData.filter(d => d.cat === "investment");
    },

    scale() {
      // this.domain.x.min = Math.min(...this.filteredData.map(x => x.year));
      // this.domain.x.max = Math.max(...this.filteredData.map(x => x.year));
      // console.log(this.filteredData);
      const x = d3
        // .scaleBand()
        // .domain(this.data.map(x => x.year))
        //  Math.max(this.totalSum, ...this.policyData.map(x => x.projected))
        .scaleLinear()
        .domain([0, Math.max(20000, this.totalSum)])
        // https://github.com/d3/d3-scale/blob/master/README.md#band_rangeRound
        .rangeRound([0, this.width]);
      // .paddingInner(1);

      const y = d3
        .scaleLinear()
        .domain([0, Math.max(20000, this.totalSum)])
        .rangeRound([this.height, 0]);

      // const y = d3
      //   .scaleBand()
      //   .domain(this.policyData.map(y => y.name))
      //   .rangeRound([0, this.height])
      //   .padding(0.25);

      const gridLines = d3
        .scaleLinear()
        .domain([0, Math.max(20000, this.totalSum)])
        .rangeRound([0, this.width]);

      const gridLinesY = d3
        .scaleLinear()
        .domain([0, 1000])
        .rangeRound([0, this.height]);

      return { x, y, gridLines, gridLinesY };
    },

    transformedData() {
      return {
        name: "Top Level",
        children: this.policyData.map(metric => ({
          ...metric,
          size: this.conversions(metric.input, metric.sliderTag),
          parent: "Top Level"
        }))
      };
    },
    circleData() {
      const rootHierarchy = d3
        .hierarchy(this.transformedData)
        .sum(d => d.size)
        .sort((a, b) => {
          return b.value - a.value;
        });

      return d3
        .pack()
        .size([this.width, this.height])
        .padding(10)(rootHierarchy);
    }
  },
  created() {
    this.loadData();
  },
  mounted() {
    this.scrollTrigger();
    this.total();
    this.initTooltip();
  },
  updated() {
    this.total();
  },
  methods: {
    loadData() {
      d3.csv("data/clean/policy.csv", d => {
        return {
          name: d["name"],
          shorthand: d["shorthand"],
          description: d["description"],
          calc: d["calc"],
          tag: d["tag"],
          sliderTag: d["slider-tag"],
          cat: d["cat"],
          default: +d["default"],
          input: +d["input"],
          average: +d["average"],
          min: +d["min"],
          max: +d["max"],
          color: d["color"]
        };
      }).then(d => {
        return (this.policyData = d);
        // console.log(d);
      });
    },
    total() {
      this.totalSum = d3.sum(this.circleData.children, d => {
        // return this.conversions(d.input, 1);
        return d.value;
      });
    },
    conversions(d, i) {
      if (i === "direct") {
        let directAvg = 123;
        let percentChage = (d - this.policyData[0].average) / directAvg;
        // 14,689,644,000,000;
        let annualWaterPerCap = directAvg * 365 * 327200000;
        return ((percentChage * annualWaterPerCap) / 1000000000) * -1;
      } else if (i === "virtual") {
        let virtualAvg = 861;
        let percentChage = (d - this.policyData[1].average) / virtualAvg;
        // 14,689,644,000,000;
        let annualWaterPerCap = virtualAvg * 365 * 327200000;
        return ((percentChage * annualWaterPerCap) / 1000000000) * -1;
      } else if (i === "smart") {
        // for every dollar spend on irrigation we save 135 gallons
        return d * 135;
      } else if (i === "infra") {
        // 1 billion spent = 4.64 saved per year over 20 years
        return d * 92.6788;
      } else {
        return d;
      }
    },
    resetSliders() {
      return this.policyData.map(x => (x.input = x.default));
    },
    initTooltip() {
      this.tooltip = {
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
            .style(
              "left",
              `${
                event.clientX > window.innerWidth * 0.5
                  ? event.clientX - 340
                  : event.clientX + 10
              }px`
            )
            .style(
              "top",
              `${
                event.clientY > window.innerHeight * 0.8
                  ? event.clientY - 160
                  : event.clientY + 10
              }px`
            )

            .style("opacity", 0.925);
        },
        move: function() {
          this.element
            .transition()
            .duration(30)
            .style(
              "left",
              `${
                event.clientX > window.innerWidth * 0.5
                  ? event.clientX - 340
                  : event.clientX + 10
              }px`
            )
            .style(
              "top",
              `${
                event.clientY > window.innerHeight * 0.8
                  ? event.clientY - 160
                  : event.clientY + 10
              }px`
            )
            .style("opacity", 0.9);
        },
        hide: function() {
          this.element
            .transition()
            .duration(500)
            .style("opacity", 0)
            .delay(100);
        }
      };
      this.tooltip.init();
    },
    modelTip(d) {
      console.log(d);
      if (d != null) {
        this.tooltip.show(`
        <div class="active-tip"></div>
        <h5 class="datum" style="margin-bottom: 0.5rem">${d.name}</h5>
        <p>${d.description}</p>
        <h6 class="sub-head-tip" style="margin-top: 0.5rem">Calculation</h6>
           <p style="margin-bottom: 0.25rem">${d.calc}</p>
        `);

        document.documentElement.style.setProperty("--active-tip", d.color);
      } else {
        this.tooltip.hide();
      }
    },
    totalTip(d) {
      if (d != null) {
        this.tooltip.show(`
        <div class="active-tip"></div>
        <h5 class="datum" style="margin-bottom: 0.5rem">Total Water Saved</h5>
        <p class="datum special">${this.numFormat(
          this.totalSum
        )} Billion of Gallons / Year</p>
        <h6 class="sub-head-tip" style="margin-top: 0.5rem">Perspective</h6>
           <p style="margin-bottom: 0.25rem">That's enough water for <span class="datum">${this.numFormat(
             (this.totalSum / 44895) * 1000000000
           )}</span> Americans' direct water needs every year.</p>
        `);

        document.documentElement.style.setProperty(
          "--active-tip",
          "var(--special)"
        );
      } else {
        this.tooltip.hide();
      }
    },
    scrollTrigger() {
      graphScroll()
        .offset(225)
        .graph(d3.selectAll("#graph-three svg"))
        .container(d3.select("#chart-three"))
        .sections(d3.selectAll("#sectionsThree > div"))
        .eventId("uniqueId3")
        .on("active", i => {
          console.log("case ", i);
          switch (i) {
            case 0:
              // offscreen so do nothing / reset

              break;
            case 1:
              break;
            default:
              // defult
              console.log("im the default for chart 3");
              break;
          }
        });
    }
  },
  directives: {
    axis(el, binding) {
      const axis = binding.arg; // x or y

      const axisMethod = { x: "axisBottom", y: "axisRight" }[axis];
      // The line below assigns the x or y function of the scale object
      const methodArg = binding.value[axis];

      // d3.axisBottom(scale.x)
      d3.select(el).call(d3[axisMethod](methodArg).ticks(5));
    },
    grid(el, binding) {
      const axis = binding.arg; // x or y
      const axisMethod = { gridLines: "axisTop", gridLinesY: "axisLeft" }[axis];
      // The line below assigns the x or y function of the scale object
      const methodArg = binding.value[axis];
      // d3.axisBottom(scale.x)
      d3.select(el).call(
        d3[axisMethod](methodArg)
          .tickFormat("")
          .tickSize(
            binding.arg == "gridLines"
              ? -window.innerHeight * 0.66
              : -window.innerWidth * 0.4865
          )
          .ticks(binding.arg == "gridLines" ? 0 : 0)
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
#sectionsThree > div {
  z-index: 999;
  opacity: 0.3;
}

#sectionsThree div.graph-scroll-active {
  z-index: 999;
  opacity: 1;
}

/* chart */
#chart-three {
  width: 95%;
  margin: 0 auto;
}

.chart-three-columns {
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
  /* margin-top: 2rem; */
}

#graph-three {
  position: sticky;
  position: -webkit-sticky;
  top: 30px;
}

/* metric circle packing */
.metric {
  transition: all 0.3s ease-in-out;
  text-anchor: middle;
}

.metric-circle {
  transition: all 0.3s ease-in-out;
  opacity: 0.75;
  stroke: #000;
  stroke-opacity: 0.1;
}

/* .metric-circle:hover {
  opacity: 1;
  cursor: pointer;
  stroke-opacity: 0.3;
} */

.metric-label {
  /* fill: #fff; */
  font-weight: 900;
  /* text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); */
}
.metric-label-projection {
  /* fill: #fff; */
  font-weight: 400;
  /* text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); */
}

/* sliders */
#column-1 {
  /* text-align: right; */
  width: 22.5%;
  /* padding-top: 1rem; */
}

#column-1 span {
  font-size: 97.5%;
}

#category-names {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: flex-end; */
  margin: 2rem 0rem 2.5rem 0rem;
  font-size: 90%;
  height: 70%;
  /* padding-left: 1rem; */
}

#category-names div h6 {
  text-transform: uppercase;
  font-variant: small-caps;
  /* border-bottom: 1px dashed black; */
  margin-bottom: 0.75rem;
}

#category-names div:last-of-type h6 {
  margin-top: 3rem;
}

.units {
  margin-top: -1rem;
  font-size: 95%;
  opacity: 0.75;
}

.flex {
  display: flex;
  justify-content: space-between;
}

.flex > div {
  /* width: 70%; */
  margin-left: 5rem;
}
.flex div:last-of-type {
  width: 20%;
  margin-right: 7rem;
}

#category-title {
  /* border-right: 3px solid rgba(0, 0, 0, 0.5); */
  /* padding-right: 2rem; */
  margin: 0;
  font-size: 99%;
}

.third {
  width: 50px !important;
}

.slider {
  font-weight: 600;
  margin-bottom: 4rem;
}
.slider div {
  width: 100%;
  max-width: 225px;
  margin-top: 0.5rem;
  /* padding-left: 2rem; */
}

#slider-total-label {
  border-top: 3px solid black;
  font-weight: 700;
  margin-bottom: -0.75rem;
}
#unit-label {
  font-weight: 400;
  margin-top: -1.25rem;
  font-family: inherit;
  /* opacity: 0.1; */
}

.model:hover {
  filter: drop-shadow(0px 2px 4px rgba(59, 59, 61, 0.15));
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease-in-out;
}

label:hover {
  cursor: pointer;
}

.reset {
  /* fill: lightcoral; */
  /* background-color: rgba(240, 128, 128, 0.75); */
  /* border: 1px solid white; */
  /* border-bottom: 1px dashed #f08080;
  width: 100px; */
  font-size: 92.5%;
  color: var(--reset);
  border: none;
  background: transparent;
  margin-top: 1rem;
  padding: 0rem;
  transition: all 0.3s ease-in;
  font-weight: 400;
  /* border-bottom: 1px dashed var(--reset); */
  border-bottom: 1px dashed transparent;
}

.reset:hover {
  color: var(--emphasis);
  cursor: pointer;
  border-bottom: 1px dashed var(--emphasis);

  transition: all 0.3s ease-in;
}

.reset::after {
  content: url(".././assets/icons/refresh.svg");
  text-align: right;
  width: 12px;
  float: right;
  margin-top: 0.0175rem;
  margin-left: 0.5rem;
  white-space: nowrap;
}

.reset:hover::after {
  content: url(".././assets/icons/refresh-hover.svg");
  transition: all 0.3s ease-in;
}

/* plots */
div,
rect,
path,
text,
g,
circle,
line {
  transition: all 0.3s ease-in-out;
}
#conservation-line {
  /* stroke: var(--emphasis); */
  stroke: #000;
  stroke-width: 3;
}

.output-lines {
  /* stroke: var(--emphasis); */
  stroke: #000;
  opacity: 0.75;
  stroke-width: 1.75;
}
#arrow {
  /* fill: var(--emphasis); */
  fill: #000;
  stroke: none;
}

#underline {
  /* stroke: var(--emphasis); */
  stroke: #707070;
  stroke-width: 1;
  opacity: 0.7;
  stroke-dasharray: 4;
}
.demand-circle {
  stroke-width: 2;
  stroke: blue;
  /* fill: rgba(0, 0, 0, 0.15); */
  fill: #fff;
}

.supply-circle {
  stroke-width: 2;
  stroke: var(--link-color);
  fill: #fff;
}

.total-bar {
  stroke-width: 1;
  stroke-opacity: 0.5;
  stroke: #000;
  fill: var(--special);
  opacity: 0.75;
}

.total-bar:hover {
  cursor: pointer;
  opacity: 1;
  stroke-opacity: 1;
}

#total-label {
  font-weight: bold;
}

#total-bar {
  /* stroke: var(--emphasis); */
  stroke: #000;
  stroke-width: 1;
}
</style>
