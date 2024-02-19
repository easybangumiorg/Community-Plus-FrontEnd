import { get, post, del } from "./request"
import { useUserStore } from "@/stores"

export const getCategoryList = () => {
    const user = useUserStore();
    return get("/category/getAll", user.token)
}

export const getCategory = (cid: number) => {
    const user = useUserStore();
    return get(`/category/${cid}`, user.token)
}

export const addCategory = (name: string) => {
    const user = useUserStore();
    return get(`/category/new?name=${encodeURIComponent(name)}`, user.token)
}

export const deleteCategory = (cid: number) => {
    const user = useUserStore();
    return del(`/category/${cid}`, user.token)
}

export const updateCategory = (cid: number, name: string) => {
    const user = useUserStore();
    return post(`/category/${cid}?name=${encodeURIComponent(name)}`, {}, user.token)
}