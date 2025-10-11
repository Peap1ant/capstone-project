import { View, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {styles} from '../../../styles/test_style.js';

export function HomeScreen() {
    return (
        <SafeAreaView style = {[styles.container, styles.content_center]}>
            <Text style = {styles.text}> Tab Home</Text>
        </SafeAreaView>
    );
}

export default function App() {
    return(
        <SafeAreaProvider>
            <HomeScreen />
        </SafeAreaProvider>
    );
}