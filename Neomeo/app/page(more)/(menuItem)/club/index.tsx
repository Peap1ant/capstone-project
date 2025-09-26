import { View, Text, StyleSheet } from "react-native";

export default function PageName() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>여기는 동아리 화면입니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
