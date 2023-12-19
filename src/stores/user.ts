import { defineStore } from 'pinia'
import { ROOT_API_URL, userCtrl } from '@/shared'
import { requestProc } from '@/shared/requestProc'
import { getProfile } from '@/services/user'


export const useUserStore = defineStore('user', {
    state: () => ({
        token: "",
        user: {
            // 用户信息
            id: NaN,
            account: "un_login_user",
            email: "未设定email",
            createdAt: new Date(),
            role: "UNLOGIN",
            profile: {
                name: "未登录",
                bio: "no bio.",
                avatar: "/logo.ico",
            },
        },
        visible: {
            // 用户可访问性
            canEditSelfProfile: false,
            canUseUserCenter: false,
            adminEditCategory: false,
            canEditPost: false,
            adminEditPost: false,
            canEditCollection: false,
            adminEditCollection: false,
        }
    }),
    getters: {
        isLogin: state => state.token !== "",
        info: state => state.user,
        profile: state => state.user.profile,
        vis: state => state.visible,
    },
    actions: {
        async login(account: string, passwd: string) {
            const state = this
            return fetch(ROOT_API_URL + '/user/signin', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ account, passwd })
            })
                .then(async res => requestProc(await res.json()))
                .then(res => {
                    state.token = res.data.token
                    state.$patch({ user: res.data })
                    state.$patch({ visible: userCtrl[res.data.role] })

                    return res
                })
        },
        async getProfile() { // 获取profile的函数同时控制登录状态
            return getProfile(this.token).then(res => {
                this.$patch({ user: { profile: res.data } })
                return res
            }).catch(err => {
                this.token = ""
                throw err
            })
        },
        logout() {
            this.$patch({ token: "" })
            this.$patch({
                user: {
                    // 用户信息
                    id: NaN,
                    account: "un_login_user",
                    email: "未设定email",
                    createdAt: new Date(),
                    role: "UNLOGIN",
                    profile: {
                        name: "未登录",
                        bio: "no bio.",
                        avatar: "/logo.ico",
                    },
                }
            })
            this.$patch({ visible: userCtrl["UNLOGIN"] })
        },
    },
})