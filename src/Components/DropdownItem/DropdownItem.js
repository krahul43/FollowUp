import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { Dropdown } from 'react-native-element-dropdown';

const DropdownItem = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
      ];
  return (
    <View style={styles.dpView}>
      <Dropdown
        style={styles.dropdown}
        containerStyle={{
            overflow: 'hidden', // <- here
            borderRadius: 30, // <- for instance
          }}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        // search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Time"
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
       
      />

    </View>
  )
}

export default DropdownItem

const styles = StyleSheet.create({
      dpView:{
        width:250,
        // padding:5
      },
      dropdown: {
        margin: 16,
        height: 22,
        borderBottomColor: '#0a8960',
        borderBottomWidth: 0.5,
      },
      icon: {
        marginRight: 5,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
})