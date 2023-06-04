import React from "react";
// import Logbox from react-native ;
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  TextInput,
  TouchableOpacity,ScrollView
} from "react-native";
import { HeaderBackButton } from "react-navigation-stack";
import { useIsFocused } from "@react-navigation/native";

import SQLite from "react-native-sqlite-storage";
import { FlatList } from "react-native";
function type({ route, navigation }) {
  const [count, setcount] = useState("");
  const [count1, setcount1] = useState(1);
  const [cures, setcures] = useState([]);
  const [nuskha, setNuskha] = useState([]);
  const [namee, setnamee] = useState("heart");
  const type = route.params.type;
  const isFocused = useIsFocused();
  //  Logbox.ignoreAll()
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
  const getdata = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Dua where Category = ?;",
        [type.Category_Name],
        (tx, results) => {
          const rows = results.rows;
          let users = [];

          for (let i = 0; i < rows.length; i++) {
            users.push({
              ...rows.item(i),
            });
          }
          setcures(users);
    
          //console.log(users);
        }
      );
    });
  };
  const getNusqadata = () => {
    console.log(12312);
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Nuskha where Category = ?;",
        [type.Category_Name],
        (tx, results) => {
          const rows = results.rows;
          let Nuska = [];
          for (let i = 0; i < rows.length; i++) {
            Nuska.push({
              ...rows.item(i),
            });
          }(error) => {
            console.log(error);
        }
        setNuskha(Nuska);
        
        }
      );
    });
  }

  useEffect(() => {
      getdata();
    getNusqadata()
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row', marginLeft:30}}>
      <TouchableOpacity
        style={{ alignSelf: "center", marginTop: 30 }}
        onPress={() => navigation.navigate("NewNuskha", { type: type })}
      >
        <Text style={styles.buttonnewdua}>Add new nuskha</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignSelf: "center", marginTop: 30 , marginLeft:20}}
        onPress={() => navigation.navigate("NewDua", { type: type })}
      >
        <Text style={styles.buttonnewdua}>Add new Dua</Text>
      </TouchableOpacity>
      </View>
    
    
      <Image
        source={{ uri: type.Image }}
        style={{
          width:300,
          height:180,
          marginLeft: 30,
          borderRadius: 30,
          marginTop: 5,
        }}
      />

      <Text
        style={{
          fontSize: 25,

          marginLeft: "30%",
       
        }}
      >
        Disease of {type.Category_Name}
      </Text>
      <View
        style={{
          // flex:1,
          marginTop: 0, marginLeft: 20,
        }}
      >
        <FlatList
        data={cures}
        style={{margin:0,height:170,width:300}}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        renderItem={({item,index})=>(
          <TouchableOpacity key={index} 
          onPress={() => navigation.navigate("detail", { detail: item })}>
            <Image
              source={{ uri: item.Image }}
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
              // onPress={() => navigation.navigate("detail", { detail: item })}
            >
              {item?.Disease}
            </Text>
          </TouchableOpacity>
  )}
        />
      </View>

      <Text
        style={{
          fontSize: 25,

          marginLeft: "30%",
       
        }}
      >
        Nuskha o {type.Category_Name}
      </Text>
      <View
        style={{
          // flex:1,
          height:200,
          marginTop: 10, marginLeft: 20,
        }}
      >
        <FlatList
        data={nuskha}
        style={{margin:0,height:170,width:300}}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        renderItem={({item,index})=>(
          <TouchableOpacity key={item.id}
          onPress={() => navigation.navigate("NuskhaDetail", { detail: item })}>
            <Image
              source={{ uri: item.Image }}
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
              
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
  )}
        />
        
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: `pink`,
  },

  // buttonrfersh: {
  //   width: 70,
  //   height: 40,
  //   textAlign: "center",
  //   textAlignVertical: "center",
  //   color: "white",
  //   fontWeight: "bold",
  //   fontSize: 17,
  //   marginTop: 10,
  //   marginLeft: 15,
  //   backgroundColor: "black",
  //   borderRadius: 5,
  // },

  buttonnewdua: {
    width: 130,
    height: 60,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    backgroundColor: "black",
    borderRadius: 5,
  },
});
export default type;
