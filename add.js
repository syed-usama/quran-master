import React from 'react';
import { StyleSheet, Text, Image, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { withOrientation } from 'react-navigation';
0
export default class add extends React.Component {
    render() {

        return (




         <View style={styles.container}>
                  <Image source={require('./images/oqt.jpg')} style={{ width: 370, height: 200 }} />

             <View style={{flexDirection:'row',marginTop:10}}>
                  <Text style={{fontSize:22, fontStyle:'bold', marginLeft:30,marginTop:10,color:'white'}}>
                      Category
                   </Text>
               <TextInput style={{width:'50%',height:40,color:'white',borderRadius:30,borderWidth:2,
               borderColor:'white',textAlign:'center'
                    ,marginLeft:30,marginTop:10}}></TextInput>
             </View>

             <View style={{flexDirection:'row', marginTop:20}}>
                <Text style={{fontSize:22, fontStyle:'bold',color:'white', marginLeft:30}}> 
                    Dieease
                </Text>
            <TextInput style={{color:'white', width:'50%',height:40,textAlign:'center', borderWidth:2,borderColor:'white',  
                marginLeft:40, borderRadius:30}}>
                </TextInput>
            </View>
        

            
            <View style={{flexDirection:'row', marginTop:20}}>
                <Text style={{fontSize:22, fontStyle:'bold',color:'white', marginLeft:30}}> 
                    Discription
                </Text>
            <TextInput style={{color:'white', width:'50%',height:40,textAlign:'center', borderWidth:2,borderColor:'white',  
                marginLeft:15, borderRadius:30}}>
                </TextInput>
            </View>
            
            <View style={{flexDirection:'row', marginTop:20}}>
                <Text style={{fontSize:22, fontStyle:'bold',color:'white', marginLeft:30}}> 
                    Surah
                </Text>
            <TextInput style={{color:'white', width:'50%',height:40,textAlign:'center', borderWidth:2,borderColor:'white',  
                marginLeft:60, borderRadius:30}}>
                </TextInput>
            </View>

            <View style={{flexDirection:'row', marginTop:30}}>
                <Text style={{fontSize:22, fontStyle:'bold',color:'white', marginLeft:30}}> 
                    To
                </Text>
            <TextInput style={{color:'white', width:'10%',height:35,textAlign:'center', borderWidth:2,
            borderColor:'white',  
                marginLeft:10, borderRadius:10}}>
                </TextInput>
                <Text style={{fontSize:22, fontStyle:'bold',color:'white', marginLeft:50}}> 
                    From
                </Text>
            <TextInput style={{color:'white', width:'10%',height:35,textAlign:'center', borderWidth:2,
            borderColor:'white',  
                marginLeft:10, borderRadius:10}}>
                </TextInput>
            </View>

            
            <View style={{flexDirection:'row', marginTop:30}}>
                <Text style={{fontSize:22, fontStyle:'bold',color:'white', marginLeft:30}}> 
                    counter
                </Text>
            <TextInput style={{color:'white', width:'10%',height:35,textAlign:'center', borderWidth:2,borderColor:'white',  
                marginLeft:10, borderRadius:10}}>
                </TextInput>
            </View>


               



            

                <View style={{ flexDirection: 'row',alignItems:"center", marginTop:30, }}>
                <View style={{}}>
                    <TouchableOpacity style={{ marginLeft: 30 }} >
                        <Text style={{
                            height: 40
                            , color: 'black', fontWeight: 'bold', fontSize: 20,textAlign:'center',alignItems:'center',
                            backgroundColor: 'white', borderRadius:15,borderWidth:1,
                        }}>Save</Text>
                    </TouchableOpacity>
                    </View>
                    <View style={{}}>
                        <TouchableOpacity style={{}} >
                            <Text style={{
                                width: 50, height: 40, 
                                color: 'black', fontSize: 20,textAlign:'center',fontWeight: 'bold',
                                backgroundColor: 'white', marginLeft: 200,borderRadius:15
                            }}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
       // alignItems:"center",
        backgroundColor: 'black',


    },
    textfield: {
        borderBottomWidth: 1,
        width: '50%',
        alignSelf: 'center',
    },
    textfield2: {
        
        alignSelf: 'center',
        borderBottomLeftRadius: 2,
        width: '50%',
    },

});

