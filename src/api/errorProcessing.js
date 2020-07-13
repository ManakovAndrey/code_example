import store from '@/store';
import router from '@/router';
import { RepositoryFactory } from '@/api/repositoryFactory';

const Repository = {
  LocalStorage: RepositoryFactory.get('localStorage'),
};
export default function errorProcessing(reject, error) {
  if (!error.response) {
    reject('connection error');
  } else {
    if (error.response.status === 401) {
      Repository.LocalStorage.set('authToken', '');
      Repository.LocalStorage.set('authTokenTime', '');
      store.commit('app/setAuthStatus', false);
      store.commit('app/setAuthToken', '');
      if (router.currentRoute.path !== '/authorization') {
        router.push('/authorization');
      }
    } else if (error.response.status === 403) {
      Repository.LocalStorage.set('authToken', '');
      Repository.LocalStorage.set('authTokenTime', '');
      store.commit('app/setAuthStatus', false);
      store.commit('app/setAuthToken', '');
      if (router.currentRoute.path !== '/authorization') {
        router.push('/authorization');
      }
    }
    reject(error.response.status);
  }
}
