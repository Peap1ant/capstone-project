import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import { chatRoomStyle } from '../../(styles)/create_room_style'; 

export default function CreateRoomScreen() {
    const [roomName, setRoomName] = useState<string>('');
    const [tagsInput, setTagsInput] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    
    // 채팅방 생성 및 리스트로 이동 처리 함수
    const handleCreateRoom = () => {
        
        // 태그 입력 문자열을 분리하고 유효한 태그만 추출
        const tagsArray: string[] = tagsInput.split(/[,|\s]+/) 
                                  .map(tag => tag.trim())
                                  .filter(tag => tag.length > 0); 

        // 필수 입력값 검증
        if (!roomName.trim() || tagsArray.length === 0) {
            Alert.alert('필수 입력', '방 제목과 태그는 반드시 입력해야 합니다.');
            return;
        }

        const newRoomData = {
            name: roomName.trim(),
            tags: tagsArray,
            description: description.trim(),
        };

        console.log("새 방 생성 요청 데이터:", newRoomData);
        
        // API 호출 성공 가정 후, 사용자에게 알리고 목록 페이지로 이동
        Alert.alert(
            '생성 성공', 
            `'${newRoomData.name}' 방이 개설되었습니다.`,
            [{ 
                text: '확인', 
                onPress: () => {
                    // router.replace를 사용하여 채팅 목록 화면으로 이동
                    router.replace('/(stack)/(chat)/index'); 
                }
            }]
        );
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
                <Text style={chatRoomStyle.label}>방 제목 (필수)</Text>
                <TextInput
                    style={chatRoomStyle.input}
                    placeholder="방의 주제를 담은 이름을 입력하세요."
                    placeholderTextColor="#AAA"
                    value={roomName}
                    onChangeText={setRoomName}
                />

                {/* 태그 입력 필드 */}
                <Text style={chatRoomStyle.label}>태그 (필수, 쉼표 또는 공백으로 구분)</Text>
                <TextInput
                    style={[chatRoomStyle.input, chatRoomStyle.tagInput]}
                    placeholder="#우울 #취미 #일상"
                    placeholderTextColor="#AAA"
                    value={tagsInput}
                    onChangeText={setTagsInput}
                    autoCapitalize="none"
                />

                {/* 방 설명 입력 필드 */}
                <Text style={chatRoomStyle.label}>방 설명 (선택)</Text>
                <TextInput
                    style={[chatRoomStyle.input, chatRoomStyle.textArea]}
                    placeholder="방의 규칙이나 상세 설명을 적어주세요."
                    placeholderTextColor="#AAA"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />

                {/* 채팅방 개설 버튼 */}
                <TouchableOpacity style={chatRoomStyle.createButton} onPress={handleCreateRoom}>
                    <Text style={chatRoomStyle.buttonText}>채팅방 개설</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}