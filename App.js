import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import AppStack from './src/Navigation/AppStack'

const App = () => {
  return (
    <>
    <NavigationContainer>
     <AppStack/>
    </NavigationContainer>
    </>
  )
}

export default App

const styles = StyleSheet.create({})