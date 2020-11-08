<template>
  <div id="signin">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head" style="background: white; padding: 2rem">
        <div>
          <p class="modal-card-title">
            <strong>온라인 공연 알리미</strong> 로그인
          </p>
        </div>
      </header>
      <section class="modal-card-body">
        <div class="content-head has-text-centered" style="alignment: center">
          <div style="font-size: 20px">
            <!--          <div class="subtitle">-->
            <strong style="display: inline-flex">
              어서와! 우리랑
              <div class="has-text-danger" style="margin-left: 5px">공연</div>
              보면서 놀자!
            </strong>
          </div>
          <div class="has-text-centered" style="font-size: 20px; width: 500px">
            <img src="../../assets/logo.jpg" />
            <div class="columns" style="font-size: 13px">
              <div class="column">
                <img src="../../assets/alimi.png" /> 알리미
              </div>
              <div class="column">
                <img src="../../assets/clduk.png" /> 클덕이
              </div>
              <div class="column">
                <img src="../../assets/gonglin.png" /> 공린이
              </div>
              <div class="column">
                <img src="../../assets/conduk.png" /> 콘덕이
              </div>
              <div class="column">
                <img src="../../assets/muduk.png" /> 뮤덕이
              </div>
              <div class="column">
                <img src="../../assets/muyong.png" /> 무용이
              </div>
              <div class="column">
                <img src="../../assets/teakuk.png" /> 태극이
              </div>
              <div class="column">
                <img src="../../assets/yeonduk.png" /> 연덕이
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <b-field label="이메일">
            <b-input
              v-model="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              required
            >
            </b-input>
          </b-field>

          <b-field label="비밀번호">
            <b-input
              v-model="password"
              type="password"
              password-reveal
              placeholder="비밀번호를 입력해주세요"
              required
            >
            </b-input>
          </b-field>
        </div>
      </section>
      <footer class="modal-card-foot" style="align-content: end">
        <button class="button is-light" type="button" @click="$emit('close')">
          😅 나중에 할래
        </button>
        <button class="button is-black" @click="requestSignIn">
          ❤️ 로그인
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import request from "../../common/utils/http";

export default {
  name: "SignInForm",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    requestSignIn() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding-top: 1rem;
}
</style>
