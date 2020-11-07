<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head" style="background: white; padding: 2rem">
        <div>
          <p class="modal-card-title">
            <!--            <img src="../../assets/logo.jpg" />-->
            <!--            <br />-->
            <strong>온라인 공연 알리미</strong>의 가족이 되어보세요!
            <!--            💃 <strong>온라인 공연 알리미</strong>와 함께해요 (수줍)-->
          </p>
          <!--          <br />-->
          <!--          ☑ 가족이 되면 좋은 점 몇가지! 1. 2. 3.-->
        </div>
        <!--        <button type="button" class="delete" @click="$emit('close')" />-->
      </header>
      <section class="modal-card-body">
        <div
          class="has-text-centered"
          style="padding: 1rem 0 2rem 0; font-size: 20px"
        >
          <div class="title">
            <strong class="has-text-danger">{{ heartedShows.length }}개</strong
            >의 꿀잼 공연을 담은 당신<br />
            <strong
              v-if="heartedShows.length > 10"
              class="has-text-danger"
              style="font-size: 20px"
            >
              찐이야...찐...🙊
            </strong>
            <strong
              v-else-if="heartedShows.length <= 0"
              class="has-text-danger"
              style="font-size: 20px"
            >
              공연에 아직 흥미가 없으시군요 👀
            </strong>
            <strong v-else class="has-text-danger" style="font-size: 20px">
              공연에 관심이 많은 이 시대의 참지성인! 💃
            </strong>
          </div>

          <b-carousel-list
            :model="0"
            :data="heartedShows"
            arrow
            :items-to-show="4"
            :items-to-list="1"
            repeat
            has-drag
            style="padding: 1rem"
          >
            <template slot="item" slot-scope="show">
              <show-card-item
                style="width:300px;"
                :show="show"
                :is-show-heart-message="false"
                @heart-toggle="true"
              ></show-card-item>
            </template>
          </b-carousel-list>

          <!--          고오급 안목을 지닌 당신... 우리와 함께 해보지 않으실래요? 😉-->
          저희와 함께하시고 <strong>취향저격 꿀잼 공연들</strong>을 만나보세요!
        </div>
        <div class="columns">
          <div class="column">
            <p class="has-text-centered" style="font-size: 20px; padding: 1rem">
              <img src="../../assets/logo.jpg" />
              <br />
              ✔️가족이 되면 좋은 점 몇가지!<br />1. 2. 3. <br />어쩌구저쩌구
              아라라라라라라 아라라라라라라 이미지면 더 좋겠다
            </p>
          </div>
          <div class="column">
            <div class="content-head" style="alignment: center"></div>
            <b-field label="이메일">
              <b-input
                type="email"
                :value="email"
                placeholder="자주 사용하시는 이메일을 입력해주세요"
                required
              >
              </b-input>
            </b-field>

            <b-field label="비밀번호">
              <b-input
                type="password"
                :value="password"
                password-reveal
                placeholder="비밀번호를 입력해주세요"
                required
              >
              </b-input>
            </b-field>

            <b-field label="닉네임">
              <b-input
                type="nickName"
                :value="nickName"
                placeholder="사용하실 닉네임을 입력해주세요"
                required
              >
              </b-input>
            </b-field>

            <b-field label="생년월일">
              <b-datepicker
                v-model="birthday"
                placeholder="생년월일을 입력해주세요"
                icon="calendar-today"
                trap-focus
              ></b-datepicker>
            </b-field>

            <b-field label="성별">
              <b-radio-button
                v-model="gender"
                native-value="male"
                type="is-danger"
              >
                <span>남성</span>
              </b-radio-button>

              <b-radio-button
                v-model="gender"
                native-value="female"
                type="is-success"
              >
                <span>여성</span>
              </b-radio-button>

              <b-radio-button
                v-model="gender"
                native-value="secret"
                type="is-info"
              >
                비밀이야
              </b-radio-button>
            </b-field>

            <b-field label="주 활동지역">
              <b-input
                type="regions"
                :value="regions"
                password-reveal
                placeholder="ex) 온라인, 문래, 강남, 동작 등... (체크박스로 변경 예정)"
                required
              >
              </b-input>
            </b-field>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot" style="align-content: end">
        <button class="button is-light" type="button" @click="$emit('close')">
          😅 나중에 할래
        </button>
        <button class="button is-warning" @click="$emit('open-login-form')">
          👍 이미 가족이야
        </button>
        <button class="button is-black">
          ❤️ 가족이 될래
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
import ShowCardItem from "@/components/ShowCardItem";

export default {
  name: "SignUpForm",
  components: {
    ShowCardItem
  },
  props: {
    heartedShows: Array
  },
  data() {
    return {
      email: "",
      password: "",
      nickName: "",
      birthday: new Date("1991-01-01"),
      gender: "",
      regions: []
    };
  },
  methods: {
    printLog() {
      console.log("test");
    }
  }
};
</script>

<style scoped></style>
