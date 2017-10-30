import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableOpacity,Image
} from 'react-native';
import icback from '../../img/icback.png';
import global from '../../global';
import saveToken from '../../../api/saveToken';
import { NavigationActions } from 'react-navigation';

export default class TrangQuanLyAdmin extends Component {
    goBack() {
        this.props.navigation.goBack();
    }
    goDuyetKS() {
        this.props.navigation.navigate('DuyetKhachSan');
    }
    goQLKS() {
        this.props.navigation.navigate('QuanLyKhachSan');
    }
    Logout() {
        saveToken('');
        global.onSignIn = null;
        this.replaceScreen();
      }
      replaceScreen = () => {
        const { flag } = this.props.navigation.state.params;
        if (flag === '1') {
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'WelcomeScreen'})
            ]
          });
          this.props.navigation.dispatch(resetAction);
        } else {
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'MainScreen'})
            ]
          });
          this.props.navigation.dispatch(resetAction);
        }
      };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => { this.goBack(); }}
                    >
                        <Image style={{ width: 25, height: 25 }} source={icback} />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={{ fontWeight: 'bold', paddingLeft: 10 }}>Trang chủ Admin</Text>
                    
                </View>

                <ScrollView>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.goDuyetKS();
                        }}
                    >
                        <View style={styles.row}>
                            <Text>Chờ duyệt</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.goQLKS();
                        }}
                    >
                        <View style={styles.row}>
                            <Text>Quản lý khách sạn</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                    >
                        <View style={styles.row}>
                            <Text>Cá nhân</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                        onPress={() => this.Logout()}
                    >
                        <View style={styles.row}>
                            <Text>Đăng xuất</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        padding: 10,
        borderBottomWidth: 0.7
    },
    header: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 40,
        padding: 4,
        alignItems: 'center',
        
        borderBottomWidth: 1,
        paddingHorizontal: 5
    }
})