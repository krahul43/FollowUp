import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect,useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

const DropdownItem = ({ dropdownData, onValueChange,Editvalue,placeholder }) => {
  const [value, setValue] = useState(Editvalue);
  const [isFocus, setIsFocus] = useState(false);

  const handleValueChange = (item) => {
    setValue(item.value);
    onValueChange(item.value); // Callback to parent component
  };
  useEffect(() => {
    setValue(Editvalue);
  }, [Editvalue]);


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
        // inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={{color:"#000"}}
        data={dropdownData}
        // search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onChange={handleValueChange}
      />
    </View>
  );
};

export default DropdownItem;

const styles = StyleSheet.create({
  dpView: {
    width: 250,
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
    color:"#000"
  },
  selectedTextStyle: {
    fontSize: 16,
    color:"#000"
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
