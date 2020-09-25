<template>
  <div class="donate">
    <div class="infos">
      <img :src="require('@/assets/images/girl.gif')"><h2>捐助の墙</h2>
      <p>捐助二维码与捐助记录</p>
    </div>
    <div class="version">
      <h4>捐助渠道</h4>
      <ul>
        <li> 维护不易，且行且珍惜，捐助的朋友们烦请留下昵称（支付宝 & 微信）</li>
        <img :src="require('@/assets/images/wechat.jpg')" alt="">
        <img :src="require('@/assets/images/alipay.jpg')" alt="">
      </ul>
      <h4>贡献者List</h4>
      <ul>
        <table class="table">
          <tbody>
            <tr>
              <th>ID</th>
              <th>金额</th>
              <th>时间</th>
            </tr>
            <tr v-for="(item, index) in donate" :key="index">
              <td>{{ item.postscript || '*' }}</td>
              <td>￥{{ item.sum }}</td>
              <td>{{ item.time }}</td>
            </tr>
          </tbody>
        </table>
      </ul>
    </div>
  </div>
</template>

<script>
import donate from 'static/resources/donate.json';

export default {
  data() {
    return {
      donate
    };
  }
};
</script>

<style lang="stylus" scoped>
.donate
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
      img
        width 45%
        border-radius 10px
        margin-right 5px
      .table
        width 100%
        max-width 100%
        margin-bottom 10px
        border-collapse separate
        border-spacing 2px
        border-color grey
        tbody
          display table-row-group
          vertical-align middle
          border-color inherit
          tr
            display table-row
            vertical-align inherit
            border-color inherit
            th, td
              padding 7px
              vertical-align top
              border-top 2px solid #b9eee6
              color #454d5d
            th
              text-align left
    h2
      margin 0
      font-size 2.4em
      position relative
      color #454d5d
      padding-top 13px
    h4
      font-size 1.2em
      position relative
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
