// 주석 포함: 코드의 흐름을 이해하기 쉽게 설명 추가

import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";

import { api } from "@/src/(api)/api";
import { useUserData } from "@/src/(api)/useUserData";
import { editStyles } from "@/app/(styles)/edit_account_style";

export default function ProfileScreen() {
    const router = useRouter();

    // 1) 유저 정보 API 가져오기
    const { userInfo, loading, error } = useUserData();

    // 2) 화면에서 입력하는 필드 상태
    const [name, setName] = useState("");     // 닉네임
    const [email, setEmail] = useState("");   // 이메일
    const [phone, setPhone] = useState("");   // 전화번호(로컬 관리)
    const [birth, setBirth] = useState("");   // 생일
    const [region, setRegion] = useState(""); // 지역

    // 생일 선택용 DatePicker ON/OFF
    const [datePickerOpen, setDatePickerOpen] = useState(false);

    // 3) userInfo가 로드되면 화면에 값 채우기
    useEffect(() => {
        if (userInfo) {
            setName(userInfo.nickname || "");
            setEmail(userInfo.email || "");
            // 전화번호/지역/생일은 API에 없어서 기본 비워둠
        }
    }, [userInfo]);

    // 로딩/에러 처리
    if (loading) return <Text>로딩 중...</Text>;
    if (error) return <Text>유저 정보를 불러오지 못했습니다.</Text>;
    if (!userInfo) return <Text>데이터 없음</Text>;

    /* --------------------------------------------
        저장 API 요청
        - 서버에 username / nickname / email만 반영
        - phone / region / birth는 아직 서버에서 지원 X
    --------------------------------------------- */
    const handleSave = async () => {
        const payload = {
            username: userInfo.username, // 필수 값
            nickname: name,              // 변경된 닉네임
            email: email,                // 변경된 이메일
        };

        try {
            await api.put("/user", payload);
            alert("저장되었습니다.");
            router.back(); // 더보기 화면으로 돌아감
        } catch (err) {
            alert("저장 중 오류 발생");
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#f9f9fb" }}>
            {/* ---------------- 헤더 ---------------- */}
            <View style={editStyles.header}>
                {/* 뒤로가기 */}
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={28} color="#444" />
                </TouchableOpacity>

                <Text style={editStyles.headerTitle}>개인정보 관리</Text>

                {/* 저장 버튼 */}
                <TouchableOpacity style={editStyles.saveButton} onPress={handleSave}>
                    <Ionicons name="save-outline" size={18} color="#fff" />
                    <Text style={editStyles.saveText}>저장</Text>
                </TouchableOpacity>
            </View>

            {/* ---------------- Body ---------------- */}
            <ScrollView
                style={{ paddingHorizontal: 16 }}
                showsVerticalScrollIndicator={false}
            >
                {/* 닉네임 */}
                <View style={editStyles.inputCard}>
                    <Text style={editStyles.inputLabel}>닉네임</Text>
                    <TextInput
                        style={editStyles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="닉네임 입력"
                    />
                </View>

                {/* 이메일 */}
                <View style={editStyles.inputCard}>
                    <Text style={editStyles.inputLabel}>이메일</Text>
                    <TextInput
                        style={editStyles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="이메일 입력"
                    />
                </View>

                {/* 전화번호 (서버 저장은 안되지만 UI에서 사용 가능) */}
                <View style={editStyles.inputCard}>
                    <Text style={editStyles.inputLabel}>전화번호</Text>
                    <TextInput
                        style={editStyles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="전화번호 입력"
                        keyboardType="number-pad"
                    />
                </View>

                {/* 생일 DatePicker */}
                <View style={editStyles.inputCard}>
                    <Text style={editStyles.inputLabel}>생년월일</Text>

                    {/* 누르면 DatePicker 열림 */}
                    <TouchableOpacity
                        onPress={() => setDatePickerOpen(true)}
                        style={editStyles.dropdownBox}
                    >
                        <Text>{birth || "생일 선택"}</Text>
                    </TouchableOpacity>

                    {/* DatePicker 컴포넌트 */}
                    {datePickerOpen && (
                        <DateTimePicker
                            mode="date"
                            value={birth ? new Date(birth) : new Date()}
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            onChange={(e, selectedDate) => {
                                setDatePickerOpen(false);
                                if (selectedDate) {
                                    const formatted =
                                        selectedDate.getFullYear() +
                                        "-" +
                                        (selectedDate.getMonth() + 1) +
                                        "-" +
                                        selectedDate.getDate();
                                    setBirth(formatted);
                                }
                            }}
                        />
                    )}
                </View>

                {/* 지역 */}
                <View style={editStyles.inputCard}>
                    <Text style={editStyles.inputLabel}>지역</Text>
                    <TextInput
                        style={editStyles.input}
                        value={region}
                        onChangeText={setRegion}
                        placeholder="예: 서울"
                    />
                </View>
            </ScrollView>
        </View>
    );
}
