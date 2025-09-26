import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* 로그인/회원가입 */}
      <Stack.Screen name="(bottom)" options={{ headerShown: false }} />
      {/* 탭 네비게이션 */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
