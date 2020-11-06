<template>
  <div class="show-list">
    검색된 공연수 : {{showData.length}} 개
    <br/>
    <div v-for="poster in showData.map(show => show['포스터'])" v-bind:key="poster">
      <img :src="poster"/>
<!--      <show-card-item></show-card-item>-->
    </div>
  </div>
</template>

<script>
import request from "../common/utils/http";
// import ShowCardItem from "@/components/ShowCardItem";

export default {
  name: "ShowList",
  components: {
    // ShowCardItem
  },
  data() {
    return {
      headers: [],
      showData: []
    };
  },
  created() {
    request
      .get("/shows")
      .then(res => {
        this.headers = res.data.headers;
        this.showData = res.data.data;
      })
      .catch(err => console.log(err));
  }
};
</script>

<style scoped></style>
