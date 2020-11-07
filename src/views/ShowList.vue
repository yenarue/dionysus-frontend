<template>
  <div class="show-list">
    <div v-if="!$root.isLoading" class="container">
      <!--    검색된 공연수 : {{ showData.length }} 개-->
      <div class="title">
        꿀잼각이거나 꿀잼이었던 공연
        <toggle-favorite ref="heartButton" />
        표시하기
      </div>
      저희가 잘 <b>기억</b>해뒀다가 <b>알려</b>드릴게요 😉
      <br />
      <br />
      <transition name="fade">
        <div v-if="showData.length > 0" class="container show-list">
          <div class="columns is-multiline is-centered is-mobile">
            <div v-for="show in showData" :key="show.id">
              <div class="column" :class="classes">
                <show-card-item
                  style="width:300px"
                  :show="show"
                ></show-card-item>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div v-else>
      <div class="title" style="display: inline-flex">
        나만 알고싶은
        <div style="color: #2c3e50; margin: 0 5px 0 5px;">
          꿀잼
        </div>
        공연들 불러오는중 😉
      </div>
    </div>
  </div>
</template>

<script>
import ShowCardItem from "@/components/ShowCardItem";
import ToggleFavorite from "@/components/widgets/ToggleFavorite";
import request from "../common/utils/http";

export default {
  name: "ShowList",
  components: {
    ToggleFavorite,
    ShowCardItem
  },
  data() {
    return {
      headers: [],
      showData: [],
      classes: []
    };
  },
  created() {
    request
      .get("/shows")
      .then(res => {
        this.headers = res.data.headers;
        this.showData = res.data.data;

        console.log("검색된 공연수 : " + this.showData.length + "개");

        setTimeout(() => {
          this.$refs.heartButton.toggle();
        }, 500);
      })
      .catch(err => console.log(err));
  },
  methods: {
    // @mouseover="hoverOver" @mouseout="hoverOut"
    // hoverOver: function() {
    //   console.log('over');
    //   this.classes = ['animated', 'tada']
    // },
    // hoverOut: function() {
    //   console.log('out');
    //   this.classes = []
    // },
  }
};
</script>

<style scoped>
.show-list {
  padding: 1rem;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
 {
  opacity: 0;
}
</style>
