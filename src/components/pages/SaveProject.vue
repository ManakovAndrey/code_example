<template>
  <div class="save-project">
    <Bread-Crumbs :items="breadCrumbsItems" />
    <Arrows-Navigation :leftLink="'/make-design'" />
    <div class="save-project-wrap">
      <div class="picture-container" id="picture-container" ref="pictureContainer" onselectstart="return false" onmousedown="return false">
        <C-Loader v-if="!imageLoaded || !maskLoaded" background-color="rgba(255, 255, 255, 1)" border-radius="20px" />
        <img class="main-picture" :src="getImgUrl(mainPictureName)" alt="t-shirt-image" @load="imageLoaded = true">
        <img class="main-picture-mask" :src="getImgUrl(mainPictureMaskName)" alt="t-shirt-image" @load="maskLoaded = true">
        <img v-if="showLaces" class="main-picture-mask" :src="getImgUrl(lacesPictureName)" alt="t-shirt-image">
        <template v-if="showPoloButtons">
          <img class="main-picture__button main-picture__button--1" :src="getImgUrl(buttonPictureName)" alt="t-shirt-image">
          <img class="main-picture__button main-picture__button--2" :src="getImgUrl(buttonPictureName)" alt="t-shirt-image">
          <img class="main-picture__button main-picture__button--3" :src="getImgUrl(buttonPictureName)" alt="t-shirt-image">
        </template>
        <template v-if="showPoloFButtons">
          <img class="main-picture__button main-picture__button--4" :src="getImgUrl(buttonPictureName)" alt="t-shirt-image">
          <img class="main-picture__button main-picture__button--5" :src="getImgUrl(buttonPictureName)" alt="t-shirt-image">
          <img class="main-picture__button main-picture__button--6" :src="getImgUrl(buttonPictureName)" alt="t-shirt-image">
          <img class="main-picture__button main-picture__button--7" :src="getImgUrl(buttonPictureName)" alt="t-shirt-image">
          <img class="main-picture__button main-picture__button--8" :src="getImgUrl(buttonPictureName)" alt="t-shirt-image">
        </template>
        <div class="picture-container__back-button" @click="changeSide">{{ changeSideButtonText }}</div>
        <img v-for="(picture, index) in customPictures"
            :key="index + 'pic'"
            :data-index="index"
            data-type="picture"
            class="custom-picture draggable-source"
            :src="picture.src"
            alt="custom-picture"
            ref="CustopPicture"
            :style="{
              top: picture.top + 'px',
              left: picture.left + 'px',
              zIndex: picture.zIndex,
              width: picture.width + 'px',
              transform: `rotate(${picture.rotate}deg)`
            }"
        >
        <span class="custom-text draggable-source"
            v-for="(text, index) in customTexts"
            :key="index + 'text'"
            :data-index="index"
            data-type="text"
            :style="{
              top: text.top + 'px',
              left: text.left + 'px',
              zIndex: text.zIndex,
              fontSize: text.fontSize + 'px',
              transform: `rotate(${text.rotate}deg)`,
              color: text.color,
              fontFamily: text.fontFamily,
            }"
        >
          {{ text.value }}
        </span>
      </div>
      <div class="user-data">
        <div class="user-data__name">
          <div class="lable">NAME:</div>
          <Text-Input v-model="name"/>
        </div>
        <div class="user-data__comment">
          <div class="lable">COMMENT:</div>
          <Text-Area v-model="comment" />
        </div>
        <div class="user-data__save" @click="save()">
          SAVE
          <C-Loader v-if="isSaving" :width="27" :height="27" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import BreadCrumbs from '../BreadCrumbs';
import ArrowsNavigation from '../ArrowsNavigation';
import TextInput from '../TextInput';
import TextArea from '../TextArea';
import CLoader from '../common/CLoader';

