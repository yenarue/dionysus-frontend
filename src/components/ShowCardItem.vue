<template>
  <div id="show-card">
    <div class="card">
      <div class="card-image">
        <figure class="image">
          <b-tag class="image-tag" type="is-warning" size="is-medium">
            {{ show["공연 종류"] }}
          </b-tag>
          <img
            :src="show['포스터']"
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
            :type="(isDomestic ? 'is-success' : 'is-danger') + ' is-light'"
            size="is-small"
          >
            {{ show["국내/외"] }}
          </b-tag>
        </div>

        <div class="media">
          <div class="media-left">
            <toggle-favorite :favorited="isHeart" @toggle="onToggleFavorite" />
            <!--            <favorite-button name="test" :value="isHeart" @click="onClickFavoriteButton"></favorite-button>-->
            <!--            <b-tag :type="(isOnline ? 'is-info' : 'is-black') + ' is-light'"-->
            <!--                   size="is-small">-->
            <!--              {{ isOnline ? "온라인" : "오프라인" }}-->
            <!--            </b-tag><br/>-->
            <!--            <b-tag :type="(isDomestic ? 'is-success' : 'is-danger') + ' is-light'"-->
            <!--                   size="is-small">-->
            <!--              {{ show["국내/외"] }}-->
            <!--            </b-tag>-->
          </div>
          <div class="media-content">
            <p class="title is-5">
              {{ show["공연 이름"] }}
            </p>
            <!--            <p v-if="show.tags.length > 0" class="subtitle is-6">-->
            <!--              {{ "#" + show.tags.join("# ") }}-->
            <!--            </p>-->
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

export default {
  name: "ShowCardItem",
  components: {
    ToggleFavorite
  },
  props: {
    show: Object
  },
  data() {
    return {
      isOnline: this.show["온/오프"] === "on",
      isDomestic: this.show["국내/외"] === "국내",
      isHeart: true
    };
  },
  methods: {
    onClickFavoriteButton() {
      console.log("clicked");
      this.isHeart = !this.isHeart;
    },
    onToggleFavorite(value) {
      this.isHeart = value;
    },
    showErrorImage(event) {
      event.target.src =
        "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa2e307ac-9743-45c9-aea5-20ef7344c51a%2F-.jpg?table=block&id=1642c5bb-3350-4116-8b6d-5879fa75eb3c&width=250&userId=da18117b-c7bf-404f-898c-09e7ae5a6ccc&cache=v2";
      // event.target.src = "../assets/logo.jpg";
    }
  }
};
</script>

<style scoped>
.image-tag {
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  background: #4a4a4a;
  color: white;
}

.tags {
}

button {
  background: none;
  border: none;
  padding: 0;
  outline: inherit;
  cursor: pointer;
}
</style>
