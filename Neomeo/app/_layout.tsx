import { useEffect } from 'react';
import { Stack, SplashScreen, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { AuthProvider, useAuth } from '../src/(auth)/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// 스플래시 자동숨김 방지는 모듈 레벨에서 1회
SplashScreen.preventAutoHideAsync().catch(() => {});

function RootLayoutNav() {
  const { isAuthenticated, isAuthReady } = useAuth();   // 👈 인증 준비 플래그 필요
  const segments = useSegments();
  const router = useRouter();

  // 네비게이터 준비 여부
  const rootState = useRootNavigationState();
  const isNavReady = !!rootState?.key;

  useEffect(() => {
    // 준비 안 됐으면 아무것도 하지 않음
    if (!isNavReady || !isAuthReady) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (isAuthenticated && inAuthGroup) {
      router.replace('/(screen)/(home)');
    } else if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/login');
    }

    // 준비된 뒤에 스플래시 숨김
    SplashScreen.hideAsync().catch(() => {});
  }, [isNavReady, isAuthReady, isAuthenticated, segments]);

  // 항상 Stack을 렌더(여기서 return null 하지 말기)
  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
