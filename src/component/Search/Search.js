import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, Image, TextInput, FlatList, TouchableHighlight, ActivityIndicator
} from 'react-native';
import global from '../global';
import icback from '../img/icback.png';
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            mang: [],
            isloading: false
        }
    }
    search() {
        global.manhinhtimkiem = true;
        global.searchData();
        this.goBack1();
    }
    goBack1() {
        this.props.navigation.goBack();
    }
    loadData() {
        //alert("load "+this.state.value)
        fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + this.state.value + '&types=geocode&language=vi&key=AIzaSyC9hXBNhK5zuePc2RftV09n3Ao9IPE2tRA')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({ mang: [] });
            for (let i = 0; i < responseJson.predictions.length; i++)
            {  
                //console.log(responseJson.predictions[i].description + '---' + responseJson.predictions[i].place_id);
                this.setState({
                    mang: this.state.mang.concat({description: responseJson.predictions[i].description, id: responseJson.predictions[i].place_id }),
                    isloading: false
                })
            }
            
        })
        .catch((e)=>{console.log(e)});
    }
    loadLatLong(id) {
        fetch('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + id + '&key=AIzaSyC9hXBNhK5zuePc2RftV09n3Ao9IPE2tRA')
        .then((response) => response.json())
        .then((responseJson) => {
            global.latsearch = responseJson.result.geometry.location.lat;
            global.longsearch = responseJson.result.geometry.location.lng;
            this.search();
        })
        .catch((e)=>{console.log(e)});
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={{ justifyContent: 'center', paddingRight: 5 }}
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                    <View style={{ justifyContent: 'center', alignContent: 'center'}}>
                        <Image style={{ width: 25, height: 25 }} source={icback} />
                    </View>
                    </TouchableOpacity> 
                    <View style={{ flex: 1, justifyContent: 'center'}}>

                        <TextInput 
                            placeholder='Tìm kiếm'
                            underlineColorAndroid='rgba(0,0,0,0)'
                            
                            onChangeText={(value) => {
                                this.setState({ value, isloading: true });
                                this.loadData();
                            }}
                            value={this.state.value}
                        />
                    </View>
                </View>
                <ActivityIndicator
                    animating={this.state.isloading}
                />           
                <FlatList
                    data={this.state.mang}
                    renderItem={({ item }) =>
                    <TouchableHighlight
                       onPress={() => {
                           global.diadiem = item.description;
                           this.loadLatLong(item.id);             
                        }}
                    >
                        <View style={styles.rowFlatlist} key={item.id}>
                            <View>
                                <Text>{item.description}</Text>
                            </View>
                                
                        </View>
                    </TouchableHighlight>
                    }
                    keyExtractor={(item, index) => index}
                    ListFooterComponent={(
                        <TouchableHighlight>
                        <View style={{ padding: 10 }}>
                            <Text>Vị trí hiện tại</Text>
                        </View>
                        </TouchableHighlight>
                    )}
                />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {

        flexDirection: 'row',
        backgroundColor: 'white',
        height: 45,
        padding: 4,
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        paddingHorizontal: 5,
        //pa: 10
    },
    rowFlatlist: {
        padding: 10,
        borderBottomWidth: 0.5
    }
})