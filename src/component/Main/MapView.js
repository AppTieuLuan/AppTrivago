/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text, ActivityIndicator,
  View, TouchableHighlight, Modal, TouchableOpacity
} from 'react-native';

import MapView from 'react-native-maps';
import global from '../global';
import RowFlatList from './RowFlatList';
var Spinner = require('react-native-spinkit');

export default class MapViewComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // region: {
      // latitude: global.latsearch,
      // longitude: global.longsearch,
      // latitudeDelta: 0.502,
      // longitudeDelta: 0.502,
      // },
      isshowCallout: false,
      cod: {
        latitude: global.latsearch,
        longitude: global.longsearch,
      },
      codinit: {
        latitude: global.latsearch,
        longitude: global.longsearch,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      },
      markers: [],
      radius: global.bankinhsearch * 1000,
      loading: false,
      show: false,
      textt: 'Load DL',
      isVisible: false

    };
    //global.openModal = this.openModal.bind(this);
    //global.closeModal = this.closeModal.bind(this);
  }
  openModal() {

  }
  closeModal() {

  }
  setModalVisible(visible) {
    this.setState({ visible });
  }


  renderSpinner() {

  }


  componentDidMount() {
    this.setState({ loading: true })
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      //markers: newProps.data,
      radius: newProps.bankinh,
      markers: newProps.data
    });

    let cod = Object.assign({}, { latitude: global.latsearch, longitude: global.longsearch });
    this.setState({
      cod
    });

    this.setState({ isVisible: false });

  }
  changeRegion(data) {
    //alert(data.latitude);
    this.setState({ codinit: data })
  }
  onPress(data) {
    if (!this.state.isshowCallout) {
      let cod = Object.assign({}, this.state.User, { latitude: data.nativeEvent.coordinate.latitude, longitude: data.nativeEvent.coordinate.longitude });
      this.setState({
        cod
      });
      global.longsearch = data.nativeEvent.coordinate.longitude;
      global.latsearch = data.nativeEvent.coordinate.latitude;
      this.setState({ isVisible: true });
      this.props.loaddl();
    }
    this.setState({ isshowCallout: false })
  }
  done(data) {

    if (data.latitude == this.state.cod.latitude && data.longitude == this.state.cod.longitude) {

    } else {
      let cod = Object.assign({}, this.state.User, { latitude: data.latitude, longitude: data.longitude });
      this.setState({
        cod
      }, function () {

      });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          onPress={this.onPress.bind(this)}
          moveOnMarkerPress={false}
          onRegionChangeComplete={(data) => { this.changeRegion(data) }}
          region={this.state.codinit}
        >
          {
            global.mapAlready === true && this.state.markers.length > 0 ?
              this.state.markers.map(marker => (
                <MapView.Marker
                  image={require('../img/marker.png')}
                  style={{ width: 40, height: 40 }}
                  key={marker.latitude}
                  //coordinate={marker}
                  coordinate={
                    marker
                  }
                  onPress={() => {
                    this.setState({ isshowCallout: true })
                  }}
                //title={marker.latitude.toString()}
                //description={'h'}
                >
                  <MapView.Callout
                    style={{ borderRadius: 10 }}
                    tooltip={true}
                    flat={true}
                    onPress={() => {
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
        {/* <Modal
          transparent={true}
          visible={this.state.isVisible}
          onRequestClose={() => this.setState({ isVisible: false })}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              this.setState({ isVisible: false })
            }}
          >
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <View style={{
                backgroundColor: '#333333',
                //backgroundColor: 'rgba(52, 52, 52, 0.8)',
                borderRadius: 10,
                width: 80,
                height: 80,
                
                padding: 5,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Spinner size={40} type={'Circle'} color={'white'} />
                <Text style={{ fontSize: 13, color: 'white' }}>Loading...</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Modal> */}

        <Modal
          transparent={true}
          visible={this.state.isVisible}
          onRequestClose={() => this.setState({ isVisible: false })}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              this.setState({ isVisible: false })
            }}
          >
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
            }}>
              {/* <View style={{
                               // backgroundColor: '#333333',
                               //backgroundColor: 'rgba(52, 52, 52, 0.5)',
                                //borderRadius: 10,
                                //width: 80,
                                //height: 80,
                                padding: 5,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                               <Spinner size={40} type={'Circle'} color={'white'} /> 
                                <Text style={{ fontSize: 13, color: 'white' }}>Loading...</Text>
                            </View> */}
              <ActivityIndicator size={65} />
              <Text style={{ fontSize: 15, color: 'white' }}>Loading...</Text>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: '#333333',
    margin: 20
  }
});
