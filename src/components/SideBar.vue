<template>
  <nav :class="[showPanel ? 'show-panel' : 'hide-panel']">
    <div class="icon-holder">
      <div class="panel-tip-band"></div>
      <!-- <h6>Case Studies</h6> -->
      <div class="dots">
        <div :class="[scrollPosition >= 2 && scrollPosition <= 3 ? 'active-dot': 'dot']">
          <div></div>
          <p>Climate</p>
        </div>
        <div :class="[scrollPosition === 4 ? 'active-dot': 'dot']">
          <div></div>
          <p>Groundwater</p>
        </div>
        <div :class="[scrollPosition >= 5 ? 'active-dot': 'dot']">
          <div></div>
          <p>Infrastructure</p>
        </div>
        <!-- <div :class="[scrollPosition >= 7 ? 'active-dot': 'dot']">
          <div></div>
          <p>Contamination</p>
        </div>-->
      </div>
    </div>
    <section :class="[showPanelContent ? 'show-panel-content' : 'hide-panel-content']">
      <div class="panel-tip-band"></div>
      <div class="panel-content">
        <article v-if="scrollPosition === 2">
          <h2>Extended Drought</h2>
          <h5>Colorado River Basin</h5>
          <!-- <div class="image-holder"> -->
          <!-- Photo by Pedro Lastra on Unsplash -->
          <!-- <img src="../assets/images/pedro-lastra-165298-unsplash.jpg" alt="colorado river">
            <caption>By: Pedro Lastra on Unsplash</caption>
          </div>-->
          <!-- <div class="tag-holder">
            <span class="area-upper-basin tag">Upper Basin</span>
            <span class="area-lower-basin tag">Lower Basin</span>
            <span class="area-river tag">Colorado River</span>
          </div>-->
          <p>
            Climate change has caused frequent extended doughts throughout the Southwest, putting intense pressure on
            <span
              class="special datum"
            >major cities</span>
            that depend on Lake Mead for their drinking water from the lower basin.
          </p>
          <MiniChart />
          <div class="additional-content">
            <div class="tip-band-mini"></div>
            <p>The Colorado River provides most of the freshwater needs to the most water intensive region in the country for both irrigation and municipal usage; however, climate change has affected the natural water cycle, putting intense pressure on cities that depend on Lake Mead for their drinking water.</p>
            <p>With less snowpack in the mountains during the winter, the river becomes much more stressed in the late, hot summer months. This not only effects farming activities, but puts immense pressure on the public water supply—especially in cities like Los Angeles, Las Vegas, and Phoenix.</p>
          </div>
        </article>
        <!-- <article v-else-if="scrollPosition === 3">
          <h2>Flooding</h2>
          <h5>Midwest</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor expedita reiciendis, ad maxime, cumque quasi dolorem similique vitae laudantium optio nulla blanditiis facere aliquam. Suscipit aspernatur laboriosam consequatur nisi, quam qui modi mollitia facilis, quidem sint odio. Alias quod sunt doloribus magni eligendi, aspernatur voluptates atque accusamus quaerat eaque perferendis corrupti ipsa, quasi ducimus dicta! Neque excepturi porro laboriosam ipsa natus. Est, architecto. Doloremque nobis, recusandae vel quo inventore beatae placeat nihil accusantium dolores consequatur tempora sunt a dicta facere voluptatem deleniti doloribus quasi, optio reprehenderit. Voluptas quasi, necessitatibus modi quis accusantium blanditiis illum nisi vero. Atque explicabo ipsam eos quia. Asperiores minima quia temporibus unde, eos voluptas dolores fuga repellendus numquam, odio vero dolore ipsa, fugit quam dicta nam ex maiores! Consequatur, atque, facere nobis dolore sint sequi rerum asperiores voluptate amet enim non alias rem quaerat fugiat, obcaecati deserunt architecto ab incidunt porro voluptatibus? Impedit deserunt dolore, itaque doloremque ratione assumenda atque eos harum quidem consequuntur minima deleniti voluptatibus, commodi mollitia voluptatem delectus blanditiis id reiciendis? Animi excepturi enim non repellendus quaerat eos illum facere quae pariatur doloribus sapiente esse reprehenderit nulla, atque tempora amet cum? Perferendis temporibus magnam ipsa possimus doloribus provident? Delectus nesciunt accusantium in necessitatibus?</p>
        </article>-->
        <!-- <article v-else-if="scrollPosition === 4">
          <h2>Groundwater Overabstraction</h2>
          <h5>Ogallala Depletion</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor expedita reiciendis, ad maxime, cumque quasi dolorem similique vitae laudantium optio nulla blanditiis facere aliquam. Suscipit aspernatur laboriosam consequatur nisi, quam qui modi mollitia facilis, quidem sint odio. Alias quod sunt doloribus magni eligendi, aspernatur voluptates atque accusamus quaerat eaque perferendis corrupti ipsa, quasi ducimus dicta! Neque excepturi porro laboriosam ipsa natus. Est, architecto. Doloremque nobis, recusandae vel quo inventore beatae placeat nihil accusantium dolores consequatur tempora sunt a dicta facere voluptatem deleniti doloribus quasi, optio reprehenderit. Voluptas quasi, necessitatibus modi quis accusantium blanditiis illum nisi vero. Atque explicabo ipsam eos quia. Asperiores minima quia temporibus unde, eos voluptas dolores fuga repellendus numquam, odio vero dolore ipsa, fugit quam dicta nam ex maiores! Consequatur, atque, facere nobis dolore sint sequi rerum asperiores voluptate amet enim non alias rem quaerat fugiat, obcaecati deserunt architecto ab incidunt porro voluptatibus? Impedit deserunt dolore, itaque doloremque ratione assumenda atque eos harum quidem consequuntur minima deleniti voluptatibus, commodi mollitia voluptatem delectus blanditiis id reiciendis? Animi excepturi enim non repellendus quaerat eos illum facere quae pariatur doloribus sapiente esse reprehenderit nulla, atque tempora amet cum? Perferendis temporibus magnam ipsa possimus doloribus provident? Delectus nesciunt accusantium in necessitatibus?</p>
        </article>-->

        <article
          v-else-if="scrollPosition === 5"
          v-show="$store.getters.finished && !$store.getters.playing"
        >
          <h2>Drinking Water Infrastructure</h2>
          <h5>Repairs Needed</h5>
          <p>
            In 2015, the EPA completed their
            <a
              href="https://www.epa.gov/sites/production/files/2018-10/documents/corrected_sixth_drinking_water_infrastructure_needs_survey_and_assessment.pdf"
              target="_blank"
            >
              sixth national
              assessment
            </a> of public water system infrastructure needs
            which shows a 20-year need of
            <span
              class="total special"
            >$472.6 Billion</span> in capital improvements to our water systems to "provide safe
            drinking water to the public."
          </p>

          <p>By letting our drinking water infrastructure crumble, we are already seeing adverse effects in the forms of:</p>
          <ul>
            <li>Water Main Breaks</li>
            <li>Drinking Water Contamination</li>
            <li>Wastewater Overflow</li>
          </ul>
          <p>By state breakdown below, sorted by need:</p>

          <!-- <button
            @click="playingSideBar(true)"
            class="play-button"
          >Replay Animation</button>-->

          <table id="water-table">
            <thead>
              <tr>
                <th>State</th>
                <th class="pull-right">Repairs Needed</th>
                <!-- <th>Partial Participation</th> -->
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="place in places.filter(place => { return place.state !== 'Total' }).slice().reverse()"
                :class="place.state"
                :key="place.state"
              >
                <td class="pull-left">{{place.state}}</td>
                <td class="pull-right">{{numFormater(place.repair)}}</td>
                <!-- <td>{{place.partial}}</td> -->
              </tr>
            </tbody>
          </table>
        </article>
        <article v-else-if="scrollPosition == 6">
          <h2>Drinking Water Infrastructure</h2>
          <h5>Sewer System Contamination</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor expedita reiciendis, ad maxime, cumque quasi dolorem similique vitae laudantium optio nulla blanditiis facere aliquam. Suscipit aspernatur laboriosam consequatur nisi, quam qui modi mollitia facilis, quidem sint odio. Alias quod sunt doloribus magni eligendi, aspernatur voluptates atque accusamus quaerat eaque perferendis corrupti ipsa, quasi ducimus dicta! Neque excepturi porro laboriosam ipsa natus. Est, architecto. Doloremque nobis, recusandae vel quo inventore beatae placeat nihil accusantium dolores consequatur tempora sunt a dicta facere voluptatem deleniti doloribus quasi, optio reprehenderit. Voluptas quasi, necessitatibus modi quis accusantium blanditiis illum nisi vero. Atque explicabo ipsam eos quia. Asperiores minima quia temporibus unde, eos voluptas dolores fuga repellendus numquam, odio vero dolore ipsa, fugit quam dicta nam ex maiores! Consequatur, atque, facere nobis dolore sint sequi rerum asperiores voluptate amet enim non alias rem quaerat fugiat, obcaecati deserunt architecto ab incidunt porro voluptatibus? Impedit deserunt dolore, itaque doloremque ratione assumenda atque eos harum quidem consequuntur minima deleniti voluptatibus, commodi mollitia voluptatem delectus blanditiis id reiciendis? Animi excepturi enim non repellendus quaerat eos illum facere quae pariatur doloribus sapiente esse reprehenderit nulla, atque tempora amet cum? Perferendis temporibus magnam ipsa possimus doloribus provident? Delectus nesciunt accusantium in necessitatibus?</p>
        </article>
        <article v-else-if="scrollPosition == 7">
          <h2>Drinking Water Infrastructure</h2>
          <h5>Lead Contamination</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor expedita reiciendis, ad maxime, cumque quasi dolorem similique vitae laudantium optio nulla blanditiis facere aliquam. Suscipit aspernatur laboriosam consequatur nisi, quam qui modi mollitia facilis, quidem sint odio. Alias quod sunt doloribus magni eligendi, aspernatur voluptates atque accusamus quaerat eaque perferendis corrupti ipsa, quasi ducimus dicta! Neque excepturi porro laboriosam ipsa natus. Est, architecto. Doloremque nobis, recusandae vel quo inventore beatae placeat nihil accusantium dolores consequatur tempora sunt a dicta facere voluptatem deleniti doloribus quasi, optio reprehenderit. Voluptas quasi, necessitatibus modi quis accusantium blanditiis illum nisi vero. Atque explicabo ipsam eos quia. Asperiores minima quia temporibus unde, eos voluptas dolores fuga repellendus numquam, odio vero dolore ipsa, fugit quam dicta nam ex maiores! Consequatur, atque, facere nobis dolore sint sequi rerum asperiores voluptate amet enim non alias rem quaerat fugiat, obcaecati deserunt architecto ab incidunt porro voluptatibus? Impedit deserunt dolore, itaque doloremque ratione assumenda atque eos harum quidem consequuntur minima deleniti voluptatibus, commodi mollitia voluptatem delectus blanditiis id reiciendis? Animi excepturi enim non repellendus quaerat eos illum facere quae pariatur doloribus sapiente esse reprehenderit nulla, atque tempora amet cum? Perferendis temporibus magnam ipsa possimus doloribus provident? Delectus nesciunt accusantium in necessitatibus?</p>
        </article>
      </div>
    </section>
  </nav>
