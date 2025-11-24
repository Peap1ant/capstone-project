import { StyleSheet } from 'react-native';

export const more_tab_styles = StyleSheet.create({
    profileSection: { 
        alignItems: "center", paddingVertical: 20 
    },
    profileImage: { 
        width: 100, height: 100, borderRadius: 50, marginBottom: 10 
    },
    profileNickname: { 
        fontSize: 20, fontWeight: "bold" 
    },
    profileName: { 
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