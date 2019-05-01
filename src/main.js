import Vue from "vue";
import "./assets/css/normalize.css";
import "./assets/css/default.css";
import "./assets/css/typography.css";
import "./assets/css/slider.css";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
