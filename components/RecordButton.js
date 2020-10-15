import { FontAwesome5 } from '@expo/vector-icons';
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';

const RecordButton = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
                <View style={styles.button}>
                    <FontAwesome5 name="microphone" size={40} color="primary" />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
      },
      button: {
        backgroundColor: 'white',
        paddingLeft:5,
        paddingRight:5,
        paddingBottom:5,
        paddingTop:5,
        borderRadius: 50,
      },
});

export default RecordButton;