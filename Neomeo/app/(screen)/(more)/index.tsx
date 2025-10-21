import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { LinkProps } from "expo-router";
import SafeContainer from '../../../src/(components)/SafeContainer';
import {styles} from '../../(styles)/test_style';

const userData = {
name: "야옹",
location: "야~옹",
profileImage: require('../../../assets/images/testing/profile.jpg'), 
traits: [
    { title: "MBTI", value: "INTP" },
    { title: "성향", value: "내향적" },
    { title: "활동", value: "독서/코딩" },
],
};

const menuItems = [
{ icon: "person-outline", label: "개인정보 관리", href: "../(stack)/(profile)" },
];


export default function MoreScreen() {
return (
    <SafeContainer>
        <ScrollView style={styles.container}>
        <View style={styles.profileSection}>
            <Image source={userData.profileImage} style={styles.profileImage} />
            <Text style={styles.profileName}>{userData.name}</Text>
            <Text style={styles.profileLocation}>{userData.location}</Text>
        </View>
        <View style={styles.cardContainer}>
            {userData.traits.map((trait, index) => (
            <View key={index} style={styles.card}>
                <Text style={styles.cardTitle}>{trait.title}</Text>
                <Text style={styles.cardValue}>{trait.value}</Text>
            </View>
            ))}
        </View>
        <View style={styles.menuList}>
            {menuItems.map((item, index) => (
            <MenuItem key={index} icon={item.icon} label={item.label} href={item.href} />
            ))}
        </View>
        </ScrollView>
    </SafeContainer>
);
}

function MenuItem({ icon, label, href }: { icon: any; label: string; href: any }) {
return (
    <Link href={href} asChild>
    <TouchableOpacity style={styles.menuItemMovie}>
        <Ionicons name={icon} size={20} color="#555" style={{ marginRight: 10 }} />
        <Text style={styles.menuText}>{label}</Text>
    </TouchableOpacity>
    </Link>
);
}
