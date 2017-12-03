import React, { Component } from 'react';
import {
  View, Text, Image, Dimensions,
  StyleSheet, TextInput, TouchableOpacity, BackHandler, FlatList, TouchableHighlight, KeyboardAvoidingView,
  ToastAndroid, Alert
} from 'react-native';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import user from '../img/user.png';
import nameapp from '../img/name-app.png';
import logen from '../img/logen.png';
import search from '../img/iconsearch.png';
import global from '../global';
import refreshToken from '../../api/refreshToken';
import checkLogin from '../../api/checkLogin';
import getToken from '../../api/getToken';
import saveToken from '../../api/saveToken';
import icdinhvi from '../img/icdinhvi.png';

import { NavigationActions } from 'react-navigation';

const { height } = Dimensions.get('window');

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      name: '',
      mang: [],
      closeapp: true
    };
    global.latsearch = '';
    global.longsearch = '';
    global.bankinhsearch = 7;
    global.mapAlready = false;
    global.loadDataMap = false;

  }
  WelSearch = () => {
    if(global.latsearch == null || global.longsearch == null || global.latsearch == '' || global.longsearch == '') {
      ToastAndroid.show('Nhập địa điểm bạn muốn tìm kiếm',ToastAndroid.SHORT);
    } else {
      global.keysearch = this.state.text;
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'MainScreen' })
        ]
      });
      this.props.navigation.dispatch(resetAction);
    }
    
    //this.props.navigation.navigate('MainScreen');
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
  }


  layViTriHienTai() {
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
      ok: "YES",
      cancel: "NO",
      enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => ONLY GPS PROVIDER
      showDialog: true, // false => Opens the Location access page directly
      openLocationServices: true // false => Directly catch method is called if location services are turned off
    }).then(function (success) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          //alert(position.coords.latitude);
          global.latsearch = position.coords.latitude;
          global.longsearch = position.coords.longitude;
          this.WelSearch();
        },
        (error) => {
          console.log(error)
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
      );
    }.bind(this)
      ).catch((error) => {
        //console.log(error.message);
        alert('Lỗi! Bật GPS để lấy vị trí hiện tại.');
      });

    BackHandler.addEventListener('hardwareBackPress', () => {
      LocationServicesDialogBox.forceCloseDialog();
    });
  }
  componentDidMount() {
    //set server
    //global.server = 'http://192.168.1.5/Demo/';
    global.server = 'https://webservicestrivago.000webhostapp.com/';
    global.loadchitiet = false;
    global.loadhinhanh = false;
    global.loaddanhgia = false;
    global.loadbando = false;
    global.loadingFetch = true;
    global.diadiem = '';
    global.manhinhtimkiem = false;
    setInterval(refreshToken, 30000);
    getToken()
      .then(token => checkLogin(token))
      .then(res => {
        global.onSignIn = res.user;
        this.setState({ name: res.user.hoten });
        console.log(res.user);
      })
      .catch(err => console.log('LOI CHECK LOGIN', err));
  }

  loadDataSearch(text) {
    //alert("load "+this.state.value)
    fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + text + '&types=geocode&language=vi&key=AIzaSyC9hXBNhK5zuePc2RftV09n3Ao9IPE2tRA')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ mang: [] });
        for (let i = 0; i < responseJson.predictions.length; i++) {
          //console.log(responseJson.predictions[i].description + '---' + responseJson.predictions[i].place_id);
          this.setState({
            mang: this.state.mang.concat({ description: responseJson.predictions[i].description, id: responseJson.predictions[i].place_id }),
            isloading: false
          })
        }

      })
      .catch((e) => { console.log(e) });
  }

  loadLatLong(id) {
    fetch('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + id + '&key=AIzaSyC9hXBNhK5zuePc2RftV09n3Ao9IPE2tRA')
    .then((response) => response.json())
    .then((responseJson) => {
        global.latsearch = responseJson.result.geometry.location.lat;
        global.longsearch = responseJson.result.geometry.location.lng;
        //alert(global.latsearch + ' ---- ' + global.longsearch);
        this.WelSearch();
    })
    .catch((e)=>{console.log(e)});
}
  loadSearch(text) {
    this.setState({ text }, function () {
      if (text !== '') {
        this.loadDataSearch(text);
      }
    });

  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior='padding'>
      <View style={{ backgroundColor: '#FFFFFF' }}>
        <View style={{ height: height / 3 }}>
          <View style={{ alignItems: 'flex-end', flexDirection: 'row' }}>
            <View style={{ flex: 3 }}></View>
            <View style={{ flex: 3, alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 16 }}>{this.state.name}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => {
                  global.onSignIn ?
                    global.onSignIn.quyen === '1' ? navigate('AccountScreen', { flag: '1' }) :
                      navigate('AccountMemberScreen', { flag: '1' }) :
                    navigate('SigninScreen', { flag: '1' });
                }
                }
              >
                <Image style={style.img}
                  source={user}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={nameapp}
            />
          </View>
        </View>

        <View style={{ alignItems: 'center', height: height / 3 }}>
          <View>
            <Image
              source={logen}
            />
          </View>
          <View style={style.khungsearch}>
            <View style={style.khungtimkiem}>
              <View style={{}}>
                <TouchableOpacity
                  onPress={() => {
                    this.layViTriHienTai();
                  }}
                >
                  <View>
                    <Image source={icdinhvi} style={{ width: 30, height: 30 }} />
                  </View>
                </TouchableOpacity>
              </View>

              <TextInput
                style={style.search}
                placeholder="Vị trí hiện tại"
                underlineColorAndroid="transparent"
                value={this.state.text}
                onChangeText={(text) => {
                  this.loadSearch(text);
                }}
              />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity
                onPress={this.WelSearch}
              >
                <Image
                  style={style.iconsearch}
                  source={search}
                />
              </TouchableOpacity>
            </View>

          </View>
        </View>
        <View style={{ height: height / 3, paddingHorizontal: 15 }}>
          <FlatList
            data={this.state.mang}
            renderItem={({ item }) =>
              <TouchableHighlight
                onPress={() => {
                  global.diadiem = item.description;
                   this.loadLatLong(item.id);             
                }}
              >
                <View style={style.rowFlatlist} key={item.id}>
                  <View>
                    <Text>{item.description}</Text>
                  </View>

                </View>
              </TouchableHighlight>
            }
            keyExtractor={(item, index) => index}
          />
        </View>
      </View>
      </KeyboardAvoidingView>
    )
  }
}
var style = StyleSheet.create({
  img: {
    width: 30,
    height: 30,
    margin: 5
  },
  row: {
    flex: 1
  },
  khungsearch: {
    flexDirection: 'row',
    paddingHorizontal: 15
  },
  search: {
    //borderWidth: 3,
    //borderColor: '#fafafa'
    flex: 1,

  },
  iconsearch: {
    width: 30,
    height: 30
  },
  khungtimkiem: {
    alignItems: 'center',
    margin: 5,
    marginHorizontal: 10,
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',

    paddingHorizontal: 5,

    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,

  },
  rowFlatlist: {
    padding: 10,
    borderBottomWidth: 0.5
  }
});
