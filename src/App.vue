<template>
  <div id="app" :style="styles" :class="bgImage">
    <Main-Layout />
    <C-Loader v-if="isLoading" background-color="rgba(255, 255, 255, 1)" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MainLayout from '@/components/Layout';
import CLoader from './components/common/CLoader';

export default {
  name: 'App',
  components: {
    MainLayout,
    CLoader,
  },
  computed: {
    ...mapState({
      bgColor: state => state.main.backgroundColor,
      bgImage: state => state.main.backgroundImage,
      isLoading: state => state.main.isLoading,
    }),
    styles() {
      return {
        '--bg-color': this.bgColor,
      };
    },
  },
};
</script>

<style lang="scss">
@import 'src/assets/css/fonts.scss';
html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
  font-family: Main;
  &.grey {
    background-image: url('./assets/images/background-grey.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
}
html {
  height: auto;
}
a {
  text-decoration: none;
  color: inherit;
}
</style>
