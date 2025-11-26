import api from '@/src/(api)/api';
import { useEffect, useState } from 'react';
import type { ChatInfo } from './useChatList';

export function useChatData(id: string) {
    const [ chatInfo, setChatInfo] = useState<ChatInfo | null>(null);
    const [ error, setError ] = useState<string>('');
    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect (() => {
        if (!id) return;

        const fetchDetail = async() => {
            try {
                const { data } = await api.get(`/chat/room/${id}`);
                setChatInfo(data);

                console.log(data);
                console.log('채팅 정보 불러오기 완료');
            } catch (err) {
                console.log(err)
                setError('채팅 정보를 불러오지 못했습니다. useChatData.tsx');
            } finally {
                setLoading(false);
            }
        }

        fetchDetail();

    }, [id])

    return { chatInfo, error, loading };

}