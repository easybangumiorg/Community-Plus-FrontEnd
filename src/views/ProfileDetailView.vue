<script setup lang="ts">
import { getCategoryList, addCategory } from '@/services/category';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores';
import { alert, prompt, snackbar } from 'mdui'

const router = useRouter();
const user = useUserStore();

onMounted(() => {

});

</script>

<template>
  <div class="container-wrapper">
    <main class="container">
      <h1 class="title">用户详细</h1>

    </main>
  </div>
</template>

<style scoped lang="scss"></style>
