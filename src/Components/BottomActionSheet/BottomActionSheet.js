import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';;

const BottomActionSheet = React.forwardRef(({children, title}, ref) => {
  return (
    <ActionSheet
      ref={ref}
      // headerAlwaysVisible={true}
      // backgroundInteractionEnabled={true}
      containerStyle={[
        styles.containerStyle,
        {backgroundColor: '#FFF'},
      ]}
     >
      {children}
    </ActionSheet>
  );
});

const styles = StyleSheet.create({
  header: {
    height: 20,
    justifyContent: 'center',
    padding: 5,
  },
  title: {
    color: '#FFF',
    fontSize:14,
  },
  containerStyle: {
    borderRadius: 0,
  },
});

export default BottomActionSheet;