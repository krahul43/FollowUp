
// import React, { useState, createRef } from 'react';
// import { TouchableOpacity, Text, StyleSheet } from 'react-native';
// import BottomActionSheet from '../BottomActionSheet/BottomActionSheet';
// import AddReminder from '../AddReminder/AddReminder';

// const AddButton = ({ style, onPress }) => {
//   const actionSheetBrand = createRef()
//   return (
//     <>
//       <TouchableOpacity onPress={() => actionSheetBrand.current?.show()} style={[styles.button, style]}>
//         <Text style={styles.text}>Add Reminder</Text>
//       </TouchableOpacity>
//       <BottomActionSheet 
//       containerStyle={{
//         borderTopLeftRadius:25,
//         borderTopRightRadius:25
//       }}
//       indicatorStyle={{
//         width:100
//       }}
//       gestureEnabled={true}
//       ref={actionSheetBrand} title={'Title'}
   
//       >
//         <AddReminder actionSheetBrand={actionSheetBrand}
//         />

//       </BottomActionSheet>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     padding: 10,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '700'
//   },
// });

// export default AddButton;




import React, { useState, createRef, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
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
        const result = await check(PERMISSIONS.IOS.CONTACTS);
        setPermissionGranted(result === RESULTS.GRANTED);
      } catch (error) {
        console.log("Permission check error:", error);
      }
    };
    checkContactPermission();
  }, []);

  const requestContactPermission = async () => {
    try {
      const result = await request(PERMISSIONS.IOS.CONTACTS);
      setPermissionGranted(result === RESULTS.GRANTED);
      if (result === RESULTS.GRANTED) {
        actionSheetBrand.current?.show();
      }
    } catch (error) {
      console.log("Permission request error:", error);
    }
  };

  const openBottomSheet = () => {
    if (permissionGranted) {
      actionSheetBrand.current?.show();
    } else {
      requestContactPermission();
    }
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

