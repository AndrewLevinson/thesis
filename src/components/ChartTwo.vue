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
        <p class="datum special">
          <sup>+</sup>
          {{ numFormater(currentRepair) }}
        </p>
      </div>
      <button v-show="$store.getters.playing" @click="skipToEnd" class="in-box-button">Skip to End</button>
      <div v-show="scrollPosition === 0" class="legend" id="withdraw">
        <h6>Freshwater Withdrawals per Capita</h6>
        <p>
          m
          <sup>3</sup>/year/person
        </p>
        <div class="data-pair">
          <div class="blocks">
            <div style="background-color: #c6dbef"></div>
          </div>
          <p>0</p>
        </div>
        <div class="data-pair">
          <div class="blocks">
            <div style="background-color: #9dc9e1"></div>
          </div>
          <p>1</p>
        </div>
        <div class="data-pair">
          <div class="blocks">
            <div style="background-color: #6baed6"></div>
          </div>
          <p>5</p>
        </div>
        <div class="data-pair">
          <div class="blocks">
            <div style="background-color: #3184bf"></div>
          </div>
          <p>50</p>
        </div>
        <div class="data-pair">
          <div class="blocks">
            <div style="background-color: #08529b"></div>
          </div>
          <p>300</p>
        </div>
      </div>
      <div v-show="scrollPosition === 4" class="legend" id="diverge">
        <h6>
          Change in
          <br />Depletion Intensity %
        </h6>
        <p>20th Century vs. Last 10 Years</p>
        <div class="data-pair">
          <div class="blocks">
            <div style="background-color: #3b83ba"></div>
            <div style="background-color: #7ab5d6"></div>
            <div style="background-color: #c5ddec"></div>
          </div>
          <p>
            Decreased
            <br />[-660% — 0%]
          </p>
        </div>
        <div class="data-pair">
          <div class="blocks">
            <div style="background-color: #f1efe9"></div>
          </div>
          <p>
            No Change
            <br />[0%]
          </p>
        </div>
        <div class="data-pair">
          <div class="blocks">
            <div style="background-color: #fcd9ab"></div>
            <div style="background-color: #f2a854"></div>
            <div style="background-color: #d07316"></div>
          </div>
          <p>
            Increased
            <br />[0% — 660%]
          </p>
        </div>
      </div>
      <div id="my-map" :class="[scrollPosition === 0 ? 'visible-background' : 'hidden-background']">
        <!-- map goes here -->
      </div>
    </div>
    <section class="text-section" id="sectionsTwo">
      <div class="text-box">
        <h5 class="box-title">Freshwater Withdrawals Per Capita</h5>
        <p>
          As alluded to in the previous section, most of our freshwater withdrawals are not for
          drinking water, but for irrigation—which occurs predominantly in the High Plaines and
          Western regions. That's why this crisis is much bigger than just direct personal
          consumption.
        </p>
      </div>
      <div class="text-box">
        <h5 class="box-title">Current Water Stress in the United States</h5>
        <p>
          Throughout the country, we have already seen increasing water stress due to several factors. While some of these issues are isolated and some are symptoms of
          overarching problems like climate change, they are all signs of things to come if inaction
          continues.
        </p>
        <!-- <br> -->
        <!-- <p>Let's take a look at local water stress at a local level.</p> -->
      </div>
      <div class="text-box">
        <h5 class="box-title">Colorado River</h5>
        <p>
          Described as the "most controlled, controversial and litigated rivers in the world,"
          <sup
            class="footnote"
          >[2]</sup> the
          <span class="tag tag-intext area-river">Colorado River</span> provides drinking water and
          agricultural needs to
          <span
            class="special total"
          >· 40 million people</span>
          <sup class="footnote">&nbsp;[3]</sup>, including major cities highlighted on the map.
          Extended droughts have caused extreme stress on drinking water supply, irrigation,
          hydroelectricity, and water rights overall.
        </p>
      </div>
      <div class="text-box">
        <h5 class="box-title">Flood Levels Exceeding 99% Percentile</h5>
        <p>
          According to data pulled from the
          <a
            href="https://waterwatch.usgs.gov/index.php?id=flood&sid=w__map"
          >USGS</a> on
          <span class="datum">May 6, 2019</span> (the time of this writing), there are over
          <span
            class="tag tag-intext area-warning datum"
          >50 extreme flooding scenarios</span>
          <br />Not only is flooding dangerous and expensive, but it can severely affect agriculture
          and drinking water due to contamination.
        </p>
      </div>
      <div class="text-box">
        <h5 class="box-title">Groundwater Depletion & Over-Abstraction</h5>
        <p>
          Most aquifers across the country are dealing with adverse effects from
          <a
            href="https://pubs.usgs.gov/sir/2013/5079/"
          >increasing depletion intensity</a> of
          below-ground aquifers—which you can think of as the
          <i>savings account</i> of our water
          supply. If increasing depletion intensity isn't tamed, the over-abstraction of groundwater
          can lead to wells drying up, contamination and saltwater intrusion, and the ground
          literally sinking.
        </p>
      </div>

      <div
        :id="[$store.getters.playing ? 'playing' : 'not-playing']"
        :class="[$store.getters.finished ? 'text-box finished-text-box' : 'text-box']"
      >
        <div v-if="!$store.getters.finished">
          <h5 class="box-title">Drinking Water Infrastructure Across the Entire US</h5>
          <p>
            Infrastructure repair needs in the US have skyrocketed in the last 50 years. Click the
            play button below to see the total investment required to improve our drinking water
            infrastructure for each state:
          </p>
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
    </section>
  </div>
