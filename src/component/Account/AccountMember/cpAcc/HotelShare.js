import React, { Component } from 'react';
import {
  Text,
  View,
  Picker,
  Dimensions,
  ScrollView,
  TextInput,
  DatePickerAndroid,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
  ToastAndroid,
  Keyboard
} from 'react-native';

import PopupDialog, {
  SlideAnimation,
  DialogTitle,
  DialogButton
} from 'react-native-popup-dialog';

const { width, height } = Dimensions.get('window');

import sharehotel from '../images/sharehotel.png';
import iconprice from '../images/iconprice.png';
import icontype from '../images/icontype.png';
import iconpicture from '../images/iconpicture.png';
import iconlocation from '../images/iconlocation.png';
import iconphone from '../images/iconphone.png';
import iconwebsite from '../images/iconwebsite.png';

import wifinotactive from './img/icwifi.png';
import wifiactive from './img/icwifi_active.png/';
import poolnotactive from './img/icpool.png';
import poolactive from './img/icpool_active.png/';
import spanotactive from './img/icspa.png';
import spaactive from './img/icspa_active.png/';
import Pnotactive from './img/icparking.png';
import Pactive from './img/icparking_active.png/';
import petnotactive from './img/icpet.png';
import petactive from './img/icpet_active.png/';
import aircondinotactive from './img/icondhnd.png';
import aircondiactive from './img/icondhnd_active.png/';
import restaurantnotactive from './img/icrestaurant.png';
import restaurantactive from './img/icrestaurant_active.png/';
import barnotactive from './img/icbar.png';
import baractive from './img/icbar_active.png/';
import gymnotactive from './img/icgym.png';
import gymactive from './img/icgym_active.png/';
import icthem from '../../../img/icthem.png';
import icdelete from '../../../img/icdelete.png';
import NumbericInput from '../view/NumbericInput';
import MapView from 'react-native-maps';
import global from '../../../global';

import ButtonSubmit from './Button';

import { NavigationActions } from 'react-navigation';

import registerhotel from '../../../../api/registerhotel';
import updatehotel from '../../../../api/updatehotel';

