import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: "",
    nickName: "",
    loginState: ""
  },
  getters: {
    userId: state => state.userId,
    nickName: state => state.nickName,
    loginState: state => state.loginState
  },
  mutations: {
    tempLogin(state) {
      const currentTime = new Date().getTime();
      state.loginState = "temporary";
      state.userId = "user" + currentTime;
      state.nickName = "사용자" + currentTime;
    },
    logout(state) {
      state.loginState = "";
      state.nickName = "";
    },
    authSuccess(state, nickName) {
      state.loginState = "success";
      state.nickName = nickName;
    },
    authError(state) {
      state.loginState = "error";
    },
    authRequest(state) {
      state.loginState = "request";
    }
  },
  actions: {
    tempLogin({ commit }) {
      commit("tempLogin");
    },
    login({ commit }, accessToken) {},
    logout({ commit }) {}
  },
  modules: {}
});
