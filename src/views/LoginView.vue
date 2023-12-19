<script setup lang="ts">
import { useUserStore } from '@/stores';
import '@mdui/icons/arrow-forward.js';
import { snackbar } from 'mdui';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { sha256 } from 'js-sha256';
import { onMounted } from 'vue'

const route = useRoute();
const router = useRouter();
const user = useUserStore();

const loginForm = ref({
    account: '',
    passwd: '',
});

onMounted(() => {
    if (user.isLogin)
        user.getProfile()
            .catch((err) => {
                if (err.code) {
                    snackbar({
                        message: `获取用户信息失败: ${err.msg}`,
                    });
                }
            });

});

const commandLogin = async () => {
    if (loginForm.value.account === '' || loginForm.value.passwd === '') {
        snackbar({
            message: "请输入账号和密码",
        });
        return;
    }
    loginForm.value.passwd = sha256(loginForm.value.passwd);
    user.login(loginForm.value.account, loginForm.value.passwd).then((res) => {
        if (res) {
            router.push({ path: '/', });
        }
    }).catch((err) => {
        if (err.code) {
            snackbar({
                message: `登录失败: ${err.msg}`,
            });
        }
    });

}
</script>

<template>
    <div class="container-wrapper">
        <main class="container" style="text-align: center;">
            <mdui-card class="login-card">
                <div class="card-header">
                    <h2>需要登录</h2>
                    <span>社区+ Console</span>
                </div>
                <div class="text-field">
                    <span v-if="user.isLogin">已登录: {{ user.profile.name }}</span>
                    <mdui-text-field :value="loginForm.account" @input="loginForm.account = $event.target.value"
                        label="Account or Email"></mdui-text-field>
                    <mdui-text-field :value="loginForm.passwd" @input="loginForm.passwd = $event.target.value"
                        type="password" toggle-password label="Password"></mdui-text-field>
                </div>
                <div class="card-bottom">
                    <mdui-button @click="commandLogin">
                        登录
                        <mdui-icon-arrow-forward slot="end-icon"></mdui-icon-arrow-forward>
                    </mdui-button>
                </div>
            </mdui-card>
        </main>
    </div>
</template>

<style scoped lang="scss">
.login-card {
    width: 100%;
    max-width: 30rem;
    padding: 1rem 1.5rem;
    text-align: justify;

    .card-header {
        margin-bottom: 1rem;
        text-align: center;

        h2 {
            margin: 0.5rem 0 0rem;
            font-weight: bold;
        }
    }

    .text-field {
        margin-bottom: 1rem;
        text-align: left;

        mdui-text-field {
            margin-bottom: 0.5rem;

        }
    }

    .card-bottom {
        margin-top: 1rem;
        text-align: right;
    }

}
</style>