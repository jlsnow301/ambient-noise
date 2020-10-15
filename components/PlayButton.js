import { AntDesign } from '@expo/vector-icons';
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';

const PlayButton = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
                <View style={styles.button}>
                    <AntDesign name="sound" size={40} color="#006AFF" />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        padding:10,
        margin: 5,
        width:60,
        backgroundColor: 'white',
        borderRadius:50,
        alignItems: "center",
    },
});

export default PlayButton;