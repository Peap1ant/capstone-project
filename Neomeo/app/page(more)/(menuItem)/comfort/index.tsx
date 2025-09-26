import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

// --- 1. 위로의 메시지 배열 (더미 데이터) 정의 ---
const COMFORT_MESSAGES = [
  "오늘 하루도 잘 버텨줘서 고마워요. 😌",
  "당신은 생각보다 훨씬 더 강한 사람이에요. 💪",
  "잠시 쉬어가도 괜찮아요. 다시 달릴 힘을 충전하세요. 🔋",
  "별 일 없어도 괜찮아. 당신 자체로 소중하니까. ✨",
  "어제와 다른 오늘을 만들 용기를 응원해요. 🌈",
  "가끔은 멈춰 서서 지나온 길을 돌아봐도 좋아요. 🚶",
  "힘들 땐 언제든 기대도 돼요. 제가 여기 있잖아요. 🤝",
  "완벽하지 않아도 괜찮아요. 실수도 성장의 일부니까요. 🌱",
];

export default function ComfortScreen() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2. API 호출 대신 랜덤 메시지 선택 로직 실행
    const randomIndex = Math.floor(Math.random() * COMFORT_MESSAGES.length);
    const randomMessage = COMFORT_MESSAGES[randomIndex];

    // 3. 상태 업데이트
    setMessage(randomMessage);
    setLoading(false);

    // * API 호출 로직은 완전히 제거했습니다.
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#888" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💌 위로의 한마디</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

// ... (스타일 코드는 동일)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfdfd",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#444",
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    color: "#555",
    lineHeight: 28,
  },
});