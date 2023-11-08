import { StyleSheet, TouchableOpacity, Text, Image, Dimensions, View } from 'react-native'
import React from 'react'
import DropdownItem from '../DropdownItem/DropdownItem'
import AddReminderImage from '../AddReminderImage/AddReminderImage'
import AddButton from '../AddButton/AddButton'

const AddReminder = ({ actionSheetBrand }) => {
    return (
        <View>
            <TouchableOpacity onPress={() => actionSheetBrand.current?.hide()}>
                <Image
                    source={require('../../assets/close.png')}
                    style={styles.anotherImage1}
                />
            </TouchableOpacity>
            <Text style={styles.txt}>Add Reminder</Text>

            <View style={[styles.dptxtView, { marginTop: 15 }]}>
                <Text style={styles.dptxt}>Contact:</Text>
                <DropdownItem />
            </View>
            <View style={styles.dptxtView}>
                <Text style={styles.dptxt}>Reminder:</Text>
                <DropdownItem />
            </View>
            <View style={styles.imgView}>
                <AddReminderImage ReminderImage={require('../../assets/message.png')} txtHeading={'Text'} />
                <AddReminderImage ReminderImage={require('../../assets/phone-call.png')} txtHeading={'Call'} />
                <AddReminderImage ReminderImage={require('../../assets/Handshake.png')} txtHeading={'Meet'} />
            </View>
            <TouchableOpacity onPress={() => actionSheetBrand.current?.show()} style={styles.button}>
                <Text style={styles.text}>Add</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddReminder

const styles = StyleSheet.create({
    txt: {
        textAlign: 'center',
        fontSize: 27,
        color: '#000',
        fontWeight: '700'
    },
    anotherImage1: {
        width: 25,
        height: 25,
        alignSelf: 'flex-end',
        marginRight: 20,
        marginVertical: 15
    },
    dptxtView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dptxt: {
        textAlign: 'center',
        fontSize: 18,
        color: '#000',
        fontWeight: '700',
        marginLeft: 40,
    },
    imgView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 15
    },

    button: {
        backgroundColor: '#0a8960',
        width: Dimensions.get('window').width * 0.46,
        height: Dimensions.get('window').height * 0.065,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 100,
        padding: 10,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        color: 'white',
        fontSize: 24,
        fontWeight: '700'
      },
})