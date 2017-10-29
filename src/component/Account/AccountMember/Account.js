import React,{ Component } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity, Image
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import saveToken from '../../../api/saveToken';
import global from '../../global';

import BTNAC from './view/buttonAccount';

import mk from './images/changepass.png';
import like from './images/ksyt.png';
import share from './images/share.png';
import sharehotel from './images/sharehotel.png';
import logout from './images/logout.png';
import user from './images/user.png';

export default class Account extends Component {
    constructor(props){
      super(props);
      this.state = {
        name: ''
      }
    }
    componentDidMount(){
      this.setState({name: global.onSignIn.hoten});
    }
    Logout(){
      saveToken('');
      global.onSignIn = null;
      this.replaceScreen();
    }
    replaceScreen = () => {
      const {flag} = this.props.navigation.state.params;
      if(flag === '1'){
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'WelcomeScreen'})
          ]
        });
        this.props.navigation.dispatch(resetAction);
      }else{
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'MainScreen'})
          ]
        });
        this.props.navigation.dispatch(resetAction);
      }
    };
    replaceScreenLike(){
      this.props.navigation.navigate('LikeScreen');
    }
    replaceScreenShare()
    {
      this.props.navigation.navigate('ShareScreen', {flag: false});
    }
    replaceChangePassScreen(){
        this.props.navigation.navigate('ChangePassScreen');
    }
    replaceHotelShared(){
        this.props.navigation.navigate('HotelSharedScreen');
    }
    render() {
        return (
          <ScrollView contentContainerStyle={{paddingVertical: 10, height: 500}}>
            <View>
              <View style={{alignItems: 'center', justifyContent: 'center', top: 20}}>
                <Image source={user} style={styles.image} />
                <Text style={styles.text}>{this.state.name}</Text>
              </View>
              <View style={{top: 35}}>
                <BTNAC
                  text={'Khách sạn yêu thích'}
                  source={like}
                  click={this.replaceScreenLike.bind(this)}
                />
                <BTNAC
                  text={'Chia sẻ khách sạn'}
                  source={share}
                  click={this.replaceScreenShare.bind(this)}
                />
                <BTNAC
                  text={'Khách sạn đã chia sẻ'}
                  source={sharehotel}
                  click={this.replaceHotelShared.bind(this)}
                />
                <BTNAC
                  text={'Đổi mật khẩu'}
                  source={mk}
                  click={this.replaceChangePassScreen.bind(this)}
                />
                <BTNAC
                  text={'Đăng xuất'}
                  source={logout}
                  click={this.Logout.bind(this)}
                />
              </View>
            </View>
          </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
  		width: 100,
  		height: 100,
  	},
  	text: {
      fontSize: 25,
  		color: 'black',
  		fontWeight: 'bold',
  		backgroundColor: 'transparent',
  		marginTop: 20,
  	}
})
