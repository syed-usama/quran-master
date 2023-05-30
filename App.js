import React, { Component } from "react";
//import { createAppContainer } from '@react-navigation/native';
//import { createStackNavigator} from '@react-navigation/native-stack';
//import { createAppContainer } from 'react-navigation';
//import { createStackNavigator} from 'react-navigation-stack';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import Home from './Home';
//import signUp  from './signUp';
//import Login from './Login';
//import Teachersignup from './Teachersignup';
//import Studentlogin from './Studentlogin';;
import Category from "./Category";
import NewCategory from "./NewCategory";
import HomeScreen from "./HomeScreen";
import NewDua from "./NewDua";
import Add from "./NewDua";
import type from "./type";

import plus from "./plus";
import part from "./plus";
import detail from "./detail";
import New from "./New";
import Edit from "./Edit";
import Fav from "./Fav";
import Log from "./Log";
import Pac from "./Pac";
import T from "./T";
import Nav from "./Nav";
import Data from "./Data";
import Setting from "./Setting";
// import Flatlist from "./Flatlist";
import { LogBox } from "react-native";
import AddNuskha from "./AddNuskha";
import NewNuskha from "./NewNuskha";
import NuskhaDetail from "./nuskhaDetail";
import History from "./History";
import AddRecord from "./AddRecord";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator();

export default function App() {
  // const ip = '192.168.43.225:8080';
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Category"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen component={Category} name="Category" />
        <Stack.Screen component={NewCategory} name="NewCategory" />
        <Stack.Screen component={HomeScreen} name="HomeScreen" />
        <Stack.Screen component={NewDua} name="NewDua" />
        <Stack.Screen component={Add} name="Add" />
        <Stack.Screen component={type} name="type" />
        <Stack.Screen component={detail} name="detail" />
        <Stack.Screen component={plus} name="plus" />
        <Stack.Screen component={part} name="part" />
        <Stack.Screen component={New} name="New" />
        <Stack.Screen component={Edit} name="Edit" />
        <Stack.Screen component={Fav} name="tec" />
        <Stack.Screen component={Pac} name="Pac" />
        <Stack.Screen component={Nav} name="Nav" />
        <Stack.Screen component={Data} name="Data" />
        <Stack.Screen component={AddNuskha} name="AddNuskha" />
        <Stack.Screen component={NewNuskha} name="NewNuskha" />
        <Stack.Screen component={NuskhaDetail} name="NuskhaDetail" />
        <Stack.Screen component={History} name="History" />
        <Stack.Screen component={AddRecord} name="AddRecord" />


        <Stack.Screen component={Log} name="Log" />
        <Stack.Screen component={T} name="T" />
        {/* <Stack.Screen component={Flatlist} name="Flatlist" /> */}
        <Stack.Screen component={Setting} name="Setting" />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const App = createStackNavigator({

//   Category: { screen: Category,navigationOptions:{headerShown:false,headerTintColor:'white',headerStyle:
//    {backgroundColor:'white',

//     height:60, }} },
//     Home_Screen : { screen: HomeScreen,navigationOptions:{headerShown:false,headerTintColor:'white',headerStyle:
//     {backgroundColor:'black',
//   height:60, }} },

//    NewCategory: { screen: NewCategory,navigationOptions:{headerShown:true,headerTintColor:'white',headerStyle:
//    {backgroundColor:'black',
//     height:60, }} },

//     NewDua: { screen: NewDua,navigationOptions:{headerShown:true,headerTintColor:'white',headerStyle:
//     {backgroundColor:'black',
//      height:60, }} },
//      plus: { screen: part,navigationOptions:{headerShown:true,headerTintColor:'white',headerStyle:
//      {backgroundColor:'black',
//       height:60, }} },

//      add: { screen: NewDua,navigationOptions:{headerShown:true,headerTintColor:'white',headerStyle:
//      {backgroundColor:'black',
//       height:60, }} },

//       type: { screen: type,navigationOptions:{headerShown:true,headerTintColor:'white',headerStyle:
//     {backgroundColor:'black',
//      height:60, }} },

//       detail: { screen:detail ,navigationOptions:{headerShown:true,headerTintColor:'white',headerStyle:
//       {backgroundColor:'black',
//        height:60, }} },

//      part: { screen: part,navigationOptions:{headerShown:true,headerTintColor:'white',headerStyle:
//      {backgroundColor:'black',
//       height:60, }} },

//   },
//   {

//   }
// );
// export default createAppContainer(App);
