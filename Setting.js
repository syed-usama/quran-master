import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  TextInput,
  ScrollView,
  BackButton,
  TouchableOpacity,
  Alert,
} from "react-native";
import SQLite from "react-native-sqlite-storage";
import { useIsFocused } from "@react-navigation/native";
import SoundPlayer from "react-native-sound-player";
import Fontisto from "react-native-vector-icons/Fontisto";
const myIcon = 3;
function Setting({ navigation }) {
  const [check, setcheck] = useState("passive");
  const [check1, setcheck1] = useState("passive");
  const [check2, setcheck2] = useState("");
  const [check3, setcheck3] = useState("");
  global.check = check;
  global.check1 = check1;
  global.check2 = check2;
  global.check3 = check3;



useEffect(() => {
    console.log('checkbox', check);
   
  }, [check,check1])

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text
          style={{
            color: "black",
            fontSize: 30,
            fontWeight: "bold",
            alignItems: "center",
          }}
        >
          SETTING
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginLeft: 10,
          marginRight: 10,
          marginTop: 5,
        }}
      >
        <View style={{ marginTop: 10, height: 100 }}>
          <Image
            source={require("./images/a.jpg")}
            style={{
              width: 330,
              height: 200,
              borderColor: "#00ffff",
              borderColor: "black",
              borderRadius: 10,
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 150,
        }}
      >
        <View>
          {check == "active" ? (
            <Fontisto
            name="checkbox-active"
            size={40}
            color="black"
            onPress={() => setcheck("passive")}
          />
          ) : (
            <Fontisto
            name="checkbox-passive"
            size={40}
            color="black"
            onPress={() => setcheck("active")}
          />
          )}
          <Text style={{ color: "black", marginTop: 10, fontWeight:'bold', fontSize:15 }}>for English</Text>
        </View>
        <View>
          {check1 == "active" ? (
            <Fontisto
            name="checkbox-active"
            size={40}
            color="black"
            onPress={() => setcheck1("passive")}
          />
          ) : (
            <Fontisto
            name="checkbox-passive"
            size={40}
            color="black"
            onPress={() => setcheck1("active")}
            On
          />
           
          )}
          <Text style={{ color: "black", marginTop: 10, fontWeight:'bold', fontSize:15 }}>for Urdu</Text>
        </View>
      </View>
      <View style={{flexDirection:'row',justifyContent: "space-around",marginTop:70, }}>
        <View>
        {check2 == "active" ? (
            <Fontisto
            name="radio-btn-active"
            size={40}
            color="black"
            onPress={() => setcheck2("passive")}
          />
          ) : (
            <Fontisto
            name="radio-btn-passive"
            size={40}
            color="black"
            onPress={() => setcheck2("active")}
            On
          />
           
          )}
              <Text style={{ color: "black", marginTop: 10, fontWeight:'bold', fontSize:15 }}>for Ayat</Text>

          
          </View>
          {/* <View>
        {check3 == "active" ? (
            <Fontisto
            name="radio-btn-active"
            size={40}
            color="black"
            onPress={() => setcheck3("passive")}
          />
          ) : (
            <Fontisto
            name="radio-btn-passive"
            size={40}
            color="black"
            onPress={() => setcheck3("active")}
            On
          />
           
          )}
    
    <Text style={{ color: "black", marginTop: 10, fontWeight:'bold', fontSize:15 }}>for Descriiption</Text>

          </View> */}
      </View>
      {global.check1=='passive' ?
      
      <Text></Text>
      :null
    }
     {global.check=='passive' ?
      
      <Text></Text>
      :null
    }
    
      {global.check2=='passive'?
      <Text>

      </Text>
      :null
      }
      {global.check3=='passive'?
      <Text>

      </Text>
      :null
      }
    
    </View>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "pink",
  },
  cat: {
    width: 200,
    height: 50,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 10,
    marginLeft: "20%",
    backgroundColor: "black",
    borderRadius: 1,
  },
});

export default Setting;