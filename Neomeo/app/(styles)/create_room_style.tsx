import { StyleSheet, ViewStyle, TextStyle } from "react-native";

interface CreateRoomStyles {
    container: ViewStyle;
    header: ViewStyle;
    headerTitle: TextStyle;
    formArea: ViewStyle;
    label: TextStyle;
    input: TextStyle;
    textArea: TextStyle;
    tagInput: TextStyle;
    createButton: ViewStyle;
    buttonText: TextStyle;
}

export const chatRoomStyle = StyleSheet.create<CreateRoomStyles>({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FB',
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 15,
        color: '#333',
    },
    formArea: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 8,
        color: '#555',
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
    } as TextStyle,
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
    } as TextStyle,
    tagInput: {
    } as TextStyle,
    createButton: {
        backgroundColor: '#5678FF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});