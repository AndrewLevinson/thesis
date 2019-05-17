<template>
  <div id="app">
    <div id="container">
      <section id="hero-section">
        <div id="title-grad-top"></div>
        <div id="title">
          <div class="tip-band-hero"></div>
          <h2 class="main-header">
            The United States
            <span class="blue">Water Crisis</span>
          </h2>
          <h5
            class="subtitle"
          >How changes to the natural water cycle and increasing demand are causing water stress</h5>
          <p id="byline">
            <a href="https://andrewlevinson.me" target="_blank">Andrew Levinson</a> | May 2019
          </p>
        </div>
        <div id="title-grad-bottom"></div>
      </section>
      <section class="section-break">
        <div class="section-tag-holder">
          <div class="section-tag-line"></div>
          <div class="section-tag-text">
            <h6 class="small-sub">Part 1</h6>
            <h4>Background</h4>
          </div>
        </div>
        <div class="body-text">
          <p>
            Freshwater has been described as the
            <i>oil of the 21st century</i>
            <sup class="footnote">&nbsp;[1]</sup>. In the wake of extreme water stress events across the globe in places like
            <a
              href="https://en.wikipedia.org/wiki/Cape_Town_water_crisis"
            >Cape Town</a>,
            <a href="https://en.wikipedia.org/wiki/Water_scarcity_in_Mexico">Mexico City</a>, and
            <a href="https://en.wikipedia.org/wiki/Water_restrictions_in_Australia">Australia</a>, I wanted to take a look at water issues here at home in the United States. Major factors like population growth and climate change are causing localized regional pockets of water stress that will soon affect other areas of the country without action. In order to change our relationship with water, action must come in the form of both infrastructure investments and behavioral changes.
          </p>
        </div>
      </section>
      <!-- add chart one -- line and area -- component -->
      <ChartOne/>

      <section class="section-break">
        <div class="section-tag-holder">
          <div class="section-tag-line"></div>
          <div class="section-tag-text">
            <h6 class="small-sub">Part 2</h6>
            <h4>Water Stress</h4>
          </div>
        </div>
        <div class="body-text">
          <p>While the average withdrawals show a broad picture of water usage across the United States, it's important to look at where in the country the most water is being withdrawn and consumed. This helps understand how water stress from surface water elusiveness, groundwater over abstraction, infrastructure play a role at local, regional, and national levels.</p>
        </div>
      </section>
      <!-- topo d3 map for water usage -->
      <!-- <CountyMap/> -->

      <!-- add chart two -- map -- components -->
      <ChartTwo/>
      <section class="section-break">
        <div class="section-tag-holder">
          <div class="section-tag-line"></div>
          <div class="section-tag-text">
            <h6 class="small-sub">Part 3</h6>
            <h4>Water Action</h4>
          </div>
        </div>
        <div class="body-text">
          <p>After reading about half a trillion dollars needed for infrastructure, increasing groundwater depletion intensity, and climate change affecting the natural water cycle of our surface water, it's hard to imagine how any individual efforts can make a difference.</p>
          <p>While it's necessary for government at the local, state, and federal level to provide funding for massive infrastructure investments, smarter irrigation systems, and climate change fighting policies, we often underestimate the impact our daily choices make on water withdrawals.</p>
          <p>You and I can't spend half a trillion dollars on infrastructure, but we can change our behaviors to force conservation efforts.</p>
        </div>
      </section>

      <!-- add chart three -- scenario -- component -->
      <ChartThree/>
      <section class="section-break">
        <div class="section-tag-holder">
          <div class="section-tag-line"></div>
          <div class="section-tag-text">
            <h6 class="small-sub">Conclusion</h6>
            <h4>Reflections</h4>
          </div>
        </div>
        <div class="body-text">
          <div id="final">
            <p>This is not an all or nothing approach. By reducing our virtual water footprint, alongside major investments in infrastructure and irrigation technologies, we can help mitigate shortage conditions in the west, the drinking water impact of floods in the midwest, the depletion intensity of our below-ground aquifers by ultimately allowing us to do more with less water.</p>
            <p>Understanding the magnitude of these specific courses of action will enable us to drastically change our relationship with the most valuable natural resource on earth.</p>
          </div>
        </div>
      </section>
      <div class="footnotes">
        <hr class="footer">
        <h6>Methodology, Sources, and Footnotes</h6>
        <p>
          This story was created by
          <a
            href="http://andrewlevinson.me/"
            target="_blank"
          >Andrew Levinson</a>
          in support of a graduate school thesis for the Masters of Science in Data Visualization at Parsons School
          of Design // The New School.
        </p>
        <p>
          Data was mostly collected from US governmental organizations, including: the United States Geological Survey
          <a
            href="https://www.usgs.gov/"
          >(USGS)</a>, the Environmental Protection Agency (EPA) [both the
          <a
            href="https://www.epa.gov/"
          >current website</a> and the
          <a href="https://19january2017snapshot.epa.gov/">archived version</a> which included climate change data until January 19th, 2017], the United States Department of Agriculture
          <a
            href="https://www.usda.gov/"
          >(USDA)</a>, and the United States Bureau of Reclamation
          <a href="https://www.usbr.gov/">(USBR)</a> for which you can find the direct links to the data in the sources section below.
        </p>
        <p>
          This visual essay was built with
          <a href="https://cli.vuejs.org/">Vue CLI 3</a>,
          <a href="https://d3js.org/">D3</a>,
          <a href="https://studio.mapbox.com/">Mapbox Studio</a>, and
          <a href="https://www.qgis.org/en/site/">QGIS</a>. I also used the help of the
          <a
            href="https://github.com/1wheel/graph-scroll"
            target="_blank"
          >graph-scroll.js</a>
          library for scroll events and
          <a
            href="https://nightcatsama.github.io/vue-slider-component/#/"
          >vue-slider-component</a> for the slider components.
        </p>
        <p>Footnotes:</p>
        <ol>
          <li>"Water is the oil of the 21st century" has appeared in many articles. It isn't clear who originally phrased the commodity in this way.</li>
          <li>
            <a href="https://www.snwa.com/ws/river_law.html">Southern Nevada Water Authority</a>
          </li>
          <li>
            <a
              href="https://web.archive.org/web/20120429024450/http://wwa.colorado.edu/treeflow/lees/compact.html"
            >Colorado River Streamflow: A Paleo Perspective</a>
          </li>
        </ol>
        <p>Sources:</p>
        <ol>
          <li>
            <a
              href="http://www.fao.org/nr/water/aquastat/data/query/index.html"
            >Aquastat Renewable Water Per Capita</a>
          </li>
          <li>
            <a href="https://water.usgs.gov/watuse/data/">USGS Water Usage Data</a>
          </li>
          <li>
            <a
              href="https://www.usbr.gov/lc/region/g4000/riverops/crss-5year-projections.html"
            >Shortage Odds in Lower Basin</a>
          </li>
          <li>
            <a href="https://waterwatch.usgs.gov/index.php?id=flood&sid=w__map">USGS Flooding Data</a>
          </li>
          <li>
            <a href="https://pubs.usgs.gov/sir/2013/5079/">USGS Groundwater Depletion Study</a>
          </li>
          <li>
            <a
              href="https://www.epa.gov/sites/production/files/2018-10/documents/corrected_sixth_drinking_water_infrastructure_needs_survey_and_assessment.pdf"
            >EPA 6th Drinking Water Infrastructure Needs Survey and Assessment</a>
          </li>
          <li>
            <a
              href="https://www.infrastructurereportcard.org/wp-content/uploads/2016/10/ASCE-Failure-to-Act-2016-FINAL.pdf"
            >American Society of Civil Engineers Failure to Act Infrastructure Report (2016)</a>
          </li>

          <li>
            <a
              href="https://www.ers.usda.gov/topics/farm-practices-management/irrigation-water-use/#private"
            >USDA Farming and Irrigation Data</a>
          </li>
          <li>
            <a href="https://www.circleofblue.org/wp-content/uploads/2016/04/WRF_REU2016.pdf">
              Water Research Foundation Residential End Uses of Water,
              Version 2: Executive Report
            </a>
          </li>
          <li>
            <a
              href="http://eric.clst.org/tech/usgeojson/"
            >Geojson files for US counties and state lines from Eric Celeste</a>
          </li>
          <li>
            <a
              href="https://www.usgs.gov/products/data-and-tools/gis-data"
            >Shapefiles from USGS for aquifers, basins, and rivers</a>
          </li>
        </ol>
        <p>
          Feel free to
          <a
            href="https://github.com/AndrewLevinson/thesis"
            target="_blank"
          >check out the code</a>
          or
          <a href="mailto:andrewlevins@gmail.com" target="_blank">email me</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ChartOne from "./components/ChartOne.vue";
