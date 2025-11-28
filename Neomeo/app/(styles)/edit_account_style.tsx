import { StyleSheet } from "react-native";

export const editStyles = StyleSheet.create({
    header: {
        width: "100%",
        height: 60,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#e5e5e5",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    saveButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#4a90e2",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
    },
    saveText: {
        color: "#fff",
        marginLeft: 4,
        fontWeight: "bold",
    },

    inputCard: {
        marginTop: 18,
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e4e4e4",
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 6,
        color: "#333",
    },
    input: {
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 12,
        fontSize: 15,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#d7d7d7",
        backgroundColor: "#fdfdfd",
    },

    dropdownBox: {
        width: "100%",
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "#d7d7d7",
        borderRadius: 8,
        backgroundColor: "#fdfdfd",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 6,
    },
    dropdownList: {
        marginTop: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#d7d7d7",
        paddingVertical: 4,
        backgroundColor: "#fff",
    },
    dropdownItem: {
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#ededed",
    },

    extraCard: {
        marginTop: 20,
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e5e5e5",
    },
    extraTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 12,
        color: "#333",
    },
    extraLabel: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 14,
        marginBottom: 6,
        color: "#333",
    },
        mbtiChip: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        marginRight: 8,
        backgroundColor: "#f2f2f2",
    },

    mbtiChipActive: {
        backgroundColor: "#ffd86b",
        borderColor: "#e6b800",
    },

    dropdown: {
        marginTop: 6,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        backgroundColor: "#fff",
        padding: 8,
        gap: 8,
    }

});
