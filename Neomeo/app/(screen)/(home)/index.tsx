import React from 'react';
import { TouchableOpacity, View, Text, ScrollView, Image, SafeAreaView, Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { home_tabstyles as styles } from '@/app/(styles)/home_tab_style';
import { useCommunityList } from '@/src/(api)/useCommunityList';

// 아이콘 타입 정의
type IoniconName = React.ComponentProps<typeof Ionicons>['name'];
const MAX_TITLE_LENGTH = 18;

// 제목 길이 줄이는 함수
const truncateTitle = (title: string, maxLength: number = MAX_TITLE_LENGTH) =>
  title.length > maxLength ? `${title.slice(0, maxLength)}…` : title;

// 커뮤니티 최신 글 가져오는 커스텀 훅 (API 연동)
function useLatestCommunityMenu() {
  const { communityList, loading, error } = useCommunityList();

  const items = communityList
    .slice(0, 5)
    .reverse()
    .map((item) => ({
      icon: 'list-outline' as IoniconName,
      label: truncateTitle(item.title),
      href: {
        pathname: '../../(stack)/(community)/[id]' as const,
        params: { id: String(item.id) },
      },
    }));

  return { items, loading, error };
}

// 인기 콘텐츠 더미 데이터
const dummyContents = [
    { id: 1, title: '내면의 평화 찾기', subtitle: '명상과 휴식', image: require('../../../assets/images/testing/136-200x300.jpg') },
    { id: 2, title: '스트레스 해소법', subtitle: '간단한 체조', image: require('../../../assets/images/testing/553-1000x300.jpg') },
];

export default function HomeScreen() {
    // API 데이터 호출
    const { items, loading, error } = useLatestCommunityMenu();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                
                {/* 상단 헤더 */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greetingText}>안녕하세요</Text>
                        <Text style={styles.subGreetingText}>오늘도 좋은 하루 보내세요</Text>
                    </View>
                    <TouchableOpacity style={styles.notificationButton}>
                        <Ionicons name="notifications" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* 인기 콘텐츠 섹션 */}
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

                {/* 자유게시판 섹션 (API 연동) */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>자유게시판</Text>
                        <Link href="/(community)" asChild>
                            <TouchableOpacity>
                                <Text style={styles.viewAllText}>더보기</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                    
                    {/* 로딩 및 에러 상태 표시 */}
                    {loading && <Text style={{ textAlign: 'center', marginTop: 10, color: '#888' }}>로딩 중...</Text>}
                    {error && <Text style={{ textAlign: 'center', marginTop: 10, color: 'red' }}>{error}</Text>}
                    
                    <View style={styles.postList}>
                        {/* API 데이터 렌더링 */}
                        {items && items.map((item, index) => (
                            <Pressable key={index} onPress={() => router.push(item.href)} style={styles.postItem}>
                                <View style={styles.postIconCircle}>
                                    <Ionicons name={item.icon} size={20} color="#5678FF" />
                                </View>
                                <View style={styles.postContent}>
                                    <Text style={styles.postTitle} numberOfLines={1}>{item.label}</Text>
                                    <View style={styles.postMeta}>
                                        <Text style={styles.postAuthor}>익명</Text>
                                        <Text style={styles.postMetaText}>• 상세 보기</Text>
                                    </View>
                                </View>
                            </Pressable>
                        ))}
                        
                        {!loading && items && items.length === 0 && (
                            <Text style={{ textAlign: 'center', marginTop: 10, color: '#999' }}>게시글이 없습니다.</Text>
                        )}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}