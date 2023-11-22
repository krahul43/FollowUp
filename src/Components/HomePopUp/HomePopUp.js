import React, { useState, useEffect } from 'react'
import { Button, Text, View, StyleSheet, Dimensions, TouchableOpacity, Image, Platform } from "react-native";
import Modal from "react-native-modal";
import moment from 'moment';
import notifee, { AuthorizationStatus } from '@notifee/react-native';

const HomePopUp = ({ dataModal, reminderTime, mainData }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  let messageTitle = mainData.selectedButton
  let messageContact = mainData.selectedDropdownContact
  let description = messageTitle === 'Call' ? "Don't forget to make a call to " + messageContact + " today!"
    : messageTitle === 'Text' ? "Send a quick text to " + messageContact + " and catch up on the latest news!"
      : messageTitle === 'Meet' ? "Your meeting with " + messageContact + " is scheduled. Be prepared!"
        : "Just a friendly reminder ";


        useEffect(() => {
          const requestUserPermission = async () => {
            try {
              const settings = await notifee.requestPermission();
        
              if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
                // console.log('Permission settings:', settings);
              } else {
                // console.log('User declined permissions');
              }
            } catch (error) {
              // console.error('Error requesting permission:', error);
            }
          };
        
          const setupNotificationPermissions = async () => {
            await requestUserPermission();
        
            try {
              await notifee.requestPermission({
                sound: true,
                announcement: true,
                inAppNotificationSettings: true,
                // ... other permission settings
              });
            } catch (error) {
              // console.error('Error setting up notification permissions:', error);
            }
          };
        
          setupNotificationPermissions();
        
          // Return a cleanup function (clearInterval requires an interval ID)
          
        }, []);
        



  useEffect(() => {
    const checkReminderTime = async() => {
      const currentTime = moment();

      // Check if the current time is within a small time range around the reminder time
      const timeRangeStart = reminderTime.clone().subtract(5, 'seconds'); // Adjust the range as needed
      const timeRangeEnd = reminderTime.clone().add(5, 'seconds'); // Adjust the range as needed

      if (currentTime.isBetween(timeRangeStart, timeRangeEnd)) {
        setModalVisible(true);

        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        })

        // Trigger the notification using notifee
        notifee.displayNotification({
          title: `FollowUp ${messageTitle} Reminder`,
          body: description,
          android: {
            channelId,// Specify your channel ID
            // smallIcon: 'name-of-a-small-icon', // Specify the small icon
            pressAction: {
              id: 'default',
            },
          },
        });

        // Automatically close the modal after one minute (adjust as needed)
        setTimeout(() => {
          setModalVisible(false);
        }, 50000); // One minute in milliseconds
      } else {
        setModalVisible(false);
      }
    };

    const intervalId = setInterval(checkReminderTime, 5000); // Check every 5 seconds (adjust as needed)

    return () => clearInterval(intervalId); // Cleanup function
  }, [dataModal, reminderTime]);


  return (

    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ alignItems: 'center' }}>
              <Image source={require('../../assets/modalcon.png')} style={{ height: 140, width: 140, }} />
            </View>
            <Text style={styles.modalText}>{description} </Text>
            <View style={{ justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.btn]}>
                <Text style={styles.text}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
export default HomePopUp
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000ff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 28,
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    marginVertical: 10
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    opacity: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff3385',
    width: Dimensions.get('window').width * 0.38,
    height: Dimensions.get('window').height * 0.05,
    alignSelf: 'center'
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600'
  },
});


