import React, { Component } from 'react';
import { View, TextInput, Text,
  TouchableOpacity, StyleSheet, Alert,
  Dimensions, KeyboardAvoidingView, Image
} from 'react-native';
import register from '../../api/register';

const { height, width } = Dimensions.get('window');

import usernameImg from './AccountMember/images/username.png';
import emailImg from './AccountMember/images/email.png';
import passwordImg from './AccountMember/images/password.png';
import eyeImg  from './AccountMember/images/eye_black.png';

import Wallpaper from './AccountMember/view/Wallpaper';
import ButtonSubmit from './AccountMember/view/ButtonSubmit';
import SignupSection from './AccountMember/view/SignupSection';
import Logo from './AccountMember/view/Logo';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            showPass: true,
            press: false,
            reshowPass: true,
            rePress: false,
        };
    }
    showPass() {
      this.state.press === false ?
      this.setState({ showPass: false, press: true }) :
      this.setState({ showPass: true, press: false });
    }
    reshowPass() {
      this.state.rePress === false ?
      this.setState({ reshowPass: false, rePress: true }) :
      this.setState({ reshowPass: true, rePress: false });
    }
    onSuccess(){
      Alert.alert(
          'Thông báo',
          'Đăng ký thành công',
          [
              { text: 'OK', onPress: () => this.props.navigation.goBack()}
          ],
          { cancelable: false }
      );
    }
    onFail() {
        Alert.alert(
            'Thông báo',
            'Email đã được sử dụng',
            [
                { text: 'OK', onPress: () => this.removeEmail.bind(this) }
            ],
            { cancelable: false }
        );
    }

    removeEmail() {
        this.setState({ email: '' });
    }
    removePass(){
      this.setState({rePassword: ''});
    }
    checkEmail() {
      const {email} = this.state;
      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!filter.test(email)) {
          return false;
      }
      return true;
    }
    alert(){
      Alert.alert(
          'Thông báo',
          'Vui lòng điền đầy đủ thông tin!',
          [
              { text: 'OK' }
          ],
          { cancelable: false }
      );
    }
    alert1(){
      Alert.alert(
          'Thông báo',
          'Nhập lại mật khẩu không khớp!',
          [
              { text: 'OK', onPress: () => this.removePass.bind(this) }
          ],
          { cancelable: false }
      );
    }
    alert2(){
      Alert.alert(
          'Thông báo',
          'Email không hợp lệ',
          [
              { text: 'OK', onPress: () => this.removeEmail.bind(this) }
          ],
          { cancelable: false }
      );
    }
    registerUser(cb) {
        const { name, email, password, rePassword } = this.state
        //Kiểm tra hợp lệ
        if(name === '' || email === '' || password === ''){
          this.alert();
          let load = true;//callback
          cb(load);
          return false;
        }
        if(password != rePassword){
          this.alert1();
          let load = true;//callback
          cb(load);
          return false;
        }
        if(!this.checkEmail()){
          this.alert2();
          let load = true;//callback
          cb(load);
          return false;
        }
        //Tiến hành đăng ký
        register(email, name, password)
        .then(res => {
          let load = true;//callback
          cb(load);
            //alert(res);
            if (res === 'THANH_CONG') return this.onSuccess();
              this.onFail();
        });
    }
    render() {
        const { email, password, showPass, press, rePassword, name, reshowPass, rePress } = this.state;
        return (
            <Wallpaper>
              <View style={styles.logo}>
                <Logo name={'ĐĂNG KÝ'}/>
              </View>
              <View style={styles.textinput}>
                <KeyboardAvoidingView behavior='padding'
                  style={styles.container}>
                  <View style={styles.inputWrapper}>
                    <Image source={usernameImg}
                      style={styles.inlineImg} />
                    <TextInput style={styles.input}
                      placeholder='Nhập họ tên'
                      autoCapitalize='none'
                      returnKeyType='done'
                      autoCorrect={false}
                      value={name}
                      onChangeText={name =>this.setState({name})}
                      placeholderTextColor='white'
                      underlineColorAndroid='transparent' />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Image source={emailImg}
                      style={styles.inlineImg} />
                    <TextInput style={styles.input}
                      placeholder='Nhập email'
                      autoCapitalize='none'
                      returnKeyType='done'
                      autoCorrect={false}
                      value={email}
                      onChangeText={email =>this.setState({email})}
                      placeholderTextColor='white'
                      underlineColorAndroid='transparent' />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Image source={passwordImg}
                      style={styles.inlineImg} />
                    <TextInput style={styles.input}
                      placeholder='Nhập mật khẩu'
                      secureTextEntry={showPass}
                      autoCorrect={false}
                      autoCapitalize='none'
                      returnKeyType='done'
                      value={password}
                      onChangeText={password => this.setState({password})}
                      placeholderTextColor='white'
                      underlineColorAndroid='transparent' />
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.btnEye}
                      onPress={this.showPass.bind(this)}
                    >
                      <Image source={eyeImg} style={styles.iconEye} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.inputWrapper}>
                    <Image source={passwordImg}
                      style={styles.inlineImg} />
                    <TextInput style={styles.input}
                      placeholder='Nhập lại mật khẩu'
                      secureTextEntry={reshowPass}
                      autoCorrect={false}
                      autoCapitalize='none'
                      returnKeyType='done'
                      value={rePassword}
                      onChangeText={rePassword => this.setState({rePassword})}
                      placeholderTextColor='white'
                      underlineColorAndroid='transparent' />
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.btnEye}
                      onPress={this.reshowPass.bind(this)}
                    >
                      <Image source={eyeImg} style={styles.iconEye} />
                    </TouchableOpacity>
                  </View>
                </KeyboardAvoidingView>

                <ButtonSubmit click={this.registerUser.bind(this)}
                                    text={'Đăng ký ngay'}/>
              </View>
            </Wallpaper>
        );
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
		height: 50,
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
  }
});
