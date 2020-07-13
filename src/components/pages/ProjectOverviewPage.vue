<template>
  <div class="project-overview">
    <div id="to-pdf-wrap">
      <div class="description-wrap">
        <div class="project-overview__description description">
          <div class="description__name">
            <div class="lable">NAME:</div>
            <Text-Input v-model="name" disabled/>
          </div>
          <div class="description__comment">
            <div class="lable" id="crazyId">COMMENT:</div>
            <p>{{comment}}</p>
          </div>
        </div>
        <div class="size-description">
          <div class="size-description__header">
            <div class="circle">
              <div class="text">
                {{ sizeData.size }}
              </div>
            </div>
          </div>
          <div class="size-description__body">
            <div class="list">
              <div class="text">EU size {{ sizeData.euSize }}</div>
              <div class="text">width {{ sizeData.width }}</div>
              <div class="text">length {{ sizeData.length }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="project-overview-wrap">
        <div class="picture-container" ref="pictureContainer">
          <C-Loader v-if="!frontImageLoaded || !frontMaskLoaded" background-color="rgba(255, 255, 255, 1)" border-radius="20px" />
          <img class="main-picture" :src="getImgUrl(mainPictureNameFront)" alt="t-shirt-image" @load="frontImageLoaded = true">
          <img class="main-picture-mask" :src="getImgUrl(mainPictureMaskNameFront)" alt="t-shirt-image" @load="frontMaskLoaded = true">
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
          <img v-for="(picture, index) in customPictures.front"
              :key="index + 'pic'"
              :data-index="index"
              data-type="picture"
              class="custom-picture draggable-source"
              :src="picture.src"
              alt="custom-picture"
              ref="CustopPicture"
              crossorigin="anonymous"
              :style="{
                top: picture.top + 'px',
                left: picture.left + 'px',
                zIndex: picture.zIndex,
                width: picture.width + 'px',
                transform: `rotate(${picture.rotate}deg)`
              }"
          >
          <span class="custom-text draggable-source"
              v-for="(text, index) in customTexts.front"
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
        <div class="picture-container" ref="pictureContainer">
          <C-Loader v-if="!backImageLoaded || !backMaskLoaded" background-color="rgba(255, 255, 255, 1)" border-radius="20px" />
          <img class="main-picture" :src="getImgUrl(mainPictureNameBack)" alt="t-shirt-image" @load="backImageLoaded = true">
          <img class="main-picture-mask" :src="getImgUrl(mainPictureMaskNameBack)" alt="t-shirt-image" @load="backMaskLoaded = true">
          <img v-for="(picture, index) in customPictures.back"
              :key="index + 'pic'"
              :data-index="index"
              data-type="picture"
              class="custom-picture draggable-source"
              :src="picture.src"
              alt="custom-picture"
              ref="CustopPicture"
              crossorigin="anonymous"
              :style="{
                top: picture.top + 'px',
                left: picture.left + 'px',
                zIndex: picture.zIndex,
                width: picture.width + 'px',
                transform: `rotate(${picture.rotate}deg)`
              }"
          >
          <span class="custom-text draggable-source"
              v-for="(text, index) in customTexts.back"
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
      </div>
    </div>
    <div class="toPDF" @click="print()">
      <div class="text">load as pdf</div>
    </div>
    <div class="delete-project" @click="deletePr()">
      <div class="text">delete project</div>
    </div>
  </div>
</template>

<script>
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { mapState, mapActions } from 'vuex';
import TextInput from '../TextInput';
import TextArea from '../TextArea';
import CLoader from '../common/CLoader';

