import api from '@/src/(api)/api';
import { useEffect, useState } from 'react';
import type { CommunityInfo } from './useCommunityList';

export function useCommunityData(id?: number) {
    const [communityInfo, setCommunityInfo] = useState<CommunityInfo | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchDetail = async () => {
            try {
                const { data } = await api.get(`/api/board/${id}`);
                setCommunityInfo(data);
                console.log('커뮤니티 상세 불러오기 완료', data);
            } catch (err) {
                console.log(id, err);
                setError('커뮤니티 정보를 불러오지 못했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [id]);

    return { communityInfo, error, loading };
}
