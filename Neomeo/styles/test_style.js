import {StyleSheet} from 'react-native';
import { NotoSansKR_400Regular } from '@expo-google-fonts/inter';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Pressable: {
        borderWidth: 1,
        marginTop: 150,
        margin: '5%',
        padding: 10,
        width: '50%',
    },
    text: {
        fontSize: 30,
        margin: 10,
        textAlign: 'center',
        fontFamily: NotoSansKR_400Regular
    }
});