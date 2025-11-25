import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStompChat } from '@/src/(api)/useStompChat';
import type { ChatMessage } from '@/src/(api)/stompClient';

export default function ChatRoomScreen() {
  const params = useLocalSearchParams<{ id: string; color?: string }>();
  const roomId = String(params.id);

  const [input, setInput] = useState('');
  const [username, setUsername] = useState<string>(''); // AsyncStorage 에서 가져옴

  useEffect(() => {
    const loadUsername = async () => {
      const stored = await AsyncStorage.getItem('username');
      setUsername(stored || 'unknown');
    };
    loadUsername();
  }, []);

  const { connected, messages, error, sendMessage } = useStompChat(
    roomId,
    username,
  );

  const onPressSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput('');
  };

  const renderItem = ({ item }: { item: ChatMessage }) => (
    <View style={styles.messageRow}>
      <Text style={styles.sender}>{item.sender}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>방 ID: {roomId}</Text>
      <Text style={styles.subHeader}>유저: {username}</Text>
      <Text style={styles.status}>
        상태: {connected ? '🟢 연결됨' : '🔴 연결 안 됨'}
      </Text>
      {error && <Text style={styles.error}>에러: {error}</Text>}

      <FlatList
        style={styles.list}
        data={messages}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={renderItem}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="메시지를 입력하세요"
        />
        <TouchableOpacity style={styles.sendBtn} onPress={onPressSend}>
          <Text style={styles.sendText}>전송</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: 'white' },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  subHeader: { fontSize: 14, marginBottom: 4 },
  status: { marginBottom: 4 },
  error: { color: 'red', marginBottom: 4 },
  list: { flex: 1, marginVertical: 8 },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  sender: { fontWeight: 'bold', marginRight: 6 },
  message: { flexShrink: 1 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  sendBtn: {
    marginLeft: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#4a6fff',
  },
  sendText: { color: 'white', fontWeight: 'bold' },
});
