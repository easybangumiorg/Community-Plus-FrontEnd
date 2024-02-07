<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { getOverview, getUserOverview } from '@/services/overview'
import { snackbar } from 'mdui/functions/snackbar';
import { useUserStore } from '@/stores';

const user = useUserStore()
const overview = reactive({
  user: { count: 0 },
  post: {
    count: 0,
    onReadyPub: 0,
    published: 0,
    recentlyUpdated: 0,
  },
  category: [],
  collection: {
    count: 0,
    draft: 0,
    published: 0,
    recentlyUpdated: 0,
  },
})

const userOverview = reactive({
  post: { count: 0, published: 0, draft: 0 },
  collection: {
    count: 0,
    published: 0,
    draft: 0,
  },
})

onMounted(() => {
  getOverview().then((res) => {
    overview.user = res.data.user
    overview.post = res.data.post
    overview.category = res.data.category
    overview.collection = res.data.collection
  }).catch((err) => {
    if (err.code) {
      snackbar({
        message: `${err.msg}`,
        placement: 'top',
      });
    }
  });
  getUserOverview().then((res) => {
    userOverview.post = res.data.post
    userOverview.collection = res.data.collection
  }).catch((err) => {
    if (err.code) {
      snackbar({
        message: `${err.msg}`,
        placement: 'top',
      });
    }
  });
})
</script>

<template>
  <div class="container-wrapper">
    <main class="container">
      <h1 class="title">概览</h1>
      <div class="cards">
        <mdui-card class="card">
          <h2>番剧</h2>
          <p>项目列出了所有当前用户（{{ user.info.profile.name }}）上传番剧信息的数量、公开至API的数量以及草稿的数量。</p>
          <div class="card-content">
            <div class="msg-box">
              <h3>总数</h3>
              <p>{{ userOverview.post.count }}</p>
            </div>
            <div class="msg-box">
              <h3>已公开</h3>
              <p>{{ userOverview.post.published }}</p>
            </div>
            <div class="msg-box">
              <h3>草稿</h3>
              <p>{{ userOverview.post.draft }}</p>
            </div>
          </div>
        </mdui-card>

        <mdui-card class="card">
          <h2>合集</h2>
          <p>项目列出了所有当前用户（{{ user.info.profile.name }}）创建的合集数量、公开至API的合集数量以及草稿的数量。</p>
          <div class="card-content">
            <div class="msg-box">
              <h3>总数</h3>
              <p>3</p>
            </div>
            <div class="msg-box">
              <h3>已公开</h3>
              <p>1</p>
            </div>
            <div class="msg-box">
              <h3>草稿</h3>
              <p>2</p>
            </div>
          </div>
        </mdui-card>
      </div>

      <h1>整个社区</h1>

      <p>这里展示纯纯看番社区+服务器存储的一些描述性信息，遗憾的是截至目前，我们并没有高级全局统计API的计划，可以预见的是随着将来的数据的逐渐增多，该简易概览接口将不会返回实时数据。</p>

      <div class="cards">
        <mdui-card class="card">
          <h2>用户</h2>
          <p>该项目列出了整个服务器存储的用户数量，包括插件注册的用户与网页端注册的用户。</p>
          <div class="card-content">
            <div class="msg-box">
              <h3>总数</h3>
              <p>{{ overview.user.count }}</p>
            </div>
          </div>
        </mdui-card>

        <mdui-card class="card">
          <h2>分类</h2>
          <p>该项目列出了服务器托管的所有顶级分类名称和分类下的番剧数量。</p>
          <div class="card-content">
            <div class="msg-box" v-for="(item, i) in overview.category">
              <h3>{{ item['name'] }}</h3>
              <p>{{ item['count'] }}</p>
            </div>
          </div>
        </mdui-card>

        <mdui-card class="card">
          <h2>番剧</h2>
          <p>该项目列出了整个服务器存储的番剧数量信息，其中最近更新指的是最近4天有数据更新的番剧（包括草稿）。</p>
          <div class="card-content">
            <div class="msg-box">
              <h3>总数</h3>
              <p>{{ overview.post.count }}</p>
            </div>
            <div class="msg-box">
              <h3>已公开</h3>
              <p>{{ overview.post.published }}</p>
            </div>
            <div class="msg-box">
              <h3>待发布</h3>
              <p>{{ overview.post.onReadyPub }}</p>
            </div>
            <div class="msg-box">
              <h3>最近更新</h3>
              <p>{{ overview.post.recentlyUpdated }}</p>
            </div>
          </div>
        </mdui-card>

        <mdui-card class="card">
          <h2>合集</h2>
          <p>该项目列出了整个服务器存储的合集数量信息，其中最近更新指的是最近4天有数据更新的合集（包括草稿）。</p>
          <div class="card-content">
            <div class="msg-box">
              <h3>总数</h3>
              <p>{{ overview.collection.count }}</p>
            </div>
            <div class="msg-box">
              <h3>已公开</h3>
              <p>{{ overview.collection.published }}</p>
            </div>
            <div class="msg-box">
              <h3>草稿</h3>
              <p>{{ overview.collection.draft }}</p>
            </div>
            <div class="msg-box">
              <h3>最近更新</h3>
              <p>{{ overview.collection.recentlyUpdated }}</p>
            </div>
          </div>
        </mdui-card>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}

@media (max-width: 1200px) {
  .card {
    width: 100% !important;
  }
}

.card {
  width: 30rem;
  margin: 0 0 2rem;
  padding: 2rem;

  h2 {
    margin: 0 0 0.8rem;
    font-size: 1.5rem;
  }

  .card-content {
    display: flex;
    flex-direction: row;

    .msg-box {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      text-align: center;

      h3 {
        margin: 0 0 0.4rem;
        font-size: 1.2rem;
      }

      p {
        font-size: 1rem;
        font-weight: bold;
      }
    }
  }

}
</style>