</template>

<script>
import MiniChart from "./MiniChart.vue";
import * as d3 from "d3";

export default {
  name: "side-bar",
  components: { MiniChart },
  props: ["scrollPosition", "places", "currentState", "currentRepair"],
  data() {
    return {
      showPanel: false,
      showPanelContent: false
    };
  },
  computed: {
    animationComplete() {
      return this.$store.getters.finished;
    },
    stillPlaying() {
      return this.$store.getters.playing;
    }
  },
  // watch: {
  //   scrollPosition: "scrollPanel"
  // },
  watch: {
    scrollPosition: "scrollPanel",
    animationComplete(newValue, oldValue) {
      // console.log(`Updating from ${oldValue} to ${newValue}`);
      // Do whatever makes sense now
      if (newValue) {
        this.showPanelContent = true;
      } else {
        this.showPanelContent = false;
      }
    },
    stillPlaying(newValue, oldValue) {
      // console.log(`Updating from ${oldValue} to ${newValue}`);
      // Do whatever makes sense now
      if (newValue) {
        this.showPanelContent = false;
      } else {
        this.showPanelContent = true;
      }
    }
  },
  methods: {
    playingSideBar(is) {
      this.$emit("playingSideBar", is);
    },
    numFormater(el) {
      const numFormatT = d3.format(",.2f");
      return `$ ${numFormatT(el / 1000)} B`;
    },
    scrollPanel(i) {
      switch (i) {
        case 0:
          this.showPanel = false;
          break;
        case 1:
          this.showPanel = true;
          this.showPanelContent = false;
          break;
        case 2:
          this.showPanelContent = true;
          break;
        case 3:
          this.showPanelContent = false;
          break;
        case 4:
          this.showPanelContent = false;
          break;
        case 5:
          this.$store.getters.finished && !this.$store.getters.playing
            ? (this.showPanelContent = true)
            : (this.showPanelContent = false);
          break;
        case 6:
          this.showPanelContent = true;
          break;
        case 7:
          this.showPanelContent = true;
          break;
        default:
          this.showPanelContent = true;
          break;
      }
    }
  }
};
</script>

