import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { chatRoomStyle } from '../../(styles)/create_room_style'; 
import Slider from '@react-native-community/slider';
import { useUserData } from '@/src/(api)/useUserData';
import api from '@/src/(api)/api';

export default function CreateRoomScreen() {
    
    const [name, setName] = useState<string>('');
    const [hostUser, setHostUset] = useState<string>('');
    const [tags, setTags] = useState<string>('');
    const [maxUserCnt, setMaxUserCnt] = useState(50);

    // fetch userInfo

    const { userInfo, error, loading } = useUserData();

    if (loading) return <Text>로딩 중...</Text>;
    if (error) return <Text>{error}</Text>;
    if (!userInfo) return <Text>유저 데이터가 없습니다.</Text>;

    // handle number change at slider bar

    const handleNumberChange = (text: any) => {
        const num = Number(text);
        if (!isNaN(num)) {
            setMaxUserCnt(num);
        }
    }
    
    // 채팅방 생성 및 리스트로 이동 처리 함수
    const handleCreateRoom = async () => {
        
        // 태그 입력 문자열을 분리하고 유효한 태그만 추출
        const tagsArray: string[] = tags.split(/[,|\s]+/) 
                                  .map(tag => tag.trim())
                                  .filter(tag => tag.length > 0); 

        // 필수 입력값 검증
        if (!name.trim() || tagsArray.length === 0) {
            Alert.alert('필수 입력', '방 제목과 태그는 반드시 입력해야 합니다.');
            return;
        }

        const newRoomData = {
            name: name,
            hostUser: userInfo.nickname,
            tags: tagsArray,
            maxUserCnt: maxUserCnt
        };

        console.log("새 방 생성 요청 데이터:", newRoomData);
        
        try {
            const res = await api.post('/chat/room', newRoomData)
            console.log(res)

            console.log('채팅방 생성 성공')
            router.replace('../../(screen)/(chat)');
        } catch (error: any) {
            console.log('채팅방 생성 실패', newRoomData, error)
        }
    };

    return (
        <View style={chatRoomStyle.container}>
            {/* 뒤로가기 버튼 */}
            <View style={chatRoomStyle.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={26} color="#333" />
                </TouchableOpacity>
                <Text style={chatRoomStyle.headerTitle}>새 채팅방 만들기</Text>
            </View>

            <ScrollView style={chatRoomStyle.formArea} keyboardShouldPersistTaps="handled">
                {/* 방 제목 입력 필드 */}
                <Text style={chatRoomStyle.label}>방 제목</Text>
                <TextInput
                    style={chatRoomStyle.input}
                    placeholder="방의 주제를 담은 이름을 입력하세요."
                    placeholderTextColor="#AAA"
                    value={name}
                    onChangeText={setName}
                />

                {/* 태그 입력 필드 */}
                <Text style={chatRoomStyle.label}>태그(쉼표 또는 공백으로 구분)</Text>
                <TextInput
                    style={[chatRoomStyle.input, chatRoomStyle.tagInput]}
                    placeholder="#우울 #취미 #일상"
                    placeholderTextColor="#AAA"
                    value={tags}
                    onChangeText={setTags}
                    autoCapitalize="none"
                />

                {/* 인원 수 입력 필드 */}
                {/*<View>
                    <Text style={chatRoomStyle.label}>최대 인원</Text>
                    <Slider 
                        minimumValue = {2}
                        maximumValue = {100}
                        step = {1}
                        value = {maxUserCnt}
                        onValueChange={(v) => setMaxUserCnt(v)}
                        style = {chatRoomStyle.slider}
                        minimumTrackTintColor="#5678ff"
                        maximumTrackTintColor="#ccc"
                        thumbTintColor="#5678ff"
                    />
                    <TextInput 
                        value = {String(maxUserCnt)}
                        onChangeText = {handleNumberChange}
                        keyboardType = "numeric"
                        style = {chatRoomStyle.input}
                    />
                </View>*/}

                {/* 채팅방 개설 버튼 */}
                <TouchableOpacity style={chatRoomStyle.createButton} onPress={handleCreateRoom}>
                    <Text style={chatRoomStyle.buttonText}>채팅방 개설</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}