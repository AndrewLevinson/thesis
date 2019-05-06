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
      </div>
      <button v-show="$store.getters.playing" @click="skipToEnd" class="in-box-button">Skip to End</button>
      <!-- <button
        v-show="$store.getters.finished && !$store.getters.playing && scrollPosition === 6"
        @click="play(true)"
        class="play-button pin-bottom"
      >Replay Animation</button>-->
      <div id="my-map" :class="[scrollPosition == 0 ? 'visible-background' : 'hidden-background']">
        <!-- map goes here -->
      </div>
    </div>
    <section class="text-section" id="sectionsTwo">
      <div class="text-box">
        <h5 class="box-title">Freshwater Withdrawals Per Capita</h5>
        <p>As alluded to in the previous charts, most of our freshwater withdrawls are not for drinking water, but for irrigation—which occurs prodominently in the High Plaines and Western regions.</p>
        <br>
        <p>That's why this crisis is much bigger than just personal consumption.</p>
      </div>
      <div class="text-box">
        <h5 class="box-title">Current Water Stress in the United States</h5>
        <p>
          Throughout the country we have already seen increasing water
          stress due to a number of different factors. While some of these issues are isolated and some are symptoms of overarching problems like climate change, they are all signs of things to come if inaction continues.
        </p>
        <br>
        <p>Let's take a look at local water stress at a local level.</p>
      </div>
      <div class="text-box">
        <h5 class="box-title">Colorado River Basin</h5>
        <p>The Colorado River provides most of the freshwater needs to the most water intensive region in the country for both irrigation and municipal usage; however, severe climate change has affected the natural water cycle. With less snowpack in the mountains during the winter, the river becomes much more stressed in the late, hot summer months. This not only effects farming activities, but puts immense pressure on the public water supply, especially in cities like Lost Angeles, Las Vegas, and Phoenix.</p>
      </div>
      <div class="text-box">
        <h5 class="box-title">Southern California Pricing Tiers</h5>
        <p>A reaction to increased drought intensity and frequency over the last decade has led to drastic water conservation efforts in Los Angeles in the form of pricing tiers.</p>
        <p>While controversial, it has proven in its short lifetime to provide some conservation success, while still provide a standard rate for the baseline amount of drinking water needs ones home. In other words, we all pay the same price for drinking, cooking, bathing, and wastewater but if you have a swimming pool or a water feature in your yard, you're going to pay a premium.</p>
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
        :id="[$store.getters.playing  ? 'playing' : 'not-playing']"
        :class="[$store.getters.finished ? 'text-box finished-text-box' : 'text-box']"
      >
        <div v-if="!$store.getters.finished">
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
        <div v-else id="special-total">
          <h5 class="total">Total Repairs Needed</h5>
          <p class="datum special">$ 472.6 Billion</p>
          <button @click="play(true)" class="play-button pin-box">Replay</button>
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
        center: [-98.461045 + this.adjust, 38],
        zoom: 3.45
      });
    },
    setMapLayers(x) {
      const allLayers = this.map.getStyle().layers;

      if (x === 0) {
        // display county usage - light
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
        // display water stress across USA
        for (const i of allLayers) {
          // make everything visible
          this.map.setLayoutProperty(i.id, "visibility", "visible");
        }
        // v low opacity for county map - should maybe just hide?
        this.map.setPaintProperty("revisedcounties-2", "fill-opacity", 0.15);
        this.map.setPaintProperty("us-states", "fill-opacity", 0.3);

        // low opacity when looking at entire country and markers shown
        this.map.setPaintProperty("aquifers", "fill-opacity", 0.2);
        this.map.setPaintProperty("crbasin", "fill-opacity", 0.2);
        this.map.setPaintProperty("custom-rivers", "line-opacity", 0.2);
      } else if (x === 2) {
        // drought  - first
        this.map.setPaintProperty("revisedcounties-2", "fill-opacity", 0);
        this.map.setPaintProperty("aquifers", "fill-opacity", 0.0);

        this.map.setPaintProperty("crbasin", "fill-opacity", 1);
        this.map.setPaintProperty("custom-rivers", "line-opacity", 1);

        // hide markers for future zoom outs
        this.map.setLayoutProperty("markers-dakqe6", "visibility", "none");
      } else if (x === 3) {
        // drought  - second (same as first)
        this.map.setPaintProperty("revisedcounties-2", "fill-opacity", 0);
        this.map.setPaintProperty("aquifers", "fill-opacity", 0.0);

        this.map.setPaintProperty("crbasin", "fill-opacity", 1);
        this.map.setPaintProperty("custom-rivers", "line-opacity", 1);
      } else if (x === 4) {
        // aquifers - first
        this.map.setPaintProperty("crbasin", "fill-opacity", 0);
        this.map.setPaintProperty("custom-rivers", "line-opacity", 0);
        this.map.setPaintProperty("aquifers", "fill-opacity", 1);
      } else if (x === 5) {
        // aquifers - second / zoom in (everglades)
        this.map.setPaintProperty("crbasin", "fill-opacity", 0);
        this.map.setPaintProperty("custom-rivers", "line-opacity", 0);
        this.map.setPaintProperty("aquifers", "fill-opacity", 1);
      } else if (x === 6) {
        // drinking water - first
        this.map.setPaintProperty("aquifers", "fill-opacity", 0);
      } else if (x === 7) {
        // drinking water zoom in (northeast)
      } else if (x === 8) {
        // drinking water zoom in (flint)
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
            center: [this.places[initial].lng, this.places[initial].lat],
            zoom: 5
          });

          initial++;
          if (initial < howManyTimes) {
            setTimeout(f, 750);
          } else {
            this.adjust = 16;
            this.skipToEnd();
          }
        } else if (this.$store.getters.finished) {
          this.adjust = 16;
          this.skipToEnd();

          // this.map.flyTo({
          //   center: [-98.461045 + 16, 38],
          //   zoom: 3.45
          // });
          // this.map.addLayer({
          //   id: "repair-fills",
          //   type: "fill",
          //   source: "states",
          //   layout: {},
          //   paint: {
          //     "fill-opacity": 0.75,
          //     "fill-color": [
          //       "interpolate",
          //       ["linear"],
          //       ["get", "id"],
          //       0,
          //       "#F2F12D",
          //       5,
          //       "#EED322",
          //       10,
          //       "#E6B71E",
          //       15,
          //       "#DA9C20",
          //       20,
          //       "#CA8323",
          //       25,
          //       "#B86B25",
          //       30,
          //       "#A25626",
          //       35,
          //       "#8B4225",
          //       40,
          //       "#723122"
          //     ]
          //   }
          // });
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
              // this.map.flyTo({
              //   center: [-118.2437, 34.0522], // LA
              //   zoom: 5.5
              // });
              this.map.flyTo({
                center: [-109, 36.5], // colorado basin
                zoom: 5
              });
              this.setMapLayers(i);

              break;
            case 4:
              // position
              // this.map.flyTo({
              //   center: [-97, 38.591559], // ogallala acquifer
              //   zoom: 4.75
              // });
              this.map.flyTo({
                center: [-98.461045 + 16, 38],
                zoom: 3.45
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

.finished-text-box {
  width: 25% !important;
  /* margin-left: 18rem !important; */
  transform: translateX(calc(-490px / 2));
  padding: 1rem !important;
  text-align: center !important;
  border: 1px solid var(--special) !important;
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
  position: absolute;
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

#repair-box h5,
#special-total h5 {
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}

#repair-box p,
#special-total p {
  font-size: 200%;
}

#special-total {
  /* width: 30%; */
}

#playing {
  opacity: 0 !important;
  transition: all 0.7s ease-in-out;
}

#not-playing {
  opacity: 1 !important;
  transition: all 0.7s ease-in-out;
  width: 40%;
}

.in-box-button {
  position: fixed;
  right: 90px;
  bottom: 0;
  border-radius: 4px;
  border: none;
  background: transparent;
  margin-top: 2rem;
  color: #fff;
  text-align: right;
  z-index: 999;
  /* padding: 1rem; */
}

.in-box-button:hover {
  color: var(--special);
}

.in-box-button::after {
  content: "\362";
  text-align: right;
  width: 24px;
  float: right;
  margin-top: -0.3rem;
  margin-right: 0.5rem;
  white-space: nowrap;
}

.pin-box {
  position: absolute;
  right: 0;
  top: -55px;
  /* z-index: 999; */
  /* color: #fff; */
  margin: 1.25rem 0 1.25rem 0;
  border: none;
  background: transparent;
}

.pin-box:hover {
  background: none !important;
  color: var(--special);
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