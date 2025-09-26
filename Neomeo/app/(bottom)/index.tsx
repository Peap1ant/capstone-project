import { Tabs } from "expo-router";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* 배너 */}
      <View style={styles.banner}>
        <Image 
          source={{ uri: "https://via.placeholder.com/300x150" }}
          style={styles.bannerImage}
        />
      </View>

      {/* 공지사항 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>공지사항</Text>
        <Text>[공지] 커뮤니티 가이드라인 개정</Text>
        <Text>[공지] 신규 매칭 기능 오픈 안내</Text>
      </View>

      {/* 자유게시판 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>자유게시판</Text>
        <Text>"오늘 작은 산책을 다녀왔어요 🌿"</Text>
        <Text>"오랜만에 좋아하는 음악을 들었어요"</Text>
      </View>

      {/* 채팅 바로가기 버튼 */}
      <TouchableOpacity style={styles.chatButton}>
        <Text style={styles.chatText}>채팅 하러 가기 💬</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  banner: { alignItems: "center", marginBottom: 16 },
  bannerImage: { width: 300, height: 150, borderRadius: 8 },
  section: { marginBottom: 20 },
  sectionTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 8 },
  chatButton: {
    marginTop: 20,
    backgroundColor: "#6C63FF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  chatText: { color: "#fff", fontWeight: "bold" },
});
