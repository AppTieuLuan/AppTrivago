import React, { Component } from 'react';
import {
    View,
    Text, Image, StyleSheet, TouchableOpacity, Slider, ScrollView
} from 'react-native';
import global from '../global';

import vote1 from '../img/vote/Vote1.png';
import vote1_Act from '../img/vote/Vote1_act.png';
import vote2 from '../img/vote/Vote2.png';
import vote2_Act from '../img/vote/Vote2_act.png';
import vote3 from '../img/vote/Vote3.png';
import vote3_Act from '../img/vote/Vote3_act.png';
import vote4 from '../img/vote/Vote4.png';
import vote4_Act from '../img/vote/Vote4_act.png';
import vote5 from '../img/vote/Vote5.png';
import vote5_Act from '../img/vote/Vote5_act.png';
import wifi from '../img/convenient/Wifi.png';
import wifi_act from '../img/convenient/wifi_act.png';
import spa from '../img/convenient/Spa.png';
import spa_act from '../img/convenient/Spa_act.png';
import bar from '../img/convenient/bar.png';
import bar_ac from '../img/convenient/bar_ac.png';
import gym from '../img/convenient/gym.png';
import gym_ac from '../img/convenient/gym_ac.png';
import beboi from '../img/convenient/icbeboi.png';
import beboi_ac from '../img/convenient/icbeboi_ac.png';
import dieuhoa from '../img/convenient/icdh.png';
import dieuhoa_ac from '../img/convenient/icdh_at.png';
import doxe from '../img/convenient/icdoxe.png';
import doxe_ac from '../img/convenient/icdoxe_act.png';
import nhahang from '../img/convenient/icnhahang.png';
import nhahang_ac from '../img/convenient/icnhahang_ac.png';
import vatnuoi from '../img/convenient/icvatnuoi.png';
import vatnuoi_ac from '../img/convenient/icvatnuoi_ac.png';

