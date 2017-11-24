import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, TouchableWithoutFeedback,
    TextInput, FlatList, BackHandler, Alert
} from 'react-native';
//import PopupDialog, { SlideAnimation, DialogTitle, DialogButton } from 'react-native-popup-dialog';
//import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import global from '../global';
//import HeaderFlatList from './HeaderFlatList';
import MapViewComponent from './MapView';
import opemenu from '../img/openmenu.png';
import icsearch from '../img/Search.png';
import icMap from '../img/Map.png';
import icAc from '../img/Account.png';

import icrt1 from '../img/icrt1.png';
import icrt2 from '../img/icrt2.png';
import icrt3 from '../img/icrt3.png';
import icrt4 from '../img/icrt4.png';
import icrt5 from '../img/icrt5.png';


const { height, width } = Dimensions.get('window');
const height1 = height / 13;
//const height2 = height / 12;

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mang: [],
            refresh: false,
            map: true,
            maxheight: height - height1,
            heightbottom: height1,
            heigthmapview: 0,
            isModalVisible: false,
            sortIndex: 0,
            page: 1,
            closeApp: true,
            arrMap: [],
            diadiem: ''

        };
        global.searchData = this.loadDataFromSearch.bind(this);
        global.loctiennghi = '0000000000';
        global.locgiamax = 0;
        global.locgiamin = 0;

        global.userdangnhap = 1;
        global.locsao = '12345';
        global.locDL = false;
        global.loadDuLieuLoc = this.loadDataLoc.bind(this);
        global.trangloc = 1;
        global.locDL = true;

        //global.server = 'http://192.168.1.20:8080/Demo/';

        //global.server = 'https://webservicestrivago.000webhostapp.com/';
    }
    onBackPress () {
        Alert.alert(
            'Xác nhận thoát ứng dụng',
            'Bạn có chắc muống thoát ứng dụng ?',
            [
              
              {text: 'Cancel', onPress: () =>  {  } , style: 'cancel'},
              {text: 'OK', onPress: () => { BackHandler.exitApp(); }  },
            ],
            { cancelable: true }
          );

        return true;
  }
   
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.setState({
            diadiem: global.diadiem
        });
    }
    componentDidMount() {
        this.loadData(this.state.page);
    }
    refresh() {
        global.trangloc = 1;
        this.setState({
            mang: [],
            page: 1
        }, function () {
            this.loadData(1);
        });
    }

    loadDataRefresh() {
        this.refresh();
    }
    clickMap() {
        this.setState({
            map: !this.state.map
        });
        if (this.state.map) {
            this.setState({ maxheight: 0, heightbottom: 0, heigthmapview: height - height1 });
            global.mapAlready = true;
            this.loadData();
        } else {
            global.mapAlready = false;
            this.setState({ maxheight: height - height1, heightbottom: height1, heigthmapview: 0 });
            this.refresh();
            //alert('112');
        }
    }
    loadDataFromSearch() {
        this.setState({
            diadiem: global.diadiem,
            page: 1,
            mang: []
        }, function () {
            global.trangloc = 1;
            this.loadData(this.state.page);
        });
    }
    reset() {
        global.trangloc = 1;
        this.setState({
            page: 1,
            mang: []
        }, function () {
            this.loadData();
        });
    }
    loadMore() {
        this.loadData(this.state.page);
    }
    onSelect(index) {
        this.popupDialog.dismiss(() => {
        });
        this.setState({ sortIndex: index });

        this.refresh();
    }
    showModal = () => this.setState({ isModalVisible: true });

    loadData2() {
        this.setState({ page: 1, mang: [] }, function () {
            global.locDL = true;
            global.trangloc = 1;
            this.loadData();
        });
    }
    

    loadData(page) {
        if (!global.mapAlready) {
            if (global.locDL === false) {
                if (this.state.refresh === false) {
                    //alert(global.server.concat('getListKhachSan.php?trang=') + page + '&lat=' + global.latsearch + '&long=' + global.longsearch + '&bankinh=' + global.bankinhsearch);
                    global.trangloc = 1;
                    this.setState({
                        refresh: true
                    });
                    //alert(global.server.concat('getListKhachSan.php?trang=') + page + '&lat=' + global.latsearch + '&long=' + global.longsearch + '&bankinh=' + global.bankinhsearch);
                    fetch(global.server.concat('getListKhachSan.php?trang=') + page + '&lat=' + global.latsearch + '&long=' + global.longsearch + '&bankinh=' + global.bankinhsearch)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            if (responseJson.length > 0) {
                                if (this.state.page === 1) {
                                    this.setState({
                                        mang: responseJson,
                                        refresh: false,
                                        page: this.state.page + 1,

                                    });
                                } else {
                                    this.setState({
                                        mang: this.state.mang.concat(responseJson),
                                        refresh: false,
                                        page: this.state.page + 1
                                    });
                                }
                            } else {
                                if (this.state.page === 1) {
                                    this.setState({
                                        refresh: false,
                                        mang: [],

                                    });
                                } else {
                                    this.setState({
                                        refresh: false,
                                    });
                                }
                            }
                        })
                        .catch((e) => {
                            //console.log(e);
                            this.setState({
                                refresh: false,
                            });
                        });
                }
            }
            else {
                if (global.locgiamax === 0 && global.locgiamin === 0) {
                    if (global.loctiennghi === '0000000000' && global.locsao !== '') {
                        this.setState({
                            refresh: true,
                        })
                        //alert('vao');
                        //alert(global.trangloc + ' --- ' + global.locsao);
                        fetch(global.server + 'getDanhSachKhachSanLocSao.php?trang=' + global.trangloc + '&sosao=' + global.locsao + '&lat=' + global.latsearch + '&long=' + global.longsearch + '&bankinh=' + global.bankinhsearch)
                            .then((response) => response.json())
                            .then((responseJson) => {
                                if (responseJson.length > 0) {
                                    if (global.trangloc === 1) {
                                        this.setState({
                                            mang: responseJson,
                                            refresh: false
                                        });
                                    } else {
                                        this.setState({
                                            mang: this.state.mang.concat(responseJson),
                                            refresh: false
                                        });
                                    }
                                    global.trangloc = global.trangloc + 1;
                                }
                                else {
                                    if (global.trangloc === 1) {
                                        this.setState({ mang: [] });
                                    }
                                    this.setState({
                                        refresh: false,
                                    });
                                }
                            })
                            .catch((e) => {
                                alert(e)
                            });
                    }
                    // lọc theo các tiện nghi
                    else {
                        if (global.locsao === '') {
                            global.locsao = '12345'; // Lấy tất cả các khách sạn từ 12345 sao nếu ko chọn sao
                        }

                        if (this.state.refresh === false) {
                            this.setState({
                                refresh: true,
                            });
                            //alert(global.server + 'getListKhachSanLoc.php?trang=' + global.trangloc + '&tiennghi=' + global.loctiennghi + '&sosao=' + global.locsao + '&lat=' + global.latsearch + '&long=' + global.longsearch + '&bankinh=' + global.bankinhsearch);
                            fetch(global.server + 'getListKhachSanLoc.php?trang=' + global.trangloc + '&tiennghi=' + global.loctiennghi + '&sosao=' + global.locsao + '&lat=' + global.latsearch + '&long=' + global.longsearch + '&bankinh=' + global.bankinhsearch)
                                .then((response) => response.json())
                                .then((responseJson) => {
                                    if (responseJson.length > 0) {
                                        if (global.trangloc === 1) {
                                            // let mang = responseJson;

                                            this.setState({
                                                mang: responseJson,
                                                refresh: false
                                                //page: this.state.page + 1
                                            });
                                        } else {
                                            this.setState({
                                                mang: this.state.mang.concat(responseJson),
                                                refresh: false,
                                                //page: this.state.page + 1
                                            });
                                        }
                                        global.trangloc = global.trangloc + 1;
                                    }
                                    else {
                                        if (global.trangloc === 1) {
                                            this.setState({ mang: [] });
                                        }
                                        this.setState({
                                            refresh: false,
                                        });
                                    }
                                })
                                .catch((e) => {
                                    alert(e);
                                });
                        }
                    }
                }
                else {
                    // Chỉ lọc theo số sao
                    if (global.loctiennghi === '0000000000') {
                        this.setState({
                            refresh: true,
                        })
                        if (global.locsao === '') {
                            global.locsao = '12345'; // Lấy tất cả các khách sạn từ 12345 sao nếu ko chọn sao
                        }
                        fetch(global.server + 'locKhachSan_Gia_Sao.php?trang=' + global.trangloc + '&sosao=' + global.locsao + '&giamin=' + global.locgiamin + '&giamax=' + global.locgiamax + '&lat=' + global.latsearch + '&long=' + global.longsearch + '&bankinh=' + global.bankinhsearch)
                            .then((response) => response.json())
                            .then((responseJson) => {
                                if (responseJson.length > 0) {
                                    if (global.trangloc === 1) {
                                        // let mang = responseJson;

                                        this.setState({
                                            mang: responseJson,
                                            refresh: false
                                            //page: this.state.page + 1
                                        });
                                    } else {
                                        this.setState({
                                            mang: this.state.mang.concat(responseJson),
                                            refresh: false,
                                            //page: this.state.page + 1
                                        });
                                    }
                                    global.trangloc = global.trangloc + 1;
                                }
                                else {
                                    if (global.trangloc === 1) {
                                        this.setState({ mang: [], arrLatLong: [] })
                                    }
                                    this.setState({
                                        refresh: false,
                                    });
                                }
                            })
                            .catch((e) => {
                                alert(e)
                            });
                    }
                    // lọc theo các tiện nghi kèm sao
                    else {
                        if (global.locsao === '') {

                            global.locsao = '12345'; // Lấy tất cả các khách sạn từ 12345 sao nếu ko chọn sao
                        }
                        if (this.state.refresh === false) {

                            this.setState({
                                refresh: true,
                            })
                            //alert(global.server.concat('locKhachSan_Gia_Sao_TienNghi.php?trang='+global.trangloc+'&tiennghi='+global.loctiennghi+'&sosao='+global.locsao+'&giamax='+global.locgiamax+'&giamin='+global.locgiamin));
                            fetch(global.server.concat('locKhachSan_Gia_Sao_TienNghi.php?trang=' + global.trangloc + '&tiennghi=' + global.loctiennghi + '&sosao=' + global.locsao + '&giamax=' + global.locgiamax + '&giamin=' + global.locgiamin + '&lat=' + global.latsearch + '&long=' + global.longsearch + '&bankinh=' + global.bankinhsearch))
                                .then((response) => response.json())
                                .then((responseJson) => {
                                    if (responseJson.length > 0) {
                                        if (global.trangloc === 1) {
                                            // let mang = responseJson;
                                            this.setState({
                                                mang: responseJson,
                                                refresh: false,
                                            });
                                        } else {
                                            this.setState({
                                                mang: this.state.mang.concat(responseJson),
                                                refresh: false
                                            });
                                        }
                                        global.trangloc = global.trangloc + 1;
                                    }
                                    else {
                                        if (global.trangloc === 1) {
                                            this.setState({ mang: [], arrLatLong: [] })
                                        }
                                        this.setState({
                                            refresh: false,
                                        });
                                    }
                                })
                                .catch((e) => {
                                    alert(e);
                                });
                        }
                    }
                }
                // }
            }
        } else {

            if (global.loctiennghi === '0000000000') {
                if (global.locsao === '') {
                    global.locsao = '12345';
                }
                if (global.locgiamax !== 0 && global.locgiamin !== 0) {
                    fetch(global.server.concat('getDanhSachBanDoKhongTienNghi.php?&sosao=' + global.locsao + '&lat=' + global.latsearch + '&long=' + global.longsearch + '&bankinh=' + global.bankinhsearch))
                        .then((response) => response.json())
                        .then((responseJson) => {
                            this.setState({
                                arrMap: responseJson
                            })
                        })
                        .catch((e) => {
                            alert(e);
                        });
                } else {
                    fetch(global.server.concat('getDanhSachBanDoKhongTienNghi_Gia.php?&sosao=' + global.locsao + '&lat=' + global.latsearch + '&long=' + global.longsearch + '&bankinh=' + global.bankinhsearch))
                        .then((response) => response.json())
                        .then((responseJson) => {
                            this.setState({
                                arrMap: responseJson
                            })
                        })
                        .catch((e) => {
                            alert(e);
                        });
                }

            }
            else {
                if (global.locsao === '') {
                    global.locsao = '12345';
                }
                if (global.locgiamax !== 0 && global.locgiamin !== 0) {
                    fetch(global.server.concat('getDanhSachTrenBanDo.php?tiennghi=' + global.loctiennghi + '&giamax=' + global.locgiamax + '&giamin=' + global.locgiamin + '&sosao=' + global.locsao + '&lat=' + global.latsearch + '&long=' + global.longsearch + '&bankinh=' + global.bankinhsearch))
                        .then((response) => response.json())
                        .then((responseJson) => {
                            this.setState({
                                arrMap: responseJson
                            })
                        })
                        .catch((e) => {
                            alert(e);
                        });
                } else {
                    fetch(global.server.concat('getDanhSachTrenBanDoKhongLocGia.php?tiennghi=' + global.loctiennghi + '&sosao=' + global.locsao + '&lat=' + global.latsearch + '&long=' + global.longsearch + '&bankinh=' + global.bankinhsearch))
                        .then((response) => response.json())
                        .then((responseJson) => {
                            this.setState({
                                arrMap: responseJson
                            })
                        })
                        .catch((e) => {
                            alert(e);
                        });
                }

            }

        }


    }
    
    loadDataLoc() {
        //alert(global.loctiennghi + ' - ' + global.locgiamax + ' - ' + global.locgiamin + ' - ' + global.locsao);
        //this.setState({ load1: false, page: 1 });
        //global.locDL = true;
        //alert(global.locDL);
        this.props.navigation.navigate('DrawerClose');
        this.loadData(1);
    }

    goDetails(ten, id) {
        this.props.navigation.navigate('DetailScreen', { name: ten, id: id });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{ flex: 1 }}>
                        <TouchableWithoutFeedback
                            onPress={() => { navigate('DrawerOpen'); }}
                        >
                            <Image style={styles.imgHeader} source={opemenu} />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ flex: 5, alignItems: 'center' }}>
                        <Text numberOfLines={1} >{this.state.diadiem}</Text>
                    </View>
                    <View style={{ flex: 4, justifyContent: 'space-between', flexDirection: 'row', paddingRight: 5 }}>
                        <TouchableOpacity
                            onPress={() => { navigate('SearchScreen', { navtigation: navigate }); }}
                        >
                            <Image style={styles.imgHeader} source={icsearch} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { this.clickMap(); }}
                        >
                            <Image style={styles.imgHeader} source={icMap} />
                        </TouchableOpacity>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                global.onSignIn ?
                                    global.onSignIn.quyen === '1' ? navigate('AccountScreen', { flag: '2' }) :
                                        navigate('AccountMemberScreen', { flag: '2' }) :
                                    navigate('SigninScreen', { flag: '2' })
                            }}
                        >
                            <Image style={styles.imgHeader} source={icAc} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
               
                <View style={{ height: this.state.maxheight }}>
                    <FlatList
                        onEndReachedThreshold={0.2}
                        onEndReached={() => { this.loadMore(); }}
                        ref="ds"
                        //ListHeaderComponent={(<HeaderFlatList />)}
                        refreshing={this.state.refresh}
                        onRefresh={() => { this.refresh(); }}
                        data={this.state.mang}
                        renderItem={({ item }) =>
                            <View style={styles.rowFlatlist}>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        global.idKS = item.key;
                                        navigate('DetailScreen', { name: item.ten, id: item.key })
                                    }}
                                >
                                    <View style={{ height: width / 3, flexDirection: 'row', backgroundColor: 'white', borderRadius: 5 }}>
                                        <Image source={{ uri: item.hinh }} style={{ height: width / 3, width: width / 3, flex: 1 }} />
                                        <View style={{ flex: 2 }}>
                                            <View style={{ flex: 1 }}>
                                                <View style={{ flex: 1, paddingLeft: 5, paddingVertical: 2, paddingRight: 2 }}>
                                                    <Text numberOfLines={1} style={{ fontWeight: 'bold' }}>{item.ten}</Text>
                                                    <Text numberOfLines={1}>{item.diachi}</Text>
                                                </View>
                                                <View style={{ flex: 2, borderTopWidth: 1, borderTopColor: '#e9ebee', flexDirection: 'row' }}>
                                                    <View style={{ flex: 1 }}>
                                                        <View style={{ flex: 1, paddingHorizontal: 2, paddingVertical: 2, flexDirection: 'row' }}>
                                                            {/* <Image resizeMode={'contain'} source={item.key%2===0 ? s1: s3} style={{ flex: 1 }} /> */}
                                                            <View style={{ flex: 2, paddingVertical: 2 }}>
                                                                <Image resizeMode={'contain'} source={item.sosao == 1 ? icrt1 : (item.sosao == 2 ? icrt2 : (item.sosao == 3 ? icrt3 : (item.sosao == 4 ? icrt4 : icrt5 ) ))} style={{ flex: 1 }} />
                                                            </View>

                                                            <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                                                                {/* <Text style={{ fontSize: 12 }}>{item.sosao == 0 ? 'Chưa đánh giá' : item.sosao + '/5'}</Text> */}
                                                                <Text numberOfLines={1} style={{ fontSize: 10 }}>{item.sodanhgia} lượt đánh giá</Text>
                                                                <Text numberOfLines={1} style={{ fontSize: 10 }}>{item.sobl} bình luận</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ flex: 1, borderTopWidth: 1, borderTopColor: '#e9ebee' }}>
                                                            {/* <Text numberOfLines={1} style={{ fontSize: 10 }}>{item.sobl} bình luận</Text> */}
                                                        </View>
                                                    </View>
                                                    <View style={{ flex: 1, borderLeftWidth: 1, borderLeftColor: '#e9ebee' }}>
                                                        <View style={{ flex: 1, paddingHorizontal: 2, paddingVertical: 2 }}>
                                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                                <Text style={{ fontSize: 10 }}>Giá 1 ngày từ</Text>
                                                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#248f24' }}>{item.gia}</Text>
                                                            </View>
                                                        </View>

                                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                            <TouchableOpacity
                                                            >
                                                                <Text style={{ backgroundColor: '#248f24', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 3, color: 'white' }}>View Details</Text>
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
                    <View style={{ height: this.state.heigthmapview }}>
                        <MapViewComponent loaddl={this.loadData.bind(this)} goDetails={this.goDetails.bind(this)} bankinh={global.bankinhsearch * 1000} data={this.state.arrMap} />
                        {/* <MapViewComponent /> */}
                    </View>
                    {/* <View style={{ backgroundColor: 'white', height: this.state.heightbottom }}>
                        <TouchableOpacity
                            onPress={() => { this.popupDialog.show() }}
                        >
                        <View>
                            <Text>Sắp xếp theo khoảng cách</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: this.state.heigthmapview }}>
                        <MapViewComponent />
                    </View>
                </View>
                <PopupDialog
                    width={0.9 * width}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                    dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
                    dialogTitle={<DialogTitle title="Sort by" />}
                    
                >
                    <View style={{ margin: 10 }}>
                        <RadioGroup
                            selectedIndex = {0}
                            onSelect = {(index) => {this.onSelect(index)}}
                        >
                            <RadioButton value={'item1'} >
                            <Text>Sort by Distance</Text>
                            </RadioButton>

                            <RadioButton value={'item2'}>
                            <Text>Sort by Popularity</Text>
                            </RadioButton>

                            <RadioButton value={'item3'}>
                                <Text>Focus on Rating</Text>
                            </RadioButton>
                            <RadioButton value={'item4'}>
                                <Text>Focus on Price</Text>
                            </RadioButton>                      
                        </RadioGroup>                 
                    </View>
                </PopupDialog> */}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerhiden: {
        height: 0
    },
    header: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: height / 12,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    imgHeader: {
        width: 25,
        height: 25,
    },
    rowFlatlist: {
        paddingHorizontal: 5,
        paddingVertical: 2.5
        //borderBottomWidth: 1
    },
    itemBottom: {
        backgroundColor: 'white'
    }

})  
