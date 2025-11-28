import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { editStyles } from "@/app/(styles)/edit_account_style";
import { useUserData } from "@/src/(api)/useUserData";
import { setStorage, getStorage } from "@/src/(storage)/storage";
import SafeScroll from "@/src/(components)/SafeScroll";
import SafeContainer from "@/src/(components)/SafeContainer";
import api from "@/src/(api)/api";

export default function ProfileScreen() {
    const router = useRouter();
    const { userInfo, loading, error } = useUserData();

    const [ nickname, setNickname ] = useState('');
    const [ email, setEmail ] = useState('');

    const [ phone, setPhone ] = useState('');
    const [ birth, setBirth ] = useState('');
    const [ region, setRegion ] = useState('');

    const [ mbti, setMbti ] = useState('');
    const [ hobby, setHobby ] = useState('');
    const [ tendency, setTendency ] = useState('');

    useEffect(() => {
        const init = async () => {
            if (userInfo) {
                setNickname(userInfo.nickname || '');
                setEmail(userInfo.email || '');
            }

            const storedPhone = await getStorage('phone')
            const storedBirth = await getStorage('birth')
            const storedRegion = await getStorage('region')
            const storedMbti = await getStorage('mbti')
            const storedHobby = await getStorage('hobby')
            const storedTendency = await getStorage('tendency')

            if (storedPhone) setPhone(storedPhone);
            if (storedBirth) setBirth(storedBirth);
            if (storedRegion) setRegion(storedRegion);
            if (storedMbti) setMbti(storedMbti);
            if (storedHobby) setHobby(storedHobby);
            if (storedTendency) setTendency(storedTendency);
        };

        init();
    }, [userInfo]);

    if (loading) return <Text style={{ marginTop: 50, textAlign: 'center' }}>로딩 중...</Text>;
    if (error) return <Text style={{ marginTop: 50, textAlign: 'center' }}>{error}</Text>;
    if (!userInfo) return <Text style={{ marginTop: 50, textAlign: 'center' }}>데이터가 없습니다.</Text>;

    // MBTI 목록
    const mbtiList = [
        "INTJ","INTP","ENTJ","ENTP",
        "INFJ","INFP","ENFJ","ENFP",
        "ISTJ","ISFJ","ESTJ","ESFJ",
        "ISTP","ISFP","ESTP","ESFP"
    ];

    

    const handleSave = async () => {
        if (!nickname || !email || !phone ! || !birth || !region || !mbti || !hobby || !tendency) {
            alert('모든 정보를 입력해주세요.');
            return;
        }

        console.log(`유저 정보 수정, nickname ${nickname} email ${email}`);

        const json_field = {
            nickname: String(nickname).trim(),
            email: email,
            username: userInfo.username
        }

        try {
            const res = await api.put('/user', json_field)

            if (res.status === 200 || res.status === 201) {
                Alert.alert('유저 정보 수정 성공', '메인 화면으로 이동합니다.');
                router.replace('../../(screen)/(home)');
            } else {
                Alert.alert('유저 정보 수정 실패', `서버 응답 코드: ${res.status}`);
            }
        } catch (error: any) {
            console.error('유저 정보 수정 중 오류:', error);
            if (error.response) {
                Alert.alert('서버 오류', `상태 코드: ${error.response.status}\n${error.response.data?.message || '회원가입 실패'}`);
            } else {
                Alert.alert('네트워크 오류', '서버에 연결할 수 없습니다.');
            }
        }

        console.log('나머지 정보 저장')

        await setStorage('phone', phone)
        await setStorage('birth', birth)
        await setStorage('region', region)
        await setStorage('mbti', mbti)
        await setStorage('hobby', hobby)
        await setStorage('tendency', tendency)

        alert('프로필이 수정되었습니다.')

        router.replace('../(screen)/(more)/')
    };

    return (
        <SafeContainer style={{ flex: 1, backgroundColor: "#f9f9fb" }}>

            {/* 헤더 */}
            <View style={editStyles.header}>
                <TouchableOpacity onPress={() => router.replace('../(screen)/(more)/')}>
                    <Ionicons name="chevron-back" size={28} color="#444" />
                </TouchableOpacity>

                <Text style={editStyles.headerTitle}>개인정보 관리</Text>

                <TouchableOpacity style={editStyles.saveButton} onPress={handleSave}>
                    <Ionicons name="save-outline" size={18} color="#fff" />
                    <Text style={editStyles.saveText}>저장</Text>
                </TouchableOpacity>
            </View>

            <SafeScroll style={{ paddingHorizontal: 16 }}>

                {/* 이름 */}
                <View style={editStyles.inputCard}>
                    <Text style={editStyles.inputLabel}>닉네임(로그인 아이디)</Text>
                    <TextInput
                        style={editStyles.input}
                        value={nickname}
                        onChangeText={setNickname}
                        placeholder={nickname}
                    />
                </View>

                {/* 이메일 */}
                <View style={editStyles.inputCard}>
                    <Text style={editStyles.inputLabel}>이메일</Text>
                    <TextInput
                        style={editStyles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder={userInfo.email}
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
                        placeholder="지역 입력(예시: 서울)"
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
                        placeholder="예시: 내향적"
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

            </SafeScroll>
        </SafeContainer>
    );
}