export default {
  name: 'ProjectOverview',
  components: {
    TextInput,
    TextArea,
    CLoader,
  },
  data() {
    return {
      customPictures: {
        front: [],
        back: [],
      },
      customTexts: {
        front: [],
        back: [],
      },
      frontImageLoaded: false,
      frontMaskLoaded: false,
      backImageLoaded: false,
      backMaskLoaded: false,
    };
  },
  computed: {
    ...mapState({
      frontSide: state => state.archiefData.frontSide,
      backSide: state => state.archiefData.backSide,
      pictureFileName: state => state.archiefData.pictureName,
      name: state => state.archiefData.name,
      comment: state => state.archiefData.comment,
      sizeData: state => state.archiefData.sizeData,
    }),
    mainPictureNameFront() {
      return `${this.pictureFileName.name}/${this.pictureFileName.color}`;
    },
    mainPictureNameBack() {
      return `${this.pictureFileName.name}/${this.pictureFileName.color} back`;
    },
    mainPictureMaskNameFront() {
      return `${this.pictureFileName.name}/mask`;
    },
    mainPictureMaskNameBack() {
      return `${this.pictureFileName.name}/back mask`;
    },
    showLaces() {
      return ['hoody', 'hoody f'].includes(this.pictureFileName.name);
    },
    lacesPictureName() {
      return `${this.pictureFileName.name}/laces ${this.frontSide.lacesColor}`;
    },
    showPoloButtons() {
      return ['polo'].includes(this.pictureFileName.name);
    },
    showPoloFButtons() {
      return ['polo f'].includes(this.pictureFileName.name);
    },
    buttonPictureName() {
      return `${this.pictureFileName.name}/buttons/${this.frontSide.buttonsColor}`;
    },
  },
  methods: {
    ...mapActions({
      saveProject: 'archiefData/saveProject',
      setDataForOverview: 'archiefData/setDataForOverview',
      deleteProject: 'archiefData/deleteProject',
    }),
    uploadFrontData() {
      this.customPictures.front = this.frontSide.customPictures;
      this.customTexts.front = this.frontSide.customTexts;
    },
    uploadBackData() {
      this.customPictures.back = this.backSide.customPictures;
      this.customTexts.back = this.backSide.customTexts;
    },
    getImgUrl(pet) {
      return `/static/clothes/${pet}.png`;
    },
    save() {
      this.saveProject({ name: this.name, comment: this.comment });
    },
    deletePr() {
      this.deleteProject(+this.$route.params.projectId);
    },
    print() {
      const filename = 'kekus';
      const container = document.querySelector('#to-pdf-wrap');
      document.querySelector('#crazyId').style.backgroundColor = '#fff';
      const coef = container.clientWidth / container.clientHeight;
      window.scrollTo(0, 0);
      html2canvas(container, {
        scale: 2,
        allowTaint: true,
        useCORS: true,
      }).then((canvas) => {
        /* eslint-disable-next-line */
        let pdf = new jsPDF('l', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 175 * coef, 175);
        pdf.save(filename);
      });
      document.querySelector('#crazyId').style.backgroundColor = '#e7e6e4';
    },
  },
  async mounted() {
    const dataUploaded = await this.setDataForOverview(+this.$route.params.projectId);
    if (!dataUploaded) {
      this.$router.push({ name: 'archiefPage' });
    }
    this.uploadFrontData();
    this.uploadBackData();
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/css/vars.scss';

#to-pdf-wrap {
  width: 1440px;
  height: 865px;
}

.project-overview-wrap {
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
    margin-top: 100px;
    display: flex;
    justify-content: flex-end;
    .button {
      background-color: $main-orange;
      padding: 10px 22px;
      color: white;
      font-weight: bold;
      border-radius: 10px;
      cursor: pointer;
    }
  }
}
.description-wrap {
  display: flex;
  justify-content: center;
}
.description {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: 650px;
  margin-right: 50px;
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
}

.size-description {
  width: 180px;
  padding-top: 15px;
  &__header {
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    height: 70px;
    border: 2px solid #555;
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
.toPDF {
  margin: 0 auto;
  width: 100px;
  background-color: $main-orange;
  padding: 8px;
  text-align: center;
  color: white;
  font-weight: bold;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 30px;
}
.delete-project {
  margin: 0 auto;
  width: 100px;
  background-color: $main-orange;
  padding: 8px;
  text-align: center;
  color: white;
  font-weight: bold;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 30px;
}
</style>
