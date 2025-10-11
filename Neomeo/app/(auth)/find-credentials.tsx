import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { authStyles as styles } from '../../styles/auth_style.js';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function FindCredentialsScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleFind = () => {
    if (!email) {
      Alert.alert('입력 오류', '가입 시 사용한 이메일을 입력해주세요.');
      return;
    }
    console.log('찾기 시도 이메일:', email);
    Alert.alert('요청 완료', '입력하신 이메일을 확인해주세요.');
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View style={styles.authContainer}>
        <Text style={styles.authWelcomeText}>Find Account</Text>
        <Text style={styles.authLogoText}>Neomeo</Text>
        
        <View style={styles.authInputContainer}>
          <Ionicons name="mail-outline" size={20} color="#888" style={styles.authInputIcon} />
          <TextInput
            style={styles.authInput}
            placeholder="가입 시 사용한 이메일 주소"
            placeholderTextColor="#AAA"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <TouchableOpacity style={styles.authLoginButton} onPress={handleFind}>
          <Text style={styles.authButtonText}>확인</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.authFindCredentialsLink}>로그인 화면으로 돌아가기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
