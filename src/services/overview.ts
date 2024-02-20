import { get } from './request'
import { useUserStore } from '@/stores/user'

export function getOverview() {
    const { token } = useUserStore()
    return get('/overview', token)
}

export function getUserOverview() {
    const { token } = useUserStore()
    return get('/overview/user', token)
}