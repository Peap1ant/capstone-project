import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet, Text, Image } from "react-native";
import SafeScroll from "@/src/(components)/SafeScroll";

const imageMap: Record<string, any> = {
    '1': require('../../../assets/images/testing/136-200x300.jpg'),
    '2': require('../../../assets/images/testing/553-1000x300.jpg'),
    '3': require('../../../assets/images/testing/564-500x500.jpg'),
    '4': require('../../../assets/images/testing/804-500x300.jpg'),
    '5': require('../../../assets/images/testing/811-200x300.jpg')
}

export default function page() {
    const { title, category, content, imgKey } = useLocalSearchParams<{
        id: string,
        title: string,
        category: string,
        content: string,
        imgKey: string
    }>();

    const imgSource = imageMap[imgKey as string];

    return(
        <SafeScroll>
            <View style = {community_page_style.titleContainer}>
                <Text style = {community_page_style.title}>[{category}] {title}</Text>
            </View>
            <View style = {community_page_style.contentContainer}>
                <Image source = {imgSource} />
                <View style = {community_page_style.contentSeperator} />
                <Text>{content}</Text>
            </View>
        </SafeScroll>
    )
}

const community_page_style = StyleSheet.create({
    title: {
        fontSize: 20
    },
    titleContainer: {
        borderBottomColor: '#aaaaaa',
        borderBottomWidth: 2,
        padding: 10
    },
    contentContainer: {
        padding: 20
    },
    contentSeperator: {
        padding: 10
    }
})