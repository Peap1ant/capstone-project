import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { chatRoomStyle } from "../../(styles)/chat_room_style"; 
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useWebSocket } from "@/src/(chat)/useWebSocket";
import { useChatData } from "@/src/(api)/useChatData";

export default function ChatRoom() {  
    const [message, setMessage] = useState("");
    const [chatList, setChatList] = useState<any[]>([]);

    const { id, color } = useLocalSearchParams();

    console.log(color, id)
    
    if (Array.isArray(id)) return <Text>잘못된 접근입니다.</Text>;

    const { chatInfo, error, loading } = useChatData(id);

    if (loading) return <Text>로딩 중...</Text>;
    if (error) return <Text>{error}</Text>;
    if (!chatInfo) return <Text>데이터가 없습니다.</Text>;

    const currentRoom = { 
        roomid: chatInfo.roomId,
        name: chatInfo.name,
        hostUser: chatInfo.hostUser,
        tags: chatInfo.tags,
        color: color
    };

        // WebSocket 연결
    const { sendMessage } = useWebSocket(id, (msg) => {
        setChatList((prev) => [...prev, msg]);
    });

    const handleSend = () => {
        if (!message.trim()) return;
        sendMessage("나", message);
        setMessage("");
    };

    return (
        <View style={chatRoomStyle.container}>
            {/* Header */}
            <View style={chatRoomStyle.header}>
                <TouchableOpacity style={chatRoomStyle.backBtn} onPress={() => router.back()}>
                    {/* 뒤로가기 버튼 기능 */}
                    <Ionicons name="arrow-back" size={26} color="#333" />
                </TouchableOpacity>

                {/* 프로필 서클 */}
                <View style={[chatRoomStyle.profileCircle, { backgroundColor: currentRoom.color  as unknown as string}]}>
                    <Text style={chatRoomStyle.profileText}>{currentRoom.name[0]}</Text>
                </View>

                {/* 방 이름 및 태그 표시 영역 */}
                <View style={chatRoomStyle.headerInfoArea}> 
                    <Text style={chatRoomStyle.headerName}>{currentRoom.name}</Text>
                    {/* 태그 정보 표시 */}
                    <Text style={chatRoomStyle.headerTags}>{currentRoom.tags.join(' ')}</Text> 
                </View>
            </View>

            {/* Chat Area */}
            <FlatList
                data={chatList}
                keyExtractor={(_, idx) => String(idx)}
                renderItem={({ item }) => (
                    <View style={{ marginVertical: 4 }}>
                        {item.type !== "ENTER" && item.sender !== "나" && (
                            <Text style={chatRoomStyle.messageNickname}>{item.sender}</Text>
                        )}

                        <View
                            style={
                                item.sender === "나"
                                    ? chatRoomStyle.bubbleRight
                                    : chatRoomStyle.bubbleLeft
                            }
                        >
                            <Text style={chatRoomStyle.text}>
                                {item.type === "ENTER"
                                    ? "🔔 입장하였습니다."
                                    : item.message}
                            </Text>
                        </View>
                    </View>
                )}
            />

            {/* Input */}
            <View style={chatRoomStyle.inputArea}>
                <TextInput
                    style={chatRoomStyle.inputBox}
                    placeholder="천천히 말해도 괜찮아요…"
                    placeholderTextColor="#999"
                />
                <TouchableOpacity style={chatRoomStyle.sendBtn} onPress={handleSend}>
                    {/* 메시지 전송 버튼 */}
                    <Text style={chatRoomStyle.sendText}>전송</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}