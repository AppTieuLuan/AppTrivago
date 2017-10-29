import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Image,
	Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('window');

export default class logout extends Component{
	render(){
		return(
		<View style={styles.container}>
			<View style={styles.inputWrapper}>
				<Image source={this.props.source}
					style={styles.inlineImg} />
				<TouchableOpacity style={styles.input}
					onPress={this.props.click}
				>
					<Text style={styles.text}>{this.props.text}</Text>
				</TouchableOpacity>
			</View>
		</View>
		);
	}
}
const styles = StyleSheet.create({
	inputWrapper: {
		height: height/12,
	},
	inlineImg: {
		position: 'absolute',
		zIndex: 99,
		width: 22,
		height: 22,
		left: 35,
		top: 10
  },
  container: {
		alignItems: 'center',
		top: 10
	},
	input: {
		backgroundColor: '#fff',
		width: width - 40,
		height: 40,
		marginHorizontal: 20,
		paddingLeft: 45,
		borderRadius: 20,
	},
	text: {
		top:10,
		color: 'black',
		fontSize: 17
	}
});
