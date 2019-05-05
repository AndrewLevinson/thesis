<template>
  <div id="chart-two">
    <div id="map">
      <SideBar
        :scrollPosition="scrollPosition"
        :places="places"
        :currentState="currentState"
        :currentRepair="currentRepair"
        v-on:playingSideBar="playingSideBar"
      />
      <div v-show="$store.getters.playing" id="repair-box">
        <h5 class="total">{{ currentState }}</h5>
        <p class="datum special">{{ numFormater(currentRepair) }}</p>
        <button @click="skipToEnd">Skip to End</button>
      </div>
      <div id="my-map" :class="[scrollPosition == 0 ? 'visible-background' : 'hidden-background']">
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
        <h5 class="box-title">Colorado River Basin</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
          doloremque laudantium corrupti sapiente quae suscipit id
          cupiditate eius sint necessitatibus debitis nam voluptatibus
          animi, error fugiat distinctio provident nesciunt.
        </p>
      </div>
      <div class="text-box">
        <h5 class="box-title">Southern California Pricing Tiers</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
          doloremque laudantium corrupti sapiente quae suscipit id
          cupiditate eius sint necessitatibus debitis nam voluptatibus
          animi, error fugiat distinctio provident nesciunt. Necessitatibus
          possimus
        </p>
      </div>
      <div class="text-box">
        <h5 class="box-title">The High Plains (Ogallala Aquifer)</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
          doloremque laudantium corrupti sapiente quae suscipit id
          cupiditate eius sint necessitatibus debitis nam voluptatibus
          animi, error fugiat distinctio provident nesciunt. Necessitatibus
          possimus
        </p>
      </div>
      <div class="text-box">
        <h5 class="box-title">Florida Everglades</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
          doloremque laudantium corrupti sapiente quae suscipit id
          cupiditate eius sint necessitatibus debitis nam voluptatibus
          animi, error fugiat distinctio provident nesciunt. Necessitatibus
          possimus
        </p>
      </div>

      <div
        :id="[$store.getters.playing || $store.getters.finished ? 'playing' : 'not-playing']"
        class="text-box"
      >
        <div>
          <h5 class="box-title">Drinking Water Infrastructure: the entire US</h5>
          <p>Infrastructure repair needs in the US have skyrocketed in the last 50 years. Play the animation below to see the total investment required to improve our drinking water infrastructure for each state:</p>
          <div class="player">
            <button
              v-if="!$store.getters.playing"
              @click="play(true)"
              class="play-button"
            >Play Animation</button>
            <button v-else @click="play(false)" class="play-button">Stop Animation</button>
          </div>
        </div>
      </div>
      <div class="text-box">
        <h5 class="box-title">Northeast Combined Sewers</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
          doloremque laudantium corrupti sapiente quae suscipit id
          cupiditate eius sint necessitatibus debitis nam voluptatibus
          animi, error fugiat distinctio provident nesciunt. Necessitatibus
          possimus
        </p>
      </div>
      <div class="text-box">
        <h5 class="box-title">Flint, Michigan</h5>
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
      scrollPosition: null,
      currentState: null,
      currentRepair: null,
      adjust: 0,
      places: [{}]
    };
  },
  mounted() {
    this.loadMap();
    this.loadData();
    // this.scrollTrigger();
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
            duration: 300
          }
        }
      }).on("load", () => {
        this.map.addSource("states", {
          type: "geojson",
          data: "https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson"
        });

        this.map.addLayer({
          id: "state-fills",
          type: "fill",
          source: "states",
          layout: {},
          paint: {
            "fill-color": "#45b8cd",
            "fill-opacity": [
              "case",
              ["boolean", ["feature-state", "hover"], false],
              0.5,
              0
            ]
          }
        });
        this.setMapLayers(0);
        this.scrollTrigger();
      });
    },
    loadData() {
      d3.csv("data/clean/drinking.csv", d => {
        return {
          state: d["State"],
          id: +d["Id"],
          lng: +d["lng"],
          lat: +d["lat"],
          repair: +d["Total"],
          partial: d["Partial"]
        };
      }).then(d => {
        return (this.places = d);
      });
    },
    numFormater(el) {
      const numFormatT = d3.format(",.2f");
      return `$ ${numFormatT(el / 1000)} Billion`;
    },
    play(is) {
      this.$store.commit("updatePlaying", is);
      this.infraAnimate();
    },
    playingSideBar(is) {
      this.play(is);
    },
    skipToEnd() {
      this.$store.commit("updatePlaying", false);
      this.$store.commit("finishedPlaying", true);
      this.map.flyTo({
        center: [-98.461045 + 16, 38],
        zoom: 3.45
      });
    },
    setMapLayers(x) {
      const allLayers = this.map.getStyle().layers;

      if (x === 0) {
        for (const i of allLayers) {
          if (i.id != "revisedcounties-2" && i.id != "us-states") {
            // && i.id != "settlement-label"
            // hide everything that isn't county water heatmap
            this.map.setLayoutProperty(i.id, "visibility", "none");
          }
        }
        // county water heatmap and states outlines full opacity
        this.map.setPaintProperty("revisedcounties-2", "fill-opacity", 1);
        this.map.setPaintProperty("us-states", "fill-opacity", 1);
      } else if (x === 1) {
        for (const i of allLayers) {
          // make everything visible
          this.map.setLayoutProperty(i.id, "visibility", "visible");
        }
        // v low opacity for county map - should maybe just hide?
        this.map.setPaintProperty("revisedcounties-2", "fill-opacity", 0.15);
        this.map.setPaintProperty("us-states", "fill-opacity", 0.15);

        // low opacity when looking at entire country and markers shown
        this.map.setPaintProperty("base-org-dxzfkf", "fill-opacity", 0.4);
        this.map.setPaintProperty("highplains-5hedlf", "fill-opacity", 0.4);
        this.map.setPaintProperty("crbasin", "fill-opacity", 0.4);
        this.map.setPaintProperty("custom-rivers", "line-opacity", 0.4);
      } else if (x === 2) {
        // this.map.setLayoutProperty(i.id, "visibility", "visible");
        // this.map.setPaintProperty("revisedcounties-2", "fill-opacity", 0.15);
        this.map.setPaintProperty("crbasin", "fill-opacity", 1);
        this.map.setPaintProperty("custom-rivers", "line-opacity", 0.75);
        this.map.setPaintProperty("base-org-dxzfkf", "fill-opacity", 0.5);
      } else if (x === 3) {
        // this.map.setLayoutProperty(i.id, "visibility", "visible");
        // this.map.setPaintProperty("revisedcounties-2", "fill-opacity", 0.15);
        this.map.setPaintProperty("crbasin", "fill-opacity", 0.4);
        this.map.setPaintProperty("base-org-dxzfkf", "fill-opacity", 1);
      } else if (x === 6) {
        // v low opacity for county map - should maybe just hide?
        this.map.setPaintProperty("revisedcounties-2", "fill-opacity", 0);
        this.map.setPaintProperty("us-states", "fill-opacity", 0.3);

        // no opacity when looking at entire country and markers or drinking water repairs shown
        this.map.setPaintProperty("base-org-dxzfkf", "fill-opacity", 0);
        this.map.setPaintProperty("highplains-5hedlf", "fill-opacity", 0);
        this.map.setPaintProperty("crbasin", "fill-opacity", 0);
        this.map.setPaintProperty("custom-rivers", "line-opacity", 0);

        // hide markers on zoom out
        this.map.setLayoutProperty("markers-dakqe6", "visibility", "none");
      } else if (x === 7) {
        // v low opacity for county map - should maybe just hide?
        this.map.setPaintProperty("revisedcounties-2", "fill-opacity", 0.0);

        // low opacity when looking at entire country and markers shown
        this.map.setPaintProperty("base-org-dxzfkf", "fill-opacity", 0.5);
        this.map.setPaintProperty("highplains-5hedlf", "fill-opacity", 0);
        this.map.setPaintProperty("crbasin", "fill-opacity", 0);
        this.map.setPaintProperty("custom-rivers", "line-opacity", 0);

        // reset markers to show on normal zoom out
        this.map.setLayoutProperty("markers-dakqe6", "visibility", "visible");
      }
    },
    infraAnimate() {
      var hoveredStateId = null;
      // highlight drinking water repair needs $
      var initial = 0;
      const howManyTimes = this.places.length;
      const f = () => {
        if (hoveredStateId) {
          this.map.setFeatureState(
            {
              source: "states",
              id: hoveredStateId
            },
            { hover: false }
          );
        }
        if (this.$store.getters.playing) {
          this.currentState = this.places[initial].state;
          this.currentRepair = this.places[initial].repair;
          hoveredStateId = this.places[initial].id;
          this.map.setFeatureState(
            {
              source: "states",
              id: hoveredStateId
            },
            { hover: true }
          );

          this.map.flyTo({
            center: [
              this.places[initial].lng + this.adjust,
              this.places[initial].lat
            ],
            zoom: 5
          });

          initial++;
          if (initial < howManyTimes) {
            setTimeout(f, 750);
          } else {
            this.skipToEnd();
          }
        }
      };
      f();
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
              this.setMapLayers(i);
              break;

            case 1:
              // reset original map point
              this.map.flyTo({
                center: [-98.461045, 38], // whole US zoomed in
                zoom: 3.8
              });
              this.setMapLayers(i);
              break;
            case 2:
              this.map.flyTo({
                center: [-109, 36.5], // colorado basin
                zoom: 5
              });
              this.setMapLayers(i);

              break;
            case 3:
              // position
              this.map.flyTo({
                center: [-118.2437, 34.0522], // LA
                zoom: 5.5
              });
              this.setMapLayers(i);

              break;
            case 4:
              // position
              this.map.flyTo({
                center: [-97, 38.591559], // ogallala acquifer
                zoom: 4.75
              });
              this.setMapLayers(i);

              break;
            case 5:
              // this.$store.getters.playing = false;
              this.$store.commit("updatePlaying", false);

              // position
              this.map.flyTo({
                center: [-81.385071, 25.858244], // everglades
                zoom: 5.5
              });
              this.setMapLayers(i);

              break;
            case 6:
              // position
              this.map.flyTo({
                center: [-98.461045 + this.adjust, 36.805969], // whole US zoomed out, infrastructure
                zoom: 3.5
              });
              // will also fire animation
              // this.setAnimate = true;
              // this.infraAnimate();
              this.setMapLayers(i);
              break;
            case 7:
              // this.$store.getters.playing = false;
              this.$store.commit("updatePlaying", false);

              // position
              this.map.flyTo({
                center: [-73.935242, 40.7128], // northeast (NYC)
                zoom: 5.5
              });
              this.setMapLayers(i);

              break;
            case 8:
              // position
              this.map.flyTo({
                center: [-83.705521, 43.0125], // flint
                zoom: 7.5
              });
              this.setMapLayers(i);

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
/* text */
.text-section {
  padding-bottom: 20rem;
  z-index: 999;
  font-size: 90%;
}

.text-box {
  /* transition: 1.5s all cubic-bezier(0.39, 0.575, 0.565, 1); */
  width: 40%;
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
.text-box:nth-of-type(2),
.text-box:nth-of-type(7) {
  width: 40%;
  max-width: 800px;
  padding: 1.25rem 1.75rem 1.5rem 1.75rem;
  margin: 0 auto;
  margin-bottom: 60rem;
  z-index: 999;
  border-radius: 4px;
  opacity: 0.925;
  /* unique to chart one */
  background-color: var(--main-bg-color);
  color: var(--main-body-type);
  border: 1px solid rgba(112, 112, 112, 0.33);
}

.text-box:first-of-type {
  box-shadow: none;
}

.text-box:nth-of-type(2),
.text-box:nth-of-type(7) {
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

#repair-box {
  position: fixed;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 1rem;
  /* width: 200px; */

  /* height: 50px; */
  color: #fff;
  background-color: var(--map-bg-color);
  z-index: 998;
  padding: 1rem;
  text-align: center;
  border: 1px solid var(--special);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
}

#repair-box h5 {
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}

#repair-box p {
  font-size: 200%;
}

#playing {
  opacity: 0 !important;
  transition: all 0.7s ease-in-out;
}

#not-playing {
  opacity: 1 !important;
  transition: all 0.7s ease-in-out;
}

.visible-background {
  background-color: var(--main-bg-color);
  transition: background-color 1s ease-in-out;
}

.hidden-background {
  background-color: var(--map-bg-color);
  transition: background-color 1s ease-in-out;
}
</style>