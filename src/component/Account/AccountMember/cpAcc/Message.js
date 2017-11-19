import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <View>
                <Text>This is Message Component!</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({

});