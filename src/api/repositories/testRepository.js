import Repository from './repository';

const TestResource = 'posts';

export default {
  getTestData(value) {
    return new Promise((resolve, reject) => {
      Repository.post(`${TestResource}`, value).then((responce) => {
        resolve(responce.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
};
