import api from '@/src/(api)/api';
import { useState } from 'react';

export function deleteCommunityData() {
    const [loading_del, setLoading] = useState(false);
    const [error_del, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const deleteCommunity = async (id: number) => {
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            await api.delete(`/api/boards/${id}`);
            console.log('게시글 삭제 완료:', id);
            setSuccess(true);
        } catch (err) {
            console.error('게시글 삭제 실패:', err);
            setError('게시글을 삭제하는 데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return { deleteCommunity, loading_del, error_del, success };
}