<style scoped>
.show-panel,
.hide-panel,
.show-panel-content,
.hide-panel-content {
  transition: all 0.7s ease-in-out;
}

.show-panel {
  opacity: 1;
  transform: translateX(0%);
}
.hide-panel {
  opacity: 0.5;
  transform: translateX(100%);
}
nav {
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  z-index: 999;
  color: #fff;
  /* transform: translateX(calc(100% + 510px)); */
}

.show-panel-content {
  transform: translateX(calc(0% - 90px));
}
.hide-panel-content {
  transform: translateX(calc(100% + 90px));
}

.panel-tip-band {
  position: absolute;
  top: 0;
  right: 0;
  height: 7px;
  width: 100%;
  border-radius: 4px 4px 0 0;
  /* background-color: var(--special); */
  background-color: #fff;
}

.icon-holder {
  position: absolute;
  height: 100vh;
  width: 90px;
  right: 0;
  padding: 1rem;
  /* padding-top: 8rem; */
  /* background-color: var(--map-bg-color); */
  background-color: #191a1a;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}

.dots {
  display: flex;
  flex-direction: column;
  height: 40%;
  justify-content: space-evenly;
  text-align: center;
  padding-top: 4rem;
}
.dots .dot div,
.dots .active-dot div {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  margin: 0 auto;
}

.dots .active-dot div {
  background-color: #fff;
  opacity: 0.9;
  /* background-color: var(--special); */
}

.dots p {
  padding: 0.5rem 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 700;
  opacity: 0.6;
}

.dots .active-dot p {
  opacity: 1;
}

section {
  height: 100vh;
  display: flex;
  text-align: left;
  background-color: rgba(25, 26, 26, 0.85);
  /* background-image: linear-gradient(
    89.8deg,
    rgba(25, 26, 26, 0.23) -18.6%,
    rgba(25, 26, 26, 0.49) -6.2%,
    rgba(25, 26, 26, 0.73) 14.9%,
    rgba(25, 26, 26, 0.91) 46.7%,
    rgba(25, 26, 26, 1) 76.1%
  ); */
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.35);
  position: sticky;
  top: 0;
}

