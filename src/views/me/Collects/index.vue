<template>
  <div class="collects">
    1111111
    <v-btn color="primary" @click="add">新建</v-btn>
    <div class="collects__list">
      <div v-for="item in collects" :key="item.id">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Collects',
  data() {
    return {
      collects: []
    };
  },
  mounted() {
    this.getCollections();
  },
  methods: {
    add() {
      this.$api.collections.addCollections({
        username: 'pixivic',
        title: 'test',
        caption: '这是测试画集'
      })
        .then(res => {
          console.log(res);
        });
    },
    getCollections() {
      this.$api.collections.getCollections({
        userId: 53,
        page: 1
      }).then(res => {
        this.collects = res.data.data;
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.collects
  width 100vw
  height 100vh
</style>
