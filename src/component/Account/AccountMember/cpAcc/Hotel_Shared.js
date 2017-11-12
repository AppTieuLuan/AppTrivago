import React, {Component} from 'react';
import {   
    View, 
    Text, 
    StyleSheet, 
    TouchableWithoutFeedback, 
    TouchableOpacity, 
    FlatList, 
    Dimensions,
    Image, 
    ScrollView, 
    TextInput, 
    ToastAndroid, 
    ActivityIndicator,
    Alert
} from 'react-native';

const { width, height } = Dimensions.get('window'); 

import iconimg from '../images/iconpicture.png';
import iconedit from '../images/edit.png';

import global from '../../../global';
import LoadMyHotelShare from '../../../../api/LoadMyHotelShare';

export default class HotelShared extends Component{
    constructor(props){
        super(props);
        this.state = {
            mang: [],
            value: '',
            height: 40,
            refresh: false,
            loading: false,
            ishare: true
        };
    }
    refresh() {
        this.setState({ page: 1, mang: []}, function() {
            this.loadDataRefresh();
        });
        
    }
    loadDataRefresh(){
        this.setState({loading: true});
        this.loadData();
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(){
        LoadMyHotelShare(global.onSignIn.id)
        .then(res => {
            if(res.list === 'KHONG_CO'){
                this.setState({ishare: false});
            }else{
                this.setState({mang: res.list, ishare: true, loading: false});
            }
        })
        .catch(err => console.log(err));
    }
    render(){
        const { navigate } = this.props.navigation; 
        return(
            this.state.ishare ?
            (<View style={styles.container}>
                <FlatList
                ListFooterComponent={(
                        <View style= {{ padding: 10 }}>
                            {
                                !this.state.loading ?
                                    (null) :
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
                    keyExtractor={item => item.id}
                    renderItem={({ item } ) =>
                        <View style={styles.rowFlatlist}>
                            <TouchableWithoutFeedback
                                onPress={() => { 
                                        global.idKS = item.id;
                                        navigate('DetailScreen', { name: item.ten, id: item.id })
                                        }}
                            >
                             <View style={{ height: width / 3, flexDirection: 'row', backgroundColor: 'white', borderRadius: 5 }}>
                                        <Image source={{ uri: item.hinhanh }} style={{ height: width / 3, width: width / 3, flex: 1 }}/>
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
                                                                onPress={() => {
                                                                    global.hotel = item;
                                                                    this.props.navigation.navigate('ShareScreen', {flag: true, refresh: this.refresh.bind(this)})
                                                                }}
                                                                style={{flexDirection: 'row', flex: 1 }}
                                                            >
                                                                <View style={{ flex: 2, paddingVertical: 2, alignItems: 'center' }}>
                                                                    <Image resizeMode={'contain'} source={iconedit} style={{ flex: 1}} />
                                                                </View> 
                                                                
                                                                <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                                                                    <Text style={{ fontSize: 12, color: 'black' }}>Chỉnh sửa</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
                                                       
                                                        <View style={{ flex: 1, borderTopWidth: 1, borderTopColor: '#e9ebee', paddingHorizontal: 2, paddingVertical: 2}}>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                global.idks = item.id;
                                                                this.props.navigation.navigate('UploadImgScreen');
                                                                }}
                                                            style={{flexDirection: 'row', flex: 1 }}
                                                        >
                                                                <View style={{ flex: 2, paddingVertical: 2, alignItems: 'center' }}>
                                                                    <Image resizeMode={'contain'} source={iconimg} style={{ flex: 1 }} />
                                                                </View> 
                                                                
                                                                <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                                                                    <Text style={{ fontSize: 12, color: 'black' }}>Thêm ảnh</Text>
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
                                                            onPress={() => { 
                                                                    global.idKS = item.id;
                                                                    navigate('DetailScreen', { name: item.ten, id: item.id })
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
            </View>):
            (<View>
                {
                    Alert.alert(
                    'Thông báo',
                    'Bạn chưa chia sẻ khách sạn nào nên bạn không thể sử dụng chức năng này!\n',
                    [
                        {text: 'OK', onPress: () => this.props.navigation.goBack()}
                    ]
                    )
                }
            </View>)
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
    }
})