<template>
  <div class="make-design">
    <Bread-Crumbs :items="breadCrumbsItems" />
    <Arrows-Navigation :leftLink="'/choose-size'" :rightLink="'/save-project'"/>
    <div class="make-design-wrap">
      <div class="picture-container" id="picture-container" ref="pictureContainer" onselectstart="return false" onmousedown="return false">
        <C-Loader v-if="!imageLoaded || !maskLoaded" background-color="rgba(255, 255, 255, 1)" border-radius="20px" />
        <img class="main-picture" :src="getImgUrl(mainPictureName)" alt="t-shirt-image" @load="imageLoaded = true">
        <img class="main-picture-mask" :src="getImgUrl(mainPictureMaskName)" alt="t-shirt-image" @load="maskLoaded = true">
        <img v-if="showLaces" class="main-picture-mask" :src="getImgUrl(lacesPictureName)" alt="t-shirt-image">
        <img v-if="showCollar" class="main-picture-mask" :src="getImgUrl(collarPictureName)" alt="t-shirt-image">
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
      <div class="description">
        <div class="lable">Upload picture:</div>
        <input type="file" @change="changeFileHandler($event)">
        <div class="elements-list">
          <div class="elements-list_title">Uploaded elements:</div>
          <div class="elements-list_item"
              v-for="(picture, index) in customPictures"
              :key="index + 'pic'"
          >
            <div class="title">{{ picture.name }}</div>
            <div class="close" @click="deleteElement(index, 'picture')">X</div>
            <div class="rise"><div class="button" @click="changeSize(index, 'plus', 'picture')"><div class="content">+</div></div></div>
            <div class="up"><div class="button" @click="changeZIndex(index, 'plus', 'picture')"><div class="content">up</div></div></div>
            <div class="reduse"><div class="button" @click="changeSize(index, 'minus', 'picture')"><div class="content">-</div></div></div>
            <div class="down"><div class="button" @click="changeZIndex(index, 'minus', 'picture')"><div class="content">down</div></div></div>
            <div class="down"><div class="button" @click="rotate(index, 'left', 'picture')"><div class="content">rotate left</div></div></div>
            <div class="down"><div class="button" @click="rotate(index, 'right', 'picture')"><div class="content">rotate right</div></div></div>
          </div>
          <div class="elements-list_item"
              v-for="(text, index) in customTexts"
              :key="index + 'text'"
          >
            <div class="title">{{ text.value }}</div>
            <div class="close" @click="deleteElement(index, 'text')">X</div>
            <div class="rise"><div class="button" @click="changeSize(index, 'plus', 'text')"><div class="content">+</div></div></div>
            <div class="up"><div class="button" @click="changeZIndex(index, 'plus', 'text')"><div class="content">up</div></div></div>
            <div class="reduse"><div class="button" @click="changeSize(index, 'minus', 'text')"><div class="content">-</div></div></div>
            <div class="down"><div class="button" @click="changeZIndex(index, 'minus', 'text')"><div class="content">down</div></div></div>
            <div class="down"><div class="button" @click="rotate(index, 'left', 'text')"><div class="content">rotate left</div></div></div>
            <div class="down"><div class="button" @click="rotate(index, 'right', 'text')"><div class="content">rotate right</div></div></div>
            <div class="color">
              <div class="lable">Color: <input @change="updateColor($event, index)" type="color"></div>
            </div>
            <div class="font-select">
              <div class="lable">Font: </div>
              <select
                @change="updateFont($event, index)"
                :style="{fontFamily: text.fontFamily}"
                class="select"
              >
                <option style="fontFamily: Good Brush">Good Brush</option>
                <option style="fontFamily: Visually">Visually</option>
                <option style="fontFamily: SNOWPE">SNOWPE</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="right-column">
        <div class="texts-description">
          <div class="title">Add text</div>
          <input type="text" v-model="newText" />
          <input type="button" value="Add" @click="addText()">
        </div>
        <div v-if="showLaces" class="select">
          <div class="select__lable">laces color: </div>
          <select
            @change="updateLaces($event)"
            class="select__input"
          >
            <option>white</option>
            <option>green</option>
            <option>orange</option>
            <option>red</option>
          </select>
        </div>
        <div v-if="showPoloButtons || showPoloFButtons" class="select">
          <div class="select__lable">Buttons color: </div>
          <select
            @change="updateButtons($event)"
            class="select__input"
          >
            <option>beigel</option>
            <option>dark green</option>
            <option>light green</option>
            <option>lightblue</option>
            <option>purple</option>
            <option>red</option>
            <option>turqouise</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { Draggable } from '@shopify/draggable';
import BreadCrumbs from '../BreadCrumbs';
import ArrowsNavigation from '../ArrowsNavigation';
import CLoader from '../common/CLoader';

