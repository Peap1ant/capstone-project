import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import SafeContainer from '../../../src/(components)/SafeContainer';
import SafeScroll from '@/src/(components)/SafeScroll';
import { communityStyle } from '@/app/(styles)/community_style';
import { Link } from 'expo-router';

// real data contains title, category, content, attachments: img 
const dummy_data = [
    { id: '1', title: 'title test 1', category: 'test', content: 'content\ntesting all things as i can!\ncan you see this?', imgKey: '1' },
    { id: '2', title: 'title test 2', category: 'test' ,content: 'content\n\n\n\n\ntesting for long content',imgKey: '2' },
    { id: '3', title: 'title test 3', category: 'test', content: 'content', imgKey: '3' },
    { id: '4', title: 'title test 4', category: 'test', content: 'content', imgKey: '4' },
    { id: '5', title: 'title test 5', category: 'test', content: 'this content is REALLY LONG!\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nWhy are you here?', imgKey: '5' }
]

const imageMap: Record<string, any> = {
    '1': require('../../../assets/images/testing/136-200x300.jpg'),
    '2': require('../../../assets/images/testing/553-1000x300.jpg'),
    '3': require('../../../assets/images/testing/564-500x500.jpg'),
    '4': require('../../../assets/images/testing/804-500x300.jpg'),
    '5': require('../../../assets/images/testing/811-200x300.jpg')
}

export default function HomeScreen() {
    return (
        <SafeContainer>
            <View style = {communityStyle.header}>
                <Text style = {communityStyle.headerText}>자유게시판</Text>
            </View>
            <View>{createContentBtn()}</View>
            <SafeScroll>
                <View>
                    {dummy_data.slice().reverse().map((item, index) => (
                        <CommunityItem key = {index} id = {item.id} title = {item.title} category = {item.category} content = {item.content} imgKey = {item.imgKey} />
                    ))}
                </View>
            </SafeScroll>
        </SafeContainer>
    );
}

function CommunityItem({ id, title, category, content, imgKey }: { id: string; title: string; category: string; content: string; imgKey: string; }) {
    
    const imgSource = imageMap[imgKey]
    
    return (
        <Link key = {id} href = {{ 
            pathname: '../../(stack)/(community)/[id]', 
            params: { title, category, content, imgKey}
            }} asChild>
        <TouchableOpacity style = {communityStyle.itemContainer}>
            <Text>글 번호: {id}</Text>
            <View>
                <Text style = {communityStyle.title}>[{category}] {title}</Text>
                <View style = {communityStyle.rowContainer}>
                    <Text style = {communityStyle.content} numberOfLines = {3}>{content}</Text>
                    <View style = {communityStyle.imageContainer}>
                        <Image source = {imgSource} style = {communityStyle.image}/>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        </Link>
    );
}

function createContentBtn() {
    return (
        <Link href = '../../(stack)/(community)/createContent' asChild>
            <TouchableOpacity style = {communityStyle.createContentBtn}>
                <Text style = {communityStyle.createContentBtnText}>게시물 만들기</Text>
            </TouchableOpacity>
        </Link>
    )
}