import ChartTwo from "./components/ChartTwo.vue";
import ChartThree from "./components/ChartThree.vue";

export default {
  name: "app",
  components: {
    ChartOne,
    ChartTwo,
    ChartThree
  },
  data() {
    return {};
  }
};
</script>

<style>
/* global style */
:root {
  --main-bg-color: #eff8ff;
  --map-bg-color: #343332;
  --main-body-type: #0f242c;
  --link-color: #e4480f;
  --emphasis: #5f90de;
  --special: #45b8cd;
  --active-tip: green;

  --reset: rgba(0, 0, 0, 0.45);

  /* chart-one */
  --opacity-one: 0.8;
  --dep: rgba(200, 230, 243, var(--opacity-one));
  --surface: rgba(157, 215, 239, var(--opacity-one));
  --ground: rgba(81, 193, 237, var(--opacity-one));
  /* break */
  --opacity-two: 0.6;
  --irrigation: rgba(60, 90, 153, var(--opacity-two));
  --thermo: rgba(15, 157, 88, var(--opacity-two));
  --industrial: rgba(255, 153, 0, var(--opacity-two));
  --municipal: rgba(255, 127, 81, var(--opacity-two));
  --other: rgba(0, 128, 128, var(--opacity-two));
}
/* all blues */
.area-one {
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
}

