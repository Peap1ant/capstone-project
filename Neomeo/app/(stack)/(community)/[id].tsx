import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useCommunityData } from '@/src/(api)/useCommunityData';

export default function CommunityDetailScreen() {
    const { id } = useLocalSearchParams();
    const numericId = Number(id);

    const { communityInfo, loading, error } = useCommunityData(numericId);

    if (loading) return <Text>로딩 중...</Text>;
    if (error) return <Text>{error}</Text>;
    if (!communityInfo) return <Text>데이터가 없습니다.</Text>;

    return (
        <View>
            <Text>{communityInfo.title}</Text>
            <Text>{communityInfo.content}</Text>
        </View>
    );
}
