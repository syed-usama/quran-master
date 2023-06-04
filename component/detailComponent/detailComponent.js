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
const DetailComponent = ({ diseasedDtail,surahDetail,updateHistory,updateHistory2 })=> {
  const [Ayat, setAyat] = useState([]);
  const [english, setenglish] = useState([]);
  const [urdu, seturdu] = useState([]);
  const [audio, setaudio] = useState([]);
  const [flag, setflag] = useState("0");
  const [Duration, setDuration] = useState("");
  const [counter, setconter] = useState(surahDetail.count);
  const isFocused = useIsFocused();
  const [audionNum , setAudioNum] = useState('');
  const [cur , setCur] = useState(0);
  const [isPlaying , setPlaying] = useState(false);
  const [isFavourite, setFavourite] = useState(false);

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
    SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
      
      if(success){
        setflag("0")
        //  console.log('finished playing', success)
      }
    })
  const update = () => {
    var newcount = counter-1;
    if (counter <= 1) {
      newcount = surahDetail.counter;
    }
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE multiple set count=? where id=?",
        [newcount, surahDetail.id],
        (tx, results) => {
          console.log('counter updated', results.rowsAffected);
        }
      );
    });
    setconter(newcount);
    if(newcount == surahDetail.counter){
      console.log('set 0')
      updateHistory(surahDetail.id)
    }else{
      console.log('set 1')
      updateHistory2();
    }
  };
  const getdata = () => {

    let Ausers = [];
    for (let i = surahDetail.fromm; i <= surahDetail.too; i++) {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM Ayat where surah=? AND verse=? ;",
          [surahDetail.surah, i],
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
    for (let i = surahDetail.fromm; i <= surahDetail.too; i++) {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM quranEnglish where SuraID=? AND VerseID=? ;",
          [surahDetail.surah, i],
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
    for (let i = surahDetail.fromm; i <= surahDetail.too; i++) {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM quranUrdu where SuraID=? AND VerseID=? ;",
          [surahDetail.surah, i],
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
    let users = [];
    var ref = 1;
    for (let i = surahDetail.fromm; i <= surahDetail.too; i++) {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM AyatAudio where SurahRef=? AND AyatId=? AND ReciterRef=?;",
        [surahDetail.surah, i, ref],
        (tx, results) => {
          const rows = results.rows;
          

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
  }
  };
  const pause = async () => {
    SoundPlayer.pause();
    setflag("1");
  };
  const resume = async () => {
    SoundPlayer.resume();
    setflag("2");
  };

  const start = async (a) => {
    console.log('start')
    audio.map((aud,index) =>{
      if(index == cur){
        setDuration(aud.Duration)
      }
    })
     var namee = audio[cur].AudioFile;
     var n =cur+1
     if(n >= audio.length){
      
      n =0;
      update()
     }
     setCur(n)
    var a = "a";
    var String_3 = a.concat("", namee);
    var newstring = String_3.replace(".mp3", "");
    SoundPlayer.playSoundFile(newstring, "mp3");
    
    setflag("2");
  };
  useEffect(() => {
    getdata();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <ScrollView>
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
                  source={require("../../images/play.png")}
                  style={{ width: 40, height: 40, marginLeft: 10 }}
                />
              </TouchableOpacity>
            ) : flag == "1" ? (
              <TouchableOpacity onPress={() => resume()}>
                <Image
                  source={require("../../images/play.png")}
                  style={{ width: 40, height: 40, marginLeft: 10 }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => pause()}>
                <Image
                  source={require("../../images/pause.jpg")}
                  style={{ width: 40, height: 40, marginLeft: 10 }}
                />
              </TouchableOpacity>
            )}
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  alignContent: "center",
                  textAlign: "center",
                  marginTop: 8,
                  marginLeft: 10,
                }}
              >
                {Duration? Duration : "00:00:00"}
              </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => update()}>
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
            {counter}
          </Text>

          {/* <TouchableOpacity onPress={() => update("plus")}>
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
          </TouchableOpacity> */}
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
export default DetailComponent;
