<template>
  <nav :class="[showPanel ? 'show-panel' : 'hide-panel']">
    <div class="icon-holder">
      <div class="panel-tip-band"></div>
      <!-- <h6>Case Studies</h6> -->
      <div class="dots">
        <div :class="[scrollPosition >= 2 && scrollPosition <= 3 ? 'active-dot': 'dot']">
          <div></div>
          <p>Drought</p>
        </div>
        <div :class="[scrollPosition >= 4 && scrollPosition <= 5 ? 'active-dot': 'dot']">
          <div></div>
          <p>Groundwater</p>
        </div>
        <div :class="[scrollPosition >= 6 ? 'active-dot': 'dot']">
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
          <h2>Drought</h2>
          <h5>Colorado River</h5>
          <div class="image-holder">
            <!-- Photo by Pedro Lastra on Unsplash -->
            <img src="../assets/images/pedro-lastra-165298-unsplash.jpg" alt="colorado river">
            <!-- <caption>By: Pedro Lastra on Unsplash</caption> -->
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor expedita reiciendis, ad maxime, cumque quasi dolorem similique vitae laudantium optio nulla blanditiis facere aliquam. Suscipit aspernatur laboriosam consequatur nisi, quam qui modi mollitia facilis, quidem sint odio. Alias quod sunt doloribus magni eligendi, aspernatur voluptates atque accusamus quaerat eaque perferendis corrupti ipsa, quasi ducimus dicta! Neque excepturi porro laboriosam ipsa natus. Est, architecto. Doloremque nobis, recusandae vel quo inventore beatae placeat nihil accusantium dolores consequatur tempora sunt a dicta facere voluptatem deleniti doloribus quasi, optio reprehenderit. Voluptas quasi, necessitatibus modi quis accusantium blanditiis illum nisi vero. Atque explicabo ipsam eos quia. Asperiores minima quia temporibus unde, eos voluptas dolores fuga repellendus numquam, odio vero dolore ipsa, fugit quam dicta nam ex maiores! Consequatur, atque, facere nobis dolore sint sequi rerum asperiores voluptate amet enim non alias rem quaerat fugiat, obcaecati deserunt architecto ab incidunt porro voluptatibus? Impedit deserunt dolore, itaque doloremque ratione assumenda atque eos harum quidem consequuntur minima deleniti voluptatibus, commodi mollitia voluptatem delectus blanditiis id reiciendis? Animi excepturi enim non repellendus quaerat eos illum facere quae pariatur doloribus sapiente esse reprehenderit nulla, atque tempora amet cum? Perferendis temporibus magnam ipsa possimus doloribus provident? Delectus nesciunt accusantium in necessitatibus?</p>
        </article>
        <article v-else-if="scrollPosition === 3">
          <h2>Drought</h2>
          <h5>Southern California Pricing Tiers</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor expedita reiciendis, ad maxime, cumque quasi dolorem similique vitae laudantium optio nulla blanditiis facere aliquam. Suscipit aspernatur laboriosam consequatur nisi, quam qui modi mollitia facilis, quidem sint odio. Alias quod sunt doloribus magni eligendi, aspernatur voluptates atque accusamus quaerat eaque perferendis corrupti ipsa, quasi ducimus dicta! Neque excepturi porro laboriosam ipsa natus. Est, architecto. Doloremque nobis, recusandae vel quo inventore beatae placeat nihil accusantium dolores consequatur tempora sunt a dicta facere voluptatem deleniti doloribus quasi, optio reprehenderit. Voluptas quasi, necessitatibus modi quis accusantium blanditiis illum nisi vero. Atque explicabo ipsam eos quia. Asperiores minima quia temporibus unde, eos voluptas dolores fuga repellendus numquam, odio vero dolore ipsa, fugit quam dicta nam ex maiores! Consequatur, atque, facere nobis dolore sint sequi rerum asperiores voluptate amet enim non alias rem quaerat fugiat, obcaecati deserunt architecto ab incidunt porro voluptatibus? Impedit deserunt dolore, itaque doloremque ratione assumenda atque eos harum quidem consequuntur minima deleniti voluptatibus, commodi mollitia voluptatem delectus blanditiis id reiciendis? Animi excepturi enim non repellendus quaerat eos illum facere quae pariatur doloribus sapiente esse reprehenderit nulla, atque tempora amet cum? Perferendis temporibus magnam ipsa possimus doloribus provident? Delectus nesciunt accusantium in necessitatibus?</p>
        </article>
        <article v-else-if="scrollPosition === 4">
          <h2>Groundwater Overabstraction</h2>
          <h5>Ogallala Depletion</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor expedita reiciendis, ad maxime, cumque quasi dolorem similique vitae laudantium optio nulla blanditiis facere aliquam. Suscipit aspernatur laboriosam consequatur nisi, quam qui modi mollitia facilis, quidem sint odio. Alias quod sunt doloribus magni eligendi, aspernatur voluptates atque accusamus quaerat eaque perferendis corrupti ipsa, quasi ducimus dicta! Neque excepturi porro laboriosam ipsa natus. Est, architecto. Doloremque nobis, recusandae vel quo inventore beatae placeat nihil accusantium dolores consequatur tempora sunt a dicta facere voluptatem deleniti doloribus quasi, optio reprehenderit. Voluptas quasi, necessitatibus modi quis accusantium blanditiis illum nisi vero. Atque explicabo ipsam eos quia. Asperiores minima quia temporibus unde, eos voluptas dolores fuga repellendus numquam, odio vero dolore ipsa, fugit quam dicta nam ex maiores! Consequatur, atque, facere nobis dolore sint sequi rerum asperiores voluptate amet enim non alias rem quaerat fugiat, obcaecati deserunt architecto ab incidunt porro voluptatibus? Impedit deserunt dolore, itaque doloremque ratione assumenda atque eos harum quidem consequuntur minima deleniti voluptatibus, commodi mollitia voluptatem delectus blanditiis id reiciendis? Animi excepturi enim non repellendus quaerat eos illum facere quae pariatur doloribus sapiente esse reprehenderit nulla, atque tempora amet cum? Perferendis temporibus magnam ipsa possimus doloribus provident? Delectus nesciunt accusantium in necessitatibus?</p>
        </article>
        <article v-else-if="scrollPosition === 5">
          <h2>Groundwater Overabstraction</h2>
          <h5>Saltwater Contamination</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor expedita reiciendis, ad maxime, cumque quasi dolorem similique vitae laudantium optio nulla blanditiis facere aliquam. Suscipit aspernatur laboriosam consequatur nisi, quam qui modi mollitia facilis, quidem sint odio. Alias quod sunt doloribus magni eligendi, aspernatur voluptates atque accusamus quaerat eaque perferendis corrupti ipsa, quasi ducimus dicta! Neque excepturi porro laboriosam ipsa natus. Est, architecto. Doloremque nobis, recusandae vel quo inventore beatae placeat nihil accusantium dolores consequatur tempora sunt a dicta facere voluptatem deleniti doloribus quasi, optio reprehenderit. Voluptas quasi, necessitatibus modi quis accusantium blanditiis illum nisi vero. Atque explicabo ipsam eos quia. Asperiores minima quia temporibus unde, eos voluptas dolores fuga repellendus numquam, odio vero dolore ipsa, fugit quam dicta nam ex maiores! Consequatur, atque, facere nobis dolore sint sequi rerum asperiores voluptate amet enim non alias rem quaerat fugiat, obcaecati deserunt architecto ab incidunt porro voluptatibus? Impedit deserunt dolore, itaque doloremque ratione assumenda atque eos harum quidem consequuntur minima deleniti voluptatibus, commodi mollitia voluptatem delectus blanditiis id reiciendis? Animi excepturi enim non repellendus quaerat eos illum facere quae pariatur doloribus sapiente esse reprehenderit nulla, atque tempora amet cum? Perferendis temporibus magnam ipsa possimus doloribus provident? Delectus nesciunt accusantium in necessitatibus?</p>
        </article>
        <article v-else-if="scrollPosition === 6">
          <h2>Drinking Water Infrastructure</h2>
          <button
            v-if="!$store.getters.playing"
            @click="playingSideBar(true)"
            class="play-button"
          >Replay Animation</button>
          <button v-else @click="playingSideBar(false)" class="play-button">Stop Animation</button>
          <!-- <div v-if="$store.getters.playing">
            <h5 class="total">{{ currentState }}</h5>
            <p class="datum">{{ numFormater(currentRepair) }}</p>
          </div>-->
          <table v-show="$store.getters.finished && !$store.getters.playing" id="water-table">
            <thead>
              <tr>
                <th>State</th>
                <th class="pull-right">Repairs Needed</th>
                <!-- <th>Partial Participation</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="place in places.slice().reverse()" :class="place.state" :key="place.state">
                <td class="pull-left">{{place.state}}</td>
                <td class="pull-right">{{numFormater(place.repair)}}</td>
                <!-- <td>{{place.partial}}</td> -->
              </tr>
            </tbody>
          </table>
        </article>
        <article v-else-if="scrollPosition == 7">
          <h2>Drinking Water Infrastructure</h2>
          <h5>Sewer System Contamination</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor expedita reiciendis, ad maxime, cumque quasi dolorem similique vitae laudantium optio nulla blanditiis facere aliquam. Suscipit aspernatur laboriosam consequatur nisi, quam qui modi mollitia facilis, quidem sint odio. Alias quod sunt doloribus magni eligendi, aspernatur voluptates atque accusamus quaerat eaque perferendis corrupti ipsa, quasi ducimus dicta! Neque excepturi porro laboriosam ipsa natus. Est, architecto. Doloremque nobis, recusandae vel quo inventore beatae placeat nihil accusantium dolores consequatur tempora sunt a dicta facere voluptatem deleniti doloribus quasi, optio reprehenderit. Voluptas quasi, necessitatibus modi quis accusantium blanditiis illum nisi vero. Atque explicabo ipsam eos quia. Asperiores minima quia temporibus unde, eos voluptas dolores fuga repellendus numquam, odio vero dolore ipsa, fugit quam dicta nam ex maiores! Consequatur, atque, facere nobis dolore sint sequi rerum asperiores voluptate amet enim non alias rem quaerat fugiat, obcaecati deserunt architecto ab incidunt porro voluptatibus? Impedit deserunt dolore, itaque doloremque ratione assumenda atque eos harum quidem consequuntur minima deleniti voluptatibus, commodi mollitia voluptatem delectus blanditiis id reiciendis? Animi excepturi enim non repellendus quaerat eos illum facere quae pariatur doloribus sapiente esse reprehenderit nulla, atque tempora amet cum? Perferendis temporibus magnam ipsa possimus doloribus provident? Delectus nesciunt accusantium in necessitatibus?</p>
        </article>
        <article v-else-if="scrollPosition == 8">
          <h2>Drinking Water Infrastructure</h2>
          <h5>Lead Contamination</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor expedita reiciendis, ad maxime, cumque quasi dolorem similique vitae laudantium optio nulla blanditiis facere aliquam. Suscipit aspernatur laboriosam consequatur nisi, quam qui modi mollitia facilis, quidem sint odio. Alias quod sunt doloribus magni eligendi, aspernatur voluptates atque accusamus quaerat eaque perferendis corrupti ipsa, quasi ducimus dicta! Neque excepturi porro laboriosam ipsa natus. Est, architecto. Doloremque nobis, recusandae vel quo inventore beatae placeat nihil accusantium dolores consequatur tempora sunt a dicta facere voluptatem deleniti doloribus quasi, optio reprehenderit. Voluptas quasi, necessitatibus modi quis accusantium blanditiis illum nisi vero. Atque explicabo ipsam eos quia. Asperiores minima quia temporibus unde, eos voluptas dolores fuga repellendus numquam, odio vero dolore ipsa, fugit quam dicta nam ex maiores! Consequatur, atque, facere nobis dolore sint sequi rerum asperiores voluptate amet enim non alias rem quaerat fugiat, obcaecati deserunt architecto ab incidunt porro voluptatibus? Impedit deserunt dolore, itaque doloremque ratione assumenda atque eos harum quidem consequuntur minima deleniti voluptatibus, commodi mollitia voluptatem delectus blanditiis id reiciendis? Animi excepturi enim non repellendus quaerat eos illum facere quae pariatur doloribus sapiente esse reprehenderit nulla, atque tempora amet cum? Perferendis temporibus magnam ipsa possimus doloribus provident? Delectus nesciunt accusantium in necessitatibus?</p>
        </article>
      </div>
    </section>
  </nav>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "side-bar",
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
      console.log(`Updating from ${oldValue} to ${newValue}`);
      // Do whatever makes sense now
      if (newValue) {
        this.showPanelContent = true;
      } else {
        this.showPanelContent = false;
      }
    },
    stillPlaying(newValue, oldValue) {
      console.log(`Updating from ${oldValue} to ${newValue}`);
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
        case 5:
          this.showPanelContent = true;
          break;
        case 6:
          this.$store.getters.finished && !this.$store.getters.playing
            ? (this.showPanelContent = true)
            : (this.showPanelContent = false);
          break;
        case 7:
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
  height: 6px;
  width: 100%;
  background-color: var(--special);
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
  padding-top: 3rem;
}
.dots .dot div,
.dots .active-dot div {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  margin: 0 auto;
}

.dots .active-dot div {
  /* background-color: #fff; */
  background-color: var(--special);
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
  background-image: linear-gradient(
    89.8deg,
    rgba(25, 26, 26, 0.23) -18.6%,
    rgba(25, 26, 26, 0.49) -6.2%,
    rgba(25, 26, 26, 0.73) 14.9%,
    rgba(25, 26, 26, 0.91) 46.7%,
    rgba(25, 26, 26, 1) 76.1%
  );
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.35);
  position: sticky;
  top: 0;
}

.panel-content {
  padding: 3rem;
  padding-top: 4rem;
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
  font-size: 95%;
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
  top: -3.6rem;
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

table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: var(--map-bg-color);
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
