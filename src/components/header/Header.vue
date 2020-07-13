<template>
  <header id="main-header" :style="styles">
    <div class="border-wrapper" :style="styles">
      <div class="content">
        <!-- <Logo :top="haederStyles.logoTop" /> -->
        <Main-Navbar v-if="haederStyles.showNavbar"/>
        <Back-Nav v-if="haederStyles.showBackNav" />
        <div v-if="showLogOut" class="logout" @click="logOut()">Logout</div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Logo from './Logo';
import MainNavbar from './MainNavbar';
import BackNav from './BackNav';

export default {
  name: 'Header',
  components: {
    Logo,
    MainNavbar,
    BackNav,
  },
  computed: {
    ...mapState({
      haederStyles: state => state.main.haederStyles,
    }),
    styles() {
      return {
        '--border-color': this.haederStyles.borderColor,
        '--header-height': this.haederStyles.headerHeight,
      };
    },
    showLogOut() {
      return this.$route.name === 'home';
    },
  },
  methods: {
    ...mapActions({
      logOut: 'main/logOut',
    }),
  },
};

</script>

<style lang="scss" scoped>
@import 'src/assets/css/vars.scss';

#main-header {
  max-width: 100%;
  height: var(--header-height);
  position: relative;
  margin-bottom: 50px;
  .border-wrapper {
    width: 100%;
    height: calc(100% + 21px);
    border-style: solid;
    border-width: 6px;
    border-color: var(--border-color);
    border-radius: 25px;
    box-sizing: border-box;
    position: absolute;
    top: -21px;
    padding: 50px 20px 10px;
    .content {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      position: relative;
      height: 100%;
    }
  }
  .logout {
    position: absolute;
    right: 10px;
    bottom: 10px;
    cursor: pointer;
    color: white;
  }
}
</style>
