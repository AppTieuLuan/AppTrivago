import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity
} from 'react-native';
import bgSrc from '../images/bg.png';
import like from '../images/ksyt.png';

import global from '../../../global';
import getlikehotels from '../../../../api/getlikehotels';
import removelikehotel from '../../../../api/removelikehotel';

const { height, width } = Dimensions.get('window');

export default class LikeHotels extends Component{
  constructor(props){
    super(props);
    this.state = {
      flag: true,
      mang: [],
      refresh: true
    };
  }
  componentDidMount(){
    getlikehotels(global.onSignIn.id)
    .then(res => {
      if(res.list === 'KHONG_CO'){
        this.setState({flag: false});
      }else{
        this.setState({
          flag: true,
          mang: res.list,
          refresh: false
        });
      }
    })
    .catch(err => console.log(err));
  }
  refresh(){
    this.setState({refresh: true});
    getlikehotels(global.onSignIn.id)
    .then(res => {
      if(res.list === 'KHONG_CO'){
        this.setState({flag: false});
      }else{
        this.setState({
          flag: true,
          mang: res.list,
          refresh: false
        });
      }
    })
    .catch(err => console.log(err));
  }
  removehotel(id){
    removelikehotel(global.onSignIn.id, id)
    .then(res => {
      if(res === 'THANH_CONG'){
        console.log("Xóa thành công!!");
      }
    })
    .catch(err => console.log(err));
    this.refresh();
  }
  render(){
    let draw = this.state.flag ?
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <FlatList
        refreshing={this.state.refresh}
        onRefresh={() => { this.refresh() }}
        data={this.state.mang}
        keyExtractor={(item) => item.id}
        renderItem={({item}) =>
          <View style={{padding: 5}}>
            <Image style={{width: width*0.95, height:height/3, borderRadius: 15}} source={{uri: item.hinhanh}} />
            <View style={{flexDirection: 'row', position: 'absolute'}}>
              <View style={{flex: 4}}>
                <Text style={{color: '#fff', fontSize: 16, top: 10, left: 10}}>{item.ten}</Text>
              </View>
              <View style={{flex: 1, left: 10, alignItems:"center", justifyContent:'center', top: 10}}>
                <TouchableOpacity onPress={() => this.removehotel(item.id)}>
                  <Image source={like} style={styles.inlineImg}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
        />
    </View>:
      <Image source={bgSrc} style={{height: height*0.9, width: width}}  />
    return(
      <View>
        {draw}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  inlineImg: {
    width: 22,
    height: 22,
  }
});