</template>

<script>
import SideBar from "./SideBar.vue";

import { select, selectAll, csv, format } from "d3";
import { graphScroll } from "graph-scroll";
import mapboxgl from "mapbox-gl";

const d3 = {
  select,
  selectAll,
  csv,
  format
};

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
      opacityValue: 0.5,
      places: [{}],
      baseZoom: window.innerWidth > 1750 ? 4.25 : 3.8
    };
  },
  mounted() {
    this.loadMap();
    this.loadData();
  },
  methods: {
    loadMap() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiYW5kcmV3bGV2aW5zb24iLCJhIjoiY2pub3RxNXB2MDA5cTNxb2M5MjNoaHl5diJ9.Zq4eS5UJd_60fgNBAFiUsw";
      this.map = new mapboxgl.Map({
        container: "my-map",
        style: "mapbox://styles/andrewlevinson/cjulygwif39c51fqua8xj3u4m",
        center: [-98.461045, 36.805969],
        zoom: 4,
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
              this.opacityValue,
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
        this.map.setPaintProperty("all-rivers", "line-opacity", 0.2);
        this.map.setPaintProperty("flooding", "icon-opacity", 0);

        // this.map.setLayoutProperty("flooding", "visibility", "none");
        // reset green city labels for standard
        this.map.setLayoutProperty("cr-cities-labels", "visibility", "none");
        this.map.setPaintProperty("settlement-label", "text-opacity", 1);
        // this.map.getStyle("settlement-label");
      } else if (x === 2) {
        // drought
        this.map.setPaintProperty("revisedcounties-2", "fill-opacity", 0);
        this.map.setPaintProperty("aquifers", "fill-opacity", 0.0);

        this.map.setPaintProperty("crbasin", "fill-opacity", 1);
        this.map.setPaintProperty("custom-rivers", "line-opacity", 1);
        this.map.setPaintProperty("all-rivers", "line-opacity", 0.2);

        // swap standard city labels for green
        this.map.setLayoutProperty("cr-cities-labels", "visibility", "visible");
        this.map.setPaintProperty("settlement-label", "text-opacity", 0.45);

        // hide markers for future zoom outs
        this.map.setLayoutProperty("markers-dakqe6", "visibility", "none");
        // this.map.setLayoutProperty("flooding", "visibility", "none");
        this.map.setPaintProperty("flooding", "icon-opacity", 0);
      } else if (x === 3) {
        // flood
        this.map.setPaintProperty("revisedcounties-2", "fill-opacity", 0);
        this.map.setPaintProperty("aquifers", "fill-opacity", 0.0);
        this.map.setPaintProperty("crbasin", "fill-opacity", 0);
        this.map.setPaintProperty("custom-rivers", "line-opacity", 0);
        // reset green city labels for standard
        this.map.setLayoutProperty("cr-cities-labels", "visibility", "none");
        this.map.setPaintProperty("settlement-label", "text-opacity", 1);

        this.map.setPaintProperty("all-rivers", "line-opacity", 0.5);
        this.map.setPaintProperty("flooding", "icon-opacity", 1);
      } else if (x === 4) {
        // aquifers - first
        this.map.setPaintProperty("crbasin", "fill-opacity", 0);
        this.map.setPaintProperty("custom-rivers", "line-opacity", 0);
        this.map.setPaintProperty("all-rivers", "line-opacity", 0);
        this.map.setPaintProperty("aquifers", "fill-opacity", 1);

        this.map.setPaintProperty("flooding", "icon-opacity", 0);
      } else if (x === 5) {
        // drinking water - first
        this.map.setPaintProperty("aquifers", "fill-opacity", 0);
      } else if (x === 6) {
        // drinking water zoom in (northeast)
      } else if (x === 7) {
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

          // this.map.flyTo({
          //   center: [this.places[initial].lng, this.places[initial].lat],
          //   zoom: 5
          // });
          this.map.setPaintProperty("state-fills", "fill-opacity", [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            this.opacityValue,
            0
          ]);
          // this.opacityValue = this.stateScale(this.currentRepair);
          this.opacityValue = 0.3 + (this.currentRepair / 51033) * 0.5;
          initial++;

          if (initial < howManyTimes) {
            setTimeout(f, 500);

            // this.opacityValue = initial * 0.02;
          } else {
            this.adjust = 16;
            this.skipToEnd();
            // this.map.setPaintProperty(
            //   "state-fills",
            //   "fill-opacity",
            //   "interpolate",
            //   ["linear"],
            //   ["get", 50],
            //   1006,
            //   0.16,
            //   2209,
            //   0.32,
            //   7331,
            //   0.48,
            //   10189,
            //   0.64,
            //   51033,
            //   0.8
            // ),
            // this.map.setFeatureState(
            //   {
            //     source: "states",
            //     id: "state-fills"
            //   },
            //   { hover: true }
            // );
            // this.map.setPaintProperty("state-fills", "fill-opacity", 0.5);
          }
        } else if (this.$store.getters.finished) {
          this.adjust = 16;
          this.skipToEnd();
        }
      };
      f();
    },
    stateScale() {
      return d3
        .scaleLinear()
        .domain([
          Math.min(...this.places.map(x => x.repair)),
          Math.max(...this.places.map(x => x.repair))
        ])
        .range([0.2, 0.8]);
    },
    scrollTrigger() {
      graphScroll()
        .offset(225)
        .graph(d3.selectAll("#map"))
        .container(d3.select("#chart-two"))
        .sections(d3.selectAll("#sectionsTwo > div"))
        .eventId("uniqueId2")
        .on("active", i => {
          this.scrollPosition = i;
          switch (i) {
            case 0:
              // offscreen so do nothing
              // reset original map point
              this.map.flyTo({
                center: [-98.461045, 38], // whole US zoomed in
                // zoom: 3.8
                zoom: this.baseZoom
              });
              this.setMapLayers(i);
              break;

            case 1:
              // reset original map point
              this.map.flyTo({
                center: [-98.461045, 38], // whole US zoomed in
                zoom: this.baseZoom
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
                center: [-98.461045, 38], // whole US zoomed in
                zoom: this.baseZoom
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
                center: [-98.461045, 38],
                zoom: this.baseZoom
              });
              this.setMapLayers(i);
              // this.$store.commit("updatePlaying", false);

              break;

            case 5:
              // position
              this.map.flyTo({
                center: [-98.461045 + this.adjust, 38], // whole US zoomed out, infrastructure
                zoom: this.baseZoom
              });
              // will also fire animation
              // this.setAnimate = true;
              // this.infraAnimate();
              this.setMapLayers(i);
              break;
            case 6:
              this.$store.commit("updatePlaying", false);

              // position
              this.map.flyTo({
                center: [-73.935242, 40.7128], // northeast (NYC)
                zoom: 5.5
              });
              this.setMapLayers(i);

              break;
            case 7:
              // position
              this.map.flyTo({
                center: [-83.705521, 43.0125], // flint
                zoom: 7.5
              });
              this.setMapLayers(i);

              break;
            default:
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
  width: 92.5%;
  max-width: 600px;
  padding: 1.25rem 1.75rem 1.5rem 1.75rem;
  /* margin: 0 auto; */
  margin-left: 5rem;
  margin-bottom: 100rem;
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
.text-box:nth-of-type(4),
.text-box:nth-of-type(5),
.text-box:nth-of-type(6) {
  width: 92.5%;
  max-width: 600px;
  padding: 1.25rem 1.75rem 1.5rem 1.75rem;
  margin: 0 auto;
  margin-bottom: 100rem;
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
.text-box:nth-of-type(4),
.text-box:nth-of-type(5),
.text-box:nth-of-type(6) {
  background-color: var(--map-bg-color);
  color: #fff;
}

.text-box:nth-of-type(3) {
  /* a little extra margin to see basin*/
  margin-top: 15rem;
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

/* tag colors */
.area-river {
  /* fill: #0ec7d8; */
  /* background-color: #0ec7d8; */
  background-color: transparent;
  color: #0ec7d8;
}

.area-river::after {
  content: "\3030";
  float: right;
  margin-left: 6px;
  margin-top: 2px;
  font-weight: 900;
}

.area-warning {
  /* fill: #0ec7d8; */
  /* background-color: #0ec7d8; */
  background-color: transparent;
  border: 1px solid #ffc700;
  /* color: #fff; */
  /* color: var(--main-body-type); */
}

.area-warning::after {
  content: url("../assets/icons/warning-round-small.svg");
  float: right;
  margin-left: 6px;
  margin-top: -1.25px;
  font-size: 120%;
  font-weight: 900;
}

#repair-box {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 1rem;
  color: #fff;
  background-color: var(--map-bg-color);
  z-index: 998;
  padding: 1rem;
  text-align: center;
  border: 1px solid var(--special);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
}

.legend {
  position: absolute;
  top: 75px;
  left: 8px;
  width: 210px;
  margin: 0;
  color: #fff;
  z-index: 998;
  padding: 1rem;
}

.legend .data-pair {
  display: block;
  /* justify-content: space-between; */
  padding: 0.75rem;
  padding-left: 0;
  margin: 0;
  font-family: "IBM Plex Mono", monospace;
  font-weight: 300;
  /* opacity: 0.8; */
  /* font-size: 90%; */

  /* border: 1px solid var(--main-bg-color); */
  transition: all 0.2s ease-in-out;
}

.legend .data-pair:last-of-type {
  padding-bottom: 0.25rem;
}

#diverge .blocks {
  display: flex;
  margin: 0;
  padding: 0;
}

.legend .blocks div {
  width: 40px;
  height: 16px;
  /* border-radius: 4px; */
  margin: 0;
  padding: 0;
}

.legend h6 {
  margin-bottom: 0;
}

.legend p {
  margin-bottom: 0.5rem;
  font-size: 75%;
}

#withdraw {
  position: absolute;
  top: 40px;
  right: 80px;
  left: unset;
  width: 350px;
  margin: 0;
  color: #fff;
  z-index: 998;
  padding: 1rem;
}

@media (min-width: 1700px) {
  #withdraw {
    right: 120px;
    top: 70px;
  }
}

#withdraw {
  color: var(--main-body-type);
}

#withdraw .data-pair {
  display: inline-block;
}

#repair-box h5,
#special-total h5 {
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}

#repair-box p,
#special-total p {
  font-size: 200%;
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
