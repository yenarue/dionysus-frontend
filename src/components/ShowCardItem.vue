<template>
  <div id="show-card">
    <div class="card">
      <div class="card-image">
        <figure class="image">
          <b-tag class="image-tag" type="is-warning" size="is-medium">
            {{ show["공연 종류"] }}
          </b-tag>
          <img
            class="poster"
            :src="show['포스터'] || config.defaultImageUrl"
            alt="Placeholder image"
            @error="showErrorImage"
          />
        </figure>
      </div>
      <div class="card-content">
        <div class="tags">
          <b-tag
            :type="(isOnline ? 'is-info' : 'is-black') + ' is-light'"
            size="is-small"
          >
            {{ isOnline ? "온라인" : "오프라인" }}
          </b-tag>
          <b-tag
            :type="(isDomestic ? 'is-primary' : 'is-danger') + ' is-light'"
            size="is-small"
          >
            {{ show["국내/외"] }}
          </b-tag>
          <b-tag
            :type="(isFree ? 'is-success' : 'is-warning') + ' is-light'"
            size="is-small"
          >
            {{ show["무/유료"] }}
          </b-tag>
          <b-tag type="is-black is-light" size="is-small">
            {{ show["관람등급"] }}
          </b-tag>
        </div>

        <div class="media">
          <div class="media-left">
            <div class="heart">
              <toggle-favorite
                :favorited="isHeart"
                @toggle="onToggleFavorite"
              />
              <div class="count">
                {{ this.heartCount }}
              </div>
            </div>
          </div>
          <div class="media-content">
            <p class="title is-5">
              {{ show["공연 이름"] }}
            </p>
          </div>
        </div>

        <div class="content">
          <div v-if="show.tags.length > 0">
            {{ "#" + show.tags.join(" #") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleFavorite from "@/components/widgets/ToggleFavorite";
import request from "@/common/utils/http";
import config from "../../config";

export default {
  name: "ShowCardItem",
  components: {
    ToggleFavorite
  },
  props: {
    show: Object,
    isShowHeartMessage: Boolean
  },
  data() {
    return {
      isOnline: this.show["온/오프"] === "on",
      isDomestic: this.show["국내/외"] === "국내",
      isFree: this.show["무/유료"] === "무료",
      isHeart: false,
      heartCount: 130
    };
  },
  methods: {
    onClickFavoriteButton() {
      console.log("clicked");
      this.isHeart = !this.isHeart;
    },
    onToggleFavorite(isOn) {
      const showId = this.show["고유b"];
      const userId = this.$store.getters.userId;

      // heart api
      const heart = {
        showId,
        authType: this.$store.getters.isLogin ? "login" : "temp",
        userId
      };

      const axiosConfig = {
        isNotNeedFullLoading: true,
        headers: {
          "x-id-token": userId
        }
      };

      const reqPromise = isOn
        ? request.put("/shows/heart/" + showId, heart, axiosConfig)
        : request.delete("/shows/heart/" + showId, axiosConfig);

      reqPromise
        .then(res => {
          console.log(res);
          this.isHeart = isOn;
          isOn ? this.heartCount++ : this.heartCount--;

          // send event to parent
          this.$emit("heart-toggle", {
            toggle: isOn,
            showId
          });

          // show message snackbar
          if (this.isShowHeartMessage && isOn) {
            this.$buefy.snackbar.open({
              duration: 2000,
              message: "완전 꿀잼각! +❤️ " + this.show["공연 이름"],
              type: "is-danger",
              position: "is-bottom-right",
              queue: false
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    showErrorImage(event) {
      event.target.src = config.defaultImageUrl;
      // event.target.src = "../assets/logo.jpg";
    }
  }
};
</script>

<style scoped>
.poster {
  height: 300px;
  object-fit: cover;
}

.image-tag {
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  background: #4a4a4a;
  color: white;
}

.tags {
}
.heart {
  alignment: center;
  display: inline-block;
}
.heart .count {
  font-size: 10px;
  margin-top: -5px;
  text-align: center;
  alignment: center;
  margin-left: 1px;
}
</style>
