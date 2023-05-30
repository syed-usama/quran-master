import React, { useState, useEffect } from "react";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import SQLite from "react-native-sqlite-storage";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

function Edit({ route, navigation }) {
  const [disease, setDisease] = useState("");
  const [Description, setDescription] = useState("");
  const [Counter, setCounter] = useState(0);
  const [SelectedSurah, setSS] = useState("");
  const [SurahName, setSN] = useState("");
  const [Surah, setSurah] = useState([]);
  const [from, setfrom] = useState(1);
  const [to, setto] = useState(9);
  const [Count, setCount] = useState(0);
  const [filePath, setFilePath] = useState("nol");
  const [Multiple, setMultiple] = useState([]);
  const type = route.params.detail;

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        alert("User cancelled camera picker");
        return;
      } else if (response.errorCode == "camera_unavailable") {
        alert("Camera not available on device");
        return;
      } else if (response.errorCode == "permission") {
        alert("Permission not satisfied");
        return;
      } else if (response.errorCode == "others") {
        alert(response.errorMessage);
        return;
      }
      const filteredArray = response.assets.filter((item) => {
        //console.log(item.base64);
        setFilePath(item.uri);
      });
      //console.log(filePath);
    });
  };
  const surah = () => {
    setDisease(type.Disease);
    setDescription(type.Description);
    setFilePath(type.Image);
    setCounter(type.count);
    setSS(type.surah);
    setto(type.too);
    setfrom(type.fromm);
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM Surah;", [], (tx, results) => {
        const rows = results.rows;
        let users = [];

        for (let i = 0; i < rows.length; i++) {
          users.push({
            ...rows.item(i),
          });
        }

        //console.log(users);
        setSurah(users);
      });
    });
  };
  const SetValues = (i) => {
    setSS(i);
    const filteredArray = Surah.filter((item) => {
      if (item.Id == i) {
        setto(item.NumberOfAyats);
        setSN(item.EnglishName);
      }
      return item;
    });
  };
  const db = SQLite.openDatabase(
    {
      name: "QuranicCure.db",
      location: "default",
      createFromLocation: "~www/QuranicCure.db",
    },
    () => {},
    (error) => {
      //console.log(error);
    }
  );
  const insertData = () => {
    db.transaction(function (tx) {
      tx.executeSql(
        "UPDATE Dua set Category=?, Disease=?,Description=?,surah=?,too=?,fromm=?,counter=?,count=?,Image=? where id=?",
        [
          type.Category,
          disease,
          Description,
          SelectedSurah,
          to,
          from,
          Count,
          Counter,
          filePath,
          type.id,
        ],
        (tx, results) => {
          //console.log('Results', results.rowsAffected);

          if (results.rowsAffected > 0) {
            Alert.alert("Data Inserted Successfully....");
          } else Alert.alert("Failed....");
        }
      );
    });
    Alert.alert("Alert", "Record Updated Successfully");
    navigation.navigate("detail", { detail: type });
  };
  useEffect(() => {
    surah();
  }, [Count]);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>Add New Dua</Text>
      </View>
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
            fontStyle: "bold",
            color: "black",
            fontWeight: "bold",
            marginLeft: 35,
            marginTop: 5,
          }}
        >
          Disease
        </Text>
        <TextInput
          placeholder="Enter Disease Name"
          value={disease}
          onChangeText={(disease) => setDisease(disease)}
          style={{
            color: "black",
            width: "56%",
            height: 55,
            backgroundColor: "white",
            marginLeft: 30,
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
          Description
        </Text>
        <TextInput
          placeholder="Enter Description"
          value={Description}
          onChangeText={(Description) => setDescription(Description)}
          style={{
            color: "black",
            width: "56%",
            height: 55,
            backgroundColor: "white",
            marginLeft: 1,
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
          Counter
        </Text>
        <TextInput
          placeholder="Enter Counts"
          value={String(Counter)}
          onChangeText={(Counter) => setCounter(Counter)}
          style={{
            color: "black",
            width: "56%",
            height: 55,
            backgroundColor: "white",
            marginLeft: 35,
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
          Surah
        </Text>
        <Picker
          selectedValue={SelectedSurah}
          style={{
            paddingHorizontal: 100,
            backgroundColor: "white",
            marginLeft: 55,
            marginRight: 20,
          }}
          onValueChange={(itemValue, itemIndex) => SetValues(itemValue)}
        >
          {Surah.map((ayyat, index) => (
            <Picker.Item
              key={index}
              label={ayyat.EnglishName}
              value={ayyat.Id}
            />
          ))}
        </Picker>
      </View>

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text
          style={{
            fontSize: 22,
            color: "black",
            marginLeft: 50,
            fontWeight: "bold",
          }}
        >
          From
        </Text>
        <TextInput
          keyboardType={"numeric"}
          value={String(from)}
          onChangeText={(from) => setfrom(from)}
          style={styles.textinput}
        ></TextInput>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginLeft: 80 }}>
          To
        </Text>
        <TextInput
          keyboardType={"numeric"}
          maxLength={3}
          value={String(to)}
          onChangeText={(to) => setto(to)}
          style={styles.textinput}
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
          Image
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

      <View style={{ borderWidth: 2, marginHorizontal: 10, marginTop: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: 40, borderRightWidth: 2 }}>
            <Text style={styles.tabletext}>#</Text>
          </View>
          <View style={{ width: 180, borderRightWidth: 2 }}>
            <Text style={styles.tabletext}>Surah</Text>
          </View>
          <View style={{ width: 60, borderRightWidth: 2 }}>
            <Text style={styles.tabletext}>From</Text>
          </View>
          <View style={{ width: 60 }}>
            <Text style={styles.tabletext}>To</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", borderTopWidth: 2 }}>
          <View style={{ width: 40, borderRightWidth: 2 }}>
            <Text style={styles.tabletext1}>1</Text>
          </View>
          <View style={{ width: 180, borderRightWidth: 2 }}>
            <Text style={styles.tabletext1}>{SurahName}</Text>
          </View>
          <View style={{ width: 60, borderRightWidth: 2 }}>
            <Text style={styles.tabletext1}>{from}</Text>
          </View>
          <View style={{ width: 60 }}>
            <Text style={styles.tabletext1}>{to}</Text>
          </View>
        </View>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
      >
        <TouchableOpacity style={{}}>
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
    // alignItems:"center",
    backgroundColor: `#2f4f4f`,
  },

  buttonplus: {
    width: 30,
    height: 30,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 5,
    marginLeft: 150,
    backgroundColor: "black",
    borderRadius: 5,
  },

  textinput: {
    color: "#a9a9a9",
    width: "10%",
    height: 35,
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#a9a9a9",
    marginLeft: 10,
    borderRadius: 10,
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
  tabletext: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  tabletext1: {
    fontSize: 18,
    textAlign: "center",
  },
  textinput: {
    color: "black",
    width: "10%",
    height: 35,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "black",
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
export default Edit;
