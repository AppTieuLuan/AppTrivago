import React, { Component } from 'react';
import {
  View, TextInput, Text,
  TouchableOpacity, StyleSheet,
  Dimensions, Image, Alert, KeyboardAvoidingView
} from 'react-native';
import signIn from '../../api/signIn';
import global from '../global';
const { height, width } = Dimensions.get('window');
import { NavigationActions } from 'react-navigation';

import saveToken from '../../api/saveToken';
import getToken from '../../api/getToken';

import usernameImg from './AccountMember/images/username.png';
import passwordImg from './AccountMember/images/password.png';
import eyeImg from './AccountMember/images/eye_black.png';

import Wallpaper from './AccountMember/view/Wallpaper';
import ButtonSubmit from './AccountMember/view/ButtonSubmit';
import SignupSection from './AccountMember/view/SignupSection';
import Logo from './AccountMember/view/Logo';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPass: true,
      press: false,
    };
    this.showPass = this.showPass.bind(this);
  }
  showPass() {
    this.state.press === false ?
      this.setState({ showPass: false, press: true }) :
      this.setState({ showPass: true, press: false });
  }
  alert() {
    Alert.alert(
      'Thông báo',
      'Đăng nhập thất bại! Vui lòng kiểm tra lại!',
      [
        { text: 'OK', onPress: () => this.clear() }
      ],
      { cancelable: false }
    );
  }
  clear() {
    this.setState({ email: '', password: '' });
  }
  onSignIn(cb) {
    const { email, password } = this.state;
    if (email === '' || password === '') {
      this.alert();
      let load = true;// callback gửi thông điệp để tắt animation
      cb(load);
      return false;
    }
    signIn(email, password)
      .then(res => {
        let load = true;// callback gửi thông điệp để tắt animation
        cb(load);
        if (res.err) {
          this.alert();
          return false;
        }
        global.onSignIn = res.user;
        saveToken(res.token);
        console.log(res.token);
        console.log(global.onSignIn);
        this.replaceScreen();
      })
      .catch(err => alert(err));
  }
  replaceScreen = () => {
    const { flag } = this.props.navigation.state.params;
    console.log(flag);
    if (flag === '1') {
      console.log('Đã login');
      const resetAction = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'WelcomeScreen' }),
          global.onSignIn.quyen === '1' ?
            NavigationActions.navigate({
              routeName: 'AccountScreen',
              params: { flag: '1' }
            }) :
            NavigationActions.navigate({
              routeName: 'AccountMemberScreen',
              params: { flag: '1' }
            })
        ]
      });
      this.props.navigation.dispatch(resetAction);
    } else {
      const resetAction = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'MainScreen' }),
          global.onSignIn.quyen === '1' ?
            NavigationActions.navigate({
              routeName: 'AccountScreen',
              params: { flag: '2' }
            }) :
            NavigationActions.navigate({
              routeName: 'AccountMemberScreen',
              params: { flag: '2' }
            })
        ]
      });
      this.props.navigation.dispatch(resetAction);
    }
  };
  onclick() {
    this.props.navigation.navigate('SignupScreen');
  }
  render() {
    const { email, password, showPass, press } = this.state;
    return (
      <Wallpaper>
        <View style={styles.logo}>
          <Logo name={'ĐĂNG NHẬP'} />
        </View>
        <View style={styles.textinput}>
          <KeyboardAvoidingView behavior='padding'
            style={styles.container}>
            <View style={styles.inputWrapper}>
              <Image source={usernameImg}
                style={styles.inlineImg} />
              <TextInput style={styles.input}
                placeholder='Nhập email'
                autoCapitalize='none'
                returnKeyType='done'
                autoCorrect={false}
                value={email}
                onChangeText={email => this.setState({ email })}
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
                onChangeText={password => this.setState({ password })}
                placeholderTextColor='white'
                underlineColorAndroid='transparent' />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.btnEye}
                onPress={this.showPass}
              >
                <Image source={eyeImg} style={styles.iconEye} />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>

          <ButtonSubmit click={this.onSignIn.bind(this)} />

          <SignupSection onclick={this.onclick.bind(this)} />

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
    right: 28,
    top: 7
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  }
});
