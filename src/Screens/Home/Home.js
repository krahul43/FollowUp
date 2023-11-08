import { StyleSheet, Text, FlatList, View, SafeAreaView,Image,Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import HomeItem from '../../Components/HomeItem/HomeItem'
import AddButton from '../../Components/AddButton/AddButton';

const data = [
  { image: require('../../assets/pencil.png'), name: 'Name 1', time: 'Time 1', anotherImage: require('../../assets/pencil.png') },
  { image: require('../../assets/phone-call.png'), name: 'Name 2', time: 'Time 2', anotherImage: require('../../assets/pencil.png') },
  { image: require('../../assets/pencil.png'), name: 'Name 1', time: 'Time 1', anotherImage: require('../../assets/pencil.png') },
  { image: require('../../assets/phone-call.png'), name: 'Name 2', time: 'Time 2', anotherImage: require('../../assets/pencil.png') },
  { image: require('../../assets/pencil.png'), name: 'Name 1', time: 'Time 1', anotherImage: require('../../assets/pencil.png') },
  { image: require('../../assets/phone-call.png'), name: 'Name 2', time: 'Time 2', anotherImage: require('../../assets/pencil.png') },
 ];

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.txtMain}>
        <Text style={styles.txt}>Reminders</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Setting')}>
        <Image
          source={require('../../assets/gear.png')}
          style={styles.image}
        />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <HomeItem item={item} />}
      />
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
    marginBottom:17
  },
  Addbtn:{
    backgroundColor: '#0a8960',
     width: Dimensions.get('window').width*0.66,
     height: Dimensions.get('window').height*0.065,
     alignSelf:'center'
  },
  txt: {
    flex: 1, 
    textAlign: 'center', 
    fontSize: 34, 
    color:'#000',
    marginRight:-Dimensions.get('window').width*0.11,
    fontWeight:'700'
  },
  image: {
    width: 35, 
    height: 35,
  },
  btnMain:{
    alignSelf:'center',
    alignItems:'flex-end',
    justifyContent:'flex-end',
    position:'absolute',
    bottom:10
  }

})