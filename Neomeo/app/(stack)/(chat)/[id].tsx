import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { chatRoomStyle } from "../../(styles)/chat_room_style"; 
import { Ionicons } from "@expo/vector-icons";

// DB/API에서 가져올 방 정보 예시
const roomData: Record<string, { name: string; color: string; online: boolean; tags: string[]; }> = {
    'a': { name: '우울 극복방', color: '#AFC6FF', online: true, tags: ['#우울증', '#극복'] },
    'b': { name: '게임 친구 찾기', color: '#D2C1FF', online: true, tags: ['#취미', '#익명'] },
};

// 다중 채팅방 더미 메시지 (각 메시지에 닉네임 필요)
const dummyChat = [
    { from: 'other', name: '익명 A', text: '안녕하세요!' },
    { from: 'me', name: '나', text: '안녕하세요 반가워요' },
    { from: 'other', name: '익명 C', text: '오늘 날씨 정말 좋네요' },
    { from: 'me', name: '나', text: '네 맞아요! 기분도 좋아지는 것 같아요' },
];


export default function ChatRoom() {  
    const { id } = useLocalSearchParams();
    
    // id가 배열 형식인지 확인하여 TypeScript 오류 방지
    if (Array.isArray(id)) {
        console.error("오류: id가 배열 형식입니다. 단일 id만 처리 가능합니다.");
        return <Text>잘못된 접근입니다.</Text>;
    }
    
    // 방 ID를 이용해 방 정보 가져오기
    const currentRoom = roomData[id] || { name: `익명 채팅방`, color: '#AFC6FF', online: true, tags: ['#익명', '#자유'] };

    return (
        <View style={chatRoomStyle.container}>
            {/* Header */}
            <View style={chatRoomStyle.header}>
                <TouchableOpacity style={chatRoomStyle.backBtn} onPress={() => router.back()}>
                    {/* 뒤로가기 버튼 기능 */}
                    <Ionicons name="arrow-back" size={26} color="#333" />
                </TouchableOpacity>

                {/* 프로필 서클 */}
                <View style={[chatRoomStyle.profileCircle, { backgroundColor: currentRoom.color }]}>
                    <Text style={chatRoomStyle.profileText}>익</Text>
                </View>

                {/* 방 이름 및 태그 표시 영역 */}
                <View style={chatRoomStyle.headerInfoArea}> 
                    <Text style={chatRoomStyle.headerName}>{currentRoom.name}</Text>
                    {/* 태그 정보 표시 */}
                    <Text style={chatRoomStyle.headerTags}>{currentRoom.tags.join(' ')}</Text> 
                </View>

                {/* 온라인 상태 표시 */}
                <Text style={chatRoomStyle.onlineText}>
                    {currentRoom.online ? '● 온라인' : '● 오프라인'}
                </Text>
            </View>

            {/* Chat Area */}
            <ScrollView style={chatRoomStyle.chatArea}>
                {dummyChat.map((msg, idx) => (
                    <View key={idx}>
                        {/* 상대방 메시지 위에 닉네임 표시 (다중 채팅방용) */}
                        {msg.from === 'other' && (
                            <Text style={chatRoomStyle.messageNickname}>{msg.name}</Text>
                        )}
                        
                        <View
                            // 메시지 발신자에 따라 말풍선 스타일 다르게 적용
                            style={msg.from === 'me' ? chatRoomStyle.bubbleRight : chatRoomStyle.bubbleLeft}
                        >
                            <Text style={chatRoomStyle.text}>{msg.text}</Text>
                        </View>
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
                    {/* 메시지 전송 버튼 */}
                    <Text style={chatRoomStyle.sendText}>전송</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}