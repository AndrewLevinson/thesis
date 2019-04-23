<template>
  <div id="chart-three">
    <div id="graph-three">
      <div v-if="policyData" id="sliders">
        <div id="slider-one">
          <label for="five">Drinking Water Infrastructure</label>
          <br>
          <p id="slider-value">Value: {{ policyData[5].current }}</p>
          <input
            name="five"
            type="range"
            min="0"
            max="1000"
            value="500"
            v-model="policyData[5].current"
          >
        </div>
        <div id="slider-two">
          <label for="six">Collection and Storage Infrastructure</label>
          <br>
          <p id="slider-value">Value: {{ policyData[6].current }}</p>
          <input
            name="six"
            type="range"
            min="0"
            max="1000"
            value="200"
            v-model="policyData[6].current"
          >
        </div>
      </div>
      <div class="two-column">
        <svg :width="svgWidth" :height="svgHeight">
          <g :transform="`translate(${margin.left}, ${margin.bottom})`" class="the-group">
            <g v-axis:x="scale" class="x-axis"></g>
            <g v-axis:y="scale" class="y-axis"></g>
            <g v-grid:gridLines="scale" class="gridlines"></g>

            <g v-for="(d, i) in policyData" :key="i">
              <circle :cx="scale.x(d.current)" :cy="scale.y(d.name) + (height * 0.035)" r="5"></circle>
              <rect
                x="0"
                :y="scale.y(d.name)  + (height * 0.035)"
                :width="scale.x(d.current)"
                :height="5"
              ></rect>
            </g>
            <g>
              <text
                :x="svgWidth - margin.right - margin.left - 5"
                :y="svgHeight - margin.bottom - margin.top -30"
                text-anchor="end"
                class="axis-title"
              >Megagallons/Year</text>
              <text
                y="-32"
                x="0"
                text-anchor="left"
                id="graph-three-title"
              >Policies & Investments to Extend Water Supply</text>
            </g>
          </g>
        </svg>
        <div id="chart-three-explainer">
          <h5>Header</h5>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut placeat, quo, cupiditate minus, est animi voluptatum nisi quas minima ea voluptatem optio omnis autem. Ipsa iure consequuntur officia maxime obcaecati. Exercitationem, error nulla amet quaerat pariatur accusamus vel esse debitis blanditiis et minus adipisci doloribus quidem delectus earum qui architecto.</p>
        </div>
      </div>
    </div>
    <section class="text-section" id="sectionsThree">
      <div class="text-box">
        <h5 class="box-title">Scenario 1</h5>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit facilis dicta recusandae sunt ullam, optio saepe perspiciatis officia quisquam nulla, ab quibusdam, molestias officiis maxime voluptatem id hic molestiae aliquid corrupti odio et illum? Inventore earum magnam distinctio qui praesentium! Quas id necessitatibus atque reprehenderit dicta expedita, ex nihil autem.</p>
      </div>
      <div class="text-box">
        <h5 class="box-title">Try Your Own</h5>
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
      svgWidth: window.innerWidth * 0.75,
      svgHeight: window.innerHeight * 0.75,
      margin: { top: 50, left: 300, bottom: 50, right: 25 },
      policyData: [
        { name: "conserve", cat: "demand", current: 0, projected: 0 },
        { name: "ingredient", cat: "demand", current: 0, projected: 0 },
        { name: "consumer pricing", cat: "demand", current: 0, projected: 0 },
        { name: "industry pricing", cat: "demand", current: 0, projected: 0 },
        { name: "irrigation", cat: "demand", current: 0, projected: 0 },
        {
          name: "drinking water infrastructure",
          cat: "investment",
          current: 500,
          projected: 0
        },
        {
          name: "collection and storage infrastructure",
          cat: "investment",
          current: 200,
          projected: 0
        },
        {
          name: "wastewater improvements",
          cat: "investment",
          current: 250,
          projected: 0
        }
      ]
    };
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
        .scaleLinear()
        .domain([
          Math.min(...this.policyData.map(x => x.current)),
          Math.max(...this.policyData.map(x => x.current))
        ])
        // https://github.com/d3/d3-scale/blob/master/README.md#band_rangeRound
        .rangeRound([0, this.width]);
      // .paddingInner(1);
      const y = d3
        .scaleBand()
        .domain(this.policyData.map(y => y.name))
        .rangeRound([this.height, 0])
        .paddingInner(0.5);

      const gridLines = d3
        .scaleLinear()
        .domain([0, Math.max(...this.policyData.map(x => x.current))])
        .rangeRound([0, this.width]);

      return { x, y, gridLines };
    }
  },
  created() {
    this.loadData();
  },
  mounted() {
    this.scrollTrigger();
  },
  methods: {
    loadData() {
      d3.csv("data/clean/policy.csv", d => {
        return {
          name: d["name"],
          cat: d["cat"],
          current: +d["current"],
          projected: +d["projected"]
        };
      }).then(d => {
        return (this.policyData = d);
        // console.log(d);
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
      const axisMethod = { gridLines: "axisTop" }[axis];
      // The line below assigns the x or y function of the scale object
      const methodArg = binding.value[axis];
      // d3.axisBottom(scale.x)
      d3.select(el).call(
        d3[axisMethod](methodArg)
          .tickFormat("")
          .tickSize(-window.innerHeight * 0.8)
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

.two-column {
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
}

svg {
  width: 80%;
}

#chart-three-explainer {
  width: 20%;
}

#graph-three-title {
  font-weight: bold;
  font-size: 2.5rem;
  fill: #485465;
  /* opacity: 0.8; */
}
#graph-three {
  position: sticky;
  position: -webkit-sticky;
  top: 40px;
}

/* sliders */
#sliders {
  display: flex;
  width: 50%;
  justify-content: space-between;
}
</style>
