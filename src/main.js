import Vue from "vue";
import Buefy from "buefy";
import VueCookies from "vue-cookies";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "buefy/dist/buefy.css";
import "mdi/css/materialdesignicons.min.css";

Vue.use(Buefy);
Vue.use(VueCookies);

Vue.config.productionTip = false;

const app = new Vue({
  router,
  data() {
    return {
      isLoading: false
    };
  },
  store,
  methods: {
    setCookie(token) {
      const expires = "1d";
      const secure = true;
      const sameSite = "none";

      this.$cookies.set(
        "access_token",
        token,
        expires,
        null,
        null,
        secure,
        sameSite
      );
      this.$cookies.set("access_token", token, expires);
    },
    removeCookie() {
      this.$cookies.remove("access_token");
    },
    copy(text) {
      this.$copyText(text).then(
        // eslint-disable-next-line no-unused-vars
        success => {
          this.$buefy.toast.open({
            message: text + " 를 복사하였습니다.",
            type: "is-info"
          });
        },
        // eslint-disable-next-line no-unused-vars
        error => {
          this.$buefy.toast.open({
            message: "복사에 실패하였습니다.",
            type: "is-danger"
          });
        }
      );
    },
    showToast(type, message) {
      this.$buefy.toast.open({
        message,
        type
      });
    },
    showSuccessToast(message) {
      this.$buefy.toast.open({
        message,
        type: "is-info"
      });
    },
    showErrorToast(message, error) {
      this.$buefy.toast.open({
        message,
        type: "is-danger"
      });
      console.log(error.response);
    }
  },
  render: h => h(App)
}).$mount("#app");

export default app;
