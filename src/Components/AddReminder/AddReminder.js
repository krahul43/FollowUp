import { StyleSheet, TouchableOpacity, Text, Image, Dimensions, PermissionsAndroid,View } from 'react-native'
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
    const [timeAdded, setTimeAdded] = useState(null);
    console.log(contacts,'comtacts')
    const dispatch = useDispatch();
    useEffect(() => {
        Contacts.checkPermission().then(permission => {
          console.log('Permission status:', permission);
          if (permission === 'authorized') {
            Contacts.getAll()
              .then(contacts => {
                console.log('contacts -> ', contacts);
                setContacts(contacts);
              })
              .catch(err => {
                console.warn('Error fetching contacts:', err);
              });
          } else {
            console.warn('Permission to access contacts was not granted');
          }
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
 
    const handleDropdownContact = (value) => {
        setSelectedDropdownContact(value);
    };
    const handleDropdownReminder = (value) => {
        setSelectedDropdownReminder(value);
        const currentTime = new Date();    
        if (value === 'At 8pm tonight') {
            const targetTime = new Date();
            targetTime.setHours(20, 0, 0, 0); // Set the target time to 8 PM
            // If the current time is later than 8 PM, add a day
            if (currentTime >= targetTime) {
                targetTime.setDate(targetTime.getDate() + 1);
            }
            setTimeAdded(targetTime);
        }else if (value === 'At 9am tomorrow') {
            const targetTime = new Date();
            targetTime.setHours(9, 0, 0, 0); // Set the target time to 9 AM
    
            // If the current time is later than 9 AM, add a day
            if (currentTime >= targetTime) {
                targetTime.setDate(targetTime.getDate() + 1);
            }
            setTimeAdded(targetTime);
        }else if (value === '1 day' || value === '2 days' || value === '3 days' || value === '4 days') {
            const daysToAdd = parseInt(value); // Extract the number of days to add
            const targetTime = new Date(currentTime.getTime() + daysToAdd * 24 * 60 * 60 * 1000); // Add days in milliseconds
            setTimeAdded(targetTime);
        } else {
            // Handle other time intervals (e.g., minutes, hours)
            const timeValue = parseInt(value);
            const timeUnit = value.includes('hour') ? 'hours' : 'minutes';
            const newTime = new Date(currentTime.getTime() + timeValue * (timeUnit === 'hours' ? 60 * 60 * 1000 : 60 * 1000));
            setTimeAdded(newTime);
        }
    };

  
    const handleButtonSelect = (button) => {
        if (selectedButton === button) {
            setSelectedButton(null);
        } else {
            setSelectedButton(button);
        }
    };

      const handleSaveToStorage = () => {
        dispatch(addReminder(selectedButton, selectedDropdownContact, timeAdded));
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
                <DropdownItem dropdownData={ConactData} placeholder='Select Contact' onValueChange={handleDropdownContact} />
            </View>
            <View style={styles.dptxtView}>
                <Text style={styles.dptxt}>Reminder:</Text>
                <DropdownItem dropdownData={ReminderTimeData} placeholder='Select Time' onValueChange={handleDropdownReminder} />
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
