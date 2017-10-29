import React,{ Component } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, TouchableWithoutFeedback,
    TextInput, FlatList
} from 'react-native';

import MapView from './MapView';
import MainContent from './MainContent';
import opemenu from '../img/openmenu.png';
import icsearch from '../img/Search.png';
import icMap from '../img/Map.png';
import icAc from '../img/Account.png';

const { height, width } = Dimensions.get('window');
export default class MainView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: false
        };
    }
    render() {
        const { navigate } = this.props.navigation;
        const MainContent1 = <MainContent navigate={this.props} />
        return (
            <View style = {{ flex:1 }}>
                <View style={styles.header}>
                    <View style={{ flex: 1 }}>
                        <TouchableWithoutFeedback
                        onPress={() => { navigate('DrawerOpen') }}
                        >
                            <Image style={styles.imgHeader} source={opemenu} />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ flex: 5 }}>
                        
                            <TextInput 
                                onFocus = { () => { navigate('SearchScreen')}}
                                placeholder='Tìm kiếm'
                                underlineColorAndroid='rgba(0,0,0,0)'
                            />
                       
                    </View>
                    <View style={{ flex: 4, justifyContent: 'space-between', flexDirection: 'row', paddingRight: 5 }}>
                        <Image style={styles.imgHeader} source={icsearch} />
                        <TouchableWithoutFeedback
                            onPress={()=> {this.setState({ map: !this.state.map })}}
                        >
                            <Image style={styles.imgHeader} source={icMap} />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => { navigate('AccountScreen', { param: 'Hoang Van Cong' }) }}
                        >
                            <Image style={styles.imgHeader} source={icAc} />
                        </TouchableWithoutFeedback>
                    </View>
                    

                </View>
                
                {this.state.map ? <MapView /> : MainContent1 }
                {/* <TouchableOpacity
                    onPress = {()=>{navigate('DetailScreen')}}
                >
                    <Text>Go to Details</Text>
                </TouchableOpacity> */}
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: height / 12,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        
    },
    imgHeader: {
        width: 25,
        height: 25,
    },
    rowFlatlist: {
        padding:10,
        borderBottomWidth: 1
    }
    
})  
