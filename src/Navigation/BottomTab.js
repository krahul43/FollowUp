
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home/Home';
import Contact from '../Screens/Contact/Contact';

const Tab = createBottomTabNavigator();
const BottomTab = () => {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Contact" component={Contact} />
    </Tab.Navigator>
  )
}

export default BottomTab

const styles = StyleSheet.create({})