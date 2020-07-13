<template>
  <div class="picture">
      <img class="picture__image" :src="imageUrl" alt="pick">
      <div class="picture__mask" :style="maskStyles"></div>
    </div>
</template>
<script>
export default {
  name: 'CLoader',
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    maskUrl: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: '502px',
    },
    height: {
      type: String,
      default: '568px',
    },
  },
  computed: {
    maskStyles() {
      return {
        backgroundColor: this.color,
        '-webkit-mask-image': `url('${this.maskUrl}')`,
        'mask-image': `url('${this.maskUrl}')`,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
@import 'src/assets/css/vars.scss';
.picture {
  width: 502px;
  height: 568px;
  position: relative;
  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &__mask {
    width: 100%;
    height: 100%;
    background-color: red;
    mix-blend-mode: multiply;
    // -webkit-mask-image: url('/static/clothes/hoody/mk.svg');
    mask-repeat: no-repeat;
    mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: contain;
  }
}
</style>
