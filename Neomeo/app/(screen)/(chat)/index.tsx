import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Link, router } from 'expo-router';
import { chatStyle } from '@/app/(styles)/chat_style';
import Ionicons from '@expo/vector-icons/Ionicons';

const healMessages = [
    "오늘도 잘 버티셨어요.",
    "말하고 싶지 않다면 듣기만 해도 괜찮아요.",
    "어떤 모습이어도 괜찮아요.",
    "천천히 해도 돼요.",
];

const dummyChat = [
    { id: 'a', name: '우울 극복방', last: '안녕하세요, 오늘 날씨가...', time: '10:30', color: '#AFC6FF', online: true, tag: '#취미공유' },
    { id: 'b', name: '게임 친구 찾기', last: '같이 얘기하실 분 계신가요?', time: '09:15', color: '#D2C1FF', online: false, tag: '#게임' },
    { id: 'c', name: '매일 힘내기', last: '오늘 하루도 힘내세요!', time: '어제', color: '#FFAFBC', online: true, tag: '#일상' },
    { id: 'd', name: '익명 독서 클럽', last: '취미 생활 공유하고 싶어요', time: '어제', color: '#8FE9FF', online: true, tag: '#독서' },
];

export default function ChatList() {
    const healMessage = healMessages[Math.floor(Math.random() * healMessages.length)];
    
    // 새 채팅방 만들기 버튼 핸들러: create-room.tsx로 이동하도록 수정
    const handleNewRoom = () => {
        // (stack)/(chat)에서 한 단계 상위인 (stack)으로 나와 create-room으로 이동
        router.push('../create-room'); 
    };

    return (
        <View style={chatStyle.container}>
            
            {/* 타이틀과 새 채팅방 만들기 버튼을 포함하는 헤더 영역 */}
            <View style={chatStyle.headerContainer}>
                <View>
                    <Text style={chatStyle.title}>메시지</Text>
                    <Text style={chatStyle.subtitle}>새로운 사람들과 연결되세요</Text>
                </View>
                {/* 새 채팅방 만들기 버튼 */}
                <TouchableOpacity onPress={handleNewRoom} style={chatStyle.newRoomButton}>
                    <Ionicons name="add-circle-outline" size={32} color="#5678FF" />
                </TouchableOpacity>
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
                                {/* 닉네임 대신 방 제목 표시 */}
                                <Text style={chatStyle.nickname}>{item.name}</Text>
                                {/* 채팅방 태그 표시 */}
                                <Text style={chatStyle.roomTag}>{item.tag}</Text> 
                                <Text numberOfLines={1} style={chatStyle.lastMessage}>{item.last}</Text>
                            </View>

                            <View style={chatStyle.timeArea}>
                                <Text style={chatStyle.time}>{item.time}</Text>
                                {/* 온라인 상태 표시 */}
                                {item.online && <View style={chatStyle.onlineDot}></View>} 
                            </View>
                        </TouchableOpacity>
                    </Link>
                )}
            />
        </View>
    );
}