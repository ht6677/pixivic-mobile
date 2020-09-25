<template>
  <div class="container">
    <div class="infos">
      <img :src="require('@/assets/images/girl.gif')">
      <h2>友链の墙</h2>
      <p>以下是一些值得一去的网站</p>
    </div>
    <div class="version">
      <h4>
        <a href="http://www.acgjc.com">ACG漫音社</a>
      </h4>
      <ul>
        <li>动漫无损音乐下载资讯站</li>
        <li>专注分享二次元高品质音乐~</li>
      </ul>
      <h4>
        <a href="http://acg17.com">ACG17宅</a>
      </h4>
      <ul>
        <li>一个有趣的动漫小站</li>
      </ul>
      <h4>
        <a href="https://acg.blue">Xinger1337's Home</a>
      </h4>
      <ul>
        <li>搜刮各种二次元美图</li>
      </ul>
      <h4>
        <a href="http://guozhivip.com/nav/">果汁导航</a>
      </h4>
      <ul>
        <li>一个简约优质实用的资源导航平台</li>
      </ul>
      <h4>
        <a href="http://www.animetox.com/">Animex动漫社</a>
      </h4>
      <ul>
        <li>二次元及日本文化最速报</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.infos
  background-color #f8f9fa
  box-sizing border-box
  color #454d5d
  padding 10px 10px 10px 10px
  img
    width 80px
    float left
    padding-right 10px
.version
  padding 10px 40px 10px 40px
  overflow hidden
  width 100%
  h4, ul, li
    color #454d5d
  ul
    margin 0 0 10px 5px
    a img
      border-radius 5px
      box-shadow 0 0 10px rgba(0, 0, 0, .3)
      height 40px
      display inline
      margin-left 5px
  h2
    margin 0
    font-size 2.4em
    position relative
    color #454d5d
    padding-top 13px
  h4
    font-size 1.2em
    position relative
    a
      color #454d5d
    &::before
      content ''
      width 14px
      height 14px
      background #b9eee5
      display inline-block
      vertical-align middle
      margin-top -4px
      margin-right 11px
      border-radius 100%
      border 3px solid #fff
      box-shadow 0 0 5px #b0b0b0
    &::after
      content ''
      height 100vh
      width 2px
      background #b9eee5
      position absolute
      left 7px
      top 14px
</style>
