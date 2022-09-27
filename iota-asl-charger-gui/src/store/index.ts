import Vue from "vue";
import Vuex from "vuex";
import IotaModule from "./modules/iota-module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    IotaModule,
  },
});
