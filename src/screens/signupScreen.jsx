import React from "react"
import PropTypes from "prop-types"
import { View, Text, StyleSheet, TextInput } from "react-native"
import Spacer from "../components/Spacer"
import AuthSubmit from "../components/AuthSubmit"

const SignupScreen = ({ navigation }) => {
	return (
		<View style={styles.containerStyle}>
			<Spacer>
				<Text
					style={{fontWeight: "bold", fontSize: 50, alignSelf: "center"}}
				>
                    LNQ
				</Text>
			</Spacer>
			<Spacer>
				<TextInput
					style={styles.inputStyle} placeholder="Name"
					autoCapitalize="none"
					autoCorrect={false}
				/>
			</Spacer>
			<Spacer>
				<TextInput
					style={styles.inputStyle} placeholder="Username"
					autoCapitalize="none"
					autoCorrect={false}
				/>
			</Spacer>
			<Spacer>
				<TextInput
					style={styles.inputStyle} placeholder="Email Address"
					autoCapitalize="none"
					autoCorrect={false}
				/>
			</Spacer>
			<Spacer>
				<TextInput
					style={styles.inputStyle} placeholder="Password"
					autoCapitalize="none"
					autoCorrect={false}
				/>
			</Spacer>
			<Spacer>
				<TextInput
					style={styles.inputStyle} placeholder="Confirm Password"
					autoCapitalize="none"
					autoCorrect={false}
				/>
			</Spacer>
			<AuthSubmit
				submitButtonTitle="Sign Up"
				navigationRoute="Login"
				routeContent="Have an account already? Sign In Here"
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	containerStyle: {
		flex: 1,
		justifyContent: "center",
		marginBottom: 30
	},
	inputStyle: {
		backgroundColor: "#eee",
		fontSize: 20,
		padding: 10,
		borderRadius: 8
	}
})

SignupScreen.propTypes = {
	navigation: PropTypes.object
}

export default SignupScreen