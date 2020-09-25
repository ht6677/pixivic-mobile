<template>
  <div class="spot">
    <List :list="pictureList" @infinite="infinite" />
  </div>
</template>

<script>
import List from '@/components/virtual-list/VirtualList';

export default {
  name: 'Spot',
  components: {
    List
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      pictureList: []
    };
  },
  methods: {
    infinite($state) {
      this.$api.spot
        .getSpotLightsIllust(this.id)
        .then(res => {
          this.pictureList = this.pictureList.concat(res.data.data) || [];
          $state.loaded();
          $state.complete();
        });
    }
  }
};
</script>

<style>
</style>
