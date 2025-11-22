import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { chatStyle } from '@/app/(styles)/chat_style';

const healMessages = [
    "오늘도 잘 버티셨어요.",
    "말하고 싶지 않다면 듣기만 해도 괜찮아요.",
    "어떤 모습이어도 괜찮아요.",
    "천천히 해도 돼요.",
];

const dummyChat = [
    { id: 'a', name: '익명 A', last: '안녕하세요, 오늘 날씨가...', time: '10:30', color: '#AFC6FF', online: true },
    { id: 'b', name: '익명 B', last: '같이 얘기하실 분 계신가요?', time: '09:15', color: '#D2C1FF', online: false },
    { id: 'c', name: '익명 C', last: '오늘 하루도 힘내세요!', time: '어제', color: '#FFAFBC', online: true },
    { id: 'd', name: '익명 D', last: '취미 생활 공유하고 싶어요', time: '어제', color: '#8FE9FF', online: true },
];

export default function ChatList() {
    const healMessage = healMessages[Math.floor(Math.random() * healMessages.length)];

    return (
        <View style={chatStyle.container}>
            <View style={chatStyle.header}>
                <Text style={chatStyle.title}>메시지</Text>
                <Text style={chatStyle.subtitle}>새로운 사람들과 연결되세요</Text>
            </View>

            <View style={chatStyle.healMessageBox}>
                <Text style={chatStyle.healMessage}>{healMessage}</Text>
            </View>

            <FlatList
                data={dummyChat}
                keyExtractor={(item) => item.id}
                style={chatStyle.listWrapper}
                renderItem={({ item }) => (
                    <Link href={`/(stack)/(chat)/${item.id}`} asChild>
                        <TouchableOpacity style={chatStyle.chatCard}>
                            <View style={[chatStyle.profileCircle, { backgroundColor: item.color }]}>
                                <Text style={chatStyle.profileText}>익</Text>
                            </View>

                            <View style={chatStyle.chatInfo}>
                                <Text style={chatStyle.nickname}>{item.name}</Text>
                                <Text numberOfLines={1} style={chatStyle.lastMessage}>{item.last}</Text>
                            </View>

                            <View style={chatStyle.timeArea}>
                                <Text style={chatStyle.time}>{item.time}</Text>
                                {item.online && <View style={chatStyle.onlineDot}></View>}
                            </View>
                        </TouchableOpacity>
                    </Link>
                )}
            />
        </View>
    );
}