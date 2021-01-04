import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import authStoreModule from "@/store/authStoreModule";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ["auth"]
    })
  ],
  modules: {
    auth: authStoreModule
  }
});
