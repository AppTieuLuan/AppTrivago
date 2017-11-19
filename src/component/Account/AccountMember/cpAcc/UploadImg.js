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
  ActivityIndicator
} from 'react-native';
const { width, height } = Dimensions.get('window');

import ButtonImg from './Button';
import iconpicture from '../images/iconpicture.png';
import uploadImg from '../../../../api/UploadImg';
import global from '../../../global';

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

export default class UploadImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      dataimg: null,
      text: 'Chọn ảnh',
      isLoad: false,
    };
  }
  componentDidMount() {
    Alert.alert(
      'Thông báo',
      '1. Bạn hãy chọn ảnh liên quan của khách sạn để tải lên!\n' +
      '2. Bấm chọn ảnh và sau đó nhấn tải lên để tiến hành tải lên, mỗi lần chỉ tải lên được một ảnh!\n' +
      '3. Để thoát nhấn quay lại!',
      [
        { text: 'OK' }
      ],
      { cancelable: false }
    )
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
          dataimg: response.data,
          text: 'Chọn ảnh khác'
        });
      }
    });
  }
  // Tải ảnh lên
  Upload() {
    const { dataimg } = this.state;
    if (dataimg === null) {
      Alert.alert(
        'Thông báo',
        'Chưa chọn ảnh!\nVui lòng chọn ảnh!',
        [
          { text: 'OK' }
        ],
        { cancelable: false }
      );
      return false;
    }
    this.setState({ isLoad: true });
    // Bắt đầu tải ảnh lên
    uploadImg(global.idks, dataimg)
      .then(res => {
        this.setState({ isLoad: false });
        if (!res) {
          this.setState({
            text: 'Chọn ảnh mới',
            dataimg: null,
            avatarSource: null
          });
          Alert.alert(
            'Thông báo',
            'Đã tải ảnh lên thành công!\nVui lòng chọn ảnh mới để tải lên!',
            [
              { text: 'OK' }
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
      .catch(err => console.log(err));
  }
  render() {
    let img = this.state.avatarSource ? <Image source={this.state.avatarSource}
      style={{ height: 250, width: 250, marginBottom: 10, borderRadius: 10 }} /> :
      <Image source={iconpicture}
        style={{ height: 250, width: 250, marginBottom: 10, borderRadius: 10 }} />
    return (
      <ScrollView>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ top: 20, marginBottom: 20 }}>
            {img}
          </View>

          <View style={styles.container}>
            <TouchableOpacity style={styles.button}
              onPress={this.ShowImgPicker.bind(this)}
              activeOpacity={1}
            >
              {
                <Text style={styles.text}>{this.state.text}</Text>
              }
            </TouchableOpacity>
          </View>

          <ButtonImg click={this.Upload.bind(this)} text={'Tải ảnh lên ngay'} />
          {
            this.state.isLoad ?
              (<ActivityIndicator size={50} style={styles.loading} />) :
              null
          }
        </View>
      </ScrollView>
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
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  }
});
