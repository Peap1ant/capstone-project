import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Link } from "expo-router"

import SafeScroll from "@/src/(components)/SafeScroll"
import { useUserData } from "@/src/(api)/useUserData"
import { useAuth } from "@/src/(auth)/AuthContext"

const colors = {
    primary: "#6A8CFF",
    accent: "#1E90FF",
    dark: "#333333",
    muted: "#888888",
    border: "#E0E0E0",
    background: "#F8FAFC",
}

type MenuSectionType = "account" | "social" | "content" | "support"

type MenuItem = {
    icon: keyof typeof Ionicons.glyphMap
    label: string
    href: string
    section: MenuSectionType
}

const menuItems: MenuItem[] = [
    { icon: "person-outline", label: "개인정보 관리", href: "../(stack)/(profile)", section: "account" },
    { icon: "create-outline", label: "프로필 수정", href: "../(stack)/(dummy)", section: "account" },
    { icon: "person-add-outline", label: "친구 추가", href: "../(stack)/(dummy)", section: "social" },
    { icon: "albums-outline", label: "내 게시판 글", href: "../(stack)/(dummy)", section: "content" },
    { icon: "bookmark-outline", label: "스크랩한 글", href: "../(stack)/(dummy)", section: "content" },
    { icon: "help-circle-outline", label: "도움 받기", href: "../(stack)/(dummy)", section: "support" },
    { icon: "book-outline", label: "도움이 되는 말", href: "../(stack)/(dummy)", section: "support" },
]

