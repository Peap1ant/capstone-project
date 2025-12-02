// app/(stack)/(challenge)/walk.tsx

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function WalkChallengeScreen() {
  const router = useRouter();

  // 걸음 수, 햇빛 시간 상태
  const [steps, setSteps] = useState(0);
  const stepGoal = 10000;

  const [sunTime, setSunTime] = useState(0);
  const sunGoal = 30;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#F6F8FF' }}
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
          만보기 (산책/햇빛)
        </Text>
      </View>

      {/* 걸음 수 카드 */}
      <View
        style={{
          backgroundColor: '#50C9FF',
          borderRadius: 22,
          margin: 20,
          padding: 24,
          elevation: 4,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              backgroundColor: 'rgba(255,255,255,0.25)',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}
          >
            <Ionicons name="walk-outline" size={22} color="white" />
          </View>

          <Text style={{ fontSize: 17, fontWeight: '600', color: 'white' }}>
            오늘의 걸음 수
          </Text>
        </View>

        <Text
          style={{
            fontSize: 48,
            fontWeight: '700',
            color: 'white',
            marginTop: 10,
          }}
        >
          {steps.toLocaleString()}
        </Text>

        <Text style={{ color: 'white', marginBottom: 8 }}>
          목표: {stepGoal.toLocaleString()} 걸음
        </Text>

        {/* 진행률 바 */}
        <View
          style={{
            height: 8,
            borderRadius: 10,
            backgroundColor: 'rgba(255,255,255,0.35)',
            marginTop: 8,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              height: '100%',
              width: `${(steps / stepGoal) * 100}%`,
              backgroundColor: 'white',
            }}
          />
        </View>

        <Text style={{ marginTop: 10, color: 'white' }}>
          {stepGoal - steps} 걸음 남았어요
        </Text>
      </View>

      {/* 햇빛 쬐기 카드 */}
      <View
        style={{
          backgroundColor: '#FFEFB7',
          borderRadius: 22,
          marginHorizontal: 20,
          padding: 24,
          elevation: 4,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>햇빛 쬐기</Text>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>목표 {sunGoal}분</Text>
        </View>

        <Text style={{ fontSize: 36, fontWeight: '700', marginTop: 10 }}>
          {sunTime}분
        </Text>
        <Text style={{ color: '#666' }}>오늘의 햇빛 시간</Text>

        <View
          style={{
            height: 7,
            borderRadius: 10,
            backgroundColor: '#E6E6E6',
            marginTop: 12,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              height: '100%',
              width: `${(sunTime / sunGoal) * 100}%`,
              backgroundColor: '#FFC44D',
            }}
          />
        </View>
      </View>

      {/* 산책 기록 추가 */}
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          marginTop: 20,
          marginHorizontal: 20,
          paddingVertical: 18,
          borderRadius: 16,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 18,
          elevation: 2,
        }}
        onPress={() => console.log('산책 기록 추가')}
      >
        <Ionicons name="add-circle-outline" size={22} color="#5588FF" />
        <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: '500' }}>
          산책 기록 추가
        </Text>
      </TouchableOpacity>

      {/* 오늘 산책 완료 */}
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          marginTop: 12,
          marginHorizontal: 20,
          paddingVertical: 18,
          borderRadius: 16,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 18,
          elevation: 2,
        }}
        onPress={() => console.log('오늘의 산책 완료')}
      >
        <Ionicons name="checkmark-circle" size={22} color="#4CAF50" />
        <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: '500' }}>
          오늘의 산책 완료
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}