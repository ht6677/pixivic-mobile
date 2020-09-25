<template>
  <div>
    <List
      :list="pictureList"
      :identifier="identifier"
      @infinite="infinite"
    >
      <v-tabs centered grow>
        <v-tab @click="getList('illust')">
          插画
        </v-tab>
        <v-tab @click="getList('manga')">
          漫画
        </v-tab>
      </v-tabs>
    </List>
  </div>
</template>

<script>
import List from '@/components/virtual-list/VirtualList';
import { mapGetters } from 'vuex';

export default {
  name: 'Collect',
  components: {
    List
  },
  data() {
    return {
      pictureList: [],
      page: 1,
      type: 'illust',
      identifier: +new Date()
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    infinite($state) {
      this.$api.user
        .getCollectList({
          page: this.page++,
          type: this.type,
          userId: this.user.id
        })
        .then(res => {
          if (!res.data.data) {
            $state.complete();
          } else {
            this.pictureList = this.pictureList.concat(res.data.data);
            $state.loaded();
          }
        });
    },
    getList(type) {
      this.type = type;
      this.page = 1;
      this.pictureList = [];
      this.identifier += 1;
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>
