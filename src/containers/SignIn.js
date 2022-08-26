import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Brand } from '@/Components'
import { useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import layout from '@/Theme/Layout'
import common from '@/Theme/Common'
import { passwordValidator } from '../Hooks/useTheme'
import { nameValidator } from '../Hooks/useTheme'
import * as utils from '../Navigators/utils'

const signIn = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { Common, Fonts, Gutters, Layout } = useTheme()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [username, setUsername] = useState({ value: '', error: '' })
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [password, setPassword] = useState({ value: '', error: '' })
  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLazyFetchOneQuery()

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetchOne(username)
  }, [fetchOne, username])
  const signInPressed = () => {
    const usernameError = nameValidator(username.value)
    const passwordError = passwordValidator(password.value)
    let emailError
    if (emailError || passwordError) {
      setUsername({ ...username, error: usernameError })
      setPassword({ ...password, error: passwordError })
      return
    }
    utils.navigateAndReset({ name: 'logout' })
  }
  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[
        Layout.fill,
        Layout.colCenter,
        Gutters.smallHPadding,
      ]}
    >
      <View style={[[Layout.colCenter, Gutters.smallHPadding]]}>
        <Brand />
        {(isLoading || isFetching) && <ActivityIndicator />}
        {!isSuccess ? (
          <Text style={Fonts.textRegular}>{error}</Text>
        ) : (
          <Text style={Fonts.textRegular}>
            {t('example.helloUser', { name: data?.name })}
          </Text>
        )}
      </View>
      <View
        style={[
          Layout.row,
          Layout.rowHCenter,
          Gutters.smallHPadding,
          Gutters.largeVMargin,
          Common.backgroundPrimary,
        ]}
      >
        <Text style={[Layout.fill, Fonts.textCenter, Fonts.textSmall]}>
          {t('example.labels.username')}
        </Text>
        <TextInput
          onChangeText={setUsername}
          editable={!isLoading}
          keyboardType={'default'}
          maxLength={8}
          value={username}
          selectTextOnFocus
          style={[Layout.fill, Common.textInput]}
        />
        <TextInput
          onChangeText={setPassword}
          editable={!isLoading}
          keyboardType={'default'}
          maxLength={8}
          value={password}
          selectTextOnFocus
          style={[Layout.fill, Common.textInput]}
        />
      </View>
      <Text style={[Fonts.textRegular, Gutters.smallBMargin]}>DarkMode :</Text>
      <View style={[layout.rowf, layout.fullWidth]}>
        <TouchableOpacity
          style={[Common.button.rounded, Gutters.regularBMargin]}
          onPress={() => signInPressed()}
        >
          <Text style={Fonts.textRegular}>sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => utils.navigate('Resetpassword')}>
          <Text style={[common.secondary]}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <View style={layout.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity
          onPress={() => utils.navigateAndSimpleReset('Register')}
        >
          <Text style={[Fonts.textRegular]}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default signIn
