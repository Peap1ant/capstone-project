import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    // common styles
    
    content_center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    Pressable: {
        borderWidth: 1,
        marginTop: 150,
        margin: '5%',
        padding: 10,
        width: '50%',
    },
    text: {
        fontSize: 30,
        margin: 10,
        textAlign: 'center'
    },
    profileSection: { 
        alignItems: "center", paddingVertical: 20 
    },
    profileImage: { 
        width: 100, height: 100, borderRadius: 50, marginBottom: 10 
    },
    profileName: { 
        fontSize: 20, fontWeight: "bold" 
    },
    profileLocation: { 
        fontSize: 14, color: "#777777" 
    },
    cardContainer: { 
        flexDirection: "row", justifyContent: "space-around", marginVertical: 20 
    },
    card: {
        backgroundColor: "#EAF3FF",
        flex: 1,
        marginHorizontal: 5,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    cardTitle: { 
        fontSize: 14, color: "#555555", marginBottom: 5 
    },
    cardValue: { 
        fontSize: 16, fontWeight: "bold", color: "#333333" 
    },
    menuList: { 
        marginTop: 10 
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eeeeee",
    },
    menuText: { 
        fontSize: 16, color: "#333333" 
    },
});