<template>
  <div id="mini-chart">
    <h6 class="mini-subtitle">Odds of Shortage Condition at Lake Mead</h6>
    <!-- <span class="area-lower-basin tag tag-mini">Lower Basin</span> -->
    <svg :width="svgWidth" :height="svgHeight">
      <g :transform="`translate(${margin.left}, ${margin.bottom})`" class="the-group">
        <g v-grid:gridLine="scale" class="grid"></g>
        <g v-axis:x="scale" :transform="`translate(${0}, ${height})`" class="x-axis"></g>
        <g v-axis:y="scale" class="y-axis"></g>
        <path class="link" :d="paths.line"></path>

        <g>
          <!-- <rect x="-5" y="-15" width="100" height="30" fill="#191A1A"></rect> -->
          <text y="5" x="7" fill="#fff" class="axis-title">{{ yLabel }}</text>
        </g>
      </g>
    </svg>
    <caption class="chart-caption">
      Source: US Bureau of Reclamation
      <a
        href="https://www.usbr.gov/lc/region/g4000/riverops/crss-5year-projections.html"
        target="_blank"
      >Projections</a>
    </caption>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "mini-chart",

  data() {
    return {
      graphTitle: "Odds of Shortage Condition in the Lower Basin (Lake Mead)",
      yLabel: "% Odds",
      svgWidth: 340,
      svgHeight: 350,
      margin: { top: 20, left: 35, bottom: 15, right: 25 },
      scaled: {
        x: null,
        y: null
      },
      paths: {
        line: ""
      },
      pointsLine: [],
      domain: {
        x: {
          min: 2019,
          max: 2023
        },
        y: {
          min: 0,
          max: 100
        }
      },
      data: [
        {
          year: 2019,
          percent: 0
        },
        {
          year: 2020,
          percent: 69
        },
        {
          year: 2021,
          percent: 82
        },
        {
          year: 2022,
          percent: 81
        },
        {
          year: 2023,
          percent: 79
        }
      ]
    };
  },
  mounted() {
    this.updatePath();
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
          Math.min(...this.data.map(x => x.year)),
          Math.max(...this.data.map(x => x.year))
        ])
        // https://github.com/d3/d3-scale/blob/master/README.md#band_rangeRound
        .rangeRound([0, this.width]);
      // .paddingInner(1);
      const y = d3
        .scaleLinear()
        .domain([this.domain.y.min, this.domain.y.max])
        // .domain([this.domainMin, Math.max(...this.data.map(y => y.rwpc)) + 500])
        .rangeRound([this.height, 0]);

      const gridLine = d3
        .scaleLinear()
        .domain([this.domain.y.min, this.domain.y.max])
        .rangeRound([this.height, 0]);

      this.scaled.x = x;
      this.scaled.y = y;
      return { x, y, gridLine };
    }
  },
  methods: {
    createLine: d3
      .line()
      .x(d => d.x)
      .curve(d3.curveBundle.beta(1))
      .y(d => d.y)
      .curve(d3.curveBundle.beta(1)),
    updatePath() {
      // total rwpc for line
      for (const d of this.data) {
        this.pointsLine.push({
          x: this.scaled.x(d.year),
          y: this.scaled.y(d.percent),
          max: this.height
        });
      }
      this.paths.line = this.createLine(this.pointsLine);
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
          .ticks(binding.arg === "x" ? 5 : 5)
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
          .tickSize(-279)
          .ticks(5)
      );
    }
  }
};
</script>

<style scoped>
.link {
  /* stroke: var(--special); */
  stroke: rgba(158, 79, 0, 0.75);
  stroke-width: 2.5px;
  /* stroke-opacity: 0.8; */
  fill: none;
  opacity: 1;
  transition: all 0.7s ease-in-out;
}

.area-lower-basin {
  /* #9e4f00 */
  fill: rgba(158, 79, 0, 0.5);
  background-color: rgba(158, 79, 0, 0.5);
  font-size: 90%;
}

.mini-subtitle {
  opacity: 0.75;
  font-size: 90%;
  margin-bottom: 0.75rem;
  /* line-height: 1; */
}

.tag-mini {
  font-size: 90%;
}

#mini-chart {
  margin-top: 3rem;
  width: 100%;
}

.chart-caption {
  font-size: 80%;
  opacity: 0.75;
  text-align: left;
  width: 350px;
  margin-top: 12px;
  /* padding-left: 10px; */
}
</style>