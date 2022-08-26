import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
} from 'react-native'
import { emailValidator } from '../Hooks/useTheme'
import { passwordValidator } from '../Hooks/useTheme'
import { nameValidator } from '../Hooks/useTheme'
import layout from '@/Theme/Layout'
import { Common, Fonts, Gutters, Layout } from '@/Theme'
import fonts from '@/Theme/Fonts'
import { auth } from '../firebase'
import { firebase } from '@/App'

const Register = ({ navigation }) => {
  const [username, setUsername] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onSignUpPressed = () => {
    const usernameError = nameValidator(username.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || usernameError) {
      setUsername({ ...username, error: usernameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'logout' }],
    })
  }
  const register = () => {
    auth
      .createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        var user = userCredential.user
        user
          .updateProfile({
            displayName: username,
          })
          .then(function () {
            alert('Registered, please login.')
          })
          .catch(function (error) {
            alert(error.message)
          })
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        alert(errorMessage)
      })
  }
  const registeruser = async (username, email, password) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: 'https://myapp-2cfc7.firebaseapp.com',
          })
          .then(() => {
            alert('verification email sent')
          })
          .catch(error => {
            alert(error.message)
          })
          .then(() => {
            firebase
              .firestore()
              .collection('users')
              .doc(firebase.auth().currentUser.uid)
              .set({
                username,
                email,
                password,
              })
          })
          .catch(error => {
            alert(error.message)
          })
          .catch(error => {
            alert(error.message)
          })
      })
  }
  return (
    <View>
      <Text>Create Account</Text>
      <TextInput
        label="username"
        returnKeyType="next"
        value={username}
        onChangeText={text => setUsername({ value: text, error: '' })}
        error={!!username.error}
        errorText={username.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        style={[Layout.fill, Common.textInput]}
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        style={[Layout.fill, Common.textInput]}
      />
      <TouchableOpacity
        mode="contained"
        onPress={() => registeruser(username, email, password)}
        style={[Common.buttons.rounded, Gutters.regularBMargin]}
      >
        <Text style={Fonts.textRegular}>Sign Up</Text>
      </TouchableOpacity>
      <View style={[layout.row, Gutters.regularTMargin]}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('SignIn')}>
          <Text style={fonts.titleRegular}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default Register
