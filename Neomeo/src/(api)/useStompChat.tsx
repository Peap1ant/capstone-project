import { useEffect, useRef, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { ChatMessage, createStompClient } from './stompClient';

/**
 * roomId 에 해당하는 채팅방의 STOMP 연결 + 메시지 관리 훅
 */
export function useStompChat(roomId: string, username: string) {
    const clientRef = useRef<Client | null>(null);

    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [error_stomp, setError] = useState<string | null>(null);

    useEffect(() => {
        // 🔥 방 ID나 username이 아직 없으면 연결하지 않음
        if (!roomId || !username) {
            console.log('STOMP 대기 상태: roomId 또는 username 없음', {
                roomId,
                username,
            });
            return;
        }

        const connect = async () => {
            try {
                const client = await createStompClient();
                clientRef.current = client;

                client.onConnect = () => {
                    console.log('STOMP connected, username:', username);
                    setConnected(true);
                    setError(null);

                    // /sub/chat/room/{roomId} 구독
                    client.subscribe(`/sub/chat/room/${roomId}`, (msg: IMessage) => {
                        try {
                            const body: ChatMessage = JSON.parse(msg.body);
                            console.log('STOMP 수신 메시지:', body, '현재 username:', username);

                            // ✅ 내가 보낸 TALK 메시지는 이미 로컬에 넣었으니, 서버 echo는 무시
                            if (body.type === 'TALK' && body.sender === username) {
                                return;
                            }

                            setMessages((prev) => [...prev, body]);
                        } catch (e) {
                            console.warn('메시지 파싱 실패:', e);
                        }
                    });
                };

                client.onStompError = (frame) => {
                    console.log('Broker error:', frame.headers['message'], frame.body);
                    setError(frame.headers['message'] || 'STOMP 오류 발생');
                };

                client.onWebSocketError = (ev) => {
                    console.log('WebSocket error:', ev);
                    setError('WebSocket 연결 오류');
                };

                client.activate();
            } catch (e) {
                console.log('STOMP 연결 준비 중 오류:', e);
                setError('STOMP 클라이언트 생성 실패');
            }
        };

        connect();

        return () => {
            console.log('STOMP deactivated');
            if (clientRef.current) {
                clientRef.current.deactivate();
            }
            setConnected(false);
        };
        // 🔥 username 도 의존성에 포함 – username 바뀌면 새로 연결
    }, [roomId, username]);

    /**
     * 채팅 메시지 전송 (서버 + 로컬 동시 반영)
     */
    const sendMessage = (text: string) => {
        if (!clientRef.current || !connected || !username) {
            console.log('sendMessage 호출 실패: 연결 안 됨 또는 username 없음', {
                connected,
                username,
            });
            return;
        }

        const payload: ChatMessage = {
            type: 'TALK',
            roomId,
            sender: username,
            message: text,
            sendTime: new Date().toISOString(),
        };

        // 1) 서버로 메시지 전송
        clientRef.current.publish({
            destination: '/pub/chat/message',
            body: JSON.stringify(payload),
            headers: { 'content-type': 'application/json' },
        });

        // 2) 내 메시지는 로컬에도 즉시 반영 → 오른쪽 파란 말풍선
        setMessages((prev) => [...prev, payload]);
    };

    return {
        connected,
        messages,
        error_stomp,
        sendMessage,
    };
}
