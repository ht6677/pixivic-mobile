<template>
  <div>
    <List
      :list="pictureList"
      :identifier="identifier"
      @infinite="infinite"
    >
      <v-tabs centered grow>
        <v-tab @click="getList('recent')">
          近期
        </v-tab>
        <v-tab @click="getList('old')">
          更早
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
      type: 'recent',
      identifier: +new Date()
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    infinite($state) {
      if (this.type === 'recent') {
        this.$api.user
          .getRecentHistory({
            page: this.page++,
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
      } else if (this.type === 'old') {
        this.$api.user
          .getOldHistory({
            page: this.page++,
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
      }
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
