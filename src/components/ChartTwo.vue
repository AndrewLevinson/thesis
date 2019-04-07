<template>
  <div id="chart-two">
    <div id="map">
      <!-- map goes here -->
    </div>
    <section class="text-section">
      <div class="text-box section-two">
        <h5 class="box-title">Current Water Stress in the United States</h5>
        <p>
          Throughout the country we have already seen increasing water
          stress due to a number of different factors. These issues are
          isolated a local, but are a sign of things to come with inaction.
        </p>
      </div>
      <div class="text-box section-two">
        <h5 class="box-title">A look at California's Drought</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
          doloremque laudantium corrupti sapiente quae suscipit id
          cupiditate eius sint necessitatibus debitis nam voluptatibus
          animi, error fugiat distinctio provident nesciunt. Necessitatibus
          possimus reprehenderit asperiores ea rerum consequatur et
          voluptatum. Deserunt quos dolor consequatur molestias ipsam
          voluptatibus consequuntur alias unde architecto est.
        </p>
      </div>
    </section>
  </div>
</template>

<script>
// import * as d3 from "d3";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

export default {
  name: "chart-two",
  data() {
    return {};
  },
  mounted() {
    this.loadMap();
  },
  methods: {
    loadMap() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiYW5kcmV3bGV2aW5zb24iLCJhIjoiY2pub3RxNXB2MDA5cTNxb2M5MjNoaHl5diJ9.Zq4eS5UJd_60fgNBAFiUsw";
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/andrewlevinson/cjstjg8ol7gc61gqgdxnvggsp",
        center: [-98.461045, 36.805969],
        zoom: 2.0
      });

      map.scrollZoom.disable();

      // map.flyTo({
      //   center: [0, 0],
      //   zoom: 9,
      //   speed: 0.2,
      //   curve: 1,
      //   easing(t) {
      //     return t;
      //   }
      // });
    }
  }
};
</script>

<style scoped>
</style>