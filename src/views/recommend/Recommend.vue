<template>
  <div class="recommend">
    <List
      :list="pictureList"
      :identifier="identifier"
      :show-no-results="false"
      @infinite="infinite"
    />
    <div :class="['change', { 'rotate': rotate }]" @click="handleChange">
      <img src="@/assets/images/change.svg" alt="">
    </div>
  </div>
</template>

<script>
import List from '@/components/virtual-list/VirtualList';
import { mapGetters } from 'vuex';

export default {
  name: 'Recommend',
  components: {
    List
  },
  data() {
    return {
      pictureList: [],
      identifier: +new Date(),
      type: 'getRecommend',
      rotate: false
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    infinite($state) {
      this.$api.recommend[this.type](this.user.id).then(res => {
        const {
          data: { data }
        } = res;
        this.pictureList = data || [];
        $state.complete();
      });
    },
    handleChange() {
      this.rotate = !this.rotate;
      this.type = this.type === 'getRecommend' ? 'getRecommendView' : 'getRecommend';
      this.pictureList = [];
      this.identifier += 1;
    }
  }
};
</script>

<style lang="stylus" scoped>
.recommend
  .change
    position fixed
    bottom 100px
    right 10px
    width 40px
    height 40px
    transition all 0.3s ease
    img
      width 100%
      height 100%
  .rotate
    transform rotate(360deg)
</style>

