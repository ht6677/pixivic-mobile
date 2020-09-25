<template>
  <div class="register">
    <v-btn
      color="primary"
      absolute
      top
      right
      @click="goLogin"
    >
      登录
    </v-btn>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="username"
              :error-messages="nameErrors"
              label="用户名"
              required
              @blur="$v.username.$touch()"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="邮箱"
              required
              @blur="$v.email.$touch()"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              name="input-10-1"
              label="密码"
              :error-messages="passwordErrors"
              @click:append="show = !show"
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="confirmPassword"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              name="input-10-1"
              label="确认密码"
              :error-messages="confirmPasswordErrors"
              @click:append="show2 = !show2"
              @input="$v.confirmPassword.$touch()"
              @blur="$v.confirmPassword.$touch()"
            />
          </v-col>
          <v-col cols="12" class="code">
            <v-text-field
              v-model="value"
              label="验证码"
              maxlength="4"
              :error-messages="valueErrors"
              @input="$v.value.$touch()"
              @blur="$v.value.$touch()"
            />
            <img :src="`data:image/bmp;base64,${imageBase64}`" @click.stop="getCode">
          </v-col>
          <v-col cols="12">
            <v-btn
              color="primary"
              width="100%"
              @click="register"
            >
              立即注册
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength, minLength, email, sameAs } from 'vuelidate/lib/validators';
import { debounceAsyncValidator } from '@/util';
import Alert from '@/components/alert';

export default {
  name: 'Register',
  mixins: [validationMixin],
  validations: {
    email: {
      required,
      email,
      isUnique: debounceAsyncValidator(function(value, debounce) {
        if (!value) return true;
        if (!this.$v.email.required || !this.$v.email.email) return true;
        return debounce()
          .then(() => this.$api.user.checkEmail(value))
          .then(res => {
            return Boolean(res.status === 200);
          });
      }, 500)
    },
    username: {
      required,
      maxLength: maxLength(10),
      minLength: minLength(4),
      isValid(value) {
        const patrn = /[`~!@#$%^&*()\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im;
        return !patrn.test(value);
      },
      isUnique: debounceAsyncValidator(function(value, debounce) {
        if (!value) return true;
        if (!this.$v.username.required || !this.$v.username.minLength || !this.$v.username.maxLength || !this.$v.username.isValid) return true;
        return debounce()
          .then(() => this.$api.user.checkUser(value))
          .then(res => {
            return Boolean(res.status === 200);
          });
      }, 500)
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(20)
    },
    confirmPassword: {
      sameAsPassword: sameAs('password')
    },
    value: {
      required,
      minLength: minLength(4)
    }

  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      show: false,
      show2: false,
      imageBase64: '',
      vid: '',
      value: '',
      loading: false
    };
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push('请输入邮箱');
      !this.$v.email.email && errors.push('请输入合法的邮箱');
      !this.$v.email.isUnique && errors.push('邮箱已被注册');
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push('请输入用户名');
      !this.$v.username.isValid && errors.push('用户名不能包含特殊字符');
      (!this.$v.username.minLength || !this.$v.username.maxLength) && errors.push('用户名4-10位');
      !this.$v.username.isUnique && errors.push('用户名已被注册');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push('请输入密码');
      (!this.$v.password.minLength || !this.$v.password.maxLength) && errors.push('密码8-20位');
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.sameAsPassword && errors.push('密码不一致');
      return errors;
    },
    valueErrors() {
      const errors = [];
      if (!this.$v.value.$dirty) return errors;
      !this.$v.value.required && errors.push('请输入验证码');
      !this.$v.value.minLength && errors.push('请输入4位验证码');
      return errors;
    }
  },
  mounted() {
    this.getCode();
  },
  methods: {
    goLogin() {
      this.$router.push({
        name: 'Login',
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
    register() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
        const data = {
          userInfo: {
            username: this.username.trim(),
            email: this.email,
            password: this.password
          },
          vid: this.vid,
          value: this.value
        };
        this.$api.user.register(data)
          .then(res => {
            if (res.status === 200) {
              localStorage.setItem('user', JSON.stringify(res.data.data));
              this.$store.dispatch('setUser', res.data.data);
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
    }
  }
};
</script>

<style lang="stylus" scoped>
.register
  position relative
  width 100vw
  min-height 100vh
  overflow hidden
  padding 50px
  background-color #eee
  //background url('~@/assets/images/bg.jpg') no-repeat
  background-size cover
  z-index 101
  box-sizing border-box
  .code
    position relative
    img
      position absolute
      top 20px
      right 10px
      width 60px
      height 30px
</style>
