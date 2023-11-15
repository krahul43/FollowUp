import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Alert,Image, Dimensions, ScrollView } from 'react-native'
import React, { useState,useEffect } from 'react'
import ToggleSwitch from 'toggle-switch-react-native'
import DropdownItem from '../../Components/DropdownItem/DropdownItem'
import ReminderTime from '../../Components/ReminderTime/ReminderTime'
import { ReminderTimeData } from '../../Components/StaticData/StaticData'
import Contacts from 'react-native-contacts';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const Setting = ({navigation}) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false);
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
  
      return check(permission);
    };
  
    const requestPlatformPermission = async () => {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CONTACTS
          : PERMISSIONS.ANDROID.READ_CONTACTS;
  
      return request(permission);
    };
  
    const openBottomSheet = async () => {
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
      setToggleCheckBox(!toggleCheckBox);
  
      // Additional logic to handle setting default reminder for existing contacts
      if (toggleCheckBox) {
        setDefaultReminderForExistingContacts();
      }
    };
  
    const setDefaultReminderForExistingContacts = async () => {
      try {
        const contacts = await getContacts();
        // Iterate through contacts and set default reminders
        contacts.forEach(async (contact) => {
          // Check if the contact already has a reminder set
          const hasReminder = await checkIfContactHasReminder(contact);
          if (!hasReminder) {
            // Set default reminder for the contact
            await setDefaultReminder(contact);
          }
        });
      } catch (error) {
        console.error('Error setting default reminders:', error);
      }
    };
  
    const getContacts = async () => {
      // Use the react-native-contacts library to fetch contacts
      return new Promise((resolve, reject) => {
        Contacts.getAll((err, contacts) => {
          if (err) {
            reject(err);
          } else {
            resolve(contacts);
          }
        });
      });
    };
  
    const checkIfContactHasReminder = async (contact) => {
      // Your logic to check if the contact already has a reminder set
      // This can involve checking a database or any other storage
      // Return true if the contact has a reminder, false otherwise
      return false;
    };
  
    const setDefaultReminder = async (contact) => {
      // Your logic to set a default reminder for the contact
      // This can involve creating a new reminder in your app
      // using the appropriate functions/methods
      console.log('Setting default reminder for contact:', contact);
    }

      const handleDropdownReminder = (value) => {
        // setSelectedDropdownReminder(value);
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
                        <Text style={styles.txt}>Reminder</Text>
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
                        onToggle={isOn => openBottomSheet(isOn)}
                    />
                </View>
                <View style={styles.dptxtView}>
                    <Text style={styles.dptxt}>Reminder 1:</Text>
                    <DropdownItem dropdownData={ReminderTimeData} placeholder='Select Time' onValueChange={handleDropdownReminder} />
                </View>
                <View style={styles.dptxtView}>
                    <Text style={styles.dptxt}>Reminder 2:</Text>
                    <DropdownItem dropdownData={ReminderTimeData} placeholder='Select Time' onValueChange={handleDropdownReminder} />
                </View>
                <View style={styles.dptxtView}>
                    <Text style={styles.dptxt}>Reminder 3:</Text>
                    <DropdownItem dropdownData={ReminderTimeData} placeholder='Select Time' onValueChange={handleDropdownReminder} />
                </View>
                <View style={styles.dptxtView}>
                    <Text style={styles.dptxt}>Reminder 4:</Text>
                    <DropdownItem dropdownData={ReminderTimeData} placeholder='Select Time' onValueChange={handleDropdownReminder} />
                </View>
                <View style={styles.dptxtView}>
                    <Text style={styles.dptxt}>Reminder 5:</Text>
                    <DropdownItem dropdownData={ReminderTimeData} placeholder='Select Time' onValueChange={handleDropdownReminder} />
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
        marginLeft:-27
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