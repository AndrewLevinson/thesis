Vue.directive("scroll", {
  inserted: function(el, binding) {
    let f = function(evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener("scroll", f);
      }
    };
    window.addEventListener("scroll", f);
  }
});

/* global Vue */
var app = new Vue({
  el: "#container",
  data() {
    return {
      chartTitle: "The United States Water Crisis",
      subTitle:
        "Mitigating increasing demand and changes in the natural water cycle",
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
      isVisible: false,
      myCount: null
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
      tooltip = {
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
      tooltip.init();
    },
    myTooltip(d) {
      if (this.showLabel) {
        tooltip.show(`<h5 class="total">${d.site}</h5><p>
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
        tooltip.hide();
      }
    },
    handleScrollOne(evt, el) {
      // console.log(evt.path[0].body.children[0].children[2].children[0].id);
      // console.log(window.scrollY + window.innerHeight - el.height);
      if (window.scrollY > el.offsetTop * 0.8) {
        this.isVisible = true;
      } else {
        this.isVisible = false;
      }

      if (this.isVisible) {
        // console.log("count");
        // el.setAttribute("style", "color: blue");
        // this.myFilters.yearMax = 2019;
        // this.data.push({
        //   year: "2019",
        //   water: 9000
        // });
        this.select(6);
        // this.updatePath();
      } else if (!this.isVisible) {
        this.select(null);
      }
      // return window.scrollY > el.height;
      return this.isVisible;
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
    select(index, node) {
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
});
