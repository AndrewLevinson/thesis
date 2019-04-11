<template>
  <div id="chart-two">
    <div id="map">
      <!-- map goes here -->
    </div>
    <section class="text-section" id="sectionsTwo">
      <div class="text-box">
        <h5 class="box-title">Current Water Stress in the United States</h5>
        <p>
          Throughout the country we have already seen increasing water
          stress due to a number of different factors. These issues are
          isolated a local, but are a sign of things to come with inaction.
        </p>
      </div>
      <div class="text-box">
        <h5 class="box-title">Drought: American Southwest</h5>
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
      <div class="text-box">
        <h5 class="box-title">Groundwater Overabstraction: Chicago</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
          doloremque laudantium corrupti sapiente quae suscipit id
          cupiditate eius sint necessitatibus debitis nam voluptatibus
          animi, error fugiat distinctio provident nesciunt. Necessitatibus
          possimus
        </p>
      </div>
      <div class="text-box">
        <h5 class="box-title">Groundwater Overabstraction: Florida Everglades</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
          doloremque laudantium corrupti sapiente quae suscipit id
          cupiditate eius sint necessitatibus debitis nam voluptatibus
          animi, error fugiat distinctio provident nesciunt. Necessitatibus
          possimus
        </p>
      </div>
      <div class="text-box">
        <h5 class="box-title">Groundwater Overabstraction: The High Plains (Ogallala Aquifer)</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
          doloremque laudantium corrupti sapiente quae suscipit id
          cupiditate eius sint necessitatibus debitis nam voluptatibus
          animi, error fugiat distinctio provident nesciunt. Necessitatibus
          possimus
        </p>
      </div>
      <div class="text-box">
        <h5 class="box-title">Drinking Water Infrastructure: the entire US</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
          doloremque laudantium corrupti sapiente quae suscipit id
          cupiditate eius sint necessitatibus debitis nam voluptatibus
          animi, error fugiat distinctio provident nesciunt. Necessitatibus
          possimus
        </p>
      </div>
      <div class="text-box">
        <h5 class="box-title">Contamination: the Northeast</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
          doloremque laudantium corrupti sapiente quae suscipit id
          cupiditate eius sint necessitatibus debitis nam voluptatibus
          animi, error fugiat distinctio provident nesciunt. Necessitatibus
          possimus
        </p>
      </div>
      <div class="text-box">
        <h5 class="box-title">Contamination: Flint, Michigan</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
          doloremque laudantium corrupti sapiente quae suscipit id
          cupiditate eius sint necessitatibus debitis nam voluptatibus
          animi, error fugiat distinctio provident nesciunt. Necessitatibus
          possimus
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
      map: null,
      geojson: null
    };
  },
  mounted() {
    this.loadMap();
    this.loadData();
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
        zoom: 2,
        interactive: false
      });

      // this.map.scrollZoom.disable();
    },
    loadData() {
      d3.json("data/clean/us.geojson")
        .then(geojson => {
          this.geojson = geojson;
        })
        .then(() => {
          console.log(this.geojson);
          this.buildMap();
        });
    },
    buildMap() {},
    scrollTrigger() {
      graphScroll()
        .offset(225)
        .graph(d3.selectAll("#map"))
        .container(d3.select("#chart-two"))
        .sections(d3.selectAll("#sectionsTwo > div"))
        .eventId("uniqueId2")
        .on("active", i => {
          // console.log(this);
          switch (i) {
            case 0:
              console.log("active! 0");
              // offscreen so do nothing
              // reset original map point
              this.map.flyTo({
                center: [-98.461045, 36.805969], // whole US zoomed in
                zoom: 3.5
              });
              break;
            case 1:
              console.log("active! 1");
              this.map.flyTo({
                center: [-118.2437, 34.0522], // southern cali
                zoom: 5.5
              });
              break;
            case 2:
              console.log("active! 2");

              // position
              this.map.flyTo({
                center: [-87.623177, 41.881832], // chicago
                zoom: 5.5
              });
              break;
            case 3:
              console.log("active! 3");
              // position
              this.map.flyTo({
                center: [-81.385071, 25.858244], // everglades
                zoom: 5.5
              });
              break;
            case 4:
              console.log("active! 4");
              // position
              this.map.flyTo({
                center: [-101.263119, 36.591559], // ogallala acquifer
                zoom: 5.5
              });
              break;
            case 5:
              console.log("active! 5");
              // position
              this.map.flyTo({
                center: [-98.461045, 36.805969], // whole US zoomed in, infrastructure
                zoom: 3.5
              });
              break;
            case 6:
              console.log("active! 6");
              // position
              this.map.flyTo({
                center: [-73.935242, 40.7128], // northeast (NYC)
                zoom: 5.5
              });
              break;
            case 7:
              console.log("active! 7");
              // position
              this.map.flyTo({
                center: [-83.705521, 43.0125], // flint
                zoom: 7.5
              });
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
#chart-two {
  background-color: var(--map-bg-color);
}
/* text */
.text-section {
  padding-bottom: 20rem;
  z-index: 999;
  font-size: 90%;
}
.text-box {
  /* transition: 1.5s all cubic-bezier(0.39, 0.575, 0.565, 1); */
  width: 45%;
  max-width: 800px;
  padding: 1.25rem 1.75rem 1.5rem 1.75rem;
  margin: 0 auto;
  margin-bottom: 60rem;
  z-index: 999;
  border-radius: 4px;
  opacity: 0.925;
  filter: drop-shadow(0px 2px 4px rgba(59, 59, 61, 0.4));
  /* unique to section two */
  background-color: var(--map-bg-color);
  color: #fff;
  border: 1px solid rgb(112, 112, 112, 0.2);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
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
/* text - graph-scroll */
#sectionsTwo > div {
  z-index: 999;

  opacity: 0.3;
}

#sectionsTwo div.graph-scroll-active {
  z-index: 999;

  opacity: 1;
}

/* map */
#map {
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
  width: 100vw;
  height: 100vh;
}
</style>