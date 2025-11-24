import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Link, router, useRouter } from 'expo-router';
import { authStyles as styles } from '../../(styles)/auth_style';
import Ionicons from '@expo/vector-icons/Ionicons';
import { api } from '@/src/(api)/api';

export default function SignUpScreen() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState("");

    const json_field = {
        password: String(password).trim(),
        nickname: String(nickname).trim()
    }

    const handleSignUp = async () => {
        console.log(`유저 정보 수정, password ${password} nickname ${nickname}`);
        try {
            const res = await api.put('/user', json_field)

            if (res.status === 200 || res.status === 201) {
                Alert.alert('유저 정보 수정 성공', '메인 화면으로 이동합니다.');
                router.replace('../../(screen)');
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
    };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
    <View style={styles.authContainer}>
        <Text style={styles.authWelcomeText}>Edit Account</Text>
        <Text style={styles.authLogoText}>Neomeo</Text>

        <View style={styles.authInputContainer}>
        <Ionicons name="person-outline" size={20} color="#888" style={styles.authInputIcon} />
        <TextInput
            style={styles.authInput}
            placeholder="닉네임"
            placeholderTextColor="#AAA"
            value={nickname}
            onChangeText={setNickname}
        />
        </View>

        <View style={styles.authInputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.authInputIcon} />
        <TextInput
            style={styles.authInput}
            placeholder="비밀번호"
            placeholderTextColor="#AAA"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />
        </View>
        
        <TouchableOpacity style={styles.authLoginButton} onPress={handleSignUp}>
        <Text style={styles.authButtonText}>가입하기</Text>
        </TouchableOpacity>
        
        <Link href="../../(screen)" asChild>
            <TouchableOpacity>
                <Text style={styles.authFindCredentialsLink}>이미 계정이 있으신가요? 로그인</Text>
            </TouchableOpacity>
        </Link>
    </View>
    </ScrollView>
);
}
