import React from "react"
import { View, Text, StyleSheet } from "react-native"
import PropTypes from "prop-types"

const HomeScreen = ({ navigation }) => {
	return (
		<View>
			<Text>Home Screen</Text>
			<Text>Home Screen</Text>
			<Text>Home Screen</Text>
			<Text>Home Screen</Text>
			<Text>Home Screen</Text>
			<Text>Home Screen</Text>
		</View>
	)
}

const styles = StyleSheet.create({})

HomeScreen.propTypes = {
	navigation: PropTypes.object
}

export default HomeScreen