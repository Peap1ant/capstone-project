import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { chatRoomStyle } from "../../(styles)/chat_room_style";
import { Ionicons } from "@expo/vector-icons";

export default function ChatRoom() {  
    const { id } = useLocalSearchParams();

    const dummyChat = [
        { from: 'other', text: '안녕하세요!' },
        { from: 'me', text: '안녕하세요 반가워요' },
        { from: 'other', text: '오늘 날씨 정말 좋네요' },
        { from: 'me', text: '네 맞아요! 기분도 좋아지는 것 같아요' },
    ];

    return (
        <View style={chatRoomStyle.container}>
            {/* Header */}
            <View style={chatRoomStyle.header}>
                <TouchableOpacity style={chatRoomStyle.backBtn} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={26} color="#333" />
                </TouchableOpacity>

                <View style={[chatRoomStyle.profileCircle, { backgroundColor: '#AFC6FF' }]}>
                    <Text style={chatRoomStyle.profileText}>익</Text>
                </View>

                <Text style={chatRoomStyle.headerName}>익명 {id}</Text>
                <Text style={chatRoomStyle.onlineText}>● 온라인</Text>
            </View>

            {/* Chat Area */}
            <ScrollView style={chatRoomStyle.chatArea}>
                {dummyChat.map((msg, idx) => (
                    <View
                        key={idx}
                        style={msg.from === 'me' ? chatRoomStyle.bubbleRight : chatRoomStyle.bubbleLeft}
                    >
                        <Text style={chatRoomStyle.text}>{msg.text}</Text>
                    </View>
                ))}
            </ScrollView>

            {/* Input */}
            <View style={chatRoomStyle.inputArea}>
                <TextInput
                    style={chatRoomStyle.inputBox}
                    placeholder="천천히 말해도 괜찮아요…"
                    placeholderTextColor="#999"
                />
                <TouchableOpacity style={chatRoomStyle.sendBtn}>
                    <Text style={chatRoomStyle.sendText}>전송</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}