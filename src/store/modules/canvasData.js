import RepositoryFactory from '@/api/repositoryFactory';
// import errorProcessing from '@/api/errorProcessing';

// eslint-disable-next-line
const Repository = {
  Test: RepositoryFactory.get('test'),
  projects: RepositoryFactory.get('projects'),
};

const initialState = {
  pictureName: '',
  sizeData: {},
  frontSide: {
    customPictures: [],
    customTexts: [],
    lacesColor: 'white',
    buttonsColor: 'beigel',
  },
  backSide: {
    customPictures: [],
    customTexts: [],
  },
};

const state = { ...initialState };

const getters = {
  getFrontPicturesForSend(state) {
    return state.frontSide.customPictures.map((item, index) => ({
      ...item,
      file: null,
      name: `file_frontSide_${index}.${item.name.split('.').pop()}`,
    }));
  },
  getBackPicturesForSend(state) {
    return state.backSide.customPictures.map((item, index) => ({
      ...item,
      file: null,
      name: `file_backSide_${index}.${item.name.split('.').pop()}`,
    }));
  },
};

const mutations = {
  setFrontSide(state, payload) {
    state.frontSide.customPictures = payload.customPictures;
    state.frontSide.customTexts = payload.customTexts;
    state.frontSide.lacesColor = payload.lacesColor;
    state.frontSide.buttonsColor = payload.buttonsColor;
  },
  setBackSide(state, payload) {
    state.backSide.customPictures = payload.customPictures;
    state.backSide.customTexts = payload.customTexts;
  },
  setPictureName(state, payload) {
    state.pictureName = payload;
  },
  setSizeData(state, payload) {
    state.sizeData = payload;
  },
};

const actions = {
  saveFrontData({ commit }, payload) {
    commit('setFrontSide', payload);
  },
  saveBackData({ commit }, payload) {
    commit('setBackSide', payload);
  },
  changePictureName({ commit }, payload) {
    commit('setPictureName', payload);
  },
  changeSizeData({ commit }, payload) {
    commit('setSizeData', payload);
  },
  setInititalDala({ commit }) {
    console.log('setting initial');
    commit('setFrontSide', {
      customPictures: [],
      customTexts: [],
      lacesColor: 'white',
      buttonsColor: 'beigel',
    });
    commit('setBackSide', {
      customPictures: [],
      customTexts: [],
    });
    commit('setPictureName', '');
    commit('setSizeData', {});
  },
  // eslint-disable-next-line no-shadow
  async saveProject({ state, getters }, payload) {
    const projectData = {
      pictureName: state.pictureName,
      sizeData: state.sizeData,
      frontSide: {
        customPictures: getters.getFrontPicturesForSend,
        customTexts: state.frontSide.customTexts,
        lacesColor: state.frontSide.lacesColor,
        buttonsColor: state.frontSide.buttonsColor,
      },
      backSide: {
        customPictures: getters.getBackPicturesForSend,
        customTexts: state.backSide.customTexts,
      },
      name: payload.name,
      comment: payload.comment,
    };
    const formData = new FormData();
    state.frontSide.customPictures.forEach((item, index) => {
      formData.append('files', item.file, `file_frontSide_${index}.${item.name.split('.').pop()}`);
    });
    state.backSide.customPictures.forEach((item, index) => {
      formData.append('files', item.file, `file_backSide_${index}.${item.name.split('.').pop()}`);
    });
    const { id } = await Repository.projects.postNewProjectData(projectData);
    if (state.frontSide.customPictures.length + state.backSide.customPictures.length > 0) {
      Repository.projects.postNewProjectPictures(id, formData);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
