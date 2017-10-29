/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, TouchableHighlight
} from 'react-native';
import MapView from 'react-native-maps';
import global from '../global';
import RowFlatList from './RowFlatList';

export default class MapViewComponent extends Component {

  constructor(props) {
    super(props);
     this.state = {
      // region: {
      //   latitude: 10.7471065,
      //   longitude: 106.5766546,
      //   latitudeDelta: 0.07,
      //   longitudeDelta: 0.07,
      // },
      
      cod: {
        latitude: 10.1686747,
        longitude: 106.6992098
      },
      markers: [],
      arrLatLong: [],
      radius: global.bankinhsearch * 1000
    };
  }
  
  componentDidMount() {
    // this.setState({
    //   markers: this.props.arrLatLong
    // })
  }
  componentWillReceiveProps (newProps) {
    this.setState({ 
      markers: newProps.data,
      radius: newProps.bankinh
     });

    // for (let i = 0; i < this.state.markers.length; i++) {  
    //   //console.log(responseJson.predictions[i].description + '---' + responseJson.predictions[i].place_id);
    //   this.setState({
    //       arrLatLong: this.state.arrLatLong.concat({ latitude: parseFloat(this.state.markers[i].lat), longitude: parseFloat(this.state.markers[i].long) })
    //   });
    // }
  }
  onRegionChange(data) {
    //console.log(data);
  }
  onPress(data) {
    //  this.setState({
    //     marker: this.state.markers.push({
    //       latitude: data.nativeEvent.coordinate.latitude,
    //       longitude: data.nativeEvent.coordinate.longitude,
    //     })
    //  })

    // alert(this.state.markers[0].latitude + '--'+this.state.markers[0].longitude);
     //alert(this.state.markers.length)
     //alert(data.nativeEvent.coordinate.latitude + '----' + data.nativeEvent.coordinate.longitude);
     let cod = Object.assign({}, this.state.User, { latitude: data.nativeEvent.coordinate.latitude, longitude: data.nativeEvent.coordinate.longitude });
     this.setState({
        cod
     });
  }
  done(data) {
     //alert(data.latitude);
     if (data.latitude == this.state.cod.latitude && data.longitude == this.state.cod.longitude){

     } else {
      let cod = Object.assign({}, this.state.User, { latitude: data.latitude, longitude: data.longitude });
      this.setState({
         cod
      }, function () {
        global.latsearch = data.latitude;
        global.longsearch = data.longitude;
        //global.loadDuLieuLoc();
        //this.props.loadData();
        this.props.loadData();
      });
      
     }
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          //region={this.state.region}
          style={{ flex: 1 }}
          //onRegionChange={this.onRegionChange.bind(this)}
          //onPress={this.onPress.bind(this)}
          initialRegion={{
            latitude: 10.1686747,
            longitude: 106.6992098,
            latitudeDelta: 0.102,
            longitudeDelta: 0.102,
          }}
         onRegionChangeComplete={this.done.bind(this)}
         moveOnMarkerPress={false}
         
        >
        {
          global.mapAlready === true && this.state.markers.length > 0 ?
            this.state.markers.map(marker => (
              <MapView.Marker
                key={marker.latitude}
                //coordinate={marker}
                coordinate={
                  marker
                }
                //title={marker.latitude.toString()}
                //description={'h'}
              >
                <MapView.Callout 
                  style={{ borderRadius: 10 }}
                  tooltip={true}
                  flat={true}
                  onPress={()=>{
                      global.idKS = marker.key;
                      this.props.goDetails(marker.ten, 1);
                  }}
                >
                    <RowFlatList item={marker} />
                </MapView.Callout>
              </MapView.Marker>
              )) : null
        }
        {
          global.mapAlready === true ? 
          <MapView.Circle 
            center={this.state.cod}
            radius={this.state.radius}
            fillColor='rgba(2, 2, 2, 0.1)'
            strokeColor='transparent'
          />
          : null
        }
        </MapView>
        <TouchableHighlight
          onPress={() => { 
            global.idKS = 1;
              this.props.goDetails('123', 1);
           }}
        >
            <Text>go Details</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  
});
