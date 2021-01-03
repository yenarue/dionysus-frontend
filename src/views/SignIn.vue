<template>
  <div id="signin" class="" :class="{ 'v-center': !isMobile }">
    <div
      class="center"
      :style="isMobile ? contentStyle.mobile : contentStyle.pc"
    >
      <div class="header has-text-centered" style="alignment: center">
        <div
          class="has-text-centered center"
          style="font-size: 20px; width: 500px"
        >
          <img src="../assets/logo.jpg" />
          <div v-if="!isMobile" class="columns" style="font-size: 13px">
            <div class="column"><img src="../assets/alimi.png" /> 알리미</div>
            <div class="column"><img src="../assets/clduk.png" /> 클덕이</div>
            <div class="column"><img src="../assets/gonglin.png" /> 공린이</div>
            <div class="column"><img src="../assets/conduk.png" /> 콘덕이</div>
            <div class="column"><img src="../assets/muduk.png" /> 뮤덕이</div>
            <div class="column"><img src="../assets/muyong.png" /> 무용이</div>
            <div class="column"><img src="../assets/teakuk.png" /> 태극이</div>
            <div class="column"><img src="../assets/yeonduk.png" /> 연덕이</div>
          </div>
          <div style="font-size: 20px">
            <strong style="display: inline-flex">
              어서와! 우리랑
              <div class="has-text-danger" style="margin-left: 5px">공연</div>
              보면서 놀자!
            </strong>
          </div>
        </div>
      </div>
      <div class="signin-input-content">
        <b-field>
          <b-input v-model="email" type="email" placeholder="이메일" required>
          </b-input>
        </b-field>

        <b-field>
          <b-input
            v-model="password"
            type="password"
            password-reveal
            placeholder="비밀번호"
            required
          >
          </b-input>
        </b-field>
      </div>
      <div class="signin-footer">
        <button class="button is-primary is-fullwidth" @click="requestSignIn">
          로그인
        </button>
        <button
          class="button is-light is-fullwidth"
          style="margin-top: 0.8rem"
          type="button"
          @click="printWidth"
        >
          회원가입
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../common/utils/http";

export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
      contentStyle: {
        mobile: {
          width: "100%"
        },
        pc: {
          width: "600px"
        }
      },
      windowWidth: window.innerWidth
    };
  },
  computed: {
    isMobile() {
      return this.windowWidth <= 768;
    }
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
      console.log(this.isMobile);
    });
  },
  methods: {
    printWidth() {
      console.log(screen.width);
    },
    // isMobile() {
    //   if (window.innerWidth <= 760) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
    openToast(type, message) {
      this.$buefy.toast.open({ type, message });
    },
    requestSignIn() {
      request
        .put(
          "/signin",
          {
            email: this.email,
            password: this.password
          },
          { isNotNeedFullLoading: true }
        )
        .then(res => {
          this.$store.commit("authSuccess", res.data);
          this.openToast("is-success", "👏 로그인 성공 👏");
          this.$router.push("/");
        })
        .catch(err => {
          console.error(err);
          this.openToast(
            "is-error",
            "로그인에 실패하였습니다. 이메일과 비밀번호를 다시 확인해주세요."
          );
          this.$store.commit("authError");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#signin {
}

.signin-input-content {
  padding: 2rem 2rem 0 2rem;
}

.signin-footer {
  padding: 2rem 2rem 2rem 2rem;
}
//.vertical-centered {
//  position: absolute;
//  top: 50%;
//  transform: translateY(-50%);
//}

.mobile {
  width: 100%;
}

.pc-width {
  width: 600px;
}

.v-center {
  padding: 70px 0;
}

.center {
  margin: auto;
  width: 50%;
}
</style>
