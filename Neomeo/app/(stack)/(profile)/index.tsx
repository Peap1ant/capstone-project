import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { editStyles } from "@/app/(styles)/edit_account_style";

import { useUserData } from "@/src/(api)/useUserData";

// 로컬 저장
import {
    getAllProfileItems,
    setProfileItem
} from "@/src/storage/profileStorage";

export default function ProfileScreen() {
    const router = useRouter();
    const { userInfo } = useUserData();

    // 서버 값 + 로컬 값 상태 저장
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [phone, setPhone] = useState("");
    const [birth, setBirth] = useState("");
    const [region, setRegion] = useState("");

    const [mbti, setMbti] = useState("INTP");
    const [tendency, setTendency] = useState("");
    const [hobby, setHobby] = useState("");

    // MBTI 목록
    const mbtiList = [
        "INTJ","INTP","ENTJ","ENTP",
        "INFJ","INFP","ENFJ","ENFP",
        "ISTJ","ISFJ","ESTJ","ESFJ",
        "ISTP","ISFP","ESTP","ESFP"
    ];

    /** 최초 로드 → 서버 정보 + 로컬 정보 불러와서 상태 채우기 */
    useEffect(() => {
        if (!userInfo) return;

        // 서버 값
        setName(userInfo.nickname || "");
        setEmail(userInfo.email || "");

        // 로컬 프로필 값 불러오기
        (async () => {
            const stored = await getAllProfileItems();
            if (stored) {
                setPhone(stored.phone);
                setBirth(stored.birth);
                setRegion(stored.region);
                setMbti(stored.mbti || "INTP");
                setTendency(stored.tendency);
                setHobby(stored.hobby);
            }
        })();
    }, [userInfo]);

    /** 저장 버튼 */
    const handleSave = async () => {
        await setProfileItem("profile_phone", phone);
        await setProfileItem("profile_birth", birth);
        await setProfileItem("profile_region", region);
        await setProfileItem("profile_mbti", mbti);
        await setProfileItem("profile_tendency", tendency);
        await setProfileItem("profile_hobby", hobby);

        alert("저장되었습니다!");
        router.back();
    };


    return (
        <View style={{ flex: 1, backgroundColor: "#f9f9fb" }}>

            {/* 헤더 */}
            <View style={editStyles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={28} color="#444" />
                </TouchableOpacity>

                <Text style={editStyles.headerTitle}>개인정보 관리</Text>

                <TouchableOpacity style={editStyles.saveButton} onPress={handleSave}>
                    <Ionicons name="save-outline" size={18} color="#fff" />
                    <Text style={editStyles.saveText}>저장</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={{ paddingHorizontal: 16 }}>

                {/* 이름 */}
                <View style={editStyles.inputCard}>
                    <Text style={editStyles.inputLabel}>이름</Text>
                    <TextInput
                        style={editStyles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="이름 입력"
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

                {/* 전화번호 */}
                <View style={editStyles.inputCard}>
                    <Text style={editStyles.inputLabel}>전화번호</Text>
                    <TextInput
                        style={editStyles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="전화번호 입력"
                    />
                </View>

                {/* 생년월일 (텍스트 입력 가능하게 변경됨) */}
                <View style={editStyles.inputCard}>
                    <Text style={editStyles.inputLabel}>생년월일</Text>
                    <TextInput
                        style={editStyles.input}
                        value={birth}
                        onChangeText={setBirth}
                        placeholder="YYYY-MM-DD"
                    />
                </View>

                {/* 지역 */}
                <View style={editStyles.inputCard}>
                    <Text style={editStyles.inputLabel}>지역</Text>
                    <TextInput
                        style={editStyles.input}
                        value={region}
                        onChangeText={setRegion}
                        placeholder="지역 입력"
                    />
                </View>

                {/* 추가 정보 */}
                <View style={editStyles.extraCard}>
                    <Text style={editStyles.extraTitle}>추가 정보</Text>

                    {/* MBTI */}
                    <Text style={editStyles.extraLabel}>MBTI</Text>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {mbtiList.map(item => (
                            <TouchableOpacity
                                key={item}
                                style={[
                                    editStyles.mbtiChip,
                                    mbti === item && editStyles.mbtiChipActive
                                ]}
                                onPress={() => setMbti(item)}
                            >
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* 성향 */}
                    <Text style={editStyles.extraLabel}>성향</Text>
                    <TextInput
                        style={editStyles.input}
                        value={tendency}
                        onChangeText={setTendency}
                        placeholder="예: 내향적"
                    />

                    {/* 취미 */}
                    <Text style={editStyles.extraLabel}>취미/활동</Text>
                    <TextInput
                        style={editStyles.input}
                        value={hobby}
                        onChangeText={setHobby}
                        placeholder="예: 운동, 독서"
                    />
                </View>

            </ScrollView>
        </View>
    );
}
