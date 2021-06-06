<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
              class="search-btn"
              slot="title"
              icon="search"
              type="info"
              round size="small"
      >搜索
      </van-button>
    </van-nav-bar>

    <!-- 文章频道标签导航 -->
    <van-tabs class="channel-tabs" v-model="active" swipeable>
      <van-tab
              class="tab-item"
              :title="item.name"
              v-for="item in channels"
              :key="item.id">
        <article-list :channel="item"/>
      </van-tab>
      <div
              slot="nav-right"
              @click="isChannelEditShow=!isChannelEditShow"
              class="wap-nav-wrap">
        <van-icon name="wap-nav"/>
      </div>
    </van-tabs>

    <!-- 弹出层 -->
    <van-popup
            v-model="isChannelEditShow"
            position="top" closeable
            get-container="body"
            class="channel-edit-popup">
      内容
    </van-popup>
  </div>
</template>

<script>
  import {getUserChannels} from "../../api/user";
  import ArticleList from './components/article-list'

  export default {
    name: 'Home',
    components: {
      ArticleList
    },
    data() {
      return {
        active: 0,
        channels: [], // 频道列表
        isChannelEditShow: false
      }
    },
    created() {
      this.loadChannels()
    },
    methods: {
      async loadChannels() {
        const {data} = await getUserChannels()
        this.channels = data.data.channels
      }
    }
  }
</script>

<style lang="less" scoped>
  .home {
    /deep/ .van-nav-bar__title {
      max-width: unset;
    }

    .search-btn {
      width: 277px;
      height: 32px;
      background: #5babfb;
      border: none;

      .van-icon {
        font-size: 16px;
      }

      .van-button__text {
        font-size: 14px;
      }
    }

    /deep/ .van-tabs__line {
      background-color: #5babfb;
    }

    .wap-nav-wrap {
      position: fixed;
      right: 0;
    }
  }

  .channel-edit-popup {
    height: 100%;
  }
</style>
