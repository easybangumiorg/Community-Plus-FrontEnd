import { get } from './request'

export function getProfile(token: string) {
    return get('/user/profile', token)
}