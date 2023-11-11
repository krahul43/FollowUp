
import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Snooze from '../Snooze/Snooze';
import ImageBox from '../ImageBox/ImageBox';
import {useDispatch, useSelector} from 'react-redux';
import { deleteReminder } from '../../redux/reminderActions/reminderActions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeItem = ({ item,index }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const dispatch = useDispatch();
    const handleDelete = () => {
      dispatch(deleteReminder(index));
    };

    return (
        <View style={styles.container}>
            <View style={styles.txtContainer}>
                <ImageBox item={item} />
                <View>
                    <Text style={styles.name}>{item.selectedDropdownContact}</Text>
                    <Text style={styles.time}>{item.selectedDropdownReminder}</Text>
                </View>
            </View>
            <View style={styles.buttnMain}>
                <CheckBox
                    onFillColor={{ true: '#000', false: 'red' }}
                    boxType='square'
                    value={toggleCheckBox}
                    onValueChange={(newValue) => {setToggleCheckBox(newValue),handleDelete()}}
                />
                <Snooze />
                <TouchableOpacity
                    style={[styles.touchableOpacityView, { borderColor: '#000' }]}
                >
                    <Image
                        source={require('../../assets/pencil.png')}
                        style={styles.anotherImage1}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    txtContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 20, // Adjust the font size as needed
        color: '#000',
        marginLeft: 10,
        fontWeight: '600'
    },
    time: {
        fontSize: 18, // Adjust the font size as needed
        color: '#000',
        marginLeft: 10,
        fontWeight: '400'
    },
    buttnMain: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    anotherImage1: {
        width: windowWidth*0.05, 
        height: windowHeight*0.025,
    },
    touchableOpacityView: {

        width: 35,
        height: 35,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
    },
});

export default HomeItem;
