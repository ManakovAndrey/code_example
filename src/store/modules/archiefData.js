import RepositoryFactory from '@/api/repositoryFactory';
import { baseURL } from '../../api/config';
// import errorProcessing from '@/api/errorProcessing';

// eslint-disable-next-line
const Repository = {
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
  name: '',
  comment: '',
  archiefData: [],
};

const state = { ...initialState };

const getters = {
};

const mutations = {
  setFrontSide(state, payload) {
    state.frontSide.customPictures = payload.customPictures;
    state.frontSide.customTexts = payload.customTexts;
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
  setArchiefData(state, payload) {
    state.archiefData = payload;
  },
  setName(state, payload) {
    state.name = payload;
  },
  setComment(state, payload) {
    state.comment = payload;
  },
  setProjectImageLoaded(state, payload) {
    state.archiefData = state.archiefData.map((item) => {
      if (item.id === payload) {
        return {
          ...item,
          imageLoaded: true,
        };
      }
      return item;
    });
  },
  setProjectMaskLoaded(state, payload) {
    state.archiefData = state.archiefData.map((item) => {
      if (item.id === payload) {
        return {
          ...item,
          maskLoaded: true,
        };
      }
      return item;
    });
  },
};

const actions = {
  setInititalDala({ commit }) {
    commit('setFrontSide', initialState.frontSide);
    commit('setBackSide', initialState.backSide);
    commit('setPictureName', initialState.pictureName);
    commit('setSizeData', initialState.sizeData);
    commit('setArchiefData', initialState.archiefData);
  },

  async getAllProjects({ commit }) {
    let allProjects = await Repository.projects.getAllProjects();
    allProjects = allProjects.map(item => ({
      ...item,
      imageLoaded: false,
      maskLoaded: false,
    }));
    commit('setArchiefData', allProjects);
  },

  setDataForOverview({ state, commit }, projectId) {
    const projectData = state.archiefData.find(item => item.id === projectId);
    if (projectData) {
      projectData.frontSide.customPictures = projectData.frontSide.customPictures.map(item => ({
        ...item,
        src: item.src.includes('http') ? item.src : baseURL + item.src,
      }));
      projectData.backSide.customPictures = projectData.backSide.customPictures.map(item => ({
        ...item,
        src: item.src.includes('http') ? item.src : baseURL + item.src,
      }));
      commit('setFrontSide', projectData.frontSide);
      commit('setBackSide', projectData.backSide);
      commit('setPictureName', projectData.pictureName);
      commit('setSizeData', projectData.sizeData);
      commit('setName', projectData.name);
      commit('setComment', projectData.comment);
      return true;
    }
    return false;
  },

  setProjectLoaded({ commit }, payload) {
    if (payload.type === 'image') {
      commit('setProjectImageLoaded', payload.projectId);
    } else {
      commit('setProjectMaskLoaded', payload.projectId);
    }
  },

  // eslint-disable-next-line
  async deleteProject({ commit }, payload) {
    return Repository.projects.deleteProject(payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
