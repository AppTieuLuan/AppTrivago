import React,{ Component } from 'react';
import {
    View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, FlatList, Dimensions,
    Image, ScrollView, TextInput, ToastAndroid, ActivityIndicator
} from 'react-native';
import Modal from 'react-native-modalbox';

import global from '../../global';
import imghuy from './huy.png';
import icback from '../../img/icback.png';
import imglock from './iconlock.png';
import imgunlock from './iconunlock.png';

const { height, width } = Dimensions.get('window');

export default class QuanLyKhachSan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mang: [],
            value: '',
            height: 40,
            isOpen: false,
            isDisabled: false,
            swipeToClose: true,
            sliderValue: 0.3,
            page: 1,
            refresh: false,
            index: -1,
            loading: false
        }
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    xacnhan() {
        if(this.state.mang[this.state.index].tinhtrang === '1') {
            fetch(global.server.concat('khoaKhachSan.php'),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({ id: this.state.mang[this.state.index].key })
            })
            .then(res => res.text())
            .then(res => {
                this.refs.modal3.close();
                if (res === '1') {
                    ToastAndroid.show('Thành công', ToastAndroid.SHORT);
                    // this.state.mang[this.state.index].tinhtrang = '0';
                    let mang = this.state.mang;
                    mang[this.state.index].tinhtrang = '0';
                    this.setState({ mang })
                }
                else {
                    alert('Lỗi !!')
                }
            })
            .catch((e)=>{console.log(e)});
        } else {
            fetch(global.server.concat('moKhoaKhachSan.php'),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({ id: this.state.mang[this.state.index].key })
            })
            .then(res => res.text())
            .then(res => {
                 this.refs.modal3.close();
                 if (res === '1') {
                     ToastAndroid.show('Thành công', ToastAndroid.SHORT);
                    // this.state.mang[this.state.index].tinhtrang = '0';
                     let mang = this.state.mang;
                     mang[this.state.index].tinhtrang = '1';
                     this.setState({ mang })
                 }
                 else {
                     alert('Lỗi !!')
                 }
            })
            .catch((e)=>{console.log(e)});
        }

    }
    xoa() {
        this.refs.modal3.close();
        //alert(this.state.value);

        let { mang } = this.state;
        //var maxId = Math.max.apply(null, mang.map(item => item.id)) + 1;
        mang.splice(this.state.index, 1);

        this.setState({
            mang,
            value: ''
        })
        //alert(this.state.mang.length);
       // alert(this.state.index)
    }

    loadThem() {
        this.setState({ loading: true }, function () {
            this.loadKhachSanDuyet();
        });
    }

    refresh() {
        this.setState({ page: 1, mang: []}, function() {
            this.loadDataRefresh();
        });
        
    }

    loadDataRefresh(){
        this.setState({
            refresh: true
        })
        fetch(global.server.concat('getQuanLyDsKhachSan.php?trang=1'))
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                mang: responseJson,
                refresh: false,
                page: 1,
                loading: false
            });
        })
        .catch((e)=>{console.log(e)});
    }

    loadKhachSanDuyet() {
        if (this.state.refresh === false) {
           // global.trangloc = 1;
            this.setState({
                refresh: true
            })
            fetch(global.server.concat('getQuanLyDsKhachSan.php?trang=') + this.state.page)
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.length > 0)
                    
                    this.setState({
                        mang: this.state.mang.concat(responseJson),
                        refresh: false,
                        page: this.state.page + 1,
                        loading: false
                    });
                else{
                    this.setState({ 
                        refresh: false,
                    });
                }
            })
            .catch((e) => { console.log(e) });
        }
    }
    componentDidMount() {
        this.loadKhachSanDuyet();
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <Image style={{ width: 25, height: 25 }} source={icback} />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={{ fontWeight: 'bold', paddingLeft: 10 }}>Quản lý khách sạn</Text>
                    
                </View>
                <FlatList
                ListFooterComponent={(
                        <View style= {{ padding: 10 }}>
                            {
                                !this.state.loading ?
                                    (
                                        <TouchableOpacity
                                            onPress={() => { this.loadThem() }}
                                        >
                                            <Text style={{ color: '#4267b2' }}>Load thêm danh sách ...</Text>
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
                    refreshing={this.state.refresh}
                    onRefresh={() => { this.refresh() }}
                    data={this.state.mang}
                    renderItem={({ item , index } ) =>
                        <View style={styles.rowFlatlist}>
                            <TouchableWithoutFeedback
                                onPress={() => { 
                                    {/* global.idKS = item.key;
                                    navigate('ChiTiet', { name: item.ten, id: item.key }) */}
                                    }}
                            >
                             <View style={{ height: width / 3, flexDirection: 'row', backgroundColor: 'white', borderRadius: 5 }}>
                                        <Image source={{ uri: item.hinh }} style={{ height: width / 3, width: width / 3, flex: 1 }}/>
                                        <View style={{ flex: 2 }}>
                                            <View style={{ flex: 1 }}>
                                                <View style={{ flex: 1, paddingLeft: 5, paddingVertical: 2, paddingRight: 2 }}>
                                                    <Text numberOfLines={1} style={{ fontWeight: 'bold' }}>{item.ten}</Text>
                                                    <Text numberOfLines={1}>{item.diachi}</Text>
                                                </View>
                                                <View style = {{ flex: 2, borderTopWidth: 1, borderTopColor: '#e9ebee', flexDirection: 'row' }}>
                                                    <View style={{ flex: 1 }}>
                                                       
                                                        <View style={{ flex: 1, paddingHorizontal: 2, paddingVertical: 2 }}>
                                                            <TouchableOpacity
                                                                style={{flexDirection: 'row', flex: 1 }}
                                                                onPress={() => { 
                                                                                this.setState({ index }, function () {
                                                                                                            this.xacnhan();
                                                                                                        })
                                                                                //this.xacnhan();
                                                                            }}
                                                            >
                                                                <View style={{ flex: 2, paddingVertical: 2 }}>
                                                                    <Image resizeMode={'contain'} source={item.tinhtrang === '1' ? imglock : imgunlock } style={{ flex: 1 }} />
                                                                </View> 
                                                                
                                                                <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                                                                    <Text style={{ fontSize: 12 }}>{item.tinhtrang === '1' ? 'Khóa' : 'Mở khóa' }</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
                                                       
                                                        <View style={{ flex: 1, borderTopWidth: 1, borderTopColor: '#e9ebee', paddingHorizontal: 2, paddingVertical: 2}}>
                                                        <TouchableOpacity
                                                                style={{flexDirection: 'row', flex: 1 }}
                                                                onPress={() => {
                                                                    this.refs.modal3.open();
                                                                    this.setState({ index })
                                                                }}
                                                        >
                                                                <View style={{ flex: 2, paddingVertical: 2 }}>
                                                                    <Image resizeMode={'contain'} source={imghuy} style={{ flex: 1 }} />
                                                                </View> 
                                                                
                                                                <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                                                                    <Text style={{ fontSize: 12 }}>Xóa</Text>
                                                                </View>
                                                        </TouchableOpacity>
                                                        
                                                        </View>
                                                    </View>
                                                    <View style={{ flex: 1, borderLeftWidth: 1, borderLeftColor: '#e9ebee'}}>
                                                        <View style={{ flex: 1, paddingHorizontal: 2, paddingVertical: 2 }}>
                                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                                <Text style={{ fontSize: 10 }}>Giá từ</Text>
                                                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#248f24' }}>{item.gia}</Text>
                                                            </View>
                                                        </View>

                                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                            <TouchableOpacity
                                                                onPress = {()=>{
                                                                    global.idKS = item.key;
                                                                    this.props.navigation.navigate('DetailScreen', { name: item.ten, id: item.key })
                                                                }}
                                                            >
                                                                <Text style = {{ backgroundColor: '#248f24', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 3, color: 'white' }}>Chi tiết</Text>
                                                            </TouchableOpacity>
                                                        </View>

                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                            </TouchableWithoutFeedback>
                        </View>
                    }
                />
                <Modal style={styles.modal} position={"center"} ref={"modal3"} isDisabled={this.state.isDisabled}>
                    <View style={styles.viewinsideModal}>
                        <Text style={{fontWeight: 'bold'}}>Lý do xóa</Text>
                    </View>
                    <ScrollView style={{ paddingVertical: 10 }}>
                        <View style={{ borderWidth: 1, flex: 1, marginHorizontal: 10, borderRadius: 5, borderColor: '#e9ebee' }}>
                                <TextInput
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    placeholder="... "
                                    onChangeText={(value) => this.setState({ value })}
                                    value={this.state.value}
                                    multiline={true}
                                    numberOfLines={3}
                                    onContentSizeChange={(event) => {
                                        this.setState({ height: event.nativeEvent.contentSize.height })
                                    }}
                                    style={[{height: 40}, { height: Math.max(35, this.state.height) }]}
                                />
                        </View>
                    </ScrollView>
                    
                    <TouchableOpacity
                        onPress={()=>{ this.xoa() }}
                    >
                        <View style={styles.viewinsideModa2}>
                            <Text style={{fontWeight: 'bold'}}>Gửi</Text>
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

    rowFlatlist: {
        paddingHorizontal: 5,
        paddingVertical: 2.5
        //borderBottomWidth: 1
    },
    itemBottom: {
        backgroundColor: 'white'
    },
    modal: {
        width: 0.9 * width,
        height: 0.4 * height,
        borderRadius: 5,
        
    },
    viewinsideModal: {
        padding: 10,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        backgroundColor: '#e2eff5',
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewinsideModa2: {
        padding: 10,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        backgroundColor: '#e2eff5',
        justifyContent: 'center',
        alignItems: 'center'
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