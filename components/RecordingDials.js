import React, { useState, useEffect, useContext } from "react";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import Slider from "@react-native-community/slider";
import { Picker, Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as firebase from "firebase";

import {
  Entypo,
  Feather,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

import TitleText from "./TitleText";
import IconButton from "./IconButton";
import Colors from "../constants/colors";
import { AuthContext } from "../functions/auth-context";


const RecordingDials = (props) => {
  const auth = useContext(AuthContext);
  const [volume, setVolume] = useState(4);
  const [sound, setSound] = useState(null);
  const [recording, setRecording] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [select, setSelect] = useState("deck");

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

  useEffect(() => {
    Audio.requestPermissionsAsync();
  }, []);

  const startRecordingHandler = async () => {
    const { status } = await Audio.getPermissionsAsync();
    if (status !== "granted") return;
    setIsRecording(true);
    console.log("is recording: " + isRecording);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
    });
    const recording = new Audio.Recording();
    console.log("Started Recording");
    try {
      await recording.prepareToRecordAsync(recordingSettings);
      await recording.startAsync();
    } catch (error) {
      console.log(error);
      stopRecordingHandler();
    }
    setRecording(recording);
  };

  const stopRecordingHandler = async () => {
    setIsRecording(false);
    try {
      await recording.stopAndUnloadAsync();
      console.log("recording stopped");
    } catch (error) { }
  };

  const deleteRecordingHandler = async () => {
    try {
      const info = await FileSystem.getInfoAsync(recording.getURI());
      await FileSystem.deleteAsync(info.uri);
      console.log("deleted");
    } catch (error) {
      console.log("There was an error deleting recording file", error);
    }
  };

  const resetRecordingHandler = () => {
    deleteRecordingHandler();
    setRecording(null);
  };

  const saveRecordingHandler = async () => {
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
          .child(`recording1` + `.m4a`)
          .put(blob, {
            contentType: `audio/m4a`,
          })
          .then(() => {
            console.log("Sent to storage!");
          })
          .catch((e) => console.log("error:", e));
      } else {
        console.log("erroor with blob");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const deleteAlert =() => {
    Alert.alert(
      "Recording Deleted",
      "Deleted!"
      [
        { text: "OK", onPress:() => console.log("deleted")}
      ],
      { cancelable: false }
    );
  }

  const saveAlert = () => {
    Alert.alert(
      "Recording Saved",
      "sent!"
      [
        { text: "OK"}
      ]
    );
  }

  const deleteHandler = () => {
    deleteRecordingHandler();
    deleteAlert();
  }

  const saveHandler = () => {
    saveAlert();
    saveRecordingHandler();
  }

  const playRecordingHandler = async () => {
    setIsFetching(true);
    try {
      const info = await FileSystem.getInfoAsync(recording.getURI() || "");
      console.log(`FILE INFO: ${JSON.stringify(info)}`);
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

        sound.playAsync();
        setIsPlaying(true);
    } catch (error) {
      console.log("There was an error reading file", error);
      stopRecordingHandler();
      resetRecordingHandler();
    }
    setIsFetching(false);
  };

  const volumeChangeHandler = (volume) => {
    setVolume(volume);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => playAudio()}>
          {!isRecording ? (
            <IconButton
              icon={<FontAwesome5 name="microphone" size={40} color="#0000FF" />}
              onPress={startRecordingHandler}
              text="RECORD"
            />
          ) : (
            <IconButton
              icon={<Entypo name="controller-stop" size={40} color="#FF0000" />}
              onPress={stopRecordingHandler}
              text="STOP"
            />
          )}
        </TouchableOpacity>
        <IconButton
          icon={<Entypo name="controller-play" size={40} color="#006AFF" />}
          onPress={playRecordingHandler}
          text="PLAYBACK"
        />
        <IconButton
          icon={<MaterialIcons name="delete" size={40} color="#A9A9A9" />}
          onPress={deleteHandler}
          text="DELETE"
        />
      </View>
      <View style={styles.volumeControls}>
        <FontAwesome5 name="volume-down" size={25} color={Colors.primary} />
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={8}
          minimumTrackTintColor="#1EB1FC"
          maximumTrackTintColor="#000000"
          step={1}
          value={4}
          onValueChange={(volume) => volumeChangeHandler(volume)}
          disabled={!isPlaying}
        />
        <FontAwesome5 name="volume-up" size={25} color={Colors.primary} />
      </View>
      <View style={styles.picker}>
        <Picker
          selectedValue={select}
          onValueChange={select => setSelect(select)}
          style={{ width: 160, height:90, postion: 'absolute', fontSize: 10 }}
          mode="dropdown"
          itemStyle={{ color:"#228B22", fontWeight: '900', fontSize: 18, padding: 30 }}>
          <Picker.Item label="on the deck" value="deck" />
          <Picker.Item label="on the second floor" value="2fl" />
          <Picker.Item label="on the first floor" value="1fl" />
          <Picker.Item label="in the garage" value="garage" />
          <Picker.Item label="on curbside" value="cubside" />
          <Picker.Item label="other" value="other" />
        </Picker>
      </View>
      <View style={styles.saveButton}>
        <IconButton
          icon={<Feather name="save" size={30} color="#006AFF" />}
          onPress={saveHandler}
          text="SAVE"
        />

      </View>
    </View>
  );
};

export default RecordingDials;

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  volumeControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    marginVertical: 15,
  },
  slider: {
    width: 200,
    height: 20,
  },
  saveButton: {
    alignSelf: "flex-end",
  },
  picker: {
    alignSelf: "flex-start",
  },
  container: {
    alignSelf:"stretch",
  }
});
