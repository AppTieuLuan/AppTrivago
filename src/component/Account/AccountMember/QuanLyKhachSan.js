import React,{ Component } from 'react';
import {
    View, Text, StyleSheet
} from 'react-native';

export default class QuanLyKhachSan extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Tab quản lý khách sạn</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    }
})