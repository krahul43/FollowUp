import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import AppStack from './src/Navigation/AppStack'
import { Provider } from 'react-redux'
import { store } from './src/redux/store/store'

const App = () => {
  return (
    <>
    <Provider store={store}>
    <NavigationContainer>
     <AppStack/>
    </NavigationContainer>
    </Provider>
    </>
  )
}

export default App

const styles = StyleSheet.create({})