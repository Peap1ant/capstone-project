import { View, Text, TouchableOpacity, Image } from 'react-native';
import SafeContainer from '@/src/(components)/SafeContainer';
import SafeScroll from '@/src/(components)/SafeScroll';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { communityStyle } from '@/app/(styles)/community_style';

// 더미 데이터 (실제 API 연동 시 axios로 교체)
const dummy_data = [
    {
        id: '1',
        name: '익명 A',
        time: '2시간 전',
        category: '취미',
        title: '저를 케어하는 아이콘 만들기',
        content: '디자인에 관심이 생겨서 간단한 아이콘을 만들어봤어요.',
        likes: 24,
        comments: 5,
        imgKey: '1',
        profileColor: '#5D9EFF'
    },
    {
        id: '2',
        name: '익명 B',
        time: '5시간 전',
        category: '일상',
        title: '오늘 하루 어떻게 보내셨나요?',
        content: '저는 오늘 산책을 다녀왔어요. 날씨가 좋아서 기분이 좋았습니다.',
        likes: 42,
        comments: 12,
        imgKey: '2',
        profileColor: '#B57BFF'
    },
    {
        id: '3',
        name: '익명 C',
        time: '어제',
        category: '추천',
        title: '요즘 읽고 있는 책 추천해요',
        content: '최근에 읽은 책 중에서 정말 좋았던 책이 있어서 공유해요.',
        likes: 11,
        comments: 1,
        imgKey: '3',
        profileColor: '#FF7CA8'
    }
];

const imageMap: Record<string, any> = {
    '1': require('../../../assets/images/testing/136-200x300.jpg'),
    '2': require('../../../assets/images/testing/553-1000x300.jpg'),
    '3': require('../../../assets/images/testing/564-500x500.jpg'),
};

export default function CommunityScreen() {
    return (
        <SafeContainer>

            {/* 헤더 */}
            <View style={communityStyle.newHeader}>
                <TouchableOpacity>
                    <Ionicons name="chevron-back" size={28} color="black" />
                </TouchableOpacity>

                <Text style={communityStyle.newHeaderTitle}>게시판</Text>

                <TouchableOpacity>
                    <Ionicons name="add-circle" size={32} color="#7A6EFE" />
                </TouchableOpacity>
            </View>

            {/* 필터 */}
            <View style={communityStyle.filterContainer}>
                <TouchableOpacity style={communityStyle.filterBtnActive}>
                    <Ionicons name="star" size={16} color="white" />
                    <Text style={communityStyle.filterTextActive}>전체</Text>
                </TouchableOpacity>

                <TouchableOpacity style={communityStyle.filterBtn}>
                    <Ionicons name="flame" size={16} color="#444" />
                    <Text style={communityStyle.filterText}>인기</Text>
                </TouchableOpacity>

                <TouchableOpacity style={communityStyle.filterBtn}>
                    <Ionicons name="time" size={16} color="#444" />
                    <Text style={communityStyle.filterText}>최신</Text>
                </TouchableOpacity>
            </View>

            {/* 게시글 리스트 */}
            <SafeScroll>
                <View style={{ paddingHorizontal: 18 }}>
                    {dummy_data.map(item => (
                        <CommunityCard key={item.id} item={item} />
                    ))}
                </View>
            </SafeScroll>

        </SafeContainer>
    );
}

/* 게시글 카드 컴포넌트 */
function CommunityCard({ item }: any) {

    const imgSource = imageMap[item.imgKey];

    return (
        <Link
            href={{
                pathname: '../../(stack)/(community)/[id]',
                params: { ...item }
            }}
            asChild
        >
            <TouchableOpacity style={communityStyle.cardContainer}>

                {/* 작성자 정보 */}
                <View style={communityStyle.userRow}>
                    <View style={[communityStyle.profileCircle, { backgroundColor: item.profileColor }]}>
                        <Text style={communityStyle.profileLetter}>
                            {item.name.charAt(0)}
                        </Text>
                    </View>

                    <Text style={communityStyle.userName}>{item.name}</Text>
                    <Text style={communityStyle.dot}>•</Text>
                    <Text style={communityStyle.timeText}>{item.time}</Text>

                    <View style={communityStyle.badge}>
                        <Text style={communityStyle.badgeText}>{item.category}</Text>
                    </View>
                </View>

                {/* 제목 */}
                <Text style={communityStyle.cardTitle}>{item.title}</Text>

                {/* 내용 */}
                <Text style={communityStyle.cardContent} numberOfLines={3}>{item.content}</Text>

                {/* 이미지 */}
                {imgSource && (
                    <Image
                        source={imgSource}
                        style={communityStyle.cardImage}
                        resizeMode="cover"
                    />
                )}

                {/* 좋아요 · 댓글 · 공유 */}
                <View style={communityStyle.iconRow}>

                    <View style={communityStyle.iconBox}>
                        <Ionicons name="heart-outline" size={20} color="#FF5A79" />
                        <Text style={communityStyle.iconText}>{item.likes}</Text>
                    </View>

                    <View style={communityStyle.iconBox}>
                        <Ionicons name="chatbubble-ellipses-outline" size={20} color="#555" />
                        <Text style={communityStyle.iconText}>{item.comments}</Text>
                    </View>

                    <View style={communityStyle.iconBox}>
                        <Ionicons name="share-social-outline" size={20} color="#555" />
                    </View>
                </View>

            </TouchableOpacity>
        </Link>
    );
}
