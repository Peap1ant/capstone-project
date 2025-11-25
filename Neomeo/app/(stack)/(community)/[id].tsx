import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { useCommunityData } from "@/src/(api)/useCommunityData";
import { deleteCommunityData } from "@/src/(api)/deleteCommunityData";
import { useUserData } from "@/src/(api)/useUserData"; // 🔹 로그인 유저 정보
import SafeContainer from "@/src/(components)/SafeContainer";
import SafeScroll from "@/src/(components)/SafeScroll";

export default function CommunityDetailScreen() {
    const { id } = useLocalSearchParams();
    const numericId = Number(id);

    // 게시글 정보
    const { communityInfo, loading, error } = useCommunityData(numericId);

    // 삭제 API 훅
    const { deleteCommunity, loading_del, error_del } = deleteCommunityData();

    // 로그인 유저 정보
    const {
        userInfo,
        loading: userLoading,
        error: userError,
    } = useUserData();

    // 🔹 작성자인지 여부 (닉네임 기준)
    const isAuthor =
        !!communityInfo &&
        !!userInfo &&
        userInfo.nickname === communityInfo.writerNickName;

    const handleDelete = () => {
        if (!communityInfo) return;

        if (!isAuthor) {
            Alert.alert("권한 없음", "내가 작성한 글만 삭제할 수 있습니다.");
            return;
        }

        Alert.alert("글 삭제", "정말로 이 글을 삭제하시겠습니까?", [
            { text: "취소", style: "cancel" },
            {
                text: "삭제",
                style: "destructive",
                onPress: async () => {
                    try {
                        await deleteCommunity(numericId);
                        router.replace("../../(screen)/(community)");
                    } catch (e) {
                        Alert.alert("삭제 실패", "삭제 중 오류가 발생했습니다.");
                    }
                },
            },
        ]);
    };

    const handleEdit = () => {
        if (!communityInfo) return;

        if (!isAuthor) {
            Alert.alert("권한 없음", "내가 작성한 글만 수정할 수 있습니다.");
            return;
        }

        // 🔹 여기서 수정 화면으로 이동 (라우팅 경로는 프로젝트 구조에 맞게 바꿔줘!)
        // 예시: /community/edit/[id]
        router.push({
            pathname: "/(screen)/community/edit",
            params: { id: communityInfo.id },
        } as any);
    };

    // 로딩 / 에러 처리
    if (loading || userLoading) {
        return (
            <SafeContainer>
                <View style={styles.center}>
                    <ActivityIndicator />
                    <Text style={styles.subText}>로딩 중...</Text>
                </View>
            </SafeContainer>
        );
    }

    if (error || userError) {
        return (
            <SafeContainer>
                <View style={styles.center}>
                    <Text style={styles.errorText}>{error || userError}</Text>
                </View>
            </SafeContainer>
        );
    }

    if (!communityInfo) {
        return (
            <SafeContainer>
                <View style={styles.center}>
                    <Text>데이터가 없습니다.</Text>
                </View>
            </SafeContainer>
        );
    }

    return (
        <SafeContainer>
            <SafeScroll>
                <View style={styles.page}>
                    {/* 헤더 */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.replace("../../(screen)")}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.backArrow}>←</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>커뮤니티</Text>
                    </View>

                    {/* 게시글 카드 */}
                    <View style={styles.card}>
                        <Text style={styles.title}>{communityInfo.title}</Text>

                        <Text style={styles.metaText}>
                            작성자: {communityInfo.writerNickName}
                        </Text>

                        <View style={styles.divider} />

                        <Text style={styles.content}>{communityInfo.Content}</Text>

                        {/* 작성자가 아닐 때 안내 */}
                        {!isAuthor && (
                            <Text style={styles.noticeText}>
                                내가 작성한 글이 아니므로 수정/삭제할 수 없습니다.
                            </Text>
                        )}

                        {/* 🔹 버튼들은 카드 우측 하단에 정렬, 작성자에게만 노출 */}
                        {isAuthor && (
                            <View style={styles.buttonRow}>
                                {error_del ? (
                                    <Text style={styles.errorTextSmall}>{error_del}</Text>
                                ) : null}

                                {/* 수정 버튼 */}
                                <TouchableOpacity
                                    onPress={handleEdit}
                                    activeOpacity={0.85}
                                    style={styles.editButton}
                                >
                                    <Text style={styles.editText}>수정</Text>
                                </TouchableOpacity>

                                {/* 삭제 버튼 */}
                                <TouchableOpacity
                                    onPress={handleDelete}
                                    disabled={loading_del}
                                    activeOpacity={0.85}
                                    style={[
                                        styles.deleteButton,
                                        loading_del && styles.deleteButtonDisabled,
                                    ]}
                                >
                                    <Text style={styles.deleteText}>
                                        {loading_del ? "삭제 중..." : "삭제"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </SafeScroll>
        </SafeContainer>
    );
}

const styles = StyleSheet.create({
    page: {
        paddingHorizontal: 12,
        paddingBottom: 32,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 24,
        paddingBottom: 12,
        gap: 8,
    },
    backButton: {
        paddingVertical: 6,
        paddingRight: 8,
    },
    backArrow: {
        fontSize: 26,
        fontWeight: "600",
        color: "#0d121b",
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "700",
    },
    card: {
        marginTop: 12,
        borderRadius: 16,
        backgroundColor: "#FFFFFF",
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 7,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
    },
    metaText: {
        marginTop: 4,
        fontSize: 12,
        color: "#6B7280",
    },
    divider: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginVertical: 12,
    },
    content: {
        fontSize: 15,
        lineHeight: 22,
        color: "#111827",
    },
    noticeText: {
        marginTop: 16,
        fontSize: 12,
        color: "#6B7280",
    },

    // 버튼들 한 줄에, 우측 끝 정렬
    buttonRow: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 8,
    },
    editButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#3B82F6",
        backgroundColor: "#FFFFFF",
    },
    editText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#3B82F6",
    },
    deleteButton: {
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: "#EF4444",
    },
    deleteButtonDisabled: {
        opacity: 0.6,
    },
    deleteText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#FFFFFF",
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    subText: {
        marginTop: 8,
        fontSize: 14,
    },
    errorText: {
        fontSize: 14,
        color: "red",
        textAlign: "center",
        paddingHorizontal: 24,
    },
    errorTextSmall: {
        fontSize: 12,
        color: "#DC2626",
    },
});
