import { Client } from '@stomp/stompjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WS_URL = 'ws://localhost:8080/ws-stomp'; // WebSocket 엔드포인트

export interface ChatMessage {
  type: 'TALK' | 'ENTER' | 'QUIT';
  roomId: string;
  sender: string;
  message: string;
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
      // 토큰이 없으면 빈 문자열
      Authorization: token ? `Bearer ${token}` : '',
    },

    debug: (str) => {
      console.log('STOMP DEBUG:', str);
    },

    reconnectDelay: 5000, // 재연결 딜레이(ms)
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
  });

  return client;
}
