
import { Platform, StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Alert, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import ToggleSwitch from 'toggle-switch-react-native'
import DropdownItem from '../../Components/DropdownItem/DropdownItem'
import ReminderTime from '../../Components/ReminderTime/ReminderTime'
import { settingReminderTimeData } from '../../Components/StaticData/StaticData'
import Contacts from 'react-native-contacts';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBackgroundFetching } from '../../redux/reminderActions/reminderActions'
import { toggleTimeFetching } from '../../redux/reminderActions/reminderActions'
import moment from 'moment';

const Setting = ({ navigation }) => {
    const backgroundFetchingEnabled = useSelector(state => state.settings.backgroundFetchingEnabled);
    const [toggleCheckBox, setToggleCheckBox] = useState(backgroundFetchingEnabled);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [staticData, setStaticData] = useState(settingReminderTimeData);
    const [selectedTime, setSelectedTime] = useState();
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.contacts);
    const timereminder = useSelector(state => state.ToggleTime.reminderTime);

    console.log(timereminder, 'contact2222')
    console.log(staticData, 'staticData')
  
    const convertTimereminder = (timereminder) => {
        try {
          if (!timereminder) {
            throw new Error('Timereminder is undefined');
          }
    
          const targetTime = moment(timereminder);
          const currentTime = moment();
          const duration = moment.duration(targetTime.diff(currentTime));
          const minutesRemaining = duration.asMinutes();
    
          if (minutesRemaining < 0) {
            // If the target time is in the past, show the date and time
            return targetTime.format('MMMM D [at] h:mm A');
          } else if (minutesRemaining < 1440) {
            // If the target time is today, show minutes and hours remaining
            const hours = Math.floor(minutesRemaining / 60);
            const remainingMinutes = Math.round(minutesRemaining % 60);
            return `${hours} hours and ${remainingMinutes} minutes`;
          } else {
            // If the target time is in the future, show the date and time
            return targetTime.format('MMMM D [at] h:mm A');
          }
        } catch (error) {
          console.error('Error converting timereminder:', error.message);
          return null;
        }
      };
      useEffect(() => {
        const convertedTimereminder = convertTimereminder(timereminder);
        const newItem = { label: convertedTimereminder, value: convertedTimereminder };
        setSelectedTime(convertedTimereminder)
        setStaticData(prevStaticData => [...prevStaticData, newItem]);
      }, [timereminder]);

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

        return check(permission);
    };

    const requestPlatformPermission = async () => {
        const permission =
            Platform.OS === 'ios'
                ? PERMISSIONS.IOS.CONTACTS
                : PERMISSIONS.ANDROID.READ_CONTACTS;

        return request(permission);
    };

    const toggleSwitch = async (value) => {
        if (!permissionGranted) {
            const result = await requestPlatformPermission();

            if (result !== RESULTS.GRANTED) {
                Alert.alert(
                    'Permission Required',
                    'This feature requires access to your contacts. Please enable the contact permission in your device settings.',
                    [
                        { text: 'OK', onPress: () => { } }
                    ]
                );
                return; // Do not proceed if permission is not granted
            }
        }
        setToggleCheckBox(value);
        dispatch(toggleBackgroundFetching(value));
    };


    const handleDropdownReminder = (value) => {
    
 
        const currentTime = new Date();
        if (value === 'At 8pm tonight') {
            const targetTime = new Date();
            targetTime.setHours(20, 0, 0, 0);
            if (currentTime >= targetTime) {
                targetTime.setDate(targetTime.getDate() + 1);
            }
            dispatch(toggleTimeFetching(targetTime));
        } else if (value === 'At 9am tomorrow') {
            const targetTime = new Date();
            targetTime.setHours(9, 0, 0, 0);
            if (currentTime >= targetTime) {
                targetTime.setDate(targetTime.getDate() + 1);
            }
            dispatch(toggleTimeFetching(targetTime));
        } else if (value === '1 day' || value === '2 days' || value === '3 days' || value === '4 days') {
            const daysToAdd = parseInt(value);
            const targetTime = new Date(currentTime.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
            dispatch(toggleTimeFetching(targetTime)); // Change 'newTime' to 'targetTime'
        } else {
            const timeValue = parseInt(value);
            const timeUnit = value.includes('hour') ? 'hours' : 'minutes';
            const targetTime = new Date(currentTime.getTime() + timeValue * (timeUnit === 'hours' ? 60 * 60 * 1000 : 60 * 1000));
            dispatch(toggleTimeFetching(targetTime));
        }
    };


    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView>
                <View style={styles.txtMain}>
                    <View style={styles.leftContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Image
                                source={require('../../assets/previous.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.centerContainer}>
                        <Text style={styles.txt}>Settings</Text>
                    </View>
                </View>
                <View style={[styles.dptxtView, { padding: 15, marginVertical: 15 }]}>
                    <Text style={styles.toggtxt}>Auto-Create Reminder {'\n'}After Contact is Made</Text>
                    <ToggleSwitch
                        isOn={toggleCheckBox}
                        onColor="#0a8960"
                        offColor="#A9A9A9"
                        labelStyle={{ color: "black", fontWeight: "900" }}
                        size="large"
                        onToggle={value => toggleSwitch(value)}
                    />
                </View>
                <View style={styles.dptxtView}>
                    <Text style={styles.dptxt}>Reminder 1:</Text>
                    <DropdownItem dropdownData={staticData} placeholder={selectedTime} onValueChange={handleDropdownReminder} />
                </View>
                <View style={styles.dptxtView}>
                    <Text style={styles.dptxt}>Reminder 2:</Text>
                    <DropdownItem dropdownData={settingReminderTimeData} placeholder='Select Time' onValueChange={handleDropdownReminder} />
                </View>
                <View style={styles.dptxtView}>
                    <Text style={styles.dptxt}>Reminder 3:</Text>
                    <DropdownItem dropdownData={settingReminderTimeData} placeholder='Select Time' onValueChange={handleDropdownReminder} />
                </View>
                <View style={styles.dptxtView}>
                    <Text style={styles.dptxt}>Reminder 4:</Text>
                    <DropdownItem dropdownData={settingReminderTimeData} placeholder='Select Time' onValueChange={handleDropdownReminder} />
                </View>
                <View style={styles.dptxtView}>
                    <Text style={styles.dptxt}>Reminder 5:</Text>
                    <DropdownItem dropdownData={settingReminderTimeData} placeholder='Select Time' onValueChange={handleDropdownReminder} />
                </View>
                <Text style={[styles.toggtxt, { textAlign: "left", marginLeft: 25, marginTop: 50 }]}>Reminder Times</Text>
                <ReminderTime txt={'15 minutes'} />
                <ReminderTime txt={'30 minutes'} />
                <ReminderTime txt={'1 Hour'} />
                <ReminderTime txt={'2 Hour'} />
                <ReminderTime txt={'3 Hour'} />
                <ReminderTime txt={'4 Hour'} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Setting

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    txtMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 17,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        textAlign: 'center',
        fontSize: 34,
        color: '#000',
        fontWeight: '700',
        marginLeft: -27
    },
    image: {
        width: 35,
        height: 35,
    },
    dptxtView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    toggtxt: {
        textAlign: 'center',
        fontSize: 18,
        color: '#000',
        fontWeight: '700',
        marginLeft: 5
    },
    dptxt: {
        textAlign: 'center',
        fontSize: 18,
        color: '#000',
        fontWeight: '700',
        marginLeft: 40,
    },

})