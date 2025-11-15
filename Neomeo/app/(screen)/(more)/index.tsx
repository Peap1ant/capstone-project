import { useEffect, useState }from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { LinkProps } from "expo-router";
import SafeScroll from '../../../src/(components)/SafeScroll';
import { styles } from '../../(styles)/main_style';
import { more_tab_styles } from '../../(styles)/more_tab_style'
import { useUserData } from '@/src/(api)/useUserData'

export default function MoreScreen() {

    const { userInfo, error, loading } = useUserData();

    if (loading) {
        return (
            <View>
                <Text>유저 정보 로딩중...</Text>
            </View>
        );
    }

    if (error || !userInfo) {
        return (
            <View>
                <Text>{error || '유저 정보를 찾을 수 없습니다.'}</Text>
            </View>
        )
    }

    console.log(userInfo)

    const userDatafield = {

        name: userInfo.nickname,
        location: "location",
        profileImage: require('../../../assets/images/react-logo.png'), 
        traits: [
            { title: "MBTI", value: "INTP" },
            { title: "성향", value: "내향적" },
            { title: "활동", value: "독서/코딩" },
        ],
    };

    const menuItems = [
        { icon: "person-outline", label: "개인정보 관리", href: "../(stack)/(profile)" },
    ];

    return (
        <SafeScroll>
            <ScrollView style={styles.container}>
            <View style={more_tab_styles.profileSection}>
                <Image source={userDatafield.profileImage} style={more_tab_styles.profileImage} />
                <Text style={more_tab_styles.profileName}>{userDatafield.name} 님</Text>
                <Text style={more_tab_styles.profileLocation}>{userDatafield.location}</Text>
            </View>
            <View style={more_tab_styles.cardContainer}>
                {userDatafield.traits.map((trait, index) => (
                <View key={index} style={more_tab_styles.card}>
                    <Text style={more_tab_styles.cardTitle}>{trait.title}</Text>
                    <Text style={more_tab_styles.cardValue}>{trait.value}</Text>
                </View>
                ))}
            </View>
            <View style={more_tab_styles.menuList}>
                {menuItems.map((item, index) => (
                <MenuItem key={index} icon={item.icon} label={item.label} href={item.href} />
                ))}
            </View>
            </ScrollView>
        </SafeScroll>
    );
}

function MenuItem({ icon, label, href }: { icon: any; label: string; href: any }) {
    return (
        <Link href={href} asChild>
        <TouchableOpacity style={more_tab_styles.menuItem}>
            <Ionicons name={icon} size={20} color="#555" style={{ marginRight: 10 }} />
            <Text style={more_tab_styles.menuText}>{label}</Text>
        </TouchableOpacity>
        </Link>
    );
}
