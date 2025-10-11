import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
  // --- 전체 컨테이너 ---
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#ffffff',
  },

  // --- 상단 텍스트 ---
  authWelcomeText: {
    fontSize: 22,
    color: '#888',
    textAlign: 'center',
    marginBottom: 8,
  },
  authLogoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 50,
    fontFamily: 'NotoSansKR_400Regular',
  },

  // --- 아이콘 + 입력창 ---
  authInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 20,
    paddingBottom: 8,
  },
  authInputIcon: {
    marginRight: 10,
  },
  authInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },

  // --- 메인 버튼 (로그인) ---
  authLoginButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  authButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // --- 보조 버튼 (회원가입) ---
  authSignupButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  authSignupButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // --- 계정 찾기 링크 ---
  authFindCredentialsLink: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#888',
  },

  // --- 소셜 로그인 ---
  authSocialLoginContainer: {
    marginTop: 40,
  },
  authSocialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 10,
  },
  authSocialIcon: {
    marginRight: 10,
  },
  authSocialButtonText: {
    color: '#333',
    fontSize: 15,
    fontWeight: '500',
  },
});