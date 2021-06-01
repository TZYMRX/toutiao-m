<template>
  <div class="login">
    <van-nav-bar
      class="app-nav-bar"
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 登录表单 -->
    <van-form
      :show-error="false"
      :show-error-message="false"
      @submit="onLogin"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        label="手机"
        left-icon="phone-o"
        placeholder="请输入手机号"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        label="验证码"
        left-icon="smile-comment-o"
        placeholder="验证码"
        :rules="formRules.code"
      >
        <template #button>
          <van-button size="small" class="send-btn" round>
            发送验证码
          </van-button>
        </template>
      </van-field>

      <div class="login-btn-wrap">
        <van-button
          class="login-btn"
          type="info" block
        >
          登录
        </van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
  import { login } from '../../api/user'

  export default {
    name: 'login',
    data () {
      return {
        user: {
          mobile: '',
          code: ''
        },
        formRules: {
          mobile: [
            {
              required: true,
              message: '请输入手机号'
            },
            {
              pattern: /^1[3|5|7|8|9]\d{9}$/,
              message: '请输入正确手机号'
            }
          ],
          code: [
            {
              required: true,
              message: '请输入验证码'
            },
            {
              pattern: /^\d{6}$/,
              message: '请输入正确验证码'
            }
          ],
        }
      }
    },
    methods: {
      onFailed (err) {
        console.log(err)
      },

      async onLogin () {
        this.$toast.loading({
          message: '登录中...',
          forbidClick: true,
          duration: 0
        })
        try {
          const res = await login(this.user)
          console.log(res)
          this.$toast.success('登录成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('登录失败,手机号或验证码错误')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .login {
    .send-btn {
      width: 80px;
      height: 25px;
      background-color: #ededed;

      .van-button__text {
        font-size: 11px;
        color: #666666;
      }
    }

    .login-btn-wrap {
      padding: 26px 16px;

      .login-btn {
        background-color: #3296fa;
        border: none;

        .van-button__text {
          font-size: 14px;
        }
      }
    }
  }
</style>
