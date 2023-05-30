import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { HeaderBackButton } from "react-navigation-stack";
import { useIsFocused } from "@react-navigation/native";
import SQLite from "react-native-sqlite-storage";
function Log({ navigation }) {
  const [cures, setcures] = useState([]);
  const isFocused = useIsFocused();
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
  useEffect(() => {
    getLog();
  }, [isFocused]);

  async function getLog() {
    let temp = [];
    await db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Dua where counter > ?",
        [0],
        async function (tx, results) {
          let len = results.rows.length;
          console.log(len);
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              var row = results.rows.item(i);
              temp.push(row);
            }
          }

          setcures(temp);
        }
      );
    });
  }
  return (
    <View style={styles.container}>
      <ScrollView>
      <Image source={require("./images/a.jpg")} style={styles.pic} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          alignSelf: "center",
          color: "black",
          textAlignVertical: "center",
          marginTop: 10,
          marginLeft: 10,
        }}
      >
        LOG
      </Text>
      <View
        style={{
          justifyContent: "flex-start",
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 10,
          borderRadius: 10,
          marginLeft: 20,
          width: 320,
        }}
      >
        {/* {console.log("ITEMMM===>", cures.length)} */}
        {cures.map((cure, index) => (
          <TouchableOpacity key={index}>
            <Image
              source={{ uri: cure.Image }}
              style={{
                width: 70,
                height: 70,
                marginLeft: 30,
                borderRadius: 10,
                marginTop: 25,
              }}
            />
            <Text
              style={{
                fontSize: 15,
                width: 70,
                borderRadius: 5,
                height: 40,
                marginLeft: 30,
                flexWrap: "wrap",
                fontWeight: "bold",
                alignContent: "center",
                textAlign: "center",
                marginTop: 5,
                backgroundColor: `black`,
                color: "white",
              }}
              onPress={() =>
                navigation.navigate("detail", { detail: cure, isLog: true })
              }
            >
              {cure.Disease}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "pink",
    borderColor: "black",
  },

  pic: {
    width: 300,
    height: 150,
    textAlign: "center",
    alignContent: "center",
    textAlignVertical: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "black",
    borderRadius: 10,
    marginTop: 10,
  },
});
export default Log;
