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

export default function Page() {
    const { id, title, content, imgKey } = useLocalSearchParams<{
        id: string,
        title: string,
        content: string,
        imgKey: string
    }>();

    const imgSource = imageMap[imgKey as string];

    return(
        <SafeScroll>
            <View style = {page_style.titleContainer}>
                <Text style = {page_style.title}>[{id}] {title}</Text>
            </View>
            <View style = {page_style.contentContainer}>
                <Image source = {imgSource} />
                <View style = {page_style.contentSeperator} />
                <Text>{content}</Text>
            </View>
        </SafeScroll>
    )
}

const page_style = StyleSheet.create({
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