import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { authStyles as styles } from '../(styles)/auth_style';
import { useAuth } from '../../src/(auth)/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';

const BASE_URL = "http://localhost:8080";

    export default function LoginScreen() {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const json_field = {
        username: String(username).trim(),
        password: String(password).trim()
    }

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('로그인 오류', '아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }
        else (username == '' || password == ''); {
            Alert.alert('로그인 오류', '아이디와 비밀번호를 입력하세요.');
        }

        try {
                const res = await axios.post(`${BASE_URL}/login`, json_field, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(`로그인 성공: username ${username} password ${password}`, res.data);
            Alert.alert('로그인 성공', '환영합니다!');
            router.replace('../(screen)')
        } catch (error: any) {
            console.error('로그인 실패: 아이디 또는 비밀번호 다름', error);
            Alert.alert('아이디 또는 비밀번호가 틀렸습니다.');
        }
    };

    const handleSocialLogin = () => {
        Alert.alert('알림', `소셜 로그인은 추후 구현될 기능입니다.`);
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.authContainer}>
            <Text style={styles.authWelcomeText}>Welcome</Text>
            <Text style={styles.authLogoText}>Neomeo</Text>

            <View style={styles.authInputContainer}>
            <Ionicons name="person-outline" size={20} color="#888" style={styles.authInputIcon} />
            <TextInput
                style={styles.authInput}
                placeholder="아이디"
                placeholderTextColor="#AAA"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
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

            <TouchableOpacity style={styles.authLoginButton} onPress={handleLogin}>
            <Text style={styles.authButtonText}>로그인</Text>
            </TouchableOpacity>

            <Link href="/signup" asChild>
            <TouchableOpacity style={styles.authSignupButton}>
                <Text style={styles.authSignupButtonText}>이메일 회원가입</Text>
            </TouchableOpacity>
            </Link>
            
            <Link href="/find-credentials" asChild>
            <TouchableOpacity>
                <Text style={styles.authFindCredentialsLink}>아이디 / 비밀번호 찾기</Text>
            </TouchableOpacity>
            </Link>

            <View style={styles.authSocialLoginContainer}>
                <TouchableOpacity style={styles.authSocialButton} onPress={() => handleSocialLogin()}>
                    <Ionicons name="chatbubble-ellipses" size={20} color="#03C75A" style={styles.authSocialIcon} />
                    <Text style={styles.authSocialButtonText}>소셜 로그인하기</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    );
}