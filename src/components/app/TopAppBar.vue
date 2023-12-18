<script setup lang="ts">
import '@mdui/icons/light-mode.js';
import '@mdui/icons/dark-mode.js';
import '@mdui/icons/brightness-auto.js';
import 'mdui/components/dropdown.js';
import 'mdui/components/menu.js';
import 'mdui/components/button-icon.js';
import {
    getTheme,
    setTheme,
} from 'mdui';
import { ref, onMounted } from 'vue';

const themeRef = ref(String(getTheme()));

onMounted(() => {
    if (localStorage.getItem('theme')) {
        themeRef.value = localStorage.getItem('theme') as string;
    }
    setTheme(themeRef.value as any);
});

const toggleTheme = () => {
    switch (themeRef.value) {
        case 'light':
            themeRef.value = 'dark';
            break;
        case 'dark':
            themeRef.value = 'auto';
            break;
        default:
            themeRef.value = 'light';
            break;
    }
    setTheme(themeRef.value as any);
    localStorage.setItem('theme', themeRef.value);
};

</script>

<template>
    <mdui-top-app-bar class="top-app-bar">
        <mdui-button-icon class="primary-button">
            <mdui-icon-menu></mdui-icon-menu>
        </mdui-button-icon>
        <mdui-button-icon>
            <img height="100%" width="100%" src="/logo.ico" alt="Logo">
        </mdui-button-icon>
        <mdui-top-app-bar-title>
            <a href="http://www.easybangumi.org" target="_blank" class="title">纯纯看番</a>
            <a href="http://www.easybangumi.org" target="_self" class="title small">社区+ Console</a>
        </mdui-top-app-bar-title>
        <div style="flex-grow: 1"></div>
        <mdui-button-icon @click="toggleTheme()">
            <mdui-icon-light-mode v-if="themeRef == 'light'"></mdui-icon-light-mode>
            <mdui-icon-dark-mode v-else-if="themeRef == 'dark'"></mdui-icon-dark-mode>
            <mdui-icon-brightness-auto v-else></mdui-icon-brightness-auto>
        </mdui-button-icon>
    </mdui-top-app-bar>
</template>

<style scoped lang="scss">
.title {
    color: inherit;
    text-decoration: none;
}

.small {
    font-size: 80%;
    padding-left: 1rem;
}

.top-app-bar {
    background-color: rgb(var(--mdui-color-surface-container));
    z-index: 3000;
}

.primary-button {
    margin-left: 0.6rem;
    height: 3rem;
    width: 3rem;
}
</style>