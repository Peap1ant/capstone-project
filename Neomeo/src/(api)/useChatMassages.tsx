// src/(api)/useChatMassages.ts
import { useEffect, useState } from 'react';
import api from '@/src/(api)/api';
import type { ChatMessage } from '@/src/(api)/stompClient'; // ✅ 공통 타입 가져오기

export function useChatMessages(roomId: string) {
  const [messages_old, setMessages] = useState<ChatMessage[]>([]);
  const [loading_old, setLoading] = useState(true);
  const [error_old, setError] = useState('');

  useEffect(() => {
    if (!roomId) return;

    const fetchMessages = async () => {
      try {
        const { data } = await api.get(`/chat/room/${roomId}/messages`);

        // ✅ REST 응답 → ChatMessage 형태로 변환
        const normalized: ChatMessage[] = (data as any[]).map((m) => ({
          id: m.id,
          roomId: m.roomid ?? m.roomId,
          sender: m.sender,
          message: m.message,
          type: m.type,
          // 문서에선 sendDate 라고 되어 있으니 여기서 sendTime 으로 바꿔 줌
          sendTime: m.sendTime ?? m.sendDate,
        }));

        setMessages(normalized);
      } catch (e) {
        console.log(e);
        setError('채팅 내역을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [roomId]);

  return { messages_old, loading_old, error_old };
}
