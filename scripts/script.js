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
      paths: {
        line: ""
      },
      scaled: {
        x: null,
        y: null
      },
      points: [],
      myFilters: {
        exp: 0,
        party: "all",
        category: "all",
        purpose: null,
        site: "all"
      },
      showLabel: false,
      myCount: null
    };
  },
  computed: {
    filteredData() {
      let filteredData = this.data.filter(
        el =>
          el.expire > this.myFilters.exp &&
          (this.myFilters.party === "all"
            ? el.party != null
            : el.party === this.myFilters.party) &&
          (this.myFilters.category === "all"
            ? el.category != null
            : el.category === this.myFilters.category) &&
          (this.myFilters.site === "all"
            ? el.site != null
            : el.site === this.myFilters.site)
      );
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
        .scaleBand()
        .domain(this.data.map(x => x.year))
        // https://github.com/d3/d3-scale/blob/master/README.md#band_rangeRound
        .rangeRound([0, this.width])
        .paddingInner(1);
      const y = d3
        .scaleLinear()
        .domain([8000, Math.max(...this.data.map(x => x.water)) + 500])
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
          year: +d["Years"],
          water: +d["water"]
        };
      })
        .then(d => {
          return (this.data = d);
          // console.log(d);
        })
        .then(() => {
          for (const d of this.data) {
            this.points.push({
              x: this.scaled.x(d.year),
              y: this.scaled.y(d.water),
              max: this.height
            });
          }
          this.paths.line = this.createLine(this.points);
        });
    },
    createLine: d3
      .line()
      .x(d => d.x)
      .y(d => d.y),
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
      if (window.scrollY > el.offsetTop) {
        // el.setAttribute("style", "color: blue");
        this.myFilters.site = "Facebook";
        this.myFilters.party = "all";
      }
      return window.scrollY > el.height;
    }
  },
  directives: {
    axis(el, binding) {
      const axis = binding.arg; // x or y
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      // The line below assigns the x or y function of the scale object
      const methodArg = binding.value[axis];
      // d3.axisBottom(scale.x)
      d3.select(el).call(d3[axisMethod](methodArg));
    }
  }
});
