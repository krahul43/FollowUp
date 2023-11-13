import { StyleSheet, Text, FlatList, View, SafeAreaView, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import HomeItem from '../../Components/HomeItem/HomeItem'
import AddButton from '../../Components/AddButton/AddButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

const circleDiameter = Dimensions.get('window').width
const circleDiameterHeight = Dimensions.get('window').height

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const reminders = useSelector(state => state.reminders);
  console.log(reminders, 'reminders')

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.txtMain}>
        <Text style={styles.txt}>Reminders</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Image
            source={require('../../assets/gear.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      {reminders?.reminders.length > 0  ?
        <FlatList
          data={reminders?.reminders} // Reversed array
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => <HomeItem item={item} index={index} />}
        />
        :
        <Image
          source={require('../../assets/defaultHomeIcon.png')}
          style={styles.homeDefault}
        />
      }

      <View style={styles.btnMain}>
        <AddButton style={styles.Addbtn} />
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  txtMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 17
  },
  Addbtn: {
    backgroundColor: '#0a8960',
    width: Dimensions.get('window').width * 0.66,
    height: Dimensions.get('window').height * 0.065,
    alignSelf: 'center'
  },
  txt: {
    flex: 1,
    textAlign: 'center',
    fontSize: 34,
    color: '#000',
    marginRight: -Dimensions.get('window').width * 0.11,
    fontWeight: '700'
  },
  image: {
    width: circleDiameter * 0.08,
    height: circleDiameterHeight * 0.04,
  },
  btnMain: {
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 50
  },
  homeDefault: {
    alignSelf:'center',
    marginTop:circleDiameter*0.32,
    width: circleDiameter * 0.5,
    height: circleDiameterHeight * 0.4,
  },

})