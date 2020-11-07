<template>
  <div class="show-list">
    <div v-if="!$root.isLoading" class="container">
      <!--    검색된 공연수 : {{ showData.length }} 개-->
      <div class="head">
        <div class="title">
          꿀잼각이거나 꿀잼이었던 공연
          <toggle-favorite ref="heartButton" />
          표시하기
        </div>
        저희가 잘 <b>기억</b>해뒀다가 <b>알려</b>드릴게요 😉
      </div>
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
                  :is-show-heart-message="false"
                  @heart-toggle="onToggleHeart"
                ></show-card-item>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div class="summary-container">
        <b-button
          class="heart-summary"
          type="is-danger"
          icon-left="mdiHeart"
          rounded
          @click="onClickHeartButton"
        >
          <div style="display: inline-flex">
            <div v-if="heartShowIds.length > 0">
              {{ this.$store.getters.nickName }} 님의
              <strong>{{ this.heartShowIds.length }} 가지 꿀잼 공연</strong>이
              담겨있어요
            </div>
            <div v-else>
              {{ this.$store.getters.nickName }} 님의
              <strong>꿀잼 공연</strong>을 담아보세요
            </div>
          </div>
        </b-button>
      </div>
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
import SignUpForm from "@/components/modal/SignUpForm";
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
      classes: [],
      heartShowIds: []
    };
  },
  created() {
    if (process.env.NODE_ENV === "development") {
      this.$root.isLoading = true;
      const data = require("../../tests/data/shows.json");
      this.setShowData(data.headers, data.data);
      this.$root.isLoading = false;
    } else {
      request
        .get("/shows")
        .then(res => {
          this.setShowData(res.data.headers, res.data.data);
        })
        .catch(err => console.log(err));
    }
  },
  methods: {
    setShowData(headers, showData) {
      this.headers = headers;
      this.showData = showData;

      console.log("검색된 공연수 : " + this.showData.length + "개");

      setTimeout(() => {
        this.$refs.heartButton.toggle();
      }, 500);
    },
    moveToMyPage() {
      this.$buefy.toast.open({
        message: "👷‍♀️ 마이페이지 오픈 준비중  👷‍♂️"
      });
    },
    showLoginModal() {
      this.$buefy.modal.open({
        parent: this,
        component: SignUpForm,
        hasModalCard: true,
        customClass: "custom-class custom-class-2",
        trapFocus: true
      });
    },
    onToggleHeart(result) {
      const isOn = result.toggle;
      const showId = result.showId;

      if (isOn) {
        this.heartShowIds.push(showId);
      } else {
        const index = this.heartShowIds.indexOf(showId);
        if (index > -1) {
          this.heartShowIds.splice(index, 1);
        }
      }

      console.log(this.heartShowIds);
    },
    onClickHeartButton() {
      if (this.$store.getters.isLogin) {
        this.moveToMyPage();
      } else {
        this.showLoginModal();
      }
    }
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

.heart-summary {
  position: fixed;
  top: 1.5rem;
  right: 10px;
  z-index: 35;
}

.head {
  padding: 3rem 0 0 2rem;
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
