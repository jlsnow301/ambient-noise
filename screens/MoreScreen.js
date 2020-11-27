import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FadeInView } from 'react-native';
import Constants from 'expo-constants';
import { Audio } from 'expo-av';
import { FontAwesome } from "@expo/vector-icons";
import RecordButton from "../components/RecordButton";
import SoundScore from "../components/SoundScore"
import PlayBackButton from "../components/PlayBackButton";
import StopButton from "../components/StopButton";
import * as FileSystem from 'expo-file-system';

const MoreScreen = () => {
    const [recording, setRecording] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [sound, setSound] = useState(null);
    const [isplaying, setIsPlaying] = useState(false);

    useEffect(() => {
        Audio.requestPermissionsAsync();
    }, []);

    const startRecording = async () => {

        const { status } = await Audio.getPermissionsAsync();
        if (status !== 'granted') return;

        setIsRecording(true);
        console.log('is recording: ' + isRecording);
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: true,
        });
        const recording = new Audio.Recording();
        console.log('start Recording');
        try {
            await recording.prepareToRecordAsync();
            await recording.startAsync();
        } catch (error) {
            console.log(error);
            stopRecording();
        }

        setRecording(recording);
    };

    const stopRecording = async () => {
        setIsRecording(false);
        try {
            await recording.stopAndUnloadAsync();
            console.log('recording stopped');
        } catch (error) {
        }
    }

    const deleteRecordingFile = async () => {
        try {
            const info = await FileSystem.getInfoAsync(recording.getURI());
            await FileSystem.deleteAsync(info.uri)
        } catch (error) {
            console.log("There was an error deleting recording file", error);
        }
    }

    const resetRecording = () => {
        deleteRecordingFile();
        setRecording(null);
    };

    const getAudio = async () => {
        setIsFetching(true);
        try {
            const info = await FileSystem.getInfoAsync(recording.getURI() || "");
            console.log(`FILE INFO: ${JSON.stringify(info)}`);
            setIsPlaying(true);
            await Audio.setAudioModeAsync({
              allowsRecordingIOS: false,
              interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
              playsInSilentModeIOS: true,
              shouldDuckAndroid: true,
              interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
              playThroughEarpieceAndroid: false,
              staysActiveInBackground: true,
            });
            const { sound, status } = await recording.createNewLoadedSoundAsync();
            if(isplaying){
                await sound.unloadAsync();
            }
            if(!isplaying){  
                sound.playAsync();
                setIsPlaying(false);
            }         
        } catch (error) {
            console.log('There was an error reading file', error);
            stopRecording();
            resetRecording();
        }
        setIsFetching(false);
    }

    return (
        <View style={styles.container}>
            {isRecording &&
                <FontAwesome name="microphone" size={32} color="#DE1C22" >recording...</FontAwesome>
                
            }
            {!isRecording 
            }
            <View>
                <RecordButton
                    onPress={() => startRecording()}
                />
                <Text>Tap to record</Text>
                <StopButton
                    onPress={() => stopRecording()}
                />
                <Text>Tap to stop recording</Text>
                <PlayBackButton
                    onPress={() => getAudio()}
                />
                <Text>Tap to listen recorded audio</Text>
            </View>
            <View>
                <TouchableOpacity>
                    <SoundScore />
                </TouchableOpacity>
            </View>
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
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'absolute',
        alignItems: 'center',
        top: '10%', left: 0,
        right: 0, bottom: '30%',

    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    button: {
        backgroundColor: '#48C9B0',
        paddingVertical: 20,
        width: '90%',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    }
});