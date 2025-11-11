import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import SafeContainer from '../../../src/(components)/SafeContainer';
import SafeScroll from '@/src/(components)/SafeScroll';
import { Link } from 'expo-router';

const dummy_data = [
    { id: '1', title: 'title test 1', content: 'content\ntesting all things as i can!\ncan you see this?', imgKey: '1' },
    { id: '2', title: 'title test 2', content: 'content\n\n\n\n\ntesting for long content',imgKey: '2' },
    { id: '3', title: 'title test 3', content: 'content', imgKey: '3' },
    { id: '4', title: 'title test 4', content: 'content', imgKey: '4' },
    { id: '5', title: 'title test 5', content: 'this content is REALLY LONG!\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nWhy are you here?', imgKey: '5' }
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
            <View style = {styles.header}>
                <Text style = {styles.headerText}>자유게시판</Text>
            </View>
            <View>{createContentBtn()}</View>
            <SafeScroll>
                <View>
                    {dummy_data.slice().reverse().map((item, index) => (
                        <CommunityItem key = {index} id = {item.id} title = {item.title} content = {item.content} imgKey = {item.imgKey} />
                    ))}
                </View>
            </SafeScroll>
        </SafeContainer>
    );
}

function CommunityItem({ id, title, content, imgKey }: { id: string; title: string; content: string; imgKey: string; }) {
    
    const imgSource = imageMap[imgKey]
    
    return (
        <Link key = {id} href = {{ 
            pathname: '../../(stack)/(community)/[id]', 
            params: { id, title, content, imgKey}
            }} asChild>
        <TouchableOpacity style = {styles.itemContainer}>
            <Text>글 번호: {id}</Text>
            <View>
                <Text style = {styles.title}>{title}</Text>
                <View style = {styles.rowContainer}>
                    <Text style = {styles.content} numberOfLines = {3}>{content}</Text>
                    <View style = {styles.imageContainer}>
                        <Image source = {imgSource} style = {styles.image}/>
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
            <TouchableOpacity style = {styles.createContentBtn}>
                <Text style = {styles.createContentBtnText}>게시물 만들기</Text>
            </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 3,
        borderColor: '#cccccc',
        padding: 10,
        paddingTop: 10,
        justifyContent: 'center'
    },
    headerText: {
        textAlign: 'center',
        fontSize: 50
    },
    createContentBtn: {
        padding: 20,
        margin: 10,
        borderWidth: 3,
        borderColor: '#aaaaaa',
        borderRadius: 10
    },
    createContentBtnText: {
        textAlign: 'center',
        fontSize: 20
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 10,
        margin: 5,
        padding: 10,
        display: 'flex',
        minHeight: 100
    },
    title: {
        fontSize: 20,
        alignSelf: 'flex-start'
    },
    rowContainer: {
        flexDirection: 'row',
        alignContent: 'center'
    },
    imageContainer: { 
        width: 'auto',
        height: 'auto'
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    content: {
        flex: 1,
        fontSize: 15,
        color: '#AAAAAA',
        alignSelf: 'flex-start'
    }
})