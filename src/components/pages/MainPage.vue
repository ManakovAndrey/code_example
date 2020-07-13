<template>
  <div class="main-page">
    <!-- <img class="people-image" src="@/assets/images/people.png" alt="people" ref="mainPicture" @load="changeLoaderStatus(false)" > -->
    <!-- <colorful-picture
      imageUrl="/static/clothes/t-short long f/collar white.png"
      maskUrl="/static/clothes/t-short long f/2.svg"
      :color="color"
    /> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ColorfulPicture from '../common/colorfulPicture.vue';

export default {
  name: 'MainPage',
  components: {
    ColorfulPicture,
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      color: '#f00',
    };
  },
  computed: {
    ...mapState({
      testData: state => state.main.testData,
    }),
    styles() {
      return {
        backgroundColor: this.color,
      };
    },
  },
  methods: {
    ...mapActions({
      changeLoaderStatus: 'main/changeLoaderStatus',
      clearData: 'canvasData/setInititalDala',
      clearArData: 'archiefData/setInititalDala',
    }),
    loadTestData() {
      this.$store.dispatch('main/getTestData');
    },
    updateColor(event) {
      this.color = event.target.value;
    },
  },
  mounted() {
    this.clearData();
    this.clearArData();
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/css/vars.scss';

.main-page {
  display: flex;
  justify-content: center;
  position: relative;
  height: calc(100% - 210px);
  .people-image {
    height: auto;
    width: 80%;
    position: absolute;
    bottom: 0;
  }
}
</style>
