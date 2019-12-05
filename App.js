import React from "react"
// Navigators
import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator } from "react-navigation-tabs"
import { setNavigator } from "./src/navigationRef"
import { Provider as AuthProvider } from "./src/context/AuthContext"

// Screens
import LoginScreen from "@screens/loginScreen"
import SignupScreen from "@screens/signupScreen"
import HomeScreen from "@screens/homeScreen"
import ProfileScreen from "@screens/profileScreen"
import CreateScreen from "@screens/createScreen"

// Services
import { initializeFirebase } from "@services/firebase"

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
	initializeFirebase()

	// setNavigator ref will allow us to use navigate in Context once async function is resolved
	return (
		<AuthProvider>
			<App ref={navigator => setNavigator(navigator)} />
		</AuthProvider>
	)
}

