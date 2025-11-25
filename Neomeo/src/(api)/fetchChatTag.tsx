import api from '@/src/(api)/api';
import { useEffect, useState } from 'react';
import type { ChatInfo } from './useChatList';

export function useFetchChatTag(tag: string) {

    const [tagChatList, setTagChatList] = useState<ChatInfo[]>([]); 
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        console.log("검색할 태그:", tag);
        
        if (!tag) {
            setTagChatList([]);
            setLoading(false);
            return;
        }

        const fetchTag = async () => {
            setLoading(true);
            try {
                const res = await api.get('/chat/rooms/search', {
                    params: { tag: tag } 
                });
                
                setTagChatList(res.data);
                console.log('태그 검색 결과:', res.data);
            } catch (err) {
                console.error(err);
                setError('채팅 정보를 불러오지 못했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchTag();

    }, [tag]);

    return { tagChatList, error, loading };
}