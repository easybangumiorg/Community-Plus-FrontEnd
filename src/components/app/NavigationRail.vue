<script setup lang="ts">
import '@mdui/icons/add.js';
import '@mdui/icons/category.js';
import '@mdui/icons/video-library.js';
import '@mdui/icons/settings.js';
import '@mdui/icons/bar-chart.js';
import '@mdui/icons/movie.js';
import '@mdui/icons/people.js';

import { useUserStore } from '@/stores';
import { useRoute, useRouter } from 'vue-router'

const user = useUserStore();
const route = useRoute();
const router = useRouter();
</script>

<template>
    <mdui-navigation-rail :value="route.name" contained class="navigation-rail">
        <mdui-fab lowered slot="top">
            <mdui-icon-add slot="icon"></mdui-icon-add>
        </mdui-fab>
        <mdui-button-icon @click="router.push({name:'settings'})" slot="bottom">
            <mdui-icon-settings></mdui-icon-settings>
        </mdui-button-icon>

        <mdui-navigation-rail-item @click="router.push({name:'overview'})" value="overview">
            <mdui-icon-bar-chart slot="icon"></mdui-icon-bar-chart>
            概览
        </mdui-navigation-rail-item>
        <mdui-navigation-rail-item @click="router.push({name:'category'})" value="category">
            <mdui-icon-category slot="icon"></mdui-icon-category>
            分类
        </mdui-navigation-rail-item>
        <mdui-navigation-rail-item @click="router.push({name:'post'})" value="post">
            <mdui-icon-movie slot="icon"></mdui-icon-movie>
            番剧
        </mdui-navigation-rail-item>
        <mdui-navigation-rail-item @click="router.push({name:'collection'})" value="collection">
            <mdui-icon-video-library slot="icon"></mdui-icon-video-library>
            合集
        </mdui-navigation-rail-item>
        <mdui-navigation-rail-item @click="router.push({name:'user'})" value="user" v-if="user.vis.canUseUserCenter">
            <mdui-icon-people slot="icon"></mdui-icon-people>
            用户
        </mdui-navigation-rail-item>
    </mdui-navigation-rail>
</template>

<style scoped lang="scss">
.navigation-rail {
    background-color: rgb(var(--mdui-color-surface-container));
    z-index: 1000;
}
</style>