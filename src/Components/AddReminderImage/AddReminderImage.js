import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

const AddReminderImage = ({ ReminderImage, txtHeading, onSelect, isSelected }) => {
  const circleDiameter = Dimensions.get('window').width;

  const handlePress = () => {
    onSelect(txtHeading);
  };

  const circleStyles = {
    width: circleDiameter * 0.19,
    height: circleDiameter * 0.16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    backgroundColor: isSelected ? '#0a8960' : 'transparent',
    borderColor: '#0a8960',
    borderWidth: isSelected ? 0 : 1,
  };

  const imageStyles = {
    width: 25,
    height: 25,
  };

  const txtStyles = {
    textAlign: 'center',
    marginTop: 3,
    fontSize: 18,
    color: isSelected ? '#fff' : '#000',
    fontWeight: '600',
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={circleStyles}>
        <Image source={ReminderImage} style={imageStyles} />
        <Text style={txtStyles}>{txtHeading}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddReminderImage;
