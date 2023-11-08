import { StyleSheet, Text, SafeAreaView, View, Dimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ToggleSwitch from 'toggle-switch-react-native'
import DropdownItem from '../../Components/DropdownItem/DropdownItem'
import ReminderTime from '../../Components/ReminderTime/ReminderTime'

const Setting = () => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView>
            <Text style={styles.txt}>Settings</Text>
            <View style={[styles.dptxtView,{padding:15,marginVertical:15}]}>
            <Text style={styles.toggtxt}>Auto-Create Reminder {'\n'}After Contact is Made</Text>
            <ToggleSwitch
                isOn={toggleCheckBox}
                onColor="#0a8960"
                offColor="#A9A9A9"
                labelStyle={{ color: "black", fontWeight: "900" }}
                size="large"
                onToggle={isOn => setToggleCheckBox(!toggleCheckBox)}
            />
            </View>
            <View style={styles.dptxtView}>
            <Text style={styles.dptxt}>Reminder 1:</Text>
            <DropdownItem />
            </View>
            <View style={styles.dptxtView}>
            <Text style={styles.dptxt}>Reminder 2:</Text>
            <DropdownItem />
            </View>
            <View style={styles.dptxtView}>
            <Text style={styles.dptxt}>Reminder 3:</Text>
            <DropdownItem />
            </View>
            <View style={styles.dptxtView}>
            <Text style={styles.dptxt}>Reminder 4:</Text>
            <DropdownItem />
            </View>
            <View style={styles.dptxtView}>
            <Text style={styles.dptxt}>Reminder 5:</Text>
            <DropdownItem />
            </View>
            <Text style={[styles.toggtxt,{textAlign:"left",marginLeft:25,marginTop:50}]}>Reminder Times</Text>
           <ReminderTime txt={'15 minutes'}/>
           <ReminderTime txt={'30 minutes'}/>
           <ReminderTime txt={'1 Hour'}/>
           <ReminderTime txt={'2 Hour'}/>
           <ReminderTime txt={'3 Hour'}/>
           <ReminderTime txt={'4 Hour'}/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Setting

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    dptxtView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    toggtxt:{
        textAlign: 'center',
        fontSize: 18,
        color: '#000',
        fontWeight: '700',
        marginLeft:5  
    },
    dptxt:{
        textAlign: 'center',
        fontSize: 18,
        color: '#000',
        fontWeight: '700',
        marginLeft:40,
    },
    txt: {
        textAlign: 'center',
        fontSize: 34,
        color: '#000',
        fontWeight: '700'
    },
})