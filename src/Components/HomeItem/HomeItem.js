
import React, { useState, createRef,useCallback } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet,Platform,Linking } from 'react-native';
import { Dimensions } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Snooze from '../Snooze/Snooze';
import ImageBox from '../ImageBox/ImageBox';
import BottomActionSheet from '../BottomActionSheet/BottomActionSheet';
import EditReminder from '../EditReminder/EditReminder';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReminder } from '../../redux/reminderActions/reminderActions';
import moment from 'moment';
import HomePopUp from '../HomePopUp/HomePopUp';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeItem = ({ item, index }) => {
    const actionSheetEditReminder = createRef()
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const dispatch = useDispatch();
   const [deletePending, setDeletePending] = useState(false);

    const handleDelete = () => {
        setDeletePending(true);
        setToggleCheckBox(!toggleCheckBox)
        setTimeout(() => {
            dispatch(deleteReminder(index));
            setDeletePending(false);
        }, 1500); 
    };
    
    const selectedDropdownReminder = item.selectedDropdownReminder; // Replace this with your time
   
    function formatTime(selectedDropdownReminder) {
        const reminderTime = moment(selectedDropdownReminder);
        let output;
        if (moment().isSame(reminderTime, 'day')) {
            output = `Today ${reminderTime.format('h:mm A')}`;
        } else if (moment().add(1, 'day').isSame(reminderTime, 'day')) {
            output = `Tomorrow ${reminderTime.format('h:mm A')}`;
        } else {
            output = reminderTime.format('MMM D, h:mm A');
        }
    
        return output;
    }
    const formattedTimeRemaining = formatTime(selectedDropdownReminder);
    const reminderTime = moment(selectedDropdownReminder);
    const textColor = moment().isAfter(reminderTime) ? 'red' : 'black';
    // const [textColor, setTextColor] = useState(moment().isAfter(reminderTime) ? 'red' : 'black');
    const modalOpen= moment().isSame(reminderTime) ? 'true' : 'false';
    
    const openContactsApp = async () => {
        // For Android
        if (Platform.OS === 'android') {
          try {
            await Linking.openURL('content://contacts/people');
      
              } catch (error) {
            console.error('Error opening contacts app:', error);
          }
        }
        // For iOS
        else if (Platform.OS === 'ios') {
          try {
            await Linking.openSettings();
             } catch (error) {
            console.error('Error opening contacts app:', error);
          }
        }
      };
      
      // Example usage
      const handlePress = useCallback(async () => {
        await openContactsApp();
      }, []);
    return (
        <>
        <View style={styles.container}>
            <TouchableOpacity style={styles.txtContainer} onPress={()=> handlePress()}>
                <ImageBox item={item} />
                <View>
                    <Text style={styles.name}>{item.selectedDropdownContact}</Text>
                    <Text style={[styles.time,{color:textColor}]}>{formattedTimeRemaining}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.buttnMain}>
                <CheckBox
                    onFillColor={{ true: '#000', false: 'red' }}
                    tintColors={{true: '#0a8960', false:  '#000'}}
                    style={{
                        transform: [{ scaleX: Platform.OS === 'ios' ? 0 : 2.1 }, { scaleY: Platform.OS === 'ios' ? 0 : 2.02 }],
                        borderColor: 'red', // replace 'yourBorderColor' with the color you want
                        borderWidth: 1, // replace 1 with the desired border width
                    }}                    boxType='square'
                    value={toggleCheckBox}
                    onValueChange={(newValue, index) =>  handleDelete() }
                />
                <Snooze TimeData={item} />
                <TouchableOpacity
                    style={[styles.touchableOpacityView, { borderColor: '#000' }]}
                    onPress={() => actionSheetEditReminder.current?.show()}
                >
                    <Image
                        source={require('../../assets/pencil.png')}
                        style={styles.anotherImage1}
                    />
                </TouchableOpacity>
                <BottomActionSheet
                    containerStyle={{
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25
                    }}
                    indicatorStyle={{
                        width: 100
                    }}
                    gestureEnabled={true}
                    ref={actionSheetEditReminder} title={'Title'}>
                    <EditReminder actionSheetEditReminder={actionSheetEditReminder}
                        reminderData={item} />

                </BottomActionSheet>
            </View>
            
        </View>
        <HomePopUp dataModal={modalOpen} reminderTime={reminderTime} mainData={item}/>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    txtContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 20, // Adjust the font size as needed
        color: '#000',
        marginLeft: 10,
        fontWeight: '600'
    },
    time: {
        fontSize: 18, // Adjust the font size as needed
        color: '#000',
        marginLeft: 10,
        fontWeight: '400'
    },
    buttnMain: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    anotherImage1: {
        width: windowWidth * 0.05,
        height: windowHeight * 0.025,
    },
    touchableOpacityView: {

        width: 35,
        height: 35,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
    },
});

export default HomeItem;
