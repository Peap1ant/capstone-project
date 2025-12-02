// app/(stack)/(challenge)/stretch.tsx

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function StretchChallengeScreen() {
  const router = useRouter();

  // 선택 스트레칭 상태
  const [doneList, setDoneList] = useState<string[]>([]);

  // 간단한 스트레칭 목록
  const stretches = [
    { id: 'neck', name: '목 스트레칭', icon: 'body-outline', bg: '#EAF1FF' },
    { id: 'shoulder', name: '어깨 스트레칭', icon: 'walk-outline', bg: '#EAF9F1' },
    { id: 'back', name: '등/허리 스트레칭', icon: 'fitness-outline', bg: '#FFF3DD' },
    { id: 'leg', name: '하체 스트레칭', icon: 'accessibility-outline', bg: '#FFECEC' },
  ];

  // 체크 토글
  const toggleStretch = (id: string) => {
    setDoneList((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FAFAFF' }}
      contentContainerStyle={{ paddingBottom: 60 }}
    >

      {/* 뒤로가기 + 제목 */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 16,
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>

        <Text style={{ fontSize: 20, fontWeight: '700', marginLeft: 10 }}>
          스트레칭
        </Text>
      </View>

      {/* 소개 박스 */}
      <View
        style={{
          backgroundColor: '#E4F0FF',
          padding: 22,
          borderRadius: 22,
          marginHorizontal: 20,
          marginTop: 10,
          elevation: 2,
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: '700' }}>작은 움직임이 큰 변화를 만든다</Text>
        <Text style={{ marginTop: 8, color: '#555', fontSize: 14, lineHeight: 20 }}>
          간단한 스트레칭으로 뭉친 근육을 풀어보세요.
          집중력과 기분이 더욱 좋아져요.
        </Text>
      </View>

      {/* 스트레칭 리스트 */}
      {stretches.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => toggleStretch(item.id)}
          style={{
            backgroundColor: item.bg,
            paddingVertical: 18,
            paddingHorizontal: 20,
            marginTop: 18,
            marginHorizontal: 20,
            borderRadius: 16,
            flexDirection: 'row',
            alignItems: 'center',
            elevation: 2,
          }}
        >
          {/* 아이콘 */}
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              backgroundColor: 'white',
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
              {item.name}
            </Text>
            <Text style={{ fontSize: 13, color: '#666', marginTop: 2 }}>
              눌러서 완료 표시하기
            </Text>
          </View>

          {/* 체크 아이콘 */}
          <Ionicons
            name={doneList.includes(item.id) ? 'checkmark-circle' : 'ellipse-outline'}
            size={22}
            color={doneList.includes(item.id) ? '#4CAF50' : '#999'}
          />
        </TouchableOpacity>
      ))}

      {/* 전체 완료 버튼 */}
      <TouchableOpacity
        style={{
          backgroundColor: '#5678FF',
          marginTop: 30,
          marginHorizontal: 20,
          paddingVertical: 18,
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 3,
        }}
        onPress={() =>
          console.log('오늘 스트레칭 완료:', doneList.length, '개 완료')
        }
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
          오늘 스트레칭 완료
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}
