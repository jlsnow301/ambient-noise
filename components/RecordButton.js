import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const RecordButton = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
                <View style={styles.button}>
                    <FontAwesome5 name="microphone" size={40} color='#006AFF' />
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

export default RecordButton;