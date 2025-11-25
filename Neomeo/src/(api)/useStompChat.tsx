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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const connect = async () => {
      try {
        const client = await createStompClient();
        clientRef.current = client;

        client.onConnect = () => {
          console.log('STOMP connected');
          setConnected(true);
          setError(null);

          // /sub/chat/room/{roomId} 구독
          client.subscribe(`/sub/chat/room/${roomId}`, (msg: IMessage) => {
            try {
              const body: ChatMessage = JSON.parse(msg.body);
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
  }, [roomId]);

  const sendMessage = (text: string) => {
    if (!clientRef.current || !connected) return;

    const payload: ChatMessage = {
      type: 'TALK',
      roomId,
      sender: username,
      message: text,
    };

    clientRef.current.publish({
      destination: '/pub/chat/message',
      body: JSON.stringify(payload),
      headers: { 'content-type': 'application/json' },
    });
  };

  return {
    connected,
    messages,
    error,
    sendMessage,
  };
}
