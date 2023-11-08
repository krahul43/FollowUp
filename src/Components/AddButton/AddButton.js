
import React, { useState, createRef } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import BottomActionSheet from '../BottomActionSheet/BottomActionSheet';
import AddReminder from '../AddReminder/AddReminder';

const AddButton = ({ style, onPress }) => {
  const actionSheetBrand = createRef()
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  return (
    <>
      <TouchableOpacity onPress={() => actionSheetBrand.current?.show()} style={[styles.button, style]}>
        <Text style={styles.text}>Add Reminder</Text>
      </TouchableOpacity>
      <BottomActionSheet 
      containerStyle={{
        borderTopLeftRadius:25,
        borderTopRightRadius:25
      }}
      indicatorStyle={{
        width:100
      }}
      gestureEnabled={true}
      ref={actionSheetBrand} title={'Title'}
   
      >
        <AddReminder actionSheetBrand={actionSheetBrand}
        />

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
