import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';

const Splash = ({navigation}) => {
    return (
        <View style={styles.viewtxt}>
        <Animatable.Text style={styles.txt} duration={200} animation='fadeInDown'>FollowUp</Animatable.Text>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    viewtxt: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt: {
        fontSize: 38,
        fontWeight:'700',
        color: "#0a8960"
    }
})