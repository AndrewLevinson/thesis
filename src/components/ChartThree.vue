<template>
  <div id="chart-three">
    <div id="graph-three">
      <!-- <h3 class="main-header">Delaying Day Zero</h3> -->
      <h5 class="subtitle">
        Investments and Behavioral Changes to
        <span class>Conserve Water</span>
      </h5>
      <!-- <p style="margin-top: -1rem; font-weight: 500; opacity: 0.7;">
        Discover the best way to approach
        <span class="blue datum">Water Conservation</span>
      </p>-->
      <!-- <div id="chart-three-explainer">
        <h5>Model Explaination</h5>
        <p>This scenario model helps visualize the massive impact that seemingly small behavioral changes have in aggregate when compared against massive spending efforts. By reducing our virtual water footprint, alongside major investments in infrastructure and irrigation technologies, we can help mitigate shortage conditions in the west, the drinking water impact of floods in the midwest, the depletion intensity of our below ground aquifers by ultimately allowing us to do more with less water.</p>
      </div>-->
      <div class="chart-three-columns">
        <div id="column-1">
          <div class="tip-band-hero third"></div>
          <h5 id="category-title">1. Pick Your Conservation Strategy ↓</h5>
          <button @click="resetSliders" class="reset">Reset Model</button>
          <div id="category-names">
            <div>
              <h6>Behavioral Changes</h6>
              <p class="units">Gallons / Person / Day</p>
              <div v-for="(d,i) in behaviorFilter" :key="i" class="slider">
                <label :for="i" :class="d.tag">{{ d.name }}</label>
                <!-- <br> -->
                <!-- <p id="slider-value">Value: {{ policyData[7].current }}</p> -->
                <vue-slider
                  :key="d.name"
                  v-bind="sliderOptions"
                  :min="d.min"
                  :max="d.max"
                  v-model="d.input"
                  :value="d.default"
                  :marks="[d.min, d.default, d.max]"
                  :class="d.sliderTag"
                ></vue-slider>
              </div>
            </div>
            <div>
              <h6>Investments</h6>
              <p class="units">Dollars Invested</p>
              <div v-for="(d,i) in investmentFilter" :key="i" class="slider">
                <label :for="i" :class="d.tag">{{ d.name }}</label>
                <!-- <br> -->
                <!-- <p id="slider-value">Value: {{ policyData[7].current }}</p> -->
                <vue-slider
                  :key="d.name"
                  v-bind="sliderOptions"
                  :min="d.min"
                  :max="d.max"
                  v-model="d.input"
                  :value="d.default"
                  :marks="[d.min, d.default, d.max]"
                  :class="d.sliderTag"
                ></vue-slider>
              </div>
            </div>
            <!-- <div id="slider-total-label">
            <p>Total Water Conserved (Bgal/year)</p>
            <p id="unit-label">B/Gal</p>
            </div>-->
          </div>
        </div>
        <div id="column-2">
          <div class="flex">
            <div>
              <div class="tip-band-hero third"></div>
              <h5 id="category-title">2. Compare which inputs produce the best results ↓</h5>
              <!-- <p>You saved 861 Billions of Gallons per Year by reducing our virtual water footprint by just 2%</p> -->
            </div>
            <div>
              <div class="tip-band-hero third"></div>
              <h5 id="category-title">3. See Total Water Saved ↓</h5>
              <!-- <p>You saved 4,500 Billions of Gallons per Year by reducing reducing overall consumption by 18% and spending $204 billion in efficiency investments</p> -->
            </div>
          </div>
          <svg :width="svgWidth" :height="svgHeight">
            <defs>
              <!-- arrowhead marker definition -->
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z"></path>
              </marker>
            </defs>
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
                <text y="22" class="metric-label-projection">{{ metric.data.input }}</text>
              </g>

              <g v-for="(d, i) in totalSaved" :key="i">
                <circle
                  :cy="75/2 + scale.y(totalSum) - 15"
                  :cx="width - 15"
                  r="6"
                  class="total-conserve"
                ></circle>
                <text
                  :y="75/2 + scale.y(totalSum) - 12"
                  :x="width - 35"
                  text-anchor="end"
                >{{numFormat(totalSum)}}</text>
                <text :y="0" :x="width - 20" text-anchor="end">Billions of Gallons / Year</text>
                <line
                  :x1="width- 15"
                  :y1="height - 75"
                  :x2="width - 15"
                  :y2="75/2 + scale.y(totalSum)"
                  marker-end="url(#arrow)"
                  id="conservation-line"
                ></line>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <!-- <Water/> -->
    </div>
    <section class="text-section" id="sectionsThree">
      <div class="text-box">
        <h5 class="box-title">Conserve vs. Invest?</h5>
        <p>This scenario model helps visualize the massive impact that seemingly small behavioral changes have in aggregate when compared against massive spending efforts. By reducing our virtual water footprint, alongside major investments in infrastructure and irrigation technologies, we can help mitigate shortage conditions in the west, the drinking water impact of floods in the midwest, the depletion intensity of our below ground aquifers by ultimately allowing us to do more with less water.</p>
      </div>
      <div class="text-box">
        <h5 class="box-title">Try Your Own Strategy</h5>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus perferendis corrupti debitis provident non nulla voluptates consequuntur consectetur, accusantium maxime possimus voluptas eveniet earum laborum, ducimus quod. Voluptatum earum eum voluptates magni ipsa ut molestiae eligendi quidem a asperiores necessitatibus alias unde illum sapiente ex corporis placeat, adipisci atque veritatis.</p>
      </div>
    </section>
  </div>
