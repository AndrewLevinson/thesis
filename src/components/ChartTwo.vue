<template>
  <div id="chart-two">
    <div id="map">
      <SideBar :scrollPosition="scrollPosition"/>
      <div id="my-map">
        <!-- map goes here -->
      </div>
    </div>
    <section class="text-section" id="sectionsTwo">
      <div class="text-box">
        <h5 class="box-title">Freshwater Withdrawals Per Capita</h5>
        <p>The west withdraws much more water than most of the country mostly for irrigation and agriculture.</p>
      </div>
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
import SideBar from "./SideBar.vue";

import * as d3 from "d3";
import { graphScroll } from "graph-scroll";
import mapboxgl from "mapbox-gl";

export default {
  name: "chart-two",
  components: { SideBar },
  data() {
    return {
      map: null,
      scrollPosition: null
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
        container: "my-map",
        style: "mapbox://styles/andrewlevinson/cjulygwif39c51fqua8xj3u4m",
        center: [-98.461045, 36.805969],
        zoom: 2.5,
        interactive: false,
        paint: {
          "fill-opacity": 1,
          "fill-opacity-transition": {
            duration: 200
          }
        }
      }).on("load", () => {
        this.resetMapLayers(0);
        this.scrollTrigger();

        // this.map.removeLayer("revisedcounties-2");
      });
    },
    resetMapLayers(x) {
      const allLayers = this.map.getStyle().layers;
      for (const i of allLayers) {
        if (x === 0) {
          if (i.id != "revisedcounties-2") {
            this.map.setLayoutProperty(i.id, "visibility", "none");
          }
          // reset opacity to full 1
          this.map.setPaintProperty("revisedcounties-2", "fill-opacity", 1);
        } else {
          this.map.setPaintProperty("revisedcounties-2", "fill-opacity", 0.3);
          this.map.setLayoutProperty(i.id, "visibility", "visible");
        }
      }
    },

    scrollTrigger() {
      graphScroll()
        .offset(225)
        .graph(d3.selectAll("#map"))
        .container(d3.select("#chart-two"))
        .sections(d3.selectAll("#sectionsTwo > div"))
        .eventId("uniqueId2")
        .on("active", i => {
          // console.log(this);
          this.scrollPosition = i;
          console.log("active!", i);
          switch (i) {
            case 0:
              // offscreen so do nothing
              // reset original map point
              this.map.flyTo({
                center: [-98.461045, 38], // whole US zoomed in
                zoom: 3.8
              });
              this.resetMapLayers(i);
              break;

            case 1:
              // reset original map point
              this.map.flyTo({
                center: [-98.461045, 38], // whole US zoomed in
                zoom: 3.8
              });
              this.resetMapLayers(i);
              break;
            case 2:
              this.map.flyTo({
                center: [-118.2437, 34.0522], // southern cali
                zoom: 5.5
              });
              break;
            case 3:
              // position
              this.map.flyTo({
                center: [-87.623177, 41.881832], // chicago
                zoom: 5.5
              });
              break;
            case 4:
              // position
              this.map.flyTo({
                center: [-81.385071, 25.858244], // everglades
                zoom: 5.5
              });
              break;
            case 5:
              // position
              this.map.flyTo({
                center: [-101.263119, 36.591559], // ogallala acquifer
                zoom: 5.5
              });
              break;
            case 6:
              // position
              this.map.flyTo({
                center: [-98.461045, 36.805969], // whole US zoomed in, infrastructure
                zoom: 3.5
              });
              break;
            case 7:
              // position
              this.map.flyTo({
                center: [-73.935242, 40.7128], // northeast (NYC)
                zoom: 5.5
              });
              break;
            case 8:
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
  /* background-color: var(--map-bg-color); */
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
  /* margin: 0 auto; */
  margin-left: 5rem;
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

.text-box:first-of-type,
.text-box:nth-of-type(2) {
  /* transition: 1.5s all cubic-bezier(0.39, 0.575, 0.565, 1); */
  width: 45%;
  max-width: 600px;
  padding: 1.25rem 1.75rem 1.5rem 1.75rem;
  margin: 0 auto;
  margin-bottom: 60rem;
  /* z-index: 999; */
  border-radius: 4px;
  opacity: 0.925;
  filter: drop-shadow(0px 2px 4px rgba(59, 59, 61, 0.2));
  /* unique to chart one */
  background-color: var(--main-bg-color);
  color: var(--main-body-type);
  border: 1px solid rgba(112, 112, 112, 0.33);
}

.text-box:nth-of-type(2) {
  background-color: var(--map-bg-color);
  color: #fff;
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
#my-map {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: none;
}
</style>