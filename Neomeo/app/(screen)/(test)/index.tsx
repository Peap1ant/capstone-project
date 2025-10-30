import { TouchableOpacity, View, Text, ScrollView, Image } from 'react-native';
import SafeScrollCenter from '../../../src/(components)/SafeScrollCenter';
import {styles} from '../../(styles)/main_style';
import {more_tab_styles} from '../../(styles)/more_tab_style';
import { home_tabstyles } from '@/app/(styles)/home_tab_style';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';

const movie_recommend = [
    { name: '이름 1', Thumbnail: require('../../../assets/images/testing/profile.jpg'), href: '../(dummy)'},
    { name: '이름 2', Thumbnail: require('../../../assets/images/testing/profile.jpg'), href: '../(dummy)'},
    { name: '이름 3', Thumbnail: require('../../../assets/images/testing/profile.jpg'), href: '../(dummy)'},
    { name: '이름 4', Thumbnail: require('../../../assets/images/testing/profile.jpg'), href: '../(dummy)'},
    { name: '이름 5', Thumbnail: require('../../../assets/images/testing/profile.jpg'), href: '../(dummy)'},
]

const announcement = [
    { icon: 'list-outline', label: '공지 사항 테스트 1', href: '../(dummy)' },
    { icon: 'list-outline', label: '공지 사항 테스트 2', href: '../(dummy)' },
    { icon: 'list-outline', label: '공지 사항 테스트 3', href: '../(dummy)' },
    { icon: 'list-outline', label: '공지 사항 테스트 4', href: '../(dummy)' },
    { icon: 'list-outline', label: '공지 사항 테스트 5', href: '../(dummy)' },
];

const community = [
    { icon: 'list-outline', label: '공지 사항 테스트 1', href: '../(dummy)' },
    { icon: 'list-outline', label: '공지 사항 테스트 2', href: '../(dummy)' },
    { icon: 'list-outline', label: '공지 사항 테스트 3', href: '../(dummy)' },
    { icon: 'list-outline', label: '공지 사항 테스트 4', href: '../(dummy)' },
    { icon: 'list-outline', label: '공지 사항 테스트 5', href: '../(dummy)' },
];

export default function HomeScreen() {
    return (
        <SafeScrollCenter style = {styles.container}>
            <Text style = {styles.text}>현재 인기 있는 콘텐츠</Text>
                <ScrollView style = {home_tabstyles.movieContainer} horizontal = {true} contentContainerStyle = {home_tabstyles.movieRow}>
                    {movie_recommend.map((item, index) => (
                        <MoveiList key = {index} name = {item.name} Thumbnail = {item.Thumbnail} href = {item.href} />
                    ))}
                </ScrollView>
            <ScrollView stickyHeaderIndices={[1]} style = {home_tabstyles.homeContainer} scrollEnabled = {false}>
                <Text style = {styles.text}>공지</Text>
                <View style = {more_tab_styles.menuList}>
                        {announcement.map((item, index) => (
                            <ContentList key = {index} icon = {item.icon} label = {item.label} href = {item.href} />
                        ))}
                </View>
            </ScrollView>
            <ScrollView stickyHeaderIndices={[1]} style = {home_tabstyles.homeContainer} scrollEnabled = {false}>
                <Text style = {styles.text}>커뮤니티 글</Text>
                <View style = {more_tab_styles.menuList}>
                        {community.map((item, index) => (
                            <ContentList key = {index} icon = {item.icon} label = {item.label} href = {item.href} />
                        ))}
                </View>
            </ScrollView>
        </SafeScrollCenter>
    );
}

// for announcement and community list
function ContentList({ icon, label, href }: { icon: any; label: string; href: any }) {
return (
    <Link href={href} asChild>
    <TouchableOpacity style={home_tabstyles.homeMenuItem}>
        <Ionicons name={icon} size={20} color='#000000' style={{ marginRight: 10 }} />
        <Text style={more_tab_styles.menuText}>{label}</Text>
    </TouchableOpacity>
    </Link>
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

