/**
 * @format
 */

// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

import React from 'react';
import { register } from '@videosdk.live/react-native-sdk';
import { AppRegistry, Platform } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import store from './src/store';

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
// Register the service
register();

AppRegistry.registerComponent(appName, () => Root);
