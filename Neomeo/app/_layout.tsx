import { useEffect } from 'react';
import { useFonts, NotoSansKR_400Regular } from '@expo-google-fonts/noto-sans-kr';
import { Stack, SplashScreen, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// [기능 1: 스플래시 화면 제어]
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  // [기능 2: 인증 상태 가져오기]
  const { isAuthenticated } = useAuth();
  // [기능 3: 현재 경로 파악하기]
  const segments = useSegments();
  // [기능 4: 페이지 이동 기능 가져오기]
  const router = useRouter();

  // [기능 5: 인증 상태 변경 감지 및 자동 화면 전환]
  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)'; // (auth) 그룹 내부에 있는지 확인

    if (isAuthenticated && inAuthGroup) {
      // 로그인된 상태에서 로그인/회원가입 화면을 보고 있다면 홈으로 이동
      router.replace('/(screen)/(home)');
    } else if (!isAuthenticated && !inAuthGroup) {
      // 로그아웃 상태에서 홈, 마이페이지 등 접근 시 로그인 페이지로 이동
      router.replace('/(auth)/login'); // ✅ 경로 수정: (auth) 그룹 포함
    }
  }, [isAuthenticated, segments]);

  // [기능 6: 기본 레이아웃 설정]
  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  // [기능 7: 폰트 로딩]
  const [fontsLoaded, fontError] = useFonts({
    NotoSansKR_400Regular,
  });

  // [기능 8: 폰트 로딩 완료 후 스플래시 화면 숨기기]
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // [기능 9: Provider로 앱 감싸기]
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
