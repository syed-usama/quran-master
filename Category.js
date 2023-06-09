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
  ScrollView,
} from "react-native";
import { HeaderBackButton } from "react-navigation-stack";
import SQLite from "react-native-sqlite-storage";
var RNFS = require("react-native-fs");

function Category({ navigation }) {
  const [count, setCount] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [name, setname] = useState(
    "data:image/jpeg;base64,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"
  );
  const [name1, setname1] = useState(require("./imag" + "es/d.jpg"));
  var countt;
  const [categories, setCategories] = useState([]);
  const [categories1, setCategories1] = useState([]);
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
      tx.executeSql("SELECT * FROM Category;",
       [], 
       (tx, results) => {
        const rows = results.rows;
        let users = [];

        for (let i = 0; i < rows.length; i++) {
          users.push({
            ...rows.item(i),
          });
        }
        setCategories(users);
        setCategories1(users);
      });
    });

    //console.log(categories);
  };
  const deletedata = () => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM  Category where id!=0", [Category.Category_Name], (tx, results) => {
        //console.log(results);
      });
    });
  };
  const searchHandle =(s_text)=>{
    console.log(s_text)
    var new_text = s_text.toLowerCase();
    const updateData = categories1.filter((item)=>{
      var item_Text = item.Category_Name.toLowerCase();
      if(item_Text.includes(new_text)){
        return item;
      }
    })
    if(s_text == ''){
      setCategories(categories1);
    }else{
      setCategories(updateData);
    }
    
    setSearchText(s_text)
  }

  useEffect(() => {
    getdata();
  }, [count]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            // justifyContent:"space-between",
            backgroundColor: "pink",
            borderRadius: 1,
          }}
        >
          <Text
            style={styles.buttoncat}
            onPress={() => navigation.navigate("NewCategory")}
          >
            Add Category{" "}
          </Text>
          <Text style={styles.buttonrfersh} onPress={() => getdata()}>
            Refresh{" "}
          </Text>
          {/* <Text
            style={styles.buttontec}
            onPress={() => navigation.navigate("tec")}
          >
            Fav
          </Text> */}
          {/* <TouchableOpacity
            style={{ alignSelf: "center", marginTop: 5 }}
            onPress={() => navigation.navigate("History")}
          >
            <Text
              style={{
                width: 70,
                height: 40,
                textAlign: "center",
                borderRadius: 5,
                textAlignVertical: "center",
                color: "white",
                marginLeft: 5,
                fontWeight: "bold",
                fontSize: 15,
                backgroundColor: "black",
              }}
            >
              History
            </Text>
          </TouchableOpacity> */}

          {/* <Text style={styles. buttondelete} onPress={() => deletedata()}>Delete </Text> */}
        </View>

        {/* <View
          style={{
            flexDirection: "row",
            justifycontent: "flex-start",
            backgroundColor: "pink",
            borderRadius: 1,
          }}
        >
          <Text
            style={styles.buttoncat}
            onPress={() => navigation.navigate("tec",{type:'Dua'})}
          >
            Favorite Disease
          </Text>
          <Text
            style={styles.buttoncat}
            onPress={() => navigation.navigate("tec",{type:'Nuskha'})}
          >
            Favorite Nuskha
          </Text>
        </View> */}

        {/* <View
          style={{
            flexDirection: "row",
            justifycontent: "flex-start",
            backgroundColor: "pink",
            borderRadius: 1,
          }}
        >
          <Text
            style={styles.buttoncat}
            onPress={() => navigation.navigate("History",{type:'Dua'})}
          >
            History Disease
          </Text>
          <Text
            style={styles.buttoncat}
            onPress={() => navigation.navigate("History",{type:'Nuskha'})}
          >
            History Nuskha
          </Text>
        </View> */}

        <View
          style={{
            flexDirection: "row",
            justifyContent:'center',
            alignItems:'center'
          }}
        >
          <Text
            style={styles.buttoncat}
            onPress={() => navigation.navigate("History",{type:'Nuskha'})}
          >
            Added Records
          </Text>
        </View>
        
        {/* <View style={{
          marginTop:10,
          height:40,
          marginHorizontal:20,
          borderRadius:8,
          backgroundColor:'black',
          paddingHorizontal:20
        }}>
          <TextInput
          placeholder="Search category.."
          placeholderTextColor={'white'}
          style={{
            color:'white'
          }}
          value={searchText}
          onChangeText={(value) => searchHandle(value)}
          />
        </View> */}

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "pink",
            flexWrap: "wrap",
            borderRadius: 10,
          }}
        >
          {categories.map((category, index) => (
            <TouchableOpacity 
            onPress={() => navigation.navigate("type", { type: category })}
            key={index} style={{ backgroundColor: "pink", width: "50%" }}>
              <Image
                source={{ uri: category.Image }}
                style={{
                  width: 70,
                  height: 70,
                  marginLeft: 30,
                  marginTop: 50,
                  borderRadius: 5,
                }}
              />
              <Text
                style={styles.heart}
              >
                {category.Category_Name}
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
    backgroundColor: "pink",
    borderWidth: 5,
    borderColor: "black",
  },

  buttoncat: {
    width: 110,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 5,
    marginLeft: 50,
    backgroundColor: "black",
    borderRadius: 5,
  },
  buttontec: {
    width: 70,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 5,
    marginLeft: 5,
    backgroundColor: "black",
    borderRadius: 5,
  },

  buttonfav: {
    width: 70,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 5,
    marginLeft: 15,
    backgroundColor: "black",
    borderRadius: 5,
  },

  buttonrfersh: {
    width: 110,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 5,
    marginLeft:'3%',
    backgroundColor: "black",
    borderRadius: 5,
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
  heart: {
    width: 70,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 10,
    marginLeft: 30,
    backgroundColor: "black",
    borderRadius: 5,
  },
  stomach: {
    width: 70,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 10,
    marginLeft: 130,
    backgroundColor: "black",
    borderRadius: 5,
  },
  eyes: {
    width: 70,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 10,
    marginLeft: 30,
    backgroundColor: "black",
    borderRadius: 5,
  },
  lunges: {
    width: 70,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 10,
    marginLeft: 130,
    backgroundColor: "black",
    borderRadius: 5,
  },
  ear: {
    width: 70,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 10,
    marginLeft: 30,
    backgroundColor: "black",
    borderRadius: 5,
  },
  knee: {
    width: 70,
    height: 40,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 10,
    marginLeft: 130,
    backgroundColor: "black",
    borderRadius: 5,
  },
});

export default Category;
