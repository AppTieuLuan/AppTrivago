import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Dimensions, TouchableOpacity, Image
} from 'react-native';
import global from '../global';

const { height, width } = Dimensions.get('window');
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

export default class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mang: [],
            item: 0
        }
    }
    componentDidMount() {

        this.loadData();
    }

    addData() {
        alert(this.state.id);
    }
    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={this.state.mang.length} />;
    }

    loadData() {
        fetch(global.server.concat('getHinhAnh.php?id=' + global.idKS))
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    mang: responseJson,
                    item: this.state.mang.length,
                    islove: false
                });
                global.loadhinhanh = true;
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
            style={{ height: height / 3 + 70 }}
            indicator={this._renderDotIndicator()} >
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
            <View style={{ flex: 1}}>
                {
                    this.state.mang.length ? lst : null
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({

    boximg: {
        height: height / 3 + 400,
        backgroundColor: 'red'
    }
})