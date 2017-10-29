import React, { Component } from 'react';
import {
    View, StyleSheet, Dimensions, Text, TextInput,
    TouchableOpacity, FlatList
} from 'react-native';
import MapView from 'react-native-maps';
const { height, width } = Dimensions.get('window');

import global from '../../../global';

export default class MapViewComponent extends Component {
    constructor(props){
      super(props);
      this.state = {
        region: null,
        text: '',
        mang: [],
        coordinate: [],
        lat: '',
        lng: ''
      };
    }
    componentDidMount(){

    }
    Search(text){
      if(this.state.text === ''){
        this.setState({mang: []});
      }
      let searchtext = text;
      this.setState({
        text: searchtext
      });
      fetch('https://maps.googleapis.com/maps/api/geocode/json?&address='+this.state.text)
      .then(res => res.json())
      .then(res => {
        this.setState({mang: res.results});
      }).catch(err => console.log(err));
    }
    marker(){
      var markers = [];
      for (marker of this.state.coordinate) {
         markers.push(
           <MapView.Marker
           key={marker.longitude}
           coordinate={marker}
  		     onPress={this.clickmarker.bind(this)}
           />
         );
      }
      return markers;
    }
    clickmarker(){
      global.address = this.state.text;
      global.lat = this.state.lat;
      global.lng = this.state.lng;
      this.props.navigation.state.params.setAddress();
      this.props.navigation.goBack();
    }
    click(lat, lng, address){
      this.setState({
        region: {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        },
        coordinate:[{
          latitude: lat,
          longitude: lng
        }],
        mang: [],
        text: address,
        lat: lat,
        lng: lng
      })
    }
    render(){
        return(
          <View>
            <View style={{height: height/12, width: width,
              backgroundColor: '#fff', borderWidth: 1}}>
              <TextInput
                placeholder="Nhập địa chỉ của bạn"
                underlineColorAndroid="transparent"
                value={this.state.text}
                onChangeText={(text) => this.Search(text)}
              >
              </TextInput>
            </View>
            <View style={styles.container}>
              <MapView
                style={styles.map}
                region={this.state.region}
              >
              {this.marker()}
              </MapView>

              <View style={{position: 'absolute', top: 0}}>
                <FlatList
                  res="ds"
                  data={this.state.mang}
                  keyExtractor={item => item.place_id}
                  renderItem={({ item }) =>
                  <View style={{borderBottomWidth: 0.5, borderTopWidth: 0.5,
                    height: height/12, backgroundColor: '#fff', width: width}}>
                    <TouchableOpacity
                    onPress={() =>
                      this.click(item.geometry.location.lat,
                        item.geometry.location.lng,
                        item.formatted_address)}
                    >
                      <Text>{item.formatted_address}</Text>
                    </TouchableOpacity>
                  </View>
                  }
                />
              </View>

            </View>
          </View>
        )
    }
}
const styles = StyleSheet.create({
  container: {
    height: height*11/12,
    width: width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
})
