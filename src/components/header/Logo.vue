<template>
  <div class="logo" :style="`top: ${top}`">
    <router-link to="/" class="link">
      <div class="circle">
        <div class="text">Logo</div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: ['top'],
};
</script>

<style lang="scss" scoped>
@import 'src/assets/css/vars.scss';

.logo {
  border-radius: 50%;
  border: 5px solid $main-orange;
  height: 90px;
  width: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 3%;
  .circle {
    background-color: #ffe7e7;
    border-radius: 50%;
    height: 70px;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $main-orange;
    font-weight: bold;
  }
}
</style>