/* ordinal */
.area-one-100 {
  fill: var(--thermo);
  background-color: var(--thermo);
}

.area-two-100 {
  fill: var(--irrigation);
  background-color: var(--irrigation);
}

.area-three-100 {
  fill: var(--municipal);
  background-color: var(--municipal);
}
.area-four-100 {
  fill: var(--industrial);
  background-color: var(--industrial);
}

.area-five-100 {
  fill: var(--other);
  background-color: var(--other);
}

.area-disabled {
  fill: #b1b1b1;
  background-color: #b1b1b1;
  display: none;
}

/* areas in chart three */
.area-virtual {
  font-size: 87.5%;
  background-color: rgba(143, 164, 200, 0.75);
  transition: all 0.3s ease-in;
}

.area-virtual:hover {
  background-color: rgba(143, 164, 200, 1);
  transition: all 0.3s ease-in;
}

.area-infra {
  font-size: 87.5%;
  background-color: rgba(249, 192, 127, 0.75);
  transition: all 0.3s ease-in;
}

.area-infra:hover {
  background-color: rgba(249, 192, 127, 1);
  transition: all 0.3s ease-in;
}

.area-direct {
  font-size: 87.5%;
  background-color: rgba(250, 176, 153, 0.75);
  transition: all 0.3s ease-in;
}

.area-direct:hover {
  background-color: rgba(250, 176, 153, 1);
  transition: all 0.3s ease-in;
}

.area-smart {
  font-size: 87.5%;
  /* background-color: #96C78F; */
  background-color: rgba(150, 199, 143, 0.75);
  transition: all 0.3s ease-in;
}

.area-smart:hover {
  background-color: rgba(150, 199, 143, 1);
  transition: all 0.3s ease-in;
}

html,
input,
select {
  background-color: var(--main-bg-color);
}

[v-cloak] {
  visibility: hidden;
}

body {
  width: 100%;
  margin: auto;
  overflow-x: hidden;
}

a,
.footnote {
  color: var(--link-color);
  text-decoration: none;
  transition: all 0.3s ease-in;
}

a:hover {
  color: var(--emphasis);
  transition: all 0.3s ease-in;
}

button:hover {
  cursor: pointer;
}

#container {
  width: 100%;
  margin: 0 auto;
}

#hero-section {
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  height: 100vh;
  /* overflow: hidden; */
  background-image: url(./assets/images/hero.png);
  background-size: contain;
  background-size: 65%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  /* background-position: 155% 50%; */
  background-position: 95% 35%;
}

