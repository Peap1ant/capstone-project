import { TouchableOpacity, View, Text, ScrollView, Image, Pressable } from 'react-native';
import SafeScrollCenter from '../../../src/(components)/SafeScrollCenter';
import {styles} from '../../(styles)/main_style';
import {more_tab_styles} from '../../(styles)/more_tab_style';
import { home_tabstyles } from '@/app/(styles)/home_tab_style';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, router } from 'expo-router';
import { useCommunityList } from '@/src/(api)/useCommunityList';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];
const MAX_TITLE_LENGTH = 18;

const truncateTitle = (title: string, maxLength: number = MAX_TITLE_LENGTH) =>
  title.length > maxLength ? `${title.slice(0, maxLength)}…` : title;

export function useLatestCommunityMenu() {
  const { communityList, loading, error } = useCommunityList();

  const items = communityList
    .slice(0, 5)
    .reverse()
    .map((item) => ({
      icon: 'list-outline' as IoniconName,
      label: truncateTitle(item.title),
      href: {
        pathname: '../../(stack)/(community)/[id]' as const,
        params: { id: String(item.id) },
      },
    }));

  return { items, loading, error };
}

// dummy data for testing

const dummy_data = [
    {icon: 'list-outline' as IoniconName, label: 1, href: '../../(stack)/(dummy)'}
]

const ad = [
    { name: 'ad 1', Thumbnail: require('../../../assets/images/testing/136-200x300.jpg'), href: '../(dummy)'}
]

const community = [
    { icon: 'list-outline', label: '공지 사항 테스트 1', href: '../../(dummy)' },
    { icon: 'list-outline', label: '공지 사항 테스트 2', href: '../../(dummy)' },
    { icon: 'list-outline', label: '공지 사항 테스트 3', href: '../../(dummy)' },
    { icon: 'list-outline', label: '공지 사항 테스트 4', href: '../../(dummy)' },
    { icon: 'list-outline', label: '공지 사항 테스트 5', href: '../../(dummy)' },
];


export default function HomeScreen() {

    const { items, loading, error } = useLatestCommunityMenu();

    if (loading) return <Text>로딩 중...</Text>;
    if (error) return <Text>{error}</Text>;
    if (!items) return <Text>데이터가 없습니다.</Text>;

    return (
        <SafeScrollCenter style = {styles.container}>
            <ScrollView style = {home_tabstyles.movieContainer} horizontal = {true} contentContainerStyle = {home_tabstyles.movieRow}>
                {ad.map((item, index) => (
                    <MoveiList key = {index} name = {item.name} Thumbnail = {item.Thumbnail} href = {item.href} />
                ))}
            </ScrollView>
            <ScrollView stickyHeaderIndices={[1]} style = {home_tabstyles.homeContainer} scrollEnabled = {false}>
                <Text style = {styles.text}>커뮤니티 글</Text>
                <View style = {more_tab_styles.menuList}>
                        {items.map((item, index) => (
                            <Pressable key = {index} onPress={() => router.push(item.href)} style={home_tabstyles.homeMenuItem}>
                                <Ionicons name = {item.icon} size={20} color='#000000' style={{ marginRight: 10 }} />
                                <Text style = {more_tab_styles.menuText}>{item.label}</Text>
                            </Pressable>
                        ))}
                </View>
            </ScrollView>
        </SafeScrollCenter>
    );
}

// for movie
function MoveiList({ name, Thumbnail, href }: { name: string; Thumbnail: any; href: any }) {
return (
    <Link href={href} asChild>
    <TouchableOpacity style={home_tabstyles.menuItemMovie}>
        <Image source = {Thumbnail} style = {home_tabstyles.moveThumbnail}></Image>
        <Text numberOfLines={3} style={more_tab_styles.menuText}>{name}</Text>
    </TouchableOpacity>
    </Link>
);
}

