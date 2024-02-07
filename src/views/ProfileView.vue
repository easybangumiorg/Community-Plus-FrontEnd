<script setup lang="ts">
import { useUserStore } from '@/stores';
import { onMounted, ref } from 'vue';
import '@mdui/icons/keyboard-arrow-right.js';

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
                    <div class="item-info">
                        <span>昵称</span>
                        <span class="info-content">{{ user.info.profile.name }}</span>
                    </div>
                    <a>编辑昵称</a>
                </div>
                <div class="list-card-item">
                    <div class="item-info">
                        <span>签名</span>
                        <span class="info-content">{{ user.info.profile.bio }}</span>
                    </div>
                    <a>编辑签名</a>
                </div>
            </mdui-card>
            <mdui-card class="list-card">
                <div class="list-card-header">
                    <span style="font-weight: bold;">资料信息</span>
                </div>
                <div class="list-card-item clickable">
                    <div class="item-info">
                        <span>账号</span>
                        <span class="info-content">{{ user.info.account }}</span>
                    </div>
                    <mdui-icon-keyboard-arrow-right></mdui-icon-keyboard-arrow-right>
                </div>
                <div class="list-card-item clickable">
                    <div class="item-info">
                        <span>账户创建时间</span>
                        <span class="info-content">{{ user.info.createdAt }}</span>
                    </div>
                    <mdui-icon-keyboard-arrow-right></mdui-icon-keyboard-arrow-right>
                </div>
                <div class="list-card-item clickable">
                    <div class="item-info">
                        <span>邮箱</span>
                        <span class="info-content">{{ user.info.email }}</span>
                    </div>
                    <mdui-icon-keyboard-arrow-right></mdui-icon-keyboard-arrow-right>
                </div>
                <div class="list-card-item clickable">
                    <div class="item-info">
                        <span>角色</span>
                        <span class="info-content">{{ user.info.role }}</span>
                    </div>
                    <mdui-icon-keyboard-arrow-right></mdui-icon-keyboard-arrow-right>
                </div>
                <div class="list-card-item clickable">
                    <div class="item-info">
                        <span>ID</span>
                        <span class="info-content">#{{ user.info.id }}</span>
                    </div>
                    <mdui-icon-keyboard-arrow-right></mdui-icon-keyboard-arrow-right>
                </div>
                <div class="list-card-footer">
                    <p>了解本站的 <a href="/about" target="_blank">隐私声明</a></p>
                </div>
            </mdui-card>
            <mdui-card class="list-card">
                <div class="list-card-header">
                    <span style="font-weight: bold;">账户安全</span>
                </div>
                <div class="list-card-item clickable">
                    <span>修改密码</span>
                    <mdui-icon-keyboard-arrow-right></mdui-icon-keyboard-arrow-right>
                </div>
                <div class="list-card-footer">
                    <a href="">注销账号</a> <a href="">联系运营</a>
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
        font-size: 14px;
        font-weight: 400;
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
        display: flex;
        justify-content: space-between;
        padding: 1rem 1.2rem;
        border-top: 0.1rem solid rgb(var(--mdui-color-surface-container));
        line-height: 1.4;

        &:not(:has(+ .list-card-item)) {
            border-bottom: 0.1rem solid rgb(var(--mdui-color-surface-container));
        }
    }

    .clickable {
        cursor: pointer;

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

.item-info {
    flex: 1;
    flex-grow: 1;
    display: flex;
    box-sizing: border-box;
    align-items: center;

    span {
        display: inline;
        min-width: 25%;
        font-size: 14px;
        font-weight: 400;
    }

    .info-content {
        display: block;
        font-weight: 600;
    }
}

@media screen and (max-width: 600px) {
    .item-info {
        align-items: flex-start;
        flex-flow: column;
    }

    span {
        line-height: 1.4;
    }
}
</style>
