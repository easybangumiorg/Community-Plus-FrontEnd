<script setup lang="ts">
import { useUserStore } from '@/stores';
import { onMounted, ref } from 'vue';
import { alert, prompt, snackbar } from 'mdui'
import { useRouter } from 'vue-router';

const user = useUserStore();
const router = useRouter();

onMounted(()=> {
    if (!user.visible.canEditSelfProfile) {
        router.push({ name: 'home' });
    }
})

function isValidUrl(value: string) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?' + // port
        '(\\/[-a-z\\d%_.~+]*)*' + // path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(value);
}

const action_delog = async () => {
    alert({
        headline: "暂不支持",
        description: "如需帮助，请联系网站运营",
        confirmText: "OK",
    });
}
const action_email = () => {
    alert({
        headline: "邮箱",
        description: "邮箱在注册账号时指定，目前并没有围绕邮箱的应用，但是我们会在未来的版本中增加邮箱验证功能，目前暂时不支持修改。",
        confirmText: "OK",
    });
}
const action_avatar = () => {
    prompt({
        headline: "更改头像",
        description: "请输入你的头像链接，头像以链接的形式保存在服务器中并以外链的形式获取。",
        confirmText: "保存",
        cancelText: "取消",
        textFieldOptions: {
            label: "头像链接",
            placeholder: user.info.profile.avatar,
            required: true,
        },
        onConfirm: (value) => {
            user.editProfile({
                ...user.info.profile,
                avatar: value,
            }).then(() => {
                snackbar({
                    message: "头像已更新",
                    placement: 'top',
                });
            }).catch((err) => {
                if (err.code) {
                    snackbar({
                        message: `更新头像失败: ${err.msg}`,
                        placement: 'top',
                    });
                }
            });
        },
        validator(value) {
            if (!isValidUrl(value)) {
                return "请输入正确的链接";
            }
            return true;
        },
    });
}
const action_name = () => {
    prompt({
        headline: "更改昵称",
        description: "请输入你的新昵称，你的昵称有可能会在纯纯看番社区+的插件中展示。",
        confirmText: "保存",
        cancelText: "取消",
        textFieldOptions: {
            label: "昵称",
            placeholder: user.info.profile.name,
            required: true,
        },
        onConfirm: (value) => {
            user.editProfile({
                ...user.info.profile,
                name: value,
            }).then(() => {
                snackbar({
                    message: "昵称已更新",
                    placement: 'top',
                });
            }).catch((err) => {
                if (err.code) {
                    snackbar({
                        message: `更新昵称失败: ${err.msg}`,
                        placement: 'top',
                    });
                }
            });
        },
    });
}
const action_bio = () => {
    prompt({
        headline: "更改签名",
        description: "请输入你的新签名，签名会在用户详情页面展示。",
        confirmText: "保存",
        cancelText: "取消",
        textFieldOptions: {
            label: "签名",
            placeholder: user.info.profile.bio,
            required: true,
        },
        onConfirm: (value) => {
            user.editProfile({
                ...user.info.profile,
                bio: value,
            }).then(() => {
                snackbar({
                    message: "签名已更新",
                    placement: 'top',
                });
            }).catch((err) => {
                if (err.code) {
                    snackbar({
                        message: `更新签名失败: ${err.msg}`,
                        placement: 'top',
                    });
                }
            });
        },
    });
}
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
                                <mdui-chip @click="action_avatar">更改头像</mdui-chip>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list-card-item">
                    <div class="item-info">
                        <span>昵称</span>
                        <span class="info-content">{{ user.info.profile.name }}</span>
                    </div>
                    <a @click="action_name">编辑昵称</a>
                </div>
                <div class="list-card-item">
                    <div class="item-info">
                        <span>签名</span>
                        <span class="info-content">{{ user.info.profile.bio }}</span>
                    </div>
                    <a @click="action_bio">编辑签名</a>
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
                    <!-- <mdui-icon-keyboard-arrow-right></mdui-icon-keyboard-arrow-right> -->
                </div>
                <div class="list-card-item clickable">
                    <div class="item-info">
                        <span>账户创建时间</span>
                        <span class="info-content">{{ user.info.createdAt }}</span>
                    </div>
                    <!-- <mdui-icon-keyboard-arrow-right></mdui-icon-keyboard-arrow-right> -->
                </div>
                <div class="list-card-item clickable" @click="action_email">
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
                    <!-- <mdui-icon-keyboard-arrow-right></mdui-icon-keyboard-arrow-right> -->
                </div>
                <div class="list-card-item clickable">
                    <div class="item-info">
                        <span>ID</span>
                        <span class="info-content">#{{ user.info.id }}</span>
                    </div>
                    <!-- <mdui-icon-keyboard-arrow-right></mdui-icon-keyboard-arrow-right> -->
                </div>
                <div class="list-card-footer">
                    <p>了解本站的 <a href="/about" target="_blank">隐私声明</a></p>
                </div>
            </mdui-card>
            <mdui-card class="list-card">
                <div class="list-card-header">
                    <span style="font-weight: bold;">账户安全</span>
                </div>
                <div class="list-card-item clickable" @click="router.push({ name: 'chpasswd' });">
                    <span>修改密码</span>
                    <mdui-icon-keyboard-arrow-right></mdui-icon-keyboard-arrow-right>
                </div>
                <div class="list-card-footer">
                    <a @click="action_delog" style="cursor: pointer;">注销账号</a> <a
                        href="mailto:feedback@easybangumi.com">联系运营</a>
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

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
        }
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
}
</style>
