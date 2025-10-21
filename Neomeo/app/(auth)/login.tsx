import React, { useState } from 'react';
<<<<<<< Updated upstream
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
=======
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Link } from 'expo-router';
import { authStyles as styles } from '../../../styles/auth_style';
import { useAuth } from '../../AuthContext'; // AuthContext 가져오기
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios'; // 서버 통신용 라이브러리

// [⭐️ 중요 ⭐️] 백엔드 서버 주소를 정확하게 입력해주세요!
// 예: http://192.168.1.5:5000/api (휴대폰 테스트 시 노트북 IP)
// 예: http://localhost:5000/api (같은 컴퓨터에서 웹으로 테스트 시)
const API_URL = 'http://YOUR_BACKEND_SERVER_IP:5000/api'; // 백엔드 기본 경로

export default function LoginScreen() {
  const { login } = useAuth(); // AuthContext의 login 함수 (토큰 저장 기능 포함)
  const [username, setUsername] = useState(''); // 아이디 입력 상태
  const [password, setPassword] = useState(''); // 비밀번호 입력 상태
  const [loading, setLoading] = useState(false); // 로딩 상태

  // [기능: 로그인 버튼 클릭 시]
  const handleLogin = async () => {
    // 입력값 검증
>>>>>>> Stashed changes
    if (!username || !password) {
      Alert.alert('로그인 오류', '아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }
<<<<<<< Updated upstream
    if (username === 'admin' && password === '1234') {
      login();
    } else {
      Alert.alert('로그인 실패', '아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

=======

    setLoading(true); // 로딩 시작

    try {
      // 백엔드 로그인 API 호출 (/api/auth/login)
      const response = await axios.post(`${API_URL}/auth/login`, {
        username: username, // 백엔드에서 받는 필드명 확인 필요 (username 맞음)
        password: password,
      });

      // 응답 데이터에서 토큰 확인
      if (response.data && response.data.token) {
        // 성공 시 받아온 토큰으로 로그인 처리 (AuthContext)
        login(response.data.token);
        // AuthContext가 자동으로 홈 화면으로 이동시킬 것입니다.
      } else {
        // 토큰이 없는 경우 (백엔드 로직 확인 필요)
        Alert.alert('로그인 실패', '서버로부터 토큰을 받지 못했습니다.');
      }
    } catch (error: any) {
      // API 호출 실패 시 (네트워크 오류, 아이디/비번 불일치 등)
      console.error("로그인 API 오류:", error.response?.data || error.message);
      // 백엔드에서 보내주는 에러 메시지를 우선적으로 보여줍니다.
      Alert.alert('로그인 실패', error.response?.data?.message || '아이디 또는 비밀번호를 확인해주세요.');
    } finally {
      setLoading(false); // 로딩 종료 (성공/실패 여부와 관계없이)
    }
  };

  // [기능: 소셜 로그인 버튼 클릭 시 (임시)]
>>>>>>> Stashed changes
  const handleSocialLogin = (type: string) => {
    Alert.alert('알림', `[${type}] 소셜 로그인은 추후 구현될 기능입니다.`);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View style={styles.authContainer}>
        <Text style={styles.authWelcomeText}>Welcome</Text>
        <Text style={styles.authLogoText}>Neomeo</Text>

<<<<<<< Updated upstream
=======
        {/* 아이디 입력 */}
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======
        {/* 비밀번호 입력 */}
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
        <TouchableOpacity style={styles.authLoginButton} onPress={handleLogin}>
          <Text style={styles.authButtonText}>로그인</Text>
        </TouchableOpacity>

        <Link href="/signup" asChild>
          <TouchableOpacity style={styles.authSignupButton}>
=======
        {/* 로그인 버튼 (로딩 상태 표시) */}
        <TouchableOpacity style={styles.authLoginButton} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.authButtonText}>로그인</Text>
          )}
        </TouchableOpacity>

        {/* 회원가입 버튼 */}
        <Link href="/signup" asChild>
          <TouchableOpacity style={styles.authSignupButton} disabled={loading}>
>>>>>>> Stashed changes
            <Text style={styles.authSignupButtonText}>이메일 회원가입</Text>
          </TouchableOpacity>
        </Link>
        
<<<<<<< Updated upstream
        <Link href="/find-credentials" asChild>
          <TouchableOpacity>
=======
        {/* 계정 찾기 링크 */}
        <Link href="/find-credentials" asChild>
          <TouchableOpacity disabled={loading}>
>>>>>>> Stashed changes
            <Text style={styles.authFindCredentialsLink}>아이디 / 비밀번호 찾기</Text>
          </TouchableOpacity>
        </Link>

<<<<<<< Updated upstream
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
=======
        {/* 소셜 로그인 버튼들 */}
        <View style={styles.authSocialLoginContainer}>
            <TouchableOpacity style={styles.authSocialButton} onPress={() => handleSocialLogin('네이버')} disabled={loading}>
                {/* 네이버 로고 이미지 방식 사용 */}
                <Image
                  source={require('../../../assets/images/naver_logo.png')} // 경로 확인 필요!
                  style={styles.authSocialImage}
                />
                <Text style={styles.authSocialButtonText}>네이버로 시작하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.authSocialButton} onPress={() => handleSocialLogin('카카오')} disabled={loading}>
                <Ionicons name="chatbubble" size={20} color="#FEE500" style={styles.authSocialIcon} />
                <Text style={styles.authSocialButtonText}>카카오로 시작하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.authSocialButton} onPress={() => handleSocialLogin('구글')} disabled={loading}>
>>>>>>> Stashed changes
                <Ionicons name="logo-google" size={20} color="#EA4335" style={styles.authSocialIcon} />
                <Text style={styles.authSocialButtonText}>Google로 시작하기</Text>
            </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
<<<<<<< Updated upstream
}
=======
}
>>>>>>> Stashed changes
