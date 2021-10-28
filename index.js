/**
 * @format
 */

import { AppRegistry, NativeModules, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
const { GroupNotification } = NativeModules;

GroupNotification.createNotificationChannel()

AppRegistry.registerComponent(appName, () => App);
