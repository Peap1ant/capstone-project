import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { LinkProps } from "expo-router";
import {styles} from '../../styles/test_style.js';

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
{ icon: "person-outline", label: "개인정보 관리", href: "/(profile)" },
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
