import { StyleSheet } from 'react-native';

export const communityStyle = StyleSheet.create({

    newHeader: {
        paddingTop: 20,
        paddingBottom: 14,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    newHeaderTitle: {
        fontSize: 22,
        fontWeight: 'bold'
    },

    filterContainer: {
        flexDirection: 'row',
        paddingHorizontal: 14,
        marginBottom: 12
    },

    filterBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 14,
        backgroundColor: '#f1f1f5',
        marginRight: 8
    },

    filterText: {
        marginLeft: 6,
        fontSize: 14,
        color: '#444'
    },

    filterBtnActive: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 14,
        backgroundColor: '#53a8eb',
        marginRight: 8
    },

    filterTextActive: {
        marginLeft: 6,
        fontSize: 14,
        color: 'white'
    },

    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 18,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#00000040'
    },

    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },

    profileCircle: {
        width: 34,
        height: 34,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center'
    },

    profileLetter: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },

    userName: {
        marginLeft: 10,
        fontSize: 14,
        fontWeight: 'bold'
    },

    dot: {
        marginHorizontal: 6,
        fontSize: 12,
        color: '#777'
    },

    timeText: {
        fontSize: 12,
        color: '#777'
    },

    badge: {
        backgroundColor: '#E0E2FF',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
        marginLeft: 8
    },

    badgeText: {
        fontSize: 11,
        color: '#53a8eb'
    },

    cardTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 6,
        marginBottom: 4
    },

    cardContent: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10
    },

    cardImage: {
        width: '100%',
        height: 160,
        borderRadius: 12,
        marginBottom: 10
    },

    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4
    },

    iconBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16
    },

    iconText: {
        marginLeft: 4,
        fontSize: 14
    }
});
