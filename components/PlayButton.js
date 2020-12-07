import React, { useState } from "react";
import { Audio } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View} from "react-native";
import * as firebase from "firebase";
import IconButton from "../components/IconButton";

const soundObject = new Audio.Sound();

const PlayButton = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudioHandler = async () => {
    soundObject.unloadAsync();
    console.log("start to play")
    const uri = await firebase
      .storage()
      .ref("recording1.m4a")
      .getDownloadURL();

    console.log("uri:", uri);

    setIsPlaying(true);
    
    try {
      await soundObject.loadAsync({ uri }, {
        shouldPlay: true,
      });
      await soundObject.playAsync();
    } catch (error) {
      console.log("error:", error);
    }
  };

  const pauseAudioHandler = async () => {
    if (isPlaying) {
      await soundObject.pauseAsync();
      setIsPlaying(false);
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => playAudio()}>
      {!isPlaying && (
        <IconButton
          icon={<AntDesign name="sound" size={40} color="#006AFF" />}
          onPress={() => playAudioHandler()}
          text="LISTEN"
        />
      )}
      {isPlaying && (
        <IconButton
          icon={<FontAwesome5 name="pause" size={40} color="#006AFF" />}
          onPress={() => pauseAudioHandler()}
          text="PAUSE"
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default PlayButton;
