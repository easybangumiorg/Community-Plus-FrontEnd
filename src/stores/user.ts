import { defineStore } from 'pinia'
import { ROOT_API_URL, UnauthorizedException, userCtrl } from '@/shared'
import { requestProc } from '@/shared/requestProc'
import { get, post } from '@/services/request'


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
            const res = await fetch(ROOT_API_URL + '/user/signin', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ account, passwd })
            })
            const res_1 = requestProc(await res.json())
            state.token = res_1.data.token
            state.$patch({ user: res_1.data })
            state.$patch({ visible: userCtrl[res_1.data.role] })
            return res_1
        },
        async getProfile() { // 获取profile的函数同时控制登录状态
            try {
                const res = await get('/user/profile', this.token)
                this.$patch({ user: { profile: res.data } })
                return res
            } catch (err) {
                if (err instanceof UnauthorizedException) {
                    this.logout()
                }
                throw err
            }
        },
        async editProfile({ name, bio, avatar }: any) {
            try {
                const res = await post('/user/profile', { name, bio, avatar }, this.token)
                const { _name, _bio, _avatar } = res.data
                this.$patch({ user: { profile: { name: _name, bio: _bio, avatar: _avatar } } })
                return res
            } catch (err) {
                if (err instanceof UnauthorizedException) {
                    this.logout()
                }
                throw err
            }
        },
        async refreshToken() {
            try {
                const res = await get('/user/refresh', this.token)
                this.$patch({ token: res.data })
                return res
            } catch (err) {
                if (err instanceof UnauthorizedException) {
                    this.logout()
                }
                throw err
            }
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