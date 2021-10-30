/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { pushNotifications } from './src/config';

pushNotifications.createChannel();

AppRegistry.registerComponent(appName, () => App);
