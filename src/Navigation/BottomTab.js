
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home/Home';
import Setting from '../Screens/Setting/Setting';

const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Setting" component={Setting} />
      {/* <Tab.Screen name="Contact" component={Contact} /> */}
    </Tab.Navigator>
  )
}

export default BottomTab

const styles = StyleSheet.create({})