export default {
  name: 'MakeDesign',
  components: {
    BreadCrumbs,
    ArrowsNavigation,
    CLoader,
  },
  data() {
    return {
      x: 0,
      xOffset: 0,
      y: 0,
      yOffset: 0,
      maxMove: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      customPictures: [],
      customTexts: [],
      newText: '',
      breadCrumbsItems: [
        { text: 'type', href: '/choose-type' },
        { text: 'size', href: '/choose-size' },
        { text: 'add your design', href: '/make-design' },
      ],
      side: 'front',
      imageLoaded: false,
      maskLoaded: false,
      lacesColor: 'white',
      buttonsColor: 'beigel',
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
    lacesPictureName() {
      return `${this.pictureFileName.name}/laces ${this.lacesColor}`;
    },
    buttonPictureName() {
      return `${this.pictureFileName.name}/buttons/${this.buttonsColor}`;
    },
    collarPictureName() {
      if (this.side === 'front') {
        return `${this.pictureFileName.name}/collar white`;
      }
      return `${this.pictureFileName.name}/collar white back`;
    },
    showLaces() {
      return this.side === 'front' && ['hoody', 'hoody f'].includes(this.pictureFileName.name);
    },
    showCollar() {
      return ['t-short f', 't-short', 't-short long', 't-short long f'].includes(this.pictureFileName.name);
    },
    showPoloButtons() {
      return this.side === 'front' && ['polo'].includes(this.pictureFileName.name);
    },
    showPoloFButtons() {
      return this.side === 'front' && ['polo f'].includes(this.pictureFileName.name);
    },
  },
  methods: {
    ...mapActions({
      saveFrontData: 'canvasData/saveFrontData',
      saveBackData: 'canvasData/saveBackData',
    }),
    saveData() {
      if (this.side === 'front') {
        this.saveFrontData({
          customPictures: this.customPictures,
          customTexts: this.customTexts,
          lacesColor: this.lacesColor,
          buttonsColor: this.buttonsColor,
        });
      } else {
        this.saveBackData({ customPictures: this.customPictures, customTexts: this.customTexts });
      }
    },
    uploadFrontData() {
      console.log('color: ', this.frontSide.lacesColor);
      this.customPictures = this.frontSide.customPictures;
      this.customTexts = this.frontSide.customTexts;
      this.lacesColor = this.frontSide.lacesColor;
      this.buttonsColor = this.frontSide.buttonsColor;
    },
    uploadBackData() {
      this.customPictures = this.backSide.customPictures;
      this.customTexts = this.backSide.customTexts;
    },
    updateColor(event, index) {
      this.customTexts[index].color = event.target.value;
      this.saveData();
    },
    updateFont(event, index) {
      this.customTexts[index].fontFamily = event.target.value;
      this.saveData();
    },
    updateLaces(event) {
      this.lacesColor = event.target.value;
      this.saveData();
    },
    updateButtons(event) {
      this.buttonsColor = event.target.value;
      this.saveData();
    },
    getImgUrl(pet) {
      return `/static/clothes/${pet}.png`;
    },
    changeFileHandler(e) {
      this.customPictures.push({
        src: URL.createObjectURL(e.target.files[0]),
        top: 200,
        left: 200,
        rotate: 0,
        zIndex: 0,
        width: 100,
        name: e.target.files[0].name,
        file: e.target.files[0],
      });
      e.target.value = null;
      this.saveData();
    },
    deleteElement(index, type) {
      if (type === 'picture') {
        this.customPictures.splice(index, 1);
      } else {
        this.customTexts.splice(index, 1);
      }
      this.saveData();
    },
    changeSize(index, mod, type) {
      if (type === 'picture') {
        if (mod === 'plus') {
          if (this.customPictures[index].width < 400) this.customPictures[index].width += 20;
        } else if (this.customPictures[index].width > 25) {
          this.customPictures[index].width -= 20;
        }
      } else if (type === 'text') {
        if (mod === 'plus') {
          if (this.customTexts[index].fontSize < 50) this.customTexts[index].fontSize++;
        } else if (this.customTexts[index].fontSize > 6) {
          this.customTexts[index].fontSize--;
        }
      }
      this.saveData();
    },
    changeZIndex(index, mod, type) {
      let elementsArray = [];
      if (type === 'picture') {
        elementsArray = this.customPictures;
      } else {
        elementsArray = this.customTexts;
      }
      if (mod === 'plus') {
        if (elementsArray[index].zIndex < 50) elementsArray[index].zIndex++;
      } else if (elementsArray[index].zIndex > 0) {
        elementsArray[index].zIndex--;
      }
      this.saveData();
    },
    rotate(index, mod, type) {
      let elementsArray = [];
      if (type === 'picture') {
        elementsArray = this.customPictures;
      } else {
        elementsArray = this.customTexts;
      }
      if (mod === 'left') {
        elementsArray[index].rotate -= 10;
      } else {
        elementsArray[index].rotate += 10;
      }
      this.saveData();
    },
    addText() {
      this.customTexts.push({
        value: this.newText,
        top: 200,
        left: 200,
        zIndex: 0,
        fontSize: 28,
        rotate: 0,
        color: '$ffffff',
        fontFamily: 'Good Brush',
      });
      this.newText = '';
      this.saveData();
    },
    changeSide() {
      this.imageLoaded = false;
      this.maskLoaded = false;
      if (this.side === 'front') {
        this.saveData();
        this.side = 'back';
        this.uploadBackData();
      } else {
        this.saveData();
        this.side = 'front';
        this.uploadFrontData();
      }
    },
  },
  mounted() {
    this.uploadFrontData();
    const draggable = new Draggable(this.$refs.pictureContainer, {
      mirror: {
      },
    });
    draggable.on('mirror:created', (e) => {
      this.x = e.data.sensorEvent.data.clientX;
      this.y = e.data.sensorEvent.data.clientY;
      e.data.source.style.opacity = '0';
      this.maxMove.top = e.sourceContainer.getBoundingClientRect().top - e.source.getBoundingClientRect().top;
      this.maxMove.bottom = e.sourceContainer.getBoundingClientRect().bottom - e.source.getBoundingClientRect().bottom;
      this.maxMove.left = e.sourceContainer.getBoundingClientRect().left - e.source.getBoundingClientRect().left;
      this.maxMove.right = e.sourceContainer.getBoundingClientRect().right - e.source.getBoundingClientRect().right;
    });
    draggable.on('mirror:move', (e) => {
      this.xOffset = e.data.sensorEvent.data.clientX - this.x;
      this.yOffset = e.data.sensorEvent.data.clientY - this.y;
      if (this.yOffset < this.maxMove.top) e.cancel();
      if (this.yOffset > this.maxMove.bottom) e.cancel();
      if (this.xOffset < this.maxMove.left) e.cancel();
      if (this.xOffset > this.maxMove.right) e.cancel();
    });
    draggable.on('mirror:destroy', (e) => {
      const elementWidth = e.data.source.offsetWidth;
      const elementHeight = e.data.source.offsetHeight;
      const containerWidth = e.data.sourceContainer.offsetWidth;
      const containerHeight = e.data.sourceContainer.offsetHeight;
      let elementsArray = [];
      if (e.data.source.dataset.type === 'picture') {
        elementsArray = this.customPictures;
      } else {
        elementsArray = this.customTexts;
      }
      if (elementsArray[e.data.source.dataset.index].top + this.yOffset < 0) {
        elementsArray[e.data.source.dataset.index].top = 0;
      } else if (elementsArray[e.data.source.dataset.index].top + this.yOffset > containerHeight - elementHeight) {
        elementsArray[e.data.source.dataset.index].top = containerHeight - elementHeight;
      } else {
        elementsArray[e.data.source.dataset.index].top += this.yOffset;
      }

      if (elementsArray[e.data.source.dataset.index].left + this.xOffset < 0) {
        elementsArray[e.data.source.dataset.index].left = 0;
      } else if (elementsArray[e.data.source.dataset.index].left + this.xOffset > containerWidth - elementWidth) {
        elementsArray[e.data.source.dataset.index].left = containerWidth - elementWidth;
      } else {
        elementsArray[e.data.source.dataset.index].left += this.xOffset;
      }
      this.saveData();
    });
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/css/vars.scss';

.make-design-wrap {
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
    border-radius: 20px;
    border: 1px solid #555;
    &-mask {
      max-width: 500px;
      position: absolute;
      left: 0;
      top: 0;
      pointer-events: none;
      z-index: 10000;
      border-radius: 20px;
      border: 1px solid #555;
    }
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
  .custom-picture {
    width: 100px;
    position: absolute;
    cursor: grab;
  }
  .custom-text {
    position: absolute;
    cursor: grab;
  }
  &__back-button {
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
    cursor: pointer;
  }
}
.elements-list {
  margin-top: 10px;
  border: 1px solid #555;
  border-radius: 5px;
  padding: 5px;
  &_title {
    margin-bottom: 10px;
  }
  &_item {
    border: 3px solid $main-orange;
    border-radius: 10px;
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 250px;
    margin-bottom: 10px;
    .title {
      min-width: 200px;
      margin-bottom: 15px;
    }
    .close {
      cursor: pointer;
      margin-bottom: 15px;
    }
    .rise,
    .reduse,
    .up,
    .down {
      width: 100px;
      display: flex;
      justify-content: center;
      margin-bottom: 8px;
      user-select: none;
      .button {
        width: 50px;
        border: 2px solid green;
        border-radius: 10px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        .content {
          text-align: center;
        }
      }
    }
  }
  .font-select {
    width: 100%;
    display: flex;
    .lable {
      margin-right: 10px;
    }
    .select {
      width: 200px;
      font-size: 20px;
    }
  }
}
.right-column {
  .select {
    margin-top: 30px;
    display: flex;
    &__lable {
      margin-right: 15px;
    }
  }
}
</style>
