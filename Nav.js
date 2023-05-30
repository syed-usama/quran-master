import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { HeaderBackButton } from "react-navigation-stack";
import { useIsFocused } from "@react-navigation/native";
import SQLite from "react-native-sqlite-storage";
function Nav({ navigation }) {
  const [favourites, setFavourites] = useState([]);
  let isFocused = useIsFocused();
  const [cures, setcures] = useState([]);
  let favTemp = [];
  let favDuas = [];

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
    getFavourites();
  }, [isFocused]);

  const getFavourites = async () => {
    let users = [];
    await db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM favourite",
        [],
        async function (tx, results) {
          let len = results.rows.length;
          console.log(len);
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              var row = results.rows.item(i);
              favTemp.push(row);
            }
          }
          await getFavouriteDua(favTemp).then((response) => {});
        }
      );
    });
  };

  async function getFavouriteDua(array) {
    let temp = [];
    return new Promise(async (resolve, reject) => {
      array.map(async (item, index) => {
        await db.transaction(async (tx) => {
          await tx.executeSql(
            "SELECT * FROM Dua where id = ?;",
            [item.d_id],
            async function (tx, results) {
              if (results.rows.length > 0) {
                temp.push(results.rows.item(0));
                if (array.length === temp.length) {
                  console.log("Temp.len===>", temp.length);
                  await setcures(temp);
                }
              }
            }
          );
          // console.log("ARRAY ==>", array.length, "   TEMPPP==>", index);
        });
      });
      resolve(temp);
    });
  }

  return (
    <View style={styles.container}>
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
        FAVOURITE DATA
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
              onPress={() => navigation.navigate("detail", { detail: cure })}
            >
              {cure.Disease}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
export default Nav;
