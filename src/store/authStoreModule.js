const state = {
  user: {
    userId: "",
    email: "",
    nickName: ""
  },
  loginState: ""
};

const getters = {
  user: state => state.user,
  userId: state => state.user.userId,
  email: state => state.user.email,
  nickName: state => state.user.nickName,
  isLogin: state => state.loginState === "success"
};

const mutations = {
  UPDATE_LOGIN_STATE(state, data) {
    state.loginState = data.state;

    if (data.userInfo) {
      state.user = {
        ...data.userInfo
      };
    }
  }
};

const actions = {
  login({ commit, state }, data) {
    console.log("login");
    commit("UPDATE_LOGIN_STATE", {
      state: "success",
      userInfo: data
    });
  },
  logout({ commit, state }, data) {
    commit("UPDATE_LOGIN_STATE", {
      state: "",
      userInfo: {
        userId: "",
        email: "",
        nickName: ""
      }
    });
  },
  error({ commit, state }, data) {
    commit("UPDATE_LOGIN_STATE", {
      state: "error"
    });
  }
};

export default {
  // strict: process.env.NODE_ENV !== 'production',
  state: {
    ...state
  },
  getters,
  mutations,
  actions
};
