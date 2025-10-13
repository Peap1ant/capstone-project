import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { styles } from '../../../styles/test_style.js';
import { useAuth } from '../../../context/AuthContext'; // [1단계] 로그아웃 기능을 위해 추가

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
  { icon: "person-outline", label: "개인정보 관리", href: "/(screen)/(more)/profile" },
  { icon: "flag-outline", label: "챌린지", href: "/(screen)/(more)/challenge" },
  { icon: "compass-outline", label: "가까운 모임 찾기", href: "/(screen)/(more)/community" },
  { icon: "medkit-outline", label: "근처 병원 찾기", href: "/(screen)/(more)/hospital" },
  { icon: "chatbubble-ellipses-outline", label: "위로되는 글", href: "/(screen)/(more)/comfort" },
  { icon: "lock-closed-outline", label: "고해성사 (익명)", href: "/(screen)/(more)/confession" },
  { icon: "people-outline", label: "동아리", href: "/(screen)/(more)/club" },
  // 로그아웃 항목은 href가 필요 없지만, 일관성을 위해 그대로 둡니다.
  { icon: "log-out-outline", label: "로그아웃", href: "#" } 
];


export default function MoreScreen() {
  // [2단계] AuthContext에서 logout 함수를 가져옵니다.
  const { logout } = useAuth();

  // [3단계] 로그아웃 확인 창을 띄우고, 확인 시 logout 함수를 실행합니다.
  const handleLogout = () => {
    Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
      { text: "취소", style: "cancel" },
      { text: "확인", onPress: () => logout() }
    ]);
  };

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
        {menuItems.map((item, index) => {
          // [4단계] "로그아웃" 레이블일 경우, 특별한 버튼을 렌더링합니다.
          if (item.label === "로그아웃") {
            return (
              <TouchableOpacity key={index} style={styles.menuItem} onPress={handleLogout}>
                <Ionicons name={item.icon as any} size={22} color="#FF3B30" style={{ marginRight: 10 }} />
                <Text style={[styles.menuText, { color: '#FF3B30' }]}>{item.label}</Text>
              </TouchableOpacity>
            );
          }
          // 그 외의 모든 메뉴는 기존의 MenuItem 컴포넌트를 사용합니다.
          return <MenuItem key={index} icon={item.icon} label={item.label} href={item.href} />;
        })}
      </View>
    </ScrollView>
  );
}

// ✅ 메뉴 아이템 컴포넌트 (수정할 필요 없음)
function MenuItem({ icon, label, href }: { icon: any; label: string; href: any }) {
  return (
    <Link href={href} asChild>
      <TouchableOpacity style={styles.menuItem}>
        <Ionicons name={icon} size={22} color="#555" style={{ marginRight: 10 }} />
        <Text style={styles.menuText}>{label}</Text>
      </TouchableOpacity>
    </Link>
  );
}