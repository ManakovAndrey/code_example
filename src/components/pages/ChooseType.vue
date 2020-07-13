<template>
  <div class="choose-type">
    <Bread-Crumbs :items="breadCrumbsItems" />
    <Arrows-Navigation :leftLink="'/'" :rightLink="'/choose-size'"/>
    <div class="sex-switcher"
        @click="changeSex()"
    >
      <div :class="['text', sex === 'male' ? 'text--active' : '']">MALE</div>
      <div :class="['toggle', sex === 'female' ? 'toggle--female' : '']">
        <div class="toggle__circle"></div>
      </div>
      <div :class="['text', sex === 'female' ? 'text--active' : '']">FEMALE</div>
    </div>

    <div class="colors">
      <div class="title">COLOR</div>
      <div class="arrow arrow--left" :style="colorArrowsTop"></div>
      <div class="arrow arrow--right" :style="colorArrowsTop"></div>
      <div
        class="colors__circle"
        v-for="(color, index) in images[sex][active].colors"
        :key="index"
        :style="circleColor(color)"
        @click="changeColor(index)"
      >
      </div>
    </div>

    <div class="male" v-if="sex === 'male'">
      <div
        :class="['image-wrap',
        active === index ? 'image-wrap--active' : '']"
        v-for="(image, index) in images.male"
        :key="index"
        @click="changeActive(index)"
      >
        <img :src="getImgUrl(image, index)" alt="pick" @load="loaded('male', index)">
        <C-Loader v-if="image.loading" background-color="rgba(231, 230, 228, 1)" />
      </div>
    </div>

    <div class="female" v-if="sex === 'female'">
      <div
        :class="['image-wrap',
        active === index ? 'image-wrap--active' : '']"
        v-for="(image, index) in images.female"
        :key="index"
        @click="changeActive(index)"
      >
        <img :src="getImgUrl(image, index)" alt="pick" @load="loaded('female', index)">
        <C-Loader v-if="image.loading" background-color="rgba(231, 230, 228, 1)" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import BreadCrumbs from '../BreadCrumbs';
import ArrowsNavigation from '../ArrowsNavigation';
import CLoader from '../common/CLoader';

