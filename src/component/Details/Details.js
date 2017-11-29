import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ToastAndroid, Modal, ActivityIndicator 
} from 'react-native';
import global from '../global';
import { TbDetails } from './RouterDetails';
const { height } = Dimensions.get('window');

import icback from '../img/icback.png';
import iclove from '../img/love.png';
import iclove_ac from '../img/love_active.png';

export default class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            islove: false,
            isVisible: true
        }
        global.closeModalLoadDetail = this.closeModal.bind(this);
    }
    closeModal() {
        this.setState({ isVisible: false });
    }
    componentDidMount() {
        //console.log('11111111111111');
        var dd = setInterval(function () {
            if (global.loadchitiet &&
                global.loadhinhanh &&
                global.loaddanhgia &&
                global.loadbando) {
                    clearInterval(dd);
                    global.closeModalLoadDetail();
                    global.loadchitiet = false;
                    global.loadhinhanh = false;
                    global.loaddanhgia = false;
                    global.loadbando = false;
                    //this.setState({ isVisible: false });
                }
        }, 1000)
        this.loadData();
    }

    loadData() {
        if (global.onSignIn) {
            fetch(global.server.concat('isYeuThich.php?user=' + global.onSignIn.id + '&idks=' + global.idKS))
                .then((response) => response.text())
                .then((responseJson) => {
                    if (responseJson === '1') {
                        this.setState({ islove: true });
                    } else {
                        this.setState({ islove: false });
                    }
                })
                .catch((e) => { console.log(e) })
        }
    }

    themvaoYeuThich() {
        if (global.onSignIn) {
            let yeuthich = 0;
            if (!this.state.islove) {
                yeuthich = 1;
            }
            fetch(global.server.concat('YeuThich.php?user=' + global.onSignIn.id + '&idks=' + global.idKS + '&yeuthich=' + yeuthich))
                .then((response) => response.text())
                .then((responseJson) => {
                    if (responseJson === '1') {
                        this.setState({
                            islove: !this.state.islove
                        });
                    } else {
                        ToastAndroid.show('Có lỗi thử lại !', ToastAndroid.SHORT);
                    }
                })
                .catch((e) => { alert('Có lỗi. Thử lại') });
        } else {
            ToastAndroid.show('Bạn chưa đăng nhập !', ToastAndroid.SHORT);
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <Image style={{ width: 25, height: 25 }} source={icback} />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={{ fontWeight: 'bold', paddingLeft: 10 }}>{this.props.navigation.state.params.name}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 5 }}>
                        <TouchableOpacity
                            onPress={() => { this.themvaoYeuThich() }}
                        >
                            <Image style={{ width: 25, height: 25 }} source={this.state.islove ? iclove_ac : iclove} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <TbDetails />
                </View>

                <Modal
                    transparent={true}
                    visible={this.state.isVisible}
                    onRequestClose={() => this.setState({ isVisible: false })}
                >
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => {
                            this.setState({ isVisible: false })
                        }}
                    >
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        }}>
                            {/* <View style={{
                               // backgroundColor: '#333333',
                               //backgroundColor: 'rgba(52, 52, 52, 0.5)',
                                //borderRadius: 10,
                                //width: 80,
                                //height: 80,
                                padding: 5,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                               <Spinner size={40} type={'Circle'} color={'white'} /> 
                                <Text style={{ fontSize: 13, color: 'white' }}>Loading...</Text>
                            </View> */}
                            <ActivityIndicator size={65} />
                            <Text style={{ fontSize: 15, color: 'white' }}>Loading...</Text>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
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
    boximg: {
        height: height / 3,
        backgroundColor: 'red'
    }
})