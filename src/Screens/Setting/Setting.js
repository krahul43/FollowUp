import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ToggleSwitch from 'toggle-switch-react-native'
import DropdownItem from '../../Components/DropdownItem/DropdownItem'
import ReminderTime from '../../Components/ReminderTime/ReminderTime'
import { ReminderTimeData } from '../../Components/StaticData/StaticData'

const Setting = ({navigation}) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView>
                <View style={styles.txtMain}>
                    <View style={styles.leftContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Image
                                source={require('../../assets/previous.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.centerContainer}>
                        <Text style={styles.txt}>Reminder</Text>
                    </View>
                </View>
                <View style={[styles.dptxtView, { padding: 15, marginVertical: 15 }]}>
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
                    <DropdownItem dropdownData={ReminderTimeData}/>
                </View>
                <View style={styles.dptxtView}>
                    <Text style={styles.dptxt}>Reminder 2:</Text>
                    <DropdownItem dropdownData={ReminderTimeData}/>
                </View>
                <View style={styles.dptxtView}>
                    <Text style={styles.dptxt}>Reminder 3:</Text>
                    <DropdownItem dropdownData={ReminderTimeData}/>
                </View>
                <View style={styles.dptxtView}>
                    <Text style={styles.dptxt}>Reminder 4:</Text>
                    <DropdownItem dropdownData={ReminderTimeData}/>
                </View>
                <View style={styles.dptxtView}>
                    <Text style={styles.dptxt}>Reminder 5:</Text>
                    <DropdownItem dropdownData={ReminderTimeData}/>
                </View>
                <Text style={[styles.toggtxt, { textAlign: "left", marginLeft: 25, marginTop: 50 }]}>Reminder Times</Text>
                <ReminderTime txt={'15 minutes'} />
                <ReminderTime txt={'30 minutes'} />
                <ReminderTime txt={'1 Hour'} />
                <ReminderTime txt={'2 Hour'} />
                <ReminderTime txt={'3 Hour'} />
                <ReminderTime txt={'4 Hour'} />
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
    txtMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 17,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        textAlign: 'center',
        fontSize: 34,
        color: '#000',
        fontWeight: '700',
        marginLeft:-27
    },
    image: {
        width: 35,
        height: 35,
    },
    dptxtView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    toggtxt: {
        textAlign: 'center',
        fontSize: 18,
        color: '#000',
        fontWeight: '700',
        marginLeft: 5
    },
    dptxt: {
        textAlign: 'center',
        fontSize: 18,
        color: '#000',
        fontWeight: '700',
        marginLeft: 40,
    },

})