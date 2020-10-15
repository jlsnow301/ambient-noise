import { FontAwesome } from '@expo/vector-icons';
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';

const PlayButton = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
                <View style={styles.button}>
                    <FontAwesome name="play-circle" size={50} color="primary" />
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
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 50,
    },
});

export default PlayButton;