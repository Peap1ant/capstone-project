import api from '@/src/(api)/api';
import { useEffect, useState } from 'react';

export interface ChatInfo {
    roomId: string;
    name: string;
    hostUser: string;
    tags: string[];
    maxUserCnt: number;
}

export function useChatList() {
    const [ chatList, setChatList] = useState<ChatInfo[]>([]);
    const [ error, setError ] = useState<string>('');
    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect (() => {

        const chatInfo = async() => {
            try {
                const { data } = await api.get('/chat/rooms');
                setChatList(data);

                console.log(data);
                console.log('채팅 정보 불러오기 완료');
            } catch (err) {
                console.log(err)
                setError('채팅 정보를 불러오지 못했습니다.');
            } finally {
                setLoading(false);
            }
        }

        chatInfo();

    }, [])

    return { chatList, error, loading };

}