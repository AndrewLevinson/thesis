<template>
  <div id="app">
    <div id="container">
      <section id="first-section">
        <div id="title-grad-top"></div>
        <div id="title" v-cloak>
          <h2 class="main-header">{{ title }}</h2>
          <h5 class="subtitle">{{ subTitle }}</h5>
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
            Day Zero is often referred to as the day the water taps turn off. Once
            seen as a remote scenario, water conservation is taken more seriously
            now—especially after the crisis in
            <a
              href="#"
            >Cape Town</a> and other extreme water
            stress events across the globe.
          </p>
          <p>
            While an actual Day Zero is unlikely in the United States, we are
            seeing high water stress events across the country due to crumbling
            infrastructure, over-abstraction in of aquifers in agriculture, and
            climate change that are cause for alarm.
          </p>
          <p>
            If we do not take action to conserve water at a much more extreme
            rate, a Day Zero scenario in the US becomes more plausible.
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
          <p>While the widthdrawals show a broad picture of the US, since water issues are laregly local, it's critical to take a look at water usage at a micro level.</p>
        </div>
      </section>
      <!-- topo d3 map for water usage -->
      <!-- <CountyMap/> -->

      <!-- <section class="section-break">
        <div>
          <h5>It’s happening closer than you think</h5>
          <p>
            This is not just a global issue. A closer look at water stressed
            areas in the United States are indications of more extreme events to
            come if we do not consider rapid change through conservation efforts
            as well as investments in infrastructure, agriculture technology,
            and climate policies.
          </p>
        </div>
      </section>-->

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
          <p>
            While climate change is the biggest threat to available freshwater
            that requires the largest long-term investment, crumbling
            infrastructure, over-abstraction, and pollution all contribute
            significantly to a decline in supply.
          </p>
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
          <p id="final">
            This is not an all or nothing approach. While destination efforts and water rationing is occurring throughout the world, it’s important that we take the time to make changes now so we can make time for the larger conversations.
            <br>
            <br>Growing populations, climate change, and diet patterns are all massive issues that we will need to deal with over the coming generations. Certain cities will be unlivable, our diets will become unsustainable, and we’ll need to deal with tough realities ahead.
            <br>
            <br>By making the investment in repairing infrastructure, setting up baseline climate policies, and smarter farming, we can delay extreme water stress scenarios long enough to deal with the long term global redistribution of water.
          </p>
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
        <p>Data was collected using the</p>
        <p>
          The scroll events were made possible by use of the
          <a
            href="https://github.com/1wheel/graph-scroll"
            target="_blank"
          >graph-scroll.js</a>
          JavaScript library.
        </p>
        <p>Footnotes:</p>
        <ol>
          <li></li>
          <li></li>
          <li></li>
        </ol>
        <p>Sources:</p>
        <ol>
          <li></li>

          <li></li>
          <li></li>
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
    return {
      title: "The United States Water Crisis",
      subTitle:
        "Mitigating increasing demand and changes in the natural water cycle"
    };
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
  overflow-x: hidden;
  margin: auto;
}

a {
  color: var(--link-color);
  text-decoration: none;
  transition: all 0.3s ease-in;
}
a:hover {
  color: var(--emphasis);
  transition: all 0.3s ease-in;
}

#container {
  width: 100%;
  margin: 0 auto;
}

#first-section {
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  height: 100vh;
  overflow: hidden;
  background-image: url(./assets/images/hero2.png);
  background-size: contain;
  background-size: 70%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: 155% 50%;
}

#title-grad-top {
  background: linear-gradient(0deg, rgba(239, 248, 255, 0), rgb(239, 248, 255));
  height: 20vh;
  width: 100vw;
}

#title {
  margin-left: 4rem;
  padding: 12rem 2rem 2rem 2rem;
  width: 47.5%;
  height: 50vh;
}

#title-grad-bottom {
  background: linear-gradient(0deg, rgb(239, 248, 255), rgba(239, 248, 255, 0));
  height: 30vh;
  width: 100vw;
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
  width: 50%;
  margin: 0 auto;
  padding-top: 16rem;
  padding-bottom: 10rem;
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
  width: 50%;
  margin: 0 auto;
  padding-bottom: 3rem;
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

#tip-band {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10px;
  border-radius: 4px 4px 0px 0px;
  /* background-color: var(--active-tip); */
  background-color: var(--main-body-type);
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
.datum {
  font-weight: bold;
}
.total {
  /* border-bottom: 2px solid rgba(0, 0, 0, 0.8); */
  font-weight: 600;
}

.data-pair {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.data-pair p {
  /* font-weight: bold; */
  font-family: "IBM Plex Mono", monospace;
}

.data-pair:last-of-type p {
  margin-bottom: 0;
}

.tip-tag {
  padding: 0.4rem 0.75rem 0.5rem 0.75rem;
  border-radius: 4px;
  font-family: "IBM Plex Mono", monospace;
  border: 1px solid #fff;
  margin-right: 3rem;
  transition: all 0.2s ease-in-out;
}

/* hide mapbox controls/ */
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

caption {
  width: 200px;
  font-size: 80%;
  opacity: 0.8;
}

/* chart three grid */
#chart-three .grid-three g.tick line {
  opacity: 0.3;
}

#chart-three .x-axis .tick line {
  opacity: 1;
}
</style>
