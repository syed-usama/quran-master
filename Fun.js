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
  BackButton,
  TouchableOpacity,
  FlatList,
} from "react-native";
import SQLite from "react-native-sqlite-storage";
import { useIsFocused } from "@react-navigation/native";
import SoundPlayer from "react-native-sound-player";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
 function Fun({  navigation }) {



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

 }
  const styles= StyleSheet.create({
      container : {
        flex: 1,
        marginTop: 0,
        backgroundColor: "black",
      },
      pic:{
        width:300,
        height: 150,
        marginLeft: 20,
        borderRadius: 10,
        marginTop: 15,
    },

  });
  export default Fun;