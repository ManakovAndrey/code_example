<template>
  <div class="bread-crumbs">
    <div class="crumbs-circle"></div>
    <div class="crumb">start</div>
    <router-link
      class="crumb"
      v-for="(item, index) in items"
      :key="index"
      :to="item.href"
      :style="leftStyle(index)"
    >
      {{ item.text }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  props: ['items'],
  methods: {
    leftStyle(index) {
      return `left: ${(index + 1) * -30}px`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/css/vars.scss';
.bread-crumbs {
  display: flex;
  align-items: center;
  .crumbs-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: $main-orange;
    box-sizing: border-box;
    border: 6px solid $main-ground;
    margin-right: 20px;
  }
  .crumb {
    color: white;
    font-weight: bold;
    display: block;
    padding: 10px 40px;
    box-sizing: border-box;
    border-radius: 20px 20px;
    background-color: $main-orange;
    border: 6px solid $main-ground;
    position: relative;
    cursor: pointer;
  }
}
</style>
