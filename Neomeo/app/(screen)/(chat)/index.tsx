import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { Link, router } from 'expo-router';
import { chatStyle } from '@/app/(styles)/chat_style';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useChatList } from '@/src/(api)/useChatList';
import { useFetchChatTag } from "@/src/(api)/fetchChatTag";
import { useState } from 'react';

const healMessages = [
    "오늘도 잘 버티셨어요.",
    "말하고 싶지 않다면 듣기만 해도 괜찮아요.",
    "어떤 모습이어도 괜찮아요.",
    "천천히 해도 돼요.",
];

const color_field = [
    { color: '#FF6363' },
    { color: '#FFA600' },
    { color: '#FFCD56' },
    { color: '#4BC0C0' },
    { color: '#36A2EB' }
];

export default function ChatList() {

    const healMessage = healMessages[Math.floor(Math.random() * healMessages.length)];

    const handleNewRoom = () => {
        router.push('../(stack)/(chat)/create-room');
    };

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [roomKeyword, setRoomKeyword] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [searchTag, setSearchTag] = useState('');

    const { chatList } = useChatList();
    const { tagChatList } = useFetchChatTag(searchTag);

    const random_color = () => {
        const idx = Math.floor(Math.random() * color_field.length);
        return color_field[idx];
    };

    const real_data = chatList.map(item => ({
        roomid: item.roomId,
        name: item.name,
        tags: item.tags,
        color: random_color().color
    }));

    const handleTagSearch = () => {
        if (!tagInput.trim()) return;
        setSearchTag(tagInput);
    };

    return (
        <View style={chatStyle.container}>

            {/* 상단 헤더 */}
            <View style={chatStyle.headerContainer}>
                <View>
                    <Text style={chatStyle.title}>채팅방</Text>
                    <Text style={chatStyle.subtitle}>새로운 사람들과 연결되세요</Text>
                </View>

                <TouchableOpacity onPress={() => setIsSearchOpen(true)}>
                    <Ionicons name="search" size={32} color="#5678FF" />
                </TouchableOpacity>
            </View>

            {/* 힐 메시지 */}
            {!isSearchOpen && (
                <View style={chatStyle.healMessageBox}>
                    <Text style={chatStyle.healMessage}>{healMessage}</Text>
                </View>
            )}

            {/* 기본 채팅방 리스트 */}
            {!isSearchOpen && (
                <FlatList
                    data={real_data}
                    keyExtractor={(item) => item.roomid}
                    style={chatStyle.listWrapper}
                    renderItem={({ item }) => (
                        <Link
                            href={{
                                pathname: `../../chattingRoom/${item.roomid}`,
                                params: { id: String(item.roomid), color: item.color }
                            }}
                            asChild
                        >
                            <TouchableOpacity style={chatStyle.chatCard}>
                                
                                {/* 프로필 색깔 원 */}
                                <View style={[chatStyle.profileCircle, { backgroundColor: item.color }]}>
                                    <Text style={chatStyle.profileText}>{item.name[0]}</Text>
                                </View>

                                {/* 이름 + 태그 */}
                                {/* 이름 + 태그 */}
                                <View style={{ flex: 1 }}>
                                    <Text style={chatStyle.nickname}>{item.name}</Text>

                                    {item.tags && (
                                        <Text style={chatStyle.roomTag}>
                                            #{String(item.tags).replace(/^#/, "")}
                                        </Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        </Link>
                    )}
                />
            )}

            {/* ---------------- 중앙 팝업 검색 UI ---------------- */}
            {isSearchOpen && (
                <>
                    {/* 반투명 배경 */}
                    <View
                        style={{
                            position: 'absolute',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.15)',
                        }}
                    />

                    {/* 중앙 팝업 박스 */}
                    <View
                        style={{
                            position: 'absolute',
                            top: '20%',
                            left: '5%',
                            right: '5%',
                            backgroundColor: 'white',
                            borderRadius: 24,
                            paddingVertical: 20,
                            paddingHorizontal: 20,
                            shadowColor: '#000',
                            shadowOpacity: 0.15,
                            shadowRadius: 12,
                            elevation: 6,
                        }}
                    >
                        {/* 닫기 */}
                        <TouchableOpacity
                            onPress={() => setIsSearchOpen(false)}
                            style={{ alignSelf: 'flex-end', marginBottom: 8 }}
                        >
                            <Ionicons name="close" size={32} color="#5678FF" />
                        </TouchableOpacity>

                        {/* 채팅방 검색 */}
                        <View
                            style={{
                                marginTop: 5,
                                borderRadius: 14,
                                backgroundColor: '#F5F6FA',
                                paddingVertical: 12,
                                paddingHorizontal: 12,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Ionicons name="search" size={20} color="#5678FF" style={{ marginRight: 10 }} />

                            <TextInput
                                placeholder="채팅방 검색…"
                                value={roomKeyword}
                                onChangeText={setRoomKeyword}
                                style={{ flex: 1, fontSize: 15 }}
                            />

                            <TouchableOpacity
                                onPress={() => {
                                    if (!roomKeyword.trim()) return;
                                    console.log("채팅방 검색 실행:", roomKeyword);
                                }}
                                style={{
                                    backgroundColor: '#5678FF',
                                    paddingVertical: 8,
                                    paddingHorizontal: 14,
                                    borderRadius: 12,
                                    marginLeft: 8,
                                }}
                            >
                                <Text style={{ color: 'white', fontWeight: '700' }}>검색</Text>
                            </TouchableOpacity>
                        </View>

                        {/* 태그 검색 */}
                        <View
                            style={{
                                marginTop: 15,
                                backgroundColor: '#F5F6FA',
                                borderRadius: 14,
                                padding: 12,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Ionicons name="pricetag-outline" size={20} color="#5678FF" style={{ marginRight: 10 }} />

                            <TextInput
                                placeholder="태그 입력 (예: 우울)"
                                value={tagInput}
                                onChangeText={setTagInput}
                                style={{ flex: 1, fontSize: 15 }}
                            />

                            <TouchableOpacity
                                onPress={handleTagSearch}
                                style={{
                                    backgroundColor: '#5678FF',
                                    paddingVertical: 8,
                                    paddingHorizontal: 14,
                                    borderRadius: 12,
                                }}
                            >
                                <Text style={{ color: 'white', fontWeight: '700' }}>추가</Text>
                            </TouchableOpacity>
                        </View>

                        {/* 검색 결과 */}
                        <FlatList
                            data={tagChatList}
                            keyExtractor={(item) => String(item.roomId)}
                            style={{ marginTop: 18, maxHeight: 250 }}
                            renderItem={({ item }) => (
                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        padding: 16,
                                        borderRadius: 16,
                                        marginBottom: 12,
                                        borderWidth: 1,
                                        borderColor: '#eee',
                                    }}
                                >
                                    <Text style={{ fontSize: 16, fontWeight: '700' }}>{item.name}</Text>
                                    <Text style={{ marginTop: 4, color: '#5678FF', fontWeight: '600' }}>
                                        #{item.tags}
                                    </Text>
                                </View>
                            )}
                            ListEmptyComponent={
                                <Text style={{ textAlign: 'center', marginTop: 20, color: '#777' }}>
                                    검색 결과가 없습니다.
                                </Text>
                            }
                        />
                    </View>
                </>
            )}

            {/* + 버튼 */}
            {!isSearchOpen && (
                <TouchableOpacity
                    onPress={handleNewRoom}
                    style={{ position: 'absolute', bottom: 30, right: 20 }}
                >
                    <Ionicons name="add-circle" size={60} color="#5678FF" />
                </TouchableOpacity>
            )}

        </View>
    );
}

