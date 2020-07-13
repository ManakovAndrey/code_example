import store from '@/store';
import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

Vue.use(Router);

const router = new Router({
  routes,
  mode: 'history',
});
function setStyles(toPath) {
  if (toPath === '/') {
    store.dispatch('main/changeStyles', 'mainPage');
  } else if (toPath === '/authorization') {
    store.dispatch('main/changeStyles', 'authPage');
  } else {
    store.dispatch('main/changeStyles', 'createDesign');
  }
}
router.beforeEach(async (to, from, next) => {
  const isAuth = await store.dispatch('main/isAuth');
  if (to.path === '/archief-page' || to.name === 'projectOverviewPage') {
    store.commit('main/setLayoutHeight', '100%');
  } else {
    store.commit('main/setLayoutHeight', '100vh');
  }
  if (!isAuth) {
    if (to.path !== '/authorization') {
      setStyles('/authorization');
      next('/authorization');
    } else {
      setStyles(to.path);
      next();
    }
  } else if (to.path === '/authorization') {
    setStyles('/');
    next('/');
  } else {
    setStyles(to.path);
    next();
  }
});

export default router;
