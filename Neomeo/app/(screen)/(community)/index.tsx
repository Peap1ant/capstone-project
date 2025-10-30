import { Text } from 'react-native';
import SafeContainer from '../../../src/(components)/SafeContainer';
import { styles } from '../../(styles)/main_style';

export default function HomeScreen() {
    return (
        <SafeContainer>
            <Text style = {styles.text}> Tab community</Text>
        </SafeContainer>
    );
}

