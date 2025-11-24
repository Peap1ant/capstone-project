import { useUserData } from "@/src/(api)/useUserData";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import SafeContainer from "@/src/(components)/SafeContainer";
import SafeScroll from "@/src/(components)/SafeScroll";
import { useState } from "react";
import { api } from '@/src/(api)/api';
import { router } from "expo-router";

export default function createContent() {
    const [ title, setTitle ] = useState('')
    const [ content, setContent ] = useState('')

    const dateTime = (date = new Date()) => {
        const iso = date.toISOString();
        const base = iso.slice(0, 23).replace('T', ' ');
        return base + "000";
    };
    
    // Load user info

    const { userInfo, error, loading } = useUserData();
    
    
    if (loading) {
        return (
            <View>
                <Text>유저 정보 로딩중...</Text>
            </View>
        );
    }

    if (error || !userInfo) {
        return (
            <View>
                <Text>에러: {error || '유저 정보를 찾을 수 없습니다.'}</Text>
            </View>
        )
    }
    
    const handleCreateContent = async () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('로그인 오류', '아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }

        const json_field = {
            title: title.trim(),
            content: content.trim(),
            created_date: dateTime(),
            updated_date: dateTime(),
            user_id: userInfo.nickname
        }

        try {
            const res = await api.post('/api/boards', json_field)
            console.log(res)

            console.log('게시물 게시 성공')

            router.replace('../../(screen)')
        } catch (error: any) {
            console.log('게시물 게시 실패', title, content, json_field, error)
        }
    }
    
    return (
        <SafeScroll>
            <View>
                <TextInput
                onChangeText = {setTitle}
                value = {title}
                placeholder = '글 제목을 입력해주세요'
                />
            </View>
            <View>
                <TextInput
                onChangeText = {setContent}
                value = {content}
                placeholder = '글 내용을 입력해주세요'
                />
            </View>
            <TouchableOpacity onPress={() => handleCreateContent()}>
                <View>
                    <Text>게시하기</Text>
                </View>
            </TouchableOpacity>
        </SafeScroll>
    )
}