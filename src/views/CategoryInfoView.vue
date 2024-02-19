<script setup lang="ts">
import { getCategory, deleteCategory, updateCategory } from '@/services/category';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import '@mdui/icons/delete-forever.js';
import '@mdui/icons/edit.js';
import { useUserStore } from '@/stores';
import { dialog, prompt, snackbar } from 'mdui'

const router = useRouter();
const route = useRoute();
const user = useUserStore();

const category_info = reactive({
    cid: Number(route.params.cid),
    cname: '加载中...',
});

onMounted(() => {
    getCategory(category_info.cid).then((res) => {
        category_info.cname = res.data.name;
    }).catch((err) => {
        if (err.code) {
            snackbar({
                message: `加载分类失败: ${err.msg}`,
                placement: 'top',
            });
        }
    })
});

const action_editName = () => {
    prompt({
        headline: "修改分类名称",
        description: "请输入新的分类名称，尽量简短，由于系统允许重复的分类名称，如无必要请不要这么做。",
        confirmText: "修改",
        cancelText: "取消",
        textFieldOptions: {
            label: "分类名称",
            required: true,
            value: category_info.cname,
        },
        onConfirm: (value) => {
            updateCategory(category_info.cid, value).then(() => {
                snackbar({
                    message: "修改成功",
                    placement: 'top',
                });
                category_info.cname = value;
            }).catch((err) => {
                if (err.code) {
                    snackbar({
                        message: `修改分类失败: ${err.msg}`,
                        placement: 'top',
                    });
                }
            })
        },
    });
};

const action_deleteCategory = () => {
    dialog({
        headline: "删除分类",
        description: "确定要删除这个分类吗？",
        actions: [
            {
                text: "取消",
            },
            {
                text: "删除",
                onClick: () => {
                    deleteCategory(category_info.cid).then(() => {
                        snackbar({
                            message: "删除成功",
                            placement: 'top',
                        });
                        router.push({ name: 'category' });
                    }).catch((err) => {
                        if (err.code) {
                            snackbar({
                                message: `删除分类失败: ${err.msg}`,
                                placement: 'top',
                            });
                        }
                    });
                },
            },
        ],
    });
};
</script>

<template>
    <div class="container-wrapper">
        <main class="container">
            <h1 class="title">{{ category_info.cname }} <span>#{{ category_info.cid }}</span></h1>
            <div class="category-actions" v-if="user.visible.adminEditCategory">
                <mdui-button variant="tonal" @click="action_editName">
                    修改名称
                    <mdui-icon-edit slot="icon"></mdui-icon-edit>
                </mdui-button>
                <mdui-button @click="action_deleteCategory">
                    删除
                    <mdui-icon-delete-forever slot="icon"></mdui-icon-delete-forever>
                </mdui-button>
            </div>
        </main>
    </div>
</template>

<style scoped lang="scss">
.category-actions {
    display: flex;
    margin-bottom: 16px;
    & > * {
        margin-right: 8px;
    }
}
</style>
