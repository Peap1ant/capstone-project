import { Client, IMessage } from '@stomp/stompjs';
import { useEffect, useRef } from 'react';
import { getToken } from '@/src/(api)/token';

export function useWebSocket(roomId: string, onMessage: (msg: any) => void) {
    const clientRef = useRef<Client | null>(null);

    useEffect(() => {
        let client: Client | null = null;

        async function connectSocket() {
            const token = await getToken("accessToken");
            if (!token) {
                console.warn("❗ WebSocket 연결 실패 — 토큰 없음");
                return;
            }

            client = new Client({
                brokerURL: "ws://192.168.0.3:8080/ws-stomp",  // 반드시 PC IP로 입력
                connectHeaders: {
                    Authorization: `Bearer ${token}`, // 🔥 명세서 요구사항
                },
                reconnectDelay: 5000,
                heartbeatIncoming: 0,
                heartbeatOutgoing: 10000,

                onConnect: () => {
                    console.log("🟢 STOMP 연결 성공");

                    client!.subscribe(`/sub/chat/room/${roomId}`, (msg: IMessage) => {
                        try {
                            const body = JSON.parse(msg.body);
                            onMessage(body);
                        } catch (e) {
                            console.error("메시지 파싱 오류:", e);
                        }
                    });

                    // 방 입장 ENTER 메시지 전송
                    client!.publish({
                        destination: "/pub/chat/message",
                        body: JSON.stringify({
                            type: "ENTER",
                            roomId,
                            sender: "나",
                            message: "",
                        })
                    });
                },

                onStompError: frame => {
                    console.log("STOMP ERROR:", frame.body);
                },
            });

            client.activate();
            clientRef.current = client;
        }

        connectSocket();

        return () => {
            if (clientRef.current) clientRef.current.deactivate();
        };
    }, [roomId]);

    const sendMessage = (sender: string, message: string) => {
        if (!clientRef.current || !clientRef.current.connected) {
            console.warn("❗ 소켓 아직 연결 전");
            return;
        }

        clientRef.current.publish({
            destination: "/pub/chat/message",
            body: JSON.stringify({
                type: "TALK",
                roomId,
                sender,
                message,
            })
        });
    };

    return { sendMessage };
}
