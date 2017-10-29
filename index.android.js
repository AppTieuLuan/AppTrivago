/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import App from './src/component/App';
export default class AppTrivago extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('AppTrivago', () => AppTrivago);