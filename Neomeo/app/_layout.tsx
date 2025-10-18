import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  console.log('>>> RootLayout mounted'); // 이 로그가 반드시 보여야 합니다
  return (
    <SafeAreaProvider>
      <Slot />
    </SafeAreaProvider>
  );
}