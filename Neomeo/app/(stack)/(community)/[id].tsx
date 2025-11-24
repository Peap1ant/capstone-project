import { View, Text, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useCommunityData } from '@/src/(api)/useCommunityData';
import { deleteCommunityData } from '@/src/(api)/deleteCommunityData';

export default function CommunityDetailScreen() {
    const { id } = useLocalSearchParams();
    const numericId = Number(id);

    const { communityInfo, loading, error } = useCommunityData(numericId);
    const { deleteCommunity, loading_del, error_del, success } = deleteCommunityData();

    const handleDelete = () => {
        deleteCommunity(numericId);
        router.replace('../../(screen)')
    };

    if (loading) return <Text>로딩 중...</Text>;
    if (error) return <Text>{error}</Text>;
    if (!communityInfo) return <Text>데이터가 없습니다.</Text>;

    console.log(communityInfo.Content, communityInfo.title)

    return (
        <View>
            <Text>{communityInfo.title}</Text>
            <Text>{communityInfo.Content}</Text>
            <TouchableOpacity onPress = {() => handleDelete()}>
                <View>
                    <Text>글 지우기</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
