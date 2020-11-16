import React from "react";
import { Audio } from "expo-av";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const RecordButton = (props) => {
  const recordSound = async () => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      staysActiveInBackground: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
    });
    try {
      const recording = new Audio.Recording();

      let { canRecord, isDoneRecording } = await recording.getStatusAsync();
      console.log({ canRecord, isDoneRecording });

      let ready = await recording.prepareToRecordAsync();
      console.log({ ready });
    } catch (error) {
      console.log(`Error while recording ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => recordSound()}>
        <View style={styles.button}>
          <FontAwesome5 name="microphone" size={40} color="#006AFF" />
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
    padding: 15,
    margin: 5,
    width: 80,
    height: 80,
    backgroundColor: "white",
    borderRadius: 50,
    alignItems: "center",
    borderColor: "black",
  },
});

export default RecordButton;
