import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import SQLite from "react-native-sqlite-storage";
function plus({ route, navigation }) {
  const [count, setcount] = useState(0);
  const [SelectedSurah, setSS] = useState("");
  const [SurahName, setSN] = useState("");
  const [Surah, setSurah] = useState([]);
  const [from, setfrom] = useState(1);
  const [to, setto] = useState(9);
  const type = route.params.type;
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
  const surah = () => {
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
      if (item.Id == i) setto(item.NumberOfAyats);
      setSN(item.EnglishName);
      return item;
    });
  };
  useEffect(() => {
    surah();
  }, [count]);
  return (
    <View style={styles.container}>
      <Image
        source={require("./images/a.jpg")}
        style={{
          width: 300,
          height: 150,
          marginLeft: 30,
          marginTop: 10,
          borderColor: "#00ffff",
          borderRadius: 30,
        }}
      />
      <Text style={{ fontSize: 30, marginLeft: "25%", fontWeight: "bold" }}>
        Quranic Cure
      </Text>
      <View style={{ flexDirection: "row", marginTop: 5 }}>
        <Text
          style={{
            fontSize: 22,
            fontStyle: "bold",
            color: "black",
            fontWeight: "bold",
            marginLeft: 40,
            marginTop: 8,
          }}
        >
          Surah
        </Text>
      </View>
      <View style={{ paddingLeft: 10 }}>
        <Picker
          selectedValue={SelectedSurah}
          style={{
            paddingHorizontal: 100,
            backgroundColor: "white",
            marginLeft: 30,
            marginRight: 20,
            marginTop: 10,
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
      <View>
        <Text
          style={{
            fontSize: 22,
            fontStyle: "bold",
            color: "black",
            fontWeight: "bold",
            marginLeft: 40,
            marginTop: 8,
          }}
        >
          Ayat
        </Text>
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

      <View>
        <TouchableOpacity>
          <Text
            style={styles.buttonSave}
            maxLength={3}
            onPress={() => navigation.navigate("NewDua", { type: type })}
          >
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
    marginTop: 0,
    backgroundColor: `#2f4f4f`,
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
  buttonSave: {
    width: 70,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 30,
    marginLeft: 150,
    backgroundColor: "black",
    borderRadius: 5,
  },
});
export default plus;
