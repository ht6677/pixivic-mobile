<template>
  <transition>
    <div class="search">
      <search-box v-model="value" @enter="enter" />

      <v-tabs
        v-model="tab"
        background-color="transparent"
        color="basil"
        grow
      >
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item">
          <div class="search-suggest">
            <div
              v-for="(keyword, index) in keywords"
              :key="index"
              class="suggest-item"
            >
              <div class="tag" @click="enter(keyword)">
                {{ keyword }}
              </div>
            </div>
          </div>
        </v-tab-item>
      </v-tabs-items>

      <div v-show="value" class="search-btn">
        <v-btn class="mr-2" @click="translateKeyword">
          翻译并搜索
        </v-btn>
        <v-btn class="mr-2" @click="searchOne('artist')">
          id搜画师
        </v-btn>
        <v-btn @click="searchOne('illust')">
          id搜画作
        </v-btn>
      </div>

      <HotTag :data="hotTags" @clickTag="enter" />

      <router-view />
    </div>
  </transition>
</template>

<script>
import debounce from 'lodash/debounce';
import Alert from '@/components/alert';
import SearchBox from './components/search-box';
import HotTag from './components/hot-tag';

export default {
  name: 'Search',
  components: {
    SearchBox,
    HotTag
  },
  data() {
    return {
      value: '',
      keywords: '',
      tab: null,
      items: [
        '插画漫画', '画师'
      ],
      hotTags: []
    };
  },
  watch: {
    value() {
      this.getKeyword();
    }
  },
  mounted() {
    this.getHotTag();
  },
  methods: {
    getKeyword: debounce(function() {
      this.$api.search.getKeyword(this.value)
        .then(({ data: { data }}) => {
          this.keywords = data.keywordList || [];
        });
    }, 500),
    enter(val) {
      if (!val) return;
      if (this.tab === 0) {
        this.$router.push({
          name: 'SearchIllusts',
          query: {
            tag: val
          }
        });
      } else if (this.tab === 1) {
        this.$router.push({
          name: 'Artists',
          query: {
            artistName: val
          }
        });
      }
    },
    translateKeyword() {
      this.$api.search
        .getTranslations(this.value)
        .then(res => {
          this.enter(res.data.data.keyword);
        });
    },
    searchOne(type) {
      const param = {
        type,
        id: this.value
      };
      this.$api.search
        .getExists(param)
        .then(res => {
          if (res.data.data) {
            if (type === 'artist') {
              this.$router.push(`/artist/${this.value}`);
            } else if (type === 'illust') {
              this.$store.dispatch('setDetail', null);
              this.$router.push(`/illusts/${this.value}`);
            }
          } else {
            Alert({
              content: '不存在'
            });
          }
        });
    },
    getHotTag() {
      this.$api.search
        .getHotTag()
        .then(res => {
          this.hotTags = res.data.data;
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/color.styl'
.search
  z-index 100
  font-size 16px
  background #fff
  // overflow scroll
  width 100%
  height 100vh
  .search-btn
    margin 5px 15px
    // width 50%
    display flex
    justify-content center
    align-items center
    height 40px
  .search-img
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    img
      width 100%
      height 100%
      object-fit cover
  .search-suggest
    width 100%
    max-height 300px
    overflow scroll
    .suggest-item
      width 100%
      padding 9px 12px 9px 16px
      display flex
      align-items center
      justify-content space-between
      box-sizing border-box
      .tag
        width 100%
        color #adadad
        font-size 16px
      i
        font-size 24px
        position relative
        &:after
          content ''
          position absolute
          top -10px
          right -10px
          bottom -10px
          left -10px
    .suggest-no
      text-align center
      color $primary
      font-size 20px
</style>
