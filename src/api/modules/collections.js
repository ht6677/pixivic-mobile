import axios from '../base';

// 新建画集
function addCollections(data) {
  return axios({
    url: `/collections`,
    method: 'post',
    data: {
      isPublic: 1,
      forbidComment: 0,
      pornWarning: 0,
      ...data
    }
  });
}

// 查看用户画集
function getCollections(params) {
  return axios({
    url: `/users/${params.userId}/collections`,
    method: 'get',
    params: {
      pageSize: 30,
      isPublic: 1,
      ...params
    }
  });
}

export {
  addCollections,
  getCollections
};
