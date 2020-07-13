<template>
  <div class="loader-wrap" :style="backgroundStyles">
    <div class="loader" :style="spinerStyles"></div>
  </div>
</template>
<script>
export default {
  name: 'CLoader',
  props: {
    width: {
      type: Number,
      default: 80,
    },
    height: {
      type: Number,
      default: 80,
    },
    backgroundColor: {
      type: String,
      default: 'rgba(255, 255, 255, 0.3)',
    },
    borderRadius: {
      type: String,
      default: '0',
    },
  },
  computed: {
    spinerStyles() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
      };
    },
    backgroundStyles() {
      return {
        backgroundColor: this.backgroundColor,
        borderRadius: this.borderRadius,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
@import 'src/assets/css/vars.scss';
.loader-wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;
  bottom:0;
  left:0;
  right: 0;
  z-index:10000;
  .loader{
    z-index:10000;
    opacity:1;
    border: 2px solid #f3f3f3;
    border-top:3px solid $main-orange;
    border-radius: 100%;
    position: absolute;
    top:0;
    bottom:0;
    left:0;
    right: 0;
    margin: auto;
    animation: spin 1s infinite linear;
  }
}
@keyframes spin {
    from{
        transform: rotate(0deg);
    }to{
        transform: rotate(360deg);
    }
}
</style>
