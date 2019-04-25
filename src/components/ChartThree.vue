<template>
  <div id="chart-three">
    <div id="graph-three">
      <!-- <h3 class="main-header">Delaying Day Zero</h3> -->
      <h5 class="subtitle">Policies and Investments to Conserve Water</h5>
      <div class="chart-three-columns">
        <div id="category-names">
          <div v-for="(d,i) in policyData" :key="i" class="slider">
            <label :for="i">{{ d.name }}</label>
            <br>
            <!-- <p id="slider-value">Value: {{ policyData[7].current }}</p> -->
            <input
              v-if="i != 0"
              :name="i"
              type="range"
              min="0"
              :max="d.current * 10"
              value="0"
              v-model="d.projected"
            >
            <p id="unit-label" v-else>Mega gallons water saved</p>
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
            <g v-axis:x="scale" class="x-axis"></g>
            <g v-axis:y="scale" class="y-axis"></g>
            <g v-grid:gridLines="scale" class="gridlines grid-three"></g>
            <g v-grid:gridLinesY="scale" class="gridlines grid-three grid-three-y"></g>

            <!-- <line x1="0" :y1="(height * 0.125)" :x2="width" :y2="(height * 0.125)" id="underline"></line> -->

            <g v-for="(d, i) in policyData" :key="i">
              <circle
                v-if="i != 0"
                :cx="scale.x(d.projected) + 5"
                :cy="scale.y(d.name) + (height * 0.03)+ 2.5"
                r="5"
                :class="[d.cat == 'demand' ? 'demand-circle' : 'supply-circle']"
              ></circle>
              <circle
                v-else
                :cx="scale.x(totalSum) + 15"
                :cy="scale.y(d.name) + .5"
                r="6"
                class="total-conserve"
              ></circle>

              <line
                v-if="i == 0"
                x1="0"
                :y1="scale.y(d.name)  "
                :x2="[i != 0 ? scale.x(d.projected) : scale.x(totalSum)]"
                :y2="scale.y(d.name) "
                marker-end="url(#arrow)"
                id="conservation-line"
              ></line>
            </g>
            <g>
              <!-- <text
                :x="svgWidth - margin.right - margin.left - 5"
                :y="svgHeight - margin.bottom - margin.top - 10"
                text-anchor="end"
                class="axis-title"
              >Mega gallons/Year Saved</text>-->
              <text
                y="-50"
                x="0"
                text-anchor="left"
                id="graph-three-title"
              >Policies & Investments to Extend Water Supply</text>
            </g>
          </g>
        </svg>
        <div id="chart-three-explainer">
          <h5>Model Explaination</h5>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut placeat, quo, cupiditate minus, est animi voluptatum nisi quas minima ea voluptatem optio omnis autem. Ipsa iure consequuntur officia maxime obcaecati. Exercitationem, error nulla amet quaerat pariatur accusamus vel esse debitis blanditiis et minus adipisci doloribus quidem delectus earum qui architecto.</p>
        </div>
      </div>
    </div>
    <section class="text-section" id="sectionsThree">
      <div class="text-box">
        <h5 class="box-title">Current Scenario</h5>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit facilis dicta recusandae sunt ullam, optio saepe perspiciatis officia quisquam nulla, ab quibusdam, molestias officiis maxime voluptatem id hic molestiae aliquid corrupti odio et illum? Inventore earum magnam distinctio qui praesentium! Quas id necessitatibus atque reprehenderit dicta expedita, ex nihil autem.</p>
      </div>
      <div class="text-box">
        <h5 class="box-title">Try Your Own Projection</h5>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus perferendis corrupti debitis provident non nulla voluptates consequuntur consectetur, accusantium maxime possimus voluptas eveniet earum laborum, ducimus quod. Voluptatum earum eum voluptates magni ipsa ut molestiae eligendi quidem a asperiores necessitatibus alias unde illum sapiente ex corporis placeat, adipisci atque veritatis.</p>
      </div>
    </section>
  </div>
</template>

<script>
import * as d3 from "d3";
import { graphScroll } from "graph-scroll";

