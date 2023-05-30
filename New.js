import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";

function New({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("./images/oqt.jpg")}
        style={{ width: 370, height: 200 }}
      />

      <TouchableOpacity
        style={{ alignSelf: "center", marginTop: 30 }}
        onPress={() => navigate("NewDua")}
      >
        <Text
          style={{
            width: 180,
            height: 40,
            textAlign: "center",
            textAlignVertical: "center",
            color: "black",
            fontWeight: "bold",
            fontSize: 24,
            backgroundColor: "white",
            borderRadius: 40,
          }}
        >
          NewDua
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignSelf: "center", marginTop: 30 }}
        onPress={() => navigate("Category")}
      >
        <Text
          style={{
            width: 180,
            height: 40,
            textAlign: "center",
            textAlignVertical: "center",
            color: "black",
            fontWeight: "bold",
            fontSize: 24,
            backgroundColor: "white",
            borderRadius: 40,
          }}
        >
          Category{" "}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ alignSelf: "center", marginTop: 30 }}
        onPress={() => navigate("NewCategory")}
      >
        <Text
          style={{
            width: 180,
            height: 40,
            textAlign: "center",
            textAlignVertical: "center",
            color: "black",
            fontWeight: "bold",
            fontSize: 24,
            backgroundColor: "white",
            borderRadius: 40,
          }}
        >
          NewCategory{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "black",
  },
});
export default New;
