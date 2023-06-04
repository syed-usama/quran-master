import React from "react";
import { useState } from "react";
// import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import ImagePicker from 'react-native-image-crop-picker';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import SQLite from "react-native-sqlite-storage";

function NewCategory({ navigation }) {
  const [filePath, setFilePath] = useState("nol");
  const [name, setName] = useState("");

  const chooseFile = async(type) => {
    ImagePicker.openPicker({
      width: 300,
      height: 550,
      compressImageQuality: 1,
      mediaType: 'photo',
    }).then(image => {
      setFilePath(image.path)
    });
  }
  // const chooseFile = async(type) => {
    // let options = {
    //   mediaType: 'photo',
    //   maxWidth: 300,
    //   maxHeight: 550,
    //   quality: 1,
    // };
    // launchImageLibrary(options, (response) => {
    //   console.log("Response = ", response);

    //   if (response.didCancel) {
    //     alert("User cancelled camera picker");
    //     return;
    //   } else if (response.errorCode == "camera_unavailable") {
    //     alert("Camera not available on device");
    //     return;
    //   } else if (response.errorCode == "permission") {
    //     alert("Permission not satisfied");
    //     return;
    //   } else if (response.errorCode == "others") {
    //     alert(response.errorMessage);
    //     return;
    //   }
    //   console.log("base64 -> ", response.base64);
    //   console.log("uri -> ", response.uri);
    //   console.log("width -> ", response.width);
    //   console.log("height -> ", response.height);
    //   console.log("fileSize -> ", response.fileSize);
    //   console.log("type -> ", response.type);
    //   console.log("fileName -> ", response.fileName);
    //   const filteredArray = response.assets.filter((item) => {
    //     console.log(item.base64);
    //     setFilePath(item.uri);
    //   });
    //   console.log(filePath);
    // });
  // };
  const db = SQLite.openDatabase(
    {
      name: "QuranicCure.db",
      location: "default",
      createFromLocation: "~www/QuranicCure.db",
    },
    () => {},
    (error) => {
      console.log(error);
    }
  );
  const insertData = () => {
    db.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO Category (Category_Name, Image) VALUES (?,?)",
        [name, filePath],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert("Data Inserted Successfully....");
          } else Alert.alert("Failed....");
        }
      );
    });
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>
          Add New Category
        </Text>
      </View>
      <Image
        source={require("./images/oqt.jpg")}
        style={{
          width: 300,
          height: 180,
          marginLeft: 30,
          borderRadius: 30,
          marginTop: 5,
        }}
      />
      <Text style={{ fontSize: 25, marginLeft: "30%", fontWeight: "bold" }}>
        Quranic Cure
      </Text>

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text style={styles.name}>Category Name</Text>
        <TextInput
          value={name}
          onChangeText={(name) => setName(name)}
          style={styles.textinputname}
        ></TextInput>
      </View>
      <View style={{ flex: 1 }}>
        {filePath == "nol" ? (
          <Text>.</Text>
        ) : (
          <Image
            source={{ uri: filePath }}
            style={{
              width: 200,
              height: 130,
              marginLeft: 80,
              marginTop: 10,
              borderRadius: 10,
            }}
          />
        )}
      </View>
      <View style={{ flex: 2 }}>
        <View style={{ flexDirection: "column", marginTop: 10 }}>
          <Text
            style={{
              color: "black",
              marginLeft: 115,
              fontSize: 25,
              fontWeight: "bold",
            }}
          >
            UploadImage
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ marginLeft: 150 }}
            onPress={() => chooseFile("photo")}
          >
            <Image
              source={require("./images/cam.jpg")}
              style={{
                backgroundColor: "white",
                width: 70,
                height: 50,
                marginTop: 10,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Text
            style={{
              borderRadius: 5,
              backgroundColor: "black",
              color: "white",
              padding: 10,
              paddingHorizontal: 40,
              marginLeft: 10,
            }}
            onPress={() => {
              insertData();
              navigation.navigate("Category");
            }}
          >
            Save
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
  name: {
    fontSize: 22,
    marginLeft: 28,
    marginTop: 5,
    color: "black",
    fontWeight: "bold",
    marginLeft: 10,
  },
  textinputname: {
    width: "50%",
    height: 40,
    color: "white",
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "black",
    marginLeft: 10,
    marginTop: 5,
    borderWidth: 3,
    textAlign: "center",
    borderRadius: 5,
  },
});

export default NewCategory;
