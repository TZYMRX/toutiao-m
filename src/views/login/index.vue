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
            validate-first
            ref="login-form"
            @submit="onLogin"
            @failed="onFailed"
    >
      <van-field
              v-model="user.mobile"
              label="手机"
              name="mobile"
              left-icon="phone-o"
              center
              placeholder="请输入手机号"
              :rules="formRules.mobile"
      />
      <van-field
              v-model="user.code"
              clearable
              label="验证码"
              center
              name="code"
              left-icon="smile-comment-o"
              placeholder="验证码"
              :rules="formRules.code"
      >
        <template #button>
          <van-count-down
                  :time="1000*60" format="ss s"
                  v-if="isCountDownShow"
                  @finish="isCountDownShow=false"/>
          <van-button
                  size="small" class="send-btn"
                  :loading="isSendSmsLoading" round
                  @click.prevent="onSendSms" v-else>
            发送验证码
          </van-button>
        </template>
      </van-field>

      <div class="login-btn-wrap">
        <van-button
                class="login-btn"
                type="info" block>
          登录
        </van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
  import {login, sendSma} from '../../api/user'

  export default {
    name: 'login',
    data() {
      return {
        isCountDownShow: false,
        isSendSmsLoading: false,

        user: {
          mobile: '',
          code: ''
        },
        formRules: {
          mobile: [
            {required: true, message: '请输入手机号'},
            {pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确手机号'}
          ],
          code: [
            {required: true, message: '请输入验证码'},
            {pattern: /^\d{6}$/, message: '请输入正确验证码'}
          ],
        }
      }
    },
    methods: {
      onFailed(err) {
        if (err.errors[0]) {
          this.$toast({
            message: err.errors[0].message,
            position: 'top'
          })
        }
      },

      async onSendSms() {
        try {
          await this.$refs['login-form'].validate('mobile')

          // loading
          this.isSendSmsLoading = true

          const res = await sendSma(this.user.mobile)
          console.log(res)

          // 倒计时
          this.isCountDownShow = true
        } catch (err) {
          let message = ''
          if (err.response && err.response.status === 429) {
            message = '请稍后重试'
          } else if (err.name === 'mobile') {
            message = err.message
          } else {
            message = '发送失败'
          }

          this.$toast({
            message,
            position: 'top'
          })
        }
        this.isSendSmsLoading = false
      },

      async onLogin() {
        this.$toast.loading({
          message: '登录中...',
          forbidClick: true,
          duration: 0
        })
        try {
          const {data} = await login(this.user)

          this.$toast('登录成功')
          this.$router.back()

          this.$store.commit('setUser', data.data)
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
