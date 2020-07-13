<template>
  <div class="archief-page">
    <div class="title">Projects archief</div>
    <template v-if="projects.length === 0">There is no projects yet.</template>
    <div v-else v-for="project in projects" :key="project.id">
      <router-link :to="{ name: 'projectOverviewPage', params: { projectId: project.id }}">
        <div class="project-card">
            <div class="picture-container">
              <C-Loader v-if="!project.imageLoaded || !project.maskLoaded" background-color="rgba(255, 255, 255, 1)" border-radius="20px" />
              <img class="main-picture" :src="getImgUrl(mainPictureName(project.pictureName.name, project.pictureName.color))" alt="t-shirt-image" @load="setLoadedImage(project.id)" >
              <img class="main-picture-mask" :src="getImgUrl(mainPictureMaskName(project.pictureName.name))" alt="t-shirt-image" @load="setLoadedMask(project.id)" >
            </div>
            <div class="project-card__description description">
              <div class="description__name">
                <div class="lable">NAME:</div>
                <Text-Input v-model="project.name" disabled/>
              </div>
              <div class="description__comment">
                <div class="lable">COMMENT:</div>
                <Text-Area v-model="project.comment" disabled />
              </div>
            </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import TextInput from '../TextInput';
import TextArea from '../TextArea';
import CLoader from '../common/CLoader';

export default {
  name: 'ArchiefPage',
  components: {
    TextInput,
    TextArea,
    CLoader,
  },
  data() {
    return {
      loadedProjects: {},
    };
  },
  computed: {
    ...mapState({
      projects: state => state.archiefData.archiefData,
    }),
  },
  methods: {
    ...mapActions({
      getAllProjects: 'archiefData/getAllProjects',
      changeLoaderStatus: 'main/changeLoaderStatus',
      setProjetLoaded: 'archiefData/setProjectLoaded',
    }),
    getImgUrl(pet) {
      return `/static/clothes/${pet}.png`;
    },
    mainPictureName(name, color) {
      return `${name}/${color}`;
    },
    mainPictureMaskName(name) {
      return `${name}/mask`;
    },
    setLoadedImage(projectId) {
      this.setProjetLoaded({ projectId, type: 'image' });
    },
    setLoadedMask(projectId) {
      this.setProjetLoaded({ projectId, type: 'mask' });
    },
  },
  async mounted() {
    if (this.projects.length === 0) {
      this.changeLoaderStatus(true);
      await this.getAllProjects();
      this.changeLoaderStatus(false);
    }
  },
};
</script>

<style lang="scss" scoped>
@import 'src/assets/css/vars.scss';
.title {
  margin-top: 80px;
  margin-left: 100px;
  margin-bottom: 50px;
  padding: 8px;
  border-radius: 15px;
  background-color: white;
  text-transform: uppercase;
  max-width: 200px;
  text-align: center;
  font-weight: bold;
}
.project-card {
  display: flex;
  margin-bottom: 20px;
  border: 2px solid $main-orange;
  border-radius: 15px;
  padding: 15px;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    border: 2px solid #f00;
  }
  &__description {
    padding: 20px;
  }
  &__title {
    font-weight: bold;
  }
}
.picture-container {
  position: relative;
  outline: none;
  width: 252px;
  height: 285px;
  .main-picture {
    max-width: 250px;
    background-color: #555;
    border: 1px solid #555;
    border-radius: 20px;
  }
  .main-picture-mask {
    max-width: 250px;
    border: 1px solid #555;
    border-radius: 20px;
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
    z-index: 10000;
  }
}
.description {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  max-width: 650px;
  width: 100%;
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
</style>
