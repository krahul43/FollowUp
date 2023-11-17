import React, { useState, useEffect } from 'react'
import { Button, Text, View, StyleSheet, Dimensions,TouchableOpacity,Image, Platform } from "react-native";
import Modal from "react-native-modal";
import moment from 'moment';
import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const HomePopUp = ({ dataModal, reminderTime, mainData }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  let messageTitle=mainData.selectedButton
  let messageContact=mainData.selectedDropdownContact
  let description = messageTitle === 'Call' ? "Don't forget to make a call to " + messageContact + " today!"
                 : messageTitle === 'Text' ? "Send a quick text to " + messageContact + " and catch up on the latest news!"
                 : messageTitle === 'Meet' ? "Your meeting with " + messageContact + " is scheduled. Be prepared!"
                 : "Just a friendly reminder ";

  useEffect(() => {
    const checkReminderTime = () => {
      const currentTime = moment();
  
      // Check if the current time is within a small time range around the reminder time
      const timeRangeStart = reminderTime.clone().subtract(5, 'seconds'); // Adjust the range as needed
      const timeRangeEnd = reminderTime.clone().add(5, 'seconds'); // Adjust the range as needed
  
      if (currentTime.isBetween(timeRangeStart, timeRangeEnd)) {
        setModalVisible(true);
  
        // if(Platform.OS==='android'){
        PushNotification.localNotification({
          channelId: "channel-id", // (required)
          channelName: "My channel", // (required)
          title:`${messageTitle} Reminder`,
          message: description
      });
    // }
  if(Platform.OS==='ios'){
      PushNotificationIOS.addNotificationRequest({
        // channelId: "channel-id", // (required)
        // channelName: "My channel", // (required)
        alertTitle:`${messageTitle} Reminder`,
        alertBody:description,
       
      })
    }
        // Automatically close the modal after one minute (adjust as needed)
        setTimeout(() => {
          setModalVisible(false);
        }, 50000); // One minute in milliseconds
      } else {
        setModalVisible(false);
      }
    };
  
    const intervalId = setInterval(checkReminderTime, 5000); // Check every 5 seconds (adjust as needed)
    return () => clearInterval(intervalId);
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
            <View style={{  justifyContent:'center'}}>
              <TouchableOpacity onPress={()=>setModalVisible(false)} style={[styles.btn]}>
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


