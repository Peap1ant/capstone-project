import { View, Text, TouchableOpacity, Image } from 'react-native';
import SafeContainer from '@/src/(components)/SafeContainer';
import SafeScroll from '@/src/(components)/SafeScroll';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { communityStyle } from '@/app/(styles)/community_style';
import { useEffect, useState } from 'react';
import { useCommunityList } from '@/src/(api)/useCommunityList';

const imageMap: Record<string, any> = {
    '1': require('../../../assets/images/testing/136-200x300.jpg'),
    '2': require('../../../assets/images/testing/553-1000x300.jpg'),
    '3': require('../../../assets/images/testing/564-500x500.jpg'),
};

export default function CommunityScreen() {
    const { communityList, loading, error } = useCommunityList();

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;
    if (!communityList.length) 
        return <Link href = {'../(stack)/(community)/createContent'}>
                    <TouchableOpacity>
                        <Ionicons name="add-circle" size={32} color="#53a8eb" />
                    </TouchableOpacity>
                </Link>;

    const real_data = communityList.map(item => ({
            id: item.id,
            name: item.writerNickName,
            content: item.Content,
            profileColor: '#5D9EFF',
            title: item.title,
            imgKey: '1'
    }));

    return (
        <SafeContainer>

            {/* 헤더 */}
            <View style={communityStyle.newHeader}>

                <Text style={communityStyle.newHeaderTitle}>게시판</Text>
                <Link href = {'../(stack)/(community)/createContent'}>
                    <TouchableOpacity>
                        <Ionicons name="add-circle" size={32} color="#53a8eb" />
                    </TouchableOpacity>
                </Link>
            </View>

            {/* 게시글 리스트 */}
            {/* use real_data for real api test.*/}
            <SafeScroll>
                <View style={{ paddingHorizontal: 18 }}>
                    {real_data.map(item => (
                        <CommunityCard key={item.id} item={item} />
                    ))}
                </View>
            </SafeScroll>

        </SafeContainer>
    );
}

/* 게시글 카드 컴포넌트 */
function CommunityCard({ item }: any) {

    const imgSource = imageMap[item.imgKey];

    return (
        <Link
            href={{
                pathname: '../../(stack)/(community)/[id]',
                params: { id: String(item.id) }
            }}
            asChild
        >
            <TouchableOpacity style={communityStyle.cardContainer}>

                {/* 작성자 정보 */}
                <View style={communityStyle.userRow}>
                    <View style={[communityStyle.profileCircle, { backgroundColor: item.profileColor }]}>
                        <Text style={communityStyle.profileLetter}>
                            {item.name.charAt(0)}
                        </Text>
                    </View>

                    <Text style={communityStyle.userName}>{item.name}</Text>
                </View>

                {/* 제목 */}
                <Text style={communityStyle.cardTitle}>{item.title}</Text>

                {/* 내용 */}
                <Text style={communityStyle.cardContent} numberOfLines={3}>{item.content}</Text>

                {/* 이미지 */}
                {imgSource && (
                    <Image
                        source={imgSource}
                        style={communityStyle.cardImage}
                        resizeMode="cover"
                    />
                )}
            </TouchableOpacity>
        </Link>
    );
}
