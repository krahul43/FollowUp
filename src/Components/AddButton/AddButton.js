import React, { useState, createRef, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert, PermissionsAndroid,Platform } from 'react-native';
import BottomActionSheet from '../BottomActionSheet/BottomActionSheet';
import AddReminder from '../AddReminder/AddReminder';
import Contacts from 'react-native-contacts';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const AddButton = ({ style, onPress }) => {
  const actionSheetBrand = createRef();
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

    const result = await check(permission);
    return result;
  };

  const requestPlatformPermission = async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CONTACTS
        : PERMISSIONS.ANDROID.READ_CONTACTS;

    const result = await request(permission);
    return result;
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
    setPermissionGranted(true);
    actionSheetBrand.current?.show();
  };

  return (
    <>
      <TouchableOpacity onPress={openBottomSheet} style={[styles.button, style]}>
        <Text style={styles.text}>Add Reminder</Text>
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
        ref={actionSheetBrand} 
        title={'Title'}
      >
        <AddReminder actionSheetBrand={actionSheetBrand} />
      </BottomActionSheet>
    </>
  );
};


const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700'
  },
});

export default AddButton;




