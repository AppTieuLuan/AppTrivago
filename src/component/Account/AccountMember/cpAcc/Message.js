import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
    Modal,

} from 'react-native';

import messicon from "../images/message_icon.png";
import global from '../../../global';
import GetMessage from '../../../../api/getMessage';
import icback from '../../../img/back.png';
import UpdateMessage from '../../../../api/updateTTMessage';

export default class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mang: [],
            refresh: false,
            page: 0,
            flag: false,
            loading: false,
            end: false,
            isVisible: false,
            detailmessage: []
        }
    }
    componentDidMount() {
        this.setState({ refresh: true });
        GetMessage(global.onSignIn.id, 1)
            .then(res => {
                this.setState({ refresh: false });
                let arrtemp = [];
                arrtemp = res;
                let len = arrtemp.length;
                if (len === 0) {
                    this.setState({
                        flag: true,
                        end: true
                    });
                    return false;
                }

                if (len < 10) {
                    this.setState({ end: true });
                }
                this.setState({
                    flag: false,
                    mang: res,
                    page: 1
                });
            })
            .catch(err => alert(err));
    }
    loadMessage() {
        this.setState({ loading: true });
        let nextpage = this.state.page + 1;
        GetMessage(global.onSignIn.id, nextpage)
            .then(res => {
                this.setState({ loading: false });
                let arrtemp = [];
                arrtemp = res;
                let len = arrtemp.length;
                if (len === 0) {
                    this.setState({ end: true })
                    return false;
                }

                let arr = this.state.mang.concat(res);
                this.setState({
                    flag: false,
                    mang: arr,
                    page: nextpage
                });
            })
            .catch(err => console.log(err));

    }
    onRefresh() {
        this.setState({ refresh: true, mang: [] });
        GetMessage(global.onSignIn.id, 1)
            .then(res => {
                this.setState({ refresh: false });
                let arrtemp = [];
                arrtemp = res;
                let len = arrtemp.length;
                if (len === 0) {
                    this.setState({
                        flag: true,
                        end: true
                    });
                    return false;
                }
                if (len < 10) {
                    this.setState({ end: true });
                }
                this.setState({
                    flag: false,
                    mang: res,
                    page: 1
                });
            })
            .catch(err => alert(err));
    }
    renderflaglist() {
        return this.state.flag ?
            (
                Alert.alert(
                    'Thông báo',
                    'Bạn không có tin nhắn nào!',
                    [
                        { text: 'OK', onPress: () => this.props.navigation.goBack() }
                    ],
                    { cancelable: false }
                )
            ) :
            (
                <FlatList
                    refreshing={this.state.refresh}
                    onRefresh={() => this.onRefresh()}
                    ListFooterComponent={(
                        <View style={{ padding: 10 }}>
                            {
                                this.state.end ? null :
                                    !this.state.loading ?
                                        (<TouchableOpacity
                                            onPress={() => { this.loadMessage() }}
                                        >
                                            <Text style={{ color: '#4267b2' }}>Xem thêm tin nhắn ...</Text>
                                        </TouchableOpacity>) :
                                        (
                                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                                <ActivityIndicator size={24} />
                                                <Text>   Loading ...</Text>
                                            </View>
                                        )
                            }

                        </View>
                    )}
                    data={this.state.mang}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            onPress={() => this.MessageDetail(item)}
                        >
                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5 }}>
                                <View style={{ flex: 1, flexDirection: 'row', borderRadius: 5, borderWidth: 1, width: '98%' }}>
                                    <View style={{ flex: 1 }}>
                                        <Image source={messicon} style={{ height: 30, width: 30 }} />
                                    </View>
                                    <View style={{ flex: 5 }}>
                                        <View>
                                            <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold' }}>{item.tieude}</Text>
                                        </View>
                                        <View>
                                            <Text style={{ color: 'black', fontSize: 14 }}>{item.noidung.substring(0, 20)}...</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 2, alignItems: 'flex-end', padding: 5 }}>
                                        {
                                            item.tinhtrang === '0' ? (
                                                <Text style={{ fontSize: 11, color: 'black', fontWeight: 'bold' }} >Chưa xem</Text>
                                            ) : (
                                                    <Text style={{ fontSize: 11, color: 'black' }} >Đã xem</Text>
                                                )
                                        }
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                />
            )
    }

    MessageDetail(item) {
        if (item.tinhtrang === '0') {
            UpdateMessage(item.id)
                .then(res => {
                    if (res.trim() === 'THANH_CONG') {
                        let arr = this.state.mang;
                        arr.forEach(function (value) {
                            if (value.id === item.id) {
                                value.tinhtrang = 1; //cập nhật dữ liệu trong mảng mà không cài load lại dữ liệu
                            }
                        });
                        this.setState({ mang: arr });
                    }
                })
                .catch(err => console.log(err));
        }
        //
        this.setState({
            detailmessage: item,
            isVisible: true
        });
    }
    render() {
        return (
            <View style={{flex: 1}}>
                {this.renderflaglist()}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.isVisible}
                    onRequestClose={() => this.setState({ isVisible: false })}
                >
                    <View style={{ flex: 1, backgroundColor: 'black' }}>
                        <View style={{ flex: 1, borderRadius: 15, backgroundColor: 'white' }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ alignItems: 'center', flexDirection: 'row', padding: 10, borderBottomWidth: 0.5, borderBottomColor: '#e9ebee' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ isVisible: false });
                                        }}
                                    >
                                        <View style={{ alignSelf: 'flex-end' }}>
                                            <Image source={icback} style={{ height: 25, width: 25 }} />
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                        <Text style={{ fontWeight: 'bold', color: 'black' }}>{this.state.detailmessage.tieude}</Text>
                                    </View>
                                </View>
                                <View style={{marginTop: 10}}>
                                    <Text style={{ color: 'black' }}>{this.state.detailmessage.noidung}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
const styles = StyleSheet.create({

});