var ImagePicker = require('react-native-image-picker');

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Avatar',
  customButtons: [
    { name: 'fb', title: 'Choose Photo from Facebook' },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
export default class HotelShare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrPicker: [
        { id: 'Khách sạn', tenloai: 'Khách sạn' },
        { id: 'Resort', tenloai: 'Resort' },
      ],
      namehotel: '',
      price: '',
      dataimg: null,
      hoteltype: 'Khách sạn',
      phone: '',
      date: '',
      avatarSource: null,
      address: 'Lấy địa chỉ khách sạn',
      lat: '',
      lng: '',
      tiennghi: '',
      website: '',

      wifisanh: false,
      wifiphong: false,
      beboi: false,
      spa: false,
      doxe: false,
      vatnuoi: false,
      dieuhoa: false,
      nhahang: false,
      bar: false,
      gym: false,

      textbtn: 'Chia sẻ ngay',
      flag: false,
      textInput: [],
    }
  }
  //kiểm tra hợp lệ
  validation() {
    const { namehotel, price, dataimg, hoteltype, phone, date, address } = this.state;
    const { lat, lng, tiennghi, website } = this.state;
    if (namehotel === '' || price === '' ||
      dataimg === null || hoteltype === '' ||
      phone === '' || date === '' ||
      address === '' || lat === '' ||
      lng === '' || tiennghi === '') {
      Alert.alert(
        'Thông báo',
        'Vui lòng điền đầy đủ thông tin!',
        [
          { text: 'OK' }
        ]
      );
      return false;
    }
    return true;
  }
  //render picker
  renderItem() {
    items = [];
    for (let item of this.state.arrPicker) {
      items.push(<Picker.Item label={item.tenloai} value={item.id} key={item.id} />)
    }
    return items;
  }
  //Mở trình chọn ảnh hoặc chụp ảnh
  ShowImgPicker() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
          dataimg: response.data
        });
      }
    });
  }
  //cập nhật lại địa chỉ và tọa độ
  setAddress() {
    this.setState({
      address: global.address,
      lat: global.lat,
      lng: global.lng
    })
  }
  //lấy thời gian của hệ thống khi người dùng tiến hành đăng ký
  AddZero(num) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
  }
  getdatetime() {
    var now = new Date();
    var strDateTime = [[now.getFullYear(),
    this.AddZero(now.getMonth() + 1),
    this.AddZero(now.getDate())].join("/"),
    [now.getHours(), now.getMinutes(), now.getSeconds()].join(":")]
      .join(" ");
    this.setState({ date: strDateTime });
  }
  //kiểm tra hợp lệ khi nhập số điện thoại
  onChanged(text) {
    let newText = '';
    let numbers = '0123456789';

    if (text.length === 0) {
      this.setState({ phone: '' });
    }
    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      }
      else {
        // your call back function
        Alert.alert("Thông báo", "Vui lòng nhập đúng định dạng!");
      }
      this.setState({ phone: newText });
    }
  }
  //vẽ ảnh với điều kiện đúng sai
  drawimg(source) {
    items = [];
    items.push(<Image source={source} style={styles.imageItem} key={source} />);
    return items;
  }
  renderimg(flag, active, notactive) {
    return flag ? this.drawimg(active) : this.drawimg(notactive);
  }
  //cập nhật biến tiện nghi
  settext(flag) {
    let tmp = '';
    if (flag) {
      tmp += '1';
    } else {
      tmp += '0';
    }
    return tmp;
  }
  setTienNghi() {
    let temp = '';
    temp += this.settext(this.state.wifisanh);
    temp += this.settext(this.state.wifiphong);
    temp += this.settext(this.state.beboi);
    temp += this.settext(this.state.spa);
    temp += this.settext(this.state.doxe);
    temp += this.settext(this.state.vatnuoi);
    temp += this.settext(this.state.dieuhoa);
    temp += this.settext(this.state.nhahang);
    temp += this.settext(this.state.bar);
    temp += this.settext(this.state.gym);

    this.setState({ tiennghi: temp });
  }
  replaceUpload(id) {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'AccountMemberScreen' }),
        NavigationActions.navigate({
          routeName: 'UploadImgScreen',
          params: { id }
        })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }
  onSuccess(id) {
    Alert.alert(
      'Thông báo',
      'Cảm ơn bạn đã cung cấp dữ liệu cho chúng tôi!\n' +
      'Sau khi chúng tôi kiểm duyệt thông tin thì dữ liệu ' +
      'về khách sạn này sẽ được hiển thị trên trang tìm kiếm!',
      [
        { text: 'OK', onPress: () => this.replaceUpload(id) }
      ],
      { cancelable: false }
    );
  }
  onFail() {
    Alert.alert(
      'Thông báo',
      'Chia sẻ khách sạn chưa thành công!',
      [
        { text: 'OK' }
      ],
      { cancelable: false }
    );
  }

  onChangeText(txt, index) {
    let textInput = this.state.textInput;
    textInput[index].value = txt;
    this.setState({ textInput });
  }

  addTextInput = (index) => {
    if (index === 0)
      this.setState({
        textInput: this.state.textInput.concat({ id: 0, value: '' })
      });
    else {
      if (this.state.textInput[index - 1].value === '') {
        ToastAndroid.show('Vui lòng nhập đầy đủ trước khi thêm mới !', ToastAndroid.SHORT);
      } else {

        let { textInput } = this.state;
        let maxId = Math.max.apply(null, textInput.map(item => item.id)) + 1;

        this.setState({
          textInput: this.state.textInput.concat({ id: maxId, value: '' })
        });
      }
    }

  }

  deleteTextInput(index) {

    let textInput = this.state.textInput;
    textInput.splice(index, 1);
    this.setState({ textInput });
  }
  //
  Submit(cb) {
    const { namehotel, price, dataimg, hoteltype, phone, address } = this.state;
    const { lat, lng, website } = this.state;
    this.setTienNghi();
    this.getdatetime();
    //flag = false thì thực hiện việc thêm mới khách sạn

    let tiennghikhachsan = '';
    for (let i = 0; i < this.state.textInput.length; i++) {
      tiennghikhachsan = tiennghikhachsan + this.state.textInput[i].value + '-';
    }
    tiennghikhachsan = tiennghikhachsan.slice(0, -1);
    //alert(tiengnghikhachsan.slice(0, -1));
    if (!this.state.flag) {
      //kiểm tra tính hợp lệ của dữ liệu
      let flag = this.validation();
      if (!flag) {
        let load = true;//gửi thông điệp để tắt animation
        cb(load);
        return false;
      }
      registerhotel(namehotel, price, dataimg, hoteltype, phone, this.state.date,
        address, lat, lng, this.state.tiennghi, website, global.onSignIn.id, tiennghikhachsan)
        .then(res => {
          let load = true;//gửi thông điệp để tắt animation
          cb(load);
          if (res.rp.trim() === 'THANH_CONG') return this.onSuccess(res.id);
          this.onFail();
        })
        .catch(err => console.log(err));
    } else { // th ực hiện cập nhật thông tin khách sạn đã thêm từ người dùng
      updatehotel(global.hotel.id, namehotel, price, dataimg, hoteltype, this.state.phone, this.state.date,
        address, lat, lng, this.state.tiennghi, website, tiennghikhachsan)
        .then(res => {
          let load = true;//gửi thông điệp để tắt animation
          cb(load);
          if (res.trim() === 'THANH_CONG') {
            Alert.alert(
              'Thông báo',
              'Cập nhật thành công!',
              [
                {
                  text: 'OK', onPress: () => {
                    this.props.navigation.state.params.refresh();
                    this.props.navigation.goBack();
                  }
                }
              ],
              { cancelable: false }
            )
            //ToastAndroid.show('Thành công', ToastAndroid.SHORT);
          }
          else {
            Alert.alert(
              'Thông báo',
              'Cập nhật thất bại!\nVui lòng thử lại!',
              [
                { text: 'OK' }
              ],
              { cancelable: false }
            )
            //ToastAndroid.show('Lỗi ! Thử lại sau..', ToastAndroid.SHORT);
          }
        })
        .catch(err => console.log(err));
    }
  }

  componentDidMount() {
    if (this.props.navigation.state.params.flag) {
      this.setState({
        namehotel: global.hotel.ten,
        price: global.hotel.gia,
        avatarSource: { uri: global.hotel.hinhanh },
        address: global.hotel.diachi,
        hoteltype: global.hotel.loai,
        phone: global.hotel.sdt,
        website: global.hotel.website,
        textbtn: 'Cập nhật ngay',
        dataimg: true,
        lat: global.hotel.lat,
        lng: global.hotel.long,
        flag: true,

      });
      if (global.hotel.thietbikhachsan !== null) {

        let temp = global.hotel.thietbikhachsan.split('-');
        //alert(temp.length);
        let temp2 = [];
        for (let i = 0; i < temp.length; i++) {

          temp2 = temp2.concat({ id: i, value: temp[i] });

        }
        this.setState({
          textInput: temp2
        });

      }
      var temp = global.hotel.tiennghihangdau.split('');
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

    }
  }

  render() {
    let img = this.state.avatarSource === null ? null :
      (<Image source={this.state.avatarSource}
        style={{ height: 250, width: 250, marginBottom: 10, borderRadius: 10 }} />);
    return (
      <View>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView contentContainerStyle={styles.scrollview}>
            <KeyboardAvoidingView behavior='padding'
              style={styles.container}>
              <View style={styles.inputWrapper}>
                <Image source={sharehotel} style={styles.inlineImg} />
                <TextInput style={styles.input}
                  placeholder='Nhập tên khách sạn'
                  autoCapitalize='none'
                  returnKeyType='done'
                  autoCorrect={false}
                  value={this.state.namehotel}
                  onChangeText={namehotel => this.setState({ namehotel })}
                  placeholderTextColor='black'
                  underlineColorAndroid='transparent' />
              </View>

              <View style={styles.inputWrapper}>
                <Image source={iconprice}
                  style={styles.inlineImg} />
                <NumbericInput style={styles.input}
                  placeholder='Nhập giá phòng'
                  autoCapitalize='none'
                  returnKeyType='done'
                  autoCorrect={false}
                  value={this.state.price.toString()}
                  onChangeText={price => this.setState({ price })}
                  placeholderTextColor='black'
                  underlineColorAndroid='transparent' />
              </View>

              <View style={styles.inputWrapper}>
                <Image source={iconpicture}
                  style={styles.inlineImg} />
                <TouchableOpacity style={styles.input}
                  onPress={this.ShowImgPicker.bind(this)}>
                  {this.state.dataimg ?
                    <Text style={styles.text}>
                      Thay đổi ảnh đại diện
                  </Text> :
                    <Text style={styles.text}>
                      Chọn một ảnh đại diện cho khách sạn
                  </Text>
                  }
                </TouchableOpacity>
              </View>
              {img}

              <View style={styles.inputWrapper}>
                <Image source={iconlocation}
                  style={styles.inlineImg} />
                <TouchableOpacity style={styles.input}
                  onPress={() => { this.props.navigation.navigate('LocationScreen', { setAddress: this.setAddress.bind(this) }) }}>
                  <Text style={styles.text}>
                    {this.state.address}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputWrapper}>
                <Image source={icontype}
                  style={styles.inlineImg} />
                <View style={styles.input}>
                  <Picker
                    selectedValue={this.state.hoteltype}
                    onValueChange={(value) => this.setState({ hoteltype: value })}
                  >
                    {this.renderItem()}
                  </Picker>
                </View>
              </View>

              <View style={styles.inputWrapper}>
                <Image source={iconphone}
                  style={styles.inlineImg} />
                <TextInput style={styles.input}
                  placeholder='Nhập số điện thoại'
                  autoCapitalize='none'
                  returnKeyType='done'
                  autoCorrect={false}
                  value={this.state.phone}
                  onChangeText={phone => this.onChanged(phone)}
                  placeholderTextColor='black'
                  underlineColorAndroid='transparent' />
              </View>

              <View style={styles.inputWrapper}>
                <Image source={iconwebsite}
                  style={styles.inlineImg} />
                <TextInput style={styles.input}
                  placeholder='Nhập địa chỉ website nếu có'
                  autoCapitalize='none'
                  returnKeyType='done'
                  autoCorrect={false}
                  value={this.state.website}
                  onChangeText={website => this.setState({ website })}
                  placeholderTextColor='black'
                  underlineColorAndroid='transparent' />
              </View>

              <View style={{ padding: 7, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 20 }}>
                <Text style={styles.textHead}>Tiện nghi hàng đầu</Text>
                <View style={styles.row}>
                  <View style={[styles.item, {}]}>
                    <TouchableOpacity onPress={() =>
                      this.state.wifisanh ? this.setState({ wifisanh: false }) : this.setState({ wifisanh: true })
                    }>
                      {this.renderimg(this.state.wifisanh, wifiactive, wifinotactive)}
                    </TouchableOpacity>
                    <View style={{ flex: 4 }}>
                      <Text numberOfLines={1}>Wifi tại sảnh</Text>
                    </View>
                  </View>

                  <View style={[styles.item, {}]}>
                    <TouchableOpacity onPress={() =>
                      this.state.wifiphong ? this.setState({ wifiphong: false }) : this.setState({ wifiphong: true })
                    }>
                      {this.renderimg(this.state.wifiphong, wifiactive, wifinotactive)}
                    </TouchableOpacity>
                    <View style={{ flex: 4 }}>
                      <Text numberOfLines={1}>Wifi trong phòng</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={[styles.item, {}]}>
                    <TouchableOpacity onPress={() =>
                      this.state.beboi ? this.setState({ beboi: false }) : this.setState({ beboi: true })
                    }>
                      {this.renderimg(this.state.beboi, poolactive, poolnotactive)}
                    </TouchableOpacity>
                    <View style={{ flex: 4 }}>
                      <Text numberOfLines={1}>Bể bơi</Text>
                    </View>
                  </View>

                  <View style={[styles.item, {}]}>
                    <TouchableOpacity onPress={() =>
                      this.state.spa ? this.setState({ spa: false }) : this.setState({ spa: true })
                    }>
                      {this.renderimg(this.state.spa, spaactive, spanotactive)}
                    </TouchableOpacity>
                    <View style={{ flex: 4 }}>
                      <Text numberOfLines={1}>Spa</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={[styles.item, {}]}>
                    <TouchableOpacity onPress={() =>
                      this.state.doxe ? this.setState({ doxe: false }) : this.setState({ doxe: true })
                    }>
                      {this.renderimg(this.state.doxe, Pactive, Pnotactive)}
                    </TouchableOpacity>
                    <View style={{ flex: 4 }}>
                      <Text numberOfLines={1}>Bãi đồ xe</Text>
                    </View>
                  </View>

                  <View style={[styles.item, {}]}>
                    <TouchableOpacity onPress={() =>
                      this.state.vatnuoi ? this.setState({ vatnuoi: false }) : this.setState({ vatnuoi: true })
                    }>
                      {this.renderimg(this.state.vatnuoi, petactive, petnotactive)}
                    </TouchableOpacity>
                    <View style={{ flex: 4 }}>
                      <Text numberOfLines={1}>Cho phép thú nuôi</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={[styles.item, {}]}>
                    <TouchableOpacity onPress={() =>
                      this.state.dieuhoa ? this.setState({ dieuhoa: false }) : this.setState({ dieuhoa: true })
                    }>
                      {this.renderimg(this.state.dieuhoa, aircondiactive, aircondinotactive)}
                    </TouchableOpacity>
                    <View style={{ flex: 4 }}>
                      <Text numberOfLines={1}>Điều hòa nhiệt độ</Text>
                    </View>
                  </View>

                  <View style={[styles.item, {}]}>
                    <TouchableOpacity onPress={() =>
                      this.state.nhahang ? this.setState({ nhahang: false }) : this.setState({ nhahang: true })
                    }>
                      {this.renderimg(this.state.nhahang, restaurantactive, restaurantnotactive)}
                    </TouchableOpacity>
                    <View style={{ flex: 4 }}>
                      <Text numberOfLines={1}>Nhà hàng</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={[styles.item, {}]}>
                    <TouchableOpacity onPress={() =>
                      this.state.bar ? this.setState({ bar: false }) : this.setState({ bar: true })
                    }>
                      {this.renderimg(this.state.bar, baractive, barnotactive)}
                    </TouchableOpacity>
                    <View style={{ flex: 4 }}>
                      <Text numberOfLines={1}>Quầy bar</Text>
                    </View>
                  </View>

                  <View style={[styles.item, {}]}>
                    <TouchableOpacity onPress={() =>
                      this.state.gym ? this.setState({ gym: false }) : this.setState({ gym: true })
                    }>
                      {this.renderimg(this.state.gym, gymactive, gymnotactive)}
                    </TouchableOpacity>
                    <View style={{ flex: 4 }}>
                      <Text numberOfLines={1}>Phòng Gym</Text>
                    </View>
                  </View>
                </View>

              </View>
              <View style={{ height: 10 }}></View>

              <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 7, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'black' }}>Tiện nghi khách sạn</Text>
                <View style={styles.row} />
                {
                  this.state.textInput.map((e, index) => (
                    <View style={styles.row2} key={index}>
                      <View style={styles.khungtimkiem}>
                        <TextInput
                          style={{ flex: 1 }}
                          placeholder="Thêm tiện nghi khách sạn"
                          underlineColorAndroid="transparent"
                          value={e.value}
                          onChangeText={(txt) => this.onChangeText(txt, index)}
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          this.deleteTextInput(index);
                        }}
                      >
                        <View style={{ paddingHorizontal: 7 }}>

                          <Image source={icdelete} style={{ height: 25, width: 25 }} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))
                }
                <TouchableOpacity
                  onPress={() => {
                    this.addTextInput(this.state.textInput.length);
                  }}
                >
                  <View style={{ paddingHorizontal: 7 }}>
                    <Image source={icthem} style={{ height: 30, width: 30 }} />
                  </View>
                </TouchableOpacity>

              </View>

              <ButtonSubmit click={this.Submit.bind(this)}
                text={this.state.textbtn} />

            </KeyboardAvoidingView>

          </ScrollView>
        </TouchableWithoutFeedback>

      </View >
    )
  }
}
const styles = StyleSheet.create({
  inputWrapper: {
    //backgroundColor: 'red',
    height: 60,
    //justifyContent: 'center',
    //width: width - 40,
    //marginVertical: 15
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 10
  },
  container: {
    alignItems: 'center',
    top: 10
  },
  input: {
    backgroundColor: '#fff',
    width: width - 40,
    height: 50,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
  },
  scrollview: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    top: 10,
    color: 'black'
  },
  textHead: {
    color: 'black',
  },
  row: {
    paddingVertical: 10,
    flexDirection: 'row',
    width: width - 40,
    alignItems: 'center'

  },
  row2: {

    flexDirection: 'row',
    width: width - 40,
    alignItems: 'center'

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
  },
  khungtimkiem: {
    alignItems: 'center',
    margin: 5,
    marginHorizontal: 10,

    flex: 1,
    flexDirection: 'row',

    paddingHorizontal: 5,

    borderWidth: 1,
    borderRadius: 7,
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
  }
});
