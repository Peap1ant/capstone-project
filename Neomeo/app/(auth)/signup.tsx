import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { authStyles as styles } from '../../styles/auth_style.js';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SignUpScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (!username || !email || !password) {
      Alert.alert('회원가입 오류', '모든 정보를 입력해주세요.');
      return;
    }
    console.log('회원가입 시도:', username, email);
    Alert.alert('회원가입 성공', '로그인 화면으로 이동합니다.');
    router.push('/login');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View style={styles.authContainer}>
        <Text style={styles.authWelcomeText}>Create Account</Text>
        <Text style={styles.authLogoText}>Neomeo</Text>
        
        <View style={styles.authInputContainer}>
          <Ionicons name="person-outline" size={20} color="#888" style={styles.authInputIcon} />
          <TextInput
            style={styles.authInput}
            placeholder="사용할 아이디"
            placeholderTextColor="#AAA"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.authInputContainer}>
          <Ionicons name="mail-outline" size={20} color="#888" style={styles.authInputIcon} />
          <TextInput
            style={styles.authInput}
            placeholder="이메일 주소"
            placeholderTextColor="#AAA"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
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
        
        <TouchableOpacity style={styles.authLoginButton} onPress={handleSignUp}>
          <Text style={styles.authButtonText}>가입하기</Text>
        </TouchableOpacity>
        
        <Link href="/login" asChild>
            <TouchableOpacity>
                <Text style={styles.authFindCredentialsLink}>이미 계정이 있으신가요? 로그인</Text>
            </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}
