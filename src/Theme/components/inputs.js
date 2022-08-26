import React from 'react'
import { View, Text, TextInput, StyleSheet} from 'react-native'

const inputs = ({ value, setvalue, placeholder, secureTextEntry }) => {
  return (
    <view style={styles.container}>
      <Text>inputs</Text>
      <TextInput
        value={value}
        onChangeText={setvalue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </view>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: 'rgba(14,142,142,0.56)',
    borderWidth: 2,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {

  }
});

export default inputs
