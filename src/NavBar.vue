<template>
  <b-navbar type="is-white" spaced shadow fixed-top>
    <template slot="brand">
      <b-navbar-item tag="router-link" to="/">
        <div>
          <!--          <img src="./assets/logo.jpg" alt="온라인 공연 알리미" />-->
          <div class="subtitle">
            온라인 공연 알리미
          </div>
          <!--                    <div class="build-type">{{buildType}}</div>-->
        </div>
        <div class="build-type">
          alpha
        </div>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" to="/">
        Home
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      buildType: process.env.NODE_ENV
    };
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
