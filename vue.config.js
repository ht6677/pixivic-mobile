/*
 * @Author: Kim
 * @since: 2020-03-21 14:10:00
 * @lastTime: 2020-03-25 23:01:46
 * @LastAuthor: Dongzy
 * @FilePath: \pixivic-mobile\vue.config.js
 * @message:
 */
const path = require('path');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
function resolve(dir) {
  return path.join(__dirname, dir);
}

console.log('Url prefix: ', process.env.VUE_APP_PREFIX);

module.exports = {
  runtimeCompiler: true,
  lintOnSave: false,
  publicPath: process.env.VUE_APP_PREFIX,
  // publicPath: './',

  // 路径别名
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('static', resolve('static'));
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true
      }
    }
  },

  configureWebpack: config => {
    const devPlugins = [new BundleAnalyzerPlugin()];
    const plugins = [];
    config.externals = {
      // vue: 'Vue',
      // 'vue-router': 'VueRouter',
      // 'vuetify': 'Vuetify'
      // 'element-ui': 'ElementUI'
      // 其他三方库 ...
    };
    if (process.env.NODE_ENV !== 'development') {
      config.plugins = [...config.plugins, ...plugins];
    } else {
      config.plugins = [...config.plugins, ...devPlugins];
    }
  }

}
;
