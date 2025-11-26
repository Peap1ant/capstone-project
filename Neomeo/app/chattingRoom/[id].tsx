import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { chatRoomStyle } from "../(styles)/chat_room_style";
import { useStompChat } from "@/src/(api)/useStompChat";
import { useChatMessages } from "@/src/(api)/useChatMassages";
import { useUserData } from "@/src/(api)/useUserData";
import type { ChatMessage } from "@/src/(api)/stompClient";

type DateDivider = {
  _kind: "date";
  label: string;
  key: string;
};

type MessageItem = ChatMessage & {
  _kind: "msg";
  key: string;
};

type ChatListItem = DateDivider | MessageItem;

// 🔧 날짜 키("2025-11-25")를 오늘/어제/기타 로 변환
function formatDateLabel(dateKey: string) {
  if (!dateKey) return "날짜 없음";

  const today = new Date();
  const target = new Date(dateKey);

  if (isNaN(target.getTime())) {
    return dateKey; // 파싱 실패하면 그대로
  }

  const toDateOnly = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

  const diffDays =
    (toDateOnly(today) - toDateOnly(target)) / (1000 * 60 * 60 * 24);

  if (diffDays === 0) return "오늘";
  if (diffDays === 1) return "어제";

  return dateKey; // 그 외엔 "YYYY-MM-DD"
}

export default function ChatRoomScreen() {
  const params = useLocalSearchParams<{
    id: string;
    name?: string;
    tags?: string | string[];
    maxUserCnt?: string | string[];
    color?: string;
  }>();

  const roomId = String(params.id);
  const roomName = params.name ? String(params.name) : "알 수 없음";
  const color = params.color ? String(params.color) : "#ccc";

  const rawTags = params.tags;
  const tagsArray: string[] = Array.isArray(rawTags)
    ? rawTags
    : rawTags
    ? [rawTags]
    : [];

  const [input, setInput] = useState("");

  // 1) 훅들 먼저 전부 호출
  const { userInfo, loading: userLoading } = useUserData();
  const username = userInfo?.username ?? "익명";

  const { messages_old, loading_old } = useChatMessages(roomId);

  const { connected, messages, error_stomp, sendMessage } = useStompChat(
    roomId,
    username
  );

  const isLoading = userLoading || loading_old;

  // 2) useMemo도 항상 호출되게 위에 둔다
  const finalList: ChatListItem[] = useMemo(() => {
    const all = [...messages_old, ...messages];

    const result: ChatListItem[] = [];
    let lastDateKey = "";

    all.forEach((msg) => {
      const rawTime =
        (msg as any).sendTime ?? (msg as any).time ?? "";

      // ISO 형태 "2025-11-25T23:32:08.765028" → "2025-11-25"
      const dateKey = rawTime ? rawTime.split("T")[0] : "";

      if (dateKey !== lastDateKey) {
        result.push({
          _kind: "date",
          key: `date-${dateKey || "none"}`,
          label: formatDateLabel(dateKey),
        });
        lastDateKey = dateKey;
      }

      result.push({
        ...(msg as ChatMessage),
        _kind: "msg",
        key: `${msg.id ?? Math.random()}-${rawTime}`,
      });
    });

    return result;
  }, [messages_old, messages]);

  // 3) 그 다음에 로딩 처리
  if (isLoading) {
    return <Text>채팅 불러오는 중...</Text>;
  }

  // 메시지 전송
  const onPressSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput("");
  };

  // 메시지 렌더러
  const renderItem = ({ item }: { item: ChatListItem }) => {
    if (item._kind === "date") {
      return (
        <View style={localStyles.dateDivider}>
          <Text style={localStyles.dateText}>{item.label}</Text>
        </View>
      );
    }

    const isMine = item.sender === username;
    const isEnter = item.type === "ENTER";

    return (
      <View style={{ marginVertical: 4 }}>
        {!isEnter && !isMine && (
          <Text style={chatRoomStyle.messageNickname}>
            {item.sender ?? "익명"}
          </Text>
        )}

        <View
          style={[
            isMine ? chatRoomStyle.bubbleRight : chatRoomStyle.bubbleLeft,
            { backgroundColor: isMine ? "#AFC6FF" : "#FFFFFF" },
          ]}
        >
          <Text
            style={[
              chatRoomStyle.text,
              isMine && { color: "#FFFFFF" },
            ]}
          >
            {isEnter ? "🔔 입장하였습니다." : item.message}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={chatRoomStyle.container}>
      {/* 헤더 */}
      <View style={chatRoomStyle.header}>
        <TouchableOpacity
          style={chatRoomStyle.backBtn}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={26} color="#333" />
        </TouchableOpacity>

        <View
          style={[
            chatRoomStyle.profileCircle,
            { backgroundColor: color },
          ]}
        >
          <Text style={chatRoomStyle.profileText}>
            {roomName[0] ?? "?"}
          </Text>
        </View>

        <View style={chatRoomStyle.headerInfoArea}>
          <Text style={chatRoomStyle.headerName}>{roomName}</Text>
          <Text style={chatRoomStyle.headerTags}>
            {tagsArray.join(" ")}
          </Text>
        </View>
      </View>

      {/* 에러 */}
      {error_stomp && (
        <Text style={{ color: "red", marginHorizontal: 16 }}>
          STOMP 에러: {String(error_stomp)}
        </Text>
      )}

      {/* 메시지 리스트 */}
      <FlatList
        data={finalList}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        contentContainerStyle={localStyles.chatList}
      />

      {/* 입력창 */}
      <View style={chatRoomStyle.inputArea}>
        <TextInput
          style={chatRoomStyle.inputBox}
          placeholder="천천히 말해도 괜찮아요…"
          placeholderTextColor="#999"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity
          style={chatRoomStyle.sendBtn}
          onPress={onPressSend}
        >
          <Text style={chatRoomStyle.sendText}>전송</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  chatList: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  dateDivider: {
    alignSelf: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "#eee",
    marginVertical: 6,
  },
  dateText: {
    fontSize: 12,
    color: "#555",
    fontWeight: "600",
  },
});
