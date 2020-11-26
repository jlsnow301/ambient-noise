import React, { useState } from "react";
import { Audio } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import PauseButton from "../components/PauseButton";
const soundObject = new Audio.Sound();

const PlayButton = (props) => {
  const [playing, setPlaying] = useState(false);
  const playAudio = async () => {
    console.log('is it playing audio: '+playing);
    try {
      if (playing) {
        await soundObject.pauseAsync();
        setPlaying(false);
        console.log('paused')
      } else {
        setPlaying(true);
        soundObject.unloadAsync();
        await soundObject.loadAsync(
          require("../assets/sound/freeway-1.mp3"), {
          shouldPlay: true,
        })
        console.log("start playing");
        await soundObject.playAsync();
        <PauseButton />
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => playAudio()}>
        <View style={styles.button}>
          <AntDesign name="sound" size={40} color="#006AFF" />
          <Text style={{ textAlign: "center" }}>LISTEN</Text>
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
    margin: 10,
    width: 80,
    height: 80,
    backgroundColor: "white",
    borderRadius: 50,
    alignItems: "center",
    borderColor: "black",
  },
});

export default PlayButton;