export default {
  name: "chart-three",
  data() {
    return {
      svgWidth: window.innerWidth * 0.5,
      svgHeight: window.innerHeight * 0.8,
      margin: { top: 0, left: 10, bottom: 0, right: 10 },
      policyData: [
        {
          name: "Total Water Conserved",
          cat: "",
          current: 0,
          projected: 0
        },
        {
          name: "Personal Conservation %",
          cat: "demand",
          current: 10,
          projected: 10
        },
        {
          name: "Water as Ingredient Reduction %",
          cat: "demand",
          current: 130,
          projected: 130
        },
        {
          name: "Pricing: Drinking Water",
          cat: "demand",
          current: 80,
          projected: 80
        },
        {
          name: "Pricing: Industry & Irrigation",
          cat: "demand",
          current: 10,
          projected: 10
        },
        {
          name: "Infrastructure: Drinking Water",
          cat: "investment",
          current: 500,
          projected: 500
        },
        {
          name: "Infrastructure: Collection & Storage",
          cat: "investment",
          current: 200,
          projected: 200
        },
        {
          name: "Infrastructure: Wastewater",
          cat: "investment",
          current: 250,
          projected: 250
        }
      ],
      totalSum: 0
    };
  },
  watch: {
    scale: "total"
  },
  computed: {
    width() {
      return this.svgWidth - this.margin.left - this.margin.right;
    },
    height() {
      return this.svgHeight - this.margin.top - this.margin.bottom;
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
        .domain([Math.min(...this.policyData.map(x => x.projected)), 10000])
        // https://github.com/d3/d3-scale/blob/master/README.md#band_rangeRound
        .rangeRound([0, this.width]);
      // .paddingInner(1);
      const y = d3
        .scaleBand()
        .domain(this.policyData.map(y => y.name))
        .rangeRound([0, this.height])
        .padding(0.4);

      const gridLines = d3
        .scaleLinear()
        .domain([0, 1000])
        .rangeRound([0, this.width]);

      const gridLinesY = d3
        .scaleLinear()
        .domain([0, 1000])
        .rangeRound([0, this.height]);

      return { x, y, gridLines, gridLinesY };
    }
  },
  created() {
    // this.loadData();
  },
  mounted() {
    this.scrollTrigger();
    this.total();
  },
  methods: {
    // loadData() {
    //   d3.csv("data/clean/policy.csv", d => {
    //     return {
    //       name: d["name"],
    //       cat: d["cat"],
    //       current: +d["current"],
    //       projected: +d["projected"]
    //     };
    //   }).then(d => {
    //     return (this.policyData = d);
    //     // console.log(d);
    //   });
    // },
    total() {
      this.totalSum = d3.sum(this.policyData, d => {
        return d.projected;
      });
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

      const axisMethod = { x: "axisTop", y: "axisLeft" }[axis];
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
          .ticks(binding.arg == "gridLines" ? 5 : 15)
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
  margin-top: 1.5rem;
}

svg {
  width: 55%;
}

#chart-three-explainer {
  width: 22.5%;
  margin: 10rem 0 auto 2.5%;
  padding: 1.5rem;
  border: 1px dashed var(--emphasis);
}

#graph-three-title {
  font-weight: bold;
  font-size: 2.5rem;
  fill: #485465;
  /* opacity: 0.8; */
  visibility: hidden;
}
#graph-three {
  position: sticky;
  position: -webkit-sticky;
  top: 40px;
}

/* sliders */
#category-names {
  width: 20%;
  display: flex;
  flex-direction: column;
  /* width: 80%; */
  /* height: 100%; */
  text-align: right;
  justify-content: space-between;
  margin-top: 1.5rem;
  margin-bottom: 3.5rem;
  margin-right: 2rem;
  font-size: 90%;
  font-weight: 400;
}

#category-names:first-child {
  /* margin-top: 5rem; */
}

.slider:first-of-type {
  /* margin-top: 5.75rem; */
  font-weight: 800;
  /* border-bottom: 2px dashed var(--emphasis); */
}

#unit-label {
  font-weight: 400;
  margin-top: 0.25rem;
  font-family: inherit;
}

.slider:first-of-type input {
  opacity: 0.1;
  visibility: hidden;
}

/* plots */
#conservation-line {
  /* stroke: var(--emphasis); */
  stroke: #000;
  stroke-width: 3;
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
  /* stroke-dasharray: 4; */
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
