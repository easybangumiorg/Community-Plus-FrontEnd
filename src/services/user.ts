import { useUserStore } from '@/stores';
import { get, post } from './request'

export const chpasswd = async (oldPasswd: string, newPasswd: string) => {
    const user = useUserStore();
    return post('/user/chpasswd', { oldPasswd, newPasswd }, user.token);
}