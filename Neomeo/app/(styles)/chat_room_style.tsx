import { StyleSheet } from "react-native";

export const chatRoomStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 14,
        paddingHorizontal: 18,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },

    backBtn: {
        marginRight: 14,
    },

    profileCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: 'center',
        justifyContent: 'center',
    },

    profileText: {
        color: '#FFF',
        fontSize: 19,
        fontWeight: '700',
    },
    
    // 💡 [추가된 기능] 방 이름과 태그를 포함하는 영역 (오류 해결)
    headerInfoArea: { 
        flex: 1, // 남은 공간을 차지하여 온라인 텍스트를 오른쪽으로 밀어냅니다.
        marginLeft: 10,
    },

    headerName: {
        // marginLeft: 10, (headerInfoArea 내부이므로 제거 또는 주석 처리)
        fontSize: 17,
        fontWeight: '700',
        color: '#333',
    },
    
    // 💡 [추가된 기능] 헤더에 표시되는 태그 스타일 (오류 해결)
    headerTags: { 
        fontSize: 13, 
        color: '#6A8CFF', // 버튼과 유사한 색상 사용
        marginTop: 2,
    },

    onlineText: {
        fontSize: 12,
        color: '#7ADFCC',
        // marginLeft: 10, (이전 버전에서 사용되었으나, headerInfoArea가 flex를 차지하므로 문제 없음)
    },

    chatArea: {
        flex: 1,
        paddingHorizontal: 18,
        paddingTop: 10,
    },
    
    // 💡 [추가된 기능] 다중 채팅방 메시지 위에 표시되는 닉네임 스타일 (오류 해결)
    messageNickname: { 
        fontSize: 13, 
        fontWeight: '600',
        color: '#555', 
        marginBottom: 3, 
        marginTop: 10,
    },

    bubbleLeft: {
        alignSelf: 'flex-start',
        maxWidth: '80%',
        backgroundColor: '#FFFFFF',
        padding: 12,
        borderRadius: 18,
        marginBottom: 8,
    },

    bubbleRight: {
        alignSelf: 'flex-end',
        maxWidth: '80%',
        backgroundColor: '#AFC6FF',
        padding: 12,
        borderRadius: 18,
        marginBottom: 8,
    },

    text: {
        fontSize: 16,
        color: '#333',
    },

    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#FFFFFF',
    },

    inputBox: {
        flex: 1,
        backgroundColor: '#F0F2F5',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
    },

    sendBtn: {
        marginLeft: 10,
        backgroundColor: '#6A8CFF',
        padding: 12,
        borderRadius: 20,
    },

    sendText: {
        color: '#FFF',
        fontWeight: '700',
    },
});