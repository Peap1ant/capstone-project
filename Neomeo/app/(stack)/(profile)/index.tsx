import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";

import { editStyles } from "@/app/(styles)/edit_account_style";
import { useUserData } from "@/src/(api)/useUserData";

import {
    getAllProfileItems,
    setProfileItem
} from "@/src/storage/profileStorage";

export default function ProfileScreen() {
    const router = useRouter();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const { userInfo } = useUserData();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [phone, setPhone] = useState("");
    const [birth, setBirth] = useState("");
    const [region, setRegion] = useState("");

    const [mbti, setMbti] = useState("INTP");
    const [tendency, setTendency] = useState("");
    const [hobby, setHobby] = useState("");

    const [showBirthPicker, setShowBirthPicker] = useState(false);

    useEffect(() => {
        if (!userInfo) return;

        setName(userInfo.nickname || "");
        setEmail(userInfo.email || "");

        (async () => {
            const stored = await getAllProfileItems();
            setPhone(stored.phone);
            setBirth(stored.birth);
            setRegion(stored.region);
            setMbti(stored.mbti || "INTP");
            setTendency(stored.tendency);
            setHobby(stored.hobby);
        })();
    }, [userInfo]);

    const saveProfile = async () => {
        await setProfileItem("profile_phone", phone);
        await setProfileItem("profile_birth", birth);
        await setProfileItem("profile_region", region);
        await setProfileItem("profile_mbti", mbti);
        await setProfileItem("profile_tendency", tendency);
        await setProfileItem("profile_hobby", hobby);

        alert("저장 완료!");
        router.back();
    };

    const onBirthChange = (_: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const formatted = selectedDate.toISOString().split("T")[0];
            setBirth(formatted);
        }
    };


    return (
        <View style={{ flex: 1, backgroundColor: "#f9f9fb" }}>
            <View style={editStyles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={28} color="#444" />
                </TouchableOpacity>

                <Text style={editStyles.headerTitle}>개인정보 관리</Text>

                <TouchableOpacity style={editStyles.saveButton} onPress={saveProfile}>
                    <Ionicons name="save-outline" size={18} color="#fff" />
                    <Text style={editStyles.saveText}>저장</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={{ paddingHorizontal: 16 }}>
                <View style={editStyles.inputCard}>
                    <Text style={editStyles.inputLabel}>이름</Text>
                    <TextInput style={editStyles.input} value={name} editable={false} />
                </View>

                <View style={editStyles.inputCard}>
                    <Text style={editStyles.inputLabel}>이메일</Text>
                    <TextInput style={editStyles.input} value={email} editable={false} />
                </View>

                <View style={editStyles.inputCard}>
                    <Text style={editStyles.inputLabel}>전화번호</Text>
                    <TextInput style={editStyles.input} value={phone} onChangeText={setPhone} />
                </View>

                <View style={editStyles.inputCard}>
                    <Text style={editStyles.inputLabel}>생년월일</Text>
                    <TouchableOpacity onPress={() => setShowBirthPicker(true)}>
                        <Text style={editStyles.input}>{birth || "YYYY-MM-DD"}</Text>
                    </TouchableOpacity>
                </View>

                {showBirthPicker && (
                    <DateTimePicker
                        mode="date"
                        value={birth ? new Date(birth) : new Date()}
                        display="spinner"
                        onChange={onBirthChange}
                    />
                )}

                <View style={editStyles.inputCard}>
                    <Text style={editStyles.inputLabel}>지역</Text>
                    <TextInput style={editStyles.input} value={region} onChangeText={setRegion} />
                </View>

                <View style={editStyles.extraCard}>
                    <Text style={editStyles.extraTitle}>추가 정보</Text>

                    <Text style={editStyles.extraLabel}>MBTI</Text>

                    <ScrollView horizontal>
                        {[
                            "INTJ","INTP","ENTJ","ENTP",
                            "INFJ","INFP","ENFJ","ENFP",
                            "ISTJ","ISFJ","ESTJ","ESFJ",
                            "ISTP","ISFP","ESTP","ESFP"
                        ].map(item => (
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

                    <Text style={editStyles.extraLabel}>성향</Text>
                    <TextInput style={editStyles.input} value={tendency} onChangeText={setTendency} />

                    <Text style={editStyles.extraLabel}>취미/활동</Text>
                    <TextInput style={editStyles.input} value={hobby} onChangeText={setHobby} />
                </View>
            </ScrollView>
        </View>
    );
}
