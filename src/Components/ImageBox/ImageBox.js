import { StyleSheet, Text, View, Image,Dimensions } from 'react-native'
import React from 'react'

const ImageBox = ({ item }) => {
    const circleDiameter = Dimensions.get('window').width
    const circleDiameterHeight = Dimensions.get('window').height

    let PencilImg=require('../../assets/pencil.png')
    let CallImg=require('../../assets/pencil.png')
    let MeetImg=require('../../assets/pencil.png')

    const buttonImageMap = {
      Text: require('../../assets/message.png'),
      Call: require('../../assets/phone-call.png'),
      Meet: require('../../assets/Handshake.png'),
    };
    
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
          width: circleDiameter*0.07, // Adjust the image size to fit within the circle
          height: circleDiameterHeight*0.035,
        },
      });
    return (
        <View style={styles.circle}>
            <Image
                source={buttonImageMap[item.selectedButton]}
                style={styles.image}
            />
        </View>
    )
}

export default ImageBox

