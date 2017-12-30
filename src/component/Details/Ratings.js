import React, { Component } from 'react';
import {
    View, FlatList, Text, Image, TextInput, StyleSheet, TouchableOpacity,
    ActivityIndicator, ToastAndroid, Modal, BackHandler, TouchableWithoutFeedback
} from 'react-native';
import global from '../global';
import iconaccount from '../img/iconaccount.png';
import ProgressCircle from 'react-native-progress-circle';
import StarRating from 'react-native-star-rating';
import str from './img/icstar.png';
import str2 from './img/icstar2.png';
import iclike from '../img/iclike.png';
import icrep from '../img/icreply.png';
import icback from '../img/back.png';
import icsend from '../img/send.png';

export default class Ratings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mang: [],
            value: '',
            height: 40,
            dangnhap: false,
            loading: false,
            page: 1,
            diemso: 0,
            starCount: 1,
            sodanhgias: 0,
            isVisiblemodalReply: false,
            comment: '',
            height2: 40,
            indexmang: 0,
            mangReply: [],
            loadingRepy: true,
            pageReply: 1,
            boxXoaChinhSua: false,
            boxSuaBL: false,
            heigh3: 40,
            suabl: '',
            indexSuaXoa: 0,
            binhluancon: false,
            boxXacNhanXoa: false,
            indexBL: 0
        }
    }

    post() {
        if (this.state.value != '') {
            if (global.onSignIn) {
                fetch(global.server.concat('themBinhLuan.php'),
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json'
                        },
                        body: JSON.stringify({ iduser: global.onSignIn.id, idks: global.idKS, nd: this.state.value })
                    })
                    .then(res => res.text())
                    .then(res => {
                        if (res !== '-1') {
                            ToastAndroid.show('Thành công', ToastAndroid.SHORT);
                            const { mang } = this.state;
                            //let maxId = Math.max.apply(null, mang.map(item => item.id)) + 1;
                            let today = new Date();
                            mang.unshift({ id: parseInt(res,10), ten: global.onSignIn.hoten, binhluan: this.state.value, ngay: today.getDate(), thang: today.getMonth() + 1, nam: today.getFullYear(), solike: 0, sobl: 0, islike: 0, iduser: global.onSignIn.id });

                            this.setState({
                                mang,
                                value: '',
                            });
                            //alert(parseInt(res,10));
                        }
                        else {
                            alert(this.state.value);
                        }


                    })
                    .catch((e) => { console.log(e) });

            }
            else {
                ToastAndroid.show('Chưa đăng nhập !', ToastAndroid.SHORT);
            }
        } else {
            ToastAndroid.show('Chưa nhập nội dung !', ToastAndroid.SHORT);
        }

    }

    loadData() {
        this.setState({ loading: true }, function () {
            let idus = '';
            if (global.onSignIn) {
                idus = global.onSignIn.id;
            }
            fetch(global.server.concat('getBinhLuan2.php?id=' + global.idKS + '&trang=' + this.state.page + '&iduser=' + idus))
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.length > 0) {
                        this.setState({
                            mang: this.state.mang.concat(responseJson),
                            page: this.state.page + 1,
                            loading: false
                        });
                    }
                    else {
                        this.setState({
                            loading: false
                        });
                    }
                    global.loaddanhgia = true;
                })
                .catch((e) => { console.log(e) });
        });



    }
    longPress(index) {
        // alert(index);
        this.setState({
            binhluancon: false,
            indexBL: index
        })
        if (global.onSignIn) {
            if (global.onSignIn.id == this.state.mang[index].iduser) {
                this.setState({
                    boxXoaChinhSua: true,
                    indexSuaXoa: index
                })
            }
        }
    }

    longPress2(index) {
        // alert(index);
        this.setState({
            binhluancon: true
        });
        if (global.onSignIn) {
            if (global.onSignIn.id == this.state.mangReply[index].iduser) {
                this.setState({
                    boxXoaChinhSua: true,
                    indexSuaXoa: index
                });

            }
        }
    }


    loadThemBinhLuan() {
        this.loadData();
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }
    guiDanhGia() {
        if (global.onSignIn) {
            fetch(global.server.concat('userDanhGia.php?user=' + global.onSignIn.id + '&idks=' + global.idKS + '&danhgia=' + this.state.starCount))
                .then((response) => response.text())
                .then((responseJson) => {
                    if (responseJson === '1') {
                        this.getDanhGia();
                        ToastAndroid.show('Đánh giá của bạn đã được ghi nhận !', ToastAndroid.SHORT);
                    } else {
                        ToastAndroid.show('Có lỗi xảy ra. Thử lại sau !', ToastAndroid.SHORT);
                    }
                })
                .catch((e) => { ToastAndroid.show('Có lỗi xảy ra. Thử lại sau !', ToastAndroid.SHORT); });
        } else {
            ToastAndroid.show('Chưa đăng nhập !', ToastAndroid.SHORT);
        }
    }

    getDanhGia() {
        //alert(this.state.starCount);
        if (global.onSignIn) {
            fetch(global.server.concat('getDanhGiaUser.php?user=' + global.onSignIn.id + '&idks=' + global.idKS))
                .then((response) => response.json())
                .then((responseJson) => {

                    //alert(responseJson);
                    this.setState({
                        starCount: parseInt(responseJson.danhgia, 10),
                        sodanhgias: parseInt(responseJson.sodanhgia, 10),
                        diemso: parseInt(responseJson.diemso * 100 / 5, 10)
                        //diemso: parseInt(responseJson.diemso, 10)
                    });

                    // if(responseJson.diemso === null){
                    //     this.setState({
                    //         diemso: 0,
                    //     });
                    // } else {
                    //     this.setState({
                    //         diemso: parseInt(parent(responseJson.diemso, 10) * 100 / 5)
                    //     })
                    // }
                })
                .catch((e) => { ToastAndroid.show('Có lỗi xảy ra. Thử lại sau !', ToastAndroid.SHORT); });
        }
    }


    xoaBinhLuan() {
        if (this.state.binhluancon) {
            this.setState({
                boxXoaChinhSua: false,
                boxXacNhanXoa: true
            });
            //alert('Xóa bl con id là ' + this.state.mangReply[this.state.indexSuaXoa].id);
        } else {
            //alert('Xóa bl lớn id là ' + this.state.mang[this.state.indexSuaXoa].id);
            this.setState({
                boxXoaChinhSua: false,
                boxXacNhanXoa: true
            });
        }
    }

    xacNhanXoa() {


        this.setState({
            boxXacNhanXoa: false
        });

        if (this.state.binhluancon) {
            //alert('Xóa BL có id ' + this.state.mangReply[this.state.indexSuaXoa].id + ' ---- ' + this.state.mangReply[this.state.indexSuaXoa].binhluan);
            fetch(global.server.concat('xoaBinhLuanReply.php?idbl=' + this.state.mangReply[this.state.indexSuaXoa].id))
                .then((response) => response.text())
                .then((responseJson) => {
                    if (responseJson === '1') {
                        let temp = this.state.mangReply;
                        temp.splice(this.state.indexSuaXoa, 1);
                        this.setState({
                            mangReply: temp,
                            
                        });

                        temp = this.state.mang;
                        //temp.splice(this.state.indexSuaXoa, 1);
                        temp[this.state.indexBL].sobl = temp[this.state.indexBL].sobl - 1;
                        this.setState({
                            mang: temp,
                            //boxXacNhanXoa: false
                        });

                        ToastAndroid.show('Thành công !', ToastAndroid.SHORT);
                    } else {
                        ToastAndroid.show('Có lỗi xảy ra. Thử lại sau !', ToastAndroid.SHORT);
                    }
                })
                .catch((e) => { ToastAndroid.show('Có lỗi xảy ra. Thử lại sau !', ToastAndroid.SHORT); });
        } else {
            // alert('Xóa BL có id ' + this.state.mang[this.state.indexSuaXoa].id + ' ---- ' + this.state.mang[this.state.indexSuaXoa].binhluan);
            fetch(global.server.concat('xoaBinhLuan.php?idbl=' + this.state.mang[this.state.indexSuaXoa].id + '&iduser=' + global.onSignIn.id))
                .then((response) => response.text())
                .then((responseJson) => {
                    if (responseJson == '1') {
                        let temp = this.state.mang;
                        temp.splice(this.state.indexSuaXoa, 1);
                        this.setState({
                            mang: temp,
                            //boxXacNhanXoa: false
                        });

                        ToastAndroid.show('Thành công !', ToastAndroid.SHORT);
                    } else {
                        ToastAndroid.show('Có lỗi xảy ra. Thử lại sau !', ToastAndroid.SHORT);
                    }
                })
                .catch((e) => { ToastAndroid.show('Có lỗi xảy ra. Thử lại sau !', ToastAndroid.SHORT); });
        }
    }
    guiTraLoi() {
        if (this.state.comment != '') {
            if (global.onSignIn) {
                fetch(global.server.concat('themReply.php'),
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json'
                        },
                        body: JSON.stringify({ iduser: global.onSignIn.id, idbl: this.state.mang[this.state.indexmang].id, nd: this.state.comment })
                    })
                    .then(res => res.text())
                    .then(res => {
                        if (res !== '-1') {
                            ToastAndroid.show('Thành công', ToastAndroid.SHORT);
                            const { mangReply } = this.state;
                            //let maxId = Math.min.apply(null, mangReply.map(item => item.id)) - 1;
                            let today = new Date();
                            mangReply.unshift({ id: parseInt(res, 10), ten: global.onSignIn.hoten, binhluan: this.state.comment, ngay: today.getDate(), thang: today.getMonth() + 1, nam: today.getFullYear(), iduser: global.onSignIn.id });
                            let temp = this.state.mang;
                            temp[this.state.indexmang].sobl++;
                            this.setState({
                                mangReply,
                                comment: '',
                                mang: temp
                            });

                            //alert(parseInt(res,10));

                        }
                        else {
                            ToastAndroid.show('Lỗi! Thử lại..', ToastAndroid.SHORT);
                        }


                    })
                    .catch((e) => { console.log(e) });

            }
            else {
                ToastAndroid.show('Chưa đăng nhập !', ToastAndroid.SHORT);
            }
        } else {
            ToastAndroid.show('Chưa nhập nội dung!', ToastAndroid.SHORT);
        }
        //alert(this.state.mang[this.state.indexmang].id);
    }

    thichBothic(index) {
        //alert(this.state.mang[index].binhluan);
        if (global.onSignIn) {
            let temp = this.state.mang;

            if (temp[index].islike == '0') {
                fetch(global.server.concat('thichBoThichBinhLuan.php?user=' + global.onSignIn.id + '&idbl=' + this.state.mang[index].id + '&thich= 1'))
                    .then((response) => response.text())
                    .then((responseJson) => {
                        // this.setState({
                        //     starCount: parseInt(responseJson.danhgia, 10),
                        //     sodanhgias: parseInt(responseJson.sodanhgia, 10)
                        // });
                        if (responseJson == '1') {
                            temp[index].islike = '1';
                            temp[index].solike = parseInt(temp[index].solike) + 1;
                            this.setState({
                                mang: temp
                            });
                        } else {
                            ToastAndroid.show('Có lỗi xảy ra. Thử lại sau !', ToastAndroid.SHORT);
                        }
                    })
                    .catch((e) => { ToastAndroid.show('Có lỗi xảy ra. Thử lại sau !', ToastAndroid.SHORT); });

            } else {

                fetch(global.server.concat('thichBoThichBinhLuan.php?user=' + global.onSignIn.id + '&idbl=' + this.state.mang[index].id + '&thich= 0'))
                    .then((response) => response.text())
                    .then((responseJson) => {
                        if (responseJson == '1') {

                            temp[index].islike = '0';
                            temp[index].solike = parseInt(temp[index].solike) - 1;

                            this.setState({
                                mang: temp
                            });
                        } else {
                            ToastAndroid.show('Có lỗi xảy ra. Thử lại sau !', ToastAndroid.SHORT);
                        }
                    })
                    .catch((e) => { ToastAndroid.show('Có lỗi xảy ra. Thử lại sau !', ToastAndroid.SHORT); });
            }
        } else {
            ToastAndroid.show('Mời bạn đăng nhập !', ToastAndroid.SHORT);
        }

    }

    loadReply(index) {
        fetch(global.server.concat('getBinhLuan.php?id=' + this.state.mang[index].id + '&trang=' + this.state.pageReply))
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.length > 0) {
                    this.setState({
                        mangReply: this.state.mangReply.concat(responseJson),
                        pageReply: this.state.pageReply + 1,
                        loadingRepy: false
                    });
                }
                else {
                    this.setState({
                        loadingRepy: false
                    });
                }

            })
            .catch((e) => { console.log(e) });


    }

    suaBinhLuan() {
        //alert('Sửa BL')
        if (!this.state.binhluancon) {
            this.setState({
                boxXoaChinhSua: false,
                boxSuaBL: true,
                suabl: this.state.mang[this.state.indexSuaXoa].binhluan
            });
        } else {
            this.setState({
                boxXoaChinhSua: false,
                boxSuaBL: true,
                suabl: this.state.mangReply[this.state.indexSuaXoa].binhluan
            });

            //alert(this.state.mangReply[this.state.indexSuaXoa].binhluan);
        }

    }

    capNhatBL() {
        //alert('suaBinhLuan.php?noidung=' + this.state.suabl + '&idbl=' + this.state.mang[this.state.indexSuaXoa].id);
        
        if (!this.state.binhluancon) {
            fetch(global.server.concat('suaBinhLuan.php?noidung=' + this.state.suabl + '&idbl=' + this.state.mang[this.state.indexSuaXoa].id))
                .then((response) => response.text())
                .then((responseJson) => {
                    if (responseJson == '1') {

                        let temp = this.state.mang;
                        temp[this.state.indexSuaXoa].binhluan = this.state.suabl;
                        //temp[index].solike = parseInt(temp[index].solike) - 1;

                        this.setState({
                            mang: temp,
                            suabl: '',
                            boxSuaBL: false
                        });
                        ToastAndroid.show('Thành công !!', ToastAndroid.SHORT);
                    } else {
                        ToastAndroid.show('Có lỗi xảy ra. Thử lại sau !', ToastAndroid.SHORT);
                    }
                })
                .catch((e) => { ToastAndroid.show('Có lỗi xảy ra. Thử lại sau !', ToastAndroid.SHORT); });
        } else {

            //alert()
            fetch(global.server.concat('suaBinhLuanReply.php?noidung=' + this.state.suabl + '&idbl=' + this.state.mangReply[this.state.indexSuaXoa].id))
                .then((response) => response.text())
                .then((responseJson) => {
                    if (responseJson == '1') {

                        let temp = this.state.mangReply;
                        temp[this.state.indexSuaXoa].binhluan = this.state.suabl;
                        //temp[index].solike = parseInt(temp[index].solike) - 1;

                        this.setState({
                            mangReply: temp,
                            suabl: '',
                            boxSuaBL: false
                        });
                        ToastAndroid.show('Thành công !!', ToastAndroid.SHORT);
                    } else {
                        ToastAndroid.show('Có lỗi xảy ra. Thử lại sau !', ToastAndroid.SHORT);
                    }
                })
                .catch((e) => { ToastAndroid.show('Có lỗi xảy ra. Thử lại sau !', ToastAndroid.SHORT); });

            //alert(this.state.mangReply[this.state.indexSuaXoa].id + '------' + this.state.mangReply[this.state.indexSuaXoa].binhluan);
            //alert('suaBinhLuanReply.php?noidung=' + this.state.suabl + '&idbl=' + this.state.mang[this.state.indexSuaXoa].id);
        }

    }
    componentDidMount() {
        this.loadData();
        this.getDanhGia();

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <FlatList
                    ListHeaderComponent={(
                        <View style={{ paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#e9ebee' }}>

                            <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                                <ProgressCircle
                                    style={{ flex: 1 }}
                                    percent={this.state.diemso}
                                    radius={50}
                                    borderWidth={8}
                                    color="#3399FF"
                                    shadowColor="#999"
                                    bgColor="#fff"
                                >
                                    <Text style={{ fontSize: 20 }}>{this.state.diemso + '/100'}</Text>
                                </ProgressCircle>
                                <View style={{ flex: 2, paddingLeft: 10 }}>
                                    <Text>Chỉ số dựa trên {this.state.sodanhgias} đánh giá của người dùng</Text>
                                    <View style={{ paddingHorizontal: 30, paddingVertical: 10 }}>
                                        <StarRating
                                            starSize={25}
                                            disabled={false}
                                            emptyStar={str2}
                                            fullStar={str}
                                            maxStars={5}
                                            rating={this.state.starCount}
                                            selectedStar={(rating) => this.onStarRatingPress(rating)}

                                        />
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity
                                            onPress={() => { this.guiDanhGia() }}
                                        >
                                            <Text style={{ padding: 5, paddingLeft: 10, backgroundColor: '#4267b2', borderRadius: 5, color: 'white' }}>  Gửi đánh giá của bạn  </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', padding: 10 }}>
                                <Image source={iconaccount} style={{ width: 25, height: 25 }} />
                                <View style={{ borderWidth: 1, flex: 1, marginLeft: 10, borderRadius: 5, borderColor: '#e9ebee' }}>
                                    <TextInput
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        placeholder="Bình luận của bạn ..."
                                        onChangeText={(value) => this.setState({ value })}
                                        value={this.state.value}
                                        multiline={true}
                                        numberOfLines={3}
                                        onContentSizeChange={(event) => {
                                            this.setState({ height: event.nativeEvent.contentSize.height })
                                        }}
                                        style={[styles.default, { height: Math.max(35, this.state.height) }]}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 }}>
                                <TouchableOpacity
                                    onPress={() => { this.post() }}
                                >
                                    <Text style={{ padding: 10, paddingLeft: 10, backgroundColor: '#4267b2', borderRadius: 5, color: 'white' }}>   Đăng   </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    data={this.state.mang}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) =>
                        <View key={item.id} style={{ paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#e9ebee' }}>
                            <TouchableOpacity
                                onLongPress={() => {
                                    this.longPress(index);
                                }}
                            >
                                <View style={{ flexDirection: 'row', padding: 10 }}>
                                    <Image source={iconaccount} style={{ width: 25, height: 25 }} />
                                    <View style={{ borderWidth: 1, padding: 5, flex: 1, marginLeft: 5, borderRadius: 5, borderColor: '#e9ebee' }}>
                                        <Text style={{ fontWeight: 'bold' }}>{item.ten}</Text>
                                        <Text>{item.binhluan}</Text>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>

                                            <Text style={{ color: '#a3a6ad', fontSize: 12, marginRight: 10 }}>{item.ngay} tháng {item.thang} {item.nam}</Text>

                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.thichBothic(index);
                                                }}
                                            >
                                                <Text style={{ color: '#4564a1', fontSize: 12, marginRight: 10, textDecorationLine: 'underline' }} >{item.islike == 0 ? 'Thích' : 'Bỏ thích'}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.setState({ indexBL: index, isVisiblemodalReply: true, mangReply: [], loadingRepy: true, pageReply: 1, indexmang: index, comment: '' },
                                                        function () {
                                                            this.loadReply(index);
                                                        });
                                                }}
                                            >
                                                <Text style={{ color: '#4564a1', fontSize: 12, marginRight: 10, textDecorationLine: 'underline' }} >Trả lời</Text>
                                            </TouchableOpacity>
                                            {item.solike != 0 ?
                                                <View style={{ flexDirection: 'row', height: 15 }}>
                                                    <Image source={iclike} style={{ height: 15, width: 15 }} />
                                                    <Text style={{ paddingLeft: 5, color: '#4564a1', fontSize: 12 }}>{parseInt(item.solike, 10)}</Text>
                                                </View>
                                                : null
                                            }
                                        </View>
                                        {
                                            item.sobl != 0 ?
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Image source={icrep} style={{ height: 15, width: 15 }} />
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            this.setState({ isVisiblemodalReply: true, mangReply: [], loadingRepy: true, pageReply: 1, indexmang: index, comment: '', indexBL: index },
                                                                function () {
                                                                    this.loadReply(index);
                                                                });

                                                        }}
                                                    >
                                                        <Text style={{ color: '#4564a1', fontSize: 12, marginLeft: 10, textDecorationLine: 'underline' }} >Xem {item.sobl} câu trả lời</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                : null
                                        }

                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                    ListFooterComponent={(
                        <View style={{ padding: 10 }}>
                            {
                                !this.state.loading ?
                                    (
                                        <TouchableOpacity
                                            onPress={() => { this.loadThemBinhLuan() }}
                                        >
                                            <Text style={{ color: '#4267b2' }}>Xem thêm bình luận ...</Text>
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
                />




                <Modal
                    transparent={true}
                    visible={this.state.boxXoaChinhSua}
                    onRequestClose={() => this.setState({ boxXoaChinhSua: false })}
                >
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => {
                            this.setState({ boxXoaChinhSua: false })
                        }}
                    >
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        }}>
                            <View style={{
                                backgroundColor: 'white',
                                //padding: 5,


                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 100,
                                borderRadius: 6
                            }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderBottomWidth: 0.25,
                                        borderBottomColor: '#a6aaaa'
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.suaBinhLuan();
                                        }}
                                    >
                                        <View
                                            style={{
                                                paddingHorizontal: 50,
                                                paddingVertical: 5
                                            }}
                                        >
                                            <Text>Sửa bình luận</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',

                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.xoaBinhLuan();
                                        }}
                                    >
                                        <View
                                            style={{
                                                paddingHorizontal: 50,
                                                paddingVertical: 5
                                            }}
                                        >
                                            <Text>Xóa bình luận</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </TouchableOpacity>
                </Modal>



                <Modal
                    transparent={true}
                    visible={this.state.boxXacNhanXoa}
                    onRequestClose={() => this.setState({ boxXacNhanXoa: false })}
                >
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => {
                            this.setState({ boxXacNhanXoa: false })
                        }}
                    >
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        }}>
                            <TouchableWithoutFeedback>
                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        //height: 100,
                                        borderRadius: 6,
                                        paddingHorizontal: 8,
                                        paddingVertical: 15
                                    }}
                                >

                                    <Text style={{ paddingBottom: 15 }}>Bạn có chắc muốn xóa bình luận này không ?</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({
                                                    boxXacNhanXoa: false
                                                });
                                            }}
                                        >
                                            <Text style={{ paddingHorizontal: 10 }}>HỦY</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.xacNhanXoa();
                                            }}
                                        >
                                            <Text style={{ paddingHorizontal: 10, color: '#4564a1' }}>XÓA</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {/* <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderBottomWidth: 0.25,
                                        borderBottomColor: '#a6aaaa'
                                    }}
                                >
                                   <Text>Bạn có chắc muốn xóa bình luận này không ?</Text> 
                                </View> */}

                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableOpacity>
                </Modal>


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.isVisiblemodalReply}
                    onRequestClose={() => { this.setState({ isVisiblemodalReply: false }) }}
                >
                    <View style={{ flex: 1, backgroundColor: 'black' }}>
                        <View style={{ flex: 1, borderRadius: 15, backgroundColor: 'white' }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ alignItems: 'center', flexDirection: 'row', padding: 10, borderBottomWidth: 0.5, borderBottomColor: '#e9ebee' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ isVisiblemodalReply: false });
                                        }}
                                    >
                                        <View style={{ alignSelf: 'flex-end' }}>
                                            <Image source={icback} style={{ height: 25, width: 25 }} />
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                        <Text style={{ fontWeight: 'bold' }}>Trả lời</Text>
                                    </View>
                                </View>
                                <FlatList
                                    data={this.state.mangReply}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item, index }) =>
                                        <View key={item.id} style={{ paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#e9ebee' }}>

                                            <View style={{ flexDirection: 'row', padding: 10 }}>
                                                <Image source={iconaccount} style={{ width: 25, height: 25 }} />

                                                <View style={{ borderWidth: 1, padding: 5, flex: 1, marginLeft: 5, borderRadius: 5, borderColor: '#e9ebee' }}>
                                                    <TouchableOpacity
                                                        onLongPress={() => {
                                                            this.longPress2(index);
                                                        }}
                                                    >
                                                        <Text style={{ fontWeight: 'bold' }}>{item.ten}</Text>
                                                        <Text>{item.binhluan}</Text>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
                                                            <Text style={{ color: '#a3a6ad', fontSize: 12, marginRight: 10 }}>{item.ngay} tháng {item.thang} {item.nam}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>

                                            </View>

                                        </View>
                                    }
                                    ListFooterComponent={(
                                        <View style={{ padding: 10 }}>
                                            {
                                                !this.state.loadingRepy ?
                                                    (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.setState({ loadingRepy: true }, function () {
                                                                    this.loadReply(this.state.indexmang);
                                                                });

                                                            }}
                                                        >
                                                            <Text style={{ color: '#4267b2' }}>Xem thêm bình luận ...</Text>
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
                                />
                                <View style={{ padding: 10, borderTopWidth: 0.5, borderTopColor: '#e9ebee', flexDirection: 'row' }}>
                                    <TextInput
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        placeholder="Bình luận của bạn ..."
                                        onChangeText={(comment) => this.setState({ comment })}
                                        value={this.state.comment}
                                        multiline={true}
                                        numberOfLines={3}
                                        onContentSizeChange={(event) => {
                                            this.setState({ height2: event.nativeEvent.contentSize.height })
                                        }}
                                        style={[styles.default2, { height: Math.max(35, this.state.height2) }]}
                                    />
                                    <View style={{ padding: 5, flex: 1 }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.guiTraLoi();
                                            }}
                                        >
                                            <Image source={icsend} style={{ height: 25, width: 25 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </View>
                </Modal>


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.boxSuaBL}
                    onRequestClose={() => { this.setState({ boxSuaBL: false }) }}
                >
                    <View style={{ flex: 1, backgroundColor: 'black' }}>
                        <View style={{ flex: 1, borderRadius: 15, backgroundColor: 'white' }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ alignItems: 'center', flexDirection: 'row', padding: 10, borderBottomWidth: 0.5, borderBottomColor: '#e9ebee' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ boxSuaBL: false, suabl: '' });
                                        }}
                                    >
                                        <View style={{ alignSelf: 'flex-end' }}>
                                            <Image source={icback} style={{ height: 25, width: 25 }} />
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                        <Text style={{ fontWeight: 'bold' }}>Chỉnh sửa</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', padding: 10 }}>
                                    <Image source={iconaccount} style={{ width: 25, height: 25 }} />
                                    <View style={{ borderWidth: 1, flex: 1, marginLeft: 10, borderRadius: 5, borderColor: '#e9ebee' }}>
                                        <TextInput
                                            underlineColorAndroid='rgba(0,0,0,0)'
                                            placeholder="Bình luận của bạn ..."
                                            onChangeText={(suabl) => this.setState({ suabl })}
                                            value={this.state.suabl}
                                            multiline={true}
                                            numberOfLines={3}
                                            onContentSizeChange={(event) => {
                                                this.setState({ height3: event.nativeEvent.contentSize.height })
                                            }}
                                            style={[styles.default3, { height: Math.max(35, this.state.height3) }]}
                                        />
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => { this.capNhatBL(); }}
                                    >
                                        <Text style={{ padding: 7, paddingLeft: 10, backgroundColor: '#4267b2', borderRadius: 5, color: 'white' }}>   Cập nhật   </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                boxSuaBL: false,
                                                suabl: ''
                                            });
                                        }}
                                    >
                                        <Text style={{ padding: 7, paddingLeft: 10, marginLeft: 10, backgroundColor: '#4267b2', borderRadius: 5, color: 'white' }}>   Hủy   </Text>
                                    </TouchableOpacity>

                                </View>

                            </View>

                        </View>
                    </View>
                </Modal>



            </View>
        )
    }
}
const styles = StyleSheet.create({
    default: {
        height: 40
    },
    default2: {
        height: 40,
        flex: 10
    },
    default3: {
        height: 40,
        borderRadius: 5,
        borderColor: '#e9ebee',
        borderWidth: 1
    }
})