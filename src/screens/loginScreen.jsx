import React from "react"
import { View, Text, StyleSheet, TextInput } from "react-native"
import { Input } from 'react-native-elements'
import AuthSubmit from '../components/AuthSubmit'
import Spacer from "../components/Spacer"

const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.containerStyle}>
            <Spacer>
                <Text style={{fontWeight: 'bold', fontSize: 50, alignSelf: 'center'}}>LNQ</Text>
            </Spacer>
            <Spacer>
                <Input
                    inputStyle={styles.inputStyle}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    placeholder="Email"
                />
            </Spacer>
            <Spacer>
                <Input
                    inputStyle={styles.inputStyle}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    placeholder="Email"
                />
            </Spacer>
            <AuthSubmit
                submitButtonTitle="Login"
                navigationRoute="Signup"
                routeContent="New user? Sign up here"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 30
    },
    inputStyle: {
        backgroundColor: '#eee',
        fontSize: 20,
        padding: 10,
        borderRadius: 8
    }
})

export default LoginScreen