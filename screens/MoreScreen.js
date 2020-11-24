import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FadeInView } from 'react-native';
import Constants from 'expo-constants';
import RecordButton from "../components/RecordButton";
import { Audio } from 'expo-av';
import { RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT } from 'expo-av/build/Audio';
import StopButton from "../components/StopButton";
import PlayBackButton from "../components/PlayBackButton";
import PauseButton from "../components/PauseButton";

const MoreScreen = (props) => {
    const [isRecording, setIsRecording] = useState(false);
    const [recording, setRecording] = useState(null);
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        Audio.requestPermissionsAsync()
    }, []);

    const startRecording = async () => {
        const { status } = Audio.getPermissionsAsync();
        if (status == 'granted') {
            console.log("recording")
            setIsRecording(true);
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                playThroughEarpieceAndroid: true,
            });
            const recording = new Audio.Recording();

            try {
                await recording.prepareToRecordAsync(recordingOptions);
                await recording.startAsync();
            } catch (error) {
                console.log(error);
                stopRecording();
            }

            setRecording(recording);
        }
    };

    const stopRecording = async () => {
        setIsRecording(false);
        try {
            await recording.stopAndUnloadAsync();
        } catch (error) {
        }
    }

    const uploadAudio = async () => {
        const uri = recording.getURI();
        try {
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    try {
                        resolve(xhr.response);
                    } catch (error) {
                        console.log("error:", error);
                    }
                };
                xhr.onerror = (e) => {
                    console.log(e);
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", uri, true);
                xhr.send(null);
            });
            if (blob != null) {
                const uriParts = uri.split(".");
                const fileType = uriParts[uriParts.length - 1];
                firebase
                    .storage()
                    .ref()
                    .child(`nameOfTheFile.${fileType}`)
                    .put(blob, {
                        contentType: `audio/${fileType}`,
                    })
                    .then(() => {
                        console.log("Sent!");
                    })
                    .catch((e) => console.log("error:", e));
            } else {
                console.log("erroor with blob");
            }
        } catch (error) {
            console.log("error:", error);
        }
    };

    const downloadAudio = async () => {
        const uri = await firebase
            .storage()
            .ref("nameOfTheFile.filetype")
            .getDownloadURL();

        console.log("uri:", uri);

        // The rest of this plays the audio
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync({ uri });
            await soundObject.playAsync();
        } catch (error) {
            console.log("error:", error);
        }
    };

    const deleteRecordingFile = async () => {
        try {
            const info = await FileSystem.getInfoAsync(recording.getURI());
            await FileSystem.deleteAsync(info.uri)
        } catch (error) {
            console.log("There was an error deleting recording file", error);
        }
    }

    const handleOnPressIn = () => {
        startRecording();
    };

    const handleOnPressOut = () => {
        stopRecording();
        getTranscription();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Text>Tap to record!</Text>
                <View style={styles.container}>
                    {isRecording &&
                        <RecordButton />
                    }
                    {!isRecording &&
                        <RecordButton size={32}/>
                    }
                    <Text>Voice Search</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPressIn={handleOnPressIn}
                        onPressOut={handleOnPressOut}
                    >
                    </TouchableOpacity>
                </View>
                <StopButton
                    onPress={() => { stopRecording() }}
                />
                <PlayBackButton
                    onPress={() => { downloadAudio() }}
                />

                <PauseButton
                    onPress={() => { downloadAudio() }}
                />
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
        flexDirection: 'row',
        justifyContent: 'center',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});