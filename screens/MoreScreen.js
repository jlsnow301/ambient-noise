import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FadeInView } from 'react-native';
import Constants from 'expo-constants';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { FontAwesome } from "@expo/vector-icons";
import RecordButton from "../components/RecordButton";
import SoundScore from "../components/SoundScore"
import PlayBackButton from "../components/PlayBackButton";
import StopButton from "../components/StopButton";
import DeleteButton from "../components/DeleteButton";
import SaveButton from "../components/SaveButton";
import * as FileSystem from 'expo-file-system';
import * as firebase from 'firebase';
import keys from "../constants/api-keys";

if (!firebase.apps.length) {
    firebase.initializeApp(keys.FIREBASE_CONFIG);
}

const recordingSettings = {
    android: {
        extension: ".m4a",
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
    },
    ios: {
        extension: ".m4a",
        outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MIN,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
};

const MoreScreen = () => {
    const [recording, setRecording] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [sound, setSound] = useState(null);
    const [isplaying, setIsPlaying] = useState(false);
    const [volumnValue, setVolumeValue] = useState(4);
    const db = firebase.database();

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
            await recording.prepareToRecordAsync(recordingSettings);
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
            console.log("deleted");
        } catch (error) {
            console.log("There was an error deleting recording file", error);
        }
    }

    const resetRecording = () => {
        deleteRecordingFile();
        setRecording(null);
    };

    const saveRecording = async () => {
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
            setSound(sound);
            if (isplaying) {
                await sound.unloadAsync();
            }
            if (!isplaying) {
                sound.playAsync();
                setIsPlaying(false);
            }
        } catch (error) {
            console.log('There was an error reading file', error);
            stopRecording();
            resetRecording();
        }
        setIsFetching(false);
    };

    const onValueChange = () => {
        setVolumeValue(value);
      };

    return (
        <View style={styles.container}>
            {isRecording &&
                <FontAwesome name="microphone" size={20} color="#DE1C22" > recording...Press Stop Button</FontAwesome>

            }
            {!isRecording
            }

            
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <RecordButton
                        onPress={() => startRecording()}
                    />
                    {/* <Text>Tap to record</Text> */}
                </View>
                <View style={styles.button}>
                    <StopButton
                        onPress={() => stopRecording()}
                    />
                    {/* <Text>Tap to stop recording</Text> */}
                </View>
                <View style={styles.button}>
                    <PlayBackButton
                        onPress={() => getAudio()}
                    />
                    {/* <Text>Tap to listen recorded audio</Text> */}
                </View>
                <View style={styles.button}>
                    <DeleteButton
                        onPress={() => resetRecording()}
                    />
                </View>
            </View>
            <Slider
                style={{ width: 200, height: 20 }}
                minimumValue={0}
                maximumValue={8}
                minimumTrackTintColor="#1EB1FC"
                maximumTrackTintColor="#000000"
                step={1}
                value={4}
                onValueChange={value => onValueChange()}
                disabled={isplaying || !isplaying}
            />
            <Text>
                volume
            </Text>
            <View style={styles.button}>
                <SaveButton
                    onPress={() => saveRecording()}
                />
            </View>
            <View>
                <TouchableOpacity>
                    <SoundScore />
                </TouchableOpacity>
            </View>
        </View >
    );
}

export default MoreScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '25%',
        alignItems: 'center',
        marginBottom: '40%',

    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        padding: 20,
        alignItems: 'center',
    },
    button: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 10,
        marginTop:10,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});