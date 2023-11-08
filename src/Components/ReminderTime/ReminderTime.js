import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

const ReminderTime = ({txt}) => {
    return (
        <View style={styles.viewControl}>
            <Image
                source={require('../../assets/pencil.png')}
                style={styles.anotherImage1}
            />
            <Text style={styles.timetxt}>{txt}</Text>
        </View>
    )
}

export default ReminderTime

const styles = StyleSheet.create({
    viewControl:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"flex-start",
        marginHorizontal:50,
        marginVertical:8
    },
    anotherImage1: {
        width: 22,
        height: 22,
    },
    timetxt:{
        textAlign: 'center',
        fontSize: 15,
        color: '#000',
        fontWeight: '500',
        marginLeft:10,
    },
})