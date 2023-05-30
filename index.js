/**
 * @format
 */

import { AppRegistry } from "react-native";
//import app from './Home';
import { name as appName } from "./app.json";
import App from "./App";
import app from "./HomeScreen";

AppRegistry.registerComponent(appName, () => App);