export default {
  name: 'SaveProject',
  components: {
    BreadCrumbs,
    ArrowsNavigation,
    TextInput,
    TextArea,
    CLoader,
  },
  data() {
    return {
      customPictures: [],
      customTexts: [],
      newText: '',
      breadCrumbsItems: [
        { text: 'type', href: '/choose-type' },
        { text: 'size', href: '/choose-size' },
        { text: 'add your design', href: '/make-design' },
        { text: 'finish', href: '/save-project' },
      ],
      side: 'front',
      name: '',
      comment: '',
      isSaving: false,
      imageLoaded: false,
      maskLoaded: false,
    };
  },
  computed: {
    ...mapState({
      frontSide: state => state.canvasData.frontSide,
      backSide: state => state.canvasData.backSide,
      pictureFileName: state => state.canvasData.pictureName,
    }),
    changeSideButtonText() {
      return this.side === 'front' ? 'back' : 'front';
    },
    mainPictureName() {
      if (this.side === 'front') {
        return `${this.pictureFileName.name}/${this.pictureFileName.color}`;
      }
      return `${this.pictureFileName.name}/${this.pictureFileName.color} back`;
    },
    mainPictureMaskName() {
      if (this.side === 'front') {
        return `${this.pictureFileName.name}/mask`;
      }
      return `${this.pictureFileName.name}/back mask`;
    },
    showLaces() {
      return this.side === 'front' && ['hoody', 'hoody f'].includes(this.pictureFileName.name);
    },
    lacesPictureName() {
      return `${this.pictureFileName.name}/laces ${this.frontSide.lacesColor}`;
    },
    showPoloButtons() {
      return this.side === 'front' && ['polo'].includes(this.pictureFileName.name);
    },
    showPoloFButtons() {
      return this.side === 'front' && ['polo f'].includes(this.pictureFileName.name);
    },
    buttonPictureName() {
      return `${this.pictureFileName.name}/buttons/${this.frontSide.buttonsColor}`;
    },
  },
  methods: {
    ...mapActions({
      saveProject: 'canvasData/saveProject',
    }),
    uploadFrontData() {
      this.customPictures = this.frontSide.customPictures;
      this.customTexts = this.frontSide.customTexts;
    },
    uploadBackData() {
      this.customPictures = this.backSide.customPictures;
      this.customTexts = this.backSide.customTexts;
    },
    getImgUrl(pet) {
      return `/static/clothes/${pet}.png`;
    },
    changeSide() {
      this.imageLoaded = false;
      this.maskLoaded = false;
      if (this.side === 'front') {
        this.side = 'back';
        this.uploadBackData();
      } else {
        this.side = 'front';
        this.uploadFrontData();
      }
    },
    async save() {
      if (this.isSaving) {
        return;
      }
      this.isSaving = true;
      await this.saveProject({ name: this.name, comment: this.comment });
      this.isSaving = false;
      this.$router.push({ name: 'archiefPage' });
    },
  },
  mounted() {
    this.uploadFrontData();
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/css/vars.scss';

.save-project-wrap {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding-top: 15px;
}
.picture-container {
  position: relative;
  outline: none;
  width: 502px;
  height: 568px;
  .main-picture {
    max-width: 500px;
    background-color: #555;
    border: 1px solid #555;
    border-radius: 20px;
    &__button {
      position: absolute;
      width: 11px;
      height: 11px;
      &--1 {
        top: 99px;
        left: 244px;
      }
      &--2 {
        top: 128px;
        left: 246px;
      }
      &--3 {
        top: 162px;
        left: 248px;
      }
      &--4 {
        top: 102px;
        left: 239px;
      }
      &--5 {
        top: 130px;
        left: 239px;
      }
      &--6 {
        top: 156px;
        left: 240px;
      }
      &--7 {
        top: 182px;
        left: 241px;
      }
      &--8 {
        top: 212px;
        left: 243px;
      }
    }
  }
  .main-picture-mask {
    max-width: 500px;
    border: 1px solid #555;
    border-radius: 20px;
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
    z-index: 10000;
  }
  .custom-picture {
    width: 100px;
    position: absolute;
  }
  .custom-text {
    position: absolute;
  }
  &__back-button {
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
    cursor: pointer;
  }
}
.user-data {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: 50%;
  &__name {
    display: flex;
    align-items: flex-end;
    font-weight: bold;
    .lable {
      margin-right: 10px;
      margin-bottom: 5px;
      font-size: 1.4rem;
    }
  }
  &__comment {
    position: relative;
    margin-top: 50px;
    .lable {
      font-size: 1.4rem;
      font-weight: bold;
      position: absolute;
      background-color: $main-ground;
      z-index: 1;
      top: -13px;
      padding-right: 5px;
    }
  }
  &__save {
    background-color: $main-orange;
    padding: 10px 22px;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    cursor: pointer;
    position: fixed;
    bottom: 50px;
    right: 50px;
  }
}
</style>
