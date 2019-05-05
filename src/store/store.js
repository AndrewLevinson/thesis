import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isPlaying: null
  },
  mutations: {
    updatePlaying(state, isPlaying) {
      state.isPlaying = isPlaying;
    }
  },
  getters: {
    playing: state => state.isPlaying
  }
});
