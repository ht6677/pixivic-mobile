<template>
  <div class="setting">
    <Header title="设置" />
    <v-list class="setting-lists">
      <v-list-item @click="clickItem('email')">
        <v-list-item-content>
          <v-list-item-title>
            邮箱验证
            <span style="float: right;">{{ isCheckEmail ? '已验证' : '未验证' }}</span>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#picyoujiantou" />
          </svg>
        </v-list-item-icon>
      </v-list-item>
      <v-list-item @click="clickItem('qq')">
        <v-list-item-content>
          <v-list-item-title>
            绑定QQ
            <span style="float: right;">{{ isConnectQQ ? '已绑定' : '未绑定' }}</span>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#picyoujiantou" />
          </svg>
        </v-list-item-icon>
      </v-list-item>
      <v-list-item @click="sheet = true">
        <v-list-item-content>
          <v-list-item-title>
            瀑布流列数
            <span style="float: right;">{{ column }}</span>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#picyoujiantou" />
          </svg>
        </v-list-item-icon>
      </v-list-item>
      <v-list-item @click="$router.push(`/avatar`)">
        <v-list-item-content>
          <v-list-item-title>
            更新头像
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#picyoujiantou" />
          </svg>
        </v-list-item-icon>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            16
          </v-list-item-title>
        </v-list-item-content>
        <v-switch v-model="lockShow" @change="changeLock" />
      </v-list-item>
    </v-list>

    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center">
        <v-list>
          <v-list-item
            v-for="item in columns"
            :key="item"
            @click="selectColumn(item)"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ item }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '@/components/header/Header';
import { QQ_LINK } from '@/util/constants';
import Alert from '@/components/alert';

export default {
  name: 'Setting',
  components: {
    Header
  },
  data() {
    return {
      sheet: false,
      columns: ['自动', 1, 2, 3, 4],
      isCheckEmail: false,
      isConnectQQ: false,
      column: 1,
      lockShow: false
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    this.$api.user.getEmailIsCheck(this.user.id)
      .then(res => {
        this.isCheckEmail = res.data.data;
      });
    this.$api.user.checkQQ(this.user.id)
      .then(res => {
        this.isConnectQQ = res.data.data;
      });

    const column = parseInt(localStorage.getItem('waterfull-column'));
    this.column = column || '自动';
    this.lockShow = JSON.parse(localStorage.getItem('lock_show') || null);
  },
  methods: {
    clickItem(val) {
      switch (val) {
        case 'email':
          if (!this.isCheckEmail) {
            this.$api.user.vertifyEmail(this.user.email)
              .then(res => {
                Alert({
                  content: res.data.message
                });
              });
          }
          break;
        case 'qq':
          if (!this.isConnectQQ) {
            window.location.href = QQ_LINK;
          }
          break;
      }
    },
    selectColumn(val) {
      this.column = val;
      if (val === '自动') {
        localStorage.removeItem('waterfull-column');
      } else {
        localStorage.setItem('waterfull-column', val);
      }
      this.sheet = false;
    },
    changeLock() {
      if (this.lockShow) {
        localStorage.setItem('lock_show', true);
      } else {
        localStorage.removeItem('lock_show');
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.setting
  &-lists
    margin-top 10px
</style>
