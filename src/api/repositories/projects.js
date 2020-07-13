import Repository from './repository';

const resource = 'api/Pictures';

export default {
  postNewProjectData(value) {
    return new Promise((resolve, reject) => {
      Repository.post(`${resource}`, value).then((responce) => {
        resolve(responce.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  postNewProjectPictures(id, value) {
    return new Promise((resolve, reject) => {
      Repository.post(`${resource}/${id}`, value).then((responce) => {
        resolve(responce.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  getAllProjects() {
    return new Promise((resolve, reject) => {
      Repository.get(`${resource}`).then((responce) => {
        resolve(responce.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
  deleteProject(id) {
    return new Promise((resolve, reject) => {
      Repository.delete(`${resource}/${id}`).then((responce) => {
        resolve(responce.data);
      }).catch((error) => {
        reject(error);
      });
    });
  },
};
