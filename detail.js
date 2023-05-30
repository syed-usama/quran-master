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
} from "react-native";
import SQLite from "react-native-sqlite-storage";
import { useIsFocused } from "@react-navigation/native";
import SoundPlayer from "react-native-sound-player";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import DetailComponent from "./component/detailComponent/detailComponent";
import { FlatList } from "react-native-gesture-handler";
function detail({ route, navigation }) {
  const detail = route.params.detail;
  const isHistory = route.params?.isHistory ? true : false;

  const [count, setcount] = useState("");
  const [count1, setcount1] = useState(1);
  const [multiple, setMultiple] = useState([]);
  const [Ayat, setAyat] = useState([]);
  const [english, setenglish] = useState([]);
  const [urdu, seturdu] = useState([]);
  const [audio, setaudio] = useState([]);
  const [flag, setflag] = useState("0");
  const [counter, setconter] = useState(0);
  const isFocused = useIsFocused();
  const [isFavourite, setFavourite] = useState(detail.favorite);

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
    console.log('detail',detail.id)
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM multiple where did=? ;",
        [detail.id],
        function (tx, results) {
          const rows = results.rows;
          let mdata = [];
            for (let i = 0; i < rows.length; i++) {
              mdata.push({
                ...rows.item(i),
              });
            }
            console.log('mdata',mdata)
          setMultiple(mdata)
        }
      );
    });
  };
  const deletedata = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM  Dua where id=?",
        [detail.id],
        (tx, results) => {
          //console.log(results);
          alert("Deleted");
          navigation.goBack();
        }
      );
    });
  };
  const updateFavorite = () => {
    const val = !isFavourite
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE Dua set favorite=? where id=?",
        [val, detail.id],
        (tx, results) => {
          console.log('favourite update', results.rowsAffected);
        }
      );
    });
    setFavourite(!isFavourite);
  };
  const updateHistory = (m_id) => {
    var val = 0;
    const update = multiple.filter((item)=>{
      if(item.id != m_id && item.count != item.counter){
        console.log('item 1',item)
        val = 1
      }
    })
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE Dua set history=? where id=?",
        [val, detail.id],
        (tx, results) => {
          console.log('history update', results.rowsAffected);
        }
      );
    });
  };
  const updateHistory2 = () => {
    var val = 1;
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE Dua set history=? where id=?",
        [val, detail.id],
        (tx, results) => {
          console.log('history update', results.rowsAffected);
        }
      );
    });
  };
  useEffect(() => {
    console.log("detail????====?>   ", detail);
    // checkFavourite();
    getdata();
    //check for Favourite
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",

          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 30,
            flex: 1,
            textAlign: "center",
          }}
        >
          {detail.Disease}
        </Text>
        {/**FAVOURITE MODULEE */}
        {/* <Icon
          name={isFavourite ? "heart" : "heart-outline"}
          size={25}
          style={{ marginHorizontal: "5%", marginVertical: "2.5%" }}
          onPress={() => {
            updateFavorite()
          }}
        /> */}
        <Entypo
          name={"plus"}
          size={30}
          style={{ marginHorizontal: "5%", marginVertical: "2.5%" }}
          onPress={() => {
            navigation.navigate('AddRecord',{type:'Dua',detail:detail})
          }}
        />
        {/* <Text onPress={()=>navigation.navigate('Edit',{detail:detail})} style={{marginLeft:0,color: 'red', fontWeight: "bold",fontSize: 20}}>Edit</Text> */}

        {/* <Text onPress={()=>deletedata()} style={{marginLeft:0,color: 'red', fontWeight: "bold",fontSize: 14}}>delete</Text> */}
      </View>
      <ScrollView>
      <View style={{ height: 70, width: "100%", backgroundColor: "pink" }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                alignContent: "center",
                color: "red",
                textAlignVertical: "center",
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              Category Name:
            </Text>

            {/** Adding Favourites */}
          </View>

          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              alignContent: "center",
              marginTop: 5,
              marginLeft: 20,
              textAlign: "center",
            }}
          >
            {detail.Category}
          </Text>
        </View>
        <View style={{ height: 70, width: "100%", backgroundColor: "pink" }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                alignContent: "center",
                color: "red",
                textAlignVertical: "center",
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              Disease:
            </Text>

            {/** Adding Favourites */}
          </View>

          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              alignContent: "center",
              marginTop: 5,
              marginLeft: 20,
              textAlign: "center",
            }}
          >
            {detail.Disease}
          </Text>
        </View>
        {/* <View style={{width:'100%', backgroundColor:'pink'}}>
            <Text  style={{fontSize:20, fontWeight:'bold',alignContent:'center',color:'red',textAlignVertical:'center',marginTop:10, marginLeft:10}}>
               Detail:
                </Text>
                <Text style={{fontSize:15, fontWeight:'bold',alignContent:'center',textAlign:'center',marginTop:5,}}>
                {detail.Detail}
                </Text>
                </View> */}
        <View style={{ width: "100%", backgroundColor: "pink" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              alignContent: "center",
              color: "red",
              textAlignVertical: "center",
              marginTop: 10,
              marginLeft: 10,
            }}
          >
            Prescription:
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              alignContent: "center",
              textAlign: "center",
              marginTop: 5,
              marginLeft: 17,
            }}
          >
            {detail.Description}
          </Text>
        </View>
        <FlatList
        data={multiple}
        renderItem={({item,index})=>(
        <DetailComponent diseasedDtail={detail} surahDetail={item} updateHistory={updateHistory} updateHistory2={updateHistory2}/>
        )}/>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
});
export default detail;
