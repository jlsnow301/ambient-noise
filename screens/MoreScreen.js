import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FadeInView } from 'react-native';
import Constants from 'expo-constants';
import RecordButton from "../components/RecordButton";
import { Audio } from 'expo-av';
import PlayButton from "../components/PlayButton"
import { RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT } from 'expo-av/build/Audio';


const recordSound = async () => {
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

class MoreScreen extends React.Component {
    async componentDidMount() {
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            shouldDuckAndroid: true,
            staysActiveInBackground: true,
        });

        this.sound = new Audio.Sound();

        const status = {
            shouldPlay: false
        };

        this.sound.loadAsync(require('../assets/sound/freeway-1.mp3'), status, false);
    }

    playsound() {
        this.sound.playAsync();
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <Text>Tab to record!</Text>
                    <RecordButton
                        onPress={() => { recordSound() }}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text>Tab to play audio!</Text>
                    <PlayButton
                        onPress={this.playsound.bind(this)} 
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

export default MoreScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
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
