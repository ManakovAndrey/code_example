import TestRepository from './repositories/testRepository';
import LocalStorageRepository from './repositories/localStorageRepository';
import projects from './repositories/projects';

const repositories = {
  test: TestRepository,
  localStorage: LocalStorageRepository,
  projects,
};

const RepositoryFactory = {
  get: name => repositories[name],
};

export default RepositoryFactory;
