<template>
  <div class="links">
    <v-card>
      <v-tabs
        v-model="tab"
        background-color="#b9eee5"
        centered
        dark
      >
        <v-tabs-slider />
        <v-tab href="#tab-1">
          用前の须知
        </v-tab>
        <v-tab href="#tab-2">
          捐助の墙
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="(item, index) in tabs"
          :key="index"
          :value="'tab-' + (index + 1)"
        >
          <div class="container">
            <component :is="item" />
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import Intro from './components/Intro/';
import Donate from './components/Intro/';

export default {
  name: 'Links',
  components: {
    Intro,
    Donate
  },
  data() {
    return {
      tab: null,
      show: 'Intro',
      tabs: ['Intro', 'Donate']
    };
  }
};
</script>

<style lang="stylus" scoped>
.container
   box-sizing border-box
   padding-bottom 100px
   margin: auto;
   font-family: "SF Pro SC", "SF Pro Display", "SF Pro Icons", "AOS Icons", "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
</style>
