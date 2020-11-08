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
    tempLogin(state) {
      const currentTime = new Date().getTime();
      state.loginState = "temporary";
      state.user = {
        userId: "tempUser" + currentTime,
        email: "",
        nickName: "사용자" + currentTime
      };
    },
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
    tempLogin({ commit }) {
      commit("tempLogin");
    },
    login({ commit }, loginInfo) {
      request
        .put(
          "/signin",
          {
            email: loginInfo.email,
            password: loginInfo.password
          },
          { isNotNeedFullLoading: true }
        )
        .then(res => {
          console.log("response=", res.data);
          commit("authSuccess", res.data);
        })
        .catch(err => {
          console.error(err);
          commit("authError");
        });
    },
    logout({ commit }) {}
  },
  modules: {}
});
