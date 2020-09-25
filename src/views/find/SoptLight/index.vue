<template>
  <List
    :list="list"
    :height="270"
    @infinite="infinite"
  >
    <template v-slot:cell="props">
      <v-list-item class="item" @click="goSpot(props.data.id)">
        <v-card width="100%">
          <v-img
            :src="props.data.thumbnail | replaceBig"
            class="white--text align-end grey lighten-2"
            height="200px"
          >
            <v-card-title style="font-size: 16px; background: rgba(0,0,0,0.1)" v-text="props.data.title" />
          </v-img>
          <v-card-actions>
            <div
              style="width: 100%;"
              class="pa-1 d-flex align-center justify-space-between"
            >
              <v-chip color="primary">{{ props.data.subcategoryLabel }}</v-chip>
              <span>{{ props.data.publishDate }}</span>
            </div>
          </v-card-actions>
        </v-card>
      </v-list-item>
    </template>
  </List>
</template>

<script>
import List from '@/components/list/List';

export default {
  name: 'SpotLight',
  components: {
    List
  },
  data() {
    return {
      page: 1,
      list: []
    };
  },
  methods: {
    infinite($state) {
      this.$api.spot
        .getSpotLights({
          page: this.page++
        })
        .then(res => {
          const { data: { data }} = res;
          if (!data) {
            $state.complete();
          } else {
            this.list = this.list.concat(data);
            $state.loaded();
          }
        });
    },
    goSpot(id) {
      this.$router.push(`/spot/${id}`);
    }
  }
};
</script>

<style scoped lang="stylus">
.item
  width 100%
  height 100%
  padding 10px
</style>
