import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native"
import AppStack from './src/Navigation/AppStack'
import { Provider } from 'react-redux'
import store, { persistor } from './src/redux/store/store'
import { PersistGate } from 'redux-persist/integration/react';
import BackgroundService from 'react-native-background-actions';

const App = () => {


  const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

  // You can do anything in your task such as network requests, timers and so on,
  // as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
  // React Native will go into "paused" mode (unless there are other tasks running,
  // or there is a foreground app).
  const veryIntensiveTask = async (taskDataArguments) => {
    // Example of an infinite loop task
    const { delay } = taskDataArguments;
    await new Promise(async (resolve) => {
      for (let i = 0; BackgroundService.isRunning(); i++) {
        console.log(i);
        await sleep(delay);
      }
    });
  };

  const options = {
    taskName: 'Example',
    taskTitle: 'FollowUp',
    taskDesc: 'FollowUp Running',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
      delay: 1000,
    },
  };
  const startBackgroundService = async () => {
    await BackgroundService.start(veryIntensiveTask, options);
    await BackgroundService.updateNotification({ taskDesc: 'FollowUp Running' });
    // iOS will also run everything here in the background until .stop() is called
    // await BackgroundService.stop();
  };
  useEffect(() => {
    startBackgroundService();
    return async () => {
      // Clean up tasks if needed
      await BackgroundService.stop();
    };
  }, []);



  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <AppStack />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App

const styles = StyleSheet.create({})