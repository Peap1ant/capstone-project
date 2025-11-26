import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { authStyles as styles } from '../(styles)/auth_style';
import { useAuth } from '../../src/(auth)/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { api } from '@/src/(api)/api';
import { setToken } from '@/src/(api)/token';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isWeb = Platform.OS === 'web';

export default function LoginScreen() {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            Alert.alert('로그인 오류', '아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }

        const json_field = {
            username: username.trim(),
            password: password.trim()
        }

        try {
            const res = await api.post('/login', json_field)
            
            console.log('status:', res.status);
            console.log('content-type:', res.headers['content-type']);
            console.log('responseURL:', res.request?.responseURL);
            console.log('data:', res.data);

            console.log(`로그인 성공: username ${username} password ${password}`);
            Alert.alert('로그인 성공', '환영합니다!');

            try {
                if (isWeb) {
                    await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
                } else {
                    await SecureStore.deleteItemAsync('accessToken');
                    await SecureStore.deleteItemAsync('refreshToken');
                }

                console.log('기존 토큰 삭제 완료')

                await setToken('accessToken', res.data.accessToken);
                await setToken('refreshToken', res.data.refreshToken);

                console.log(`새 토큰 발급 성공`);
            } catch (error: any) {
                console.log('토큰 발급 실패', error);
            }

            router.replace('../(screen)/(home)')

        } catch (error: any) {
            console.error('로그인 실패', error);
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