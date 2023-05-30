import React, { useState } from 'react';

import { StyleSheet, Text, Image, View, Button, TextInput, TouchableOpacity } from 'react-native';

function Dua() 
    // const [open, setOpen] = useState(false);
    // const [value, setValue] = useState(null);
    // const [items, setItems] = useState([
    //   {label: 'heart', value: 'heart '},
    //   {label: 'barin', value: 'brain '}
    // ]);
    return (




        <View style={styles.container}>
            <Image source={require('./images/oqt.jpg')} style={{ width: 370, height: 200 }} />

            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={styles.buttoncategory}>
                    Category
                   </Text>
                        {/* { <View style={{marginLeft:30,width:200,height:40,color:'green'}}><DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    /></View>}
       
       */}
            </View>

                {/* <TextInput style={{width:'50%',height:40,color:'white',borderRadius:30,borderWidth:2,
               borderColor:'white',textAlign:'center',
                    ,marginLeft:30,marginTop:10}}></TextInput> */}


            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Text style={{ fontSize: 22, fontStyle: 'bold', color: '#a9a9a9', marginLeft: 30 }}>
                    Diesease
                </Text>
                {/* <View style={{ marginLeft: 30, width: 200, height: 40, color: '#a9a9a9', }}><DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                /></View>  */}

                {/* { <TextInput style={{color:'white', width:'50%',height:40,textAlign:'center', borderWidth:2,borderColor:'white',  
                marginLeft:40, borderRadius:30}}>
                </TextInput> } */}
            </View>



            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Text style={{ fontSize: 22, fontStyle: 'bold', color: 'white', marginLeft: 30 }}>
                    Discription
                </Text>
                {/* <View style={{marginLeft:13,width:200,height:40,color:'green'}}><DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    /></View> */}

                {/* <TextInput style={{color:'white', width:'50%',height:40,textAlign:'center', borderWidth:2,borderColor:'white',  
                marginLeft:15, borderRadius:30}}>
                </TextInput> */}
            </View>

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Text style={{ fontSize: 22, fontStyle: 'bold', color: 'white', marginLeft: 30 }}>
                    Surah
                </Text>
                {/* <View style={{marginLeft:60,width:200,height:40,color:'#a9a9a9'}}><DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    /></View> */}

                {/* <TextInput style={{color:'white', width:'50%',height:40,textAlign:'center', borderWidth:2,borderColor:'white',  
                marginLeft:60, borderRadius:30}}>
                </TextInput> */}
            </View>

            <View style={{ flexDirection: 'row', marginTop: 30 }}>
                <Text style={{ fontSize: 22, fontStyle: 'bold', color: 'white', marginLeft: 30 }}>
                    To
                </Text>
                <TextInput style={{
                    color: 'white', width: '10%', height: 35, textAlign: 'center', borderWidth: 2,
                    borderColor: 'white',
                    marginLeft: 10, borderRadius: 10
                }}>
                </TextInput>
                <Text style={{ fontSize: 22, fontStyle: 'bold', color: 'white', marginLeft: 50 }}>
                    From
                </Text>
                <TextInput style={{
                    color: 'white', width: '10%', height: 35, textAlign: 'center', borderWidth: 2,
                    borderColor: 'white',
                    marginLeft: 10, borderRadius: 10
                }}>
                </TextInput>
            </View>


            <View style={{ flexDirection: 'row', marginTop: 30 }}>
                <Text style={{ fontSize: 22, fontStyle: 'bold', color: 'white', marginLeft: 30 }}>
                    counter
                </Text>
                <TextInput style={{
                    color: 'white', width: '10%', height: 35, textAlign: 'center', borderWidth: 2, borderColor: 'white',
                    marginLeft: 10, borderRadius: 10
                }}>
                </TextInput>
            </View>








            <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 30, }}>

                <TouchableOpacity style={{}} >
                    <Text style={styles.buttonSave}>save</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{}} >
                    <Text style={styles.buttonAdd}>Add</Text>
                </TouchableOpacity>
            </View>


        </View>
    );


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems:"center",
        backgroundColor: 'black',


    },
    buttoncategory: {
        fontSize: 22,
        marginLeft: 30, marginTop: 10,
        color: 'white'
    },
    buttonSave: {
        width: 70,
        height: 40,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 10,
        marginLeft: 130,
        backgroundColor: 'white',
        borderRadius: 20
    },
    buttonAdd: {
        width: 70,
        height: 40,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 10,
        marginLeft: 200,
        backgroundColor: 'white',
        borderRadius: 20
    },


});
export default Dua;
