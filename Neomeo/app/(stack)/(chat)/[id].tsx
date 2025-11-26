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

import { chatRoomStyle } from "../../(styles)/chat_room_style";
import { useStompChat } from "@/src/(api)/useStompChat";
import { useChatMessages } from "@/src/(api)/useChatMassages";
import { useUserData } from "@/src/(api)/useUserData";
import type { ChatMessage } from "@/src/(api)/stompClient";

// 타입 정의
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

    // 태그 처리
    const rawTags = params.tags;
    const tagsArray: string[] = Array.isArray(rawTags)
        ? rawTags
        : rawTags
        ? [rawTags]
        : [];

    const [input, setInput] = useState("");

    // 유저 정보 로드
    const { userInfo, loading: userLoading } = useUserData();
    const username = userInfo?.username ?? "익명";

    // 이전 메시지 로드
    const { messages_old, loading_old } = useChatMessages(roomId);

    // 실시간 메시지
    const {
        connected,
        messages,
        error_stomp,
        sendMessage,
    } = useStompChat(roomId, username);

    // 로딩 처리
    if (userLoading) return <Text>유저 정보 불러오는 중...</Text>;
    if (loading_old) return <Text>이전 채팅 불러오는 중...</Text>;

    // 모든 메시지 합치기 (날짜 구분 포함)
    const finalList: ChatListItem[] = useMemo(() => {
        const all = [...messages_old, ...messages];

        const result: ChatListItem[] = [];
        let lastDate = "";

        all.forEach((msg) => {
            const dateOnly = (msg as any).time?.split(" ")[0] ?? "날짜 없음";

            if (dateOnly !== lastDate) {
                result.push({
                    _kind: "date",
                    key: `date-${dateOnly}`,
                    label: dateOnly,
                });
                lastDate = dateOnly;
            }

            result.push({
                ...msg,
                _kind: "msg",
                key: `${msg.id}-${(msg as any).time}`,
            });
        });

        return result;
    }, [messages_old, messages]);

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
                        isMine
                            ? chatRoomStyle.bubbleRight
                            : chatRoomStyle.bubbleLeft,
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
