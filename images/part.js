import React from 'react';
 import { StyleSheet, Text,Image, View,Button,TextInput, TouchableOpacity} from 'react-native';
 
 function part  ({navigation})  {
     const add = () => {
         var a=10;
         var b =12;
         var c=a + b;
         console.log(c);
     }
 var a = 10;
     return (
       
       <View style={styles.container}>
         <Image source={require('./images/a.jpg')}  style={{width:370,height:200, borderColor:'#00ffff',borderRadius:2}}/>
         
         <TouchableOpacity style={{alignSelf:'center',marginTop: 30,}} onPress={()=>navigation.navigate('NewDua')} >
       <Text style={styles.buttonnewdua}>NewDua</Text>
          </TouchableOpacity>
       <TouchableOpacity style={{alignSelf:'center',marginTop: 30,}} onPress={()=>navigation.navigate('Category')}>
       <Text style={styles.buttoncategory}>Category </Text>
    
       </TouchableOpacity>
      
       <TouchableOpacity style={{alignSelf:'center',marginTop: 30,}} onPress={()=>navigation.navigate('NewCategory')} >
       <Text style={styles.buttonnewcategory}>NewCategory </Text>
       </TouchableOpacity>
       {/* <TouchableOpacity style={{alignSelf:'center',marginTop: 30,}} onPress={()=> add()}>
       <Text style={{width:180,height:40,textAlign:'center', 
     textAlignVertical:'center',color:'black',fontWeight:'bold',fontSize:24,
     backgroundColor:'white',borderRadius:40}}>add </Text>
       </TouchableOpacity>
       */}



       </View> 
     );
 }
 
 const styles = StyleSheet.create({
   container: {
     flex:1,
     marginTop: 0,
     backgroundColor:'black', 
 
   },
   buttonnewdua:{
    width:180,
    height:40,
    textAlign:'center',
    textAlignVertical:'center',
    color:'black',
    fontWeight:'bold',
    fontSize:24,
    backgroundColor:'#a9a9a9',
    borderRadius:40
   },
   buttoncategory:{
    width:180,
    height:40,
    textAlign:'center', 
    textAlignVertical:'center',
    color:'black',
    fontWeight:'bold',
    fontSize:24,
    backgroundColor:'#a9a9a9',
    borderRadius:40
   },
   buttonnewcategory:{
    width:180,
    height:40,
    textAlign:'center', 
    textAlignVertical:'center',
    color:'black',
    fontWeight:'bold',
    fontSize:24,
    backgroundColor:'#a9a9a9',
    borderRadius:40
   },

});
export default part;
 
 