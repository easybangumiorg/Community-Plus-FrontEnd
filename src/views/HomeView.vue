<script setup lang="ts">

</script>

<template>
  <div class="container-wrapper">
    <main class="container">
      <h1>概览</h1>
      <div class="cards">
        <mdui-card class="card">
          <h2>番剧</h2>
          <div class="card-content">
            <div class="msg-box">
              <h3>总数</h3>
              <p>233</p>
            </div>
            <div class="msg-box">
              <h3>已公开</h3>
              <p>233</p>
            </div>
            <div class="msg-box">
              <h3>草稿</h3>
              <p>0</p>
            </div>
          </div>
        </mdui-card>

        <mdui-card class="card">
          <h2>合集</h2>
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

      <div class="cards">
        <mdui-card class="card">
          <h2>用户</h2>
          <div class="card-content">
            <div class="msg-box">
              <h3>总数</h3>
              <p>233</p>
            </div>
          </div>
        </mdui-card>

        <mdui-card class="card">
          <h2>分类</h2>
          <div class="card-content">
            <div class="msg-box">
              <h3>测试分类</h3>
              <p>233</p>
            </div>
            <div class="msg-box">
              <h3>番剧</h3>
              <p>0</p>
            </div>
            <div class="msg-box">
              <h3>电影</h3>
              <p>0</p>
            </div>
          </div>
        </mdui-card>

        <mdui-card class="card">
          <h2>番剧</h2>
          <div class="card-content">
            <div class="msg-box">
              <h3>总数</h3>
              <p>233</p>
            </div>
            <div class="msg-box">
              <h3>已公开</h3>
              <p>200</p>
            </div>
            <div class="msg-box">
              <h3>草稿</h3>
              <p>33</p>
            </div>
            <div class="msg-box">
              <h3>最近更新</h3>
              <p>209</p>
            </div>
          </div>
        </mdui-card>

        <mdui-card class="card">
          <h2>合集</h2>
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
            <div class="msg-box">
              <h3>最近更新</h3>
              <p>3</p>
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
    width: 100%;
  }
}

.card {
  min-width: 30rem;
  margin: 0 0 2rem;
  padding: 1rem;

  h2 {
    margin: 0 0 0.8rem;
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
      }

      p {
        font-weight: bold;
        font-size: large;
      }
    }
  }

}
</style>