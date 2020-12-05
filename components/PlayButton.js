import React, { useState } from "react";
import { Audio } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import IconButton from "../components/IconButton";

const soundObject = new Audio.Sound();

const PlayButton = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudioHandler = async () => {
    if (!isPlaying) {
      setIsPlaying(true);
      soundObject.unloadAsync();
      await soundObject.loadAsync(require("../assets/sound/freeway-1.mp3"), {
        shouldPlay: true,
      });
      await soundObject.playAsync();
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
