import { ROOT_API_URL } from "@/shared";
import { requestProc } from "@/shared/requestProc";

export async function get(url: string, token: string) {
    const res = await fetch(ROOT_API_URL + url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await requestProc(await res.json());
}

export async function post(url: string, body: any, token: string) {
    const res = await fetch(ROOT_API_URL + url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    return await requestProc(await res.json());
}

export async function del(url: string, token: string) {
    const res = await fetch(ROOT_API_URL + url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await requestProc(await res.json());
}