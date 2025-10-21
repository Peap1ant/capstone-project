import { View, Text } from 'react-native';
import SafeContainer from '../../../src/(components)/SafeContainer';
import {styles} from '../../(styles)/test_style';

export default function HomeScreen() {
    return (
        <SafeContainer style = {styles.container}>
            <Text style = {styles.text}>stack/profile/index.tsx</Text>
        </SafeContainer>
    );
}
