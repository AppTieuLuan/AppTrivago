import React, { Component } from 'react';
import {
    View, StyleSheet, Image,
    Text
} from 'react-native';


import global from '../global';

import icrt1 from '../img/icrt1.png';
import icrt2 from '../img/icrt2.png';
import icrt3 from '../img/icrt3.png';
import icrt4 from '../img/icrt4.png';
import icrt5 from '../img/icrt5.png';

export default class RowFlatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialRender: true
        }
    }

    render() {
        return (
            <View style={styles.rowFlatlist}>
                <View style={{ flex: 1 }}>
                    <Image source={{ uri: this.props.item.hinh }} onLayout={() => this.setState({ initialRender: false })} key={`${this.state.initialRender}`} style={{ height: 112, width: 112, flex: 1 }} />
                </View>
                <View style={{ flex: 2, marginLeft: 4 }}>
                    <View style={{ flex: 1, paddingBottom: 4 }}>
                        <Text numberOfLines={1} style={{ fontWeight: 'bold' }} >
                            {this.props.item.ten}
                        </Text>
                        <Text numberOfLines={1} style={{}} >
                            {this.props.item.diachi}
                        </Text>
                    </View>

                    <View style={{ flex: 2, borderTopWidth: 1, borderTopColor: '#e9ebee', paddingTop: 4, flexDirection: 'row' }}>
                        <View style={{ flex: 1, borderRightWidth: 1, borderRightColor: '#e9ebee' }}>

                            <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                                <Image resizeMode={'contain'} source={ parseFloat(this.props.item.sosao) <= 1 ? icrt1 : (this.props.item.sosao == 2 ? icrt2 : (this.props.item.sosao == 3 ? icrt3 : (this.props.item.sosao == 4 ? icrt4 : icrt5)))} style={{ flex: 1 }} />
                            </View>

                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Text numberOfLines={1} style={{ fontSize: 10 }}>{this.props.item.sodanhgia} lượt đánh giá</Text>
                                <Text numberOfLines={1} style={{ fontSize: 10 }}>{this.props.item.sobl} bình luận</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, paddingHorizontal: 2, paddingVertical: 2 }}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text numberOfLines={1} style={{ fontSize: 10 }}>Giá từ</Text>
                                    <Text numberOfLines={1} style={{ fontSize: 12, fontWeight: 'bold', color: '#248f24' }}>{this.props.item.gia}</Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ backgroundColor: '#248f24', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 3, color: 'white' }}>Chi tiết</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({

    rowFlatlist: {
        flexDirection: 'row',
        height: 120,
        width: 340,
        paddingVertical: 4,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 4
    }
})  
