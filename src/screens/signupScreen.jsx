import React from "react"
import { View, Text, StyleSheet, TextInput } from "react-native"
import Spacer from '../components/Spacer'
import AuthSubmit from '../components/AuthSubmit'

const SignupScreen = ({ navigation }) => {
    return (
        <View style={styles.containerStyle}>
            <Spacer>
                <Text style={{fontWeight: 'bold', fontSize: 50, alignSelf: 'center'}}>LNQ</Text>
            </Spacer>
            <Spacer>
                <TextInput style={styles.inputStyle} placeholder="Name" />
            </Spacer>
            <Spacer>
                <TextInput style={styles.inputStyle} placeholder="Username" />
            </Spacer>
            <Spacer>
                <TextInput style={styles.inputStyle} placeholder="Email Address" />
            </Spacer>
            <Spacer>
                <TextInput style={styles.inputStyle} placeholder="Password" />
            </Spacer>
            <Spacer>
                <TextInput style={styles.inputStyle} placeholder="Confirm Password" />
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

export default SignupScreen