.tip-band-hero {
  /* position: absolute; */
  /* top: 0; */
  /* left: 0; */
  width: 10%;
  height: 4px;
  border-radius: 4px 4px 0px 0px;
  /* background-color: var(--active-tip); */
  background-color: var(--main-body-type);
}

#title-grad-top {
  background: linear-gradient(0deg, rgba(239, 248, 255, 0), rgb(239, 248, 255));
  height: 20vh;
  width: 100vw;
}

#title {
  margin-left: 4rem;
  padding: 33rem 2rem 2rem 2rem;
  /* width: 47.5%; */
  height: 50vh;
}

#title h5 {
  width: 55%;
}
#title-grad-bottom {
  background: linear-gradient(0deg, rgb(239, 248, 255), rgba(239, 248, 255, 0));
  height: 30vh;
  width: 100vw;
}

.blue {
  -webkit-animation: blue-cycle 4s infinite ease-in-out;
  -moz-animation: blue-cycle 4s infinite ease-in-out;
  animation: blue-cycle 4s infinite ease-in-out;
}

/* blue text color change animation */
@-webkit-keyframes blue-cycle {
  0%,
  100% {
    color: #0b519b;
  }
  25% {
    color: #3184bf;
  }
  50% {
    color: #6aacd3;
  }
  75% {
    color: #9dc9e1;
  }
}
@-moz-keyframes blue-cycle {
  0%,
  100% {
    color: #0b519b;
  }
  25% {
    color: #3184bf;
  }
  50% {
    color: #6aacd3;
  }
  75% {
    color: #9dc9e1;
  }
}
@keyframes blue-cycle {
  0%,
  100% {
    color: #0b519b;
  }
  25% {
    color: #3184bf;
  }
  50% {
    color: #6aacd3;
  }
  75% {
    color: #9dc9e1;
  }
}

.main-header {
  margin-bottom: 0;
}

.subtitle {
  opacity: 0.75;
}

#byline {
  font-weight: 400;
  opacity: 0.85;
}

.section-break {
  width: 87.5%;
  max-width: 750px;
  margin: 0 auto;
  padding-top: 16rem;
  padding-bottom: 10rem;
}

.section-break:last-of-type {
  padding-top: 22rem;
}

.section-tag-line {
  /* border-top: 1px solid #757575; */
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  width: 100%;
}

.section-tag-text {
  width: 100%;
  position: relative;
  top: -5.25rem;
}

.section-tag-text h4 {
  text-align: center;
  text-transform: uppercase;
  width: 25rem;
  margin: 0 auto;
  /* color: #fff; */
  /* background-color: var(--map-bg-color); */
  background-color: var(--main-bg-color);
  border-radius: 16px;
  border: 8px solid var(--main-bg-color);
}

.section-break h6 {
  margin: 0;
  opacity: 0.75;
  text-align: center;
  text-transform: uppercase;
}

.section-break > .body-text {
  margin: 1rem 5rem 8rem 5rem;
}

.section-break:last-of-type > div {
  padding-bottom: 2rem;
}

#final {
  margin-bottom: 0;
}

/* footer */
hr.footer {
  width: 100%;
  margin-bottom: 0px;
  opacity: 1;
}
.footnotes {
  opacity: 0.75;
  font-size: 75%;
  width: 87.5%;
  max-width: 750px;
  margin: 0 auto;
  padding-bottom: 5rem;
}

/* tooltip */
div.tooltip {
  position: fixed;
  max-width: 350px;
  text-align: left;
  /* display: inline; */
  padding: 10px;
  font-size: 1.5rem;
  /* font-size: 1rem; */
  line-height: 1.2;
  background-color: #fff;
  border: 0px;
  border-radius: 6px;
  pointer-events: none;
  color: var(--main-body-type);
  filter: drop-shadow(0px 2px 8px rgba(59, 59, 61, 0.4));
  z-index: 1;
}

.tip-band {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  border-radius: 4px 4px 0px 0px;
  /* background-color: var(--active-tip); */
  background-color: var(--main-body-type);
}
.active-tip {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  border-radius: 4px 4px 0px 0px;
  background-color: var(--active-tip);
}

