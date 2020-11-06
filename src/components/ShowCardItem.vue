<template>
  <div id="show-card">
    <div class="card">
      <div class="card-image">
        <figure class="image">
          <img :src="show['포스터']" @error="showErrorImage" alt="Placeholder image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
<!--          <div class="media-left">-->
<!--            <figure class="image is-48x48">-->
<!--              <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">-->
<!--            </figure>-->
<!--          </div>-->
          <div class="media-content">
            <p class="title is-4">{{show["공연 이름"]}}</p>
            <p class="subtitle is-6">@johnsmith</p>
          </div>
        </div>

        <div class="content">
          아무말2
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowCardItem",
  props: {
    show: Object,
  },
  methods: {
    showErrorImage(event) {
      event.target.src='https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa2e307ac-9743-45c9-aea5-20ef7344c51a%2F-.jpg?table=block&id=1642c5bb-3350-4116-8b6d-5879fa75eb3c&width=250&userId=da18117b-c7bf-404f-898c-09e7ae5a6ccc&cache=v2'
      // event.target.src = "../assets/logo.jpg";
    }
  }
};
</script>

<style scoped>

</style>