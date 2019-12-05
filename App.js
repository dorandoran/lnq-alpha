import React from "react"
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from "react-navigation-tabs"
import { setNavigator } from "./src/navigationRef"
import { Provider as AuthProvider } from "./src/context/AuthContext"

import LoginScreen from "./src/screens/loginScreen"
import SignupScreen from "./src/screens/signupScreen"
import HomeScreen from "./src/screens/homeScreen"
import ProfileScreen from "./src/screens/profileScreen"
import CreateScreen from "./src/screens/createScreen"

const switchNavigator = createSwitchNavigator({
	authFlow: createStackNavigator({
		Login: LoginScreen,
		Signup: SignupScreen
	}),
	mainFlow: createBottomTabNavigator({
		Home: HomeScreen,
		Profile: ProfileScreen,
		Create: CreateScreen,
	})
})

const App = createAppContainer(switchNavigator)

export default () => {
	// setNavigator ref will allow us to use navigate in Context once async function is resolved
	return (
		<AuthProvider>
			<App ref={navigator => setNavigator(navigator)} />
		</AuthProvider>
	)
}