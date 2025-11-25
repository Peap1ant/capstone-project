import api from '@/src/(api)/api';
import { useEffect, useState } from 'react';
import type { ChatInfo } from './useChatList';

export function fetchChatTag(tag: string) {
    const [ tagChatList, setChatInfo] = useState<ChatInfo | null>(null);
    const [ error, setError ] = useState<string>('');
    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect (() => {
        if (!tag) return;

        const fetchTag = async() => {
            try {
                const res = await api.get(`/chat/rooms/search?tag=${tag}`);
                setChatInfo(res.data);

                console.log(res);
                console.log('태그 정보 불러오기 완료');
            } catch (err) {
                console.log(err)
                setError('채팅 정보를 불러오지 못했습니다. useChatData.tsx');
            } finally {
                setLoading(false);
            }
        }

        fetchTag();

    }, [tag])

    return { tagChatList, error, loading };

}