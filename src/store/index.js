import Vue from 'vue';
import Vuex from 'vuex';
import main from './modules/main';
import canvasData from './modules/canvasData';
import archiefData from './modules/archiefData';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    main,
    canvasData,
    archiefData,
  },
});

