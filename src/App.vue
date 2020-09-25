<template>
  <v-app id="app">
    <vue-page-stack>
      <router-view :key="key" />
    </vue-page-stack>
    <div :class="['tabs', {'show': showTab}]">
      <div
        v-for="item in tabs"
        :key="item.value"
        class="tabs-item"
        @click.stop="clickTab(item.value)"
      >
        <img
          :src="active === item.value ? item.activeSrc : item.src"
          :style="{transform: active === item.value ? 'scale(1.1)' : ''}"
          alt
        >
      </div>
      <div class="tabs-item" @click="$router.push('/me')">
        <img
          :src="user.id ? `https://pic.cheerfun.dev/${user.id}.png` : require('@/assets/images/me.svg')"
          :style="{transform: $route.name === 'Me' ? 'scale(1.1)' : ''}"
        >
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
// import cookie from 'js-cookie';
import Alert from '@/components/alert';
export default {
  data() {
    return {
      active: '/dailyRank',
      tabs: [
        {
          value: '/dailyRank',
          src: require('@/assets/images/pixivic.svg'),
          activeSrc: require('@/assets/images/pixivic-active.svg')
        },
        {
          value: '/recommend',
          src: require('@/assets/images/recommend.svg'),
          activeSrc: require('@/assets/images/recommend-active.svg')
        },
        {
          value: '/find',
          src: require('@/assets/images/find.svg'),
          activeSrc: require('@/assets/images/find-active.svg')
        },
        {
          value: '/new',
          src: require('@/assets/images/new.svg'),
          activeSrc: require('@/assets/images/new-active.svg')
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['cachedViews', 'showTab', 'user']),
    key() {
      return this.$route.path;
    }
  },
  watch: {
    $route: {
      handler(val) {
        this.active = val.path;
      },
      immediate: true
    }
  },
  async mounted() {
    if (!sessionStorage.getItem('alert')) {
      await Alert({
        content: '请大家关注一下微信公众号和微博，我们会在上面发布最新资讯与更新记录',
        html: `
        <div style="display: flex; justify-content: center;">
          <img src="${require('@/assets/images/wchat.jpg')}" style="width: 50%; height: 50%; margin-right: 5px;" />
          <img src="${require('@/assets/images/wbo.jpg')}" style="width: 50%; height: 50%;" />
        </div>
      `
      });
      sessionStorage.setItem('alert', true);
    }
  },
  methods: {
    clickTab(val) {
      this.$router.push(val);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/color.styl';

.tabs {
  width: 70%;
  max-width: 300px;
  height: 55px;
  background: #ffffff;
  border-radius: 25px;
  position: fixed;
  bottom: 15px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 100;
  display: flex;
  align-items: center;
  transform: translateY(80px);
  opacity: 0;
  transition: all 0.3s ease;

  &-item {
    flex: 1;
    text-align: center;

    img {
      width: 25px;
      height: 25px;
      vertical-align: middle;
      transition: all 0.3s;
      border-radius: 50%;
      object-fit: cover;
    }
  }
}

.show {
  transform: translateY(0);
  opacity: 1;
}
</style>
