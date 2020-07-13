<template>
  <div class="back-nav">
    <router-link to="/" class="link">
      <span class="arrow"><img class="icon" src="@/assets/images/back-icon.svg" alt="back"></span>
      <span class="text">Back to main page</span>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
@import 'src/assets/css/vars.scss';

.back-nav {
  position: absolute;
  right: 3%;
  .link {
    display: flex;
    align-items: center;
  }
  .arrow {
    margin-right: 10px;
    .icon {
      width: 40px;
      height: 40px;
    }
  }
  .text {
    color: #000000;
    font-weight: bold;
  }
}
</style>
