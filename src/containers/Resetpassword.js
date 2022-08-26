import React, { useState } from 'react'
import { emailValidator } from '../Hooks/useTheme'
import { Brand } from '@/Components'
import { Text, TouchableOpacity, TextInput } from 'react-native'
import { Common, Fonts, Gutters } from '@/Theme'

const Resetpassword = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' })

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    navigation.navigate('SignIn')
  }

  return (
    <view>
      <Brand />
      <Text>Restore Password</Text>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TouchableOpacity
        style={[Common.button.rounded, Gutters.regularBMargin]}
        onPress={() => sendResetPasswordEmail()}
      >
        <Text style={Fonts.textRegular}>send Email</Text>
      </TouchableOpacity>
    </view>
  )
}
export default Resetpassword
