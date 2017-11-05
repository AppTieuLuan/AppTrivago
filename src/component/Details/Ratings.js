import React, { Component } from 'react';
import {
    View, FlatList, Text, Image, TextInput, StyleSheet, TouchableOpacity,
    ActivityIndicator, ToastAndroid
} from 'react-native';
import global from '../global';
import iconaccount from '../img/iconaccount.png';
import ProgressCircle from 'react-native-progress-circle';
import StarRating from 'react-native-star-rating';
import str from './img/icstar.png';
import str2 from './img/icstar2.png';
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
            diemso: 38,
            starCount: 1
        }
    }
    
    post() {
        if(this.state.value != '') {
            if(global.onSignIn)
            {
               
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
                    if (res === '1') {
                        ToastAndroid.show('Thành công', ToastAndroid.SHORT);
                        const { mang } = this.state;
                        let maxId = Math.max.apply(null, mang.map(item => item.id)) + 1;
                        mang.unshift({ id: maxId, ten: global.onSignIn.hoten, binhluan: this.state.value });
                        
                        this.setState({
                            mang,
                            value: '',
                        });
                    }
                    else {
                        alert(this.state.value);
                    }

                    
                })
                .catch((e)=>{console.log(e)});
                
            }
            else{
                alert('Bạn chưa đăng nhập .. ')
            }
        }else {
            alert('Nhập nội dung !!')
        }
            
    }

    loadData() {
        
        this.setState({ loading: true }, function (){
            fetch( global.server.concat('getBinhLuan.php?id=' + global.idKS + "&trang=" + this.state.page))
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.length > 0){
                    this.setState({
                        mang: this.state.mang.concat(responseJson),
                        page: this.state.page + 1,
                        loading: false
                    });
                }
                else{
                    this.setState({
                        loading: false
                    });
                }
            })
            .catch((e) => { console.log(e) });
        });
        
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
        alert(this.state.starCount);
    }
    componentDidMount() {
        this.loadData();
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <FlatList
                    ListHeaderComponent={(
                        <View style={{ paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#e9ebee' }}>
                        
                        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                            <ProgressCircle
                                style = {{ flex: 1 }}
                                percent={this.state.diemso}
                                radius={50}
                                borderWidth={8}
                                color="#3399FF"
                                shadowColor="#999"
                                bgColor="#fff"
                            >
                                <Text style={{ fontSize: 20 }}>{ this.state.diemso + '/100'}</Text>
                            </ProgressCircle>
                            <View style={{ flex: 2, paddingLeft: 10 }}>
                                <Text>Chỉ số dựa trên {this.state.mang.length > 0 ? this.state.mang.length : 0} đánh giá của người dùng</Text>
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
                        <View style = {{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 }}>
                                <TouchableOpacity
                                    onPress={()=>{ this.post() }}
                                >
                                    <Text style ={{ padding: 10, paddingLeft: 10, backgroundColor: '#4267b2', borderRadius: 5, color: 'white' }}>   Đăng   </Text>
                                </TouchableOpacity>
                        </View>
                        </View>
                    )}
                    data={this.state.mang}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                    
                    <View key={item.id} style={{ paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#e9ebee' }}>
                        <View style={{ flexDirection: 'row', padding: 10 }}>
                            <Image source={iconaccount} style={{ width: 25, height: 25 }} />
                            <View style={{ borderWidth: 1, padding: 5, flex: 1, marginLeft: 5, borderRadius: 5, borderColor: '#e9ebee' }}>
                                <Text style = {{ fontWeight: 'bold' }}>{item.ten}</Text>
                                <Text>{item.binhluan}</Text>
                            </View>
                        </View>
                    </View>
                    }
                    ListFooterComponent={(
                        <View style= {{ padding: 10 }}>
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
            </View>
        )
    }
}
const styles = StyleSheet.create({
    default:{
        height: 40
    }
})