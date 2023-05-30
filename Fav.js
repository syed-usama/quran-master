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
import { TabRouter } from "react-navigation";
function Fav({ navigation,route }) {
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
    await db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM "+route.params.type+" where favorite = 1;",
        [],
        async function (tx, results) {
          console.log('res',results)
          const rows = results.rows;
          let users = [];

          for (let i = 0; i < rows.length; i++) {
            users.push({
              ...rows.item(i),
            });
          }
          setcures(users);
        }
      );
    });
  };

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
        Favorite {route.params.type}
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
              onPress={() => navigation.navigate(route.params.type == "Nuskha" ? "NuskhaDetail" :"detail", { detail: cure })}
            >
              
              {route.params.type == "Nuskha" ? cure.name : cure.Disease}
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
export default Fav;
