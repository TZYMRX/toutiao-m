<template>
  <div class="my">
    <van-cell-group class="my-info" v-if="user">
      <van-cell class="base-info" :border="false" center>
        <van-image
                class="avatar"
                slot="icon"
                round fit="cover"
                :src="currentUser.photo"
        />
        <div class="name" slot="title">{{currentUser.name}}</div>
        <van-button class="update-btn" size="small" round>编辑资料</van-button>
      </van-cell>

      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{currentUser.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{currentUser.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{currentUser.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{currentUser.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div class="not-login" v-else>
      <div @click="$router.push('/login')">
        <img class="mobile" src="./mobile.png" alt="">
      </div>
      <div class="text">登录 / 注册</div>
    </div>

    <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item class="nav-grid-item" icon="star-o" color="" text="收藏"/>
      <van-grid-item class="nav-grid-item" icon="clock-o" color text="历史"/>
    </van-grid>

    <van-cell title="消息通知" is-link to=""/>
    <van-cell class="mb-4" title="智障" is-link to=""/>
    <van-cell class="logout-cell" title="退出登录" @click="logout" v-if="user"/>
  </div>
</template>

<script>
  import {getUserInfo} from "../../api/user";
  import {mapState} from 'vuex'

  export default {
    name: 'My',
    data() {
      return {
        currentUser: {} // 当前登录用户信息
      }
    },
    created() {
      this.loadUser()
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
      async loadUser() {
        const {data} = await getUserInfo()
        this.currentUser = data.data
      },

      logout() {
        this.$dialog.confirm({
          title: '退出',
          message: '确认退出码',
        }).then(() => {
          this.$store.commit('setUser', null)
        }).catch(() => {
          // on cancel
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  .my {
    .my-info {
      background: url("./banner.png") no-repeat;
      background-size: cover;

      .base-info {
        box-sizing: border-box;
        height: 115px;
        background-color: unset;
        padding-top: 38px;
        padding-bottom: 11px;

        .avatar {
          box-sizing: border-box;
          width: 66px;
          height: 66px;
          border: 1px solid #fff;
          margin-right: 11px;
        }

        .name {
          color: #fff;
          font-size: 15px;
        }

        .update-btn {
          height: 20px;
          font-size: 10px;
          color: #666;
        }
      }

      .data-info {
        .data-info-item {
          height: 65px;
          color: #fff;

          .text-wrap {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .count {
              font-size: 18px;
            }

            .text {
              font-size: 11px;
            }
          }


        }
      }

      /deep/ .van-grid-item__content {
        background-color: unset;
      }
    }

    .not-login {
      height: 180px;
      background: url("./banner.png") no-repeat;
      background-size: cover;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .mobile {
        width: 66px;
        height: 66px;
      }

      .text {
        font-size: 14px;
        color: #fff;
      }
    }

    /deep/ .nav-grid {
      .nav-grid-item {
        height: 70px;

        .van-icon {
          font-size: 22px;
        }

        .van-icon-star-o {
          color: #eb5253;
        }

        .van-icon-clock-o {
          color: #ff9d1d;
        }

        .van-grid-item__text {
          font-size: 14px;
          color: #333333;
        }
      }
    }

    .logout-cell {
      text-align: center;
      color: #d86262;
    }

    .mb-4 {
      margin-bottom: 4px;
    }
  }
</style>
