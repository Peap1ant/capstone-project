import { StyleSheet } from 'react-native';

export const chatListStyle = StyleSheet.create({

    header: {
        paddingTop: 30,
        paddingHorizontal: 20,
        marginBottom: 12
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },

    subtitle: {
        fontSize: 14,
        color: '#777',
        marginTop: 4
    },

    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 14,
        marginBottom: 14,
        borderRadius: 16,
        elevation: 1
    },

    profileCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12
    },

    profileLetter: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },

    name: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    time: {
        fontSize: 12,
        color: '#999'
    },

    message: {
        fontSize: 13,
        color: '#666',
        marginTop: 2
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    onlineDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#42CC50',
        marginLeft: 6
    }
});
