import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
    Feather,
    MaterialIcons,
    Ionicons,
    Entypo,
} from "@expo/vector-icons";

export function EditorToolbar() {
    return (
        <View style={styles.toolbar}>
            {/* Bold */}
            <IconButton icon={<Feather name="bold" size={20} />} />

            {/* Italic */}
            <IconButton icon={<Feather name="italic" size={20} />} />

            {/* Underline */}
            <IconButton icon={<Feather name="underline" size={20} />} />

            {/* Strike */}
            <IconButton icon={<Feather name="strikethrough" size={20} />} />

            {/* Code */}
            <IconButton icon={<Ionicons name="code-outline" size={20} />} />

            {/* Divider */}
            <Divider />

            {/* Image */}
            <IconButton icon={<Feather name="image" size={20} />} />

            {/* Video */}
            <IconButton icon={<MaterialIcons name="videocam" size={20} />} />

            {/* Divider */}
            <Divider />

            {/* Bullet List */}
            <IconButton icon={<Entypo name="list" size={20} />} />

            {/* Number List */}
            <IconButton icon={<MaterialIcons name="format-list-numbered" size={20} />} />

            {/* Divider */}
            <Divider />

            {/* Heading */}
            <IconButton icon={<MaterialIcons name="title" size={20} />} />

            {/* Font Size Dropdown (icon only) */}
            <IconButton icon={<MaterialIcons name="arrow-drop-down" size={22} />} />
        </View>
    );
}

function IconButton({ icon }: { icon: React.ReactNode }) {
    return (
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.6}>
            {icon}
        </TouchableOpacity>
    );
}

function Divider() {
    return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
    toolbar: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 6,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
        backgroundColor: "#FAFAFA",
    },
    iconButton: {
        paddingHorizontal: 6,
        paddingVertical: 4,
    },
    divider: {
        width: 1,
        height: 16,
        backgroundColor: "#E0E0E0",
        marginHorizontal: 4,
    },
});
