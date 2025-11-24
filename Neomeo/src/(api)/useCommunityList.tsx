import api from '@/src/(api)/api';
import { useEffect, useState } from 'react';

export interface CommunityInfo {
    id: number;
    title: string;
    Content: string;
    created_date: string;
    updated_time: string;
    user_id: number;
    writerNickName: string;
}

export function useCommunityList() {
    const [communityList, setCommunityList] = useState<CommunityInfo[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchList = async () => {
            try {
                const { data } = await api.get('/api/boards');
                console.log(data)
                setCommunityList(data);
                console.log('커뮤니티 리스트 불러오기 완료', data);
            } catch (err) {
                console.log(err);
                setError('커뮤니티 정보를 불러오지 못했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchList();
    }, []);

    return { communityList, error, loading };
}
