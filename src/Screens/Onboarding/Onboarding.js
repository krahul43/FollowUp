
import { View, Text, Image, StyleSheet, StatusBar,PermissionsAndroid,Alert,Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import AppIntroSlider from "react-native-app-intro-slider";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const slides = [
  {
    id: 1,
    title: ' Never forget important tasks and appointments with our reminder app.',
    image: require('../../assets/5.jpg')
  },
  {
    id: 2,
    title: 'Keep track of tasks, appointments, and events effortlessly.',
    image: require('../../assets/6.jpg')
  },
  {
    id: 3,
    title: 'Create, manage, and receive reminders in one place.',
    image: require('../../assets/3.jpg')
  }
]

const Onboarding = ({ navigation }) => {
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const checkContactPermission = async () => {
      try {
        const result = await checkPlatformPermission();
        setPermissionGranted(result === RESULTS.GRANTED);
      } catch (error) {
        console.log("Permission check error:", error);
      }
    };

    checkContactPermission();
  }, []);

  const checkPlatformPermission = async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CONTACTS
        : PERMISSIONS.ANDROID.READ_CONTACTS;

    const result = await check(permission);
    return result;
  };

  const requestPlatformPermission = async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CONTACTS
        : PERMISSIONS.ANDROID.READ_CONTACTS;

    const result = await request(permission);
    return result;
  };
  const nextbtn = async () => {
    console.log("Next button pressed");
    if (!permissionGranted) {
      const result = await requestPlatformPermission();

      if (result !== RESULTS.GRANTED) {
        // Show alert only if the permission is denied
        Alert.alert(
          'Permission Required',
          'This feature requires access to your contacts. Please enable the contact permission in your device settings.',
          [
            { text: 'OK', onPress: () => {} }
          ]
        );
        return; // Do not proceed if permission is not granted
      }
    }

    // Permission has been granted at this point
    setPermissionGranted(true);
    navigation.navigate("Home")
    AsyncStorage.setItem('isAppFirstLaunched','true') 
  };


  StatusBar.setBarStyle('light-content', true);

  const buttonLabel = (label) => {
    return (
      <View style={{
        backgroundColor: "#0a8960",
        padding: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
      }}>
        <Text style={{
          color: "#fff"
        }}>
          {label}
        </Text>
      </View>
    )
  }

  return (
    <AppIntroSlider
      data={slides}
      renderItem={({ item }) => {
        return (
          <View style={{
            flex: 1,
            alignItems: 'center',
            padding: 25,
            backgroundColor: '#fff'
          }}>
            <Image
              source={item.image}
              style={{
                width: 310,
                height: 310,
                flex: 4
              }}
              resizeMode="contain"
            />
            <Text style={{
              color: "#0a8960",
              fontWeight: "600",
              fontSize: 20,
              textAlign: 'center',
              flex: 2
            }}>
              {item.title}
            </Text>
          </View>
        )
      }}
      activeDotStyle={{
        backgroundColor: '#0a8960',
        width: 24,
        marginBottom: 160
      }}
      dotStyle={{
        marginBottom: 160,
        backgroundColor: '#808080',
      }}
      showSkipButton
      renderNextButton={() => buttonLabel("Next")}
      renderSkipButton={() => buttonLabel("Skip")}
      renderDoneButton={() => buttonLabel("Next")}
      onSkip={nextbtn}
      onDone={nextbtn}

    />
  )
}

export default Onboarding