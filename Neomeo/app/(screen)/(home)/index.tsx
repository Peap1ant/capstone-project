import { View, Text } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import {styles} from '../../../styles/test_style.js';

export function HomeScreen() {
    const insets = useSafeAreaInsets();
    return (
        <View style = {styles.container}>
            <Text style = {styles.text}> Tab Home</Text>
        </View>
    );
}

export default function App() {
    return(
        <SafeAreaProvider>
            <HomeScreen />
        </SafeAreaProvider>
    );
}