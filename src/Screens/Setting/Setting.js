
import { Platform, StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Alert, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import ToggleSwitch from 'toggle-switch-react-native'
import DropdownItem from '../../Components/DropdownItem/DropdownItem'
import ReminderTime from '../../Components/ReminderTime/ReminderTime'
import { ReminderTimeData } from '../../Components/StaticData/StaticData'
import Contacts from 'react-native-contacts';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBackgroundFetching } from '../../redux/reminderActions/reminderActions'

const Setting = ({ navigation }) => {
    const backgroundFetchingEnabled = useSelector(state => state.settings.backgroundFetchingEnabled);
  const [toggleCheckBox, setToggleCheckBox] = useState(backgroundFetchingEnabled);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [timeAdded, setTimeAdded] = useState();
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const timeSet = useSelector(state => state.ToggleTime.reminderTime);
  
  console.log(timeSet,'contact2222')

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

  const openBottomSheet = async (value) => {
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
                        onToggle={value => openBottomSheet(value)}
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