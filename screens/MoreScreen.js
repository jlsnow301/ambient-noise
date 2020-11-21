import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FadeInView } from 'react-native';
import Constants from 'expo-constants';
import { Audio } from 'expo-av';
import { RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT } from 'expo-av/build/Audio';

import PlayButton from "../components/PlayButton"
import RecordButton from "../components/RecordButton";
import SoundScore from "../components/SoundScore"

const recordSound = async () => {
    Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        staysActiveInBackground: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: true
      });
    try {
        const recording = new Audio.Recording();

        let { canRecord, isDoneRecording } = await recording.getStatusAsync();
        console.log({ canRecord, isDoneRecording });

        let ready = await recording
            .prepareToRecordAsync
            ();
        console.log({ ready });
    } catch (error) {
        console.log(`Error while recording ${error}`);
    }
};

const MoreScreen = (props) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Text>Tap to record!</Text>
                <RecordButton
                    onPress={() => { recordSound() }}
                />
            </TouchableOpacity>

            <TouchableOpacity>
                <SoundScore/>
            </TouchableOpacity>
        </View>
    );
}


export default MoreScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        padding: 8,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});