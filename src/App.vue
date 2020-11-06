<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view />
    <go-top
      :size="50"
      :right="100"
      bg-color="#000"
      :has-outline="false"
    ></go-top>
    <div class="vld-parent">
      <loading
        :active.sync="$root.isLoading"
        :can-cancel="false"
        :is-full-page="true"
        color="#00BFBA"
        :height="64"
        :width="64"
        :z-index="9999"
        loader="dots"
      ></loading>
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import GoTop from "@inotom/vue-go-top";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

const packageJson = require("../package.json");

export default {
  components: {
    "nav-bar": NavBar,
    "go-top": GoTop,
    loading: Loading
  },
  data() {
    return {
      buildType: process.env.NODE_ENV,
      version: JSON.stringify(packageJson.version).replace(/"/g, "")
    };
  }
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Noto+Sans+KR:wght@400;700;900&family=Pacifico&display=swap");

// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #00bfba;
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "white": (
    $white,
    $black
  ),
  "black": (
    $black,
    $white
  ),
  "light": (
    $light,
    $light-invert
  ),
  "dark": (
    $dark,
    $dark-invert
  ),
  "primary": (
    $primary,
    $primary-invert
  ),
  "info": (
    $info,
    $info-invert
  ),
  "success": (
    $success,
    $success-invert
  ),
  "warning": (
    $warning,
    $warning-invert
  ),
  "danger": (
    $danger,
    $danger-invert
  ),
  "twitter": (
    $twitter,
    $twitter-invert
  )
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

#app {
  font-family: "Noto Sans KR", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
