
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import AppIntroSlider from "react-native-app-intro-slider";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const Welcome = ({ navigation }) => {


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
      onSkip={() => navigation.navigate("Onboarding")}
      onDone={() => navigation.navigate("Onboarding")}

    />
  )
}

export default Welcome