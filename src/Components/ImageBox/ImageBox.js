import { StyleSheet, Text, View, Image,Dimensions } from 'react-native'
import React from 'react'

const ImageBox = ({ item }) => {
    const circleDiameter = Dimensions.get('window').width
    
    const styles = StyleSheet.create({
        circle: {
          width: circleDiameter*0.17,
          height: circleDiameter*0.17,
          borderRadius: circleDiameter / 2, // Make it a circle
          backgroundColor: '#0a8960', // Background color
          justifyContent: 'center',
          alignItems: 'center',
        },
        image: {
          width: 35, // Adjust the image size to fit within the circle
          height: 35,
        },
      });
    return (
        <View style={styles.circle}>
            <Image
                source={item.image}
                style={styles.image}
            />
        </View>
    )
}

export default ImageBox

