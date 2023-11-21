import { StyleSheet, Text,Button,View ,Dimensions, TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";

const  Width  = Dimensions.get('window').width;

const AddDatePicker = ({onseslected}) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [timePick, setTimePick] = useState(false);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {
        onseslected(date)
        const dateString = new Date(date).toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZone: 'UTC', // Adjust the time zone as needed
        });
        setTimePick(dateString)
        hideDatePicker();
      };
  return (
    <TouchableOpacity style={styles.container} onPress={showDatePicker}>
      <Text style={styles.txt}>{timePick ? timePick:'choose Time'} </Text>
      {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </TouchableOpacity>
  )
}

export default AddDatePicker

const styles = StyleSheet.create({ 
   container: {
    width:Width*0.55,
    alignSelf:'flex-end',
    marginRight:Width*0.04,
  borderBottomWidth: 0.6,  // Adjust the width of the bottom border as needed
  borderBottomColor: 'black',  // Adjust the color of the bottom border as needed
  padding: 6,  // Adjust the padding as needed
},
txt:{
  color:'#000',
  fontSize:16,
  fontWeight:'400'
}
})