import RepositoryFactory from '@/api/repositoryFactory';
import router from '../../router';
// import errorProcessing from '@/api/errorProcessing';
const USERNAME = 'admin';
const PASSWORD = '12345';

const Repository = {
  Test: RepositoryFactory.get('test'),
};

const state = {
  isAuth: false,
  testData: '',
  backgroundColor: '#666666',
  backgroundImage: 'none',
  haederStyles: {
    borderColor: '#ffffff',
    textColor: '#ffffff',
    showNavbar: true,
    headerHeight: '10rem',
    logoTop: '0',
  },
  layoutHeight: '100vh',
  isLoading: false,
};

const getters = {};

const mutations = {
  setTestData(state, payload) {
    state.testData = payload;
  },
  setBackground(state, payload) {
    state.backgroundColor = payload.color;
    state.backgroundImage = payload.image;
  },
  setHaederStyles(state, payload) {
    state.haederStyles.borderColor = payload.borderColor;
    state.haederStyles.textColor = payload.textColor;
    state.haederStyles.showNavbar = payload.showNavbar;
    state.haederStyles.headerHeight = payload.headerHeight;
    state.haederStyles.logoTop = payload.logoTop;
    state.haederStyles.showBackNav = payload.showBackNav;
  },
  setAuth(state, payload) {
    state.isAuth = payload;
  },
  setLoaderStatus(state, payload) {
    state.isLoading = payload;
  },
  setLayoutHeight(state, payload) {
    state.layoutHeight = payload;
  },
};

const actions = {
  // eslint-disable-next-line
  async getTestData({ state, commit }, params) {
    try {
      const data = await Repository.Test.getTestData(params);
      commit('setTestData', data);
    } catch (e) {
      console.log('error: ', e);
      // errorProcessing(e)
      // TODO: refactor errorProcessing
    }
  },
  // eslint-disable-next-line
  changeStyles({ state, commit }, stylesScheme) {
    if (stylesScheme === 'mainPage') {
      commit('setBackground', { color: '#666666', image: 'grey' });
      commit('setHaederStyles', { borderColor: '#ffffff', textColor: '#ffffff', showNavbar: true, headerHeight: '10rem', logoTop: '0', showBackNav: false });
    } else if (stylesScheme === 'createDesign') {
      commit('setBackground', { color: '#e7e6e4', image: 'white' });
      commit('setHaederStyles', { borderColor: '#000000', textColor: '#000000', showNavbar: false, headerHeight: '5rem', logoTop: '-12px', showBackNav: true });
    } else if (stylesScheme === 'authPage') {
      commit('setBackground', { color: '#666666', image: 'grey' });
      commit('setHaederStyles', { borderColor: '#ffffff', textColor: '#ffffff', showNavbar: false, headerHeight: '10rem', logoTop: '0', showBackNav: false });
    }
  },

  // eslint-disable-next-line
  async tryAuth({ state, commit }, data) {
    if (data.username === USERNAME && data.password === PASSWORD) {
      commit('setAuth', true);
      localStorage.setItem('username', USERNAME);
      localStorage.setItem('password', PASSWORD);
      return 'success';
    }
    return 'error';
  },

  // eslint-disable-next-line
  async logOut({ state, commit }) {
    await localStorage.setItem('username', '');
    await localStorage.setItem('password', '');
    await commit('setAuth', false);
    router.push({ name: 'authorization' });
  },

  async isAuth({ state }) {
    if (state.isAuth) {
      return true;
    }
    const usernameFromLocalStorage = await localStorage.getItem('username');
    const passwordFromLocalStorage = await localStorage.getItem('password');
    return usernameFromLocalStorage === USERNAME && passwordFromLocalStorage === PASSWORD;
  },

  // eslint-disable-next-line
  changeLoaderStatus({ state, commit }, payload) {
    commit('setLoaderStatus', payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
