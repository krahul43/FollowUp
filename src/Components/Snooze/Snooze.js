import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateReminder } from '../../redux/reminderActions/reminderActions';

const Snooze = ({TimeData}) => {
    const [boxColor, setBoxColor] = useState('#000');
   
    const [timeAdded, setTimeAdded] = useState(null);
    const dispatch = useDispatch();

  const handlePress = () => {
    let TimeSnoozeAdd='1 hour'
    const timeValue = parseInt(TimeSnoozeAdd);
    const timeUnit = TimeSnoozeAdd.includes('hour') ? 'hours' : 'minutes';

    const currentTime = new Date(TimeData.selectedDropdownReminder);
    const newTime = new Date(currentTime.getTime() + timeValue * (timeUnit === 'hours' ? 60 * 60 * 1000 : 60 * 1000));

    setTimeAdded(newTime);
    setBoxColor('#c4ff4d');
  };

  useEffect(() => {
    if (timeAdded) {
      dispatch(updateReminder(TimeData.id, TimeData.selectedButton, TimeData.selectedDropdownContact, timeAdded));
    }
  }, [timeAdded, dispatch]);


    return (
      <TouchableOpacity
        style={[styles.touchableOpacityView, { borderColor: boxColor }]}
        onPress={handlePress}
      >
        <Text style={styles.text}>+1</Text>
      </TouchableOpacity>

    )
}

export default Snooze

const styles = StyleSheet.create({

      touchableOpacityView: {
        marginLeft:8,
        marginRight:8,
        width: 39,
        height: 35,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
      },
      text: {
        fontSize: 24,
        color:'#000',
        fontWeight:'600'
      },
})