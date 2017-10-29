import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity
} from 'react-native';

export default class SignupSection extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={this.props.onclick}>
					<Text style={styles.text}>Bạn chưa có tài khoản?</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		top: 65,
		width: DEVICE_WIDTH,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	text: {
		color: 'blue',
		backgroundColor: 'transparent',
	},
});
