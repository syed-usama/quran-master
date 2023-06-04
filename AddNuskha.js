import React, { useEffect } from "react";
import { useState } from "react";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  TextInput,Alert,
  TouchableOpacity,
} from "react-native";
import SQLite from "react-native-sqlite-storage";
import ImageCropPicker from "react-native-image-crop-picker";

function AddNuskha({ route, navigation  }) {
  const type = route.params.type;
  const [filePath, setFilePath] = useState("nol");
  const [name, setName] = useState("");
  const [disease, setdisease] = useState(type?.Category_Name);
  const [nuskha, setnuskha] = useState("");
  const [reference, setreference] = useState("");
  
  // console.log(type?.Category_Name,'--------------------');
  const chooseFile = async(type) => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 550,
      compressImageQuality: 1,
      mediaType: 'photo',
    }).then(image => {
      setFilePath(image.path)
    });
  }
  // const chooseFile = (type) => {
  //   let options = {
  //     mediaType: type,
  //     maxWidth: 300,
  //     maxHeight: 550,
  //     quality: 1,
  //   };
  //   launchImageLibrary(options, (response) => {
  //     //console.log('Response = ', response);

  //     if (response.didCancel) {
  //       alert("User cancelled camera picker");
  //       return;
  //     } else if (response.errorCode == "camera_unavailable") {
  //       alert("Camera not available on device");
  //       return;
  //     } else if (response.errorCode == "permission") {
  //       alert("Permission not satisfied");
  //       return;
  //     } else if (response.errorCode == "others") {
  //       alert(response.errorMessage);
  //       return;
  //     }
  //     const filteredArray = response.assets.filter((item) => {
  //       //console.log(item.base64);
  //       setFilePath(item.uri);
  //     });
  //     //console.log(filePath);
  //   });
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
        "INSERT INTO Nuskha ( Nuskha-name,image,disease,reference) VALUES (?,?,?,?)",
        [
          nuskha,
          filePath,
          disease,
          reference,
        ],
        (tx, results) => {
          console.log(1231231);
          console.log('Results', results.rowsAffected,'--------resr------------',results,'------------');

          if (results.rowsAffected > 0) {
            
            Alert.alert("Data Inserted Successfully....");
          } else Alert.alert("Failed....");
        },
        (error) => {
          console.log(error);
      }
      )
    })
    // Alert.alert("Alert", "Record Added Successfully");
    // navigation.navigate("type", { type: type });
    console.log(213123);
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
          Add New Nuskha
        </Text>
        
      </View>
    
      {/* <Image
        source={require("./images/oqt.jpg")}
        style={{
          width: 300,
          height: 180,
          marginLeft: 30,
          borderRadius: 30,
          marginTop: 5,
        }}
      /> */}
      {/* <Text style={{ fontSize: 25, marginLeft: "30%", fontWeight: "bold" }}>
        Quranic Cure
      </Text> */}

<Image
        source={require("./images/img.jpg")}
        style={{
          width: 300,
          height: 150,
          marginLeft: 30,
          borderRadius: 30,
          marginTop: 10,
        }}
      />
     
<View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text
          style={{
            fontSize: 22,
            // fontStyle: "bold",
            color: "black",
            fontWeight: "bold",
            marginLeft: 30,
            marginTop: 5,
          }}
        >
          Nuskha name 
        </Text>
        <TextInput
          placeholder="Enter Nuskha name"
          value={nuskha}
          onChangeText={(Nuskha) => setnuskha(Nuskha)}
          style={{
            color: "black",
            width: "43%",
            height: 55,
            backgroundColor: "white",
            marginLeft: 5,
            borderRadius:10,
          }}
        ></TextInput>
      </View>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text
          style={{
            fontSize: 22,
            color: "black",
            fontWeight: "bold",
            marginLeft: 30,
            marginTop: 5,
          }}
        >
          Disease
        </Text>
        <TextInput
          placeholder={disease?disease:'Enter Disease Name'}
          // placeholder={disease}
          value={disease}
          onChangeText={(disease) => setdisease(disease)}
          editable={false}
          style={{
            color: "black",
            width: "43%",
            height: 55,
            backgroundColor: "white",
            marginLeft: 60,
            borderRadius:10,
          }}
        ></TextInput>
      </View>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text
          style={{
            fontSize: 22,
            color: "black",
            fontWeight: "bold",
            marginLeft: 30,
            marginTop: 5,
          }}
        >
          reference
        </Text>
        <TextInput
          placeholder="Enter reference"
          value={reference}
          onChangeText={(reference) => setreference(reference)}
          style={{
            color: "black",
            width: "43%",
            height: 55,
            backgroundColor: "white",
            marginLeft: 40,
            borderRadius:10,
            
          }}
        ></TextInput>
      </View>
      <View style={{ flexDirection: "row", marginTop: 5 }}>
        <Text
          style={{
            fontSize: 22,
            color: "black",
            fontWeight: "bold",
            marginLeft: 30,
            marginTop: 5,
          }}
        >
          image
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ marginLeft: 50 }}
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
        {filePath == "nol" ? (
          <Text>.</Text>
        ) : (
          <Image
            source={{ uri: filePath }}
            style={{
              width: 70,
              height: 50,
              marginLeft: 30,
              marginTop: 10,
              borderRadius: 10,
            }}
          />
        )}
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
      >
        <TouchableOpacity style={{}} onPress={() => insertData()}>
          <Text style={styles.buttonSave} onPress={() => insertData()}>
            save
          </Text>
        </TouchableOpacity>
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
  buttonSave: {
    width: 70,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 10,
    marginLeft: 150,
    backgroundColor: "black",
    borderRadius: 5,
  },
  
});

export default AddNuskha;