</template>

<script>
import * as d3 from "d3";
import { hierarchy, pack } from "d3-hierarchy";
import { graphScroll } from "graph-scroll";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/material.css";
import Water from "./Water.vue";

export default {
  name: "chart-three",
  components: { VueSlider, Water },
  data() {
    return {
      svgWidth: window.innerWidth * 0.725,
      svgHeight: window.innerHeight * 0.85,
      margin: { top: 10, left: 0, bottom: 20, right: 70 },
      policyDataOld: [
        {
          name: "Personal Conservation %",
          cat: "demand",
          current: 0,
          projected: 0
        },
        {
          name: "Water as Ingredient Reduction %",
          cat: "demand",
          current: 0,
          projected: 0
        },
        {
          name: "Pricing: Drinking Water %",
          cat: "demand",
          current: 0,
          projected: 0
        },
        {
          name: "Pricing: Industry & Irrigation %",
          cat: "demand",
          current: 0,
          projected: 0
        },
        {
          name: "Infrastructure: Drinking Water %",
          cat: "investment",
          current: 1500,
          projected: 1500
        },
        {
          name: "Infrastructure: Collection & Storage $",
          cat: "investment",
          current: 2000,
          projected: 2000
        },
        {
          name: "Infrastructure: Wastewater $",
          cat: "investment",
          current: 500,
          projected: 500
        }
      ],
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
        .rangeRound([this.height - 75, 0]);

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
          size: metric.input,
          parent: "Top Level"
        }))
      };
    },
    circleData() {
      // Generate a D3 hierarchy
      const rootHierarchy = hierarchy(this.transformedData)
        .sum(d => d.size)
        .sort((a, b) => {
          return b.value - a.value;
        });

      // Pack the circles inside the viewbox
      return pack()
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
          tag: d["tag"],
          sliderTag: d["slider-tag"],
          cat: d["cat"],
          input: +d["input"],
          default: +d["default"],
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
      this.totalSum = d3.sum(this.policyData, d => {
        return this.conversions(d.input, 1);
      });
    },
    conversions(d, name) {
      if (name === 1) {
        console.log("yup");
        return d * 4.46;
      } else {
        console.log("nope");
        return d;
      }
    },
    resetSliders() {
      return this.policyData.map(x => (x.input = x.default));
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

/* header */

/* chart */
#chart-three {
  width: 95%;
  margin: 0 auto;
}

.chart-three-columns {
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
  /* margin-top: 2rem; */
}

/* .chart-three-columns > div {
  border-bottom: 1px solid black;
} */

svg {
  /* width: 80%; */
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

.metric-circle:hover {
  opacity: 1;
  cursor: pointer;
  stroke-opacity: 0.5;
}

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
  font-size: 90%;
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
  max-width: 180px;
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

.total-conserve {
  stroke-width: 2;
  stroke: #000;
  fill: var(--special);
}
</style>
