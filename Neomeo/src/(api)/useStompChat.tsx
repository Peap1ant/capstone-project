import { useEffect, useRef, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { ChatMessage, createStompClient } from './stompClient';

export function useStompChat(roomId: string, username: string) {
    const clientRef = useRef<Client | null>(null);

    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [error_stomp, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        // ❗ 조건은 "훅 밖이 아니라 effect 내부에서만" 체크한다.
        const run = async () => {
            if (!roomId || !username) {
                // ❗ return 하되, 훅의 흐름을 바꾸는 것이 아니라 effect 내부 로직만 건너뛰는 것
                return;
            }

            try {
                const client = await createStompClient();
                if (cancelled) return;

                clientRef.current = client;

                client.onConnect = () => {
                    if (cancelled) return;
                    setConnected(true);
                    setError(null);

                    client.subscribe(`/sub/chat/room/${roomId}`, (msg: IMessage) => {
                        if (cancelled) return;

                        try {
                            const body = JSON.parse(msg.body) as ChatMessage;

                            // Talk + sender=나 → 이미 로컬 반영됨
                            if (body.type === 'TALK' && body.sender === username) return;

                            setMessages((prev) => [...prev, body]);
                        } catch (e) {
                            console.warn('메시지 파싱 실패:', e);
                        }
                    });
                };

                client.onStompError = (frame) => {
                    if (!cancelled)
                        setError(frame.headers['message'] || 'STOMP 오류 발생');
                };

                client.onWebSocketError = () => {
                    if (!cancelled) setError('WebSocket 연결 오류');
                };

                client.activate();
            } catch (e) {
                if (!cancelled) setError('STOMP 클라이언트 생성 실패');
            }
        };

        run();

        // cleanup
        return () => {
            cancelled = true;
            if (clientRef.current) {
                clientRef.current.deactivate();
                clientRef.current = null;
            }
            setConnected(false);
            setMessages([]); // 방 변경 시 초기화
        };
    }, [roomId, username]);

    const sendMessage = (text: string) => {
        if (!clientRef.current || !connected || !username) return;

        const payload: ChatMessage = {
            type: 'TALK',
            roomId,
            sender: username,
            message: text,
            sendTime: new Date().toISOString(),
        };

        clientRef.current.publish({
            destination: '/pub/chat/message',
            body: JSON.stringify(payload),
            headers: { 'content-type': 'application/json' },
        });

        setMessages((prev) => [...prev, payload]);
    };

    return { connected, messages, error_stomp, sendMessage };
}
