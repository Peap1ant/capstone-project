import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { Link } from 'expo-router';
import { authStyles as styles } from '../../styles/auth_style.js';
import { useAuth } from '../../context/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function LoginScreen() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('로그인 오류', '아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }
    if (username === 'admin' && password === '1234') {
      login();
    } else {
      Alert.alert('로그인 실패', '아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  const handleSocialLogin = (type: string) => {
    Alert.alert('알림', `[${type}] 소셜 로그인은 추후 구현될 기능입니다.`);
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
            <TouchableOpacity style={styles.authSocialButton} onPress={() => handleSocialLogin('네이버')}>
                <Ionicons name="newspaper-outline" size={20} color="#03C75A" style={styles.authSocialIcon} />
                <Text style={styles.authSocialButtonText}>네이버로 시작하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.authSocialButton} onPress={() => handleSocialLogin('카카오')}>
                <Ionicons name="chatbubble" size={20} color="#FEE500" style={styles.authSocialIcon} />
                <Text style={styles.authSocialButtonText}>카카오로 시작하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.authSocialButton} onPress={() => handleSocialLogin('구글')}>
                <Ionicons name="logo-google" size={20} color="#EA4335" style={styles.authSocialIcon} />
                <Text style={styles.authSocialButtonText}>Google로 시작하기</Text>
            </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}