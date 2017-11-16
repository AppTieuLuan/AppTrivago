import React, { Component } from 'react';
import {
  View, StyleSheet, Dimensions, Text, TextInput,
  TouchableOpacity, FlatList
} from 'react-native';
import MapView from 'react-native-maps';
const { height, width } = Dimensions.get('window');

import global from '../../../global';

export default class MapViewComponent extends Component {
  constructor(props) {
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
  componentDidMount() {

  }
  Search(text) {
    if (this.state.text === '') {
      this.setState({ mang: [] });
    }
    let searchtext = text;
    this.setState({
      text: searchtext
    });
    fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + this.state.text + '&types=geocode&language=vi&key=AIzaSyC9hXBNhK5zuePc2RftV09n3Ao9IPE2tRA')
      //fetch('https://maps.googleapis.com/maps/api/geocode/json?&address=' + this.state.text)
      .then(res => res.json())
      .then(res => {
        //this.setState({ mang: res.predictions });
        this.setState({ mang: [] });
        for (let i = 0; i < res.predictions.length; i++) {
          //console.log(responseJson.predictions[i].description + '---' + responseJson.predictions[i].place_id);
          this.setState({
            mang: this.state.mang.concat({ description: res.predictions[i].description, id: res.predictions[i].place_id }),
            isloading: false
          })
        }
      }).catch(err => console.log(err));
  }
  marker() {
    var markers = [];
    for (marker of this.state.coordinate) {
      markers.push(
        <MapView.Marker
          key={marker.longitude}
          //draggable
          coordinate={marker}
          onPress={this.clickmarker.bind(this)}
        />
      );
    }
    return markers;
  }
  clickmarker() {
    global.address = this.state.text;
    global.lat = this.state.lat;
    global.lng = this.state.lng;
    this.props.navigation.state.params.setAddress();
    this.props.navigation.goBack();
  }

  clickMap(data) {

    this.setState({
      region: {
        latitude: data.latitude,
        longitude: data.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
      },
      coordinate: [{
        latitude: data.latitude,
        longitude: data.longitude,
      }],
      mang: [],
      lat: data.latitude,
      lng: data.longitude
    })
  }
  click(id, text) {
    let lat, lng;
    fetch('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + id + '&key=AIzaSyC9hXBNhK5zuePc2RftV09n3Ao9IPE2tRA')
      .then((response) => response.json())
      .then((responseJson) => {
        lat = responseJson.result.geometry.location.lat;
        lng = responseJson.result.geometry.location.lng;

        this.setState({
          region: {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          },
          coordinate: [{
            latitude: lat,
            longitude: lng
          }],
          mang: [],
          text: text,
          lat: lat,
          lng: lng
        })

      })
      .catch((e) => { console.log(e) });


  }
  render() {
    return (
      <View>
        <View style={{
          height: height / 12, width: width,
          backgroundColor: '#fff', borderWidth: 1
        }}>
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
            onPress={(event) => {
              this.clickMap(event.nativeEvent.coordinate);
              //alert(data.coordinate.latitude);
            }}
          >
            {this.marker()}
          </MapView>

          <View style={{ position: 'absolute', top: 0 }}>
            <FlatList
              res="ds"
              data={this.state.mang}
              keyExtractor={item => item.id}
              renderItem={({ item }) =>
                <TouchableOpacity
                  onPress={() => {
                    this.click(item.id, item.description)
                  }}

                >
                  <View style={{
                    borderBottomWidth: 0.5, borderTopWidth: 0.5,
                    height: height / 12, backgroundColor: '#fff', width: width
                  }}>

                    <Text>{item.description}</Text>
                  </View>
                </TouchableOpacity>
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
    height: height * 11 / 12,
    width: width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  }
})
