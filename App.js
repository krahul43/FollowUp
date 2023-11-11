import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import AppStack from './src/Navigation/AppStack'
import { Provider } from 'react-redux'
import store, { persistor } from './src/redux/store/store'
import { PersistGate } from 'redux-persist/integration/react';


const App = () => {
  return (
    <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer>
     <AppStack/>
    </NavigationContainer>
    </PersistGate>
    </Provider>
    </>
  )
}

export default App

const styles = StyleSheet.create({})