<template>
  <div class="">
    <div class="head">
      <transition name="fade">
        <div class="head-container">
          <b-image class="blur" :src="require('@/assets/main_image_1.jpg')">
            <b-skeleton
              slot="placeholder"
              class="skeleton-placeholder"
              height="100%"
            ></b-skeleton>
          </b-image>
          <div
            class="title centered has-text-white"
            style="text-shadow: black 1px 0 10px"
          >
            트리거 문구1<br />
            아래에서 구경하세요 블라블라
          </div>
        </div>
      </transition>
    </div>
    <div v-if="!$root.isLoading" class="show-list container">
      <!--    검색된 공연수 : {{ showData.length }} 개-->
      <transition name="fade">
        <div v-if="showData.length > 0" class="container show-list">
          <div class="columns is-multiline is-centered is-mobile">
            <div
              v-for="show in showData.slice(offset, limit * page)"
              :key="show.id"
            >
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
    </div>
    <div v-else>
      <div class="title head" style="display: inline-flex">
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
import SignUpForm from "@/components/forms/SignUpForm";
import SignInForm from "@/components/forms/SignInForm";
import request from "../common/utils/http";
import config from "../../config";

export default {
  name: "ShowList",
  components: {
    ShowCardItem
  },
  data() {
    return {
      headers: [],
      showData: [],
      classes: [],
      heartShowIds: [],
      offset: 0,
      limit: 12,
      page: 1
    };
  },
  created() {
    if (process.env.NODE_ENV === "development" && config.useDummyData) {
      this.$root.isLoading = true;
      const data = require("../../tests/data/shows.json");
      this.setShowData(data.headers, data.data);
      this.$root.isLoading = false;
    } else {
      request
        .get("/shows")
        .then(res => {
          console.log(res.data.data[0]);
          this.setShowData(res.data.headers, res.data.data);
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    window.onscroll = () => {
      const bottomOfWindow =
        Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ) +
          window.innerHeight ===
        document.documentElement.offsetHeight;

      if (bottomOfWindow) {
        console.log("bottom!");
        this.page++;
      }
    };
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
    showSignUpModal() {
      this.$buefy.modal.open({
        parent: this,
        component: SignUpForm,
        props: {
          heartedShows: this.showData
            .filter(show => this.heartShowIds.includes(show.id))
            .map(show => {
              show.isHeart = true;
              return show;
            })
        },
        events: {
          complete: value => {
            console.log("회원가입 완료!");
          },
          "open-signin-form": value => {
            this.showSignInModal();
          }
        },
        hasModalCard: true,
        trapFocus: true
      });
    },
    showSignInModal() {
      this.$buefy.modal.open({
        parent: this,
        component: SignInForm,
        hasModalCard: true,
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
        this.showSignUpModal();
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
  padding: 0 0 5rem 0;
}

.head-container {
  position: relative;
  text-align: center;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.blur {
  -webkit-filter: blur(2px);
  -moz-filter: blur(2px);
  -o-filter: blur(2px);
  -ms-filter: blur(2px);
  filter: blur(2px);
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