export default {
  name: 'ChooseType',
  components: {
    BreadCrumbs,
    ArrowsNavigation,
    CLoader,
  },
  data() {
    return {
      breadCrumbsItems: [
        { text: 'type', href: '/choose-type' },
      ],
      sex: 'male',
      images: {
        male: [
          { name: 'polo', colors: ['white', 'green', 'orange', 'red', '2e2e2e', '255c11', '28ee49', '2ed3f1', 'fff001', 'b90ebb', '3125a4'], loading: true },
          { name: 't-short long', colors: ['white', 'green', 'orange', 'red', '2e2e2e', '255c11', '28ee49', '2ed3f1', 'fff001', 'b90ebb', '3125a4'], loading: true },
          { name: 'switshot', colors: ['white', 'green', 'orange', 'red', '2e2e2e', '255c11', '28ee49', '2ed3f1', 'fff001', 'b90ebb', '3125a4'], loading: true },
          { name: 'flees', colors: ['white', 'green', 'orange', 'red', '2e2e2e', '255c11', '28ee49', '2ed3f1', 'fff001', 'b90ebb', '3125a4'], loading: true },
          { name: 'shirt', colors: ['white', 'green', 'orange', 'red', '2e2e2e', '255c11', '28ee49', '2ed3f1', 'fff001', 'b90ebb', '3125a4'], loading: true },
          { name: 't-short', colors: ['white', 'green', 'orange', 'red'], loading: true },
          { name: 'hoody', colors: ['white', 'green', 'orange', 'red'], loading: true },
        ],
        female: [
          { name: 'polo f', colors: ['white', 'green', 'orange', 'red', '2e2e2e', '255c11', '28ee49', '2ed3f1', 'fff001', 'b90ebb', '3125a4'], loading: true },
          { name: 't-short long f', colors: ['white', 'green', 'orange', 'red', '2e2e2e', '255c11', '28ee49', '2ed3f1', 'fff001', 'b90ebb', '3125a4'], loading: true },
          { name: 'flees f', colors: ['white', 'green', 'orange', 'red', '2e2e2e', '255c11', '28ee49', '2ed3f1', 'fff001', 'b90ebb', '3125a4'], loading: true },
          { name: 'shirt f', colors: ['white', 'green', 'orange', 'red', '2e2e2e', '255c11', '28ee49', '2ed3f1', 'fff001', 'b90ebb', '3125a4'], loading: true },
          { name: 'switshot f', colors: ['white', 'green', 'orange', 'red', '2e2e2e', '255c11', '28ee49', '2ed3f1', 'fff001', 'b90ebb', '3125a4'], loading: true },
          { name: 't-short f', colors: ['white', 'green', 'orange', 'red'], loading: true },
          { name: 'hoody f', colors: ['white', 'green', 'orange', 'red'], loading: true },
        ],
      },
      active: 0,
      colorIndex: 0,
      colorsCss: {
        white: '#fff',
        green: '#21906d',
        blue: '#3470c1',
        red: '#b62121',
        orange: '#d58e32',
        '2e2e2e': '#2e2e2e',
        '255c11': '#255c11',
        '28ee49': '#28ee49',
        '2ed3f1': '#2ed3f1', // eslint-disable-next-line
        'fff001': '#fff001', // eslint-disable-next-line
        'b90ebb': '#b90ebb',
        '3125a4': '#3125a4',
      },
    };
  },
  computed: {
    colorArrowsTop() {
      return {
        top: `${28 + (this.colorIndex * 50)}px`,
      };
    },
  },
  methods: {
    ...mapActions({
      changePictureName: 'canvasData/changePictureName',
    }),
    getImgUrl(image, index) {
      return `/static/clothes/${image.name}/${index === this.active ? image.colors[this.colorIndex] : image.colors[0]}.png`;
    },
    requireAll(r) { r.keys().forEach(r); },
    changeSex() {
      if (this.sex === 'male') {
        this.sex = 'female';
        this.images.female = this.images.female.map(item => ({
          ...item,
          loading: true,
        }));
      } else {
        this.sex = 'male';
        this.images.male = this.images.male.map(item => ({
          ...item,
          loading: true,
        }));
      }
      this.active = 0;
      this.colorIndex = 0;
    },
    changeActive(index) {
      if (this.colorIndex !== 0) {
        this.images[this.sex][this.active].loading = true;
      }
      this.active = index;
      this.colorIndex = 0;
    },
    changeColor(index) {
      this.colorIndex = index;
      this.images[this.sex][this.active].loading = true;
    },
    circleColor(color) {
      return `backgroundColor: ${this.colorsCss[color]}`;
    },
    loaded(sex, index) {
      this.images[sex][index].loading = false;
    },
  },
  mounted() {
  },
  beforeRouteLeave(to, from, next) {
    this.changePictureName({ name: this.images[this.sex][this.active].name, color: this.images[this.sex][this.active].colors[this.colorIndex] });
    next();
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/css/vars.scss';
.choose-type {
  height: 100%;
  height: calc(100% - 210px);
  position: relative;
}
.sex-switcher {
  display: flex;
  align-items: center;
  width: 250px;
  margin: 0 auto;
  position: relative;
  top: -45px;
  cursor: pointer;
  .toggle {
    height: 50px;
    width: 106px;
    border: 3px solid $main-orange;
    box-sizing: border-box;
    border-radius: 17px;
    display: flex;
    align-items: center;
    padding: 0 5px;
    margin: 0 10px;
    &__circle {
      background-color: $main-orange;
      height: 35px;
      width: 35px;
      border-radius: 50%;
    }
    &--female {
      justify-content: flex-end;
    }
  }
  .text {
    display: block;
    width: 70px;
    &--active {
      font-weight: bold;
    }
  }
}
.colors {
  font-weight: bold;
  display: flex;
  width: 70px;
  flex-wrap: wrap;
  justify-content: center;
  position: absolute;
  right: 50px;
  top: 100px;
  &__circle {
    width: 40px;
    height: 40px;
    background-color: $main-orange;
    border-radius: 50%;
    margin-top: 10px;
    cursor: pointer;
  }
  .arrow {
    width: 24px;
    height: 40px;
    background-image: url('../../assets/images/colors-arrow.png');
    position: absolute;
    &--right {
      transform: rotate(180deg);
      right: -10px;
    }
    &--left {
      left: -10px;
    }
  }
}
.male,
.female {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  width: 80%;
  flex-wrap: wrap;
  justify-content: space-around;
}
.image-wrap {
  width: 280px;
  height: 322px;
  border: 2px solid black;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
  &--active {
    border: 4px solid $main-orange;
  }
  img {
    width: 100%;
  }
}
</style>
