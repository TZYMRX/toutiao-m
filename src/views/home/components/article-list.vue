<template>
  <div class="article-list">
    <van-pull-refresh
            v-model="isRefreshLoading"
            success-text="刷新成功"
            :success-duration="800"
            @refresh="onRefresh"
    >
      <van-list
              v-model="loading"
              :finished="finished"
              finished-text="我是有底线的"
              @load="onLoad"
      >
        <article-item
                v-for="item in articles"
                :key="item.art_id"
                :article="item"
        />
      </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
  import articleItem from '../../../components/article-item'
  import {getArticles} from "../../../api/article";

  export default {
    name: "article-list",
    components: {
      articleItem
    },
    props: {
      channel: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        articles: [],
        loading: false, // 加载中的状态
        finished: false, // 加载结束的状态
        timestamp: null, // 获取下一页数据的时间戳

        isRefreshLoading: false,
      }
    },
    methods: {
      async onLoad() {
        const {data} = await getArticles({
          channel_id: this.channel.id, // 频道id
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        const {results} = data.data
        this.articles.push(...results)

        this.loading = false

        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      },
      async onRefresh() {
        const {data} = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        this.articles.unshift(...data.data.results)
        this.isRefreshLoading = false
      },
    }
  }
</script>

<style lang="less" scoped>
  .article-list {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    top: 90px;
    overflow-y: auto;
  }
</style>
