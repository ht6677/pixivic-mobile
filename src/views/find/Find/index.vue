<!--
 * @Author: Dongzy
 * @since: 2020-03-16 23:57:53
 * @lastTime: 2020-03-25 21:40:35
 * @LastAuthor: Dongzy
 * @FilePath: \pixivic-mobile\src\views\find\Find.vue
 * @message:
 -->
<template>
  <div class="find">
    <div class="container">
      <a
        v-for="item in list"
        :key="item.id"
        v-ripple
        :href="item.value"
        class="items"
      >
        <svg font-size="40" class="icon" aria-hidden="true">
          <use :xlink:href="item.icon" />
        </svg>
        <span>{{ item.text }}</span>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Find',
  data() {
    return {
      list: [
        { id: 1, text: 'spotlight', value: '/spotlight', icon: '#picxiangce' },
        { id: 2, text: '反馈', value: 'https://discuss.pixivic.com/', icon: '#picluntan1' },
        { id: 3, text: '关于我们', value: '/links', icon: '#picyonghuxuzhi-' },
        { id: 4, text: '前端', value: 'https://github.com/cheer-fun/pixivic-mobile', icon: '#picGithub' },
        { id: 5, text: '后端', value: 'https://github.com/cheer-fun/pixivic-web-backend', icon: '#picGithub' },
        { id: 6, text: '友链', value: '/friends', icon: '#piclianjie-copy' },
        { id: 7, text: 'Android', value: 'https://wwa.lanzous.com/iR9E5eljotc', icon: '#picxiazai-' },
        { id: 8, text: 'IOS', value: 'https://apps.apple.com/cn/app/pixivic/id1508873995', icon: '#picxiazai-' }
      ]
    };
  }
};
</script>

<style scoped lang="stylus">
.find
  width 100vw
  height 100vh
  position relative
  z-index 2
  padding 20px
  background url('~@/assets/images/bg.jpg') no-repeat
  background-size cover
  .container
    width 100%
    height 100%
    padding 5px
    box-sizing border-box
    display flex
    flex-wrap wrap
    align-content flex-start
    .items
      width 25%
      height 100px
      display flex
      flex-direction column
      align-items center
      justify-content center
      span
        text-align center
        color #000
        display inline-block
        margin-top 2px
</style>
