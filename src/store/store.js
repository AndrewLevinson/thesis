import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isPlaying: null,
    isFinished: false
  },
  mutations: {
    updatePlaying(state, isPlaying) {
      state.isPlaying = isPlaying;
    },
    finishedPlaying(state, isFinished) {
      state.isFinished = isFinished;
    }
  },
  getters: {
    playing: state => state.isPlaying,
    finished: state => state.isFinished
  }
});
