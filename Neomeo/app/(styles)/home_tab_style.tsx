import { StyleSheet } from 'react-native';

export const home_tabstyles = StyleSheet.create({
    homeContainer: { 
        backgroundColor: '#fafafa', 
        width: '80%',
        paddingBottom: '5%',
        borderRadius: 10,
        margin: 10
    },
    movieContainer: { 
        paddingHorizontal: 10,
        backgroundColor: '#fafafa', 
        width: '80%',
        paddingBottom: '5%',
        borderRadius: 10,
        margin: 10
    },
    homeMenuItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 0,
        borderWidth: 1,
        borderColor: "#f2f2f2",
        borderRadius: 10
    },
    moveThumbnail: {
        width: 100,
        height: 150,
        resizeMode: 'cover'
    },
    menuItemMovie: {
        flexDirection: 'column',
        alignItems: "center",
        padding: 15
    },
    movieRow: {
        flexDirection: 'row',
        alignContent: 'center',
        paddingVertical: 10,
    },
});