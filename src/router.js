import Vue from 'vue';
import Router from 'vue-router';
import cookie from 'js-cookie';

Vue.use(Router);

const pages = {
  DailyRank: () => import('./views/rank/DailyRank'),
  Detail: () => import('./views/detail/Detail'),
  Artist: () => import('./views/artist/Artist'),
  Search: () => import('./views/search/Search'),
  Illusts: () => import('./views/search/children/Illusts'),
  Artists: () => import('./views/search/children/Artists'),
  Find: () => import('./views/find/Find/'),
  SpotLight: () => import('./views/find/SoptLight/'),
  Spot: () => import('./views/find/Spot/'),
  Me: () => import('./views/me/Me/'),
  Collect: () => import('./views/me/Collect/'),
  Collects: () => import('./views/me/Collects/'),
  ArtistCollect: () => import('./views/me/ArtistCollect/'),
  Links: () => import('./views/find/Links/'),
  New: () => import('./views/new/New.vue'),
  Setting: () => import('./views/me/Setting/'),
  Avatar: () => import('./views/me/Avatar'),
  Login: () => import('./views/login/Login'),
  QQauth: () => import('./views/login/qqauth'),
  Register: () => import('./views/register/Register'),
  ResetPassword: () => import('./views/reset/ResetPassword'),
  EmailCheck: () => import('./views/reset/EmailCheck'),
  Friends: () => import('./views/find/Friends/'),
  Users: () => import('./views/users/Users'),
  BookMark: () => import('./views/bookmark/BookMark'),
  History: () => import('./views/me/History/'),
  Recommend: () => import('./views/recommend/Recommend')
  // NotFound: () => import('./views/not-found/NotFound')
};

// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err);
// };

const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_PREFIX,
  routes: [{
    path: '/',
    redirect: '/dailyRank'
  },
  {
    path: '/detail/:pid',
    name: 'Detail',
    component: pages.Detail,
    props: true,
    meta: {
      title: `详情`
    }
  },
  {
    path: '/illusts/:pid',
    name: 'Illusts',
    component: pages.Detail,
    props: true,
    meta: {
      title: `详情`
    }
  },
  {
    path: '/artist/:artistId',
    name: 'Artist',
    component: pages.Artist,
    props: true,
    meta: {
      title: `画师`
    }
  },
  {
    path: '/dailyRank',
    name: 'DailyRank',
    component: pages.DailyRank,
    meta: {
      title: `Pixiv Illustration Collection`
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: pages.Search,
    meta: {
      title: `搜索`
    },
    children: [
      {
        path: 'illusts',
        name: 'SearchIllusts',
        component: pages.Illusts
      },
      {
        path: 'artists',
        name: 'Artists',
        component: pages.Artists
      }
    ]
  },
  {
    path: '/find',
    name: 'Find',
    component: pages.Find,
    meta: {
      title: `发现`
    }
  },
  {
    path: '/spotlight',
    name: 'SpotLight',
    component: pages.SpotLight,
    meta: {
      title: `spotlight`
    }
  },
  {
    path: '/spot/:id',
    name: 'Spot',
    component: pages.Spot,
    props: true,
    meta: {
      title: `spot`
    }
  },
  {
    path: '/me',
    name: 'Me',
    component: pages.Me,
    meta: {
      title: `个人中心`
    }
  },
  {
    path: '/collect',
    name: 'Collect',
    component: pages.Collect,
    meta: {
      title: `我的收藏`
    }
  },
  {
    path: '/collects',
    name: 'Collects',
    component: pages.Collects,
    meta: {
      title: `我的画集`
    }
  },
  {
    path: '/artistCollect',
    name: 'ArtistCollect',
    component: pages.ArtistCollect,
    meta: {
      title: `我的关注`
    }
  },
  {
    path: '/links',
    name: 'Links',
    component: pages.Links,
    meta: {
      title: `用户须知`
    }
  },
  {
    path: '/new',
    name: 'New',
    component: pages.New,
    meta: {
      title: `画师新作`
    }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: pages.Setting,
    meta: {
      title: `个人设置`
    }
  },
  {
    path: '/avatar',
    name: 'Avatar',
    component: pages.Avatar,
    meta: {
      title: `更新头像`
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: pages.Login,
    meta: {
      title: `登录`
    }
  },
  {
    path: '/qqauth',
    name: 'QQauth',
    component: pages.QQauth
  },
  {
    path: '/register',
    name: 'Register',
    component: pages.Register,
    meta: {
      title: `注册`
    }
  },
  {
    path: '/resetPassword',
    name: 'ResetPassword',
    component: pages.ResetPassword,
    meta: {
      title: `重置密码`
    }
  },
  {
    path: '/emailCheck',
    name: 'EmailCheck',
    component: pages.EmailCheck,
    meta: {
      title: `邮箱认证`
    }
  },
  {
    path: '/friends',
    name: 'Friends',
    component: pages.Friends,
    meta: {
      title: `友情链接`
    }
  },
  {
    path: '/users/:userId',
    name: 'Users',
    component: pages.Users,
    props: true
  },
  {
    path: '/bookmark/:illustId',
    name: 'BookMark',
    component: pages.BookMark,
    props: true
  },
  {
    path: '/history',
    name: 'History',
    component: pages.History,
    meta: {
      title: `浏览历史`
    }
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: pages.Recommend,
    meta: {
      title: `为你推荐`
    }
  }
  // {
  //   path: '*',
  //   redirect: '/dailyRank'
  // }
  ]
});

router.beforeEach((to, from, next) => {
  const isLogin = !!cookie.get('jwt');
  const needLogin = to.path === '/me' || to.path === '/new' || to.path === 'recommend';
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (!needLogin) {
    // 不需要登录的页面直接放行
    next();
  } else {
    // 需要登录的页面需要jwt
    isLogin ? next() : next('/login');
  }
});

export default router;
