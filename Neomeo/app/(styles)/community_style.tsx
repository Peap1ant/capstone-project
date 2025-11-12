import { StyleSheet } from "react-native"

export const communityStyle = StyleSheet.create({
    header: {
        borderBottomWidth: 3,
        borderColor: '#cccccc',
        padding: 10,
        paddingTop: 10,
        justifyContent: 'center'
    },
    headerText: {
        textAlign: 'center',
        fontSize: 50
    },
    createContentBtn: {
        padding: 20,
        margin: 10,
        borderWidth: 3,
        borderColor: '#aaaaaa',
        borderRadius: 10
    },
    createContentBtnText: {
        textAlign: 'center',
        fontSize: 20
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 10,
        margin: 5,
        padding: 10,
        display: 'flex',
        minHeight: 100
    },
    title: {
        fontSize: 20,
        alignSelf: 'flex-start'
    },
    rowContainer: {
        flexDirection: 'row',
        alignContent: 'center'
    },
    imageContainer: { 
        width: 'auto',
        height: 'auto'
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    content: {
        flex: 1,
        fontSize: 15,
        color: '#AAAAAA',
        alignSelf: 'flex-start'
    }
})