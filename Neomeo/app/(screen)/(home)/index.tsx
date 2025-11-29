import React from 'react';
import { TouchableOpacity, View, Text, ScrollView, Image, SafeAreaView, Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { home_tabstyles as styles } from '@/app/(styles)/home_tab_style';
import { useFetchChatTag } from '@/src/(api)/fetchChatTag';

// API 연동
import { useCommunityList } from '@/src/(api)/useCommunityList';

// 아이콘 타입 정의
type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

// 인기 콘텐츠 dummy
const dummyContents = [
  { id: 1, title: '내면의 평화 찾기', subtitle: '명상과 휴식', image: require('../../../assets/images/testing/553-1000x300.jpg') },
  { id: 2, title: '스트레스 해소법', subtitle: '간단한 체조', image: require('../../../assets/images/testing/564-500x500.jpg') },
];

// fetch chating
const chatTag = '#테스트'

const color_field = [
    { color: '#FF6363' },
    { color: '#FFA600' },
    { color: '#FFCD56' },
    { color: '#4BC0C0' },
    { color: '#36A2EB' }
];

export default function HomeScreen() {

  // 자유게시판 API에서 리스트 받기
  const { communityList, loading, error } = useCommunityList();
  const { tagChatList, error: error_tag, loading: loading_tag } = useFetchChatTag(chatTag);

  if (loading) return <Text style={{ marginTop: 50, textAlign: 'center' }}>로딩 중...</Text>;
  if (error) return <Text style={{ marginTop: 50, textAlign: 'center' }}>{error}</Text>;
  if (!communityList) return <Text style={{ marginTop: 50, textAlign: 'center' }}>데이터가 없습니다.</Text>;

  if (loading_tag) return <Text style={{ marginTop: 50, textAlign: 'center' }}>로딩 중...</Text>;
  if (error_tag) return <Text style={{ marginTop: 50, textAlign: 'center' }}>{error}</Text>;
  if (!tagChatList) return <Text style={{ marginTop: 50, textAlign: 'center' }}>데이터가 없습니다.</Text>;

  // 최신 3개만 (뒤에서부터 가져와 정렬)
  const latestPosts = communityList.slice(-3).reverse();

  const random_color = () => {
        const idx = Math.floor(Math.random() * color_field.length);
        return color_field[idx];
    };

  const popularChatRooms = tagChatList.map(item => ({
        id: item.roomId,
        title: item.name,
        tags: item.tags,
        users: item.maxUserCnt,
        color: random_color().color
    }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>

        {/*HEADER (인사 + 알림 버튼)*/}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>안녕하세요 👋</Text>
            <Text style={styles.subGreetingText}>오늘도 좋은 하루 보내세요</Text>
          </View>

          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/*인기 콘텐츠 영역*/}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📈 인기 콘텐츠</Text>
            <TouchableOpacity><Text style={styles.viewAllText}>전체보기</Text></TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {dummyContents.map((item) => (
              <TouchableOpacity key={item.id} style={styles.contentCard}>
                <Image source={item.image} style={styles.contentImage} />
                <View style={styles.contentOverlay}>
                  <Text style={styles.contentTitle}>{item.title}</Text>
                  <Text style={styles.contentSubtitle}>{item.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>


        {/* ================================================
                     오늘의 챌린지 섹션 추가
        ================================================== */}
        <View style={[styles.section, { marginTop: 10 }]}>
          <TouchableOpacity
            onPress={() => router.push('/(stack)/(home)/today')}
            style={{
              backgroundColor: '#EEF3FF',
              borderRadius: 16,
              paddingVertical: 20,
              paddingHorizontal: 18,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 5,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  backgroundColor: '#5678FF',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Ionicons name="radio-button-on" size={22} color="white" />
              </View>

              <View style={{ marginLeft: 14 }}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#222' }}>
                  오늘의 챌린지
                </Text>
                <Text style={{ fontSize: 14, color: '#666', marginTop: 2 }}>
                  작은 루틴으로 하루를 바꿔보세요
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>


        {/*인기 채팅방 추천 섹션*/}
        <View style={[styles.section, { marginTop: 16 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}># 인기 채팅방 추천</Text>
            <TouchableOpacity><Text style={styles.viewAllText}>전체보기</Text></TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {popularChatRooms.map((room) => (
              <TouchableOpacity>
                <View key={room.id} style={[styles.chatCard, { backgroundColor: room.color }]}>

                  {/* 해시태그 */}
                  <View style={styles.tagPill}>
                    <Text style={styles.tagText}>{room.tags}</Text>
                  </View>

                  {/* 제목 */}
                  <Text style={styles.chatRoomTitle}>{room.title}</Text>

                  {/* 참여자 */}
                  <View style={styles.chatUserRow}>
                    <Ionicons name="people-outline" size={13} color="#555" />
                    <Text style={styles.chatUserCount}>{room.users}명</Text>
                  </View>

                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>


        {/* 자유게시판 섹션 */}
        <View style={[styles.section, { marginTop: 30 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>자유게시판</Text>

            <Link href="/(community)" asChild>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>더보기</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <View style={styles.postList}>
            {latestPosts.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => router.push(`../../communityContent/${item.id}`)}
                style={styles.postItem}
              >

                <View style={styles.postIconCircle}>
                  <Ionicons name="list-outline" size={20} color="#5678FF" />
                </View>

                <View style={styles.postContent}>
                  <Text style={styles.postTitle} numberOfLines={1}>
                    {item.title}
                  </Text>

                  <View style={styles.postMeta}>
                    <Text style={styles.postAuthor}>{item.writerNickName || '익명'}</Text>
                    <Text style={styles.postMetaText}>• 상세 보기</Text>
                  </View>
                </View>

              </Pressable>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
