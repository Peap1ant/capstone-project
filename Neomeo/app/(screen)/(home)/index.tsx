import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { LinkProps } from "expo-router";

//  더미 데이터 (나중에 API 연동 예정)
const userData = {
  name: "안광현",
  location: "ChungJu, Korea",
  profileImage: require('../../../assets/images/agh.jpg'), 
  traits: [
    { title: "MBTI", value: "INTP" },
    { title: "성향", value: "내향적" },
    { title: "활동", value: "독서/코딩" },
  ],
};

const menuItems = [
  { icon: "person-outline", label: "개인정보 관리", href: "/profile" },
  { icon: "flag-outline", label: "챌린지", href: "/challenge" },
  { icon: "compass-outline", label: "가까운 모임 찾기", href: "/community" },
  { icon: "medkit-outline", label: "근처 병원 찾기", href: "/hospital" },
  { icon: "chatbubble-ellipses-outline", label: "위로되는 글", href: "/comfort" },
  { icon: "lock-closed-outline", label: "고해성사 (익명)", href: "/confession" },
  { icon: "people-outline", label: "동아리", href: "/club" },
  { icon: "log-out-outline", label: "로그아웃", href: "/logout" }
];


export default function MoreScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* 1. 프로필 */}
      <View style={styles.profileSection}>
        <Image source={userData.profileImage} style={styles.profileImage} />
        <Text style={styles.profileName}>{userData.name}</Text>
        <Text style={styles.profileLocation}>{userData.location}</Text>
      </View>

      {/* 2. 성향 카드 */}
      <View style={styles.cardContainer}>
        {userData.traits.map((trait, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{trait.title}</Text>
            <Text style={styles.cardValue}>{trait.value}</Text>
          </View>
        ))}
      </View>

      {/* 3. 메뉴 */}
      <View style={styles.menuList}>
        {menuItems.map((item, index) => (
          <MenuItem key={index} icon={item.icon} label={item.label} href={item.href} />
        ))}
      </View>
    </ScrollView>
  );
}

// ✅ 메뉴 아이템 컴포넌트
function MenuItem({ icon, label, href }: { icon: any; label: string; href: any }) {
 return (
    <Link href={href} asChild>
      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name={icon} size={20} color="#555" style={{ marginRight: 10 }} />
        <Text style={styles.menuText}>{label}</Text>
      </TouchableOpacity>
    </Link>
  );
}

// ✅ 스타일
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  profileSection: { alignItems: "center", paddingVertical: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  profileName: { fontSize: 20, fontWeight: "bold" },
  profileLocation: { fontSize: 14, color: "#777" },
  cardContainer: { flexDirection: "row", justifyContent: "space-around", marginVertical: 20 },
  card: {
    backgroundColor: "#EAF3FF",
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  cardTitle: { fontSize: 14, color: "#555", marginBottom: 5 },
  cardValue: { fontSize: 16, fontWeight: "bold", color: "#333" },
  menuList: { marginTop: 10 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: { fontSize: 16, color: "#333" },
});
