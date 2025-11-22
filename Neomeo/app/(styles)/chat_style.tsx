import { StyleSheet } from 'react-native';

export const chatStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FB'
    },

    header: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingTop: 30,
    },

    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#222'
    },

    subtitle: {
        fontSize: 15,
        marginTop: 4,
        color: '#666'
    },

    healMessageBox: {
        backgroundColor: '#EEF4FF',
        padding: 14,
        borderRadius: 16,
        marginHorizontal: 20,
        marginTop: 20,
    },

    healMessage: {
        color: '#5678FF',
        fontSize: 14,
        fontWeight: '600'
    },

    listWrapper: {
        marginTop: 10,
    },

    chatCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        marginHorizontal: 20,
        padding: 16,
        marginBottom: 12,

        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },

    profileCircle: {
        width: 54,
        height: 54,
        borderRadius: 27,
        alignItems: 'center',
        justifyContent: 'center',
    },

    profileText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '700',
    },

    chatInfo: {
        flex: 1,
        marginLeft: 14,
    },

    nickname: {
        fontSize: 17,
        fontWeight: '700',
        color: '#333'
    },

    lastMessage: {
        fontSize: 14,
        marginTop: 3,
        color: '#777',
        maxWidth: '85%',
    },

    timeArea: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },

    time: {
        fontSize: 12,
        color: '#999',
        marginBottom: 6,
    },

    onlineDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#7ADFCC',
    },
});