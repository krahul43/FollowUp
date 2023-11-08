import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'

const Snooze = () => {

    const [count, setCount] = useState(0);
    const [boxColor, setBoxColor] = useState('#000');
  
    const handlePress = () => {
      setCount(count + 1);
      setBoxColor('#000'); // Change the border color when clicked
    };

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
        fontWeight:'600'
      },
})