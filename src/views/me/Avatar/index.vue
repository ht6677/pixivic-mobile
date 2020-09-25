<template>
  <div class="avatar">
    <Header title="更新头像" />
    <div class="wrap">
      <vueCropper
        ref="cropper"
        :img="option.img"
        :output-size="option.size"
        :auto-crop="option.autoCrop"
        :fixed="option.fixed"
      />
    </div>

    <div class="save">
      <v-btn color="primary">
        <label for="uploads">
          选择图片
        </label>
      </v-btn>
      <input
        id="uploads"
        type="file"
        accept="image/png, image/jpeg, image/gif, image/jpg"
        @change="uploadImg($event,1)"
      >
      <v-btn color="primary" @click="dialog = true">保存头像</v-btn>
    </div>

    <p class="intro">
      先选择图片，然后保存头像。可移动图片，双指可放大缩小图片。
    </p>

    <v-dialog v-model="dialog" width="100%">
      <v-card>
        <v-card-title class="headline">确认使用该头像吗?</v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            取消
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            :loading="loading"
            @click="saveAvatar"
          >
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { VueCropper } from 'vue-cropper';
import Header from '@/components/header/Header';
import Alert from '@/components/alert';

export default {
  name: 'Avatar',
  components: {
    VueCropper,
    Header
  },
  data() {
    return {
      option: {
        img: `https://pic.cheerfun.dev/53.png`,
        size: 0.1,
        autoCrop: true,
        fixed: true
      },
      dialog: false,
      loading: false
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    uploadImg(e, num) {
      const file = e.target.files[0];
      if (!/\.(jpg|jpeg|png|webp|GIF|JPG|PNG)$/.test(e.target.value)) {
        Alert({
          content: '请选择正确的图片格式'
        });
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        Alert({
          content: '图片大小不能超过5m'
        });
        return false;
      }
      const reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === 'object') {
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          this.option.img = data;
        }
      };
      reader.readAsArrayBuffer(file);
    },
    saveAvatar() {
      this.loading = true;
      this.$refs.cropper.getCropBlob(async data => {
        const type = data.type.split('/')[1];
        const files = new File([data], `${this.user.id}.${type}`, { type: data.type });
        const formData = new FormData();
        formData.append('file', files);
        const result = await this.$api.search.uploadImg(formData, { userId: this.user.id });
        if (result.status === 200) {
          this.dialog = false;
          this.$router.back();
        } else {
          Alert({
            content: '更新失败，请重试'
          });
        }
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.avatar
  width 100vw
  height 100vh
  .wrap
    width 100%
    height 50vh
  .save
    margin-top 15px
    display flex
    justify-content space-around
    #uploads
      position absolute
      clip rect(0, 0, 0, 0)
  .intro
    padding 10px
    text-align center
    margin-top 20px
</style>
