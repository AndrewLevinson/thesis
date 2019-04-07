<template>
  <div id="chart-two">
    <div id="map">
      <!-- map goes here -->
    </div>
    <section class="text-section" id="sections">
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
      <div class="text-box section-two">
        <h5 class="box-title">Third Text Box</h5>
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
import * as d3 from "d3";
import { graphScroll } from "graph-scroll";
import mapboxgl from "mapbox-gl";
// const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

export default {
  name: "chart-two",
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.loadMap();
    this.scrollTrigger();
  },
  methods: {
    loadMap() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiYW5kcmV3bGV2aW5zb24iLCJhIjoiY2pub3RxNXB2MDA5cTNxb2M5MjNoaHl5diJ9.Zq4eS5UJd_60fgNBAFiUsw";
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/andrewlevinson/cjstjg8ol7gc61gqgdxnvggsp",
        center: [-98.461045, 36.805969],
        zoom: 2.0
      });

      this.map.scrollZoom.disable();
    },
    scrollTrigger() {
      graphScroll()
        .offset(100)
        .graph(d3.selectAll("#map"))
        .container(d3.select("#chart-two"))
        .sections(d3.selectAll("#sections > div"))
        .eventId("uniqueId2")
        .on("active", i => {
          // console.log(this);
          switch (i) {
            case 0:
              // offscreen so do nothing
              console.log("active! 0");
              break;
            case 1:
              console.log("active! 1");

              this.map.flyTo({
                center: [18.2812, 4.0], // africa
                zoom: 2.2
              });
              break;
            case 2:
              console.log("active! 2");

              // position
              this.map.flyTo({
                center: [18.2812, 4.0], // africa
                zoom: 9.2
              });
              break;
            case 3:
              break;
            case 4:
              break;
            case 5:
              break;
            default:
              console.log("none");
              break;
          }
        });
    }
  }
};
</script>

<style scoped>
#sections > div {
  opacity: 0.3;
}

#sections div.graph-scroll-active {
  opacity: 1;
}
</style>