import api from '@/src/(api)/api';
import { useEffect, useState } from 'react';

export interface UserInfo {
    username: string,
    email: string,
    nickname: string
}

export function useUserData() {
    const [ userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [ error, setError ] = useState<string>('');
    const [ loading, setLoding ] = useState<boolean>(true);

    useEffect (() => {

        const userInfo = async() => {
            try {
                const res = await api.get('/user')
                setUserInfo(res.data)

                console.log(res.data)
                console.log('유저 정보 불러오기 완료')
            } catch (err) {
                console.log(err)
                setError('유저 정보를 불러오지 못했습니다');
            } finally {
                setLoding(false);
            }
        }

        userInfo();

    }, [])

    return { userInfo, error, loading };

}