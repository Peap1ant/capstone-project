import React, { useEffect, useState } from "react";
import { EditorToolbar } from "./EditorToolbar"; // 또는 같은 파일에 포함
import {
    View,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
} from "react-native";

import SafeContainer from "@/src/(components)/SafeContainer";
import SafeScroll from "@/src/(components)/SafeScroll";

import { api } from "@/src/(api)/api";
import { router, useLocalSearchParams } from "expo-router";
import { useUserData } from "@/src/(api)/useUserData";
import { useCommunityData } from "@/src/(api)/useCommunityData";

export default function CreateContent() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const { id } = useLocalSearchParams();
    const numericId = Number(id);

    const dateTime = (date = new Date()) => {
        const iso = date.toISOString();
        const base = iso.slice(0, 23).replace("T", " ");
        return base + "000";
    };

    const { userInfo, error, loading } = useUserData();
    const { communityInfo, loading: loading_comm, error: error_comm } = useCommunityData(numericId);

    useEffect(() => {
        if (communityInfo) {
            setTitle(communityInfo.title || "");
            setContent(communityInfo.Content || "");
        }
    }, [communityInfo]);

    if (loading || loading_comm) {
        return (
            <SafeContainer>
                <View style={styles.center}>
                    <ActivityIndicator />
                    <Text style={styles.loadingText}>
                        유저 정보 & 커뮤니티 정보 로딩중...
                    </Text>
                </View>
            </SafeContainer>
        );
    }

    if (error || !userInfo || !communityInfo) {
        return (
            <SafeContainer>
                <View style={styles.center}>
                    <Text style={styles.errorText}>
                        에러: {error || "유저 정보 또는 커뮤니티 정보를 찾을 수 없습니다."}
                    </Text>
                </View>
            </SafeContainer>
        );
    }

    const handleCreateContent = async () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert("입력 오류", "제목과 내용을 모두 입력해주세요.");
            return;
        }

        const json_field = {
            title: title.trim(),
            content: content.trim(),
            created_date: dateTime(),
            updated_date: dateTime(),
            user_id: userInfo.nickname,
        };

        try {
            setSubmitting(true);
            await api.put(`/api/boards/${numericId}`, json_field);
            router.replace("../../(screen)/(community)/");
        } catch (error: any) {
            console.log("게시물 게시 실패", error);
            Alert.alert("오류", "게시물 등록 중 문제가 발생했습니다.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <SafeContainer>
            <SafeScroll>
                {/* 페이지 기본 좌우 패딩만 살짝 */}
                <View style={styles.page}>

                    {/* HEADER */}
                    <View className="header" style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.replace("../../(screen)")}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.backArrow}>←</Text>
                        </TouchableOpacity>

                        <Text style={styles.headerTitle}>글 수정</Text>
                    </View>

                    {/* CARD (거의 풀폭) */}
                    <View style={styles.card}>
                        {/* 제목 + 미디어 버튼 */}
                        <View style={styles.titleRow}>
                            <TextInput
                                style={styles.titleInput}
                                onChangeText={setTitle}
                                value={title}
                                placeholder="게시글 제목"
                                placeholderTextColor="#9CA3AF"
                            />

                            <TouchableOpacity style={styles.mediaButton} activeOpacity={0.8}>
                                <Text style={styles.mediaButtonText}>Add Media</Text>
                            </TouchableOpacity>
                        </View>

                        {/* 에디터 영역 */}
                        <View style={styles.editorWrapper}>
                            <EditorToolbar />

                            <TextInput
                                style={styles.contentInput}
                                onChangeText={setContent}
                                value={content}
                                placeholder="게시글 내용을 입력해주세요"
                                placeholderTextColor="#9CA3AF"
                                multiline
                                textAlignVertical="top"
                            />
                        </View>

                        {/* 올리기 버튼 */}
                        <View style={styles.submitRow}>
                            <TouchableOpacity
                                onPress={handleCreateContent}
                                disabled={submitting}
                                activeOpacity={0.85}
                                style={[
                                    styles.submitButton,
                                    submitting && styles.submitButtonDisabled,
                                ]}
                            >
                                <Text style={styles.submitButtonText}>
                                    {submitting ? "올리는 중..." : "수정하기"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </SafeScroll>
        </SafeContainer>
    );
}

const styles = StyleSheet.create({
    // 🔹 전체 페이지 좌우 패딩만 살짝
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

    // 🔹 가로 여백 줄임: marginHorizontal 제거 → 화면 거의 꽉 차게
    card: {
        marginTop: 12,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 7,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },

    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 16,
    },
    titleInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 20,
        fontWeight: "700",
        width:'70%'
    },
    mediaButton: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: "rgba(19, 91, 236, 0.1)",
    },
    mediaButtonText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#135bec",
    },

    editorWrapper: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 14,
        marginTop: 4,
        overflow: "hidden",
    },
    toolbar: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
        backgroundColor: "#F9FAFB",
        gap: 12,
    },
    toolbarText: {
        fontSize: 16,
        color: "#4B5563",
    },
    contentInput: {
        minHeight: 500,
        paddingHorizontal: 14,
        paddingVertical: 14,
        fontSize: 16,
    },

    submitRow: {
        marginTop: 20,
        alignItems: "flex-end",
    },
    submitButton: {
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: "#135bec",
    },
    submitButtonDisabled: {
        opacity: 0.6,
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#FFFFFF",
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: { marginTop: 8, fontSize: 14 },
    errorText: { fontSize: 14, color: "red" },
});
