import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  FlatList
} from 'react-native';
const { width, height } = Dimensions.get('window');

import ButtonImg from './Button';
import iconpicture from '../images/iconpicture.png';
import Upload from '../../../../api/updateImg';
import global from '../../../global';
import getImg from './../../../../api/getImg';
import icdelete from '../../../img/icdelete.png';

var Spinner = require('react-native-spinkit');

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

export default class UploadAnyImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Thêm ảnh',
      arrimg: [],
      arrimguribase64: [],
      arrimgbase64: [],
      lenght: 0,
      len: 0,
      arriddelete: [],
      refresh: false,
      mang: ['1', '2', '3', '4', '5', '6', '7']
    };
  }
  componentDidMount() {
    // Alert.alert(
    //   'Thông báo',
    //   '1. Bạn hãy chọn các ảnh liên quan của khách sạn!\n' +
    //   '2.Nhấn tải và cập nhật để tiến hành tải các ảnh mới lên và cập nhật lại các ảnh đã có trước đó\n' +
    //   '3. Để thoát nhấn quay lại!',
    //   [
    //     { text: 'OK' }
    //   ],
    //   { cancelable: false }
    // );
    //console.log(global.idks);
    this.setState({ refresh: true });
    let ff = this.props.navigation.state.params.id;
    if (ff) {
      this.setState({ refresh: false });
      this.setState({ arrimg: [] });
      let arr = this.state.arrimg;
      let len = arr.length;
      this.setState({ len });
    } else {
      getImg(global.idks)
        .then(res => {
          this.setState({ refresh: false });
          this.setState({ arrimg: res });
          let arr = this.state.arrimg;
          let len = arr.length;
          this.setState({ len });
          console.log(res);
        })
        .catch(err => console.log(err));
    }
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
        let arruri = this.state.arrimguribase64;
        arruri.push(source);
        let arr = this.state.arrimgbase64;
        arr.push(response.data);
        let len = arr.length;
        this.setState({
          arrimguribase64: arruri,
          arrimgbase64: arr,
          lenght: len
        });
      }
    });
  }
  EditImgPicker(index) {
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

        //tiến hành cập nhật lại mảng tại vị trí đang sửa
        let arruri = this.state.arrimguribase64;
        arruri[index] = source;
        let arr = this.state.arrimgbase64;
        arr[index] = response.data;
        let len = arr.length;
        this.setState({
          arrimguribase64: arruri,
          arrimgbase64: arr,
          lenght: len
        });
      }
    });
  }
  //
  removeArr(index) {
    let arr = this.state.arrimg;
    //kiểm tra id ảnh nào bị xóa và add nó vào arridelete
    let arridtemp = this.state.arriddelete;
    arridtemp.push(arr[index].id);

    arr.splice(index, 1);// xóa 1 phần tử tại vị trí thứ index
    let len = arr.length;// cập nhật lại độ dài mảng

    this.setState({
      arrimg: arr,
      len: len,
      arriddelete: arridtemp
    })
  }
  //
  removeNewArr(index) {
    let arr = this.state.arrimgbase64;
    let arruri = this.state.arrimguribase64;
    arr.splice(index, 1);// xóa 1 phần tử tại vị trí thứ index
    arruri.splice(index, 1);
    let len = arr.length;
    this.setState({
      arrimgbase64: arr,
      arrimguribase64: arruri,
      lenght: len
    })
  }
  // Tải ảnh lên
  UploadSubmit(cb) {
    let IDobject = this.props.navigation.state.params.id;
    let idks = IDobject ? IDobject.id : global.idks;
    Upload(this.state.arriddelete, this.state.arrimgbase64, idks)
      .then(res => {
        let load = true;// gửi thông điệp đi để tắt animation
        cb(load);
        if (res.trim() === 'THANH_CONG') {
          Alert.alert(
            'Thông báo',
            'Đã cập nhật thành công!',
            [
              { text: 'OK', onPress: () => this.props.navigation.goBack() }
            ],
            { cancelable: false }
          );
        }
        else {
          Alert.alert(
            'Thông báo',
            'Đã xảy ra lỗi!\nVui lòng thử lại!',
            [
              { text: 'OK' }
            ],
            { cancelable: false }
          );
        }
      })
      .catch(e => alert(e));
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <View>
              {
                this.state.len === 0 ? null : (
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ top: 10, fontSize: 20, color: 'black' }}>Ảnh đã thêm trước đó</Text>
                    <View style={{ top: 20, marginBottom: 20 }}>
                      {/* <View>
                         <Image source={{ uri: this.state.arrimg[0].link }}
                         style={{ height: 250, width: 250, marginBottom: 10, borderRadius: 10 }} />
                      </View> */}
                      {
                        this.state.arrimg.map((e, index) => (
                          <View key={index} style={{ flexDirection: 'row' }}>
                            <View>
                              <Image source={{ uri: e.link }}
                                style={{ height: 250, width: 250, marginBottom: 10, borderRadius: 10 }} />
                            </View>
                            <View style={{ top: 0, bottom: 0, left: 0, right: 0, alignItems: 'flex-end', position: 'absolute' }}>
                              <TouchableOpacity
                                onPress={() => this.removeArr(index)}
                              >
                                <Image source={icdelete} style={{ height: 30, width: 30 }} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        ))
                      }
                    </View>
                  </View>)
              }
            </View>

            <View>
              {
                this.state.lenght === 0 ? null : (
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ top: 10, fontSize: 20, color: 'black' }}>Ảnh mới thêm</Text>
                    <View style={{ top: 20, marginBottom: 20 }}>
                      {
                        this.state.arrimguribase64.map((e, index) => (
                          <View key={index} style={{ flexDirection: 'row' }}>
                            <View>
                              <TouchableOpacity
                                onPress={() => this.EditImgPicker(index)}
                              >
                                <Image source={e}
                                  style={{ height: 250, width: 250, marginBottom: 10, borderRadius: 10 }} />
                              </TouchableOpacity>
                            </View>

                            <View style={{ top: 0, bottom: 0, left: 0, right: 0, alignItems: 'flex-end', position: 'absolute' }}>
                              <TouchableOpacity
                                onPress={() => this.removeNewArr(index)}
                              >
                                <Image source={icdelete} style={{ height: 30, width: 30 }} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        ))
                      }
                    </View>
                  </View>
                )
              }
            </View>
          </View>
          {
            this.state.refresh ? (null) : (
              <View style={styles.container}>
                <TouchableOpacity style={styles.button}
                  onPress={this.ShowImgPicker.bind(this)}
                  activeOpacity={1}
                >
                  {
                    <Text style={styles.text}>{this.state.text}</Text>
                  }
                </TouchableOpacity>
                <ButtonImg click={this.UploadSubmit.bind(this)} text={'Tải & Cập nhật ảnh ngay'} />
              </View>
            )
          }
        </ScrollView>
        {
          this.state.refresh ?
            (<ActivityIndicator size={50} style={styles.loading} />) :
            (
              null
            )
        }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 20,
    zIndex: 100,
    width: width - 40
  },
  text: {
    color: 'black',
    backgroundColor: 'transparent',
  },
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
