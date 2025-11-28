// app/(stack)/(challenge)/clean.tsx

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function CleanChallengeScreen() {
  const router = useRouter();

  // 1분 환기/정리 타이머 상태 (UI 표시용)
  const [ventTimer, setVentTimer] = useState(false);
  const [cleanTimer, setCleanTimer] = useState(false);

  // 간단 기능 예시 (나중에 타이머 기능 추가 가능)
  const startVent = () => {
    setVentTimer(true);
    Alert.alert("환기 시작!", "1분 동안 창문을 열어 환기해보세요.");
    setTimeout(() => setVentTimer(false), 60000);
  };

  const startClean = () => {
    setCleanTimer(true);
    Alert.alert("정리 시작!", "짧은 정리에 도전해보세요.");
    setTimeout(() => setCleanTimer(false), 30000);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#F7F9FF' }}
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
          청소 · 환기
        </Text>
      </View>

      {/* 소개 카드 */}
      <View
        style={{
          backgroundColor: '#DFF4EE',
          borderRadius: 22,
          marginHorizontal: 20,
          marginTop: 6,
          padding: 22,
          elevation: 3,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 10 }}>
          오늘의 환경 리프레시
        </Text>
        <Text style={{ fontSize: 14, color: '#444', lineHeight: 20 }}>
          청소와 환기는 정신 건강과 작업 능률을 높이는 데 큰 도움이 돼요.
          가볍게 시작해보세요.
        </Text>
      </View>

      {/* 1분 환기하기 */}
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          paddingVertical: 18,
          paddingHorizontal: 20,
          marginTop: 20,
          marginHorizontal: 20,
          borderRadius: 16,
          flexDirection: 'row',
          alignItems: 'center',
          elevation: 2,
        }}
        onPress={startVent}
      >
        <Ionicons
          name={ventTimer ? 'checkmark-circle' : 'leaf-outline'}
          size={22}
          color={ventTimer ? '#4CAF50' : '#4DC98D'}
        />
        <Text style={{ marginLeft: 12, fontSize: 16, fontWeight: '500' }}>
          1분 환기하기
        </Text>
      </TouchableOpacity>

      {/* 짧은 정리하기 */}
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          paddingVertical: 18,
          paddingHorizontal: 20,
          marginTop: 14,
          marginHorizontal: 20,
          borderRadius: 16,
          flexDirection: 'row',
          alignItems: 'center',
          elevation: 2,
        }}
        onPress={startClean}
      >
        <Ionicons
          name={cleanTimer ? 'checkbox' : 'sparkles-outline'}
          size={22}
          color={cleanTimer ? '#4CAF50' : '#5678FF'}
        />
        <Text style={{ marginLeft: 12, fontSize: 16, fontWeight: '500' }}>
          짧은 정리하기
        </Text>
      </TouchableOpacity>

      {/* 5분 타이머 */}
      <TouchableOpacity
        style={{
          backgroundColor: '#FFF7D6',
          paddingVertical: 20,
          paddingHorizontal: 22,
          marginTop: 18,
          marginHorizontal: 20,
          borderRadius: 20,
          elevation: 2,
        }}
        onPress={() => Alert.alert("5분 타이머", "이 기능은 추후 추가됩니다!")}
      >
        <Text style={{ fontSize: 17, fontWeight: '700' }}>5분 타이머</Text>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 6 }}>
          부담 없이 청소를 시작해보는 데 도움을 줘요.
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}
