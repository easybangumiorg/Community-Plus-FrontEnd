<script setup lang="ts">
import '@mdui/icons/light-mode.js';
import '@mdui/icons/dark-mode.js';
import '@mdui/icons/brightness-auto.js';
import '@mdui/icons/login.js';
import '@mdui/icons/logout.js';
import '@mdui/icons/info.js';
import {
    getTheme,
    setTheme,
    prompt,
} from 'mdui';
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores';
import { useRoute, useRouter } from 'vue-router';

const user = useUserStore();
const router = useRouter();

const commandLogin = () => {
    router.push({ path: '/login', });
}

// 以下是暗黑模式的本地实现，如果需要在任意组件可访问，需要创建一个store
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
        <mdui-dropdown>
            <mdui-button-icon slot="trigger" class="avatar">
                <img v-if="user.isLogin" :src="user.profile.avatar" />
                <mdui-icon-login v-else></mdui-icon-login>
            </mdui-button-icon>
            <mdui-card v-if="user.isLogin" class="user-card">
                <h4>{{ user.info.email }}</h4>
                <img :src="user.profile.avatar">
                <div class="user-info">
                    <h2>{{ user.profile.name }}</h2>
                    <span>{{ user.profile.bio }}</span>
                </div>
                <div class="buttons-field">
                    <mdui-button class="left">
                        管理账号
                        <mdui-icon-info slot="icon"></mdui-icon-info>
                    </mdui-button>
                    <mdui-button class="right">
                        退出登录
                        <mdui-icon-logout slot="end-icon" name="attach_file"></mdui-icon-logout>
                    </mdui-button>
                </div>
            </mdui-card>
            <mdui-card v-else class="user-card">
                <div class="user-info">
                    <h2>{{ user.profile.name }}</h2>
                </div>
                <mdui-button full-width @click="commandLogin">登录</mdui-button>
            </mdui-card>
        </mdui-dropdown>
    </mdui-top-app-bar>
</template>

<style scoped lang="scss">
.user-card {
    width: 20rem;
    padding: 1rem;
    text-align: center;
    border-radius: var(--mdui-shape-corner-extra-large);

    h4 {
        margin: 0.1rem 0 1rem;
    }

    img {
        height: 6rem;
        border-radius: 3rem;
    }

    img:hover {
        cursor: pointer;
    }

    .user-info {
        margin: 0.2rem 0 1rem;

        h2 {
            margin: 0;
        }
    }

    .buttons-field {
        margin-bottom: 0.7rem;

        .left {
            border-radius: var(--mdui-shape-corner-extra-large) var(--mdui-shape-corner-extra-small) var(--mdui-shape-corner-extra-small) var(--mdui-shape-corner-extra-large);
            margin-right: .1rem;
        }

        .right {
            border-radius: var(--mdui-shape-corner-extra-small) var(--mdui-shape-corner-extra-large) var(--mdui-shape-corner-extra-large) var(--mdui-shape-corner-extra-small);
        }
    }
}

.avatar {
    margin-right: 1rem;
    align-items: center;
    justify-items: center;

    img {
        height: 2rem;
        width: 2rem;
        border-radius: 1rem;
    }
}

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
    z-index: 1000;
}

.primary-button {
    margin-left: 0.6rem;
    height: 3rem;
    width: 3rem;
}
</style>