<template>
  <div class="show-list">
    검색된 공연수 : {{showData.length}} 개
    <br/>
    <transition name="fade">
    <div v-if="showData.length > 0" class="container show-list">
      <div class="columns is-multiline is-centered is-mobile">
        <div v-for="show in showData" v-bind:key="show.id">
          <div class="column">
            <show-card-item style="width:300px" :show="show"></show-card-item>
          </div>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import request from "../common/utils/http";
import ShowCardItem from "@/components/ShowCardItem";

export default {
  name: "ShowList",
  components: {
    ShowCardItem
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

<style scoped>
.show-list {
  padding: 1rem;
  height: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
