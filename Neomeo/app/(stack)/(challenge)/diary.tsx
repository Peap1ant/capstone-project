// app/(stack)/(challenge)/diary.tsx

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function DiaryChallengeScreen() {
  const router = useRouter();

  // 감정 선택 상태
  const [emotion, setEmotion] = useState<string | null>(null);

  // 오늘 기록
  const [note, setNote] = useState('');

  // 감정 리스트
  const emotions = [
    { id: 'happy', icon: 'happy-outline', label: '좋음', color: '#FFD66E' },
    { id: 'calm', icon: 'leaf-outline', label: '차분', color: '#A4E8A3' },
    { id: 'sad', icon: 'sad-outline', label: '슬픔', color: '#AAC8FF' },
    { id: 'angry', icon: 'flame-outline', label: '화남', color: '#FF9F9F' },
  ];

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
          일기 · 필기 · 캘린더
        </Text>
      </View>

      {/* 오늘 감정 선택 */}
      <View
        style={{
          backgroundColor: 'white',
          padding: 22,
          borderRadius: 22,
          marginHorizontal: 20,
          marginTop: 10,
          elevation: 3,
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: '700', marginBottom: 14 }}>
          오늘 감정 선택
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {emotions.map((emo) => (
            <TouchableOpacity
              key={emo.id}
              onPress={() => setEmotion(emo.id)}
              style={{
                alignItems: 'center',
                padding: 10,
                borderRadius: 16,
                width: '22%',
                backgroundColor:
                  emotion === emo.id ? emo.color : '#F0F2F7',
                elevation: emotion === emo.id ? 4 : 1,
              }}
            >
              <Ionicons
                name={emo.icon as any}
                size={26}
                color={emotion === emo.id ? '#333' : '#7584A3'}
              />
              <Text style={{ marginTop: 6, fontSize: 13, fontWeight: '500' }}>
                {emo.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 일기 입력 */}
      <View
        style={{
          backgroundColor: 'white',
          padding: 22,
          borderRadius: 22,
          marginHorizontal: 20,
          marginTop: 20,
          elevation: 3,
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: '700', marginBottom: 14 }}>
          오늘의 기록
        </Text>

        <TextInput
          multiline
          placeholder="오늘 있었던 일 또는 느낌을 적어보세요."
          placeholderTextColor="#aaa"
          value={note}
          onChangeText={setNote}
          style={{
            minHeight: 120,
            borderRadius: 14,
            padding: 12,
            backgroundColor: '#F4F5F7',
            textAlignVertical: 'top',
            fontSize: 15,
          }}
        />
      </View>

      {/* 캘린더 메모 추가 */}
      <TouchableOpacity
        style={{
          backgroundColor: '#FFF4D9',
          paddingVertical: 18,
          paddingHorizontal: 22,
          marginTop: 22,
          marginHorizontal: 20,
          borderRadius: 18,
          elevation: 2,
        }}
        onPress={() => console.log("캘린더 메모 추가")}
      >
        <Text style={{ fontSize: 16, fontWeight: '600' }}>캘린더 메모 추가</Text>
        <Text style={{ fontSize: 13, color: '#666', marginTop: 4 }}>
          특정 날짜에 메모를 남길 수 있어요.
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}
