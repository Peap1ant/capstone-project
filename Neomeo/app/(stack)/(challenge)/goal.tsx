// app/(stack)/(challenge)/goal.tsx

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function GoalChallengeScreen() {
  const router = useRouter();

  // 목표 텍스트 & 완료 여부
  const [goal, setGoal] = useState('');
  const [done, setDone] = useState(false);

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
          오늘의 목표
        </Text>
      </View>

      {/* 소개 박스 */}
      <View
        style={{
          backgroundColor: '#E5EDFF',
          padding: 22,
          borderRadius: 22,
          marginHorizontal: 20,
          marginTop: 10,
          elevation: 2,
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: '700' }}>하루 목표 세우기</Text>
        <Text style={{ marginTop: 8, color: '#555', fontSize: 14, lineHeight: 20 }}>
          오늘 하루 한 가지 목표만 세우고 실천해봐요.
        </Text>
      </View>

      {/* 목표 입력 */}
      <View
        style={{
          backgroundColor: 'white',
          padding: 22,
          borderRadius: 22,
          marginHorizontal: 20,
          marginTop: 20,
          elevation: 2,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
          오늘의 목표
        </Text>

        <TextInput
          placeholder="예: 오늘 코딩 1시간 하기"
          placeholderTextColor="#a6a6a6"
          value={goal}
          onChangeText={setGoal}
          style={{
            backgroundColor: '#F3F4F7',
            padding: 14,
            borderRadius: 14,
            fontSize: 15,
          }}
        />
      </View>

      {/* 완료 체크 */}
      <TouchableOpacity
        onPress={() => setDone(!done)}
        style={{
          backgroundColor: '#FFFFFF',
          paddingVertical: 18,
          paddingHorizontal: 20,
          marginTop: 16,
          marginHorizontal: 20,
          borderRadius: 16,
          flexDirection: 'row',
          alignItems: 'center',
          elevation: 2,
        }}
      >
        <Ionicons
          name={done ? 'checkbox' : 'square-outline'}
          size={24}
          color={done ? '#4CAF50' : '#939AA8'}
        />

        <Text style={{ marginLeft: 12, fontSize: 16, fontWeight: '500' }}>
          목표 완료했어요
        </Text>
      </TouchableOpacity>

      {/* 저장 버튼 */}
      <TouchableOpacity
        onPress={() => console.log('오늘 목표 저장:', goal)}
        style={{
          backgroundColor: '#5680FF',
          marginTop: 30,
          marginHorizontal: 20,
          paddingVertical: 18,
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 3,
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
          오늘 목표 저장
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}
