<script setup lang="ts">
import { useUserStore } from '@/stores';
import { onMounted, ref } from 'vue';

const user = useUserStore();

onMounted(() => {

});
</script>

<template>
    <div class="container-wrapper">
        <main class="container">
            <h1 class="title">管理账号</h1>
            <mdui-card class="list-card">
                <div class="list-card-header">
                    <div class="avatar-wrapper">
                        <div class="avatar-box">
                            <img :src="user.info.profile.avatar" alt="用户头像">
                        </div>
                        <div class="avatar-info">
                            <div>
                                <p>个性化你的头像，将会在用户展示中增加你的辨识度，头像以链接的形式保存在服务器中并以外链的形式获取，请不要滥用此服务。</p>
                                <mdui-chip>更改头像</mdui-chip>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list-card-item">
                    <p>{{ user.info.profile.name }}</p>
                </div>
                <div class="list-card-item">
                    <p>{{ user.info.profile.bio }}</p>
                </div>
            </mdui-card>
            <mdui-card class="list-card">
                <div class="list-card-header">
                    <span style="font-weight: bold;">资料信息</span>
                </div>
                <div class="list-card-item">
                    <p>{{user.info.account}}</p>
                </div>
                <div class="list-card-item">
                    <p>{{user.info.createdAt}}</p>
                </div>
                <div class="list-card-item">
                    <p>{{user.info.email}}</p>
                </div>
                <div class="list-card-item">
                    <p>{{user.info.role}}</p>
                </div>
                <div class="list-card-item">
                    <p>#{{user.info.id}}</p>
                </div>
                <div class="list-card-footer">
                    <p>了解本站的 <a href="/about" target="_blank">隐私声明</a></p>
                </div>
            </mdui-card>
            <mdui-card class="list-card">
                <div class="list-card-header">
                    <span style="font-weight: bold;">账户安全</span>
                </div>
                <div class="list-card-item">
                    <p>修改密码</p>
                </div>
                <div class="list-card-item">
                    <p>申请注销账号</p>
                </div>
                <div class="list-card-footer">
                    <p>233</p>
                </div>
            </mdui-card>
        </main>
    </div>
</template>

<style scoped lang="scss">
.avatar-wrapper {
    display: flex;
    flex-direction: row;

    .avatar-box {
        width: 12rem;
        height: 12rem;
        border-radius: 50%;
        background-color: #f0f0f083;
        margin: 0.8rem;
    }

    .avatar-info {
        flex: 1;
        max-width: 30rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0.8rem;
    }
}

@media screen and (max-width: 840px) {
    .avatar-wrapper {
        .avatar-box {
            width: 8rem;
            height: 8rem;
            margin: 0.5rem;
        }
    }
}

.list-card {
    width: 100%;
    background-color: rgb(var(--mdui-color-surface));
    display: flex;
    flex-direction: column;
    align-items: stretch;
    box-shadow: var(--mdui-elevation-level3);

    &:has(+ .list-card) {
        margin-bottom: 1.5rem;
    }

    .list-card-header {
        padding: 1rem;
    }

    .list-card-item {
        padding: 1rem 1.2rem;
        border-top: 0.1rem solid rgb(var(--mdui-color-surface-container));
        cursor: pointer;

        &:not(:has(+ .list-card-item)) {
            border-bottom: 0.1rem solid rgb(var(--mdui-color-surface-container));
        }

        &:hover {
            background-color: rgba(var(--mdui-color-primary), var(--mdui-state-layer-hover));
        }

        &:focus {
            background-color: rgba(var(--mdui-color-primary), var(--mdui-state-layer-focus));
        }

        &:active {
            background-color: rgba(var(--mdui-color-primary), var(--mdui-state-layer-pressed));
        }
    }

    .list-card-footer {
        padding: 1rem 1.2rem;
        width: 100%;
        background-color: rgb(var(--mdui-color-surface-container));
    }
}
</style>
