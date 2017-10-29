import React,{ Component } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, TouchableWithoutFeedback,
    TextInput, FlatList
} from 'react-native';

import HeaderFlatList from './HeaderFlatList';

const { height, width } = Dimensions.get('window');
export default class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mang: [],
            refresh: false,
        };
    }

    refresh() {
        this.loadData();
    }
    render() {
        const { navigate } = this.props.navigate;
        
        return (
            <View style = {{ flex:1 }}>
    
                <TouchableOpacity
                    onPress = {()=>{navigate('DetailScreen')}}
                >
                    <Text>Go to Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{this.refs.ds.scrollToIndex({animated: true,index:0,viewPosition:0})}}
                >
                    <Text>Up</Text>
                </TouchableOpacity>
                <FlatList 
                    ref = "ds"
                    ListHeaderComponent = {(<HeaderFlatList />)}
                    refreshing = {this.state.refresh}
                    onRefresh = {()=>{this.refresh()}}
                    data={this.state.mang}
                    renderItem={({ item }) => 
                        <View style={styles.rowFlatlist}>
                            <Text>{item.key}</Text>
                            <Text>{item.hoten}</Text>
                            <Image
                                style={{width: 50, height: 50}}
                                source={{uri: item.hinh}}
                            />
                            <Text>{item.mota}</Text>
                        </View>
                    }
                />
            </View>
        )
    }

    loadData() {

        this.setState({
            refresh: true
        })
        fetch("http://192.168.1.92/Flatlist/demo2.php")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                mang: responseJson,
                refresh : false
            });
        })
        .catch((e)=>{console.log(e)});
    }
    componentDidMount(){
         this.loadData();
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
