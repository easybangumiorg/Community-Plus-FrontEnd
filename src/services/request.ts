import { ROOT_API_URL } from "@/shared";

export function get(url: string, token: string) {
    return fetch(ROOT_API_URL + url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export function post(url: string, { body }: RequestInit, token: string) {
    return fetch(ROOT_API_URL + url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
}

export function del(url: string, token: string) {
    return fetch(ROOT_API_URL + url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}