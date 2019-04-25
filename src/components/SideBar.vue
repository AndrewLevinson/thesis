<template>
  <nav :class="[showPanel ? 'show-panel' : 'hide-panel']">
    <div class="icon-holder">
      <!-- <h6>Case Studies</h6> -->
      <div class="dots">
        <div :class="[scrollPosition == 2 ? 'active-dot': '']"></div>
        <div :class="[scrollPosition >= 3 && scrollPosition <= 5 ? 'active-dot': '']"></div>
        <div :class="[scrollPosition == 6 ? 'active-dot': '']"></div>
        <div :class="[scrollPosition >= 7 ? 'active-dot': '']"></div>
      </div>
    </div>
    <section :class="[showPanelContent ? 'show-panel-content' : 'hide-panel-content']">
      <div class="panel-content">
        <article v-if=" scrollPosition <= 2">
          <h3>American Southwest</h3>
          <h5>Drought</h5>
          <div class="image-holder">
            <!-- Photo by Pedro Lastra on Unsplash -->
            <img src="../assets/images/pedro-lastra-165298-unsplash.jpg" alt="colorado river">
            <!-- <caption>By: Pedro Lastra on Unsplash</caption> -->
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor expedita reiciendis, ad maxime, cumque quasi dolorem similique vitae laudantium optio nulla blanditiis facere aliquam. Suscipit aspernatur laboriosam consequatur nisi, quam qui modi mollitia facilis, quidem sint odio. Alias quod sunt doloribus magni eligendi, aspernatur voluptates atque accusamus quaerat eaque perferendis corrupti ipsa, quasi ducimus dicta! Neque excepturi porro laboriosam ipsa natus. Est, architecto. Doloremque nobis, recusandae vel quo inventore beatae placeat nihil accusantium dolores consequatur tempora sunt a dicta facere voluptatem deleniti doloribus quasi, optio reprehenderit. Voluptas quasi, necessitatibus modi quis accusantium blanditiis illum nisi vero. Atque explicabo ipsam eos quia. Asperiores minima quia temporibus unde, eos voluptas dolores fuga repellendus numquam, odio vero dolore ipsa, fugit quam dicta nam ex maiores! Consequatur, atque, facere nobis dolore sint sequi rerum asperiores voluptate amet enim non alias rem quaerat fugiat, obcaecati deserunt architecto ab incidunt porro voluptatibus? Impedit deserunt dolore, itaque doloremque ratione assumenda atque eos harum quidem consequuntur minima deleniti voluptatibus, commodi mollitia voluptatem delectus blanditiis id reiciendis? Animi excepturi enim non repellendus quaerat eos illum facere quae pariatur doloribus sapiente esse reprehenderit nulla, atque tempora amet cum? Perferendis temporibus magnam ipsa possimus doloribus provident? Delectus nesciunt accusantium in necessitatibus?</p>
        </article>
        <article v-else-if="scrollPosition >= 3 && scrollPosition <= 5">
          <h2>Groundwater Overabstraction</h2>
        </article>
        <article v-else-if="scrollPosition == 6">
          <h2>Drinking Water Infrastructure</h2>
        </article>
        <article v-else-if="scrollPosition >= 7">
          <h2>Contamination</h2>
        </article>
      </div>
    </section>
  </nav>
</template>

<script>
export default {
  name: "side-bar",
  props: ["scrollPosition"],
  data() {
    return { classyName: "", showPanel: false, showPanelContent: false };
  },
  watch: {
    scrollPosition: "scrollPanel"
  },
  methods: {
    scrollPanel(i) {
      switch (i) {
        case 0:
          console.log("im zero prop");
          this.showPanel = false;
          break;
        case 1:
          this.showPanel = true;
          this.showPanelContent = false;
          console.log("im 1 prop");

          break;
        case 2:
          this.showPanelContent = true;

          console.log("im 2 prop");
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
}
.dots div {
  width: 18px;
  height: 18px;
  border-radius: 100px;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.dots .active-dot {
  background-color: #fff;
}

section {
  height: 100vh;
  display: flex;
  text-align: left;
  /* background-color: var(--map-bg-color); */
  /* background-image: linear-gradient(
    90.2deg,
    rgba(221, 221, 221, 1) -9.2%,
    rgba(52, 51, 50, 0.58) 0%,
    rgba(52, 51, 50, 0.7) 6.6%,
    rgba(52, 51, 50, 0.8) 14.6%,
    rgba(52, 51, 50, 0.85) 30.7%,
    rgba(52, 51, 50, 0.92) 56.7%,
    rgba(52, 51, 50, 1) 83.3%
  ); */
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

.panel-content h3 {
  /* padding-top: 2rem; */
  /* margin-bottom: 0; */
}
.panel-content h5 {
  /* font-weight: 300; */
  /* font-family: monospace; */
  opacity: 0.7;
  margin-top: -2.5rem;
  /* margin-bottom: 0; */
}

.panel-content p {
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
