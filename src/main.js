import Vue from "vue";
import App from "./App.vue";
import "./assets/css/normalize.css";
import "./assets/css/default.css";
import "./assets/css/typography.css";
import "./assets/css/slider.css";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
