import { Text } from "react-native";
import { fetchChatTag } from "@/src/(api)/fetchChatTag";

export default function test() {

    const { tagChatList, error, loading } = fetchChatTag('테스트')

    if (loading) return <Text>로딩 중...</Text>;
    if (error) return <Text>{error}</Text>;
    if (!tagChatList) return <Text>error</Text>;

    console.log(tagChatList);
    return(
        <Text>{tagChatList?.name}</Text>
    )
}