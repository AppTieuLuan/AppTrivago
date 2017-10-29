import React, { Component } from 'react';
import {
    View
} from 'react-native';
import MapView from 'react-native-maps';
import global from '../global';

export default class MapViewDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            marker: [],
            region: {
                latitude: 10.781071020876045,
                longitude: 106.64713607239723,
                latitudeDelta: 0.102,
                longitudeDelta: 0.102,
            }
        };
    }
    componentDidMount() {
        fetch(global.server.concat('getLatLongKS.php?id=' + global.idKS))
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                marker: responseJson,
                region: {
                    latitude: responseJson[0].latitude,
                    longitude: responseJson[0].longitude,
                    latitudeDelta: 0.102,
                    longitudeDelta: 0.102,
                }
            });  

        })
        .catch((e) => { console.log(e) });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    //region={this.state.region}
                    style={{ flex: 1 }}
                    region={this.state.region}
                   
                >
                    {
                        this.state.marker.length > 0 ?
                            this.state.marker.map(
                                marker => (
                                <MapView.Marker
                                    key={marker.latitude}
                                    //coordinate={marker}
                                    coordinate={
                                        marker
                                    } 
                                />
                                )
                            ) : null
                    }
                </MapView>
            </View>
        )
    }
}