.tooltip h5 {
  padding: 0;
  margin-top: 0.2rem;
  /* line-height: 0; */
  /* margin-bottom: 1.2rem; */
}

.sub-head-tip {
  margin-top: -2rem;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  opacity: 0.7;
  margin-bottom: 0.75rem;
}

.data-pair {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.data-pair p {
  font-weight: 700;
  font-family: "IBM Plex Mono", monospace;
}

.data-pair:last-of-type p {
  margin-bottom: 0;
}
/* tooltiptag */
.tip-tag {
  padding: 0.4rem 0.75rem 0.5rem 0.75rem;
  border-radius: 4px;
  font-family: "IBM Plex Mono", monospace;
  border: 1px solid #fff;
  margin-right: 3rem;
  transition: all 0.2s ease-in-out;
  width: 100%;
}

/* normal tags */
.tag {
  display: inline-block;
  padding: 0.4rem 0.75rem 0.5rem 0.75rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  font-family: "IBM Plex Mono", monospace;
  border: 1px solid var(--main-bg-color);
  transition: all 0.2s ease-in-out;
}

.tag:hover {
  filter: drop-shadow(0px 2px 4px rgba(59, 59, 61, 0.15));
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease-in-out;
}

/* tags in paragraph */
.tag-intext {
  margin: 0;
}

/* global utilities */
.fix-me {
  /* used in development */
  color: red;
  border: 1px solid red;
}
.datum {
  font-weight: 700;
}
.total {
  /* border-bottom: 2px solid rgba(0, 0, 0, 0.8); */
  font-weight: 600;
}

.special {
  color: var(--special);
}

.special-background {
  background-color: var(--special);
}

.pull-right {
  text-align: right;
}

.pull-left {
  text-align: left;
}

table {
  width: 100%;
}

.play-button {
  border-radius: 4px;
  border-color: #fff;
  background: transparent;
  margin-top: 2rem;
  padding: 1rem;
  padding-bottom: 0.75rem;
}

.play-button::after {
  content: url("./assets/icons/play_button.svg");
  text-align: right;
  width: 18px;
  float: right;
  margin-top: 0.175rem;
  margin-left: 0.75rem;
  white-space: nowrap;
}

.play-button:hover {
  background-color: var(--special);
}

/* global: hide mapbox controls/ */
.mapboxgl-control-container {
  visibility: hidden;
}

/* axis formatting */
.gridlines .domain {
  display: none;
  opacity: 0;
}

.gridlines {
  opacity: 0.3;
  /* stroke-dasharray: 2; */
}
#chart-one .domain {
  opacity: 0;
}
.y-axis .tick line,
.x-axis .tick line {
  opacity: 0;
}
.x-axis {
  height: 100px;
}
.grid .tick line {
  stroke: #707070;
  opacity: 0.3;
}

/* chart three grid */
#chart-three .grid-three g.tick line {
  opacity: 0.3;
}

#chart-three .x-axis .tick line {
  opacity: 1;
}

#mini-chart .grid .domain {
  opacity: 0;
}

#mini-chart .y-axis > path {
  opacity: 0;
}

#mini-chart .x-axis > path {
  opacity: 0.5;
}

/* slider overrides based on category */
.infra .vue-slider-dot-handle {
  background-color: #f9c07f;
}

.infra .vue-slider-dot-handle::after {
  background-color: rgba(249, 192, 127, 0.4);
}

.virtual .vue-slider-dot-handle {
  background-color: #8fa4c8;
}

.virtual .vue-slider-dot-handle::after {
  background-color: rgba(143, 164, 200, 0.4);
}

.smart .vue-slider-dot-handle {
  background-color: #96c78f;
}

.smart .vue-slider-dot-handle::after {
  background-color: rgba(150, 199, 143, 0.4);
}

.direct .vue-slider-dot-handle {
  background-color: #fab099;
}

.direct .vue-slider-dot-handle::after {
  background-color: rgba(250, 176, 153, 0.4);
}

/* slider middle marks reset default color */
.vue-slider-marks div:nth-of-type(2) .vue-slider-mark-label {
  color: var(--reset);
}

.vue-slider-marks div:nth-of-type(2) .vue-slider-mark-step {
  background-color: #83888c;
}
</style>
