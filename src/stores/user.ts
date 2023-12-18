import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * 默认允许所有用户访问分类、番剧、合集以及概览标签项
 * 同时允许用户浏览分类、浏览番剧，浏览合集
 * 在以上标志有所更改的前提下提供额外的访问权限
 * 但是最终权限控制由服务端完成
 */
const userCtrl = {
    "USER": {
        canEditSelfProfile: true, // 允许用户编辑自己的个人资料
        canUseUserCenter: false, // 允许用户访问用户中心
        adminEditCategory: false, // 允许用户使用修改分类功能
        canEditPost: true,      // 允许用户编辑自己的番剧 
        adminEditPost: false, // 允许用户访问所有番剧并编辑
        canEditCollection: false, // 允许用户编辑合集
        adminEditCollection: false, // 允许用户访问所有合集并编辑
    },
    "EDITOR": {
        canEditSelfProfile: true,
        canUseUserCenter: false,
        adminEditCategory: false,
        canEditPost: true,
        adminEditPost: true,
        canEditCollection: true,
        adminEditCollection: true,
    },
    "ADMIN": {
        canEditSelfProfile: true,
        canUseUserCenter: true,
        adminEditCategory: true,
        canEditPost: true,
        adminEditPost: true,
        canEditCollection: true,
        adminEditCollection: true,
    },
}

export const useUserStore = defineStore('user', () => {
    const user = ref({
        // 登录状态
        token: "",

        // 用户信息
        id: NaN,
        account: "un_login_user",
        email: "未设定",
        createdAt: new Date(),
        role: "UNLOGIN",
        profile: {
            name: "未登录",
            bio: "no bio.",
            avatar: "",
        },

        // 用户可访问性
        canEditSelfProfile: false,
        canUseUserCenter: false,
        adminEditCategory: false,
        canEditPost: false,
        adminEditPost: false,
        canEditCollection: false,
        adminEditCollection: false,
    })

    async function login(account: string, passwd: string) {
        // return fetch()
    }

    return { user }
})