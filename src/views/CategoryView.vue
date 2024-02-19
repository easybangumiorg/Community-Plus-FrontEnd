<script setup lang="ts">
import { getCategoryList, addCategory } from '@/services/category';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import '@mdui/icons/add.js';
import { useUserStore } from '@/stores';
import { alert, prompt, snackbar } from 'mdui'

const router = useRouter();
const user = useUserStore();

const state = reactive({
  categoryList: [],
});

onMounted(() => {
  action_refesh();
});

const action_refesh = () => {
  getCategoryList().then((res) => {
    state.categoryList = res.data;
  });
};

const action_addCategory = () => {
  prompt({
    headline: "新增分类",
    description: "请输入分类名称，由于系统允许重复的分类名称，如无必要请不要这么做。",
    confirmText: "新增",
    cancelText: "取消",
    textFieldOptions: {
      label: "分类名称",
      required: true,
    },
    onConfirm: (value) => {
      addCategory(value).then(() => {
        snackbar({
          message: "新增成功",
          placement: 'top',
        });
        action_refesh();
      }).catch((err) => {
        if (err.code) {
          snackbar({
            message: `新增分类失败: ${err.msg}`,
            placement: 'top',
          });
        }
      })
    },
  });
};
</script>

<template>
  <div class="container-wrapper">
    <main class="container">
      <h1 class="title">分类</h1>
      <mdui-card class="list-card">
        <div class="list-card-header">
          <span style="font-weight: bold;">详情</span>
          <mdui-tooltip content="新增分类" v-if="user.visible.adminEditCategory">
            <mdui-button-icon @click="action_addCategory">
              <mdui-icon-add></mdui-icon-add>
            </mdui-button-icon>
          </mdui-tooltip>
        </div>
        <mdui-list>
          <mdui-list-item v-for="({ id, name }, index) in state.categoryList"
            @click="router.push({ name: 'category-info', params: { cid: id } })">
            {{ name }}
          </mdui-list-item>
        </mdui-list>
        <div class="list-card-footer">
          <p>分类系统用于区分提交种类，如果需要具体的分类请使用Tag或<router-link to="/collection">合集</router-link>。</p>
        </div>
      </mdui-card>
    </main>
  </div>
</template>

<style scoped lang="scss"></style>
