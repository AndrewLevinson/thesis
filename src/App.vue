<template>
  <div id="app">
    <div id="container">
      <section id="first-section">
        <div id="title" v-cloak>
          <h2 class="main-header">{{ title }}</h2>
          <h5 class="subtitle">{{ subTitle }}</h5>
          <p id="byline">
            <a href="https://andrewlevinson.me" target="_blank">Andrew Levinson</a> | May 2019
          </p>
          <!-- <div class="intro">
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
          </div>-->
        </div>
        <!-- <div id="hero-holder">
          <img
            src="./assets/images/hero.png"
            alt="map of US with waterways highlighted"
            width="100%"
          >
        </div>-->
      </section>
      <section class="section-break">
        <div>
          <h6>Part 1</h6>
          <h5>Background</h5>

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
        <div>
          <h5>How is water usage distributed across the country?</h5>
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
        <div>
          <h5>What can we do right now?</h5>
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
        <div>
          <h5>Final Thoughts</h5>
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
// Vue.directive("scroll", {
//   inserted: function(el, binding) {
//     let f = function(evt) {
//       if (binding.value(evt, el)) {
//         window.removeEventListener("scroll", f);
//       }
//     };
//     window.addEventListener("scroll", f);
//   }
// });

import ChartOne from "./components/ChartOne.vue";
// import SideBar from "./components/SideBar.vue";
import ChartTwo from "./components/ChartTwo.vue";
import ChartThree from "./components/ChartThree.vue";
// import CountyMap from "./components/CountyMap.vue";
// import * as d3 from "d3";

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
}
a:hover {
  color: var(--emphasis);
  transition: all 0.3s ease-in;
}

#container {
  width: 100%;
  /* padding-top: 2rem; */
  margin: 0 auto;
}

#first-section {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  /* padding: 12rem 4rem 12rem 4rem; */
  /* padding: 8rem; */
  background-image: url(./assets/images/hero.png);
  /* background-size: contain; */
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: right top;
  overflow: hidden;
  flex: 1 1 0%;
  height: 100vh;
  color: #fff;
}

#title {
  margin-left: 4rem;
  padding: 2rem;
  /* text-align: center; */
  /* padding-left: 4rem; */
  width: 47.5%;
  background-color: rgba(0, 0, 0, 0.55);
  border-radius: 8px;
  filter: drop-shadow(0px 2px 4px rgba(59, 59, 61, 0.2));
  /* padding-right: 2.5%; */
}

/* #hero-holder {
  width: 47.5%;
  height: 100%;
}
#hero-holder > img {
  border-radius: 8px;
  filter: drop-shadow(0px 2px 4px rgba(59, 59, 61, 0.2));
} */

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

.intro {
  /* width: 90%; */
  margin-top: 0.5rem;
  /* margin: 0 auto; */
  /* padding-bottom: 7rem; */
}

.intro p {
  /* width: 80%; */
}

.section-break {
  width: 50%;
  margin: 0 auto;
  padding-top: 8rem;
  padding-bottom: 10rem;
  text-align: center;
}

.section-break h5 {
  text-align: center;
}

.section-break > div {
  padding-top: 9rem;
  padding-bottom: 9rem;
  border-top: 2px solid rgba(0, 0, 0, 0.2);
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 4;
}

.section-break:last-of-type > div {
  border-bottom: none;
  padding-bottom: 2rem;
}

#final {
  text-align: left;
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
}

.tooltip h5 {
  padding: 0;
  margin-top: 0.2rem;
  /* line-height: 0; */
  /* margin-bottom: 1.2rem; */
}
.datum {
  font-weight: bold;
  /* border-bottom: 2px dashed #3d3d3d; */
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
