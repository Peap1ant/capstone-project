import { useCallback, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

import SafeScroll from "@/src/(components)/SafeScroll";
import { styles } from "@/app/(styles)/main_style";
import { more_tab_styles } from "@/app/(styles)/more_tab_style";

import { useUserData } from "@/src/(api)/useUserData";
import { useAuth } from "@/src/(auth)/AuthContext";
import { getAllProfileItems } from "@/src/storage/profileStorage";

export default function MoreScreen() {
    const { userInfo } = useUserData();
    const { logout } = useAuth();

    const [profile, setProfile] = useState({
        mbti: "",
        tendency: "",
        hobby: ""
    });

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const stored = await getAllProfileItems();
                setProfile({
                    mbti: stored.mbti,
                    tendency: stored.tendency,
                    hobby: stored.hobby
                });
            })();
        }, [])
    );

    return (
        <SafeScroll>
            <ScrollView style={styles.container}>
                <View style={more_tab_styles.profileSection}>
                    <Image
                        source={require("../../../assets/images/react-logo.png")}
                        style={more_tab_styles.profileImage}
                    />

                    <Text style={more_tab_styles.profileNickname}>
                        {userInfo?.nickname} 님
                    </Text>

                    <Text style={more_tab_styles.profileName}>
                        안녕하세요, {userInfo?.username} 님
                    </Text>
                </View>

                <View style={more_tab_styles.cardContainer}>
                    <View style={more_tab_styles.card}>
                        <Text style={more_tab_styles.cardTitle}>MBTI</Text>
                        <Text style={more_tab_styles.cardValue}>
                            {profile.mbti || "미입력"}
                        </Text>
                    </View>

                    <View style={more_tab_styles.card}>
                        <Text style={more_tab_styles.cardTitle}>성향</Text>
                        <Text style={more_tab_styles.cardValue}>
                            {profile.tendency || "미입력"}
                        </Text>
                    </View>

                    <View style={more_tab_styles.card}>
                        <Text style={more_tab_styles.cardTitle}>활동</Text>
                        <Text style={more_tab_styles.cardValue}>
                            {profile.hobby || "미입력"}
                        </Text>
                    </View>
                </View>

                <View style={more_tab_styles.menuList}>
                    <MenuItem icon="person-outline" label="개인정보 관리" href="../(stack)/(profile)" />
                    <MenuItem icon="add" label="친구 추가" href="../(stack)/(dummy)" />
                    <MenuItem icon="albums-outline" label="내 게시판 글" href="../(stack)/(dummy)" />
                </View>

                <TouchableOpacity
                    onPress={logout}
                    style={{
                        marginTop: 20,
                        paddingHorizontal: 16,
                        paddingVertical: 10,
                        borderRadius: 8,
                        backgroundColor: "#ff5555",
                    }}
                >
                    <Text style={{ color: "white", fontWeight: "bold" }}>로그아웃</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeScroll>
    );
}

function MenuItem({ icon, label, href }: any) {
    return (
        <Link href={href} asChild>
            <TouchableOpacity style={more_tab_styles.menuItem}>
                <Ionicons name={icon} size={20} color="#555" style={{ marginRight: 10 }} />
                <Text style={more_tab_styles.menuText}>{label}</Text>
            </TouchableOpacity>
        </Link>
    );
}
