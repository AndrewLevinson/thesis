<template>
  <div id="chart-one">
    <div id="graph-one">
      <h5 class="subtitle">{{ graphOneTitle }}</h5>
      <div
        v-if="setShown === 1"
        :class="[showArea ? 'legend-active' : 'legend-hidden']"
        class="legend"
      >
        <div class="area-three tag">
          <span>Dependencies</span>
        </div>
        <div class="area-two tag">
          <span>Surface Water</span>
        </div>
        <div class="area-one tag">
          <span>Groundwater</span>
        </div>
      </div>
      <div v-else :class="[showArea ? 'legend-active' : 'legend-hidden']" class="legend">
        <!-- <div :class="[setShown === 2 ? 'area-one-100 tag' : 'area-disabled tag']">
          <span>Thremoelectric</span>
        </div>-->
        <div v-show="setShown === 2" class="area-one-100 tag">
          <span>Thremoelectric</span>
        </div>
        <div class="area-two-100 tag">
          <span>Irrigation</span>
        </div>
        <div class="area-three-100 tag">
          <span>Municipal</span>
        </div>
        <div class="area-four-100 tag">
          <span>Industrial</span>
        </div>
        <div class="area-five-100 tag">
          <span>Other</span>
        </div>
      </div>
      <svg :width="svgWidth" :height="svgHeight">
        <g :transform="`translate(${margin.left}, ${margin.bottom})`" class="the-group">
          <g v-axis:x="scale" :transform="`translate(${0}, ${height})`" class="x-axis" />
          <g v-axis:y="scale" class="y-axis" />
          <g v-grid:gridLine="scale" class="grid" />
          <path
            :class="[
              showCallOut && setShown === 1
                ? 'link-inactive'
                : setShown === 1
                ? 'link'
                : 'link-hide'
            ]"
            :d="paths.line"
          />
          <g
            :class="[showArea ? 'area-active' : 'area-hide']"
            @mousemove="mouseoverArea"
            @mouseleave="(showLabel = false), myTooltip()"
          >
            <path v-show="setShown != 1" class="selector" :d="paths.selector" />
            <path :class="[setShown === 1 ? 'area-one' : 'area-one-100']" :d="paths.areaOne" />
            <path :class="[setShown === 1 ? 'area-two' : 'area-two-100']" :d="paths.areaTwo" />
            <path
              :class="[setShown === 1 ? 'area-three' : 'area-three-100']"
              :d="paths.areaThree"
            />
            <path :class="[setShown === 1 ? 'area-one' : 'area-four-100']" :d="paths.areaFour" />
            <path :class="[setShown === 1 ? 'area-one' : 'area-five-100']" :d="paths.areaFive" />
          </g>
          <g v-for="(d, i) in filteredData" :key="i">
            <line
              v-if="setShown === 1"
              :x1="scale.x(d.year)"
              :y1="scale.y(d.rwpc)"
              :x2="scale.x(d.year)"
              :y2="height"
              :class="[i == selected ? 'selector' : 'selector-inactive']"
            />
            <circle
              v-if="setShown === 1"
              :class="[
                i == selected ? 'circle-active' : showCallOut ? 'circle-inactive' : 'circle-up'
              ]"
              :cx="scale.x(d.year)"
              :cy="[setShown === 1 ? scale.y(d.rwpc) : scale.y(1)]"
              r="5"
              @mouseover="(showLabel = !showLabel), myTooltip(d), select(i)"
              @mouseleave="(showLabel = !showLabel), myTooltip(d), select(null)"
            />
          </g>
          <g>
            <rect v-if="setShown === 1" x="-5" y="-15" width="145" height="30" fill="#eff8ff" />
            <text v-if="setShown === 1" y="5.5" x="0" class="axis-title">{{ yLabel }}</text>
            <text v-if="setShown === 2" y="-5" x="0" class="axis-title">{{ yLabel }}</text>
          </g>
        </g>
      </svg>
    </div>
    <section class="text-section" id="sectionsOne">
      <div class="text-box">
        <h5 class="box-title">Why Are We Running Out of Water?</h5>
        <p>
          Each country has a static amount of renewable water provided by the natural water cycle.
          As long as populations continue to grow, the renewable water per person decreases.
          Combined with climate change factors and increasing demand for water-intensive goods and
          services, the United States faces an increased risk of water stress every year we don't
          take action.
        </p>
      </div>
      <div class="text-box">
        <h5 class="box-title">Trending Down</h5>
        <p>
          According to Aquastat, 2014 yielded the lowest available water per capita on record at
          9,538 m
          <sup>3</sup>/year/person, down about <span class="datum">25%</span> over the last 30
          years.
        </p>
      </div>
      <div class="text-box">
        <h5 class="box-title">Where Does Our Freshwater Come From?</h5>
        <p>
          Renewable freshwater is mostly extracted from
          <span class="area-two tag tag-intext">
            Surface Water:
            <span class="datum">61%</span> </span
          >,
          <span class="area-one tag tag-intext">
            Groundwater:
            <span class="datum">31%</span> </span
          >, with some water coming from beyond the countries borders like from Canada marked as
          <span class="area-three tag tag-intext">
            Dependencies:
            <span class="datum">8%</span> </span
          >.
        </p>
      </div>
      <div class="text-box">
        <h5 class="box-title">How is it Used?</h5>
        <p>
          Every five years, the U.S. Geological Survey collects
          <a href="https://water.usgs.gov/watuse/data/" target="_blank">water usage data</a> for the
          country. As of <span class="datum">2015</span>, the allocation of withdrawn freshwater
          shows the top three uses of water as
          <br />
          <br />
          <span class="area-one-100 tag tag-intext">
            Thermoelectric:
            <span class="datum">41%</span> </span
          >,
          <span class="area-two-100 tag tag-intext">
            Irrigation:
            <span class="datum">37%</span>
          </span>
          and
          <span class="area-three-100 tag tag-intext">
            Municipal:
            <span class="datum">13%</span>
          </span>
          <br />
          <br />However, this number is a bit misleading as not all water withdrawn is
          consumed—specifically in thermoelectric usage where virtually all water is returned back
          to the earth after it's used for a once-through cooling process.
        </p>
      </div>

      <div class="text-box">
        <h5 class="box-title">Excluding Thermoelectric Withdrawals</h5>
        <p>
          If we remove thermoelectric withdrawals from the chart, it paints a more accurate picture
          of consumptive water use, now showing the top three uses of water as
          <br />
          <br />
          <span class="area-two-100 tag tag-intext">
            Irrigation:
            <span class="datum">63%</span> </span
          >,
          <span class="area-three-100 tag tag-intext">
            Municipal:
            <span class="datum">22%</span>
          </span>
          and
          <span class="area-four-100 tag tag-intext">
            Industrial:
            <span class="datum">14%</span>
          </span>
          <br />
          <br />But these numbers are just averages, the local breakdown is much different...
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import {
  select,
  selectAll,
  scaleLinear,
  format,
  csv,
  line,
  stack,
  curveBundle,
  area,
  axisBottom,
  axisLeft
} from 'd3';
import { graphScroll } from 'graph-scroll';

