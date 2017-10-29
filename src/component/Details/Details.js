import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Dimensions, TouchableOpacity,Image
} from 'react-native';
import global from '../global';
import { TbDetails } from './RouterDetails';
const { height, width } = Dimensions.get('window');
import {IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import icback from '../img/icback.png';
import iclove from '../img/love.png';
import iclove_ac from '../img/love_active.png';
export default class Details extends Component {
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //       title: `${navigation.state.params.name}`,
    //       headerRight: (
    //         <TouchableOpacity
    //           title={navigation.state.params.name}
    //           onPress={navigation.state.params.add}
    //         >
    //         <Text>Like</Text>
    //         </TouchableOpacity>
    //       ),
    //     };
    //   };
    constructor(props) {
        super(props);
        this.state = {
            mang: [],
            item: 0
        }
    }
    componentDidMount() {
        // this.props.navigation.setParams({ add: this.addData });
        // this.setState({
        //     id: this.props.navigation.state.params.id
        // })

        //this.loadData();
    }
    // componentWillMount(){
    //     this.loadData();
    // }
    addData() {
        alert(this.state.id);
    }
    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={this.state.mang.length} />;
    }

    loadData() {
        fetch(global.server.concat('getHinhAnh.php?id=' + this.props.navigation.state.params.id))
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                mang: responseJson,
                item: this.state.mang.length,
                islove: false
            });  
        })
        .catch((e) => { console.log(e) });
        
   }

   themvaoYeuThich() {
       this.setState({
           islove: !this.state.islove
       })
   }
    render() {
        const lst = <IndicatorViewPager
                        style={{height: height / 3 - 10 }}
                        indicator={ this._renderDotIndicator() } >
                    { 
                        this.state.mang.map(
                            e => (
                                    <View key={e.id}>
                                        <Image source={{ uri: e.link }} style={{ flex: 1 }} />
                                    </View>
                                )
                        )
                    }
                    </IndicatorViewPager>
        return (
            <View style={{ flex: 1 }}>
                <View style = {styles.header}>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <Image style={{ width: 25, height: 25 }} source={icback} />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={{ fontWeight: 'bold', paddingLeft: 10 }}>{this.props.navigation.state.params.name}</Text>
                    <View style = {{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 5 }}>
                        <TouchableOpacity
                            onPress={()=>{ this.themvaoYeuThich() }}
                        >
                            <Image style={{ width: 25, height: 25 }} source={this.state.islove ? iclove_ac : iclove } />
                        </TouchableOpacity>
                    </View>
                </View>


                {/* {
                    this.state.mang.length ? lst : null
                } */}


                <View style={{ flex: 1 }}>
                   <TbDetails />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 40,
        padding: 4,
        alignItems: 'center',
        
        borderBottomWidth: 1,
        paddingHorizontal: 5
    },
    boximg: {
        height: height / 3,
        backgroundColor: 'red'
    }
})