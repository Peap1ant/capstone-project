import { Text, View } from 'react-native';
import { styles } from '../../../styles/test_style';

export default function HomeScreen() {
  return (
    <View style={[styles.container, styles.content_center]}>
      <Text style={styles.text}>홈 화면</Text>
    </View>
  );
}