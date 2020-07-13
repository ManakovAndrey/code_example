<template>
  <div class="choose-size">
    <Bread-Crumbs :items="breadCrumbsItems" />
    <Arrows-Navigation :leftLink="'/choose-type'" :rightLink="'/make-design'" />
    <div class="choose-size-wrap">
      <div class="picture-container" id="picture-container" ref="pictureContainer" onselectstart="return false" onmousedown="return false">
        <img class="main-picture" :src="getImgUrl(`${pictureFileName.name}/${pictureFileName.color}`)" alt="t-shirt-image" @load="imageLoaded = true" >
        <img class="main-picture-mask" :src="getImgUrl(`${pictureFileName.name}/mask`)" alt="t-shirt-image" @load="maskLoaded = true">
        <C-Loader v-if="!imageLoaded || !maskLoaded" background-color="rgba(255, 255, 255, 1)" />
      </div>
      <div class="sizes">
        <div class="size-description">
          <div class="size-description__header">
            <div class="circle">
              <div class="text">
                {{ sizes[activeSize].size }}
              </div>
            </div>
          </div>
          <div class="size-description__body">
            <div class="list">
              <div class="text">EU size {{ sizes[activeSize].euSize }}</div>
              <div class="text">width {{ sizes[activeSize].width }}</div>
              <div class="text">length {{ sizes[activeSize].length }}</div>
            </div>
          </div>
        </div>
        <div class="sizes-list">
          <div
            :class="['size', index === activeSize ? 'size--active' : '']"
            v-for="(size, index) in sizes"
            :key="index"
            @click="activeSize = index"
          >
          <div class="text">
            {{ size.size }}
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import BreadCrumbs from '../BreadCrumbs';
import ArrowsNavigation from '../ArrowsNavigation';
import CLoader from '../common/CLoader';

export default {
  name: 'ChooseSize',
  components: {
    BreadCrumbs,
    ArrowsNavigation,
    CLoader,
  },
  data() {
    return {
      breadCrumbsItems: [
        { text: 'type', href: '/choose-type' },
        { text: 'size', href: '/choose-size' },
      ],
      sizes: [
        { size: 'XS', euSize: 46, width: '48cm', length: '66cm' },
        { size: 'S', euSize: 46, width: '48cm', length: '66cm' },
        { size: 'M', euSize: 46, width: '48cm', length: '66cm' },
        { size: 'L', euSize: 46, width: '48cm', length: '66cm' },
        { size: 'XL', euSize: 46, width: '48cm', length: '66cm' },
      ],
      activeSize: 0,
      imageLoaded: false,
      maskLoaded: false,
    };
  },
  computed: {
    ...mapState({
      pictureFileName: state => state.canvasData.pictureName,
      savedSize: state => state.canvasData.sizeData,
    }),
  },
  methods: {
    ...mapActions({
      changeSizeData: 'canvasData/changeSizeData',
    }),
    getImgUrl(pet) {
      return `/static/clothes/${pet}.png`;
    },
    saveSize() {
      this.changeSizeData(this.sizes[this.activeSize]);
    },
  },
  mounted() {
    if (Object.keys(this.savedSize).length !== 0) {
      this.activeSize = this.sizes.findIndex(item => item.size === this.savedSize.size);
    }
  },
  beforeRouteLeave(to, from, next) {
    this.saveSize();
    next();
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/css/vars.scss';

.choose-size-wrap {
  display: flex;
  flex-wrap: wrap;
  padding-top: 15px;
}
.picture-container {
  position: relative;
  outline: none;
  width: 502px;
  height: 568px;
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid #555;
  .main-picture {
    max-width: 500px;
    background-color: #555;
  }
  .main-picture-mask {
    max-width: 500px;
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
    z-index: 10000;
  }
}
.sizes {
  width: 400px;
  margin-left: 30px;
  display: flex;
  .size-description {
    width: 180px;
    &__header {
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      height: 70px;
      .circle {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid $main-orange;
        .text {
          font-weight: bold;
        }
      }
    }
    &__body {
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
      background-color: #555;
      padding: 30px 10px;
      .list {
        width: 100px;
        margin: 0 auto;
      }
      .text {
        color: white;
        font-weight: bold;
        margin-bottom: 8px;
      }
    }
  }
  .sizes-list {
    width: 200px;
    margin-left: 15px;
    .size {
      background-color: white;
      border-radius: 10px;
      height: 35px;
      margin-bottom: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      box-sizing: border-box;
      cursor: pointer;
      &--active {
        border: 2px solid $main-orange;
      }
    }
  }
}
</style>