.panel-content {
  padding: 3rem;
  padding-top: 6rem;
  width: 100%;
  overflow-y: auto;
}

article h2 {
  /* padding-top: 2rem; */
  margin-bottom: 0;
  line-height: 1;
}
article h5 {
  /* font-weight: 300; */
  /* font-family: monospace; */
  opacity: 0.75;
  /* margin-top: -1.5rem; */
  /* margin-bottom: 0; */
}

article p {
  margin-top: 1.75rem;
  font-size: 92.5%;
  /* opacity: 0.9; */
}

.image-holder {
  margin-top: -0.5rem;
  width: 100%;
  border-radius: 4px;
}

img {
  /* width: 90%; */
  margin: 0 auto;
  border-radius: 4px;
  margin-bottom: 3rem;
}

.additional-content {
  margin-top: 3.5rem;
}

.additional-content > p {
  margin-top: 0.5rem;
}

.tip-band-mini {
  width: 10%;
  height: 4px;
  border-radius: 4px 4px 0px 0px;
  /* background-color: var(--active-tip); */
  background-color: #fff;
}

button {
  margin-bottom: 3rem;
}

/* table */
#water-table {
  border-collapse: collapse;
  /* margin-top: 3rem; */
  border: 3px solid #44475c;
}

#water-table th {
  position: sticky;
  top: -5.4rem;
  background-image: linear-gradient(
    89.8deg,
    rgba(25, 26, 26, 0.23) -18.6%,
    rgba(25, 26, 26, 0.49) -6.2%,
    rgba(25, 26, 26, 0.73) 14.9%,
    rgba(25, 26, 26, 0.91) 46.7%,
    rgba(25, 26, 26, 1) 76.1%
  );

  text-transform: uppercase;
  font-size: 90%;
  /* text-align: left; */
  background: #44475c;
  color: #fff;
  padding: 8px;
  min-width: 30px;
}

#water-table td {
  /* text-align: left; */
  padding: 8px;
  border-right: 2px solid #7d82a8;
}

/* #water-table td:last-child {
  border-right: none;
} */
#water-table tbody tr:nth-child(2n) td {
  background: var(--map-bg-color);
}

/* #water-table tbody tr:first-of-type {
  font-weight: 700;
  color: var(--special);
  border-bottom: 2px solid #fff;
  position: sticky;
  top: 50px;
} */

/* tag colors */
.area-upper-basin {
  /* #fd9935 */
  fill: rgba(253, 153, 53, 0.5);
  background-color: rgba(253, 153, 53, 0.5);
}
.area-lower-basin {
  /* #9e4f00 */
  fill: rgba(158, 79, 0, 0.5);
  background-color: rgba(158, 79, 0, 0.5);
}
.area-river {
  fill: #0ec7d8;
  background-color: #0ec7d8;
}

/* .tag-mini {
  font-size: 90%;
  margin-top: 0.25rem;
} */

li:before {
  content: url("../assets/icons/x-bullet.svg");
  margin-right: 12px;
}

ul {
  margin-left: 0;
}

@media (max-width: 600px) {
  nav {
    width: 100vw;
    min-width: 0;
  }

  .icon-holder {
    position: sticky;
    height: 90px;
    width: 100vw;
    border-bottom: 1px solid var(--border-color);
  }

  section {
    transform: translateX(0%);
  }

  section > div {
    padding-right: 2rem;
    padding-left: 2rem;
  }
}
</style>
