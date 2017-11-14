import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ScrollView,
    TouchableWithoutFeedback, TouchableOpacity, Image,
    Dimensions
} from 'react-native';
import icback from '../../img/icback.png';
import global from '../../global';
import saveToken from '../../../api/saveToken';
import { NavigationActions } from 'react-navigation';

const { height, width } = Dimensions.get('window');

import BTNAC from '../AccountMember/view/buttonAccount';
import mk from '../AccountMember/images/changepass.png';
import sharehotel from '../AccountMember/images/sharehotel.png';
import logout from '../AccountMember/images/logout.png';
import pending from '../AccountMember/images/pending.png';
import user from '../AccountMember/images/user.png';
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
                    NavigationActions.navigate({ routeName: 'WelcomeScreen' })
                ]
            });
            this.props.navigation.dispatch(resetAction);
        } else {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'MainScreen' })
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
                    <Text numberOfLines={1} style={{ fontWeight: 'bold', paddingLeft: 10, color: 'black', fontSize: 15 }}>Trang quản trị Admin</Text>

                </View>

                <ScrollView contentContainerStyle={{ paddingVertical: 10, height: height }}>
                    <View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 20 }}>
                            <Image source={user} style={styles.image} />
                            <Text style={styles.text}>Admin</Text>
                        </View>

                        <View style={{ top: 35 }}>
                            <BTNAC
                                text={'Chờ duyệt'}
                                source={pending}
                                click={this.goDuyetKS.bind(this)}
                            />
                            <BTNAC
                                text={'Quản lý khách sạn'}
                                source={sharehotel}
                                click={this.goQLKS.bind(this)}
                            />
                            <BTNAC
                                text={'Cá nhân'}
                                source={mk}
                                click={this.goQLKS.bind(this)}
                            />
                            <BTNAC
                                text={'Đăng xuất'}
                                source={logout}
                                click={this.Logout.bind(this)}
                            />
                        </View>
                    </View>
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
    },
    image: {
        width: 100,
        height: 100,
    },
    text: {
        fontSize: 25,
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginTop: 20,
    }
})