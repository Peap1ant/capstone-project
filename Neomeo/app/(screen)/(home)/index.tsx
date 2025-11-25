import React from 'react';
import { TouchableOpacity, View, Text, ScrollView, Image, SafeAreaView, Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { home_tabstyles as styles } from '@/app/(styles)/home_tab_style';

// 아이콘 타입 정의
type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

// 인기 콘텐츠 dummy
const dummyContents = [
  { id: 1, title: '내면의 평화 찾기', subtitle: '명상과 휴식', image: require('../../../assets/images/testing/profile.jpg') },
  { id: 2, title: '스트레스 해소법', subtitle: '간단한 체조', image: require('../../../assets/images/testing/profile.jpg') },
];

// 자유게시판 dummy
const dummy_data = [
  { icon: 'list-outline' as IoniconName, label: '자유게시판 글 1', href: '../../(stack)/(community)/1' },
  { icon: 'list-outline' as IoniconName, label: '자유게시판 글 2', href: '../../(stack)/(community)/2' },
  { icon: 'list-outline' as IoniconName, label: '자유게시판 글 3', href: '../../(stack)/(community)/3' },
];

// ⭐ 인기 채팅방 추천 dummy
const popularChatRooms = [
  { id: 1, tag: '#우울', title: '오늘도 힘내요', users: 24, color: '#DDE8FF' },
  { id: 2, tag: '#힐링', title: '마음의 휴식', users: 18, color: '#EDE1FF' },
  { id: 3, tag: '#공부', title: '밤샘 스터디', users: 32, color: '#FFECCF' },
];

export default function HomeScreen() {
  const items = dummy_data;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>

        {/* 상단 인사 + 알림 */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>안녕하세요 👋</Text>
            <Text style={styles.subGreetingText}>오늘도 좋은 하루 보내세요</Text>
          </View>

          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* 인기 콘텐츠 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📈 인기 콘텐츠</Text>
            <TouchableOpacity><Text style={styles.viewAllText}>전체보기</Text></TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
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

        {/* ⭐ 인기 채팅방 추천 (리뉴얼 섹션) */}
        <View style={[styles.section, { marginTop: 16 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}># 인기 채팅방 추천</Text>
            <TouchableOpacity><Text style={styles.viewAllText}>전체보기</Text></TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {popularChatRooms.map((room) => (
              <View key={room.id} style={[styles.chatCard, { backgroundColor: room.color }]}>
                
                {/* 태그 pill */}
                <View style={styles.tagPill}>
                  <Text style={styles.tagText}>{room.tag}</Text>
                </View>

                {/* 제목 */}
                <Text style={styles.chatRoomTitle}>{room.title}</Text>

                {/* 참여자 수 */}
                <View style={styles.chatUserRow}>
                  <Ionicons name="people-outline" size={13} color="#555" />
                  <Text style={styles.chatUserCount}>{room.users}명</Text>
                </View>

              </View>
            ))}
          </ScrollView>
        </View>

        {/* 자유게시판 */}
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
            {items.map((item, index) => (
              <Pressable key={index} onPress={() => router.push(item.href as any)} style={styles.postItem}>
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
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
