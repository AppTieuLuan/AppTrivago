import React, { Component } from 'react';
import {
    View, Text, StyleSheet, DatePickerAndroid, TouchableWithoutFeedback
} from 'react-native';

export default class HeaderFlatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ischeckin: false,
            ischeckout: false,
            roomtype: false
        };
    }

    async openAndroidDatePicker() {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
              // Use `new Date()` for current date.
              // May 25 2020. Month 0 is January.
              date: new Date(2020, 4, 25),
              mode:'calendar'
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                alert(day)
            }
          } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
          }
      }

    
    render() {
        return (
            <View style={styles.container}>
                
                <TouchableWithoutFeedback
                    style = {styles.itemHeader}
                    onPress = {()=> this.openAndroidDatePicker()}
                >
                
                <View>
                    <Text>Ngày trả phòng</Text>
                </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    style = {styles.itemHeader}
                    onPress={()=>{alert(345345)}}
                >
                    <View>
                        <Text>FFFF</Text>
                    </View>
                </TouchableWithoutFeedback>
                <View>
                { this.state.ischeckin ? <Text>sdfsdfsdfd</Text> : null}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemHeader: {
        flex: 1
    }
})
