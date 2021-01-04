<template>
  <b-navbar type="is-white" spaced shadow fixed-top>
    <template slot="brand">
      <b-navbar-item tag="router-link" to="/">
        <div>
          <!--          <img src="./assets/logo.jpg" alt="온라인 공연 알리미" />-->
          <div class="subtitle">
            <strong>
              온라인 공연 알리미
            </strong>
          </div>
          <!--                    <div class="build-type">{{buildType}}</div>-->
        </div>
        <div class="build-type">
          alpha
        </div>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item
        v-if="!this.$store.getters['isLogin']"
        class="navbar-buttons"
        tag="div"
      >
        <b-button class="button" @click="moveToSignIn">
          로그인
        </b-button>
      </b-navbar-item>
      <b-navbar-item v-else class="navbar-buttons" tag="div">
        <b-navbar-item>
          <b-icon icon="bell" />
        </b-navbar-item>
        <div>
          <strong>{{ this.$store.getters["nickName"] }}</strong>
          님
        </div>
        <b-navbar-dropdown label="MY">
          <b-navbar-item href="/mypage">
            마이페이지
          </b-navbar-item>
          <b-navbar-item @click="logout">
            로그아웃
          </b-navbar-item>
        </b-navbar-dropdown>
      </b-navbar-item>
      <!--      <b-navbar-item tag="router-link" to="/about">-->
      <!--        온라인 공연 알리미가 궁금하신가요?-->
      <!--      </b-navbar-item>-->
    </template>
  </b-navbar>
</template>

<script>
import request from "./common/utils/http";

export default {
  name: "NavBar",
  data() {
    return {
      buildType: process.env.NODE_ENV
    };
  },
  methods: {
    moveToSignIn() {
      this.$router.push("signin");
    },
    logout() {
      request
        .put("/signout")
        .then(res => {
          console.log(res.data);
          this.$store.dispatch("logout");
          this.$buefy.toast.open({
            type: "is-info",
            message: "로그아웃"
          });
        })
        .catch(err => console.error(err));
    }
  }
};
</script>

<style lang="scss" scoped>
a.navbar-item.router-link-exact-active.router-link-active {
  color: #00bfba !important;
}
.navbar.is-black .navbar-start > a.navbar-item:hover {
  color: #00bfba;
  font-weight: bold;
}
.navbar.is-black {
  background-color: #12121c;
}
nav {
  padding: 0 32px;
  margin-bottom: 30px;
}
.build-type {
  font-size: 10px;
  text-align: center;
  margin-top: -20px;
  color: dimgray;
  font-weight: bold;
}
</style>
