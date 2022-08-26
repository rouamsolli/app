import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import signIn from '@/Containers/SignIn'
import { SignIn } from '@/Containers'
const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="sign"
        component={SignIn}
        options={{
          tabBarIconStyle: { display: 'none' },
          tabBarLabelPosition: 'beside-icon',
        }}
      />
    </Tab.Navigator>
  )
}

export default MainNavigator
