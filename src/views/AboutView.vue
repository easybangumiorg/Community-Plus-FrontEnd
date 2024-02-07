<script setup lang="ts">
import { marked } from 'marked'
import { onMounted, ref } from 'vue';

const content = ref('')

onMounted(async () => {
  const res = await (await fetch('/about.md')).text()
  content.value = await marked.parse(res)
})
</script>

<template>
  <div class="container-wrapper">
    <main class="container" v-html="content"/>
  </div>
</template>

<style scoped lang="scss"></style>
