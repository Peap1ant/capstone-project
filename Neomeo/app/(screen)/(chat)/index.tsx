import { View, Text, TouchableOpacity, Image } from 'react-native';
import SafeContainer from '@/src/(components)/SafeContainer';
import SafeScroll from '@/src/(components)/SafeScroll';
import { chatListStyle } from '@/app/(styles)/chat_style';
import { Link } from 'expo-router';

// 더미 데이터 (API 연동 시 대체)
const dummyChats = [
    {
        id: '1',
        name: '익명 A',
        time: '10:30',
        message: '안녕하세요, 오늘 날씨가...',
        color: '#8DC8FF',
        online: true
    },
    {
        id: '2',
        name: '익명 B',
        time: '09:15',
        message: '같이 얘기하실 분 계신가...',
        color: '#C29BFF',
        online: false
    },
    {
        id: '3',
        name: '익명 C',
        time: '어제',
        message: '오늘 하루도 힘내세요!',
        color: '#FF86A3',
        online: true
    },
    {
        id: '4',
        name: '익명 D',
        time: '어제',
        message: '취미 생활 공유하고 싶어...',
        color: '#63E2FF',
        online: false
    }
];

export default function ChatListScreen() {
    return (
        <SafeContainer>

            <View style={chatListStyle.header}>
                <Text style={chatListStyle.title}>메시지</Text>
                <Text style={chatListStyle.subtitle}>새로운 사람들과 연결되세요</Text>
            </View>

            <SafeScroll>
                <View style={{ paddingHorizontal: 16 }}>

                    {dummyChats.map(chat => (
                        <Link
                            key={chat.id}
                            href={{ pathname: '../../(stack)/(chat)/[id]', params: { id: chat.id } }}
                            asChild
                        >
                            <TouchableOpacity style={chatListStyle.card}>
                                <View style={[chatListStyle.profileCircle, { backgroundColor: chat.color }]}>
                                    <Text style={chatListStyle.profileLetter}>
                                        {chat.name.charAt(0)}
                                    </Text>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <View style={chatListStyle.row}>
                                        <Text style={chatListStyle.name}>{chat.name}</Text>
                                        <Text style={chatListStyle.time}>{chat.time}</Text>
                                    </View>

                                    <View style={chatListStyle.row}>
                                        <Text style={chatListStyle.message} numberOfLines={1}>
                                            {chat.message}
                                        </Text>
                                        {chat.online && <View style={chatListStyle.onlineDot} />}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Link>
                    ))}

                </View>
            </SafeScroll>
        </SafeContainer>
    );
}
