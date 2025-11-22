import { StyleSheet } from 'react-native';

export const chatRoomStyle = StyleSheet.create({

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },

    userInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    profileCircle: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#8DC8FF',
        marginRight: 10
    },

    userName: {
        fontSize: 15,
        fontWeight: 'bold'
    },

    online: {
        fontSize: 12,
        color: '#5CC85C'
    },

    messageContainer: {
        paddingHorizontal: 16,
        paddingVertical: 10
    },

    otherBubble: {
        maxWidth: '70%',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 16,
        marginBottom: 10,
        alignSelf: 'flex-start',
        elevation: 2
    },

    myBubble: {
        maxWidth: '70%',
        backgroundColor: '#53a8eb',
        padding: 12,
        borderRadius: 16,
        marginBottom: 10,
        alignSelf: 'flex-end'
    },

    otherText: {
        fontSize: 14,
        color: '#333'
    },

    myText: {
        fontSize: 14,
        color: 'white'
    },

    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee'
    },

    input: {
        flex: 1,
        marginHorizontal: 12,
        fontSize: 15,
        backgroundColor: '#f3f3f3',
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 8
    }
});
