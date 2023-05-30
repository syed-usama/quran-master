import React from 'react';
 import { StyleSheet, Text,Image, View,Button,TextInput,ScrollView, TouchableOpacity} from 'react-native';
 
 function HomeScreen  ({navigation})  {
     const add = () => {
         var a=10;
         var b =12;
         var c=a + b;
         console.log(c);
     }
 var a = 10;
     return (
       
       <View style={styles.container}>
         <View style={{flexDirection:'row',justifyContent: "center", }}>
            <Text style={{color:'black' ,fontSize: 30,fontWeight:'bold',alignItems: "center" }}>
            QURANIC CURE
            </Text>
         </View>
      
         <View  style={{flexDirection:'row',marginLeft:10, marginRight:10, marginTop:5, }}>
        <View style={{marginTop:10,height:100}}>
        <Image source={require('./images/a.jpg')}  style={{width:330,height:200, borderColor:'#00ffff',
          borderColor: "black",borderRadius:10}}/>
        <View style={{flexDirection:'column'}} >
        <Text
        style={styles.cat}
            onPress={() => navigation.navigate("Category")}
          >
             Category{" "}
            
          </Text>
          <Text
        style={styles.cat}
            onPress={() => navigation.navigate("NewCategory")}
          >
           New Category{" "}
            
          </Text>
      
          <Text
        style={styles.cat}
            onPress={() => navigation.navigate("Log")}
          >
            LOG{" "}
            
          </Text>
          {/* <Text
        style={styles.cat}
            onPress={() => navigation.navigate("tec")}
          >
            log{" "}
            
          </Text> */}
          {/* <Text
        style={styles.cat}
            onPress={() => navigation.navigate("Pac")}
          >
            pac{" "}
            
          </Text>  */}
       
          {/* <Text
        style={styles.cat}
            onPress={() => navigation.navigate("T")}
          >
            T{" "}
            
          </Text> */}
          <Text
        style={styles.cat}
            onPress={() => navigation.navigate("Setting")}
          >
            Setting{" "}
            
          </Text>
          {/* <Text
        style={styles.cat}
            onPress={() => navigation.navigate("Flatlist")}
          >
            FlatList{" "}
            
          </Text> */}
          {/* <Text
        style={styles.cat}
            onPress={() => navigation.navigate("Nav")}
          >
               navigstion{" "}
            
          </Text> */}
          {/* <Text
        style={styles.cat}
            onPress={() => navigation.navigate("Data")}
          >
               Data{" "}
            
          </Text> */}
        </View>
 


          </View>
 
       
         </View>
        

 


       </View> 
     );
 }
 
 const styles = StyleSheet.create({
   container: {
     flex:1,
     marginTop: 0,
     backgroundColor:'pink', 
 
   },
   cat:{
    width: 200,
    height: 50,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 10,
    marginLeft: '20%',
    backgroundColor: "black",
    borderRadius:1,


   },
 

});
export default HomeScreen;
 
 