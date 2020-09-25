import axios from '../base';

// 获取推荐收藏画作
function getRecommend(userId) {
  return axios({
    url: `/users/${userId}/recommendBookmarkIllusts`,
    method: 'get'
  });
}

// 获取可能想看的画作
function getRecommendView(userId) {
  return axios({
    url: `/users/${userId}/recommendViewIllusts`,
    method: 'get'
  });
}

export {
  getRecommend,
  getRecommendView
};
