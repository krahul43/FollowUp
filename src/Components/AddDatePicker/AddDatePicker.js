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
        onseslected(date);
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

        const formattedDate = new Date(date).toLocaleDateString('en-US', dateOptions);
        const formattedTime = new Date(date).toLocaleTimeString('en-US', timeOptions);

        const dateString = `${formattedDate} ${formattedTime}`;
        setTimePick(dateString);
        hideDatePicker();
    };
  return (
    <TouchableOpacity style={styles.container} onPress={showDatePicker}>
      <Text style={styles.txt}>{timePick ? timePick:'choose Time'} </Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
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