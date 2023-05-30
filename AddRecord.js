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
import { FlatList } from "react-native";
import { ScrollView } from "react-native";
import { ToastAndroid } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

function AddRecord({ route, navigation }) {
  const [disease, setDisease] = useState("");
  const [diseaseArray, setDiseaseArray] = useState([]);
  const [Description, setDescription] = useState("");
  const [Counter, setCounter] = useState(10);
  const [SelectedSurah, setSS] = useState(1);
  const [SelectedDisease, setSD] = useState({id:1});
  const [refresh, setRefresh] = useState(false);
  const [SurahName, setSN] = useState("Al-Fatihah");
  const [Surah, setSurah] = useState([]);
  const [from, setfrom] = useState(1);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);
  const [to, setto] = useState(7);
  const [Count, setCount] = useState(0);
  const [filePath, setFilePath] = useState("nol");
  // const [Multiple, setMultiple] = useState([]);
  const type = route.params.type;
  const detail = route.params.detail;
  const multiple = route.params.multiple;

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
  const getdiseases = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Dua;",
        [],
        (tx, results) => {
          const rows = results.rows;
          let users = [];

          for (let i = 0; i < rows.length; i++) {
            users.push({
              ...rows.item(i),
            });
          }
          setDiseaseArray(users);
    
          //console.log(users);
        }
      );
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
  const add_record = () => {
    var val = 1;
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE Nuskha set history=? where id=?",
        [val, detail.id],
        (tx, results) => {
          console.log('history update', results.rowsAffected);
          Alert.alert("Alert", "Record Added Successfully....");
            navigation.goBack();
        }
      );
    });
  };
  const insertData = async() => {
    // console.log('multiple',multiple)
            var did = SelectedDisease;
            multiple.forEach((item)=>{
              addMultiple(did,item)
            })
            
            Alert.alert("Alert", "Record Added to the disease....");
            navigation.goBack();
          
  };
  const addMultiple = (did,item)=>{
  db.transaction(function (tx) {
    tx.executeSql(
      "INSERT INTO multiple (did,surah,fromm,too,counter,count) VALUES (?,?,?,?,?,?)",
      [
        did,
        item.surah,
        item.fromm,
        item.too,
        item.counter,
        item.count
      ],
      (tx, results) => {
        console.log('inserted:',results)
      })});
  }
  useEffect(() => {
    // surah();
    getdiseases();
  }, [Count]);
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>Add Record to disease</Text>
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
            color: "black",
            fontWeight: "bold",
            marginLeft: 35,
            marginTop: 5,
          }}
        >
          {type == 'Dua' ? 'Disease' : 'Nuskha'}
        </Text>
        {/* <TextInput
          placeholder="Enter Name"
          value={type == 'Dua' ? detail.Disease :detail.name}
          // onChangeText={(disease) => setDisease(disease)}
          editable={false}
          style={{
            color: "black",
            width: "56%",
            height: 55,
            backgroundColor: "white",
            marginLeft: 30,
          }}
        ></TextInput> */}
        {/* <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={{
        color: "black",
        width: "56%",
        height: 55,
        backgroundColor: "white",
        marginLeft: 30,
        borderColor: 'white'
      }}
      placeholder="Select Disease"
    /> */}
    <Picker
          selectedValue={SelectedDisease}
          style={{
            paddingHorizontal: 100,
            backgroundColor: "white",
            marginLeft: 30,
            marginRight: 20,
          }}
          onValueChange={(itemValue, itemIndex) => {
            setSD(itemValue)
            console.log('sd',SelectedDisease)
          }}
        >
          {diseaseArray.map((dis, index) => (
            <Picker.Item
              key={index}
              label={dis.Disease}
              value={dis.id}
            />
          ))}
        </Picker>
      </View>
      
      {/* <View style={{ flexDirection: "row", marginTop: 5 }}>
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
      </View> */}
      {/* <View style={{ flexDirection: "row", marginTop: 5 }}>
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

      <View style={{ flexDirection: "row", marginTop: 10,justifyContent:'space-between',paddingHorizontal:10 }}>
      <View
        style={{
          flexDirection:'row',
          alignItems:'center'
        }}>
        <Text
          style={{
            fontSize: 22,
            color: "black",
            fontWeight: "bold",
          }}
        >
          From
        </Text>
        <TextInput
          keyboardType={"numeric"}
          value={String(from)}
          onChangeText={(value) => setfrom(value)}
          style={styles.textinput}
        ></TextInput>
        </View>
        <View
        style={{
          flexDirection:'row',
          alignItems:'center'
        }}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
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
        <View
        style={{
          flexDirection:'row',
          alignItems:'center'
        }}>
        <Text
          style={{
            fontSize: 22,
            color: "black",
            fontWeight: "bold",
          }}
        >
          Counter
        </Text>
        <TextInput
          keyboardType={"numeric"}
          value={String(Counter)}
          onChangeText={(value) => setCounter(value)}
          style={styles.textinput}
        ></TextInput>
        </View>
      </View> */}
      {/* <View style={{ flexDirection: "row", marginTop: 5 }}>
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
      </View> */}
      {/* <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
      >
        <TouchableOpacity>
          <Text style={styles.buttonSave} onPress={() => {
            const newVar = {
              SurahName: SurahName,
              SurahId : SelectedSurah,
              from: from,
              to : to,
              counter : Counter,
            }
            const newArr = Multiple;
            newArr.push(newVar)
            setMultiple(newArr);
            setRefresh(!refresh)
          }}>
            add
          </Text>
        </TouchableOpacity>
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

        <FlatList
        data={Multiple}
        refreshing={refresh}
        scrollEnabled={false}
        style={{margin:0}}
        renderItem={({item,index})=>(
        <View style={{ flexDirection: "row", borderTopWidth: 2 }}>
          <View style={{ width: 40, borderRightWidth: 2 }}>
            <Text style={styles.tabletext1}>{index+1}</Text>
          </View>
          <View style={{ width: 180, borderRightWidth: 2 }}>
            <Text style={styles.tabletext1}>{item.SurahName}</Text>
          </View>
          <View style={{ width: 60, borderRightWidth: 2 }}>
            <Text style={styles.tabletext1}>{item.from}</Text>
          </View>
          <View style={{ width: 60 }}>
            <Text style={styles.tabletext1}>{item.to}</Text>
          </View>
        </View>
        )}/>

      </View> */}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
      >
        <TouchableOpacity style={{}}>
          <Text style={styles.buttonSave} onPress={() => {
              // insertData()
              add_record();
            }}>
            save
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems:"center",
    backgroundColor: `pink`,
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
  buttonSave: {
    width: 70,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 10,
    marginLeft: 150,
    backgroundColor: "black",
    borderRadius: 5,
  },
  tabletext: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: "center",
  },
  tabletext1: {
    fontSize: 18,
    textAlign: "center",
  },
  textinput: {
    color: "black",
    width: 35,
    height: 35,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "black",
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
export default AddRecord;
