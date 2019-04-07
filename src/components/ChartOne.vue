<template>
  <div id="chart-one">
    <svg :width="svgWidth" :height="svgHeight">
      <g :transform="`translate(${margin.left}, ${margin.bottom})`">
        <g v-axis:x="scale" :transform="`translate(${0}, ${height})`"></g>
        <g v-axis:y="scale"></g>
        <path class="area-one" :d="paths.one.area"></path>
        <path class="area-two" :d="paths.two.area"></path>
        <path class="area-three" :d="paths.three.area"></path>
        <path class="area-four" :d="paths.four.area"></path>
        <path class="link" :d="paths.one.line"></path>
        <path class="link" :d="paths.two.line"></path>
        <path class="link" :d="paths.three.line"></path>
        <path class="link" :d="paths.four.line"></path>
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

          <!-- <text
                v-show="showLabel === true"
                :x="scale.x(d.name) + 7"
                :y="scale.y(d.expire) + 18"
                text-anchor="middle"
              >
                {{ d.expire }}
          </text>-->
        </g>

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
          y="-30"
          x="-65"
          text-anchor="left"
          id="chart-one-title"
        >Total Renewable Water Resources Per Capita (m3/inhab/year)</text>
      </g>
    </svg>
    <section class="text-section">
      <div class="text-box section-one" @mouseover="scrollIter = 1">
        <h5 class="box-title">Why are we running out of water?</h5>
        <p>
          In 2012, the global demand for water exceeded supply and unless
          drastic action is taken the gap is expected to increase
          dramatically—reaching 90% by the year 2090.
          <br>
          <br>Population growth is reducing the static amount of renewable
          freshwater available per capita.
        </p>
      </div>
      <div class="text-box section-one">
        <h5 class="box-title">Lorem ipsum dolor sit amet.</h5>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
          voluptatem nulla quod id nostrum! Minus deleniti praesentium quas
          iure velit quis atque ab nihil quo quae magni quasi qui autem
          mollitia, molestias cumque eveniet ad a doloremque libero eaque
          officiis illo adipisci. Temporibus quam animi nihil inventore,
          laborum officiis hic.
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "chart-one",
  data() {
    return {
      svgWidth: window.innerWidth * 0.95,
      svgHeight: window.innerHeight * 0.95,
      margin: { top: 50, left: 90, bottom: 50, right: 25 },
      data: [{}],
      selected: null,
      scaled: {
        x: null,
        y: null
      },
      paths: {
        one: {
          line: "",
          area: ""
        },
        two: {
          line: "",
          area: ""
        },
        three: {
          line: "",
          area: ""
        },
        four: {
          line: "",
          area: ""
        }
      },
      points: [[], [], [], []],
      myFilters: {
        yearMax: 2014
      },
      showLabel: false,
      myCount: null,
      scrollIter: null,
      tooltip: null
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
        .domain([0, Math.max(...this.data.map(y => y.rwpc)) + 500])
        // .domain([0, 10000])
        .rangeRound([this.height, 0]); // Already flipped

      this.scaled.x = x;
      this.scaled.y = y;
      return { x, y };
    }
  },
  mounted() {
    this.loadData();
    this.initTooltip();
  },
  methods: {
    loadData() {
      d3.csv("data/clean/renewable_water_capita.csv", d => {
        return {
          year: +d["years"],
          rwpc: +d["rwpc"],
          spc: +d["spc"],
          gpc: +d["gpc"],
          dpc: +d["dpc"]
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
      .y0(d => d.max)
      .y1(d => d.y),
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
        this.tooltip.show(`<h5 class="total">${d.site}</h5><p>
        <span class="datum"><i>cookie name</i></span> is a <span class="datum">${
          d.party
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
      // x is not updating dynamically correctly—need to fix

      // total rwpc
      for (const d of this.data) {
        this.points[0].push({
          x: this.scaled.x(d.year),
          y: this.scaled.y(d.rwpc),
          max: this.height
        });
      }
      // groundwater pc
      for (const d of this.data) {
        this.points[1].push({
          x: this.scaled.x(d.year),
          y: this.scaled.y(d.spc),
          max: this.height
        });
      }

      // surface pc
      for (const d of this.data) {
        this.points[2].push({
          x: this.scaled.x(d.year),
          y: this.scaled.y(d.gpc),
          max: this.height
        });
      }

      // depend pc
      for (const d of this.data) {
        this.points[3].push({
          x: this.scaled.x(d.year),
          y: this.scaled.y(d.dpc),
          max: this.height
        });
      }

      // this.paths.one.line = "";
      this.paths.one.line = this.createLine(this.points[0]);
      this.paths.one.area = this.createArea(this.points[0]);

      this.paths.two.line = this.createLine(this.points[1]);
      this.paths.two.area = this.createArea(this.points[1]);

      this.paths.three.line = this.createLine(this.points[2]);
      this.paths.three.area = this.createArea(this.points[2]);

      this.paths.four.line = this.createLine(this.points[3]);
      this.paths.four.area = this.createArea(this.points[3]);
    },
    select(index) {
      this.selected = index;
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
        d3[axisMethod](methodArg).tickFormat(
          d3.format(binding.arg === "x" ? "d" : ",d")
        )
      );
    }
  }
};
</script>

<style scoped>
</style>