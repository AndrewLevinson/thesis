<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->

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
          <h5>It’s happening closer than you think</h5>
          <p>
            This is not just a global issue. A closer look at water stressed
            areas in the United States are indications of more extreme events to
            come if we do not consider rapid change through conservation efforts
            as well as investments in infrastructure, agriculture technology,
            and climate policies.
          </p>
        </div>
      </section>

      <!-- add chart two -- map -- component -->
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
import ChartTwo from "./components/ChartTwo.vue";
import ChartThree from "./components/ChartThree.vue";
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
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
