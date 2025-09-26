import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

export function HomeScreen() {
    const insets = useSafeAreaInsets();
    return (
        <View style = {styles.container}>
            <Text> Tab index</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default function App() {
    return(
        <SafeAreaProvider>
            <HomeScreen />
        </SafeAreaProvider>
    );
}