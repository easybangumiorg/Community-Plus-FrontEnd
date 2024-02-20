import { get, post, del } from "./request"
import { useUserStore } from "@/stores"

export const getCategoryList = () => {
    const { token } = useUserStore();
    return get("/category/getAll", token)
}

export const getCategory = (cid: number) => {
    const { token } = useUserStore();
    return get(`/category/${cid}`, token)
}

export const addCategory = (name: string) => {
    const { token } = useUserStore();
    return get(`/category/new?name=${encodeURIComponent(name)}`, token)
}

export const deleteCategory = (cid: number) => {
    const { token } = useUserStore();
    return del(`/category/${cid}`, token)
}

export const updateCategory = (cid: number, name: string) => {
    const { token } = useUserStore();
    return post(`/category/${cid}?name=${encodeURIComponent(name)}`, {}, token)
}