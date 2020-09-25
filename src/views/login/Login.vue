<template>
  <div class="login">
    <v-btn
      color="primary"
      absolute
      top
      right
      @click="goRegister"
    >
      注册
    </v-btn>
    <v-form v-model="valid">
      <v-container>
        <v-row class="row">
          <v-col cols="12">
            <v-text-field
              v-model="username"
              :rules="nameRules"
              label="用户名或邮箱"
              required
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              :rules="passwordRules"
              name="input-10-1"
              label="密码"
              @click:append="show = !show"
            />
          </v-col>
          <v-col cols="12" class="code">
            <v-text-field
              v-model="value"
              label="验证码"
              maxlength="4"
              :rules="codeRules"
            />
            <img :src="`data:image/bmp;base64,${imageBase64}`" @click.stop="getCode">
          </v-col>
          <v-col cols="12">
            <v-btn
              color="primary"
              width="100%"
              @click="login"
            >
              立即登录
            </v-btn>
          </v-col>
        </v-row>
        <div class="forget" @click="dialog = true">忘记密码?</div>
        <div class="qqlogin">
          <svg font-size="30" class="icon" aria-hidden="true" @click="loginByQQ">
            <use xlink:href="#picQQ" />
          </svg>
        </div>
      </v-container>
    </v-form>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
    <v-dialog v-model="dialog" width="100%">
      <v-card>
        <v-card-title>
          <span class="headline">验证你的邮箱</span>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid2">
            <v-text-field
              v-model="email"
              placeholder="输入你的邮箱"
              :rules="emailRules"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="dialog = false">取消</v-btn>
          <v-btn color="blue darken-1" text @click="forget">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { QQ_LINK } from '@/util/constants';
import Alert from '@/components/alert';

export default {
  name: 'Login',
  data() {
    return {
      valid: false,
      username: '',
      password: '',
      show: false,
      imageBase64: '',
      vid: '',
      value: '',
      loading: false,
      dialog: false,
      email: '',
      valid2: false,
      nameRules: [
        v => !!v || '请填写用户名或者邮箱',
        v => v.length >= 4 || '用户名或邮箱4位以上'
      ],
      passwordRules: [
        v => !!v || '请填写密码'
      ],
      codeRules: [
        v => !!v || '请填写验证码'
      ],
      emailRules: [
        v => !!v || '请输入邮箱',
        v => /.+@.+/.test(v) || '请输入合法邮箱'
      ]
    };
  },
  mounted() {
    this.getCode();
  },
  methods: {
    goRegister() {
      this.$router.push({
        name: 'Register',
        query: {
          return_to: this.$route.query.return_to
        }
      });
    },
    getCode() {
      this.$api.user.verificationCode()
        .then(res => {
          const { data: { data }} = res;
          this.imageBase64 = data.imageBase64;
          this.vid = data.vid;
        });
    },
    login() {
      if (this.valid) {
        this.loading = true;
        const data = {
          userInfo: {
            username: this.username,
            password: this.password
          },
          vid: this.vid,
          value: this.value
        };
        this.$api.user.login(data)
          .then(res => {
            if (res.status === 200) {
              localStorage.setItem('user', JSON.stringify(res.data.data));
              this.$store.dispatch('setUser', res.data.data);
              // this.$router.push('/me');
              const url = this.$route.query.return_to;
              window.location.href = url || `https://m.pixivic.com/me`;
            } else {
              Alert({
                content: res.data.message
              });
              this.loading = false;
              this.getCode();
            }
          })
          .catch(err => {
            console.error(err);
            this.loading = false;
            this.getCode();
          });
      }
    },
    forget() {
      if (this.valid2) {
        this.$api.user
          .resetPasswordEmail(this.email)
          .then(res => {
            if (res.status === 200) {
              Alert({
                content: '请注意查收邮箱来重置你的密码'
              });
              this.dialog = false;
            } else {
              Alert({
                content: res.data.message
              });
            }
          });
      }
    },
    loginByQQ() {
      window.location.href = QQ_LINK;
    }
  }
};
</script>

<style lang="stylus" scoped>
.login
  position relative
  width 100vw
  min-height 100vh
  overflow hidden
  padding 50px
  box-sizing border-box
  background-color #eee
  //background url('~@/assets/images/bg.jpg') no-repeat
  background-size cover
  z-index 101
  .row
    .code
      position relative
      img
        position absolute
        top 20px
        right 10px
        width 60px
        height 30px
  .forget
    color #333
    text-align right
  .qqlogin
    margin-top 10px
    text-align center
</style>
