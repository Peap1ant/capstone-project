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

    headerName: {
        marginLeft: 10,
        fontSize: 17,
        fontWeight: '700',
        color: '#333',
    },

    onlineText: {
        fontSize: 12,
        color: '#7ADFCC',
        marginLeft: 10,
    },

    chatArea: {
        flex: 1,
        paddingHorizontal: 18,
        paddingTop: 10,
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