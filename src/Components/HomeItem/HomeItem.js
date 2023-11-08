
import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Snooze from '../Snooze/Snooze';
import ImageBox from '../ImageBox/ImageBox';

const windowWidth = Dimensions.get('window').width;

const HomeItem = ({ item }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.txtContainer}>
                <ImageBox item={item} />
                <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
            </View>
            <View style={styles.buttnMain}>
                <CheckBox
                    onFillColor={{ true: '#000', false: 'red' }}
                    boxType='square'
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
                <Snooze />
                <TouchableOpacity
                    style={[styles.touchableOpacityView, { borderColor: '#000' }]}
                >
                    <Image
                        source={item.anotherImage}
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
        width: 22,
        height: 22,
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
