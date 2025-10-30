import {  Text } from 'react-native';
import SafeContainer from '../../../src/(components)/SafeContainer';
import {styles} from '../../(styles)/main_style';

export default function HomeScreen() {
    return (
        <SafeContainer style = {[styles.container, styles.content_center]}>
            <Text style = {styles.text}> Tab Home</Text>
        </SafeContainer>
    );
}