<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { getCategoryList } from '@/services/category';
import { showErr } from '@/shared/requestProc';
import { useUserStore } from '@/stores';

const user = useUserStore();

const state = reactive({
  category: [],
  posts: [],
  userID: user.user.id,
  publicState: false,
  isPublic: false,
  isReadyPublic: false,
  isNSFW: false,
});

onMounted(() => {
  getCategoryList().then((res) => {
    state.category = res.data;
  }).catch(showErr('获取分类列表失败'))
});
</script>

<template>
  <div class="container-wrapper">
    <main class="container">
      <h1 class="title">番剧</h1>
      <div class="post-actions">
        <mdui-fab extended icon="edit">
          <mdui-icon-add slot="icon"></mdui-icon-add>
          新建番剧
        </mdui-fab>
        <mdui-button variant="tonal">
          <mdui-icon-search slot="icon"></mdui-icon-search>
          查找
        </mdui-button>
      </div>
      <mdui-card class="list-card">
        <div>
          番剧页面限定
          <div>
            <mdui-select label="分类 Category" value="all">
              <mdui-menu-item value="all">所有</mdui-menu-item>
              <mdui-menu-item v-for="({ id, name }, index) in state.category" :value="id">{{ name }}</mdui-menu-item>
            </mdui-select>
          </div>
          <div>
            <mdui-text-field label="用户ID" v-model="state.userID"></mdui-text-field>
          </div>
          <div>
            <mdui-select label="公开项" value="all">
              <mdui-menu-item value="all">所有</mdui-menu-item>
              <mdui-menu-item value="storage">正在编辑</mdui-menu-item>
              <mdui-menu-item value="onReadyPub">待发布</mdui-menu-item>
              <mdui-menu-item value="Published">已发布</mdui-menu-item>
            </mdui-select>
          </div>
          <div>
            <span>NSFW {{ state.isNSFW }}</span>
            <mdui-switch :value="state.isNSFW" @input="state.isNSFW = $event.target.value"></mdui-switch>
          </div>
        </div>
        番剧展示卡片，最好做成一个组件
      </mdui-card>
    </main>
  </div>
</template>

<style scoped lang="scss">
.post-actions {
  display: flex;
  margin-bottom: 20px;
  align-items: flex-end;

  &>* {
    margin-right: 10px;
  }
}
</style>
