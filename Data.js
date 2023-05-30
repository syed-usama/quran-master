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
function Data({ route, navigation }) {
 
  // const isFun = route.params?.isFun ? true : false;

  const [count, setct] = useState("");
  const [count1, setcount1] = useState(1);
  const [Ayat, setAyat] = useState([]);
  const [Tverse, setTverse] = useState();
  const [english, setenglish] = useState([]);
  const [urdu, seturdu] = useState([]);
  const [audio, setaudio] = useState([]);
  const [flag, setflag] = useState("0");
  const [counter, setconter] = useState(0);
  const isFocused = useIsFocused();
  const [isFavourite, setFavourite] = useState(false);
  const [isadd, setisadd] = useState(false);

  const db = SQLite.openDatabase(
    {
      name: "QuranicCure.db",
      location: "default",
      createFromLocation: "~www/QuranicCure.db",
    },
    () => { },
    (error) => {
      console.log(error);
    }
  );
  const update = (str) => {
    var countt = counter;
    var cont = detail.count;
    if (str == "plus" && countt < cont) {
      countt++;
    } if (str == "minus" && countt != 0) {
      countt--;
    }
    if (str == "reset") {
      countt = 0;
    }
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE Dua set counter=? where id=?",
        [countt, detail.id],
        (tx, results) => {
          //console.log('Results', results.rowsAffected);
        }
      );
    });
    // console.log('details   ==>    '+JSON.stringify(detail.countt))
    setconter(countt);
  };


  const getdata = () => {
    if (detail.counter == null) {
      setconter(0);
    } else {
      setconter(detail.counter);
    }
    let Ausers = [];
    console.log('details   ==>    ' + JSON.stringify(detail.fromm))
    for (let i = detail.fromm; i <= detail.too; i++) {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM Ayat where surah=? AND verse=? ;",
          [detail.surah, i],
          (tx, results) => {
            const rows = results.rows;

            for (let i = 0; i < rows.length; i++) {
              Ausers.push({
                ...rows.item(i),
              });

            }
            //console.log(users);
            //setAyat(users);
          }
        );
      });
    }
  
    setAyat(Ausers);
    let Eusers = [];
    for (let i = detail.fromm; i <= detail.too; i++) {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM quranEnglish where SuraID=? AND VerseID=? ;",
          [detail.surah, i],
          (tx, results) => {
            const rows = results.rows;

            for (let i = 0; i < rows.length; i++) {
              Eusers.push({
                ...rows.item(i),
              });
            }

            //console.log(users);
            //setenglish(users);
          }
        );
      });
    }
    setenglish(Eusers);
    let Uusers = [];
    for (let i = detail.fromm; i <= detail.too; i++) {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM quranUrdu where SuraID=? AND VerseID=? ;",
          [detail.surah, i],
          (tx, results) => {
            const rows = results.rows;

            for (let i = 0; i < rows.length; i++) {
              Uusers.push({
                ...rows.item(i),
              });
            }

            //console.log(users);
            //seturdu(users);
          }
        );
      });
    }
    seturdu(Uusers);
    var ref = 1;
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM AyatAudio where SurahRef=? AND AyatId=? AND ReciterRef=?;",
        [detail.surah, detail.fromm, ref],
        (tx, results) => {
          const rows = results.rows;
          let users = [];

          for (let i = 0; i < rows.length; i++) {
            users.push({
              ...rows.item(i),
            });
          }

          //console.log(users);
          setaudio(users);
        }
      );
    });

  };
  const totalvers=()=>{
    let totl=detail.too-detail.fromm;
    setTverse(totl);

  }
  const pause = async () => {
    SoundPlayer.pause();
    setflag("1");
  };
  const resume = async () => {
    SoundPlayer.resume();
    setflag("2");
  };
  const start = async () => {
    var namee = audio[0].AudioFile;
    var a = "a";
    var String_3 = a.concat("", namee);
    var newstring = String_3.replace(".mp3", "");
    SoundPlayer.playSoundFile(newstring, "mp3");
    setflag("2");
  };
  const deletedata = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM  Dua where id=?",
        [detail.id],
        (tx, results) => {
          //console.log(results);
          alert("Deleted");
        }
      );
    });
  };

  const checkFavourite = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM FAVOURITE where d_id=?",
        [detail.id],
        function (tx, results) {
          let len = results.rows.length;
          console.log("LENGHT===>", len);
          if (len > 0) {
            setFavourite(true);
          }
        }
      );
    });
  };

  const addFavourite = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM FAVOURITE where d_id=?",
        [detail.id],
        function (tx, results) {
          console.log("HOHO===>", results.rows.length);
          if (results.rows.length === 0) {
            db.transaction((tx) => {
              tx.executeSql(
                "INSERT INTO FAVOURITE (d_id) Values (?)",
                [detail.id],
                (tx, results) => {
                  console.log(results.rowsAffected, " Rows Inserted");
                  setFavourite(true);
                },
                (err) => {
                  console.log("ERROR WHILE ADDING FAVOURITE", err);
                }
              );
            });
          }
        }
      );
    });
  };
  const removeFavourite = () => {
    db.transaction((tx) => {
      tx.executeSql(

        "DELETE from FAVOURITE where d_id=?",
        [detail.id],
        (tx, results) => {
          console.log(results.rowsAffected, " Rows Deleted");
          setFavourite(false);
        },
        (err) => {
          console.log("Error while Deleting Favourite");
        }
      );
    });
  };
  const addFavourite1 = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM FAVOURITE where d_id=?",
        [detail.id],
        function (tx, results) {
          console.log("HOHO===>", results.rows.length);
          if (results.rows.length === 0) {
            db.transaction((tx) => {
              tx.executeSql(
                "INSERT INTO FAVOURITE (d_id) Values (?)",
                [detail.id],
                (tx, results) => {
                  console.log(results.rowsAffected, " Rows Inserted");
                  setisadd(true);
                },
                (err) => {
                  console.log("ERROR WHILE ADDING FAVOURITE", err);
                }
              );
            });
          }
        }
      );
    });
  };
  const removeFavourite1 = () => {
    db.transaction((tx) => {
      tx.executeSql(

        "DELETE from FAVOURITE where d_id=?",
        [detail.id],
        (tx, results) => {
          console.log(results.rowsAffected, " Rows Deleted");
          setisadd(false);
        },
        (err) => {
          console.log("Error while Deleting Favourite");
        }
      );
    });
  };
  useEffect(() => {
    console.log("HISTORY????====?>   ", isHistory);
    console.log("PAC????====?>   ", isPac);
    checkFavourite();
    getdata();
    totalvers();
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
        {<Icon
          name={isFavourite ? "heart" : "heart-outline"}
          size={25}
          style={{ marginHorizontal: "5%", marginVertical: "2.5%" }}
          onPress={() => {
            isFavourite ? removeFavourite() : addFavourite();
          }}
        />}
         {<Icon
          name={isadd ? "heart" : "heart-outline"}
          size={25}
          style={{ marginHorizontal: "5%", marginVertical: "2.5%" }}
          onPress={() => {
            isadd ? removeFavourite1() : addFavourite1();
          }}
        />}
        {/* <Text onPress={()=>navigation.navigate('Edit',{detail:detail})} style={{marginLeft:0,color: 'red', fontWeight: "bold",fontSize: 20}}>Edit</Text> */}

        {/* <Text onPress={()=>deletedata()} style={{marginLeft:0,color: 'red', fontWeight: "bold",fontSize: 14}}>delete</Text> */}
      </View>
      <ScrollView>
        {!isPac ? (
          <>
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
            {!isT ? (
              <>
              {global.check2==='active' ?
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
                    Ayat:
                  </Text>

                  {Ayat.map((ayyat, index) => (
                    <Text
                      key={index}
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        alignContent: "center",
                        textAlign: "center",
                        marginTop: 5,
                        marginLeft: 17,
                      }}
                    >
                      {ayyat.ayat}
                    </Text>

                  ))}
                </View>
                :null
                    }

              </>
            ) : null}
          
            {!isHistory ? (
              <>


                {global.check == 'active' ?

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
                      Translation-English:
                    </Text>
                    {english.map((ayyat, index) => (
                      <Text
                        key={index}
                        style={{
                          fontSize: 15,
                          fontWeight: "bold",
                          alignContent: "center",
                          textAlign: "center",
                          marginTop: 5,
                          marginLeft: 17,
                        }}
                      >
                        {ayyat.AyahText}
                      </Text>
                    ))}
                  </View>
                  : null
                }

                {global.check1 == 'active' ?

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
                      Translation-urdu:
                    </Text>
                    {urdu.map((ayyat, index) => (
                      <Text
                        key={index}
                        style={{
                          fontSize: 15,
                          fontWeight: "bold",
                          alignContent: "center",
                          textAlign: "center",
                          marginTop: 5,
                          marginLeft: 17,
                        }}
                      >
                        {ayyat.AyahText}
                      </Text>
                    ))}
                  </View>
                  : null
                }

              </>
            ) : null}

          </>
        ) : null}
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
            Total verse: 
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
              {Tverse}
              </Text>

        
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
                
              </Text>
          </View>
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
            Audio:
          </Text>
          <View
            style={{
              flexDirection: "row",
              borderWidth: 1,
              marginLeft: "20%",
              margin: 10,
              height: 40,
              width: "60%",
              backgroundColor: "white",
            }}
          >
            {flag == "0" ? (
              <TouchableOpacity onPress={() => start()}>
                <Image
                  source={require("./images/play.png")}
                  style={{ width: 40, height: 40, marginLeft: 10 }}
                />
              </TouchableOpacity>
            ) : flag == "1" ? (
              <TouchableOpacity onPress={() => resume()}>
                <Image
                  source={require("./images/play.png")}
                  style={{ width: 40, height: 40, marginLeft: 10 }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => pause()}>
                <Image
                  source={require("./images/pause.jpg")}
                  style={{ width: 40, height: 40, marginLeft: 10 }}
                />
              </TouchableOpacity>
            )}
            {audio.map((aud, index) => (
              <Text
                key={index}
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  alignContent: "center",
                  textAlign: "center",
                  marginTop: 8,
                  marginLeft: 10,
                }}
              >
                {aud.Duration}
              </Text>
            ))}

            <Text

              style={{

                width: 40,
                borderWidth: 1,
                borderRadius: 5,
                color: "red",
                backgroundColor: "white",
                marginLeft: 110,
                textAlign: "center",
                paddingTop: 7,
              }}
            >
              {counter}

            </Text>


          </View>

        </View>

        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              borderRadius: 5,
              borderWidth: 1,
              width: 100,
              marginLeft: 10,
              borderColor: "black",
              color: "red",
              backgroundColor: "black",
            }}
          >
            Counter
          </Text>
          <TouchableOpacity onPress={() => update("minus")}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                borderRadius: 5,
                borderWidth: 1,
                width: 25,
                marginLeft: 10,
                borderColor: "black",
                color: "red",
                marginTop: 5,
                paddingLeft: 5,
                backgroundColor: "black",
              }}
            >
              -
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              width: 40,
              borderWidth: 1,
              borderRadius: 5,
              color: "red",
              backgroundColor: "white",
              marginLeft: 10,
              textAlign: "center",
              paddingTop: 7,
            }}
          >
            <Text> 10</Text>
          </Text>

          <TouchableOpacity onPress={() => update("plus")}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                borderRadius: 5,
                borderWidth: 1,
                width: 25,
                marginLeft: 10,
                borderColor: "black",
                color: "red",
                marginTop: 5,
                paddingLeft: 5,
                backgroundColor: "black",
              }}
            >
              +
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => update("reset")}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                alignItems: 'center',
                alignSelf: 'center',
                alignContent: 'center',
                textAlign: 'center',
                borderRadius: 5,
                borderWidth: 1,
                width: 80,
                marginLeft: 10,
                borderColor: "black",
                color: "red",
                marginTop: 5,
                paddingLeft: 5,
                backgroundColor: "black",
              }}
            >
              Reset

            </Text>
          </TouchableOpacity>
        </View>

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
export default Data;
