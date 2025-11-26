// src/(api)/stompClient.ts
import { Client } from '@stomp/stompjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WS_URL = 'ws://localhost:8080/ws-stomp'; // WebSocket 엔드포인트

// ✅ 공통으로 쓸 ChatMessage 타입
export interface ChatMessage {
  id?: number;                                  // 과거 기록에서 사용
  roomId?: string;                              // 방 ID
  sender?: string;
  message?: string;
  type?: 'TALK' | 'ENTER' | 'QUIT' | string;    // 혹시 모를 확장 고려
  sendTime?: string;                            // 날짜/시간 (REST의 sendDate를 여기로 매핑)
}

/**
 * AsyncStorage 에 저장된 accessToken 을 읽어와서
 * STOMP Client 를 생성하는 함수
 */
export async function createStompClient(): Promise<Client> {
  const token = await AsyncStorage.getItem('accessToken');

  console.log('AsyncStorage 에서 불러온 accessToken:', token);

  const client = new Client({
    // RN/Expo 에서는 순수 WebSocket 사용
    webSocketFactory: () => new WebSocket(WS_URL),

    connectHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    },

    debug: (str) => {
      console.log('STOMP DEBUG:', str);
    },

    reconnectDelay: 5000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
  });

  return client;
}
