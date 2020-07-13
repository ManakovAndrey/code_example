<template>
  <section id="layout" :style="styles">
    <Main-Header />
    <router-view/>
  </section>
</template>

<script>
import MainHeader from '@/components/header/Header';
import { mapState } from 'vuex';

export default {
  name: 'MainLayout',
  components: {
    MainHeader,
  },
  computed: {
    ...mapState({
      layoutHeight: state => state.main.layoutHeight,
    }),
    styles() {
      return {
        height: this.layoutHeight,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
#layout {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 15px;
}
</style>
