import Mock from 'mockjs';
// eslint-disable-next-line
import TestMock from './test/testMock'

TestMock.forEach((item) => {
  Mock.mock(item.url, item.data);
});
export default Mock;
