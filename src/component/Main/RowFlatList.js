import React, { Component } from 'react';
import {
    View, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Dimensions, Image,
    Text
} from 'react-native';
import s1 from '../img/sad.png';
import s2 from '../img/s2.png';
import s3 from '../img/s3.png';
import global from '../global';
const { height, width } = Dimensions.get('window');
const height1 = height / 13;
const height2 = height / 12;

export default class RowFlatList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.rowFlatlist}>
                <View style={{ flex: 1 }}>
                    <Image source={{ uri: this.props.item.hinh }} style={{ height: 112, width: 112, flex: 1 }} />
                </View>
                <View style={{ flex: 2, marginLeft: 4 }}>
                    <View style={{ flex: 1, paddingBottom: 4 }}>
                        <Text numberOfLines={1} style={{ fontWeight: 'bold' }} >
                            {this.props.item.ten}
                        </Text>
                        <Text numberOfLines={1} style={{  }} >
                            {this.props.item.diachi}
                        </Text>
                    </View>
                  
                    <View style={{ flex: 2, borderTopWidth: 1, borderTopColor: '#e9ebee', paddingTop: 4, flexDirection: 'row' }}>
                        <View style={{ flex: 1, borderRightWidth: 1, borderRightColor: '#e9ebee' }}>
                            
                            <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={this.props.item.key % 2 === 0 ? s1 : s3} style={{ height: 35, width: 35 }} />
                            </View>

                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Text numberOfLines={1} style={{ fontSize: 12 }}>91/100</Text>
                                <Text numberOfLines={1} style={{ fontSize: 10 }}>135 bình luận</Text>
                            </View> 
                        </View>

                        <View style={{ flex: 1}}>
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