const d3 = {
  select,
  selectAll,
  scaleLinear,
  format,
  csv,
  line,
  stack,
  curveBundle,
  area,
  axisBottom,
  axisLeft
};

export default {
  name: 'chart-one',
  data() {
    return {
      graphOneTitle: 'Renewable Water Resources Per Capita (USA)',
      yLabel: 'm3/year/person',
      svgWidth: window.innerWidth * 0.95,
      svgHeight: window.innerHeight * 0.83,
      margin: { top: 50, left: 65, bottom: 20, right: 25 },
      data: [{}],
      stackedData: null,
      scaled: {
        x: null,
        y: null,
        color: null
      },
      paths: {
        line: '',
        areaOne: '',
        areaTwo: '',
        areaThree: '',
        areaFour: '',
        areaFive: '',
        selector: ''
      },
      pointsLine: [],
      pointsArea: [[], [], [], [], []],
      lastHoverPoint: {},
      myFilters: {
        yearMax: 2014
      },
      showLabel: false,
      selected: null,
      selectedArea: null,
      showCallOut: false,
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
      stackKeys: ['gpc', 'spc', 'dpc'],
      setShown: 1
    };
  },
  computed: {
    filteredData() {
      return this.data.filter(d => d.set === this.setShown);
    },
    width() {
      return this.svgWidth - this.margin.left - this.margin.right;
    },
    height() {
      return this.svgHeight - this.margin.top - this.margin.bottom;
    },
    count() {
      return this.filteredData.length;
    },
    scale() {
      // this.domain.x.min = Math.min(...this.filteredData.map(x => x.year));
      // this.domain.x.max = Math.max(...this.filteredData.map(x => x.year));

      const x = d3
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

      const gridLine = d3
        .scaleLinear()
        .domain([this.domain.y.min, this.domain.y.max])
        .rangeRound([this.height, 0]);

      this.scaled.x = x;
      this.scaled.y = y;

      return { x, y, gridLine };
    }
  },
  created() {
    this.loadData();
  },
  mounted() {
    this.initTooltip();
    this.scrollTrigger();
  },
  updated() {
    this.updatePath();
  },
  methods: {
    loadData() {
      d3.csv('data/clean/renewable_water_capita.csv', d => {
        return {
          set: +d['set'],
          year: +d['years'],
          rwpc: +d['rwpc'],
          spc: +d['spc'],
          gpc: +d['gpc'],
          dpc: +d['dpc'],
          totalW: +d['Total in Bgal/d'],
          publicPer: +d['Public and Domestic'],
          irrigationPer: +d['Irrigation'],
          thermoPer: +d['Thremoelectric'],
          industrialPer: +d['Industrial'],
          otherPer: +d['Other']
        };
      })
        .then(d => {
          return (this.data = d);
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
      this.showLabel = true;
      if (this.setShown != 1 && this.pointsArea[1].length > 0) {
        const x = offsetX - this.margin.left;
        const closestPoint = this.getClosestPoint(x);
        if (this.lastHoverPoint.index !== closestPoint.index) {
          const point = this.pointsArea[1][closestPoint.index];
          this.paths.selector = this.createValueSelector([point]);
          this.$emit('mouseOver', this.myTooltip(this.filteredData[closestPoint.index]));

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

    select(index) {
      this.selected = index;
    },
    selectArea(index) {
      this.selectedArea = index;
    },
    numFormater(type, el) {
      const numFormatT = d3.format(',d');
      return numFormatT(el) + (type === 'per' ? '%' : '');
    },
    initTooltip() {
      this.tooltip = {
        element: null,
        init: function() {
          this.element = d3
            .select('body')
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);
        },
        show: function(t) {
          this.element
            .html(t)
            .transition()
            .duration(200)
            .style(
              'left',
              `${
                event.clientX > window.innerWidth * 0.5 ? event.clientX - 250 : event.clientX + 10
              }px`
            )
            .style('top', `50vh`)
            .style('opacity', 0.925);
        },
        move: function() {
          this.element
            .transition()
            .duration(30)
            .style('left', `${event.clientX + 10}px`)
            .style('top', `50vh`)
            .style('opacity', 0.9);
        },
        hide: function() {
          this.element
            .transition()
            .duration(500)
            .style('opacity', 0)
            .delay(100);
        }
      };
      this.tooltip.init();
    },
    myTooltip(d) {
      if (this.showLabel) {
        if (this.setShown === 1) {
          this.tooltip.show(`
        <div class="tip-band"></div>
        <h5 class="datum">${d.year}</h5>
        <h6 class="sub-head-tip">Renewable Water Per Capita<br>(m3/year/person)</h6>
          <div class="data-pair area-three tip-tag">
            <span class="tag-intext">Dependencies</span>
            <p class="tag-intext">
              ${this.numFormater('num', d.dpc)}
            </p>
          </div>
      
          <div class="data-pair area-two tip-tag">
            <span class="tag-intext">Surface Water</span>
            <p class="tag-intext">
              ${this.numFormater('num', d.spc)}
            </p>
          </div>

          <div class="data-pair area-one tip-tag">
            <span class="tag-intext">Groundwater</span>
            <p class="tag-intext">
              ${this.numFormater('num', d.gpc)}
            </p>
          </div>

       
          <div class="data-pair tip-tag">
            <span class="datum total">Total</span>
            <p class="total">
              ${this.numFormater('num', d.rwpc)}
            </p>
          </div>
        `);
        } else if (this.setShown === 2) {
          this.tooltip.show(`
        <div class="tip-band"></div>
        <h5 class="datum">${d.year}</h5>
        <h6 class="sub-head-tip">Percentage of Water Withdrawls</h6>

          <div class="data-pair area-five-100 tip-tag">
            <span class="tag-intext">Other</span>
            <p class="tag-intext">
            ${this.numFormater('per', d.otherPer)}
            </p>
          </div>


          <div class="data-pair area-four-100 tip-tag">
            <span class="tag-intext">Industrial</span>
            <p class="tag-intext">
              ${this.numFormater('per', d.industrialPer)}
            </p>
          </div>

          <div class="data-pair area-three-100 tip-tag">
            <span class="tag-intext">Municipal</span>
            <p class="tag-intext">
              ${this.numFormater('per', d.publicPer)}
            </p>
          </div>

          <div class="data-pair area-two-100 tip-tag">
            <span class="tag-intext">Irrigation</span>
            <p class="tag-intext">
              ${this.numFormater('per', d.irrigationPer)}
            </p>
          </div>

       <div class="data-pair area-one-100 tip-tag">
            <span class="tag-intext">Thermoelectric</span>
            <p class="tag-intext">
              ${this.numFormater('per', d.thermoPer)}
            </p>
          </div>
         `);
        } else if (this.setShown === 3) {
          this.tooltip.show(`
        <div class="tip-band"></div>
        <h5 class="datum">${d.year}</h5>
        <h6 class="sub-head-tip">Percentage of Water Withdrawls</h6>

          <div class="data-pair area-five-100 tip-tag">
            <span class="tag-intext">Other</span>
            <p class="tag-intext">
            ${this.numFormater('per', d.otherPer)}
            </p>
          </div>


          <div class="data-pair area-four-100 tip-tag">
            <span class="tag-intext">Industrial</span>
            <p class="tag-intext">
              ${this.numFormater('per', d.industrialPer)}
            </p>
          </div>

          <div class="data-pair area-three-100 tip-tag">
            <span class="tag-intext">Municipal</span>
            <p class="tag-intext">
              ${this.numFormater('per', d.publicPer)}
            </p>
          </div>

          <div class="data-pair area-two-100 tip-tag">
            <span class="tag-intext">Irrigation</span>
            <p class="tag-intext">
              ${this.numFormater('per', d.irrigationPer)}
            </p>
          </div>

         `);
        }
      } else if (!this.showLabel) {
        this.tooltip.hide();
      }
    },

    scrollTrigger() {
      graphScroll()
        .offset(100)
        .graph(d3.selectAll('#graph-one'))
        .container(d3.select('#chart-one'))
        .sections(d3.selectAll('#sectionsOne > div'))
        .eventId('uniqueId1')
        .on('active', i => {
          switch (i) {
            case 0:
              // offscreen so do nothing / reset with just line
              this.domain.y.min = 7000;
              this.domain.y.max = 14000;
              this.setShown = 1;
              this.showArea = false;
              this.selected = null;
              this.showCallOut = false;
              // this.showLabel = false;

              this.stackKeys = ['gpc', 'spc', 'dpc'];

              break;
            case 1:
              // highlight point on line
              this.showArea = false;
              this.domain.y.min = 7000;
              this.domain.y.max = 14000;
              this.setShown = 1;
              this.selected = 6;
              this.showCallOut = true;
              this.stackKeys = ['gpc', 'spc', 'dpc'];

              break;
            case 2:
              this.graphOneTitle = 'Renewable Water Resources Per Capita (USA)';
              this.yLabel = 'm3/year/person';
              // update y axis to show first area per cap
              this.setShown = 1;
              this.showArea = true;
              this.domain.y.min = 0;
              this.domain.y.max = 14000;
              this.selected = null;
              this.showCallOut = false;
              this.stackKeys = ['gpc', 'spc', 'dpc'];

              break;
            case 3:
              this.graphOneTitle = 'Percentage Share of Water Withdrawls by Category (USA)';
              this.yLabel = '% of Total Water Withdrawn';

              // change dataset to 100% area
              this.setShown = 2;
              this.showArea = true;
              this.domain.y.min = 0;
              this.domain.y.max = 100;
              this.stackKeys = [
                'thermoPer',
                'irrigationPer',
                'publicPer',
                'industrialPer',
                'otherPer'
              ];

              break;
            case 4:
              this.graphOneTitle = 'Percentage Share of Water Withdrawls Excluding Thermoelectric';
              this.yLabel = '% of Total Water Withdrawn';

              // change dataset to 100% area
              this.setShown = 3;
              this.showArea = true;
              this.domain.y.min = 0;
              this.domain.y.max = 100;
              this.stackKeys = [
                'thermoPer',
                'irrigationPer',
                'publicPer',
                'industrialPer',
                'otherPer'
              ];

              break;
            default:
              // console.log("none");
              break;
          }
        });
    }
  },
  directives: {
    axis(el, binding) {
      const axis = binding.arg; // x or y
      const axisMethod = { x: 'axisBottom', y: 'axisLeft' }[axis];
      // The line below assigns the x or y function of the scale object
      const methodArg = binding.value[axis];
      // d3.axisBottom(scale.x)
      d3.select(el).call(
        d3[axisMethod](methodArg)
          .tickFormat(d3.format(binding.arg === 'x' ? 'd' : ',d'))
          .ticks(binding.arg === 'x' ? 10 : 5)
      );
    },
    grid(el, binding) {
      const axis = binding.arg; // x or y
      const axisMethod = { gridLine: 'axisLeft' }[axis];
      // The line below assigns the x or y function of the scale object
      const methodArg = binding.value[axis];
      // d3.axisBottom(scale.x)
      d3.select(el).call(
        d3[axisMethod](methodArg)
          .tickFormat('')
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
  width: 92.5%;
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
  font-weight: 700;
  font-size: 2.5rem;
  /* fill: #485465; */
  font-family: 'IBM Plex Sans', sans-serif;
  opacity: 0.75;
  visibility: hidden;
}

#graph-one {
  position: sticky;
  position: -webkit-sticky;
  top: 30px;
}

/* legend */
.legend-hidden {
  opacity: 0;
}

.legend {
  justify-content: space-between;
  padding-bottom: 0.5rem;
  margin-top: -0.5rem;
  font-size: 1.4rem;
}

/* chart elements */
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
  opacity: 1;

  transition: all 0.7s ease-in-out;
}
.circle-inactive {
  fill: #fff;
  stroke: #000;
  opacity: 0.3;
  transition: all 0.7s ease-in-out;
}

.circle-active {
  fill: var(--special);
  stroke: #000;
  opacity: 1;
  transition: all 0.7s ease-in-out;

  -webkit-animation: pulsing 1.5s infinite ease-in-out;
  -moz-animation: pulsing 1.5s infinite ease-in-out;
  animation: pulsing 1.5s infinite ease-in-out;
}

/* pulsing circle on active */
@-webkit-keyframes pulsing {
  0%,
  100% {
    r: 5;
    stroke-width: 1;
    stroke: #000;
    fill: #fff;
  }
  50% {
    r: 9;
    stroke-width: 2;
    fill: var(--special);
  }
}
@-moz-keyframes pulsing {
  0%,
  100% {
    r: 5;
    stroke-width: 1;
    stroke: #000;
    fill: #fff;
  }
  50% {
    r: 9;
    stroke-width: 2;
    fill: var(--special);
  }
}
@keyframes pulsing {
  0%,
  100% {
    r: 5;
    stroke-width: 1;
    stroke: #000;
    fill: #fff;
  }
  50% {
    r: 9;
    stroke-width: 2;
    fill: var(--special);
  }
}

circle:hover {
  cursor: pointer;
}

.circle-group {
  opacity: 1;
  transition: all 0.7s ease-in-out;
  transform-origin: left top;
}
.circle-group-hide {
  opacity: 0;
  transition: all 0.7s ease-in-out;
}

.selector {
  stroke: var(--main-body-type);
  /* stroke: var(--special); */
  stroke-width: 3px;
  stroke-dasharray: 2;
  fill: none;
  opacity: 1;
  transition: all 0.3s ease-in-out;
}

.selector-inactive {
  stroke: var(--main-body-type);
  stroke-width: 1px;
  stroke-dasharray: 2;
  fill: none;
  opacity: 0;
  transition: all 0.3s ease-in-out;
}

.link {
  stroke: black;
  stroke-width: 2.5px;
  /* stroke-opacity: 0.8; */
  fill: none;
  opacity: 1;
  transition: all 0.7s ease-in-out;
}

.link-inactive {
  stroke: black;
  stroke-width: 2px;
  fill: none;
  opacity: 0.3;
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
.area-active:hover {
  cursor: crosshair;
}
.area-hide {
  opacity: 0;
  transition: all 0.7s ease-in-out;
}

/* all blues */
/* .area-one {
  fill: var(--ground);
  background-color: var(--ground);
}

.area-two {
  fill: var(--surface);
  background-color: var(--surface);
}

.area-three {
  fill: var(--dep);
  background-color: var(--dep);
} */

/* ordinal */
/* .area-one-100 {
  fill: var(--irrigation);
  background-color: var(--irrigation);
}

.area-two-100 {
  fill: var(--thermo);
  background-color: var(--thermo);
}

.area-three-100 {
  fill: var(--industrial);
  background-color: var(--industrial);
}

.area-four-100 {
  fill: var(--municipal);
  background-color: var(--municipal);
}

.area-five-100 {
  fill: var(--other);
  background-color: var(--other);
} */
</style>
