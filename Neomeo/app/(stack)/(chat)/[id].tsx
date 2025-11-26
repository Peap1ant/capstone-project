import React, { useState } from "react";
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
    const color = params.color ? String(params.color) : "#ccc";
    const roomName = params.name ? String(params.name) : "알 수 없음";

    // tags: item.tags (배열 또는 문자열) 처리
    const rawTags = params.tags;
    let tagsArray: string[] = [];

    if (Array.isArray(rawTags)) {
        tagsArray = rawTags;
    } else if (typeof rawTags === "string" && rawTags.length > 0) {
        tagsArray = [rawTags];
    }

    const rawMaxUser = params.maxUserCnt;
    let maxUserCnt: number | undefined = undefined;
    if (Array.isArray(rawMaxUser)) {
        maxUserCnt = parseInt(rawMaxUser[0], 10);
    } else if (typeof rawMaxUser === "string") {
        maxUserCnt = parseInt(rawMaxUser, 10);
    }

    const [input, setInput] = useState("");

    // ✅ 1) 모든 훅을 최상단에서 먼저 호출
    const {
        userInfo,
        loading: userLoading,
        error: userError,
    } = useUserData();

    const username = userInfo?.username ?? ""; // 아직 없으면 빈 문자열

    const {
        messages_old,
        loading_old,
        error_old,
    } = useChatMessages(roomId);

    const {
        connected,
        messages,
        error_stomp,
        sendMessage,
    } = useStompChat(roomId, username);

    // ✅ 2) 이후에 조건부 렌더링만 수행 (훅 호출 X)
    if (userLoading) {
        return <Text>유저 정보 불러오는 중...</Text>;
    }
    if (userError || !userInfo) {
        return <Text>유저 정보를 불러오지 못했습니다.</Text>;
    }
    if (loading_old) {
        return <Text>이전 채팅 불러오는 중...</Text>;
    }
    if (error_old) {
        return <Text>{error_old}</Text>;
    }

    const onPressSend = () => {
        if (!input.trim()) return;
        sendMessage(input.trim());
        setInput("");
    };

        // WebSocket 연결
    const { sendMessage } = useWebSocket(id, (msg) => {
        setChatList((prev) => [...prev, msg]);
    });

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
                        { backgroundColor: currentRoom.color || "#ccc" },
                    ]}
                >
                    <Text style={chatRoomStyle.profileText}>
                        {currentRoom.name[0]}
                    </Text>
                </View>

                <View style={chatRoomStyle.headerInfoArea}>
                    <Text style={chatRoomStyle.headerName}>
                        {currentRoom.name}
                    </Text>
                    <Text style={chatRoomStyle.headerTags}>
                        {currentRoom.tags.join(" ")}
                    </Text>
                </View>
            </View>

            {error_stomp && (
                <Text style={{ color: "red", marginHorizontal: 16 }}>
                    STOMP 에러: {String(error_stomp)}
                </Text>
            )}

            <FlatList
                data={finalList}
                keyExtractor={(item) => item.key}
                renderItem={renderItem}
                contentContainerStyle={localStyles.chatList}
            />

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
