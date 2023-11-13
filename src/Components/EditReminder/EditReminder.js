import { StyleSheet, TouchableOpacity, Text, Image, Dimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropdownItem from '../DropdownItem/DropdownItem'
import AddReminderImage from '../AddReminderImage/AddReminderImage'
import Contacts from 'react-native-contacts';
import { ReminderTimeData } from '../StaticData/StaticData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { updateReminder } from '../../redux/reminderActions/reminderActions';

const EditReminder = ({ actionSheetEditReminder, reminderData }) => {
    const [contacts, setContacts] = useState([]);
    const [selectedButton, setSelectedButton] = useState(reminderData.selectedButton);
    const [selectedDropdownContact, setSelectedDropdownContact] = useState(reminderData.selectedDropdownContact);
    const [selectedDropdownReminder, setSelectedDropdownReminder] = useState(reminderData.selectedDropdownReminder);
    const [timeAdded, setTimeAdded] = useState(null);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (reminderData) {
    //         setSelectedButton(reminderData.selectedButton);
    //         setSelectedDropdownContact(reminderData.selectedDropdownContact);

    //         const currentTime = new Date().getTime();
    //         const reminderTimeString = reminderData.selectedDropdownReminder;

    //         // Assuming reminderTimeString is in format '3:28:29 PM'
    //         const reminderDate = new Date();
    //         const [time, period] = reminderTimeString.split(' '); // Split time and AM/PM
    //         const [hours, minutes, seconds] = time.split(':').map(num => parseInt(num)); // Extract hours, minutes, and seconds

    //         let hour = hours;
    //         if (period === 'PM' && hours !== 12) {
    //             hour += 12; // Convert to 24-hour format if PM (except for 12 PM)
    //         } else if (period === 'AM' && hours === 12) {
    //             hour = 0; // Convert 12 AM to 0 hours
    //         }

    //         reminderDate.setHours(hour, minutes, seconds, 0);

    //         const reminderTime = reminderDate.getTime();

    //         // Calculate the remaining time using the obtained reminderTime and currentTime
    //         const timeDifference = reminderTime - currentTime;

    //         const remainingTime = timeDifference > 0 ? timeDifference : 0;

    //         // You can format remainingTime as needed for display
    //         const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
    //         const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

    //         const selectedReminderInterval = remainingHours > 0 ? `${remainingHours} hours` : '';
    //         const minutesText = remainingMinutes > 0 ? `${remainingMinutes} minutes` : '';

    //         setSelectedDropdownReminder(selectedReminderInterval + (selectedReminderInterval && minutesText ? ' and ' : '') + minutesText);
    //     }
    // }, [reminderData]);




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

    const handleDropdownContact = (value) => {
        setSelectedDropdownContact(value);
        // console.log('Selected Dropdown Value:', value);
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
        } else if (value === 'At 9am tomorrow') {
            const targetTime = new Date();
            targetTime.setHours(9, 0, 0, 0); // Set the target time to 9 AM

            // If the current time is later than 9 AM, add a day
            if (currentTime >= targetTime) {
                targetTime.setDate(targetTime.getDate() + 1);
            }
            setTimeAdded(targetTime);
        } else if (value === '1 day' || value === '2 days' || value === '3 days' || value === '4 days') {
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
        dispatch(
            updateReminder(reminderData.id, selectedButton, selectedDropdownContact, timeAdded)
        );
    };
    return (
        <View>
            <TouchableOpacity onPress={() => actionSheetEditReminder.current?.hide()}>
                <Image
                    source={require('../../assets/close.png')}
                    style={styles.anotherImage1}
                />
            </TouchableOpacity>
            <Text style={styles.txt}>Edit Reminder</Text>

            <View style={[styles.dptxtView, { marginTop: 15 }]}>
                <Text style={styles.dptxt}>Contact:</Text>
                <DropdownItem dropdownData={ConactData} placeholder='Select Contact' onValueChange={handleDropdownContact}
                    Editvalue={selectedDropdownContact} />
            </View>
            <View style={styles.dptxtView}>
                <Text style={styles.dptxt}>Reminder:</Text>
                <DropdownItem dropdownData={ReminderTimeData}
                    placeholder='Select Time'
                    onValueChange={handleDropdownReminder}
                    Editvalue={selectedDropdownReminder} />
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
            {selectedButton !== null && selectedDropdownContact !== null && timeAdded !== null && (
                <TouchableOpacity onPress={() => { handleSaveToStorage(), actionSheetEditReminder.current?.hide() }} style={styles.button}>
                    <Text style={styles.text}>Save</Text>
                </TouchableOpacity>
            )}
            <View style={{ marginBottom: 150 }} />
        </View>
    )
}

export default EditReminder

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
