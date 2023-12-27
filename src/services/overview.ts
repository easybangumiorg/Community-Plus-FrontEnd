import { get } from './request'
import { useUserStore } from '@/stores/user'

export function getUserOverview() {
    const { token } = useUserStore()
    return get('/user/overview', token)
}