export default class TopFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vote1: false,
            vote2: false,
            vote3: false,
            vote4: false,
            vote5: false,
            wifi: false,
            wifi2: false,
            spa: false,
            beboi: false,
            doxe: false,
            vatnuoi: false,
            dieuhoa: false,
            nhahang: false,
            bar: false,
            gym: false,
            value: 0,
            valuemax: 0,
            valueText: '',
            valuebankinh: global.bankinhsearch
        };
    }
    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.viewVote}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ vote1: !this.state.vote1 });
                            if (!this.state.vote1)
                                global.locsao = global.locsao + '1';
                            else
                                global.locsao = global.locsao.replace(/1/g, '');
                        }}
                        style={styles.imgView}
                    >
                        <Image style={styles.img} source={this.state.vote1 ? vote1_Act : vote1} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ vote2: !this.state.vote2 });
                            if (!this.state.vote2)
                                global.locsao = global.locsao + '2';
                            else
                                global.locsao = global.locsao.replace(/2/g, '');
                        }}
                        style={styles.imgView}
                    >
                        <Image style={styles.img} source={this.state.vote2 ? vote2_Act : vote2} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ vote3: !this.state.vote3 });
                            if (!this.state.vote3)
                                global.locsao = global.locsao + '3';
                            else
                                global.locsao = global.locsao.replace(/3/g, '');
                        }}
                        style={styles.imgView}
                    >
                        <Image style={styles.img} source={this.state.vote3 ? vote3_Act : vote3} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ vote4: !this.state.vote4 });
                            if (!this.state.vote4)
                                global.locsao = global.locsao + '4';
                            else
                                global.locsao = global.locsao.replace(/4/g, '');
                        }}
                        style={styles.imgView}
                    >
                        <Image style={styles.img} source={this.state.vote4 ? vote4_Act : vote4} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ vote5: !this.state.vote5 });
                            if (!this.state.vote5)
                                global.locsao = global.locsao + '5';
                            else
                                global.locsao = global.locsao.replace(/5/g, '');
                        }}
                        style={styles.imgView}
                    >
                        <Image style={styles.img} source={this.state.vote5 ? vote5_Act : vote5} />
                    </TouchableOpacity>
                </View>
                <View style={{ height: 1, backgroundColor: 'gray' }} />

                <View style={[styles.viewVote2, { paddingTop: 15 }]}>
                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => {
                            this.setState({ wifi: !this.state.wifi });
                            var temp = global.loctiennghi.split('');
                            if (!this.state.wifi)
                                temp[0] = '1';
                            else
                                temp[0] = '0';

                            global.loctiennghi = temp.join('');
                        }}
                    >
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={this.state.wifi ? wifi_act : wifi} style={styles.img} />
                            <Text numberOfLines={1} style={{ fontSize: 12, paddingVertical: 5 }}>Wifi sảnh</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => {
                            this.setState({ wifi2: !this.state.wifi2 })
                            let temp = global.loctiennghi.split('');
                            if (!this.state.wifi2)
                                temp[1] = '1';
                            else
                                temp[1] = '0';

                            global.loctiennghi = temp.join('');
                        }}
                    >
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={this.state.wifi2 ? wifi_act : wifi} style={styles.img} />
                            <Text numberOfLines={1} style={{ fontSize: 12, paddingVertical: 5 }}>Wifi phòng</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => {
                            this.setState({ beboi: !this.state.beboi })
                            let temp = global.loctiennghi.split('');
                            if (!this.state.beboi)
                                temp[2] = '1';
                            else
                                temp[2] = '0';

                            global.loctiennghi = temp.join('');
                        }}
                    >
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={this.state.beboi ? beboi_ac : beboi} style={styles.img} />
                            <Text numberOfLines={1} style={{ fontSize: 12, paddingVertical: 5 }}>Bể bơi</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => {
                            this.setState({ spa: !this.state.spa })
                            let temp = global.loctiennghi.split('');
                            if (!this.state.spa)
                                temp[3] = '1';
                            else
                                temp[3] = '0';

                            global.loctiennghi = temp.join('');

                        }}
                    >
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={this.state.spa ? spa_act : spa} style={styles.img} />
                            <Text numberOfLines={1} style={{ fontSize: 12, paddingVertical: 5 }}>Spa</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => {
                            this.setState({ doxe: !this.state.doxe })
                            let temp = global.loctiennghi.split('');
                            if (!this.state.doxe)
                                temp[4] = '1';
                            else
                                temp[4] = '0';

                            global.loctiennghi = temp.join('');
                        }}
                    >
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={this.state.doxe ? doxe_ac : doxe} style={styles.img} />
                            <Text numberOfLines={1} style={{ fontSize: 12, paddingVertical: 5 }}>Đỗ xe</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.viewVote2}>
                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => {
                            this.setState({ vatnuoi: !this.state.vatnuoi })
                            let temp = global.loctiennghi.split('');
                            if (!this.state.vatnuoi)
                                temp[5] = '1';
                            else
                                temp[5] = '0';

                            global.loctiennghi = temp.join('');
                        }}
                    >
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={this.state.vatnuoi ? vatnuoi_ac : vatnuoi} style={styles.img} />
                            <Text numberOfLines={1} style={{ fontSize: 12, paddingVertical: 5 }}>Pet</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => {
                            this.setState({ dieuhoa: !this.state.dieuhoa });
                            let temp = global.loctiennghi.split('');
                            if (!this.state.dieuhoa)
                                temp[6] = '1';
                            else
                                temp[6] = '0';

                            global.loctiennghi = temp.join('');
                        }}
                    >
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={this.state.dieuhoa ? dieuhoa_ac : dieuhoa} style={styles.img} />
                            <Text numberOfLines={1} style={{ fontSize: 12, paddingVertical: 5 }}>Điều hòa</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => {
                            this.setState({ nhahang: !this.state.nhahang })
                            let temp = global.loctiennghi.split('');
                            if (!this.state.nhahang)
                                temp[7] = '1';
                            else
                                temp[7] = '0';

                            global.loctiennghi = temp.join('');
                        }}
                    >
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={this.state.nhahang ? nhahang_ac : nhahang} style={styles.img} />
                            <Text numberOfLines={1} style={{ fontSize: 12, paddingVertical: 5 }}>Nhà hàng</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: 1 }}
                        onPress={() => {
                            this.setState({ bar: !this.state.bar })
                            let temp = global.loctiennghi.split('');
                            if (!this.state.bar)
                                temp[8] = '1';
                            else
                                temp[8] = '0';

                            global.loctiennghi = temp.join('');
                        }}
                    >
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={this.state.bar ? bar_ac : bar} style={styles.img} />
                            <Text numberOfLines={1} style={{ fontSize: 12, paddingVertical: 5 }}>Bar</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => {
                            this.setState({ gym: !this.state.gym })
                            let temp = global.loctiennghi.split('');
                            if (!this.state.gym)
                                temp[9] = '1';
                            else
                                temp[9] = '0';

                            global.loctiennghi = temp.join('');
                        }}
                    >
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={this.state.gym ? gym_ac : gym} style={styles.img} />
                            <Text numberOfLines={1} style={{ fontSize: 12, paddingVertical: 5 }}>Gym</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 1, backgroundColor: 'gray' }} />

                <View style={{ paddingVertical: 10, padding: 10 }}>
                    <Text>Giá tối thiểu: {this.state.value} VNĐ </Text>
                    <Slider
                        minimumValue={0}
                        maximumValue={5000000}
                        step={1}
                        thumbTouchSize={{ width: 100, height: 100 }}
                        onValueChange={(value) => {
                            this.setState({ value });
                            global.locgiamin = value;
                        }
                        }

                    />
                </View>
                <View style={{ height: 1, backgroundColor: 'gray' }} />

                <View style={{ paddingVertical: 10, padding: 10 }}>
                    <Text>Giá tối đa: {this.state.valuemax} VNĐ</Text>
                    <Slider

                        minimumValue={0}
                        maximumValue={5000000}
                        step={1}
                        thumbTouchSize={{ width: 50, height: 50 }}
                        onValueChange={(value) => {
                            this.setState({ valuemax: value });
                            global.locgiamax = value;
                        }
                        }
                    />
                </View>
                <View style={{ height: 1, backgroundColor: 'gray' }} />

                <View style={{ paddingVertical: 10, padding: 10 }}>
                    <Text>Bán kính tìm kiếm {this.state.valuebankinh} KM</Text>
                    <Slider
                        value={global.bankinhsearch}
                        minimumValue={1}
                        maximumValue={100}
                        step={1}
                        thumbTouchSize={{ width: 50, height: 50 }}
                        onValueChange={(value) => {
                            this.setState({ valuebankinh: value });
                            global.bankinhsearch = value;
                        }
                        }
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    viewVote: {
        flex: 1,
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    viewVote2: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 15,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imgView: {
        width: 30,
        height: 30,
    },
    img: {
        width: 30,
        height: 30,
    }
});
