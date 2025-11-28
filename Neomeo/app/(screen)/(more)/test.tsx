// test.tsx
// 로그아웃 기능만 담긴 단일 화면

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "@/src/(auth)/AuthContext"; // logout() 가져오기
import { router } from "expo-router";

export default function TestScreen() {

    // AuthContext에서 logout 함수 가져옴
    const { logout } = useAuth();

    // 로그아웃 처리 함수
    const handleLogout = async () => {
        try {
            await logout();       // 내부 저장소 토큰 제거
            router.replace("/");  // 로그아웃 후 첫 화면으로 이동
        } catch (e) {
            console.log("Logout Error:", e);
        }
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff"
            }}
        >
            {/* 제목 */}
            <Text style={{ fontSize: 22, marginBottom: 20 }}>
                로그아웃 테스트 화면
            </Text>

            {/* 로그아웃 버튼 */}
            <TouchableOpacity
                onPress={handleLogout}
                style={{
                    backgroundColor: "#ff4444",
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                    borderRadius: 10,
                }}
            >
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                    로그아웃
                </Text>
            </TouchableOpacity>
        </View>
    );
}
