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
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { HeaderBackButton } from "react-navigation-stack";
import { useIsFocused } from "@react-navigation/native";

import SQLite from "react-native-sqlite-storage";
import {  } from "react-native-gesture-handler";
import Category from "./Category";
function Pac({  navigation }) {
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
      getPac();
    
    }, [isFocused]);
    async function getPac() {
        let temp = [];
        await db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM Dua where (counter >0 AND counter <10 ) and Category in('Lungs','Heart','Eyes','') ",
            // console.log(Pac.Category)
            [],
            async function (tx, results) {
              let len = results.rows.length;
              console.log('    ---------------------------    ',len);
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
      const deletedata = () => {
        db.transaction((tx) => {
          tx.executeSql("DELETE FROM Dua ",
           [Category ],
           
            (tx, results) => {
            //console.log(results);
          });
        });
      };
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
        PARCTICE
      </Text>
      {/* <Text style={styles. buttondelete} onPress={() => deletedata()}>Clear </Text> */}
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
                navigation.navigate("detail", { detail: cure, isPac: true })
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
      flex:1,
      marginTop: 0,
      backgroundColor:'pink', 
  
    },
    pic:{
        width:300,
        height: 150,
        marginLeft: 20,
        borderRadius: 10,
        marginTop: 15,
    },
    buttondelete: {
      width: 70,
      height: 40,
      textAlign: "center",
      textAlignVertical: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: 17,
      marginTop: 10,
      marginLeft: 15,
      backgroundColor: "black",
      borderRadius: 5,
    },
   
     
    
    });
export default Pac;