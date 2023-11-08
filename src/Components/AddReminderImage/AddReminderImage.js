
const styles = StyleSheet.create({})
import { StyleSheet, Text, View, Image,Dimensions } from 'react-native'
import React from 'react'

const AddReminderImage = ({ ReminderImage,txtHeading }) => {
    const circleDiameter = Dimensions.get('window').width
    
    const styles = StyleSheet.create({
        circle: {
          width: circleDiameter*0.19,
          height: circleDiameter*0.16,
          borderRadius: 10, // Make it a circle
          backgroundColor: '#0a8960', // Background color
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft:10
        },
        image: {
          width: 25, // Adjust the image size to fit within the circle
          height: 25,
        },
        txt: {
            textAlign: 'center',
            marginTop:3,
            fontSize: 18,
            color: '#fff',
            fontWeight: '600'
        },
      });
    return (
        <View style={styles.circle}>
            <Image
                source={ReminderImage}
                style={styles.image}
            />
             <Text style={styles.txt}>{txtHeading}</Text>
        </View>
    )
}

export default AddReminderImage

