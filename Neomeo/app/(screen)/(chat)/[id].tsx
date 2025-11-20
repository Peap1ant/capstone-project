import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import SafeContainer from '@/src/(components)/SafeContainer';
import SafeScroll from '@/src/(components)/SafeScroll';
import { chatRoomStyle } from '@/app/(styles)/chat_room_style';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

// 더미 메시지
const dummyMessages = [
    { id: 1, fromMe: false, text: '안녕하세요!' },
    { id: 2, fromMe: true, text: '안녕하세요 반가워요' },
    { id: 3, fromMe: false, text: '오늘 날씨 정말 좋네요' },
    { id: 4, fromMe: true, text: '네 맞아요! 기분도 좋아지는 것 같아요' },
    { id: 5, fromMe: false, text: '요즘 어떻게 지내세요?' },
    { id: 6, fromMe: true, text: '잘 지내고 있어요. 최근에 새로운 취미를 시작했어요' }
];

export default function ChatRoomScreen() {

    const { id } = useLocalSearchParams();
    const chatName = '익명 A'; // 실제 API에서 받아올 값

    return (
        <SafeContainer>

            {/* 헤더 */}
            <View style={chatRoomStyle.header}>
                <TouchableOpacity>
                    <Ionicons name="chevron-back" size={28} color="black" />
                </TouchableOpacity>

                <View style={chatRoomStyle.userInfo}>
                    <View style={chatRoomStyle.profileCircle} />
                    <View>
                        <Text style={chatRoomStyle.userName}>{chatName}</Text>
                        <Text style={chatRoomStyle.online}>온라인</Text>
                    </View>
                </View>

                <TouchableOpacity>
                    <Ionicons name="ellipsis-horizontal" size={26} />
                </TouchableOpacity>
            </View>

            <SafeScroll>
                <View style={chatRoomStyle.messageContainer}>

                    {dummyMessages.map(msg => (
                        <View
                            key={msg.id}
                            style={msg.fromMe ? chatRoomStyle.myBubble : chatRoomStyle.otherBubble}
                        >
                            <Text style={msg.fromMe ? chatRoomStyle.myText : chatRoomStyle.otherText}>
                                {msg.text}
                            </Text>
                        </View>
                    ))}

                </View>
            </SafeScroll>

            {/* 입력창 */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={chatRoomStyle.inputBar}>
                    <Ionicons name="add" size={28} color="#777" />
                    <TextInput
                        style={chatRoomStyle.input}
                        placeholder="메시지 입력..."
                    />
                    <TouchableOpacity>
                        <Ionicons name="send" size={26} color="#7D7CFB" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

        </SafeContainer>
    );
}