export default function MoreScreen() {
    const { userInfo, error, loading } = useUserData()
    const { logout } = useAuth()

    if (loading) return <Text style={styles.centerText}>로딩 중...</Text>
    if (error) return <Text style={styles.centerText}>{error}</Text>
    if (!userInfo) return <Text style={styles.centerText}>데이터가 없습니다.</Text>

    const userData = {
        nickname: userInfo.nickname,
        name: userInfo.username,
        profileImage: require("../../../assets/images/react-logo.png"),
        traits: [
            { title: "MBTI", value: "INTP" },
            { title: "성향", value: "내향적" },
            { title: "활동", value: "독서/코딩" },
        ],
    }

    const handleLogout = async () => {
        await logout()
    }

    const accountItems = menuItems.filter((item) => item.section === "account")
    const socialItems = menuItems.filter((item) => item.section === "social")
    const contentItems = menuItems.filter((item) => item.section === "content")
    const supportItems = menuItems.filter((item) => item.section === "support")

    return (
        <SafeScroll>
            <ScrollView contentContainerStyle={styles.container}>
                {/* 프로필 카드 */}
                <View style={styles.profileCard}>
                    <View style={styles.profileRow}>
                        <View style={styles.profileImageWrapper}>
                            <Image source={userData.profileImage} style={styles.profileImage} />
                            <View style={styles.onlineDotWrapper}>
                                <View style={styles.onlineDot} />
                            </View>
                        </View>
                        <View style={styles.profileTextWrapper}>
                            <Text style={styles.profileNickname}>
                                {userData.nickname} <Text style={styles.profileNicknameSuffix}>님</Text>
                            </Text>
                            <Text style={styles.profileName}>안녕하세요, {userData.name} 님</Text>
                        </View>
                    </View>
                </View>

                {/* 특성 카드 3개 */}
                <View style={styles.traitsContainer}>
                    {userData.traits.map((trait, index) => (
                        <View
                            key={index}
                            style={[
                                styles.traitCard,
                                index % 2 === 0 ? styles.traitCardPrimary : styles.traitCardAccent,
                            ]}
                        >
                            <Text style={styles.traitTitle}>{trait.title}</Text>
                            <Text
                                style={[
                                    styles.traitValue,
                                    index % 2 === 0 ? styles.traitValuePrimary : styles.traitValueAccent,
                                ]}
                            >
                                {trait.value}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* 메뉴 섹션들 */}
                <View style={styles.sectionsWrapper}>
                    <MenuSection title="계정" items={accountItems} accentColor={colors.primary} />
                    <MenuSection title="소셜" items={socialItems} accentColor={colors.accent} />
                    <MenuSection title="내 콘텐츠" items={contentItems} accentColor={colors.primary} />
                    <MenuSection title="지원" items={supportItems} accentColor={colors.accent} />
                </View>

                {/* 로그아웃 버튼 */}
                <View style={styles.logoutWrapper}>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Ionicons name="log-out-outline" size={18} color={colors.muted} style={{ marginRight: 6 }} />
                        <Text style={styles.logoutText}>로그아웃</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.versionText}>Neomeo v1.0.0</Text>
            </ScrollView>
        </SafeScroll>
    )
}

function MenuSection({
                         title,
                         items,
                         accentColor,
                     }: {
    title: string
    items: MenuItem[]
    accentColor: string
}) {
    if (items.length === 0) return null

    return (
        <View style={styles.sectionCard}>
            <View style={[styles.sectionHeader, { backgroundColor: "#F4F6FB" }]}>
                <Text style={[styles.sectionTitle, { color: accentColor }]}>{title}</Text>
            </View>
            <View>
                {items.map((item, index) => (
                    <MenuItemRow
                        key={index}
                        item={item}
                        accentColor={accentColor}
                        isLast={index === items.length - 1}
                    />
                ))}
            </View>
        </View>
    )
}

function MenuItemRow({
                         item,
                         accentColor,
                         isLast,
                     }: {
    item: MenuItem
    accentColor: string
    isLast: boolean
}) {
    return (
        <Link href={item.href}>
            <TouchableOpacity
                style={[
                    styles.menuItem,
                    !isLast && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
                ]}
            >
                <View
                    style={[
                        styles.menuIconWrapper,
                        { backgroundColor: `${accentColor}20` },
                    ]}
                >
                    <Ionicons name={item.icon} size={18} color={accentColor} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Ionicons name="chevron-forward-outline" size={16} color={colors.muted} />
            </TouchableOpacity>
        </Link>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 32,
        backgroundColor: colors.background,
    },
    centerText: {
        flex: 1,
        textAlign: "center",
        textAlignVertical: "center",
    },
    profileCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    profileRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    profileImageWrapper: {
        position: "relative",
        marginRight: 16,
    },
    profileImage: {
        width: 72,
        height: 72,
        borderRadius: 36,
        borderWidth: 3,
        borderColor: "#FFFFFF",
    },
    onlineDotWrapper: {
        position: "absolute",
        bottom: 0,
        right: 0,
        padding: 3,
        borderRadius: 999,
        backgroundColor: colors.accent,
        borderWidth: 2,
        borderColor: "#FFFFFF",
    },
    onlineDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#FFFFFF",
    },
    profileTextWrapper: {
        flex: 1,
    },
    profileNickname: {
        fontSize: 18,
        fontWeight: "700",
        color: "#FFFFFF",
        // 닉네임 배경용으로 살짝 컬러
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 6,
        backgroundColor: colors.primary,
        alignSelf: "flex-start",
        overflow: "hidden",
    },
    profileNicknameSuffix: {
        fontWeight: "400",
        opacity: 0.9,
    },
    profileName: {
        marginTop: 8,
        fontSize: 14,
        color: colors.dark,
    },
    traitsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    traitCard: {
        flex: 1,
        marginHorizontal: 4,
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 12,
        borderWidth: 1,
    },
    traitCardPrimary: {
        backgroundColor: "#EDF1FF",
        borderColor: "#D6E0FF",
    },
    traitCardAccent: {
        backgroundColor: "#E6F3FF",
        borderColor: "#C9E2FF",
    },
    traitTitle: {
        fontSize: 11,
        color: colors.muted,
        textTransform: "uppercase",
    },
    traitValue: {
        marginTop: 4,
        fontSize: 14,
        fontWeight: "600",
    },
    traitValuePrimary: {
        color: colors.primary,
    },
    traitValueAccent: {
        color: colors.accent,
    },
    sectionsWrapper: {
        gap: 12,
    },
    sectionCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: "hidden",
    },
    sectionHeader: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: `${colors.border}80`,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 1,
        textTransform: "uppercase",
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    menuIconWrapper: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    menuLabel: {
        flex: 1,
        fontSize: 14,
        color: colors.dark,
    },
    logoutWrapper: {
        marginTop: 20,
        alignItems: "center",
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 999,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: colors.border,
    },
    logoutText: {
        fontSize: 13,
        color: colors.muted,
        fontWeight: "600",
    },
    versionText: {
        marginTop: 10,
        textAlign: "center",
        fontSize: 11,
        color: `${colors.muted}99`,
    },
})
