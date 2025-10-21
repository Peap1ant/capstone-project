import React, { useState } from 'react';
<<<<<<< Updated upstream
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
=======
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { authStyles as styles } from '../../styles/auth_style'; // 스타일 파일 경로 확인
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';

// [⭐️ 중요 ⭐️] 백엔드 서버 주소를 정확하게 입력해주세요! (login.tsx와 동일하게)
const API_URL = 'http://YOUR_BACKEND_SERVER_IP:5000/api';

export default function SignUpScreen() {
  const router = useRouter();
  const [username, setUsername] = useState(''); // 아이디 상태
  const [email, setEmail] = useState('');     // 이메일 상태
  const [password, setPassword] = useState(''); // 비밀번호 상태
  const [loading, setLoading] = useState(false); // 로딩 상태

  // [기능: 가입하기 버튼 클릭 시]
  const handleSignUp = async () => {
    // 입력값 검증
>>>>>>> Stashed changes
    if (!username || !email || !password) {
      Alert.alert('회원가입 오류', '모든 정보를 입력해주세요.');
      return;
    }
<<<<<<< Updated upstream
    console.log('회원가입 시도:', username, email);
    Alert.alert('회원가입 성공', '로그인 화면으로 이동합니다.');
    router.push('/login');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View style={styles.authContainer}>
        <Text style={styles.authWelcomeText}>Create Account</Text>
        <Text style={styles.authLogoText}>Neomeo</Text>
        
=======
    // 이메일 형식 검증
    if (!/\S+@\S+\.\S+/.test(email)) {
        Alert.alert('회원가입 오류', '올바른 이메일 형식이 아닙니다.');
        return;
    }

    setLoading(true); // 로딩 시작

    try {
      // 백엔드 회원가입 API 호출 (/api/auth/signup)
      await axios.post(`${API_URL}/auth/signup`, {
        username: username, // 백엔드 필드명 확인 (username 맞음)
        email: email,       // 백엔드 필드명 확인 (email 맞음)
        password: password,   // 백엔드 필드명 확인 (password 맞음)
      });

      // 성공 시 알림 후 로그인 화면으로 이동
      Alert.alert('회원가입 성공', '회원가입이 완료되었습니다. 로그인 해주세요.');
      router.replace('/login'); // 회원가입 후 뒤로가기로 다시 못 오게 replace 사용

    } catch (error: any) {
      // API 호출 실패 시 (네트워크 오류, 중복된 아이디/이메일 등)
      console.error("회원가입 API 오류:", error.response?.data || error.message);
      Alert.alert('회원가입 실패', error.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    // [UI: 키보드가 화면 가리는 것 방지]
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }} // KeyboardAvoidingView가 전체 화면 차지하도록
    >
      <View style={styles.authContainer}>
        {/* [UI: 제목] */}
        <Text style={styles.authLogoText}>계정 만들기</Text>

        {/* [UI: 아이디 입력] */}
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======
        {/* [UI: 이메일 입력] */}
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======
        {/* [UI: 비밀번호 입력] */}
>>>>>>> Stashed changes
        <View style={styles.authInputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.authInputIcon} />
          <TextInput
            style={styles.authInput}
            placeholder="비밀번호"
            placeholderTextColor="#AAA"
            value={password}
            onChangeText={setPassword}
<<<<<<< Updated upstream
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
=======
            secureTextEntry // 비밀번호 가리기
          />
        </View>

        {/* [UI: 가입하기 버튼 (로딩 상태 표시)] */}
        <TouchableOpacity style={styles.authLoginButton} onPress={handleSignUp} disabled={loading}>
          {loading ? (
             <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.authButtonText}>가입하기</Text>
          )}
        </TouchableOpacity>

        {/* [UI: 로그인 화면으로 돌아가기 링크] */}
        <View style={styles.authLinkContainer}>
          <Text style={styles.authLinkText}>이미 계정이 있으신가요?</Text>
          <Link href="/login" asChild>
            <TouchableOpacity disabled={loading}>
              <Text style={styles.authLink}>로그인</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
>>>>>>> Stashed changes
