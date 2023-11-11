import { StyleSheet, TouchableOpacity, Text, Image, Dimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropdownItem from '../DropdownItem/DropdownItem'
import AddReminderImage from '../AddReminderImage/AddReminderImage'
import Contacts from 'react-native-contacts';
import { ReminderTimeData } from '../StaticData/StaticData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import { addReminder } from '../../redux/reminderActions/reminderActions';

const AddReminder = ({ actionSheetBrand }) => {
    const [contacts, setContacts] = useState([]);
    const [selectedButton, setSelectedButton] = useState(null);
    const [selectedDropdownContact, setSelectedDropdownContact] = useState(null);
    const [selectedDropdownReminder, setSelectedDropdownReminder] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        Contacts.getAll().then(contacts => {
            setContacts(contacts);
        });
    }, []);
    const contactNames = contacts.map((contact) => {
        const givenName = contact.givenName || '';
        const familyName = contact.familyName || '';
        const fullName = [givenName, familyName].filter(Boolean).join(' ');
        return fullName.trim();
    });

    const ConactData = contactNames
        ? contactNames.map((name) => ({
            label: name,
            value: name,
        }))
        : [];
    const handleDropdownReminder = (value) => {
        setSelectedDropdownReminder(value);
        // console.log('Selected Dropdown Value:', value);
    };
    const handleDropdownContact = (value) => {
        setSelectedDropdownContact(value);
        // console.log('Selected Dropdown Value:', value);
    };

    const handleButtonSelect = (button) => {
        if (selectedButton === button) {
            setSelectedButton(null);
            // console.log('Selected Button: None');
        } else {
            setSelectedButton(button);
            // console.log('Selected Button:', button);
        }
    };

      const handleSaveToStorage = () => {
        dispatch(addReminder(selectedButton, selectedDropdownContact, selectedDropdownReminder));
        // Dispatches an action to add the reminder to the Redux store
      };
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
                <DropdownItem dropdownData={ConactData} onValueChange={handleDropdownContact} />
            </View>
            <View style={styles.dptxtView}>
                <Text style={styles.dptxt}>Reminder:</Text>
                <DropdownItem dropdownData={ReminderTimeData} onValueChange={handleDropdownReminder} />
            </View>
            <View style={styles.imgView}>
                <AddReminderImage
                    ReminderImage={require('../../assets/message.png')}
                    txtHeading={'Text'}
                    onSelect={() => handleButtonSelect('Text')}
                    isSelected={selectedButton === 'Text'}
                />
                <AddReminderImage
                    ReminderImage={require('../../assets/phone-call.png')}
                    txtHeading={'Call'}
                    onSelect={() => handleButtonSelect('Call')}
                    isSelected={selectedButton === 'Call'}
                />
                <AddReminderImage
                    ReminderImage={require('../../assets/Handshake.png')}
                    txtHeading={'Meet'}
                    onSelect={() => handleButtonSelect('Meet')}
                    isSelected={selectedButton === 'Meet'}
                />
            </View>
            {selectedButton !== null && selectedDropdownContact !== null && selectedDropdownReminder !== null && (
            <TouchableOpacity onPress={() => {handleSaveToStorage(),actionSheetBrand.current?.hide() }} style={styles.button}>
                <Text style={styles.text}>Add</Text>
            </TouchableOpacity>
             )}
            <View style={{marginBottom:150}} />
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
        // marginBottom: 100,
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
