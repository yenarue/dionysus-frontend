import Vue from "vue";
import Vuex from "vuex";
import request from "@/common/utils/http";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      userId: "",
      email: "",
      nickName: ""
    },
    loginState: ""
  },
  getters: {
    user: state => state.user,
    userId: state => state.user.userId,
    email: state => state.user.email,
    nickName: state => state.user.nickName,
    isLogin: state => state.loginState === "success"
  },
  mutations: {
    logout(state) {
      state.loginState = "";
      state.user = {
        userId: "",
        email: "",
        nickName: ""
      };
    },
    authSuccess(state, user) {
      state.loginState = "success";
      state.user = {
        userId: user.userId,
        email: user.email,
        nickName: user.nickName
      };
    },
    authError(state) {
      state.loginState = "error";
    },
    authRequest(state) {
      state.loginState = "request";
    }
  },
  actions: {
    // 생각해보니 로그인로직은 그냥 액션에다가 해도 되지않나?
  },
  modules: {}
});
