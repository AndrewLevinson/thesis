<template>
  <div id="app">
    <div id="container">
      <div id="title" v-cloak>
        <h2>{{ title }}</h2>
        <h5>{{ subTitle }}</h5>
      </div>
      <div class="intro">
        <p>
          Day Zero is often referred to as the day the water taps turn off. Once
          seen as a remote scenario, water conservation is taken more seriously
          now—especially after the crisis in Cape Town and other extreme water
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
import SideBar from "./components/SideBar.vue";
import ChartTwo from "./components/ChartTwo.vue";
import ChartThree from "./components/ChartThree.vue";
import CountyMap from "./components/CountyMap.vue";
// import * as d3 from "d3";

export default {
  name: "app",
  components: {
    ChartOne,
    SideBar,
    ChartTwo,
    ChartThree,
    CountyMap
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
.mapboxgl-canvas {
  /* background-color: none; */
}
/* global style */
:root {
  --main-bg-color: #eff8ff;
  --map-bg-color: #343332;
  --main-body-type: #0f242c;
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
  /* overflow-x: hidden; */
  margin: auto;
}

#container {
  width: 100%;
  padding-top: 2rem;
  margin: 0 auto;
}

#title {
  padding: 7rem 0 4rem 0;
  text-align: center;
}

#title > h2 {
  margin-bottom: 0;
}

#title > h5 {
  opacity: 0.75;
}

.intro {
  width: 40%;
  margin: 0 auto;
  padding-bottom: 7rem;
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

/* tooltip */
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

/* axis formatting */
.domain {
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
</style>
