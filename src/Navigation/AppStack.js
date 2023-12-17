

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../Screens/Splash/Splash';
import BottomTab from './BottomTab'
import Home from '../Screens/Home/Home';
import Setting from '../Screens/Setting/Setting';
import Onboarding from '../Screens/Onboarding/Onboarding';

const Stack = createNativeStackNavigator();

const AppStack = ({ navigation }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(null);

  useEffect(() => {
    const checkFirstTimeUser = async () => {
      try {
        const appData = await AsyncStorage.getItem('isAppFirstLaunched');
        setIsFirstTimeUser(appData === null);

        // Hide the splash screen after some time
        setTimeout(() => {
          setShowSplash(false);
        }, 2000); // Adjust the time as needed
      } catch (error) {
        console.error('Error checking first-time user:', error);
      }
    };

    checkFirstTimeUser();
  }, []);

  if (showSplash) {
    return <Splash navigation={navigation} />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isFirstTimeUser ? (
        <>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Home" component={Home} />  
        <Stack.Screen name="Setting" component={Setting} />
        </> 
      ) : (
        <>
        <Stack.Screen name="Home" component={Home} />  
        <Stack.Screen name="Setting" component={Setting} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppStack;
