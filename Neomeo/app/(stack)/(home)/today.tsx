// app/(stack)/(challenge)/today.tsx

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function TodayChallengeScreen() {
  const router = useRouter();

  // 챌린지 목록 데이터
  const challenges = [
    {
      id: 1,
      title: '만보기 (산책/햇빛)',
      desc: '걸음 수와 햇빛 시간을 체크해보세요',
      icon: 'walk',
      bg: '#E8F1FF',
      route: '/(stack)/(challenge)/walk',
    },
    {
      id: 2,
      title: '청소·환기',
      desc: '짧은 정리 · 1분 환기',
      icon: 'leaf-outline',
      bg: '#EFFFF3',
      route: '/(stack)/(challenge)/clean',
    },
    {
      id: 3,
      title: '일기·필기·캘린더',
      desc: '감정 기록 + 메모',
      icon: 'book-outline',
      bg: '#F9E8FF',
      route: '/(stack)/(challenge)/diary',
    },
    {
      id: 4,
      title: '오늘의 목표 설정·완료 체크',
      desc: '오늘 목표 하나 설정하기',
      icon: 'bullseye-outline',
      bg: '#FFEFF3',
      route: '/(stack)/(challenge)/goal',
    },
    {
      id: 5,
      title: '스트레스 줄이는 스트레칭',
      desc: '목/어깨 간단 스트레칭',
      icon: 'reload-circle-outline',
      bg: '#EEF3FF',
      route: '/(stack)/(challenge)/stretch',
    },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {/* 뒤로가기 + 제목 */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 16,
          paddingHorizontal: 20,
          borderBottomWidth: 0.3,
          borderBottomColor: '#ddd',
        }}
      >
        {/* 홈으로 돌아가기 (router.back이 안 먹는 구조 해결) */}
        <TouchableOpacity onPress={() => router.push('/(home)')}>
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 22,
            fontWeight: '700',
            marginLeft: 10,
            color: '#111',
          }}
        >
          오늘의 챌린지
        </Text>
      </View>

      {/* 상단 안내 문구 */}
      <Text
        style={{
          marginLeft: 20,
          fontSize: 14,
          color: '#666',
          marginTop: 12,
          marginBottom: 10,
        }}
      >
        작은 실천부터 함께 해요
      </Text>

      {/* 챌린지 리스트 */}
      {challenges.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => router.push(item.route)}
          style={{
            backgroundColor: item.bg,
            paddingVertical: 18,
            paddingHorizontal: 20,
            marginHorizontal: 20,
            borderRadius: 16,
            marginBottom: 14,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {/* 아이콘 */}
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              backgroundColor: '#FFFFFF',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 14,
            }}
          >
            <Ionicons name={item.icon as any} size={22} color="#5678FF" />
          </View>

          {/* 텍스트 */}
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#222' }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 13, color: '#666', marginTop: 3 }}>
              {item.desc}
            </Text>
          </View>

          {/* 오른쪽 화살표 */}
          <Ionicons name="chevron-forward" size={20} color="#777" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}