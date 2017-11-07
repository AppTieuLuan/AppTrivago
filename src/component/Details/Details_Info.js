import React, { Component } from 'react';
import {
    View, Text, ScrollView, TouchableOpacity, StyleSheet, Image
} from 'react-native';
import global from '../global';

export default class Details_Info extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            mang: [],
            wifisanh: false,
            wifiphong: false,
            beboi: false,
            spa: false,
            doxe: false,
            vatnuoi: false,
            dieuhoa: false,
            nhahang: false,
            bar: false,
            gym: false
        }
    }

    componentDidMount() {
        this.setState({
            id: this.props.id
        });
        this.loadThongTin();
    }

    loadThongTin() {
        this.setState({
            refresh: true
        })
        fetch(global.server.concat('getThongTinKhachSan.php?id=' + global.idKS))
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    mang: responseJson
                });

                var temp = this.state.mang[0].tiennghihangdau.split('');

                if (temp[0] === '1') {
                    this.setState({ wifisanh: true });
                };
                if (temp[1] === '1') {
                    this.setState({ wifiphong: true })
                };
                if (temp[2] === '1') {
                    this.setState({ beboi: true })
                };
                if (temp[3] === '1') {
                    this.setState({ spa: true })
                };
                if (temp[4] === '1') {
                    this.setState({ doxe: true })
                };
                if (temp[5] === '1') {
                    this.setState({ vatnuoi: true })
                };
                if (temp[6] === '1') {
                    this.setState({ dieuhoa: true })
                };
                if (temp[7] === '1') {
                    this.setState({ nhahang: true })
                };
                if (temp[8] === '1') {
                    this.setState({ bar: true })
                };
                if (temp[9] === '1') {
                    this.setState({ gym: true })
                };


                global.loadchitiet = true;
            })
            .catch((e) => { console.log(e) });

    }

    render() {
        return (
            <ScrollView>
                <View style={{ padding: 7 }}>
                    <Text style={styles.textHead}>Tiện nghi hàng đầu</Text>
                    <View style={styles.row}>
                        <View style={[styles.item, {}]}>
                            <Image source={this.state.wifisanh === false ? require('./img/icwifi.png') : require('./img/icwifi_active.png')} style={styles.imageItem} />
                            <View style={{ flex: 4 }}>
                                <Text numberOfLines={1}>Wifi tại sảnh</Text>
                            </View>
                        </View>

                        <View style={[styles.item, {}]}>
                            <Image source={this.state.wifiphong === false ? require('./img/icwifi.png') : require('./img/icwifi_active.png')} style={styles.imageItem} />
                            <View style={{ flex: 4 }}>
                                <Text numberOfLines={1}>Wifi trong phòng</Text>
                            </View>
                        </View>
                    </View>


                    <View style={styles.row}>
                        <View style={[styles.item, {}]}>
                            <Image source={this.state.beboi === false ? require('./img/icpool.png') : require('./img/icpool_active.png')} style={styles.imageItem} />
                            <View style={{ flex: 4 }}>
                                <Text numberOfLines={1}>Bể bơi</Text>
                            </View>
                        </View>

                        <View style={[styles.item, {}]}>
                            <Image source={!this.state.spa ? require('./img/icspa.png') : require('./img/icspa_active.png')} style={styles.imageItem} />
                            <View style={{ flex: 4 }}>
                                <Text numberOfLines={1}>Spa</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.item, {}]}>
                            <Image source={!this.state.doxe ? require('./img/icparking.png') : require('./img/icparking_active.png')} style={styles.imageItem} />
                            <View style={{ flex: 4 }}>
                                <Text numberOfLines={1}>Bãi đồ xe</Text>
                            </View>
                        </View>

                        <View style={[styles.item, {}]}>
                            <Image source={!this.state.vatnuoi ? require('./img/icpet.png') : require('./img/icpet_active.png')} style={styles.imageItem} />
                            <View style={{ flex: 4 }}>
                                <Text numberOfLines={1}>Chấp nhận vật nuôi</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.item, {}]}>
                            <Image source={!this.state.dieuhoa ? require('./img/icondhnd.png') : require('./img/icondhnd_active.png')} style={styles.imageItem} />
                            <View style={{ flex: 4 }}>
                                <Text numberOfLines={1}>Điều hòa nhiệt độ</Text>
                            </View>
                        </View>

                        <View style={[styles.item, {}]}>
                            <Image source={!this.state.nhahang ? require('./img/icrestaurant.png') : require('./img/icrestaurant_active.png')} style={styles.imageItem} />
                            <View style={{ flex: 4 }}>
                                <Text numberOfLines={1}>Nhà hàng</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.item, {}]}>
                            <Image source={!this.state.bar ? require('./img/icbar.png') : require('./img/icbar_active.png')} style={styles.imageItem} />
                            <View style={{ flex: 4 }}>
                                <Text numberOfLines={1}>Quầy bar</Text>
                            </View>
                        </View>

                        <View style={[styles.item, {}]}>
                            <Image source={!this.state.gym ? require('./img/icgym.png') : require('./img/icgym_active.png')} style={styles.imageItem} />
                            <View style={{ flex: 4 }}>
                                <Text numberOfLines={1}>Phòng Gym</Text>
                            </View>
                        </View>
                    </View>

                </View>
                <View style={{ borderBottomWidth: 1 / 2, borderBottomColor: '#767b83' }}></View>
                <View style={{ padding: 7 }}>
                    <Text style={styles.textHead}>Hình thức chỗ ở</Text>
                    <Text>{this.state.mang.length > 0 ? this.state.mang[0].loai : ''}</Text>
                </View>

                <View style={{ borderBottomWidth: 1 / 2, borderBottomColor: '#767b83' }}></View>
                <View style={{ padding: 7 }}>

                    <Text style={styles.textHead}>Liên hệ</Text>

                    <View style={[styles.item, { paddingVertical: 7 }]}>
                        <Image source={require('./img/iclink.png')} style={styles.imageItem} />
                        <View style={{ flex: 9 }}>
                            <Text numberOfLines={1}>{this.state.mang.length > 0 ? this.state.mang[0].website : ''}</Text>
                        </View>
                    </View>

                    <View style={[styles.item, { paddingVertical: 7 }]}>
                        <Image source={require('./img/icphone.png')} style={styles.imageItem} />
                        <View style={{ flex: 9 }}>
                            <Text numberOfLines={1}>{this.state.mang.length > 0 ? this.state.mang[0].sdt : ''}</Text>
                        </View>
                    </View>

                    <View style={[styles.item, { paddingVertical: 7 }]}>
                        <Image source={require('./img/iconmap.png')} style={styles.imageItem} />
                        <View style={{ flex: 9 }}>
                            <Text>{this.state.mang.length > 0 ? this.state.mang[0].diachi : ''}</Text>
                        </View>
                    </View>

                </View>


            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    textHead: {
        color: '#3669b5'
    },
    row: {
        paddingVertical: 10,
        flexDirection: 'row'
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    imageItem: {
        height: 25,
        width: 25,
        marginHorizontal: 10,
        flex: 1,
        resizeMode: 'contain'
    }
});
