import React from 'react'
import { Brand } from '@/Components'
import { TouchableOpacity, Text, View } from 'react-native'
import * as utils from '../Navigators/utils'

const logout = () => {
  return (
    <View>
      <Brand />
      <Text>Let’s start</Text>
      <TouchableOpacity
        onPress={() => utils.navigateAndReset({ name: 'SignIn' })}
      >
        Logout
      </TouchableOpacity>
    </View>
  )
}
export default logout
