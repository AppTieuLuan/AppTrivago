import React ,{ Component } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Alert
} from 'react-native';

const { width, height } = Dimensions.get('window');

import passwordImg from '../images/password.png';
import eyeImg  from '../images/eye_black.png';

import Wallpaper from '../view/Wallpaper';
import ButtonSubmit from '../view/ButtonSubmitNoGrow';
import Logo from '../view/Logo';

import check_Pass from '../../../../api/check_Pass';
import ChangedPass from '../../../../api/ChangePass';

import global from '../../../global';

export default class ChangePass extends Component {
  constructor(props){
    super(props);
    this.state = {
      password: '',
      newpassword: '',
      renewpass: '',

      showpass: true,
      shownewpass: true,
      showrenewpass: true,

      press: false,
      newpress: false,
      renewpress: false
    }
  }
  showPass(){
    this.state.press === false ?
    this.setState({ showpass: false, press: true }) :
    this.setState({ showpass: true, press: false });
  }
  newshowPass(){
    this.state.newpress === false ?
    this.setState({ shownewpass: false, newpress: true }) :
    this.setState({ shownewpass: true, newpress: false });
  }
  renewshowPass(){
    this.state.renewpress === false ?
    this.setState({ showrenewpass: false, renewpress: true }) :
    this.setState({ showrenewpass: true, renewpress: false });
  }
  validate(){
    const { password, newpassword, renewpassword } = this.state;

    if(password === '' || newpassword === '' || renewpassword === ''){
      Alert.alert(
        'Thông báo',
        'Vui lòng nhập đầy đủ thông tin',
        [
          {text: 'OK'}
        ],
        {cancelable: false}
      );
      return false;
    }

    if(renewpassword !== newpassword){
      Alert.alert(
        'Thông báo',
        'Vui lòng kiểm tra lại phần xác nhận lại mật khẩu mới!',
        [
          {text: 'OK', onPress:() => this.setState({renewpassword: ''})}
        ],
        {cancelable: false}
      );
      return false;
    }
    return true;

  }
  goBack(){
    setTimeout(() => {
      this.props.navigation.goBack();
    }, 3000)
  }
  OnChangePass(){
    const {password, newpassword} = this.state;
    //kiểm tra tính hợp lệ
    if(!this.validate()){
      return false;
    }
    //
    check_Pass(global.onSignIn.id, password)
    .then(res => {
      if(res === 'THANH_CONG'){
        ChangedPass(global.onSignIn.id, newpassword)
        .then(resp => {
          if(resp === 'THANH_CONG'){
            Alert.alert(
              'Thông báo',
              'Thay đổi thành công!!!',
              [
                {text: 'OK', onPress: () => this.props.navigation.goBack()}
              ],
              {cancelable: false}
            );
          }else{
              Alert.alert(
                'Thông báo',
                'Thay đổi thất bại!\nVui lòng thử lại sau!',
                [
                  {text: 'OK'}
                ],
                {cancelable: false}
              );
          }
        })
        .catch(err => console.log(err));
      }else{
          Alert.alert(
            'Thông báo',
            'Bạn đã nhập sai mật khẩu cũ!',
            [
              {text: 'OK', onPress: () => this.setState({password: ''})}
            ],
            {cancelable: false}
          );
      }
    })
    .catch(err => console.log(err));
  }
  render(){
    return(
      <Wallpaper>
        <View style={styles.logo}>
          <Logo name={'ĐỔI MẬT KHẨU'}/>
        </View>
        <View style={styles.textinput}>
          <KeyboardAvoidingView behavior='padding'
            style={styles.container}>
            <View style={styles.inputWrapper}>
              <Image source={passwordImg}
                style={styles.inlineImg} />
              <TextInput style={styles.input}
                placeholder='Nhập mật khẩu cũ'
                secureTextEntry={this.state.showpass}
                autoCapitalize='none'
                returnKeyType='done'
                autoCorrect={false}
                value={this.state.password}
                onChangeText={password =>this.setState({password})}
                placeholderTextColor='white'
                underlineColorAndroid='transparent' />
            </View>
            <View style={styles.inputWrapper}>
              <Image source={passwordImg}
                style={styles.inlineImg} />
              <TextInput style={styles.input}
                placeholder='Nhập mật khẩu mới'
                secureTextEntry={this.state.shownewpass}
                autoCorrect={false}
                autoCapitalize='none'
                returnKeyType='done'
                value={this.state.newpassword}
                onChangeText={newpassword => this.setState({newpassword})}
                placeholderTextColor='white'
                underlineColorAndroid='transparent' />
            </View>
            <View style={styles.inputWrapper}>
              <Image source={passwordImg}
                style={styles.inlineImg} />
              <TextInput style={styles.input}
                placeholder='Xác nhận mật khẩu'
                secureTextEntry={this.state.showrenewpass}
                autoCorrect={false}
                autoCapitalize='none'
                returnKeyType='done'
                value={this.state.renewpassword}
                onChangeText={renewpassword => this.setState({renewpassword})}
                placeholderTextColor='white'
                underlineColorAndroid='transparent' />
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnEye}
              onPress={this.showPass.bind(this)}
            >
              <Image source={eyeImg} style={styles.iconEye} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnEye1}
              onPress={this.newshowPass.bind(this)}
            >
              <Image source={eyeImg} style={styles.iconEye} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnEye2}
              onPress={this.renewshowPass.bind(this)}
            >
              <Image source={eyeImg} style={styles.iconEye} />
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <ButtonSubmit click={this.OnChangePass.bind(this)}
                        text={'Thay đổi ngay'}/>
        </View>
      </Wallpaper>
    )
  }
}
const styles = StyleSheet.create({
  logo: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textinput: {
    flex: 3,
    alignItems: 'center'
  },
  input: {
		backgroundColor: 'rgba(255, 255, 255, 0.4)',
		width: width - 40,
		height: 40,
		marginHorizontal: 20,
		paddingLeft: 45,
		borderRadius: 20,
		color: '#ffffff',
	},
	inputWrapper: {
		height: height/12,
	},
	inlineImg: {
		position: 'absolute',
		zIndex: 99,
		width: 22,
		height: 22,
		left: 35,
		top: 9
  },
  container: {
		alignItems: 'center',
	},
	btnEye: {
    position: 'absolute',
    top: 7,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
  btnEye1: {
    position: 'absolute',
    top: 53,
    right: 28,
  },
  btnEye2: {
    position: 'absolute',
    top: 107,
    right: 28,
  }
});