import Vue from 'vue';
import animated from 'animate.css';
import App from './App.vue';
import router from './router';
import store from './store/';
import api from './api';
import util from './util';
import './assets/style/index.styl';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import VuePageStack from 'vue-page-stack';
import VueGtag from 'vue-gtag';
import { replaceBigImg, replaceSmallImg } from '@/util';

Vue.use(Vuetify);
Vue.use(VuePageStack, { router, keyName: 'VNK' });

// import VConsole from 'vconsole';
// new VConsole();
Vue.config.productionTip = false;
Vue.use(animated);
Vue.use(VueGtag, {
  config: { id: 'UA-158701012-1' }
});
Vue.prototype.$api = api;
Vue.prototype.$util = util;

Vue.filter('dateFormat', val => {
  const time = new Date(val);
  const y = time.getFullYear();
  const m = time.getMonth() + 1;
  const d = time.getDate();
  return `${y}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d}`;
});
Vue.filter('replaceBig', val => replaceBigImg(val));
Vue.filter('replaceSmall', val => replaceSmallImg(val));
Vue.filter('replaceAvatar', val => `https://pic.cheerfun.dev/${val}.png`);
Vue.filter('replaceSquare', val => 'https://img.cheerfun.dev/c/360x360_70/img-master' + val.split('img-master')[1]);

const app = new Vue({
  router,
  store,
  vuetify: new Vuetify({
    icons: {
      iconfont: 'mdi'
    }
  }),
  render: h => h(App)
});

app.$mount('#app');
