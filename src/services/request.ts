import { ROOT_API_URL } from "@/shared";
import { requestProc } from "@/shared/requestProc";

export function get(url: string, token: string) {
    return fetch(ROOT_API_URL + url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async res =>requestProc(await res.json()))
}

export function post(url: string, { body }: RequestInit, token: string) {
    return fetch(ROOT_API_URL + url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(async res =>requestProc(await res.json()))
}

export function del(url: string, token: string) {
    return fetch(ROOT_API_URL + url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async res =>requestProc(await res.json()))
}