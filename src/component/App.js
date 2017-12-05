import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

import Main from './Main/Main';
import { MainStack, SideMenu } from './Router';
export default class App extends Component {
    render() {
        return (
            <MainStack />
        )
    }
}
