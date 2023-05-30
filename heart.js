import React from 'react';
 import { StyleSheet, Text,Image, View,Button,TextInput, TouchableOpacity} from 'react-native';
 
 function Heart  ({navigation})  {
     const add = () => {
         var a=10;
         var b =12;
         var c=a + b;
         console.log(c); 
     }
 var a = 10;
      return (
       
        <View style={styles.container}>
            <View style={{flexDirection:'row',}}  >
        
           
           

          </View>
          <TouchableOpacity style={{alignSelf:'center',marginTop: 10,}} onPress={()=>navigation.navigate('NewDua')} >
        <Text style={styles.buttonnewdua}>NewDua</Text>
           </TouchableOpacity>
          <Image source={require('./images/a.jpg')}  style={{width:300,height:180,marginLeft:30,borderRadius:30,marginTop:10}}/>
          
        <Text style={{fontSize:25,fontStyle:'bold',marginLeft:'30%',fontWeight:'bold',}}>
          Quranic Cure

        </Text>
     
 
 
 
        </View> 
      );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex:1,
      marginTop: 0,
      backgroundColor:`#2f4f4f`, 
  
    },
  
    buttonnewdua:{
     width:130,
     height:40,
     textAlign:'center',
     textAlignVertical:'center',
     color:'white',
     fontWeight:'bold',
     fontSize:24,
     backgroundColor:'black',
     borderRadius:5,
    },
   });
export default Heart;
 
 