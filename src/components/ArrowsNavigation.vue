<template>
  <div class="arrows-navigation">
    <router-link v-if="leftLink !== ''" :to="leftLink" class="link link--left"><img class="icon" src="@/assets/images/back-arrow.svg" alt="back"></router-link>
    <router-link v-if="rightLink !== ''" :to="rightLink" class="link link--right" >next<img class="icon" src="@/assets/images/front-arrow.svg" alt="front"></router-link>
  </div>
</template>

<script>
export default {
  name: 'ArrowsNavigation',
  props: {
    leftLink: {
      type: String,
      default: '',
    },
    rightLink: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/css/vars.scss';
.link {
  font-size: 20px;
  position: fixed;
  bottom: 50px;
  &--left {
    left: 50px;
  }
  &--right {
    right: 50px;
    display: flex;
    align-items: center;
    .icon {
      margin-left: 10px;
    }
  }
  .icon {
    width: 40px;
    height: 40px;
  }
}
</style>
