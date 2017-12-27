import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import bgSrc from '../images/bg.png';
import like from '../images/ksyt.png';

import global from '../../../global';
import getlikehotels from '../../../../api/getlikehotels';
import removelikehotel from '../../../../api/removelikehotel';

const { height, width } = Dimensions.get('window');

export default class LikeHotels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: true,
      mang: [],
      refresh: true,
      loading: false,
      f: false,
      page: 1
    };
  }
  loadData() {
    this.setState({ refresh: true });
    getlikehotels(global.onSignIn.id, this.state.page)
      .then(res => {
        if (res.list === 'KHONG_CO') {
          this.setState({ flag: false });
        } else {
          this.setState({
            flag: true,
            mang: res.list,
            refresh: false
          });
        }
      })
      .catch(err => console.log(err));
  }
  componentDidMount() {
    this.loadData();
  }
  refresh() {
    this.setState({ page: 1, mang: [] }, function () {
      this.loadData();
    });
  }
  removehotel(id) {
    removelikehotel(global.onSignIn.id, id)
      .then(res => {
        if (res === 'THANH_CONG') {
          console.log("Xóa thành công!!");
          this.refresh();
        }
        else {
          Alert.alert(
            'Thông báo',
            'Vui lòng thử lại!',
            [
              { text: 'OK' }
            ],
            { cancelable: false }
          );
        }
      })
      .catch(err => Alert.alert(
        'Thông báo',
        'Vui lòng kiểm tra lại kết nối của bạn!',
        [
          { text: 'OK' }
        ],
        { cancelable: false }
      ));
  }
  loadMore() {
    if (!this.state.f) {
      this.setState({ loading: true, page: this.state.page + 1 });
    }
    getlikehotels(global.onSignIn.id, this.state.page)
      .then(res => {
        if (res.over) {
          this.setState({ f: true, loading: false });
          return false;
        }
        this.setState({ mang: this.state.mang.concat(res.list), loading: false });
      })
      .catch(err => console.log(err));
  }
  alertRemoveHotel(id, name) {
    Alert.alert(
      'Thông báo',
      'Bạn có muốn xóa khách sạn ' + name + ' khỏi danh sách yêu thích?',
      [
        { text: 'OK', onPress: () => this.removehotel(id) },
        { text: 'Cancle', onPress: false }
      ],
      { cancelable: false }
    );
  }
  render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {
          this.state.flag ?
            (<View style={{ height: '99%', width: '98%', }}>
              <FlatList
                ListFooterComponent={(
                  <View style={{ padding: 10 }}>
                    {
                      !this.state.loading ?
                        (null) :
                        (
                          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <ActivityIndicator size={24} />
                            <Text>   Loading ...</Text>
                          </View>
                        )
                    }

                  </View>
                )}
                refreshing={this.state.refresh}
                onRefresh={() => { this.refresh() }}
                onEndReachedThreshold={0.2}
                onEndReached={() => { this.loadMore(); }}
                data={this.state.mang}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                  <TouchableOpacity
                    onPress={() => {
                      global.idKS = item.id;
                      this.props.navigation.navigate('DetailScreen', { name: item.ten, id: item.id })
                    }}
                  >
                    <View style={{ padding: 5 }}>
                      <Image style={{ width: width * 0.95, height: height / 3, borderRadius: 15 }} source={{ uri: item.hinhanh }} />
                      <View style={{ flexDirection: 'row', position: 'absolute' }}>
                        <View style={{ flex: 4 }}>
                          <Text style={{ color: '#fff', fontSize: 16, top: 10, left: 10 }}>{item.ten}</Text>
                        </View>
                        <View style={{ flex: 1, left: 10, alignItems: "center", justifyContent: 'center', top: 10 }}>
                          <TouchableOpacity onPress={() => this.alertRemoveHotel(item.id, item.ten)}>
                            <Image source={like} style={styles.inlineImg} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                }
              />
            </View>)
            :
            (<View>
              <Image source={bgSrc} style={{ height: height * 0.9, width: width }} />
            </View>)
        }
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
