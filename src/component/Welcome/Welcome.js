import React, {Component} from 'react';
import {
  View, Text, Image, Dimensions,
  StyleSheet, TextInput, TouchableOpacity
 } from 'react-native';

import user from '../img/user.png';
import nameapp from '../img/name-app.png';
import logen from '../img/logen.png';
import search from '../img/iconsearch.png';
import global from '../global';
import refreshToken from '../../api/refreshToken';
import checkLogin from '../../api/checkLogin';
import getToken from '../../api/getToken';
import saveToken from '../../api/saveToken';
import { NavigationActions } from 'react-navigation';

const { height } = Dimensions.get('window');

export default class Welcome extends Component{
  constructor(props){
    super(props);
    this.state = {
      text: '',
      name: ''
    };
  }
  WelSearch = () => {
    global.keysearch = this.state.text;
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'MainScreen'})
      ]
    });
    this.props.navigation.dispatch(resetAction);
    //this.props.navigation.navigate('MainScreen');
  }
  componentDidMount(){
    //set server
    global.server = 'http://192.168.1.20:8080/Demo/';
    setInterval(refreshToken, 30000);
    getToken()
        .then(token => checkLogin(token))
        .then(res => {
          global.onSignIn = res.user;
          this.setState({name: res.user.hoten});
          console.log(res.user);
        })
        .catch(err => console.log('LOI CHECK LOGIN', err));
  }
  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style={{backgroundColor:"#FFFFFF"}}>
        <View style={{height:height/3}}>
          <View style={{alignItems:"flex-end", flexDirection: 'row'}}>
            <View style={{flex: 3}}></View>
            <View style={{flex: 3, alignItems:"flex-end"}}>
              <Text style={{fontSize: 16}}>{this.state.name}</Text>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={()=> {
                  global.onSignIn ? 
                  global.onSignIn.quyen === '1' ? navigate('AccountScreen', {flag: '1'}) : 
                  navigate('AccountMemberScreen', {flag: '1'}) :
                  navigate('SigninScreen', {flag: '1'})}
                }
                >
                <Image style={style.img}
                  source={user}
                />
                </TouchableOpacity>
            </View>
          </View>
          <View style={{alignItems:"center"}}>
            <Image
              source={nameapp}
            />
          </View>
        </View>

        <View style={{alignItems:"center", height:height/3}}>
          <View>
            <Image
              source={logen}
            />
          </View>
          <View style={style.khungsearch}>
            <View style={{flex:1}}></View>
            <View style={{flex:6, margin:3}}>
              <TextInput style={style.search}
                placeholder="Bạn muốn đi đâu?"
                underlineColorAndroid="transparent"
                value={this.state.text}
                onChangeText={(text) => this.setState({text})}
              >
              </TextInput>
            </View>
            <View style={{flex:1, margin:10}}>
              <TouchableOpacity
                onPress={this.WelSearch}
              >
                <Image style={style.iconsearch}
                  source={search}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{height:height/3}}>
        </View>
      </View>
    )
  }
}
var style = StyleSheet.create({
  img: {
    width: 30,
    height: 30,
    margin: 5
  },
  row:{
    flex:1
  },
  khungsearch:{
    flexDirection:"row"
  },
  search:{
    borderWidth: 3,
      borderColor: '#fafafa'
  },
  iconsearch:{
      width: 30,
      height: 30
  }
});
