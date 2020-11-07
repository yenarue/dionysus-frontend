<!--<template>-->
<!--  <div class="favoriting">-->
<!--    <label-->
<!--      class="favorite__heart"-->
<!--      :class="{-->
<!--        favorite__heart__selected: value,-->
<!--        'is-disabled': disabled-->
<!--      }"-->
<!--      @click="favorite"-->
<!--    >-->
<!--      <input-->
<!--        v-model="value"-->
<!--        class="favorite__checkbox"-->
<!--        type="checkbox"-->
<!--        :name="name"-->
<!--        :value="value"-->
<!--        :required="required"-->
<!--        :disabled="disabled"-->
<!--      />-->
<!--      ❤-->
<!--    </label>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "FavoriteButton",-->
<!--  props: {-->
<!--    name: {-->
<!--      type: String,-->
<!--      default: "favorite"-->
<!--    },-->
<!--    value: {-->
<!--      type: Boolean,-->
<!--      default: false-->
<!--    },-->
<!--    disabled: {-->
<!--      type: Boolean,-->
<!--      default: false-->
<!--    },-->
<!--    required: {-->
<!--      type: Boolean,-->
<!--      default: false-->
<!--    }-->
<!--  },-->
<!--  data() {-->
<!--    return {};-->
<!--  },-->
<!--  methods: {-->
<!--    favorite() {-->
<!--      if (this.disabled == true) {-->
<!--        return;-->
<!--      }-->
<!--      this.value = !this.value;-->
<!--    }-->
<!--  },-->
<!--  template: "#template-favorite"-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.favoriting {-->
<!--  display: inline-block;-->
<!--}-->
<!--.favorite__heart {-->
<!--  display: inline-block;-->
<!--  padding: 3px;-->
<!--  vertical-align: middle;-->
<!--  line-height: 1;-->
<!--  font-size: 16px;-->
<!--  color: #ababab;-->
<!--  cursor: pointer;-->
<!--  -webkit-transition: color 0.2s ease-out;-->
<!--  transition: color 0.2s ease-out;-->
<!--}-->
<!--.favorite__heart.is-disabled:hover {-->
<!--  cursor: default;-->
<!--}-->
<!--.favorite__checkbox {-->
<!--  position: absolute;-->
<!--  overflow: hidden;-->
<!--  clip: rect(0 0 0 0);-->
<!--  height: 1px;-->
<!--  width: 1px;-->
<!--  margin: -1px;-->
<!--  padding: 0;-->
<!--  border: 0;-->
<!--}-->
<!--.favorite__heart__selected {-->
<!--  color: #df470b;-->
<!--}-->
<!--</style>-->
