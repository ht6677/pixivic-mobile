<template>
  <Artist title="关注画师列表" :list="artistList" @infinite="infinite" />
</template>

<script>
import { mapGetters } from 'vuex';
import Artist from '@/components/artist/Artist';

export default {
  name: 'ArtistCollect',
  components: {
    Artist
  },
  data() {
    return {
      artistList: [],
      page: 1,
      userId: null
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    const { userId } = this.$route.query;
    this.userId = userId || this.user.id;
  },
  methods: {
    infinite($state) {
      this.$api.user
        .getArtists({
          page: this.page++,
          userId: this.userId
        })
        .then(res => {
          const { data: { data }} = res;
          if (!data) {
            $state.complete();
          } else {
            this.artistList = this.artistList.concat(data);
          }
          $state.loaded();
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>
